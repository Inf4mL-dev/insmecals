# InSME Calculators — Frontend

Static multi-page site for Enterprise Insurance's internal calculator hub.
Folder layout is adapted from the React/Next.js frontend structure you shared,
mapped onto a plain HTML/CSS/JS site (no build step, no framework):

```
insme-frontend/
├── HomePage.html             # home / hub — lives at project root so it
│                             # loads at "/" on static hosts
├── public/                  # static assets served as-is
│   ├── images/              # local image assets (logo is currently hosted
│   │                        # externally — see "Notes" below)
│   └── icons/                # favicon / icon assets, once you have them
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── shared.css   # shared design tokens: colors, fonts, .back-home
│   │   └── fonts/            # drop Effyra webfont files here once licensed
│   ├── components/
│   │   └── back-home-button.html   # reference markup, see note inside
│   └── pages/                # every calculator page (siblings, same folder)
│       ├── ahotopii.html
│       ├── momoinsure.html
│       ├── motor.html
│       ├── commission.html
│       ├── date-age.html
│       └── sme-insure.html   # "coming soon" placeholder
└── README.md
```

## Why "components" aren't truly shared yet

The infographic's structure assumes a framework (React/Next/Vue) where a
component file is imported and reused. This project is plain static HTML, so
there's no include mechanism out of the box — each page's `<head>` and markup
is self-contained. What *is* shared right now:

- **Design tokens** (`src/assets/css/shared.css`) — every page links this
  stylesheet, so colors, fonts, and the `.back-home` button styling live in
  one place.
- **`src/components/back-home-button.html`** is a documented reference copy
  of that button's markup, not a live include — each page still pastes its
  own version with a color override, since the four original calculators
  still each carry their own accent color pending the full brand unification
  we discussed.

If you want true shared includes down the line (header, nav, footer as one
file, live-injected into every page), that needs either a static site
generator (11ty, Astro, Vite) or a small JS `fetch()`-based include loader —
happy to set either up when you're ready.

## Notes

- **Logo**: still pulled from the hosted URL
  (`scinsurance.my.enterprisegroup.net.gh/.../enterprise-insurance...png`) per
  your earlier instruction to keep using it. `public/images/` is ready for a
  local copy if you'd rather self-host it.
- **Fonts**: Headings currently use **Fraunces** as a stand-in for **Effyra**,
  since the version of Effyra available isn't licensed for commercial/web use.
  Drop the real webfont files in `src/assets/fonts/` and update the
  `--font-heading` variable in `shared.css` once you have a commercial
  license.
- **Pending**: full color/palette unification across the four original
  calculators (Ahotopii, MomoInsure, Motor, Commission) and merging their
  print/quote templates onto the MomoInsure-style shared template — not done
  in this restructure, still queued as agreed.
- **Deploying**: `HomePage.html` already sits at the project root. Most
  static hosts serve whatever file is configured as the index at `/`, so
  either set your host's index document to `HomePage.html`, or configure a
  rewrite/redirect from `/` to `/HomePage.html`. The calculator pages still
  live together in `src/pages/` and keep linking to each other with plain
  filenames (`ahotopii.html`, `motor.html`, etc.); `site-nav.js` detects
  which folder the current page is in and builds the right relative path to
  `HomePage.html` and back automatically.
