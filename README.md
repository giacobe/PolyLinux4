# PolyLinux 4

PolyLinux 4 is a browser-based Linux lab interface built around a shared HTML template, lab-specific Markdown instructions, and a v86-backed Linux VM.

## Repository structure

```text
.
├── index.html                  # Root launcher for Lab 1
├── lab-template.html           # Shared UI template for all labs
├── css/
│   └── polylinux-vm.css        # Full layout, timeline, VM, and form styling
├── js/
│   ├── lab-loader.js           # Loads the shared template and injects lab config
│   ├── instructions.js         # Loads Markdown, parses front matter, builds timeline cards
│   ├── terminal.js             # Browser serial terminal support
│   ├── ui.js                   # Theme/reset/status helpers
│   └── vm-init.js              # Starts the v86 VM
├── lib/
│   ├── libv86.js               # Add from your v86 build/deployment
│   └── v86.wasm                # Add from your v86 build/deployment
├── bios/
│   ├── seabios.bin             # Add from your v86 build/deployment
│   └── vgabios.bin             # Add from your v86 build/deployment
└── lab1/
    ├── index.html              # Lab 1 launcher
    ├── lab1.html               # Compatibility alias for Lab 1 launcher
    ├── fs-navigation.md        # Lab 1 instructions and metadata
    ├── bzImage                 # Add Lab 1 kernel image
    └── rootfs.cpio.gz          # Add Lab 1 initrd/rootfs
```

## Markdown lab format

Each lab Markdown file starts with simple front matter:

```yaml
---
title: "PolyLinux File System Navigation"
short_title: "FS-Navigation"
panel_title: "Learning Path"
form_url: "https://forms.office.com/..."
---
```

Timeline cards are created from level-2 Markdown headings:

```md
## START: Welcome to PolyLinux!
## LOGIN: Get On the Machine
## 1: Level Basic1
## REF: Quick Reference
```

The text before the colon becomes the timeline marker. The text after the colon becomes the card title.

## Adding another lab

Create a new folder such as `lab2/`, copy `lab1/index.html`, and update only the lab-specific values:

```html
<script>
  window.POLYLINUX_LAB = {
    title: "PolyLinux Lab 2",
    template: "../lab-template.html",
    assetBase: "../",
    md: "./fs-navigation.md",
    bzimage: "./bzImage",
    initrd: "./rootfs.cpio.gz"
  };
</script>
<script src="../js/lab-loader.js" defer></script>
```

## Runtime assets

This zip includes the complete source structure. It does not fabricate the VM runtime binaries. Add your existing v86 and lab image files to these paths:

```text
lib/libv86.js
lib/v86.wasm
bios/seabios.bin
bios/vgabios.bin
lab1/bzImage
lab1/rootfs.cpio.gz
```
