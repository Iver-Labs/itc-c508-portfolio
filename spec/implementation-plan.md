# Implementation Plan

## Purpose

`requirements.md`, `design.md`, and `tasks.md` define what this portfolio
site should be. This document translates them into an ordered, actionable
plan against the **actual current state of the repo** — `tasks.md`'s
checkboxes are ahead of reality in a couple of places, so treat this file,
not the checkboxes, as the source of truth for what's left to do.

## Current-State Audit

| Claimed in `tasks.md` | Actual repo state |
|---|---|
| Task 1 — scaffold structure incl. `css/` folder | `style.css` lives at repo **root**, not `css/style.css`. Every page links `href="css/style.css"` — **the stylesheet does not load as shipped.** |
| Task 1 — `images/` directory | Does not exist. |
| Task 3.1 — header/nav on all pages | ✅ Present and correct on all 5 pages, matches `design.md`. |
| Task 3.2 — `aria-current="page"` per page | ✅ Correct on all 5 pages. |
| Task 4 — Home page (hero, stepper, summaries) | ✅ Present, matches Requirement 2. |
| Task 5.1–5.4 — About page skeleton | ✅ Structurally complete (placeholder photo, bio, skills, contact, snapshots). |
| Task 6.1–6.2 — period header/stepper/activity-card markup | ✅ Present on all three period pages, 2 placeholder cards each. |
| Everything else in `tasks.md` (5.5–5.6, 6.3–6.6, 7.x, 8.x, 9.x) | Correctly left unchecked — genuinely not done. |

Two defects need fixing before anything else, since they affect every page:

1. **Broken stylesheet path** — `css/style.css` referenced, but the file is
   at root. Fix by moving the file, not by editing 5 HTML files.
2. **Missing `images/` directory** — documented in `design.md` and
   `README.md` but never created.

## Phase 0 — Fix structural defects (blocking)

- Create `css/` and move `style.css` into `css/style.css` so it matches
  every existing `<link href="css/style.css">` reference.
- Create the `images/` directory for real photos/screenshots.
- _Requirements: 5.1, 7.1_

## Phase 1 — About Me content (tasks 5.5–5.6)

- In `about.html`: replace the placeholder name, bio paragraphs, skills
  list, and email/GitHub contact links with real content.
- Replace the round profile-photo placeholder with a real `<img>` once a
  photo is available (drop the file in `images/`, per the pattern already
  documented in `README.md`).
- _Requirements: 3.1, 3.2, 3.3, 3.4_

## Phase 2 — Period content (tasks 6.3–6.6)

- In `prelims.html`, `midterms.html`, `finals.html`: replace the 2
  placeholder `<article class="activity-card">` blocks per page with real
  activities. Add more by duplicating the block — no shared CSS/layout
  changes needed (`design.md`'s pattern).
- Each real card needs: image or placeholder, week/date meta label, title,
  description, technology tags, and a working report/notebook link (or the
  link omitted/`aria-disabled` if not ready — see Phase 4).
- Swap in real screenshots to `images/` as each activity is finalized.
- _Requirements: 4.2, 4.3, 4.4, 4.5_

## Phase 3 — Accessibility & responsive verification (tasks 7.1–7.4)

Manual checklist, per `design.md`'s Testing Strategy:

- Keyboard-only pass across nav, stepper, and activity links — confirm a
  visible focus ring on every focusable element.
- Confirm every `.img-placeholder` still has a `role`/`aria-label` after
  content edits.
- Resize to ~375px — confirm `.about-grid` and `.activity-card` collapse to
  one column with no horizontal overflow.
- Spot-check text contrast (`--ink`/`--muted` on `--paper`) if any token
  color changes during content work.
- _Requirements: 6.1, 6.2, 6.3, 6.4_

## Phase 4 — Pre-publish cleanup (tasks 8.1–8.2)

- Grep all `.html` files for `href="#"` — currently **6 hits** (2 each in
  `prelims.html`, `midterms.html`, `finals.html`). Replace each with a real
  report/notebook link, or remove/`aria-disabled` it per `design.md`'s
  Error Handling section — never leave a dead `#`.
- Proofread for any remaining placeholder copy ("Your Name Here", "Activity
  title goes here", "you@example.com", etc.).
- _Requirements: 4.4_

## Phase 5 — Build per-activity Report pages (tasks 9.1–9.6)

New feature, added after the original spec: clicking any activity (on
Prelims/Midterms/Finals, or via a Report index page) opens that specific
activity's own report — screenshots, a description of what was done, and
the student's reflection — rather than a flat list of uploaded files. Full
detail in `requirements.md` Requirement 8 and `design.md`'s "Report pages"
component section — summary here:

- Create `report.html` as an **index**: every activity, grouped by period,
  each entry linking into that activity's own detail page — it does not
  hold the report content itself. Add a "Report" nav link
  (`aria-current="page"` on that page) to all six pages.
- Create `reports/` and a **shared detail-page template**, one static
  `.html` file per activity: header/nav/footer, activity title/meta, a
  `.report-gallery` of one or more screenshots, a Description section, and
  a separate Reflection section in the student's own words.
- The activity cards on the three period pages already have a "Report
  pending" `aria-disabled` span from Phase 2 — wire each one to the same
  `reports/<slug>.html` page once that activity's report is written, so
  the period-page card and the Report index both point at one shared page,
  never duplicated content.
- Uploading is still just committing files to the repo (no backend, no
  live upload form) — this now also covers an optional attachment
  (notebook/doc) per report page: always a download/open link, never an
  inline embed, since browsers can't render `.ipynb`/`.docx` natively.
- Verify at ~375px that each `.report-gallery` collapses to one column
  with no horizontal overflow.
- Write and link real activity reports as they're finished, same
  duplicate-the-template workflow as Phase 2's activity cards.
- _Requirements: 1.1, 6.3, 8.1–8.7_

## Phase 6 — Publish to GitHub Pages (tasks 10.1–10.3)

Steps already documented in `README.md`:

1. Push the repo to GitHub (`main` branch).
2. Settings → Pages → Source: Deploy from a branch, branch = `main`,
   folder = `/ (root)`.
3. Verify the live `github.io` URL renders every page correctly when
   loaded **directly by URL** (not just via in-site nav).
4. Push a follow-up commit and confirm the site auto-redeploys.

- _Requirements: 7.1, 7.2, 7.3_

## Open decision

- **Task 3.3 — mobile nav.** `design.md` currently relies on flex-wrap
  rather than a hamburger menu, on the reasoning that 5 short links wrap
  acceptably at narrow widths. This is a judgment call for the student to
  confirm (test at ~375px in Phase 3) rather than a defect — revisit only
  if the nav grows beyond 5 links or wrapping looks cramped in practice.
