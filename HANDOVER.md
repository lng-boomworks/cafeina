# Cafeina — Handover

_Scaffold completed 2026-04-22 via the `new-website` skill._

---

## Quick reference

| | |
|---|---|
| **Project name** | Cafeina |
| **Slug** | `cafeina` |
| **Project path** | `~/Development/websites/cafeina` |
| **Repo** | https://github.com/lng-boomworks/cafeina |
| **Hosting** | GitHub Pages, subpath `/cafeina` |
| **Deployment URL** | https://lng-boomworks.github.io/cafeina/ |
| **Local preview** | `cd ~/Development/websites/cafeina && npm run dev` |
| **Local production preview** | `cd ~/Development/websites/cafeina && npm run build && npm run preview` → http://localhost:4321/cafeina |

---

## Before the deploy URL works — enable Pages

I can't flip this switch programmatically. You need to:

1. Go to https://github.com/lng-boomworks/cafeina/settings/pages
2. Set **Source** → **GitHub Actions**
3. The deploy workflow (already committed as `.github/workflows/deploy.yml`) will run on the next push.

To trigger a deploy right now: open the Actions tab and run the **Deploy to GitHub Pages** workflow manually (it has `workflow_dispatch` enabled), OR push any commit to `main`.

---

## What got built

### The seven standard routes

All seven are live, all compile, all are linked from the Navbar and Footer:

| Path | Route label | Component |
|------|-------------|-----------|
| `/` | Home | `src/components/home/HomePage.tsx` |
| `/services` | Menu | `src/components/pages/ServicesPage.tsx` |
| `/about` | About | `src/components/pages/AboutPage.tsx` |
| `/team` | Team | `src/components/pages/TeamPage.tsx` |
| `/gallery` | Gallery | `src/components/pages/GalleryPage.tsx` |
| `/blog` | Journal | `src/components/pages/BlogPage.tsx` |
| `/contact` | Contact | `src/components/pages/ContactPage.tsx` |

Navbar shows these in order: `Home · Menu · About · Team · Gallery · Journal · Contact`.

### Content layer

Page content (hero, SEO, contact details) is driven by Astro content collections in `src/content/pages/*.md`. Edit those to change hero copy without touching React components. Schema is in `src/content.config.ts`.

### Design system

- **Palette**: dark brown `#442a18` / caramel `#a76733` / tan `#d3b88c` / cream `#e6d5b8`, with white `#FFFFFF` as second accent and dark brown as text. Values live in `src/styles/global.css`.
  - **Implementation note**: the Tailwind token names (`teal-deep`, `teal-mid`, `sage`, `cream` etc.) were kept from the starter template — only the underlying HSL values were changed. This avoided renaming hundreds of class references. Rename the tokens if you want semantic clarity, but expect to touch every component.
- **Fonts**: Fraunces (display) + Inter (body), loaded from Google Fonts in `src/layouts/Base.astro`.
  - You asked for Georgia Pro + Osaka originally. Georgia Pro isn't web-licensed; Osaka is a macOS system font. Swapped with your approval.
- **Reusable components**: `Navbar`, `Footer`, `Button`, `FadeIn`, `TrustPill`, plus per-page components under `src/components/home/` and `src/components/pages/`.

### Base-path correctness (important)

Astro does **not** auto-prefix internal `href` values with the `base` set in `astro.config.mjs`. Raw `href="/services"` will 404 in production.

The starter template ships with `src/utils/url.ts` exporting `withBase()`. `<Button>` uses it automatically. Every raw `<a>` tag, favicon `<link>`, and `<img src="/...">` goes through `withBase()`.

**Rule**: if you add new internal links in future, either use `<Button>` or wrap with `withBase()`. Grep-check after any component addition:

```bash
grep -oE 'href="/[^"]*"' dist/index.html | sort -u
```

Every result should start with `/cafeina/` (or be external `//...`). I ran this and it's clean as of initial commit.

---

## Outstanding placeholder tokens

These are legitimate content gaps for you to fill once real assets are available. All are content tokens — **no project-level tokens leaked into the build**.

| Token | File | Count | What it needs |
|-------|------|-------|---------------|
| `{{ABOUT_HERO_IMAGE_ALT}}` | `src/components/pages/AboutPage.tsx` | 1 | Alt text for the story-page hero image |
| `{{TEAM_MEMBER_1_PHOTO_ALT}}` | `AboutPage.tsx`, `TeamPage.tsx` | 2 | Millie's photo alt |
| `{{TEAM_MEMBER_2_PHOTO_ALT}}` | `AboutPage.tsx`, `TeamPage.tsx` | 2 | Callum's photo alt |
| `{{TEAM_MEMBER_3_PHOTO_ALT}}` | `TeamPage.tsx` | 1 | Nancy's photo alt |
| `{{GALLERY_IMAGE_1_ALT}}` → `{{GALLERY_IMAGE_9_ALT}}` | `src/components/pages/GalleryPage.tsx` | 9 | Alt text per photo — replace tokens with real images too |
| `{{BLOG_POST_1_TITLE}}` + `_EXCERPT` + `_DATE` + `_IMAGE_ALT` (×3 posts) | `src/components/pages/BlogPage.tsx` | 12 | First three journal posts |
| `{{MAP_EMBED_URL}}` | `src/components/pages/ContactPage.tsx` | 1 | Google Maps embed for the La Marina address |

