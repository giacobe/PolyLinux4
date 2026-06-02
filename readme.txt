PolyLinux VM with Markdown Instructions and MS Forms Panel
==========================================================

Run this package from a local web server, not directly from file://.

Expected runtime files to add/copy into this folder:

  lib/libv86.js
  lib/v86.wasm
  lib/xterm.js
  lib/xterm-addon-fit.js
  css/xterm.css
  bios/seabios.bin
  bios/vgabios.bin
  images/bzImage
  images/rootfs.cpio.gz

Main files:

  index.html
  css/polylinux-vm.css
  js/ui.js
  js/terminal.js
  js/vm-init.js
  js/instructions.js
  fs-navigation.md

Lab-specific content belongs in fs-navigation.md.

The displayed title, panel title, section labels, section titles, icons, and Microsoft Form URL are controlled from the Markdown front matter.

To enable the right-side Microsoft Forms panel, edit this line in fs-navigation.md:

  form_url: "about:blank"

Replace it with your Microsoft Form embed/share URL, for example:

  form_url: "https://forms.cloud.microsoft/pages/responsepage.aspx?..."

The left-side Instructions tab toggles the Markdown instruction panel.
The right-side Codes Form tab toggles the Microsoft Forms iframe panel.


Microsoft Forms note:
Set form_url in fs-navigation.md to the normal Microsoft Forms URL or paste the iframe embed code src value. The page automatically adds embed=true for Microsoft Forms URLs so the form loads inside the right-side panel instead of opening as a separate page.
