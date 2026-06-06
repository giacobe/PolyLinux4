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

  linuxCont.addEventListener("mousedown", () => {
    if (linuxSerial && linuxSerial.focus) linuxSerial.focus();
  });

  try {
    const cfg = getPolyLinuxLabConfig();
    const dummyLinuxSerial = document.createElement("textarea");

    Object.assign(dummyLinuxSerial.style, {
      position: "absolute",
      opacity: "0",
      pointerEvents: "none",
      zIndex: "-1",
      width: "1px",
      height: "1px",
      top: "0",
      left: "0"
    });

    document.body.appendChild(dummyLinuxSerial);

    window.emulator = createVM({
      screen_container: null,
      serial_container: dummyLinuxSerial,
      bzimage_url: cfg.bzimage,
      initrd_url: cfg.initrd,
      assetBase: cfg.assetBase || "./"
    });

    enableSerialInput(linuxSerial, () => window.emulator);
    startAnsiStripper(linuxSerial, () => window.emulator);
    if (linuxSerial.focus) linuxSerial.focus();
  } catch (e) {
    console.error("Linux VM error:", e);
    if (typeof updateStatus === "function") {
      updateStatus("Linux VM failed to start. Check console and file paths.");
    }
  }
});
