# InSME Calculators — Frontend

Static multi-page site for Enterprise Insurance's internal calculator hub.
Folder layout is adapted from the React/Next.js frontend structure you shared,
mapped onto a plain HTML/CSS/JS site (no build step, no framework):

```
insme-frontend/
├── index.html             # home / hub (Travel Insurance card replaces Date & Age) — lives at project root so it
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
│   ├── data/
│   │   └── rates.json        # NEW: travel insurance rates + exchange rate
│   └── pages/                # every calculator page (siblings, same folder)
│       ├── ahotopii.html
│       ├── momoinsure.html
│       ├── motor.html
│       ├── commission.html
│       ├── travel-insurance.html   # NEW: travel insurance quotation
│       └── sme-insure.html   # "coming soon" placeholder
└── README.md
```

## Travel insurance quotation (new)

`src/pages/travel-insurance.html` replaces the old Date & Age calculator
(`date-age.html`, now removed) and appears on the home page as "Travel Insurance". The customer
enters the trip start and end dates, date of birth, destination country and
whether the trip is for study. The page then shows the matching plan(s) with
the price in GHS and a "Request this Quote" button per plan that opens
WhatsApp with the details pre-filled. The full specification is in the PRD
(Travel Insurance Quotation Tool — PRD).

### Rates and the exchange rate (`src/data/rates.json`)

All prices come from the Travel Insurance Rate Card (USD, VAT included).
The page converts them to GHS with one central rate: `GHS = USD × rate`,
shown to two decimal places.

- The exchange rate is the **first key** of `rates.json` (JSON cannot start
  with a line such as `Rate=11`, so it is written as `"rate": 11`).
- To change it, open `src/data/rates.json` on GitHub, change the number
  (for example 11 to 12) and commit. GitHub Pages publishes in about a minute.
- Open pages re-read the file on load and about every minute, so customers
  with the page already open pick up the new rate without refreshing.
- The same file holds the Schengen country list, duration tiers, age bands,
  the plan prices by age band, and the Student's Package prices, so a premium
  or a country's zone can be changed without touching the page code.
- The file is public on GitHub Pages, so the rate card is visible to anyone
  who knows the file address.
- There is no in-page password or rate editing. The "Rate =" label on the
  page is display only. If you later want in-page changes with a password
  and confirmation, that needs a small backend (for example a Google Sheets
  script), since GitHub Pages cannot write files.

### Rules in brief

- Duration counts both the start and end day. Tiers: up to 7, 10, 15, 21,
  31, 60, 92 days, up to 180 days, Annual (to 365) and Bi-Annual (to 730).
  The last three show "limited to 92 days per travel". Over 730 days: no cover.
- Age is measured on the trip start date. Bands: Under 19, 19–65, 66–75,
  76–80, 81 and above.
- Schengen destinations show the Schengen plan. All other countries show
  Traveller, Pearl and Economy. A plan with no price for the age band is
  hidden. If nothing is left, the page shows "No cover for the Age/Destination".
- "Is the purpose for study?" (default No): when Yes, the Student's Package
  replaces the normal plans (6 months up to 180 days, 1 year up to 365 days).
- Left out of this version: Family, Europe Basic, Economy Basic, and the
  Travel and Tour Group Policy.

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
- **Deploying**: `index.html` already sits at the project root. Most
  static hosts serve whatever file is configured as the index at `/`, so
  either set your host's index document to `index.html`, or configure a
  rewrite/redirect from `/` to `/index.html`. The calculator pages still
  live together in `src/pages/` and keep linking to each other with plain
  filenames (`ahotopii.html`, `motor.html`, etc.); `site-nav.js` detects
  which folder the current page is in and builds the right relative path to
  `index.html` and back automatically.
- **GitHub Pages**: the travel insurance page loads `../data/rates.json`
  relative to `src/pages/`, so keep the `src/data/` folder in the repository.
  Pages caches files briefly, so a rate change can take a minute or two to
  appear.
