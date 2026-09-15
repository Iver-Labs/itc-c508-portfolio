# Requirements Document

## Introduction

This spec covers the ITC C508 (Deep Learning & Neural Networks — NLP focus)
coursework portfolio: a static multi-page site published to GitHub Pages.
It presents the student's background on an About page and organizes course
activities into three period pages (Prelims, Midterms, Finals), each
following the term's actual chronology.

## Requirements

### Requirement 1: Site Navigation

**User Story:** As a visitor (instructor, classmate, or the student), I want
consistent navigation across every page, so that I can move between Home,
About, and the three course periods without getting lost.

#### Acceptance Criteria

1. WHEN any page loads THEN the system SHALL display a header containing the
   course wordmark ("ITC C508 · Deep Learning & NLP") and nav links to Home,
   About Me, Prelims, Midterms, Finals, and Report.
2. WHEN a page is active THEN the system SHALL visually distinguish its own
   nav link (e.g., `aria-current="page"` + underline) from the others.
3. WHEN the viewport is narrow (mobile) THEN the system SHALL keep nav links
   legible and tappable without horizontal overflow.
4. WHEN a visitor clicks any nav link THEN the system SHALL load the
   corresponding page.

### Requirement 2: Home Page Overview

**User Story:** As a visitor, I want a landing page that explains what the
portfolio is, so that I understand the course context before diving into
specific work.

#### Acceptance Criteria

1. WHEN the home page loads THEN the system SHALL display a headline and one
   short paragraph describing the course and the purpose of the portfolio.
2. WHEN the home page loads THEN the system SHALL display a period stepper
   (Prelims / Midterms / Finals) that links into each period page.
3. WHEN the home page loads THEN the system SHALL display a one-line summary
   of what each period contains.
4. WHEN a visitor clicks a stepper item or summary link THEN the system
   SHALL navigate to that period's page.

### Requirement 3: About Me Page

**User Story:** As a visitor, I want to learn who the student is, so that I
have context for the work in the portfolio.

#### Acceptance Criteria

1. WHEN the About page loads THEN the system SHALL display a profile photo
   (or a clearly labeled placeholder if none has been supplied), the
   student's name, and a short bio.
2. WHEN the About page loads THEN the system SHALL display a list of skills
   and tools relevant to the course.
3. WHEN the About page loads THEN the system SHALL display contact
   information (email and/or GitHub) as clickable links.
4. IF the student has not supplied a real photo THEN the system SHALL
   render an accessible placeholder (not a broken image) with a label
   indicating what belongs there.
5. WHEN the About page loads THEN the system MAY display an optional set of
   additional snapshot images, each with its own placeholder/label until
   replaced.

### Requirement 4: Period Pages (Prelims, Midterms, Finals)

**User Story:** As a visitor, I want each period's activities listed clearly
and in the order they were done, so that I can follow the student's
progress through the term.

#### Acceptance Criteria

1. WHEN a period page loads THEN the system SHALL display the period name,
   a one-line description of that stretch of the term, and a stepper
   showing progress across all three periods with the current one marked.
2. WHEN a period page loads THEN the system SHALL display one activity card
   per completed activity, each containing: an image (or placeholder), a
   week/date label, a title, a short description, technology tags, and a
   link to the underlying notebook/report.
3. IF an activity's supporting image has not been supplied THEN the system
   SHALL render the placeholder box rather than a missing-image icon.
4. IF an activity's report link is not yet available THEN the system SHALL
   disable or omit the link rather than pointing to a dead `#`.
5. WHEN a new activity is completed THEN adding it SHALL require only
   duplicating one activity-card block and editing its content — no changes
   to shared layout or styling.

### Requirement 5: Visual Identity

**User Story:** As the student, I want a cohesive visual style across all
pages, so that the portfolio feels intentional rather than like a set of
disconnected documents.

#### Acceptance Criteria

