"use strict";

(function () {
  const params = new URLSearchParams(window.location.search);

  function firstValue(...values) {
    for (const value of values) {
      if (typeof value === "string" && value.trim()) return value.trim();
    }
    return "";
  }

  window.POLYLINUX_LAB_CONFIG = {
    md: firstValue(params.get("md"), document.body?.dataset?.labMd, "./fs-navigation.md"),
    bzimage: firstValue(params.get("bz"), params.get("bzimage"), document.body?.dataset?.bzimage, "./images/bzImage"),
    initrd: firstValue(params.get("initrd"), params.get("rootfs"), document.body?.dataset?.initrd, "./images/rootfs.cpio.gz")
  };
})();
