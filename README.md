# ITC C508 Portfolio

A simple static site for your Deep Learning & NLP coursework: Home, About Me,
Prelims, Midterms, Finals. No build step — plain HTML/CSS, works straight on
GitHub Pages.

## Files

```
portfolio/
├── index.html      Home page
├── about.html       About Me (profile photo placeholder + bio)
├── prelims.html     Prelim activities
├── midterms.html    Midterm activities
├── finals.html      Final activities
├── css/style.css    Shared styling
└── images/          Put your real photos/screenshots here
```

## Customize it

- **About page**: replace the name, bio, skills, and contact links in `about.html`.
- **Activity cards**: each period page has `<article class="activity-card">`
  blocks — copy/paste one per activity, edit the title, description, tags,
  and the link.
- **Images**: every image placeholder is a dashed box. To swap one in, drop
  your file in `images/` and replace the placeholder `<div class="img-placeholder">…</div>`
  with:
  ```html
  <img src="images/your-photo.jpg" alt="Describe the image" style="width:100%;border-radius:4px;">
  ```
- **Colors/fonts**: all defined as CSS variables at the top of `css/style.css`.

## Publish to GitHub Pages

1. Create a new repository on GitHub (e.g. `itc-c508-portfolio`).
2. Push these files to the repo's default branch:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/itc-c508-portfolio.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a branch",
   branch = `main`, folder = `/ (root)`. Save.
5. Wait a minute, then your site is live at:
   `https://YOUR-USERNAME.github.io/itc-c508-portfolio/`

   (If you name the repo `YOUR-USERNAME.github.io` instead, it publishes at
   the root `https://YOUR-USERNAME.github.io/` with no extra path.)

Every time you push new commits to `main`, the live site updates automatically.
