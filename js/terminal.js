"use strict";

(function () {
  function stripAnsi(input) {
    return String(input)
      .replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, "")
      .replace(/\x1b\][^\x07]*(\x07|\x1b\\)/g, "")
      .replace(/\x1b[()][A-Za-z0-9]/g, "")
      .replace(/\x1b[@-Z\\-_]/g, "");
  }

  function appendTerminalText(el, text) {
    if (!el || !text) return;

    let cleaned = stripAnsi(text).replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    // Basic backspace handling.
    while (cleaned.includes("\b")) {
      cleaned = cleaned.replace(/[^\n]?\b/, "");
    }

    el.textContent += cleaned;

    // Keep the DOM from growing without bound during long sessions.
    const maxChars = 160000;
    if (el.textContent.length > maxChars) {
      el.textContent = el.textContent.slice(-maxChars);
    }

    el.scrollTop = el.scrollHeight;
  }

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

  function keyToSerial(event) {
    if (event.ctrlKey && event.key && event.key.length === 1) {
      const code = event.key.toUpperCase().charCodeAt(0);
      if (code >= 64 && code <= 95) return String.fromCharCode(code - 64);
    }

    switch (event.key) {
      case "Enter": return "\r";
      case "Backspace": return "\x7f";
      case "Tab": return "\t";
      case "Escape": return "\x1b";
      case "ArrowUp": return "\x1b[A";
      case "ArrowDown": return "\x1b[B";
      case "ArrowRight": return "\x1b[C";
      case "ArrowLeft": return "\x1b[D";
      default:
        if (!event.altKey && !event.metaKey && event.key.length === 1) return event.key;
        return "";
    }
  }

  function enableSerialInput(displayElement, getEmulator) {
    if (!displayElement) return;

    displayElement.setAttribute("role", "textbox");
    displayElement.setAttribute("aria-label", "Linux serial terminal");
    displayElement.setAttribute("aria-multiline", "true");
    displayElement.tabIndex = 0;

    displayElement.addEventListener("keydown", (event) => {
      const data = keyToSerial(event);
      if (!data) return;

      event.preventDefault();
      sendSerial(getEmulator(), data);
    });

    displayElement.addEventListener("paste", (event) => {
      const text = event.clipboardData ? event.clipboardData.getData("text") : "";
      if (!text) return;
      event.preventDefault();
      sendSerial(getEmulator(), text.replace(/\n/g, "\r"));
    });
  }

  function startAnsiStripper(displayElement, getEmulator) {
    if (!displayElement) return;

    displayElement.textContent = "Booting PolyLinux...\n";

    const emulator = getEmulator();
    if (!emulator) return;

    let attached = false;

    function attach() {
      if (attached) return;
      attached = true;

      if (typeof emulator.add_listener === "function") {
        emulator.add_listener("serial0-output-char", (char) => appendTerminalText(displayElement, char));
        emulator.add_listener("serial0-output-byte", (byte) => appendTerminalText(displayElement, String.fromCharCode(byte)));
      }

      if (typeof updateStatus === "function") updateStatus("VM running");
    }

    attach();
  }

  window.enableSerialInput = enableSerialInput;
  window.startAnsiStripper = startAnsiStripper;
})();
