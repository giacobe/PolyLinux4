"use strict";

(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function parseFrontMatter(markdown) {
    const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!match) return { meta: {}, body: markdown };

    const meta = {};
    for (const line of match[1].split(/\r?\n/)) {
      const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (!kv) continue;
      meta[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, "");
    }

    return { meta, body: markdown.slice(match[0].length) };
  }

  function getInstructionPath() {
    const cfg = window.POLYLINUX_LAB_CONFIG || {};
    return cfg.md || document.body.dataset.labMd || "./fs-navigation.md";
  }

  function extractIframeSrc(value) {
    const text = String(value || "").trim();
    const match = text.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : text;
  }

  function normalizeMicrosoftFormUrl(value) {
    let url = extractIframeSrc(value).trim().replace(/^['"]|['"]$/g, "");
    if (!url || url === "about:blank" || url === "#") return "";

    if (/forms\.(office|cloud)\.com|forms\.cloud\.microsoft/i.test(url)) {
      if (!/[?&]embed=true/i.test(url)) {
        url += (url.includes("?") ? "&" : "?") + "embed=true";
      }
    }

    return url;
  }

  function configureMicrosoftForm(rawUrl) {
    const frame = document.getElementById("ms-form-frame");
    const placeholder = document.getElementById("form-placeholder");
    if (!frame) return;

    const url = normalizeMicrosoftFormUrl(rawUrl);

    if (url) {
      frame.src = url;
      frame.classList.add("has-form");
      if (placeholder) {
        placeholder.classList.remove("show");
        placeholder.setAttribute("aria-hidden", "true");
        placeholder.style.display = "none";
      }
    } else {
      frame.removeAttribute("src");
      frame.classList.remove("has-form");
      if (placeholder) {
        placeholder.classList.add("show");
        placeholder.removeAttribute("aria-hidden");
        placeholder.style.display = "flex";
      }
    }
  }

  function configurePage(meta) {
    if (meta.title) {
      const title = document.getElementById("lab-title");
      if (title) title.textContent = meta.title;
      document.title = meta.title;
    }

    if (meta.panel_title) {
      const panelTitle = document.getElementById("guide-panel-title");
      if (panelTitle) panelTitle.textContent = meta.panel_title;
    }

    configureMicrosoftForm(meta.form_url || meta.form_embed_url || "");
  }

  function parseHeadingLabelAndTitle(text, index) {
    const raw = String(text || "").trim();
    const match = raw.match(/^([A-Za-z0-9]{1,5})\s*[:\-–—]\s*(.+)$/);

    if (match) {
      return {
        label: match[1].toUpperCase(),
        title: match[2].trim()
      };
    }

    if (/^start$/i.test(raw)) return { label: "START", title: "Start" };
    if (/^ref$/i.test(raw)) return { label: "REF", title: "Reference" };

    return {
      label: index === 0 ? "START" : String(index),
      title: raw
    };
  }

  function markerLengthClass(label) {
    const len = Math.min(Math.max(String(label || "").trim().length, 1), 5);
    return `marker-len-${len}`;
  }

  function rewriteHeading(heading, title) {
    const newHeading = document.createElement("h3");
    newHeading.innerHTML = title;
    heading.replaceWith(newHeading);
    return newHeading;
  }

  function makeTimelineRow(label, title, nodes, index, total) {
    const row = document.createElement("section");
    row.className = "timeline-row";
    if (index === 0) row.classList.add("timeline-first-row");
    if (index === total - 1 || /^ref$/i.test(label)) row.classList.add("timeline-last-row", "quickref-row");

    const spine = document.createElement("div");
    spine.className = "timeline-spine";

    const marker = document.createElement("div");
    marker.className = `timeline-marker ${markerLengthClass(label)}`;
    if (/^start$/i.test(label)) marker.classList.add("start");
    if (/^ref$/i.test(label)) marker.classList.add("ref");
    marker.textContent = String(label).slice(0, 5).toUpperCase();

    const card = document.createElement("article");
    card.className = "lab-card";
    if (index === 0) card.classList.add("intro-card");
    if (!/^start$/i.test(label) && !/^ref$/i.test(label)) card.classList.add("step-block");

    const eyebrow = document.createElement("div");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = /^ref$/i.test(label) ? "Reference" : /^start$/i.test(label) ? "Start" : `Section ${label}`;
    card.appendChild(eyebrow);

    nodes.forEach((node, nodeIndex) => {
      if (nodeIndex === 0 && /^H2$/i.test(node.tagName)) {
        card.appendChild(rewriteHeading(node, escapeHtml(title)));
      } else {
        card.appendChild(node);
      }
    });

    spine.appendChild(marker);
    row.appendChild(spine);
    row.appendChild(card);
    return row;
  }

  function collectSections(rendered) {
    const sections = [];
    let current = null;

    Array.from(rendered.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "H2") {
        current = { heading: node, nodes: [node] };
        sections.push(current);
      } else if (current) {
        current.nodes.push(node);
      } else if (node.textContent && node.textContent.trim()) {
        current = { heading: null, nodes: [node], syntheticTitle: "Introduction" };
        sections.push(current);
      }
    });

    return sections;
  }

  function renderMarkdown(markdown) {
    if (!window.marked || !window.DOMPurify) {
      throw new Error("The Markdown libraries did not load. Check the marked.js and DOMPurify script tags.");
    }

    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false
    });

    const rawHtml = marked.parse(markdown);
    const cleanHtml = DOMPurify.sanitize(rawHtml, { USE_PROFILES: { html: true } });

    const rendered = document.createElement("div");
    rendered.innerHTML = cleanHtml;
    return rendered;
  }

  function renderInstructions(markdown) {
    const { meta, body } = parseFrontMatter(markdown);
    configurePage(meta);

    const guide = document.getElementById("guide-scroll");
    if (!guide) return;

    const rendered = renderMarkdown(body);
    const sections = collectSections(rendered);

    if (!sections.length) {
      guide.innerHTML = `<p class="instructions-error">No sections found. Use <code>## START: Title</code>, <code>## 1: Title</code>, and <code>## REF: Title</code> headings in the Markdown file.</p>`;
      return;
    }

    guide.innerHTML = "";

    sections.forEach((section, index) => {
      const headingText = section.heading ? section.heading.textContent : section.syntheticTitle;
      const parsed = parseHeadingLabelAndTitle(headingText, index);
      guide.appendChild(makeTimelineRow(parsed.label, parsed.title, section.nodes, index, sections.length));
    });
  }

  async function loadInstructions() {
    const mdPath = getInstructionPath();

    try {
      const response = await fetch(mdPath, { cache: "no-store" });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const markdown = await response.text();
      renderInstructions(markdown);
    } catch (error) {
      console.error("Instruction load error:", error);
      const guide = document.getElementById("guide-scroll");
      if (guide) {
        guide.innerHTML = `
          <div class="instructions-error">
            <h3>Could not load instructions</h3>
            <p>Check that <code>${escapeHtml(mdPath)}</code> exists and that the page is being served from a web server.</p>
            <pre>${escapeHtml(error.message || error)}</pre>
          </div>
        `;
      }
    }
  }

  function fitLinuxTerminalSoon() {
    setTimeout(() => {
      if (window.terminals && window.terminals.linux_serial && typeof window.terminals.linux_serial.fit === "function") {
        window.terminals.linux_serial.fit();
      }
    }, 260);
  }

  function setupInstructionToggle() {
    const btn = document.getElementById("btn-instructions");
    const main = document.getElementById("main");
    if (!btn || !main) return;

    main.classList.remove("guide-collapsed");
    btn.setAttribute("aria-expanded", "true");
    btn.textContent = "Hide Instructions";

    btn.addEventListener("click", () => {
      const collapsed = main.classList.toggle("guide-collapsed");
      btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
      btn.textContent = collapsed ? "Show Instructions" : "Hide Instructions";
      fitLinuxTerminalSoon();
    });
  }

  function setupFormToggle() {
    const btn = document.getElementById("btn-form");
    const main = document.getElementById("main");
    if (!btn || !main) return;

    main.classList.add("form-open");
    btn.setAttribute("aria-expanded", "true");
    btn.textContent = "Close Codes Form";

    btn.addEventListener("click", () => {
      const open = main.classList.toggle("form-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close Codes Form" : "Open Codes Form";
      fitLinuxTerminalSoon();
    });
  }

  function setupGuideWheelScroll() {
    const guide = document.getElementById("guide-scroll");
    if (!guide) return;

    guide.addEventListener("wheel", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();

      const lineHeight = 32;
      const pageHeight = Math.max(guide.clientHeight - 48, 120);
      let delta = event.deltaY;

      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= lineHeight;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= pageHeight;

      guide.scrollTop += delta;
    }, { passive: false, capture: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupInstructionToggle();
    setupFormToggle();
    setupGuideWheelScroll();
    loadInstructions();
  });
})();
