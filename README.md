# Clube Náutico da Praia de Mira — website

Static, bilingual (🇵🇹 Português de Portugal / 🇬🇧 English) website for the
Clube Náutico da Praia de Mira, built to be served from **GitHub Pages** at
<https://cnpm.pt> and <https://www.cnpm.pt>.

No build step, no dependencies — just static HTML, CSS and a small vanilla-JS
i18n script.

## Structure

```
.
├── index.html            # Single-page site with data-i18n markup (PT is the default)
├── assets/
│   ├── css/style.css     # Nautical theme, responsive, light/dark aware
│   ├── js/i18n.js        # Language detection, toggle & persistence
│   └── img/
│       ├── logo.svg          # Full horizontal lockup (colour, for light backgrounds)
│       ├── logo-light.svg    # Reversed lockup (for dark backgrounds: hero, footer, dark mode)
│       ├── emblem.svg        # Circular badge only (colour)
│       ├── emblem-light.svg  # Circular badge only (reversed)
│       └── favicon.svg       # Badge on a rounded navy tile
├── CNAME                 # Custom domain for GitHub Pages (cnpm.pt)
├── .nojekyll             # Serve files as-is (skip Jekyll processing)
├── robots.txt
└── sitemap.xml
```

## Language behaviour

- Portuguese (pt-PT) is the source text in `index.html`; English lives in
  `assets/js/i18n.js`.
- On first visit the language follows the **browser locale** (`pt*` → Portuguese,
  `en*` → English, otherwise Portuguese).
- The **PT / EN** switch in the header overrides it, and the choice is remembered
  in `localStorage`.

To edit copy: change the Portuguese in `index.html` and the matching key in the
`EN` object in `assets/js/i18n.js`.

## Logo

The logos in `assets/img/` were **vectorised (traced) from the official club
logo** into clean, resolution-independent SVGs, with a colour version for light
backgrounds and a reversed light version for dark ones (hero, footer, dark mode).
To refresh them from a new source image, re-trace it and replace the files —
the markup needs no changes.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. **Settings → Pages** → *Source*: **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Under *Custom domain* enter `cnpm.pt` (the `CNAME` file already sets this) and
   enable **Enforce HTTPS**.
4. Configure DNS at your registrar:
   - Apex `cnpm.pt` → four `A` records to GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and/or the equivalent `AAAA` records).
   - `www.cnpm.pt` → `CNAME` to `<your-github-username>.github.io`.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Contacts

Rua da Floresta, s/n · 3070-755 Praia de Mira · Portugal
NIF 502 822 899 · info@cnpm.pt · +351 914 380 715
