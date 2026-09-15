# Design Document

## Overview

A static, framework-free multi-page site (plain HTML + one shared
stylesheet, no build step) so it can be pushed straight to GitHub Pages.
Each page is a self-contained `.html` file that repeats a small shared
header/footer markup block; there is no templating engine, so shared markup
is duplicated by hand across files and shared *styling* lives in one CSS
file. This matches the project as already scaffolded.

## Architecture

```
portfolio/
├── index.html        Home — intro + period stepper + summary cards
├── about.html         About Me — profile placeholder, bio, skills, contact
├── prelims.html        Period 1 — activity cards
├── midterms.html        Period 2 — activity cards
├── finals.html           Period 3 — activity cards
├── report.html            Report — index of every activity's report page
├── css/
│   └── style.css       Design tokens + all component styling
├── images/               Real photos/screenshots go here
├── reports/                One .html detail page per activity (+ optional
│                            attached notebook/doc files)
└── README.md              Customization + GitHub Pages deploy steps
```

Each period page and `about.html` share the same header/nav markup and
footer markup, with only the active nav link's `aria-current="page"`
differing. `index.html` additionally embeds a lightweight, non-interactive
stepper preview linking into the three period pages.

## Design Tokens (already defined in `css/style.css`)

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#F5F4F0` | Page background |
| `--ink` | `#1B1B1F` | Primary text |
| `--muted` | `#5B5B63` | Secondary text, nav links |
| `--signal` | `#5B3EE8` | Accent — links, active states, tags |
| `--signal-soft` | `#ECE8FB` | Accent backgrounds (kicker, tags) |
| `--line` | `#DAD8D2` | Borders/dividers |
| Display font | Fraunces | H1/H2, headlines |
| Body font | IBM Plex Sans | Paragraph text, nav |
| Mono font | IBM Plex Mono | Wordmark, tags, meta labels, stepper |

Rationale: serif display type gives the "language/text" subject matter a
print-like, editorial feel; monospace labels echo tokens/code, tying the
type system back to the course's NLP focus.

## Components and Interfaces

### Header (`.site-header`)
- Wordmark (`.wordmark`) + `<nav class="primary">` with six links (Home,
  About Me, Prelims, Midterms, Finals, Report).
- Active page marked via `aria-current="page"`, styled with an underline in
  `css/style.css` (`nav.primary a[aria-current="page"]`).
- No JS-driven mobile menu currently — nav links wrap via flexbox
  (`flex-wrap: wrap`) at narrow widths rather than collapsing into a
  hamburger. Acceptable at 6 short links; revisit if nav grows further.

### Hero (`.hero`, home page only)
- Kicker pill (`.kicker`), `<h1>`, intro paragraph, link into About.
- Below it, a non-interactive `.stepper` (three `<a>` pills) linking
  directly into each period page — this is the Home page's "summary" of
  Requirement 2.

### Stepper (`.stepper`, all period pages)
- Three equal-width pill segments in one bordered row; current page styled
  with a solid dark background (`.stepper a[aria-current="page"]`).
- Implements Requirement 5.3 — visually encodes chronological order and
  current position, which is appropriate here because the three periods
  really are sequential, not just categorical.

### Activity card (`.activity-card`, period pages)
- Two-column grid: `.img-placeholder` (or a real `<img>` once supplied) on
  the left, content block on the right — collapses to one column under
  640px (`@media (max-width: 640px)`).
- Content block: `.activity-meta` (week/date, mono), `<h3>` title,
  description paragraph, `.tags` (one `.tag` pill per technology), and a
  report/notebook link.
- New activities are added by copying one `<article class="activity-card">`
  block — satisfies Requirement 4.5 without touching shared CSS.

### Image placeholder (`.img-placeholder`)
- Dashed-border box with a centered inline SVG icon and a short mono
  caption describing what image belongs there.
- `.round` modifier produces the circular profile-photo variant used on
  the About page.
- Always given a `role="img"` + `aria-label` so screen readers get a
  meaningful description instead of nothing (Requirement 6.2).

### Report pages (`report.html` index + `reports/*.html` detail pages)
- **`report.html`** — an index page, same header/nav/footer shell as every
  other page with its own `aria-current="page"` nav entry. Uses
  `.report-list` grouped by period (Prelims/Midterms/Finals), reusing the
  `.activity-meta`/`.tags` visual language already established by activity
  cards. Each entry is a link into that activity's own detail page below —
  it does not duplicate the report content itself.
- Each activity card on `prelims.html`/`midterms.html`/`finals.html` links
  its existing report affordance directly to the **same** detail page, so
  there are two paths into one page: via the period page, and via the
  Report index. This is why the "Report pending" `aria-disabled` span
  currently on every activity card exists — it becomes a real link once
  that activity's detail page is written.
