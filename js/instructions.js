"use strict";

(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function inlineMarkdown(text) {
    let out = escapeHtml(text);
    out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return out;
  }

  function parseFrontMatter(markdown) {
    const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!match) return { meta: {}, body: markdown };

    const raw = match[1];
    const meta = {};
    const sections = [];
    const lines = raw.split(/\r?\n/);
    let inSections = false;
    let current = null;

    for (const line of lines) {
      if (/^sections:\s*$/.test(line.trim())) {
        inSections = true;
        continue;
      }

      if (!inSections) {
        const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (kv) meta[kv[1]] = kv[2].replace(/^[ '\"]|[ '\"]$/g, "").trim();
        continue;
      }

      const item = line.match(/^\s*-\s+label:\s*(.*)$/);
      if (item) {
        current = { label: item[1].trim().replace(/^[ '\"]|[ '\"]$/g, "") };
        sections.push(current);
        continue;
      }

      const prop = line.match(/^\s+([A-Za-z0-9_-]+):\s*(.*)$/);
      if (prop && current) {
        current[prop[1]] = prop[2].trim().replace(/^[ '\"]|[ '\"]$/g, "");
      }
    }

    meta.sections = sections;
    return { meta, body: markdown.slice(match[0].length) };
  }

  function parseSections(body) {
    const lines = body.split(/\r?\n/);
    const sections = [];
    let current = null;

    for (const line of lines) {
      const heading = line.match(/^##\s+(.+)\s*$/);
      if (heading) {
        current = { title: heading[1].trim(), lines: [] };
        sections.push(current);
      } else if (current) {
        current.lines.push(line);
      }
    }

    return sections;
  }

  function renderMarkdownLines(lines) {
    const html = [];
    let listItems = [];
    let paragraph = [];

    function flushParagraph() {
      if (paragraph.length) {
        html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
        paragraph = [];
      }
    }

    function flushList() {
      if (listItems.length) {
        html.push(`<ul>${listItems.map(item => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
        listItems = [];
      }
    }

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        flushParagraph();
        flushList();
        continue;
      }

      const bullet = line.match(/^-\s+(.+)$/);
      if (bullet) {
        flushParagraph();
        listItems.push(bullet[1]);
        continue;
      }

      flushList();
      paragraph.push(line);
    }

    flushParagraph();
    flushList();
    return html.join("\n");
  }

  function findSectionMeta(metaSections, section, index) {
    if (Array.isArray(metaSections) && metaSections[index]) return metaSections[index];
    return { label: String(index), title: section.title, icon: "" };
  }

  function displayMarkerLabel(label) {
    return String(label || "").trim().slice(0, 5);
  }

  function markerLabelLength(label) {
    return Math.min(Math.max(displayMarkerLabel(label).length, 1), 5);
  }

  function markerLengthClass(label) {
    return `marker-len-${markerLabelLength(label)}`;
  }

  function markerClass(label, index, total) {
    const normalized = String(label || "").toLowerCase();
    const classes = ["timeline-marker", markerLengthClass(label)];
    if (index === 0 || normalized === "start" || normalized === "intro") classes.push("start");
    if (index === total - 1 || normalized === "ref") classes.push("ref");
    return classes.join(" ");
  }

  function extractIframeSrc(value) {
    const text = String(value || "").trim();
    const match = text.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : text;
  }

  function normalizeMicrosoftFormUrl(value) {
    let url = extractIframeSrc(value).trim().replace(/^[ '\"]|[ '\"]$/g, "");
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
        placeholder.style.pointerEvents = "none";
      }
    } else {
      frame.removeAttribute("src");
      frame.classList.remove("has-form");
      if (placeholder) {
        placeholder.classList.add("show");
        placeholder.removeAttribute("aria-hidden");
        placeholder.style.display = "flex";
        placeholder.style.pointerEvents = "none";
      }
    }
  }

  function renderInstructions(markdown) {
    const { meta, body } = parseFrontMatter(markdown);
    const sections = parseSections(body);
    const guide = document.getElementById("guide-scroll");
    if (!guide) return;

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

    if (!sections.length) {
      guide.innerHTML = "<p>No sections found. Use ## headings in the Markdown file.</p>";
      return;
    }

    guide.innerHTML = sections.map((section, index) => {
      const cfg = findSectionMeta(meta.sections, section, index);
      const label = cfg.label || (index === 0 ? "START" : String(index));
      const title = cfg.title || section.title;
      const icon = cfg.icon || "";
      const isIntro = index === 0;
      const isRef = String(label).toLowerCase() === "ref" || index === sections.length - 1;
      const rowClasses = ["timeline-row"];
      if (isIntro) rowClasses.push("timeline-intro-row");
      if (isRef) rowClasses.push("quickref-row");
      const cardClasses = ["lab-card"];
      if (isIntro) cardClasses.push("intro-card");
      if (!isIntro && !isRef) cardClasses.push("step-block");

      return `
        <section class="${rowClasses.join(" ")}">
          <div class="timeline-spine"><div class="${markerClass(label, index, sections.length)}">${escapeHtml(displayMarkerLabel(label))}</div></div>
          <article class="${cardClasses.join(" ")}">
            ${icon ? `<div class="lab-card-icon">${escapeHtml(icon)}</div>` : ""}
            ${isIntro
              ? `<h2>${inlineMarkdown(title)}</h2>`
              : `<div class="eyebrow">${escapeHtml(label === "REF" ? "Reference" : "Section " + label)}</div><h3>${inlineMarkdown(title)}</h3>`}
            ${renderMarkdownLines(section.lines)}
          </article>
        </section>`;
    }).join("\n");
  }

  function getInstructionPath() {
    const cfg = window.POLYLINUX_LAB_CONFIG || {};
    return cfg.md || document.body.dataset.labMd || "./fs-navigation.md";
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
        guide.innerHTML = `<p>Could not load instructions.</p><p>Check that <code>${escapeHtml(mdPath)}</code> exists and that the page is being served from a local web server.</p>`;
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
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }

      const lineHeight = 32;
      const pageHeight = Math.max(guide.clientHeight - 48, 120);
      let delta = event.deltaY;
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        delta *= lineHeight;
      } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        delta *= pageHeight;
      }
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