Grep-check in source: `grep -roE '\{\{[A-Z0-9_]+\}\}' src/`

---

## Known issues / deferred

1. **Facebook reviews (Research Path C) skipped** — `facebook.com/cafeinavintage/reviews` needs login, can't auto-scrape. When convenient, paste 10–20 reviews and we can update the Home/About with verbatim customer phrasing (far better than in-family testimonial).
2. **No branded photography** — gallery, team, about hero all use placeholder blocks. Priority asset: interior photo for `AboutPage.tsx` hero, then three headshots (Millie / Callum / Nancy) and six+ interior/menu shots.
3. **Dead `kate_*` schema fields** — `src/content.config.ts` still has optional `kate_heading`, `kate_bio`, `kate_quote` from the template's original "founder quote" feature. `src/pages/index.astro` still passes `kateHeading`/`kateBio`/`kateQuote` props to `HomePage` but the component no longer accepts them (silently discarded by JSX). Harmless but noisy — remove next time you touch those files.
4. **`/privacy` is a dead link** — the contact form consent checkbox links to `/privacy`, but no page exists. Either create a privacy notice page or remove the link in `src/components/pages/ContactPage.tsx`.
5. **`web3forms` access key placeholder** — contact form currently has `"YOUR_WEB3FORMS_ACCESS_KEY"` as a literal string in `ContactPage.tsx`. Replace with a real Web3Forms key (https://web3forms.com) or swap for your preferred form handler (Formspree, Netlify Forms, etc.).
6. **Events have no dates** — per your instruction. When you're ready to publish dates, the `ServicesPage.tsx` "What's on" list is where they go; or build out a proper events collection.
7. **npm audit**: 2 vulnerabilities reported at install (1 moderate, 1 high). Run `npm audit` for details — not blocking, but worth reviewing.
8. **Mobile viewport not visually verified** — I couldn't open a browser at 375px width. Test the preview at http://localhost:4321/cafeina on mobile or in DevTools before the first client review.
9. **Console check not done at runtime** — build is clean, but nobody loaded the preview while I ran. Quick scan in DevTools recommended before go-live.

---

## Research artefacts

- `research/research_summary.md` — six-section research brief, approved 2026-04-22. Keep for reference.
- Research paths run: **A** (current site audit of `cafeinalamarina.com`) + partial **C** (blocked by FB login).
- Path D (competitor benchmarking) was skipped per your instruction. Can re-run later if you want a La Marina / Torrevieja competitive scan.

---

## Next suggested actions

In rough priority order:

1. **Enable Pages** — 60 seconds, unlocks the live URL.
2. **Visual pass** at http://localhost:4321/cafeina — confirm the brown/caramel palette feels right; easy to dial if too heavy.
3. **Replace placeholder images** — interior hero, three team headshots, gallery photos. Drop files into `public/images/` and swap the `<div>` placeholders in the relevant components.
4. **Real reviews** — paste Facebook review text and we can wire testimonials into the Home and About pages.
5. **Contact form handler** — Web3Forms key or swap for preferred provider.
6. **Map embed** — paste Google Maps embed iframe into the ContactPage map placeholder.
7. **Events dates** — when you have them, update `ServicesPage.tsx`.
8. **Privacy page** — required for EU/GDPR-ish contact-form handling; easy to add.
9. **Sitemap + robots** — already auto-generated by `@astrojs/sitemap` during build. Reachable at `/cafeina/sitemap-index.xml`.
10. **Google Business Profile** — worth setting up / claiming if not already, for reviews + local SEO. Link it in the Footer once live.
11. **OG image** — `src/layouts/Base.astro` points to `/images/og-default.jpg`. Add one; 1200×630 is the standard.
12. **Dependency audit** — `npm audit fix` once you're ready.
13. **Mobile QA** — test at 375px before first client review.

---

## Files you'll edit most often

| Task | File |
|------|------|
| Hero copy / SEO titles per page | `src/content/pages/*.md` |
| Contact details (email, phone, address) | `src/content/pages/contact.md` + `src/layouts/Base.astro` (LocalBusiness schema) |
| Navbar links | `src/components/Navbar.tsx` |
| Footer links + badges | `src/components/Footer.tsx` |
| Services/menu content | `src/components/pages/ServicesPage.tsx` |
| Team bios | `src/components/pages/TeamPage.tsx` + `src/components/pages/AboutPage.tsx` |
| Gallery images | `src/components/pages/GalleryPage.tsx` + `public/images/` |
| Blog posts | `src/components/pages/BlogPage.tsx` (placeholder; swap for a proper content collection when you have real posts) |
| Palette tweaks | `src/styles/global.css` (`@theme inline` block) |
| Font changes | `src/styles/global.css` (`--font-serif` / `--font-sans`) + `src/layouts/Base.astro` (Google Fonts links) |

---

_Any questions, re-run the `new-website` skill in resume mode — it'll pick up where this left off and skip finished phases._
