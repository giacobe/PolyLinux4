"use strict";

/*
  Terminal bridge reverted to the previous xterm.js-based display path.
  The last full-repo package replaced xterm with a plain <div> renderer;
  that caused carriage-return and line-discipline output from the Linux
  serial console to run together. This file restores xterm as the terminal
  emulator and only connects v86 serial I/O to xterm.
*/

(function () {
  let activeTerminal = null;
  let activeFitAddon = null;

  function sendSerial(emulator, data) {
    if (!emulator || !data) return;

    if (typeof emulator.serial0_send === "function") {
      emulator.serial0_send(data);
      return;
    }

    if (emulator.bus && typeof emulator.bus.send === "function") {
      emulator.bus.send("serial0-input", data);
    }
  }

  function initXtermTerminal(container, getEmulator) {
    if (!container) return null;

    if (typeof Terminal === "undefined") {
      container.textContent = "Terminal library did not load. Check the xterm.js script reference.";
      console.error("xterm.js Terminal global is missing.");
      return null;
    }

    container.textContent = "";

    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      fontFamily: '"Fira Code", Consolas, "Liberation Mono", monospace',
      fontSize: 14,
      scrollback: 5000,
      theme: {
        background: "#000000",
        foreground: "#ffffff",
        cursor: "#ffffff"
      }
    });

    let fitAddon = null;
    if (typeof FitAddon !== "undefined" && typeof FitAddon.FitAddon === "function") {
      fitAddon = new FitAddon.FitAddon();
      term.loadAddon(fitAddon);
    }

    term.open(container);

    function fit() {
      try {
        if (fitAddon) fitAddon.fit();
      } catch (e) {
        console.warn("Unable to fit xterm terminal:", e);
      }
    }

    fit();
    window.addEventListener("resize", fit);

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(fit);
      observer.observe(container);
    }

    term.onData((data) => {
      sendSerial(getEmulator(), data);
    });

    activeTerminal = term;
    activeFitAddon = fitAddon;

    return {
      term,
      fit,
      focus() {
        try { term.focus(); } catch (_) { /* no-op */ }
      },
      write(data) {
        if (data) term.write(data);
      }
    };
  }

  function attachV86SerialToXterm(emulator, bridge) {
    if (!emulator || !bridge) return;

    if (typeof updateStatus === "function") updateStatus("VM running");
    bridge.write("Booting PolyLinux...\r\n");

    if (typeof emulator.add_listener === "function") {
      emulator.add_listener("serial0-output-byte", (byte) => {
        bridge.write(String.fromCharCode(byte));
      });

      // Some v86 builds expose character output rather than byte output.
      emulator.add_listener("serial0-output-char", (char) => {
        if (typeof char === "string") bridge.write(char);
      });
    }
  }

  window.initXtermTerminal = initXtermTerminal;
  window.attachV86SerialToXterm = attachV86SerialToXterm;
  window.getPolyLinuxTerminal = function () {
    return activeTerminal;
  };
  window.getPolyLinuxTerminalFitAddon = function () {
    return activeFitAddon;
  };
})();