- **Activity report detail page** (`reports/<period>-<slug>.html`) — one
  static HTML file per activity, built from a shared template:
  - Same header/nav/footer as every page (Report nav entry stays marked
    active, since the page lives under that section).
  - Activity meta + title, reusing `.activity-meta`/`<h3>` styling.
  - `.report-gallery` — one or more screenshots (`<img>`, descriptive
    `alt` text each), laid out in a responsive grid that collapses to one
    column under 640px.
  - **Description** section — prose, what was built/done, same body type
    as the rest of the site.
  - **Reflection** section — a visually distinct `<section>` (own
    `<h2>Reflection</h2>`) for the student's own thoughts on the activity,
    kept separate from the description so a reader can tell "what
    happened" apart from "what I thought about it."
  - Optional attachment — if the student wants to also link the
    underlying notebook/document, a single labeled download/open link at
    the bottom; never an inline embed for formats the browser can't
    render (`.ipynb`, `.docx`, etc.).
  - A "← Back to {Period}" link at the bottom.
- Not-yet-written reports: the activity card keeps the existing
  `aria-disabled="true"` "Report pending" span (see Error Handling)
  instead of linking to a page that doesn't exist yet.
- Adding a new activity's report = copy the shared detail-page template,
  fill it in, link it from both that activity's card and the Report index
  entry. No shared CSS/layout changes (Requirement 8.7).

### About page grid (`.about-grid`)
- Two-column layout: profile placeholder (fixed 200px column) + bio/skills/
  contact block, collapsing to one column under 640px.
- `.skills-list` renders skills as mono pill tags, reusing the `.tag`
  visual language from activity cards for consistency.

### Footer
- Simple two-item flex row (course label + contextual link back to home or
  site-wide info), repeated per page.

## Data Model (conceptual — no build step, so this is authored directly in markup)

```
Page
├── nav: { label: string; href: string; active: boolean }[]

ActivityCard
├── image: { src?: string; placeholderLabel: string }
├── meta: string        // "Activity 01 · Week 3"
├── title: string
├── description: string
├── tags: string[]
└── reportUrl?: string  // omitted/disabled if not yet available

AboutContent
├── photo: { src?: string; placeholderLabel: string }
├── name: string
├── bio: string[]
├── skills: string[]
└── contact: { email?: string; github?: string }

ActivityReport
├── period: "Prelims" | "Midterms" | "Finals"
├── activityTitle: string
├── meta: string                          // "Activity 01 · Week 2"
├── slug: string                           // reports/prelims-01.html
├── screenshots: { src: string; alt: string }[]
├── description: string
├── reflection: string
├── attachment?: { label: string; href: string }  // optional notebook/doc
└── status: "available" | "pending"
```

Since there's no templating layer, these "models" are just the mental
schema each hand-authored HTML block follows — kept here so future edits
(or a future migration to a static-site generator) stay consistent.

## Error Handling

- **Missing photo/screenshot**: use `.img-placeholder` (dashed box + label)
  instead of an `<img>` with a bad `src` — never leaves a broken-image icon
  on the page (Requirements 3.4, 4.3).
- **Report link not ready**: leave the `<a>` out of the card, or render it
  with `aria-disabled="true"` and no `href`, rather than linking to `#`
  (Requirement 4.4).
- **Missing period content**: if a period genuinely has zero activities yet,
  keep the period's intro paragraph but omit the `.activity-list` section
  rather than rendering an empty gap.
- **Activity report not yet written**: keep the activity card's
  `aria-disabled="true"` "Report pending" span instead of linking to a
  `reports/*.html` page that doesn't exist yet (Requirement 8.6).
- **Optional attachment in an unrenderable format**: never embed a
  `.ipynb`, `.docx`, or `.pptx` attachment inline — always a plain
  download/open link, since attempting to embed them produces a blank
  frame or an unexplained download prompt (Requirement 8.5).

## Testing Strategy

Given this is static HTML/CSS with no build pipeline, testing is manual and
checklist-driven rather than automated:

- **Cross-page nav check**: from each page, click every nav link and the
  footer "back to home" link; confirm the right `aria-current="page"` moves
  with you.
- **Responsive pass**: resize to ~375px, ~768px, and desktop for `index`,
  `about`, and one period page; confirm the `.about-grid` and
  `.activity-card` grids collapse to one column and nothing overflows
  horizontally.
- **Keyboard pass**: Tab through nav, stepper, and activity links on one
  full page; confirm every focusable element shows the `:focus-visible`
  ring defined in `css/style.css`.
- **Placeholder audit**: confirm every `.img-placeholder` has a
  descriptive `aria-label` and that none of them are silently replaced by
  broken `<img>` tags.
- **Contrast spot-check**: verify `--muted` (#5B5B63) on `--paper` (#F5F4F0)
  and `--ink` on `--paper` both clear 4.5:1 (both already do at these
  values; re-check if either token changes).
- **Link-rot check before publishing**: grep all `.html` files for `href="#"`
  and replace/remove any that were left as unfinished placeholders.
- **Report page check**: confirm each activity card's report link (once
  written) opens the correct `reports/*.html` page, that page's `.report-
  gallery` collapses to one column at ~375px with no overflow, and the
  Report index (`report.html`) links to the same page rather than a
  duplicate.
