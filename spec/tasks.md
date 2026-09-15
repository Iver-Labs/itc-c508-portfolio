# Implementation Plan

- [x] 1. Scaffold the static site structure
  - Create `index.html`, `about.html`, `prelims.html`, `midterms.html`,
    `finals.html`, `css/style.css`, `images/`, `README.md`
  - _Requirements: 1.1, 7.1_

- [x] 2. Define design tokens and shared styling
  - [x] 2.1 Set CSS custom properties for color, type, radius in `css/style.css`
    - _Requirements: 5.1_
  - [x] 2.2 Load Fraunces / IBM Plex Sans / IBM Plex Mono webfonts
    - _Requirements: 5.1_

- [x] 3. Build the header and navigation
  - [x] 3.1 Implement wordmark + five-link nav, repeated across all pages
    - _Requirements: 1.1, 1.4_
  - [x] 3.2 Mark the active page via `aria-current="page"` per page
    - _Requirements: 1.2_
  - [x] 3.3 Decide whether nav needs a real mobile menu, or confirm flex-wrap
        is sufficient at the smallest supported width
    - _Requirements: 1.3_

- [x] 4. Build the Home page
  - [x] 4.1 Implement hero headline + intro paragraph
    - _Requirements: 2.1_
  - [x] 4.2 Implement period stepper linking into Prelims/Midterms/Finals
    - _Requirements: 2.2, 2.4, 5.3_
  - [x] 4.3 Implement one-line summary cards for each period
    - _Requirements: 2.3_

- [x] 5. Build the About Me page
  - [x] 5.1 Implement profile placeholder (round) + name/bio layout
    - _Requirements: 3.1, 3.4_
  - [x] 5.2 Implement skills tag list
    - _Requirements: 3.2_
  - [x] 5.3 Implement contact links (email, GitHub)
    - _Requirements: 3.3_
  - [x] 5.4 Implement optional snapshot placeholder row
    - _Requirements: 3.5_
  - [ ] 5.5 Replace placeholder name, bio, skills, and contact details with
        real content
    - _Requirements: 3.1, 3.2, 3.3_
  - [ ] 5.6 Replace the profile photo placeholder with a real photo (and
        snapshot images, if keeping that section)
    - _Requirements: 3.4_

- [x] 6. Build the period pages (Prelims, Midterms, Finals)
  - [x] 6.1 Implement per-period header, description, and stepper with
        current period marked
    - _Requirements: 4.1, 5.3_
  - [x] 6.2 Implement reusable `.activity-card` block (image, meta, title,
        description, tags, report link)
    - _Requirements: 4.2_
  - [ ] 6.3 Replace placeholder activity cards with real Prelim activities
        (titles, descriptions, tags, notebook/report links)
    - _Requirements: 4.2, 4.4, 4.5_
  - [ ] 6.4 Replace placeholder activity cards with real Midterm activities
    - _Requirements: 4.2, 4.4, 4.5_
  - [ ] 6.5 Replace placeholder activity cards with real Final activities
    - _Requirements: 4.2, 4.4, 4.5_
  - [ ] 6.6 Swap activity screenshot placeholders for real images in
        `images/` as each activity is finalized
    - _Requirements: 4.3_

- [x] 7. Accessibility and responsive verification
  - [x] 7.1 Run the keyboard-focus pass across nav, stepper, and activity
        links; confirm visible focus rings everywhere
    - _Requirements: 6.1_
  - [x] 7.2 Confirm every placeholder graphic has `role`/`aria-label`
    - _Requirements: 6.2_
  - [x] 7.3 Resize to ~375px and confirm `.about-grid` and `.activity-card`
        collapse cleanly with no horizontal overflow
    - _Requirements: 6.3_
  - [x] 7.4 Spot-check text contrast against `--paper`, especially if any
        token colors change
    - _Requirements: 6.4_

- [ ] 8. Pre-publish content cleanup
  - [x] 8.1 Grep all `.html` files for leftover `href="#"` links and
        replace or remove them
    - _Requirements: 4.4_
  - [ ] 8.2 Proofread placeholder copy ("Your Name Here", "Activity title
        goes here", etc.) for anything not yet replaced
    - _Requirements: 3.1, 4.2_

- [x] 9. Build per-activity Report pages
  - [x] 9.1 Create `report.html` as an index listing every activity grouped
        by period, and add the "Report" nav link (`aria-current="page"`)
        to all six pages
    - _Requirements: 1.1, 8.3_
  - [x] 9.2 Create the `reports/` directory and a shared activity-report
        template: header/nav/footer, activity meta/title,
        `.report-gallery`, Description section, Reflection section, back
        link
    - _Requirements: 8.1, 8.2_
  - [x] 9.3 Wire each activity card's existing "Report pending" span on
        `prelims.html`/`midterms.html`/`finals.html` to link into its own
        `reports/<slug>.html` once that activity's report is written; keep
        the Report index entry pointing at the same page (no duplicate
        content)
    - _Requirements: 8.1, 8.3, 8.6, 8.7_
  - [ ] 9.4 Optionally add a labeled attachment download link per report
        page for the underlying notebook/document, never inline-embedded
    - _Requirements: 8.5_
  - [x] 9.5 Resize to ~375px and confirm each `.report-gallery` collapses
        to one column with no horizontal overflow
    - _Requirements: 8.4, 6.3_
  - [ ] 9.6 Write and link real activity reports as they're finished
        (screenshots + description + reflection per activity), updating
        both that activity's card and the Report index entry
    - _Requirements: 8.2, 8.7_

- [ ] 10. Publish to GitHub Pages
  - [ ] 10.1 Push the repo and enable Pages (branch = main, folder = /root)
    - _Requirements: 7.1_
  - [ ] 10.2 Confirm the live `github.io` URL renders every page correctly
        when loaded directly (not just via in-site nav)
    - _Requirements: 7.3_
  - [ ] 10.3 Confirm a follow-up commit auto-redeploys
    - _Requirements: 7.2_
