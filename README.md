# HSE Management System

A Professional HSE (Health, Safety & Environment) management SPA/PWA.

**Stack:** Vanilla JS + CSS (no framework) · Google Apps Script backend · Supabase migrations · Deployed on Vercel / Netlify / Cloudflare Pages.

---

## Project Structure

| Path | Purpose |
|------|---------|
| `Frontend/` | SPA source — HTML, CSS, JS, PWA assets |
| `Frontend/css/` | Modular CSS layer (design-tokens → variables → components → responsive) |
| `Frontend/js/modules/` | Core UI modules (app-ui, app-utils, auth, dashboard, …) |
| `Frontend/js/modules/modules/` | Domain feature modules (incidents, PTW, training, …) |
| `Frontend/js/modules/services/` | Cross-cutting services (data-manager, smart-cache, workflow, …) |
| `Backend/` | Google Apps Script (`.gs`) — runs on Google servers |
| `supabase/` | SQL migrations |

---

## Local Development

```bash
# Serve the frontend locally
cd Frontend
npx serve .
```

---

## CSS Architecture

CSS loads in this explicit order (see `Frontend/index.html`):

1. `css/design-tokens.css` — breakpoints, spacing/typography scale, z-index
2. `styles.css` — main monolithic styles (legacy layer)
3. `css/layout.css` → `css/components.css` → domain-specific CSS files
4. `css/responsive.css` — dedicated responsive rules (loads last before core)
5. `css/responsive-core.css` — fluid typography, mobile sidebar, table/modal fixes

For modular development the full import chain is in `css/index.css`.

### Breakpoints (from `css/design-tokens.css`)

| Token | Value | Use case |
|-------|-------|---------|
| `--bp-xs` | 480px | Small phones |
| `--bp-sm` | 768px | Phones |
| `--bp-md` | 1024px | Tablets / mobile sidebar threshold |
| `--bp-lg` | 1280px | Small desktops |
| `--bp-xl` | 1600px | Large desktops |

JS uses `window.BREAKPOINTS` (defined in `app-ui.js`) which mirrors these values.

---

## NPM Scripts (run from `Frontend/`)

```bash
npm run build:css      # Build & minify CSS
npm run smoke          # Verify all local assets in index.html exist on disk
npm run check:refs     # Check for 404-prone asset references
npm run deploy:check   # Run deployment readiness checks
npm run precommit      # Run smoke + ref checks before committing
```

---

## Vercel Deployment

1. Import the repo into [vercel.com](https://vercel.com).
2. Set **Output Directory** to `Frontend`.
3. Leave **Build Command** empty.
4. Deploy — `vercel.json` handles SPA rewrites and security headers.

---

## Backend (Google Apps Script)

1. Go to [script.google.com](https://script.google.com) and create a new project.
2. Copy all `.gs` files from `Backend/` into the project.
3. Update the spreadsheet ID in `Config.gs → getSpreadsheetId()`.
4. Deploy: **Deploy → New Deployment → Web App** (`Execute as: Me`, `Who has access: Anyone`).
5. Copy the web app URL into the frontend settings.
