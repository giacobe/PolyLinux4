"use strict";

function updateStatus(text) {
    const status = document.getElementById("status");
    if (status) status.textContent = text;
}

function setPolyLinuxTheme(mode) {
    const light = mode === "light";
    document.documentElement.classList.toggle("polylinux-light", light);
    document.documentElement.classList.toggle("polylinux-dark", !light);
    document.body.classList.toggle("polylinux-light", light);
    document.body.classList.toggle("polylinux-dark", !light);
    localStorage.setItem("polylinux-theme", light ? "light" : "dark");

    const btn = document.getElementById("btn-theme");
    if (btn) btn.textContent = light ? "🌙 Theme" : "☀️ Theme";

    if (typeof window.applyNormalLinuxTerminalTheme === "function") {
        setTimeout(window.applyNormalLinuxTerminalTheme, 0);
        setTimeout(window.applyNormalLinuxTerminalTheme, 150);
    }
}

function toggleTheme() {
    const isLight = document.body.classList.contains("polylinux-light");
    setPolyLinuxTheme(isLight ? "dark" : "light");
}

function resetLab() {
    if (window.emulator && typeof window.emulator.restart === "function") {
        updateStatus("Restarting Linux VM...");
        window.emulator.restart();
        return;
    }
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    setPolyLinuxTheme(localStorage.getItem("polylinux-theme") || "dark");

    const themeBtn = document.getElementById("btn-theme");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    const resetBtn = document.getElementById("btn-reset");
    if (resetBtn) resetBtn.addEventListener("click", resetLab);
});
