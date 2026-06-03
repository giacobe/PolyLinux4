PolyLinux VM with Markdown Instructions and MS Forms Panel
==========================================================

Run this package from a local web server, not directly from file://.

Installation:
=============
1> Set up a clean OS (maybe Ubuntu 24.04 LTS Desktop)

2> Install your favorite web server

`sudo apt install nginx`

3> Modify the files on your web server 

`cd /var/www/html`

4> Clone this repo

`sudo git clone https://github.com/giacobe/Polylinux4`

5> copy (sudo cp) your rootfs.cpio.gz and bzImage files into /var/www/html/Polylinux4/images folder
 
Now, use your browser to navigate to http://localhost/Polylinux4

Expected runtime files to add/copy into this folder (leave all of this alone):
==============================================================================

+ lib/libv86.js
+ lib/v86.wasm
+ lib/xterm.js
+ lib/xterm-addon-fit.js
+ css/xterm.css
+ bios/seabios.bin
+ bios/vgabios.bin
+ css/polylinux-vm.css
+ js/ui.js
+ js/terminal.js
+ js/instructions.js

Content files to modify for your individual lab:
================================================
+ index.html
+ fs-navigation.md
+ images/bzImage
+ images/rootfs.cpio.gz
+ js/vm-init.js
  
index.html
----------
This should mostly stay the same, but you might want to make some changes depending on what you want for the look and feel.

fs-navigation.md
----------------
Lab-specific content belongs in fs-navigation.md. This mostly the instructions for the participant. The displayed title, panel title, section labels, section titles, icons, and Microsoft Form URL are controlled from the Markdown front matter.

To enable the right-side Microsoft Forms panel, edit this line in fs-navigation.md:

  form_url: "about:blank"

Replace it with your Microsoft Form embed/share URL, for example:

  `form_url: "https://forms.cloud.microsoft/pages/responsepage.aspx?..."`

The left-side Instructions tab toggles the Markdown instruction panel.
The right-side Codes Form tab toggles the Microsoft Forms iframe panel.

Microsoft Forms note:
Set form_url in fs-navigation.md to the normal Microsoft Forms URL or paste the iframe embed code src value. The page automatically adds embed=true for Microsoft Forms URLs so the form loads inside the right-side panel instead of opening as a separate page.

images directory
----------------
host your bzImage and rootfs.cpio.gz files here

js/vm-init.js
-------------
this is where you identify the bzImage and rootfs.cpio.gz file names/locations
