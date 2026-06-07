"use strict";

function getPolyLinuxLabConfig() {
  return window.POLYLINUX_LAB_CONFIG || {
    bzimage: "./images/bzImage",
    initrd: "./images/rootfs.cpio.gz",
    assetBase: "./"
  };
}

function joinAssetPath(base, path) {
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("/")) return path;
  return String(base || "./") + path.replace(/^\.\//, "");
}

function createVM({ screen_container, serial_container, bzimage_url, initrd_url, assetBase }) {
  return new V86({
    wasm_path: joinAssetPath(assetBase, "lib/v86.wasm"),
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 8 * 1024 * 1024,
    screen_container,
    serial_container,
    use_worker: true,
    use_shared_memory: false,
    disable_speaker: true,
    network_relay: null,
    bios: { url: joinAssetPath(assetBase, "bios/seabios.bin") },
    vga_bios: { url: joinAssetPath(assetBase, "bios/vgabios.bin") },
    bzimage: { url: bzimage_url },
    initrd: { url: initrd_url },
    cmdline: "console=tty0 console=ttyS0,115200 loglevel=3 acpi=off noapic nolapic panic=-1 root=/dev/ram0 rw quiet net.ifnames=0 biosdevname=0",
    autostart: true
  });
}

window.addEventListener("load", function () {
  const linuxSerial = document.getElementById("linux_serial");
  const linuxCont = document.getElementById("linux_container");

  if (!linuxSerial || !linuxCont) {
    console.error("Linux VM containers are missing from lab-template.html");
    if (typeof updateStatus === "function") updateStatus("VM container missing");
    return;
  }

  try {
    const cfg = getPolyLinuxLabConfig();

    const terminalBridge = initXtermTerminal(linuxSerial, () => window.emulator);

    window.emulator = createVM({
      screen_container: null,
      serial_container: null,
      bzimage_url: cfg.bzimage,
      initrd_url: cfg.initrd,
      assetBase: cfg.assetBase || "./"
    });

    attachV86SerialToXterm(window.emulator, terminalBridge);

    linuxCont.addEventListener("mousedown", () => {
      if (terminalBridge) terminalBridge.focus();
    });

    if (terminalBridge) terminalBridge.focus();
  } catch (e) {
    console.error("Linux VM error:", e);
    if (typeof updateStatus === "function") {
      updateStatus("Linux VM failed to start. Check console and file paths.");
    }
  }
});
