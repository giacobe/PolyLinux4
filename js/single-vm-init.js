"use strict";

/*
  Single-VM boot configuration.
  Edit these two filenames when you swap in a different Buildroot/v86 VM.
*/
const LAB_VM_BZIMAGE_URL = "./images/snort-bzImage";
const LAB_VM_INITRD_URL = "./images/snort-rootfs.cpio.gz";

function createVM({ screen_container, serial_container, bzimage_url, initrd_url }) {
    const VMClass = window.V86Starter || window.V86;
    if (!VMClass) {
        throw new Error("v86 did not load. Check ./lib/libv86.js.");
    }

    return new VMClass({
        wasm_path: "./lib/v86.wasm",
        memory_size: 256 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        screen_container,
        serial_container,
        use_worker: true,
        use_shared_memory: false,
        disable_speaker: true,
        network_relay: null,
        bios: { url: "./bios/seabios.bin" },
        vga_bios: { url: "./bios/vgabios.bin" },
        bzimage: { url: bzimage_url },
        initrd: { url: initrd_url },
        cmdline: "console=ttyS0,115200 loglevel=3 acpi=off noapic nolapic panic=-1 root=/dev/ram0 rw quiet net.ifnames=0 biosdevname=0",
        autostart: true,
    });
}

function createLabTerminal() {
    const serialEl = document.getElementById("vm_serial");
    if (!serialEl) throw new Error("Missing #vm_serial terminal container.");

    if (!window.Terminal) {
        serialEl.textContent = "xterm.js did not load. Check ./lib/xterm.js.";
        return null;
    }

    const term = new Terminal({
        cursorBlink: true,
        fontFamily: "Fira Code, monospace",
        fontSize: 13,
        theme: {
            background: "#050609",
            foreground: "#c2c8d4",
            cursor: "#4a90d9",
            black: "#050609",
            red: "#d94f4f",
            green: "#4caf76",
            yellow: "#e0a030",
            blue: "#4a90d9",
            magenta: "#9b59b6",
            cyan: "#61b5ff",
            white: "#e8eaf0",
            brightBlack: "#4a5060",
            brightRed: "#d94f4f",
            brightGreen: "#4caf76",
            brightYellow: "#e0a030",
            brightBlue: "#61b5ff",
            brightMagenta: "#b985d6",
            brightCyan: "#8fd6ff",
            brightWhite: "#ffffff",
        },
    });

    let fitAddon = null;
    if (window.FitAddon && window.FitAddon.FitAddon) {
        fitAddon = new window.FitAddon.FitAddon();
        term.loadAddon(fitAddon);
    }

    term.open(serialEl);
    if (fitAddon) fitAddon.fit();

    window.terminals = window.terminals || {};
    window.terminals.vm_serial = { term, fitAddon, focus: () => term.focus() };
    serialEl.focus = () => term.focus();
    term.focus();

    return term;
}

function initSingleVM() {
    const term = createLabTerminal();
    if (!term) return;

    const dummySerial = document.createElement("textarea");
    Object.assign(dummySerial.style, {
        position: "absolute",
        opacity: "0",
        pointerEvents: "none",
        zIndex: "-1",
        width: "1px",
        height: "1px",
    });
    document.body.appendChild(dummySerial);

    try {
        if (typeof window.setStatus === "function") window.setStatus("Starting VM...");

        window.emulator = createVM({
            screen_container: null,
            serial_container: dummySerial,
            bzimage_url: LAB_VM_BZIMAGE_URL,
            initrd_url: LAB_VM_INITRD_URL,
        });

        window.emulator.bus.register("serial0-output-byte", function (byte) {
            const ch = String.fromCharCode(byte);
            term.write(ch);
        });

        window.emulator.bus.register("serial0-output-string", function (str) {
            term.write(str);
        });

        term.onData(function (data) {
            for (let i = 0; i < data.length; i++) {
                window.emulator.bus.send("serial0-input", data.charCodeAt(i));
            }
        });

        const vmContainer = document.getElementById("vm_container");
        if (vmContainer) {
            vmContainer.addEventListener("mousedown", () => term.focus());
            vmContainer.addEventListener("click", () => term.focus());
        }

        window.addEventListener("resize", function () {
            if (typeof window.fitTerminal === "function") window.fitTerminal();
        });

        if (typeof window.wireNetworking === "function") {
            try { window.wireNetworking(); } catch (e) { console.warn("wireNetworking skipped:", e); }
        }

        if (typeof window.setStatus === "function") window.setStatus("Booting VM on ttyS0...");
        if (typeof window.startLabTimer === "function") window.startLabTimer();
    } catch (e) {
        console.error("VM error:", e);
        term.writeln("VM error: " + e.message);
        if (typeof window.setStatus === "function") window.setStatus("VM failed to start");
    }
}

window.addEventListener("load", initSingleVM);
