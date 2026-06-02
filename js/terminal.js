"use strict";

window.terminals = window.terminals || {};

window.POLYLINUX_TERMINAL_THEME = {
    background: "#000000",
    foreground: "#d0d0d0",
    cursor: "#ffffff",
    cursorAccent: "#000000",
    selectionBackground: "#404040",
    black: "#000000",
    red: "#aa0000",
    green: "#00aa00",
    yellow: "#aa5500",
    blue: "#0000aa",
    magenta: "#aa00aa",
    cyan: "#00aaaa",
    white: "#aaaaaa",
    brightBlack: "#555555",
    brightRed: "#ff5555",
    brightGreen: "#55ff55",
    brightYellow: "#ffff55",
    brightBlue: "#5555ff",
    brightMagenta: "#ff55ff",
    brightCyan: "#55ffff",
    brightWhite: "#ffffff"
};

window.applyNormalLinuxTerminalTheme = function () {
    Object.values(window.terminals || {}).forEach((term) => {
        if (term && term.options) term.options.theme = window.POLYLINUX_TERMINAL_THEME;
    });
};

function getOrCreateTerminal(container) {
    if (!container) throw new Error("Terminal container not found");

    if (window.terminals[container.id]) return window.terminals[container.id];

    const term = new Terminal({
        cursorBlink: true,
        convertEol: true,
        scrollback: 2000,
        fontFamily: "Fira Code, Consolas, monospace",
        fontSize: 13,
        theme: window.POLYLINUX_TERMINAL_THEME
    });

    let fitAddon = null;
    if (window.FitAddon && window.FitAddon.FitAddon) {
        fitAddon = new window.FitAddon.FitAddon();
        term.loadAddon(fitAddon);
    }

    term.open(container);
    if (fitAddon) {
        setTimeout(() => fitAddon.fit(), 0);
        window.addEventListener("resize", () => fitAddon.fit());
    }

    container.focus = () => term.focus();
    window.terminals[container.id] = term;
    return term;
}

function enableSerialInput(container, getEmulator) {
    const term = getOrCreateTerminal(container);

    term.onData((data) => {
        const emulator = getEmulator();
        if (!emulator || !emulator.bus) return;
        for (let i = 0; i < data.length; i++) {
            emulator.bus.send("serial0-input", data.charCodeAt(i));
        }
    });

    container.addEventListener("mousedown", () => term.focus());
    setTimeout(() => term.focus(), 250);
}

function startAnsiStripper(container, getEmulator) {
    const term = getOrCreateTerminal(container);

    function writeByte(byte) {
        term.write(String.fromCharCode(byte));
    }

    function attach() {
        const emulator = getEmulator();
        if (!emulator || !emulator.bus) {
            setTimeout(attach, 100);
            return;
        }

        emulator.bus.register("serial0-output-byte", writeByte);
        emulator.bus.register("serial0-output-string", (str) => term.write(str));
    }

    attach();
}