1. WHEN any page renders THEN the system SHALL apply the shared design
   tokens (paper background, ink text, signal-violet accent, Fraunces
   display type, IBM Plex Sans body type, IBM Plex Mono labels) from a
   single stylesheet.
2. WHEN a design token changes (e.g., accent color) THEN the system SHALL
   propagate that change across all pages without per-page edits.
3. WHEN sequence-based UI (the period stepper) is shown THEN the system
   SHALL indicate order and current position, since the three periods are a
   genuine chronological sequence.

### Requirement 6: Accessibility & Responsiveness

**User Story:** As any visitor, including those using assistive technology
or a small screen, I want the portfolio to remain usable, so that the work
is accessible regardless of how it's viewed.

#### Acceptance Criteria

1. WHEN interactive elements receive keyboard focus THEN the system SHALL
   display a visible focus outline.
2. WHEN decorative placeholder graphics are rendered THEN the system SHALL
   expose them to assistive technology via appropriate `role`/`aria-label`
   rather than leaving them unlabeled.
3. WHEN the page is viewed under 640px width THEN activity cards and the
   About page layout SHALL stack into a single column.
4. WHEN text is rendered against the paper background THEN color contrast
   SHALL meet WCAG AA (4.5:1) for body text.
5. WHEN `prefers-reduced-motion` is set THEN the system SHALL disable the
   smooth-scroll behavior.

### Requirement 7: Deployment

**User Story:** As the student, I want the portfolio published on GitHub
Pages, so that I can share a live link with instructors and classmates.

#### Acceptance Criteria

1. WHEN the repository is pushed to GitHub with Pages enabled THEN the
   system SHALL be reachable at the resulting `github.io` URL with no build
   step required.
2. WHEN new commits are pushed to the publishing branch THEN GitHub Pages
   SHALL redeploy the updated site automatically.
3. WHEN a visitor loads any page directly by URL (not just via nav) THEN the
   system SHALL render correctly, since the site uses plain static files
   with no client-side routing.

### Requirement 8: Per-Activity Report Pages

**User Story:** As a visitor, I want to click into any specific activity and
see the student's full write-up for it — screenshots, a description of what
was done, and the student's own reflection — so that I can understand that
piece of work in depth, not just its one-line summary on the period page.

#### Acceptance Criteria

1. WHEN a visitor clicks an activity card's report affordance on a period
   page (Prelims/Midterms/Finals) THEN the system SHALL navigate to a
   dedicated report page for that specific activity (not an external link
   and not a flat archive entry).
2. WHEN an activity's report page loads THEN the system SHALL display that
   activity's title and period/week meta, one or more screenshots, a
   description of what was built/done, and a distinct reflection section
   in the student's own words.
3. WHEN the Report nav page loads THEN the system SHALL list every activity
   across all three periods, grouped by period, each entry linking into
   that same activity's report page — so the Report page and each period
   page's activity cards both lead to one shared page per activity, not
   duplicate content.
4. WHEN an activity report page includes more than one screenshot THEN the
   system SHALL lay them out in a gallery that reflows to a single column
   under 640px width, consistent with Requirement 6.3.
5. IF the student also wants to attach the underlying notebook or document
   for an activity THEN the report page MAY include a labeled download/open
   link to that file — never an inline embed attempt for formats the
   browser can't render natively (`.ipynb`, `.docx`, etc.).
6. IF an activity's report has not been written yet THEN the corresponding
   activity card SHALL show a disabled "Report pending" state
   (`aria-disabled="true"`, no `href="#"`) rather than linking to a page
   that doesn't exist, consistent with Requirement 4.4.
7. WHEN a new activity's report is finished THEN adding it SHALL require
   creating one new report page from the shared template and linking it
   from both that activity's card and the Report index — no shared
   layout/CSS changes, consistent with the pattern in Requirement 4.5.

_Note: since this is a static site with no backend (Requirement 7), report
pages and any attached files are added by the student committing them to
the repository before publishing (e.g. into a `reports/` folder) — the same
way images are handled today. There is no live visitor-facing upload form._
