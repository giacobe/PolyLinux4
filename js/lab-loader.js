"use strict";

(function () {
  function replaceAll(text, replacements) {
    return Object.entries(replacements).reduce((out, [key, value]) => {
      return out.split("{{" + key + "}}").join(String(value));
    }, text);
  }

  async function loadLabTemplate() {
    const cfg = window.POLYLINUX_LAB || {};
    const templateUrl = cfg.template || "../lab-template.html";

    const response = await fetch(templateUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Could not load ${templateUrl}: ${response.status} ${response.statusText}`);
    }

    const template = await response.text();
    const html = replaceAll(template, {
      LAB_TITLE: cfg.title || "PolyLinux VM",
      ASSET_BASE: cfg.assetBase || "../",
      LAB_MD: cfg.md || cfg.instructions || "./fs-navigation.md",
      BZIMAGE: cfg.bzimage || cfg.bzImage || "./bzImage",
      INITRD: cfg.initrd || cfg.rootfs || "./rootfs.cpio.gz"
    });

    document.open();
    document.write(html);
    document.close();
  }

  loadLabTemplate().catch((error) => {
    console.error(error);
    document.body.innerHTML = `
      <main style="font-family: system-ui, sans-serif; padding: 2rem; line-height: 1.5;">
        <h1>PolyLinux could not start</h1>
        <p>The shared lab template could not be loaded.</p>
        <pre>${String(error).replace(/[&<>"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]))}</pre>
      </main>
    `;
  });
})();
