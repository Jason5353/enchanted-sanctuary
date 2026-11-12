# Enchanted Sanctuary

Static rebuild of https://enchantedsanctuary.co.uk: hand-written HTML/CSS with a small vanilla JS file. No CMS, no build step, no plugins.

## Structure

- `index.html` and one folder per page (`about/`, `healing/`, `blog/`, `contact/`, ...), each with its own `index.html`
- `assets/css/`: `base.css`, `fonts.css`, `shell.css`, and per-page styles in `pages/`
- `assets/js/site.js`: sticky header, mobile menu, scroll reveals, counters
- `assets/img/` and `assets/fonts/`: all images and self-hosted fonts
- `_headers`: security headers (CSP, HSTS, X-Frame-Options) for Cloudflare Pages
- `_redirects`, `robots.txt`, `sitemap.xml`, `404.html`

## Hosting

Cloudflare Pages, deployed from the `main` branch.

- Build command: none
- Build output directory: `/`

Every push to `main` redeploys automatically.

## Editing

Edit the HTML/CSS directly, then:

    git add .
    git commit -m "Describe the change"
    git push

Notes:

- The CSP in `_headers` only allows scripts, styles, images and fonts from this site, plus Google Maps and Vimeo embeds. Avoid inline `style=` attributes and external scripts, or they will be blocked.
- The Instagram and Facebook sections are static snapshots, so new posts need to be added by hand.
