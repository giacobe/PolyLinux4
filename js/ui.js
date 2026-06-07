"use strict";

(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function updateStatus(message) {
    const badge = document.querySelector(".vm-badge");
    if (badge && message) badge.textContent = message;
  }

  function fitLinuxTerminalSoon() {
    window.setTimeout(() => {
      const terminal = $("linux_serial");
      if (terminal) terminal.scrollTop = terminal.scrollHeight;
    }, 50);
  }

  function setupThemeButton() {
    const btn = $("btn-theme");
    if (!btn) return;

    const saved = localStorage.getItem("polylinux-theme");
    if (saved === "light") {
      document.body.classList.remove("polylinux-dark");
      document.body.classList.add("polylinux-light");
      btn.textContent = "🌙 Theme";
    }

    btn.addEventListener("click", () => {
      const light = document.body.classList.toggle("polylinux-light");
      document.body.classList.toggle("polylinux-dark", !light);
      localStorage.setItem("polylinux-theme", light ? "light" : "dark");
      btn.textContent = light ? "🌙 Theme" : "☀️ Theme";
    });
  }

  function setupResetButton() {
    const btn = $("btn-reset");
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (window.emulator && typeof window.emulator.stop === "function") {
        try { window.emulator.stop(); } catch (e) { console.warn(e); }
      }
      window.location.reload();
    });
  }

  window.updateStatus = updateStatus;
  window.fitLinuxTerminalSoon = fitLinuxTerminalSoon;

  document.addEventListener("DOMContentLoaded", () => {
    setupThemeButton();
    setupResetButton();
  });
})();
