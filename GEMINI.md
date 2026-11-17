# ITC C508 Portfolio (`ite_portfolio`) — Architecture & Design System Memory

This file records the architecture, design system ("ClaPat Hayler Architectural Brutalist Dark Concrete" + Report v2), and authoring standards for the ITC C508 Deep Learning & NLP Portfolio. Always follow these standards when creating or updating report pages and portfolio views.

---

## 1. Repository Architecture

- **Zero-Build Static Stack**: Plain HTML5, vanilla CSS3, and vanilla ES5/ES6 JavaScript. No bundler, preprocessor, or npm runtime dependencies. Deployed directly from `/` on GitHub Pages.
- **Hybrid SPA + Multi-Page Routing**:
  - **Primary Shell ([index.html](file:///home/iver-labs/ite_portfolio/index.html))**: Single-page application shell hosting 6 hash-routed panels (`#view-home`, `#view-about`, `#view-prelims`, `#view-midterms`, `#view-finals`, `#view-report`). Uses inline `<style>` (`L12–L806`) and an inline hash router (`L1112–L1205`) that cross-fades `#bgStage` between three architectural background renders (`images/hayler-se-workstation.jpg`, `images/hayler-se-telemetry.jpg`, `images/hayler-se-core.jpg`).
  - **Top-Level Redirect Stubs (`about.html`, `prelims.html`, `midterms.html`, `finals.html`, `report.html`)**: 13-line `<meta http-equiv="refresh">` + `window.location.replace('index.html#<section>')` stubs so multi-page links from `reports/*.html` route cleanly back into `index.html`.
  - **Standalone Activity Reports (`reports/*.html`)**: Dedicated HTML pages per coursework activity that load `../css/style.css`, `../js/main.js`, and `../js/content-loader.js`:
    - **Report v2 (Production Standard)**: `reports/prelims-01.html`, `reports/prelims-02.html`, `reports/prelims-03.html`.
    - **Report v1 (Legacy Draft Placeholders, `noindex`)**: `reports/midterms-01.html`, `reports/midterms-02.html`, `reports/finals-01.html`, `reports/finals-02.html`.
- **Data Hydration & Content Sync**:
  - [content.md](file:///home/iver-labs/ite_portfolio/content.md) acts as the structured Markdown source of truth (`# Prelims | # Midterms | # Finals` -> `## <activity-id>` with `- Title:`, `- Term:`, `- Date:`, `- Tags:`, `- Screenshot 1:`, `- Screenshot 2:`, `### Description`, `### Reflection`).
  - [js/content-loader.js](file:///home/iver-labs/ite_portfolio/js/content-loader.js) fetches `content.md` at runtime and hydrates elements with `body[data-activity-id="<id>"]` and `[data-field="description|reflection|screenshot-1|screenshot-2"]`, then invokes `window.initPortfolioUI()`. Hard-coded HTML text and `src` attributes must always match `content.md` so the page renders identically even over `file://` when `fetch` fails.
  - When publishing or upgrading a report page, update:
    1. `reports/<term>-0X.html` (the report page itself)
    2. `content.md` (matching `## <term>-0X` section)
    3. `index.html` (both the `#view-<term>` panel and the `#view-report` index panel)
- **Shared Interactive Behaviors ([js/main.js](file:///home/iver-labs/ite_portfolio/js/main.js))**:
  - `initHeaderOffset()`: `ResizeObserver` sets `--header-h` on `document.documentElement`.
  - `initReportToc()`: `IntersectionObserver` scrollspy sets `aria-current="true"` on `.report-aside .toc a`.
  - `initNavToggle()`, `initNavTabGlide()`, `initLightbox()`, `initCarousels()`, `initTagFilter()`, `initScrollReveal()`, `initBackToTop()`, `initReadingProgress()`.

---

## 2. Design System ("Hayler Brutalist Dark Concrete" + `better-*` Polish)

### A. Color Tokens (`css/style.css` & `index.html`)
- **Canvas & Surfaces**:
  - Base background (`--paper` / `--bg-core`): `#0e1013` / `#0c0e12` over fixed architectural workstation photography (`images/hayler-se-workstation.jpg`).
  - Report backdrop (`body:has(.report-layout)`): Extra `linear-gradient(rgba(10, 12, 15, 0.58), rgba(10, 12, 15, 0.58))` dimming layer over radial vignette + photo to guarantee `>= 7.5:1` reading contrast.
  - Card surface (`--card` / `--bg-card`): `rgba(20, 23, 28, 0.84)` (`rgba(18, 21, 26, 0.82)` in `index.html`) with `backdrop-filter: blur(18px)`–`blur(20px)`.
  - Card hover (`--card-hover` / `--bg-card-hover`): `rgba(26, 30, 37, 0.92)`.
  - Nav dock surface: `rgba(42, 45, 50, 0.72)` (`backdrop-filter: blur(22px)`).
- **Typography & Ink Hierarchy**:
  - Strong / Primary (`--signal` / `--text-strong`): `#ffffff` (headings, `.metric-value`, active controls).
  - Body Ink (`--ink`): `#f5f7fa` (`rgba(245, 247, 250, 0.84)` inside `.report-section p, li`, `.terms dd`).
  - Muted (`--muted`): `#a0a8b4` (inside glass cards, captions, table headers).
  - Muted-on-Photo Contrast Boost: `#c3c9d2` for `.report-facts dt` & `.aside-label`, and `#b8bfca` for `.toc a` (sits directly on the dimmed photo backdrop rather than inside a card).
  - Dim (`--muted-dim`): `rgba(255, 255, 255, 0.34)`.
- **Accents, Data & Status Colors**:
  - Technical Cyan (`--signal-cyan` / `--accent-cyan`): `#5ce1e6` (kickers, wordmark `C508`, focus-visible outlines, `.row-tag` fill).
  - Primary High-Contrast Pill/CTA: Solid `#ffffff` background with `#0b0d10` dark ink (`nav.primary a[aria-current="page"]`, `.back-link`, `.row-tag` text).
  - Subtle Fill (`--signal-soft`): `rgba(255, 255, 255, 0.08)` (code, tags, active TOC item).
  - Data Bar Fill (`.bar`): `#16a6ad` (`>= 3:1` contrast against dark card surface).
  - Highlighted Table Row (`tr.is-key`): `rgba(92, 225, 230, 0.06)`.
  - Verdict Status (`.verdict`): `.is-right` uses `#ffffff` + checkmark SVG; `.is-wrong` uses `#ffb4a8` soft coral-red + X SVG (never rely on color alone).
- **Borders & Dark-Mode Elevation**:
  - Hairline border (`--line`): `rgba(255, 255, 255, 0.16)`; strong line (`--line-strong`): `rgba(255, 255, 255, 0.38)`.
  - Shadow-ring border (`--shadow-border`): `0 0 0 1px oklch(1 0 0 / 0.08)` paired with `border: 1px solid transparent` (for forced-colors accessibility).
  - Hover shadow-ring (`--shadow-border-hover`): `0 0 0 1px oklch(1 0 0 / 0.13)`.
  - Content image inset outline (`--image-outline`): `outline: 1px solid oklch(1 0 0 / 0.1); outline-offset: -1px;`.

### B. Typography & Type Scale
- **Font Stack**:
  - `--font-display`: `'Archivo', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` (Variable width `wdth` `100..125`).
    - `--stretch-display: 112%` on `h1`; `--stretch-heading: 106%` on `h2, h3`.
    - Reset to `font-stretch: 100%` at `@media (max-width: 560px)` to prevent long technical tokens from overflowing mobile viewports.
  - `--font-sans`: `'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` (Body copy, UI controls, tables).
  - `--font-mono`: `'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace` (Kickers, metadata labels, table headers, run IDs, code).
- **Hierarchy & Rules**:
  - `h1`: `clamp(2.2rem, 5.2vw, 4.5rem)`, weight `800`, stretch `112%`, `line-height: 1.1`, `letter-spacing: -0.02em`, `text-wrap: balance`.
  - `.report-takeaway`: `clamp(1.1rem, 1.5vw, 1.3rem)`, `line-height: 1.5`, `max-width: 62ch`, `text-wrap: pretty`.
  - `.report-section h2` / `.report-details > summary`: `1.3rem`, weight `700`, stretch `106%`, `letter-spacing: -0.02em`.
  - `.report-section h3`: `1.02rem`, weight `700`, `margin: 1.75rem 0 0.6rem`.
  - Body `p`: `1rem` (`16px`), `line-height: 1.62`, `max-width: 68ch`, `text-wrap: pretty`.
  - Numeric alignment: Always apply `font-variant-numeric: tabular-nums` (via `.num`, `.metric-value`, `.bar-value`, `.data-table td.mono`) so columns of metrics, epochs, losses, and percentages align vertically.

### C. Concentric Radii, Spacing & Motion
- **Concentric Border Radii**:
  - Cards (`.report-section`, `.glass-card`, `.report-pager a`): `14px`.
  - Nav dock outer: `14px` = `8px` (inner tab radius) + `5px` (padding) + `1px` (border). Mobile drawer: `21px` = `8px` + `12px` + `1px`.
  - Inner tables/figures/viewers (`.table-scroll`, `.report-figure img`, `.pdf-viewer`): `10px`.
  - Pills & CTAs (`.kicker`, `.row-tag`, `.back-link`): `999px`.
  - Tags (`.tag` / `.tag-chip`): `6px`.
- **Layout Grid (`css/style.css`)**:
  - `main`: `--max-w: 1120px`, `padding: 0 2.25rem` (`0 1.25rem` `<=720px`).
  - `.report-layout`: `grid-template-columns: minmax(0, 1fr) 248px; gap: 32px; align-items: start;` (collapses to single column at `<=1000px`).
  - `.report-section`: `padding: 1.75rem 2rem; margin-bottom: 1.25rem;` (`1.25rem 1.1rem` at `<=560px`).
- **Motion & Interaction Guards**:
  - Wrap all `:hover` styles in `@media (hover: hover)` to prevent sticky hover states on touch devices.
  - Active press state scales interactive controls to `scale: 0.96`.
  - Entrance animations (`hayler-fade-in-up`, 300ms `ease-out`) respect `@media (prefers-reduced-motion: no-preference)`.
- **Writing & Editorial Tone (`better-writing`)**:
  - **Summary-first**: Open every report hero with a concrete one-sentence `.report-takeaway` stating the actual finding (not a generic topic description).
  - **Plain, direct section headings**: Use `Summary`, `Approach`, `Results`, `What I learned`, `Technical details`, `Files`.
  - **Evidence-driven**: Prefer scannable `.metric-grid` stat tiles, `.data-table` tables, CSS `.bar-cell` visualizations, `.compare` callouts, and captioned `.report-figures` over walls of prose.

---

## 3. Canonical Report v2 HTML Blueprint (`reports/<activity-id>.html`)

Every new or upgraded report page MUST follow the **Report v2** structure established in [prelims-01.html](file:///home/iver-labs/ite_portfolio/reports/prelims-01.html), [prelims-02.html](file:///home/iver-labs/ite_portfolio/reports/prelims-02.html), and [prelims-03.html](file:///home/iver-labs/ite_portfolio/reports/prelims-03.html):

1. **`<head>` & `<body>`**:
   - `<title><Activity Code/Title> — Report — ITC C508 Portfolio</title>`
   - `<meta name="description" content="<Concrete 1-sentence summary of results>">` (Remove `<meta name="robots" content="noindex">` when upgrading a draft v1 stub to v2).
   - `<link rel="stylesheet" href="../css/style.css">`
   - `<body data-activity-id="<term>-0X">` (e.g. `midterms-01`).
2. **Header (`.site-header`)**:
   - Standard `.wrap` with `.wordmark`, `.nav-toggle`, and `<nav class="primary" id="primary-nav">` where `<a href="../report.html" aria-current="page">Reports</a>` is marked current.
3. **Report Hero (`<section class="hero report-hero">`)**:
   - `<span class="kicker"><Term> &middot; Activity 0X &middot; Week N</span>`
   - `<h1><Activity Title></h1>`
   - `<p class="report-takeaway"><Concrete headline takeaway sentence></p>`
   - `<dl class="report-facts">` with 3–4 compact `<div><dt>Label</dt><dd>Value</dd></div>` pairs (e.g., `Tools`, `Data`, `Runs`/`Model`, `Format`).
4. **Two-Column Layout (`<div class="report-layout">`)**:
   - **Left Column (`<div class="report-body">`)** with 6 standard `<section class="report-section">` blocks matching the TOC anchors:
     1. `#summary` (`<h2>Summary</h2>`):
        - `<p data-field="description">...</p>`
        - `<ul class="metric-grid" aria-label="Key results">` with 3–4 `<li class="metric">` items (`.metric-label`, `.metric-value`, `.metric-note`).
     2. `#approach` (`<h2>Approach</h2>`):
        - Lead paragraph + concise `<ul>` or `<ol>` pipeline steps (`<strong>Stage:</strong> explanation`).
        - Optional `<dl class="terms">` defining 2–4 core domain concepts (`<div><dt>Term</dt><dd>Plain-English definition</dd></div>`).
     3. `#results` (`<h2>Results</h2>`):
        - `<div class="table-scroll"><table class="data-table">...</table></div>`:
          - Use `<tr class="has-bar">` + `<td class="bar-cell"><div class="bar-track"><span class="bar" style="--p: 0.XX"></span><span class="bar-value">XX%</span></div></td>` for visual metric comparisons.
          - Use `class="num"` on numeric `<th>`/`<td>` and `class="mono"` on IDs/hyperparameters.
          - Use `<tr class="is-key">` + `<span class="row-tag">Best|Final</span>` for key runs, or `<tr class="is-total">` for summary rows.
          - Use `<span class="verdict is-right|is-wrong"><svg class="r-icon" ...>...</svg>Label</span>` for qualitative test tables.
        - Optional `<div class="compare">` for 2-column side-by-side comparisons (`<div><h4>...</h4><p>...</p></div>`).
        - `<div class="report-figures">` containing `<figure class="report-figure">` items with full-size `<a>` wrapper, `<img data-field="screenshot-1|screenshot-2" loading="lazy">`, and `<figcaption><strong>Lead.</strong> Context.</figcaption>`.
     4. `#learned` (`<h2>What I learned</h2>`):
        - Four substantive `<p data-field="reflection-1">` .. `<p data-field="reflection-4">` paragraphs (synced in `content.md` with ` || ` separators; see Section 4 below for the mandatory voice and structure).
     5. `#details` (`<details class="report-details">`):
        - `<summary>Technical details <span class="hint"><Short topic hint> <svg class="r-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span></summary>`
        - Concept-focused bullet points mapped to the notebook steps/components (no formulas or raw math equations).
     6. `#files` (`<h2>Files</h2>`):
        - `<ul class="file-list">` with `.file-icon` (`svg.r-icon`), `.file-name` (`<strong>Title</strong><span>Subtitle</span>`), and `.file-action` link (or `<span class="file-pending">[PLACEHOLDER URL]</span>`).
        - `<div class="pdf-viewer"><object data="../docs/<id>-reflection.pdf" type="application/pdf" aria-label="Reflective report PDF">...</object></div>` (when a PDF artifact exists in `docs/` or `portfolio_activities/`).
     - **Bottom Navigation inside `.report-body`**:
       - `<nav class="report-pager" aria-label="More reports">` with `<a class="prev" href="...">` and/or `<a class="next" href="...">`.
       - `<a class="back-link" href="../report.html">&larr; All reports</a>`
   - **Right Sticky Sidebar (`<aside class="report-aside" aria-label="On this page">`)**:
     - `<p class="aside-label">On this page</p>` + `<nav class="toc">` linking to `#summary`, `#approach`, `#results`, `#learned`, `#details`, `#files`.
     - `<div class="aside-links">` with "Open the PDF report" (`target="_blank" rel="noopener"`) and "Download the PDF" (`download`) links.
5. **Footer & Deferred Scripts**:
   - Standard `<footer>` + `<script src="../js/main.js" defer></script>` + `<script src="../js/content-loader.js" defer></script>`.

---

## 4. "What I Learned" (`#learned`) Reflection Standard (Mandatory)

Whenever writing or updating the **What I learned** (`#learned`) section of a report page (as established in [finals-01.html](file:///home/iver-labs/ite_portfolio/reports/finals-01.html#L273-L280)), ALWAYS follow these rules:

- **NO Formulas or Equations**: Never include algebraic formulas, code operators (`+=`, `<`, `>=`, `-`), or dry math equations anywhere in `#learned` (or `#approach` / `#details`). That is not the user's voice.
- **Authentic Student Perspective**: Write from the first-person perspective of a student reflecting on what they genuinely learned by working through the activity and reading/running the notebook code (`"Working through Component I of the notebook taught me..."`, `"The second major group of concepts I learned..."`, `"In Component II, I learned..."`, `"Finally, comparing... showed me how all of these technical concepts must work together..."`).
- **Long, Concept-Rich 4-Paragraph Structure** (`<p data-field="reflection-1">` through `<p data-field="reflection-4">`, synced via ` || ` in [content.md](file:///home/iver-labs/ite_portfolio/content.md)):
  1. **Paragraph 1 — Data Ingestion, Cleaning & Structural Preparation Concepts**: Explain what happens to the raw input before modeling/indexing (e.g., PDF extraction, whitespace normalization, OCR guardrails, sliding-window chunk size and overlap bridges, and visually auditing exported Excel/data tables to see where boundaries preserve context vs. where they bundle too many items or leave tail fragments).
  2. **Paragraph 2 — Representation, Embeddings/Architecture & Indexing Concepts**: Pull the core representation concepts from the notebook explanations (e.g., how dense embeddings map meaning into vector space across languages, hidden model constraints like token-reading limits, why vectors are normalized to unit length for cosine similarity, and why lookup dictionaries and serialized `.pkl`/`.index` files are needed for reproducibility).
  3. **Paragraph 3 — Pipeline Control Flow, Budgeting & Inference Discipline**: Explain how the second half of the pipeline works conceptually (e.g., why upstream retrieval gates everything the generator sees, how token-limited prompt construction protects the question and instructions at the top while packing ranked evidence and trimming cleanly at token boundaries, and how anti-hallucination instructions pair with `eval()`, `torch.no_grad()`, and deterministic beam search).
  4. **Paragraph 4 — Model/Hardware Scaling & How Adjustments Work Together**: Compare the baseline setup against the upgraded/final run (e.g., FLAN-T5 vs. 4-bit NF4 quantized SEA-LION on a Tesla T4 GPU), explain *what each parameter adjustment actually does* to fix the observed failure modes, and connect those lessons directly to the capstone/production system.

