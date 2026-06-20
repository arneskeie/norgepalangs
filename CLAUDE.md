# CLAUDE.md — Norge på langs, modernized site (03-modernized/)

This file is the source of truth for decisions made about this project.
Read it before starting any work session. Update it when a decision changes
or a task completes. If something here conflicts with an earlier instruction
in chat, THIS FILE WINS unless the person explicitly says otherwise in the
current session.

## Hard rules (apply to 03-modernized/ ONLY)

- **Never touch `02-restored-static/` or `01-original-php/`.** Those are
  done, faithful to the original 2009 site. Confirm no files outside
  `03-modernized/` changed before every commit.
- **Never invent text content.** Every sentence must trace back to either
  `02-restored-static/` (real recovered original content) or to something
  explicitly provided in chat. If unsure whether a piece of text is real,
  flag it — don't guess.
- **Only use real images** from `02-restored-static/`. CSS treatments
  (gradients, filters, color grading) are fine on real photos. Never
  introduce new stock imagery.
- **Sponsor list, names, dates, stats** — always pull verbatim from the
  real source. See "Content inventory" below for the verified real values.
- All buttons/CTAs are **pill-shaped**, never rectangular or underlined
  text links.
- **Never combine fill and stroke** on the same element — pick one.
- Outlined elements use **2px** stroke (not 1px).
- All pill buttons use **18px** (`1.125rem`) font-size. Both `.btn-solid`
  and `.btn-outline` are the single source of truth in `main.css` —
  never override per-instance.
- Button labels render in **sentence case** — no `text-transform: uppercase`.
  Letter-spacing is `0.02em` (tuned for mixed-case at 18px, not all-caps).
- Button padding is **`0.75rem 2rem`** (vertical × horizontal).
- **No minimum size floor for Fraunces.** Fraunces may be used at any
  size. Its optical-size axis (opsz 9–144) is activated automatically
  via `font-optical-sizing: auto` (browser default — do not override
  to `none`). At small sizes Fraunces auto-selects a cut with more
  open spacing and taller x-height, resolving the readability issue
  that the old Instrument Serif floor rule was compensating for.
- **4/8pt spacing & sizing grid.** All padding, margin, gap, border-radius,
  and general element sizing (widths/heights of UI elements) must use values
  from this list (in px):
  **4 · 8 · 12 · 16 · 18 · 20 · 24 · 32 · 36 · 40 · 48 · 56 · 64 · 72 · 80**
  and continuing in 8px increments above 80 (88, 96, 104, 112, 120 …).
  This does NOT apply to `font-size` (governed by the type scale ladder above),
  `line-height`, `letter-spacing`, or content column max-widths (text flow
  decisions). Any new off-grid spacing value must be flagged rather than silently
  introduced. Existing documented off-grid values: see Decision changelog entry
  for 2026-06-20 spacing audit — flagged items deferred pending user review.
- Accent color: **orange-400** (`#fb923c`). Confirmed via real color
  analysis of 60 sampled trip photos — teal (the original logo color) was
  the weakest hue present in the actual photography; orange-400 matches
  the second-strongest real cluster (warm/amber tones) and also echoes the
  mustard-yellow active-nav-state color from the actual original site.
  Watch for leftover teal in older components (e.g. SVG route-line dots)
  that predate the swap.

## What's permanently lost (do not try to restore, do not fake)

- **Turlogg (trip diary) full text** — lived in a MySQL database on
  `mysql.stud.ntnu.no`, never backed up, account long closed. Only 4 entry
  *titles + timestamps* survived (recovered via Wayback Machine homepage
  capture). The restored site (`02-restored-static/`) is the historical
  record for this — it transparently shows the gap, including the 4
  recovered titles. The MODERNIZED site does not feature this content at
  all — no GJENFUNNET section, no recovered titles, no diary-loss
  explanatory note. This was decided explicitly: the restored site carries
  the history, the modernized site is the clean, polished experience.
- **Gjestebok (guestbook)** — was a third-party Bravenet embed, never
  stored on the original server at all. Bravenet itself no longer exists.
  Nothing to recover. No page, nav item, or footer link on either site.

## Site structure decisions

- **Nav (4 items only):** Om oss · Reiserute & galleri · Reisebrev · Utstyr
- **Nav layout:** No hamburger menu. Desktop (≥ 768px): nav renders
  as a 912px-wide rounded pill. Mobile (< 768px): full-bleed strip (no
  pill shape, no max-width). Items use `justify-content: space-evenly`
  and `width: 100%` at ALL screen sizes. Nav items are **sentence case**
  (no uppercase). Font size: 16px desktop / 14px mobile.
  Letter-spacing: 0.02em.
- **Nav two-layer structure:** `.nav-inner` is an invisible layout wrapper
  (`max-width: 960px; margin: 0 auto; padding: 0 1.5rem` — no
  background, no border-radius). Inside it sits `.nav-pill`, which gets
  the background and border-radius. Since `.nav-pill` fills `.nav-inner`'s
  content area, it naturally renders at 912px (960 − 2 × 24px), exactly
  matching content sections that use `max-w-content mx-auto px-6`.
  Do NOT put background or border-radius on `.nav-inner` — that would make
  the pill 960px (the full wrapper width, wider than text content areas).
- **No Turlogg page or nav item.** Reisebrev is the de facto "log" of the
  trip now.
- **No Gjestebok page, nav item, or footer/contact link anywhere.**
- **No contact email anywhere on the modernized site.** The original
  email (montarou@stud.ntnu.no) is long outdated — intentionally omitted,
  not an oversight.
- **Reiserute + Galleri are merged into one page.** Route info, the 15
  etapper + Oppvarmingstur, and each leg's photo gallery all live together.
  This was a deliberate nav-reduction decision, not an oversight.
- **Signature header component** (title card + photo strip) appears on
  every page.
  - **Homepage:** full hero variant — `HeroHeader` renders the real Velkommen.webp
    background image, dark overlay, photo strip, title card (not a link), and
    the bottom-anchored hero text block (eyebrow / headline / subtext / buttons).
    CSS class: `.hero-header` (overflow: hidden to contain the bg image).
  - **Inner pages:** `InnerHeader` — same card + photo strip on plain dark
    (#020617) background, no hero image/overlay/text. Title card renders as an
    `<a href="index.html">` link to the homepage. CSS class: `.inner-header`
    (no overflow: hidden, so box-shadow isn't clipped).
  - **`SiteHeader` default export:** `variant="compact"` → `InnerHeader`;
    `variant="hero"` → `HeroHeader`. All inner pages use `variant="compact"`.
  - **No compact-card / compact-header CSS.** That separate small-card variant
    was removed. Inner pages now use the same full-size `.title-card`.
- **Title card shadow:** `.clip-path` was removed from `.title-card`.
  `box-shadow` now works. Final value:
  ```
  box-shadow: 0 28px 64px -12px rgba(2,6,23,0.92), 0 6px 20px rgba(2,6,23,0.88);
  ```
  Color is slate-950 (#020617) — NOT orange. `filter: drop-shadow` is gone.
  The hero-header still has `overflow: hidden` for background containment, but
  the inner-header intentionally omits it to avoid any clipping of the shadow.

## Homepage section order (confirmed, do not deviate without asking)

1. Header component — full hero variant
2. Hero text block: eyebrow ("71°10′N → 57°58′N" — confirmed accurate:
   Nordkapp / Lindesnes coordinates), headline "Veien er målet." (large,
   bottom-anchored in hero), one real supporting line pulled from
   Velkommen text, two pill buttons ("Les historien →", "Se ruta →")
3. **Om turen** — **single column, full-width.** No eyebrow or headline
   (both removed). INGRESS paragraph at 1.5rem (ingress/sub-text size), followed by
   VELKOMMEN body paragraphs at 1.125rem (bulk body size). Closes with the
   handwritten signature image (`public/images/diverse/SignaturLiten.jpg`,
   190×46 JPG with white bg; `mix-blend-mode: screen` makes white
   disappear on the dark background, leaving just the ink signature).
   No text attribution — the image IS the attribution.
4. **Pull-quote** — id="quote". Full-width (no max-width constraint on
   blockquote), centered text. Quote at fixed 2.5rem (no responsive
   variant). Attribution: "Marius Montarou" only (no "— Velkommen-tekst").
5. **Ruta section** — id="ruta". Eyebrow "Ruta" + h2 "15 etapper,
   Nordkapp til Lindesnes." + short description (1.5rem / ingress size, full-width,
   no max-w constraint) + route-line SVG + 3 stats (2 500 km /
   6 måneder / 15 etapper — NOT 4) + "Se hele ruta" button.
6. **Siste reisebrev** — id="siste-reisebrev". Eyebrow "Reisebrev",
   section h2 "Siste reisebrev". Grid layout matching Reisebrev page:
   image (260px col, aspect-[4/3] on mobile) + content column (date,
   etappe label, h3 title, excerpt). "Les mer →" text link after excerpt
   linking to per-post URL (pattern: `reisebrev6.html`). "Alle reisebrev"
   outline button at bottom linking to reisebrev.html. Latest entry:
   Etappe 6, Hegra–Gressli (image: Reisebrev0601.jpg). Future per-post
   pages will use the pattern `reisebrevN.html` (N = letter number).
7. **Sponsor logos** — own dedicated section, NOT inside the footer.
   Logo grid, all 20 real sponsors (see Content inventory). Logos sit
   directly on the dark background with `mix-blend-mode: screen` — JPGs
   with black backgrounds: screen blend makes black pixels disappear,
   leaving the logo in full color. No additional CSS filter applied.
   Hover: opacity 70%→100% + scale-105. Section title uses h2/font-serif
   treatment matching other sections ("Sponsorer."), NOT the small eyebrow
   style. Description line sits between title and grid. Note: 5 logos
   (Helsport, MX Sport, Skaidi Hotel, Femund Fjellstue, Umbukta Fjellstue)
   have non-black backgrounds — they will show their original bg color via
   screen blend; acceptable for now, PNG conversion deferred.
8. **Footer** — single line only: "Turgåer & Ansvarlig redaktør: Marius Montarou
   | Webmaster: Arne S. Skeie | NORGEpåLANGS © 2008/2009". No Kontakt
   heading, no email, no sponsor list (moved to its own section, #7).

## Content inventory (verified real values — use these exactly)

**The 3 real stats (NOT 4):** 2 500 km · 6 måneder · 15 etapper

**Real sponsor list (20) with verified URLs (checked 2026-06-19):**
- XXL → http://www.xxl.no/ ✓
- Janus → http://www.janus.no/ ✓
- Sportsbua → http://www.sportsbua.no/ ✓
- Helsport → http://www.helsport.no/ ✓
- Cappelen → http://www.cappelendamm.no/ ✓
- Alfasko → https://www.alfa.no/ ✓ (rebranded to Alfa; old alfasko.no gone)
- Åsnes → http://www.asnes.com/ ✓
- Fjellpulken → https://www.fjellpulken.com/ ✓ (updated from .no)
- Rottefella → https://www.rottefella.com/ ✓ (updated from .no)
- Amfibi → http://www.amfibi.no/ ✓
- Adidas → https://www.adidas.com/eyewear ✓ (path lowercased; 403 is bot-detection)
- MX Sport → http://www.mx-sport.no/ ✓ (original subpath /medlemmer/telemark/ was 404; upgraded to root)
- Skaidi → http://www.skaidihotel.no/ ✓
- Breidablikk → http://www.breidablikk.no/ ✓
- Lundhogda → http://www.lundhogdacamping.no/ ✓
- Femund Fjellstue → http://www.femundfjellstue.no/ ✓
- Umbukta Fjellstue → http://www.umbuktafjellstue.no/ ✓
- Jule Ferie & Fritid → (no link) — no current website exists; rendered
  as unlinked logo by design, not an oversight
- Dokka Camping → http://www.dokkacamping.no/ ✓
- Gudbrandsdal Hotell → http://www.sgh.no/ ✓

**Confirmed real coordinates:** Nordkapp 71°10′N, Lindesnes 57°58′N.

**Design tokens:** background slate-950 (#020617), surface slate-900,
text slate-50, muted slate-400, accent orange-400 (#fb923c). Fonts:
Fraunces (display/serif, variable font with opsz 9–144 and wght 100–900),
Work Sans (body AND data/labels/eyebrows — serves both roles; JetBrains
Mono and Inter removed entirely). Label/eyebrow elements use `font-medium`
(500) weight with `uppercase tracking-widest` to maintain visual distinction
from body text.
Content max-width: **960px** (`max-w-content` in Tailwind,
defined in `tailwind.config.js`) — applied to all section content
wrappers and CSS header/nav inner containers. Exception: the full-bleed
hero outer container has no width cap.

**Type scale (rem ladder — only use these values):**
0.75rem · 0.875rem · 1rem · 1.125rem · 1.25rem · 1.5rem · 2rem · 2.5rem · 3rem · 3.5rem · 4rem · 4.5rem · 5rem (and continuing by 0.5rem)

Increment rule:
- **At or below 2rem:** use the rungs as listed above (irregular spacing is intentional — finer steps at small sizes).
- **Above 2rem:** only 0.5rem increments — 2.5, 3, 3.5, 4, 4.5, 5, 5.5 … extending indefinitely.
  The existing `clamp(3rem, 8vw, 6rem)` hero headline and `4.5rem` inner-page h1 both fit this rule.

**New floor: 0.75rem (12px).** The old 0.625rem (10px) floor is removed. 10px type was the old floor and has been audited out; `text-xs` (0.75rem) is now the minimum permitted size. Eyebrow text: **0.875rem (14px = `text-sm`)**.
Base font size: 16px (1rem) on `body`. Hero headline: `clamp(3rem, 8vw, 6rem)`.

**Type role reference (not exceptions — these are on the ladder):**
- **0.75rem (12px = `text-xs`):** small labels, metadata, icon captions. Floor — nothing smaller.
- **0.875rem (14px = `text-sm`):** eyebrows, secondary labels, captions.
- **1rem (16px = `text-base`):** nav links, general UI text.
- **1.125rem (18px):** body/bulk text — all long-form prose paragraphs
  (#om-turen VELKOMMEN, Reisebrev post body, OmOss bio, Reisebrev excerpts,
  Reiserute NOTE). Use `text-[1.125rem] leading-normal`.
- **1.25rem (20px):** available as a rung between body and ingress, use when 1.125rem is too small and 1.5rem too large.
- **1.5rem:** ingress/sub-text — the supporting paragraph directly under a
  page or section h1/h2 title. All inner-page intro paragraphs + homepage
  INGRESS and #ruta description. Use `text-[1.5rem] leading-normal`.
- **4.5rem:** inner-page h1 titles (desktop). Use `text-[2.5rem] md:text-[4.5rem]`
  (2.5rem mobile fallback). Valid rung (above 2rem, 0.5rem increments apply).

**line-height: 1.5 = `leading-normal`** — use this for all body and ingress text
(replaces old `leading-relaxed` / 1.625 in prose contexts).

**Hero subtext matches inner-page sub-text:** `.hero-subtext` and inner-page
sub-texts use the same values: `font-size: 1.5rem; line-height: 1.5; color: #94a3b8`
(slate-400). The previous hero-subtext was 1.125rem / lh 1.65 / rgba opacity 0.85;
all three were aligned to match the inner-page style.

**Titles and headlines are entirely white — no accent word.** The `.hero-headline`
("Veien er målet.") and all inner-page h1s are plain `text-slate-50` with no
`<span>` accent treatment. The TitleCard wordmark (`NORGE <em>på</em> LANGS`) is
a brand mark, not a page title — it keeps the orange "på". Section h2s on the
homepage (e.g. #ruta, #siste-reisebrev) are unaffected by this rule.

**Reisebrev images — single highest-res per entry.** Each entry previously had
multiple images (same photo at different resolutions). All entries now use only
one image — the highest-resolution version. The `images[]` array was removed from
the data; only `img` remains. The gallery block in `ReisebrevPost.jsx` was also
removed. Selected images (confirmed by pixel dimension check):
- Etappe 1: Reisebrev0102.jpg (360×270)
- Etappe 2: Reisebrev0202.jpg (360×202)
- Etappe 3: Reisebrev0302.jpg (270×306)
- Etappe 4: Reisebrev0402.jpg (339×256)
- Etappe 5: Reisebrev0502.jpg (385×230)
- Etappe 6: Reisebrev0602.jpg (385×203)
The `00` images for entries 3–6 were 75×75 thumbnails; the `01` images were
medium-res; the `02` images were consistently the highest-resolution.
`LATEST_REISEBREV.img` on the homepage also updated to `Reisebrev0602.jpg`.

**Homepage section ids:** hero, om-turen, quote, ruta, siste-reisebrev, sponsorer.

## Individual Reisebrev post pages

Each letter has its own static page: `reisebrev1.html` through `reisebrev6.html`.

**File structure (all in `03-modernized/`):**
- `src/data/reisebrev.js` — single source of truth for all letter data (etappe, title, date, images, excerpt, body paragraphs, kadaver table for entry 1). Both the list page and post pages import from here.
- `src/pages/reisebrevpost/ReisebrevPost.jsx` — shared post template (compact masthead, back link, eyebrow/h1/date, hero image, body text, kadaver table, additional images gallery, prev/next nav, "Alle reisebrev" button).
- `src/pages/reisebrevN/main.jsx` (N=1..6) — minimal entry points rendering `<ReisebrevPost n={N} />`.
- `reisebrevN.html` (N=1..6) — HTML entry points at project root.

**All 6 pages registered in `vite.config.js` under `build.rollupOptions.input`.**

**Image layout per post:** First `images[]` entry is displayed as the hero (full-width, max-h-[480px]). Remaining images shown in a grid below the body text: 1 extra → 2-col grid (entry 1 & 2); 2 extra → 3-col grid (entries 3-6).

**Kadaver status table** appears only on entry 1 (Etappe 1), rendered as a CSS grid table with header row + 5 body rows (Føtter/Knær/Rygg/Skuldre/Moral × Marius/Emil).

**Linking:** Reisebrev list page (`src/pages/reisebrev/Reisebrev.jsx`) imports `LETTERS` from the shared data file. Image, title, and "Les mer →" on each article card all link to the respective post page. Homepage "Les mer →" in `#siste-reisebrev` links to `reisebrev6.html`. Both confirmed ✓.

## Known open issues

None currently open. Add new issues here as they're found, dated.

## Live URLs (post-rename)

- Restored 2009 site: https://arneskeie.github.io/norgepalangs-2009/ (repo: arneskeie/norgepalangs-2009)
- Modernized site: https://arneskeie.github.io/norgepalangs/ (repo: arneskeie/norgepalangs)

## Decision changelog

- Chose static multi-page Vite build (not SPA/React Router) specifically
  for GitHub Pages compatibility — no server-side routing available.
- Chose `norgepalangs-ny` as the repo name (ASCII-only constraint — `å`
  is not permitted in GitHub repo names).
- Accent color changed from teal-400 to orange-400 based on real color
  analysis of trip photography, not aesthetic preference alone.
- Removed all "GJENFUNNET" / recovered-Turlogg-title content from the
  modernized site entirely. The restored site is the historical record
  for this; the modernized site doesn't carry it. Diary-loss
  explanatory note also removed as no longer needed.
- Reduced homepage stats from 4 to 3 (dropped "4 årstider").
- Removed all contact information (email) from the modernized site —
  outdated, intentionally omitted.
- Sponsor logos moved out of the footer into their own dedicated
  section with grayscale/hover-color treatment. Footer reduced to a
  single credit line.
- Reordered homepage: Hero → Om turen → Pull-quote → Ruta → Siste
  reisebrev → Sponsor logos → Footer. Ruta section (stats + route
  visual) moved from its earlier position to directly above Siste
  reisebrev.
- 2026-06-19: Content max-width token introduced — 960px, defined once
  in `tailwind.config.js` as `maxWidth.content`, applied everywhere as
  `max-w-content`. All hardcoded `max-w-[1100px]` in JSX and
  `max-width: 1100px` in main.css replaced. Hero outer container
  remains full-bleed (uncapped).
- 2026-06-19: Footer credit line updated — "Ansvarlig redaktør" prefixed
  with "Turgåer & " for Marius Montarou's entry.
- 2026-06-19: Sponsor section corrected from text/button pills to a real
  logo image grid.
- 2026-06-19: Sponsor logo treatment revised — removed white card
  backgrounds, switched to mix-blend-mode: screen directly on dark bg
  (black-bg JPGs need no processing; screen blend makes black transparent).
  Grayscale→color hover dropped in favour of opacity-70→100 + scale-105.
  Section heading changed from eyebrow to h2/font-serif. Description line
  moved above the grid.
- 2026-06-19: Added target="_blank" rel="noopener noreferrer" links to all
  20 sponsor logos. URLs verified via HTTP. MX Sport upgraded from dead
  subpath to root. Fjellpulken and Rottefella updated to .com.
- 2026-06-19: Sponsor URL verification closed out. Alfasko → alfa.no
  (confirmed rebrand). Adidas → adidas.com/eyewear (lowercase path, 403
  is bot-detection). Jule Ferie & Fritid rendered as unlinked logo by
  design — no current website, intentionally not a link.
- 2026-06-19: Nav pill width fixed — moved background-color and
  border-radius from `.nav-inner` (the 960px layout wrapper) to a new
  `.nav-pill` div inside it. `.nav-pill` fills `.nav-inner`'s padded
  content area naturally → 912px, exactly matching content section text
  width. `.nav-inner` padding changed from 1.75rem to 1.5rem to match
  px-6 used on content sections. Mobile: `.nav-inner { padding:0 }` +
  `.nav-pill { border-radius:0 }` for full-bleed strip behavior.
- 2026-06-19: Button padding set to 0.75rem 2rem.
- 2026-06-19: Nav width mismatch fixed — removed horizontal `2rem`
  padding from `.site-nav` outer wrapper; centering now delegated
  solely to `.nav-inner { max-width: 960px; margin: 0 auto }`,
  identical to content sections. Nav items centered on desktop
  (changed justify-content from flex-end to center). Hamburger menu
  removed entirely — no state, no dropdown, no Menu/X icons. Mobile
  nav is full-bleed (max-width: 100%, border-radius: 0) with all 4
  items spread using justify-content: space-evenly; font-size reduced
  to 0.65rem and tracking to 0.12em on mobile for fit.
- 2026-06-19: Removed uppercase text-transform from all pill buttons;
  letter-spacing tightened from 0.12em to 0.02em (0.12em was tuned
  for all-caps, far too wide at mixed-case). Buttons now render in
  sentence case as written.
- 2026-06-19: Button font-size set to 18px (1.125rem) in `.btn-solid`
  and `.btn-outline` in main.css. Applies to all pill buttons site-wide.
- 2026-06-19: Explicit 16px base font size — added `font-size: 1rem`
  to body in main.css (previously implicit browser default).
- 2026-06-19: Instrument Serif audit — "never below 40px" rule
  enforced. Sized up: pull-quote (20→40px) and reisebrev entry
  headlines (24→40px). Switched to Inter: stat values on homepage
  (30px — numeric data, Inter more precise), homepage latest-reisebrev
  preview title (24px — card/preview context), person name in OmOss
  card (18px), etappe row titles in Reiserute (18px), oppvarmingstur
  title in Reiserute (18px), category accordion labels in Utstyr (20px).
  TitleCard "NORGE på LANGS" brand mark kept as documented exception.
  [This rule and all Inter-for-floor-rule switches subsequently
  reversed — see Fraunces/Work Sans swap entry below.]
- 2026-06-19: Replaced JetBrains Mono with Inter throughout. Removed
  Google Fonts import for JetBrains Mono, removed `mono` from
  tailwind.config.js fontFamily, changed all `font-family: 'JetBrains
  Mono'` declarations in main.css to Inter, replaced all `font-mono`
  Tailwind utility classes in JSX with `font-sans`. Label/eyebrow
  elements (anything with `uppercase tracking-widest`) received
  `font-medium` (500 weight) to preserve visual distinction from body
  text now that the inherent weight difference of a monospace font is
  gone. `font-weight: 500` also added to `.btn-solid`, `.btn-outline`,
  `.nav-link`, `.nav-mobile-link`, `.hero-eyebrow` CSS classes.
  [Inter subsequently replaced by Work Sans — see swap entry below.]
- 2026-06-19: Tried grayscale(100%) brightness(300%) threshold approach on
  sponsor logos (to produce white silhouettes via screen blend). Reverted —
  12 flat/black-bg logos would clip cleanly but 5 logos have non-black
  backgrounds (Helsport white, MX Sport white, Skaidi teal, Femund red,
  Umbukta gray) that the filter cannot fix, plus 3 with internal shading
  (Janus, Sportsbua, SGH) that may look muddy. Settled on mix-blend-mode:
  screen only, full original color, no filter. 20 JPGs copied from 02-restored-static/images/sponsors/
  to public/images/sponsors/. Each logo rendered in a white rounded card
  (h-20, object-contain), grayscale+opacity-60 by default, full color on
  hover via group-hover. Filename map: XXL.jpg, Janus.jpg, sportsbua.jpg,
  Helsport.jpg, Cappelen.jpg, Alfasko.jpg, Asnes.jpg (for Åsnes),
  Fjellpulken.jpg, rottefella.jpg, amfibi.jpg, adidaseyewear.jpg (Adidas),
  mxsport.jpg, Skaidi.jpg, Breidablikk.jpg, Lundhogda.jpg, Femund.jpg,
  Umbukta.jpg, Jule.jpg, Dokkacamping.jpg, sgh.jpg (Gudbrandsdal Hotell).
- Root cause of initial "full-bleed"
  appearance: Tailwind v3's PostCSS watcher does not hot-reload config
  changes into an already-running Vite dev server — the new token was
  absent from the dev server's in-memory CSS even though `npm run build`
  produced the correct output. Fix: hard-restart the dev server after
  any tailwind.config.js change.
- 2026-06-19: Type scale ladder established — only 0.625, 0.75, 0.875,
  1, 1.5, 2, 2.5, 3, 3.5rem permitted. All off-ladder sizes audited and
  snapped across all 5 pages + SiteHeader. Eyebrow size raised to 14px
  (text-sm / 0.875rem). Hero headline min raised from 2.75rem → 3rem
  (clamp(3rem, 8vw, 6rem)). Hero subtext: 18px (1.125rem, explicit
  override). Key snaps: text-[0.9375rem] → text-sm, text-lg → text-base,
  text-3xl → text-[2rem], text-4xl → text-[2.5rem], text-xl → text-[1.5rem],
  text-[0.6rem]/text-[0.65rem] → text-[0.625rem].
- 2026-06-19: Nav — space-evenly at ALL screen sizes (not just mobile);
  all-caps removed from nav items (sentence case); desktop 16px, mobile
  14px; letter-spacing 0.02em.
- 2026-06-19: Hero text centered (text-align, hero-buttons justify-center,
  hero-subtext margin auto).
- 2026-06-19: Homepage section ids added (hero, om-turen, quote, ruta,
  siste-reisebrev, sponsorer). All border-t dividers between sections removed.
- 2026-06-19: om-turen section redesigned — eyebrow and "Veien er målet."
  headline removed; single-column full-width layout; typed signature
  replaced with handwritten SignaturLiten.jpg (190×46, mix-blend-mode:
  screen). Image copied to public/images/diverse/.
- 2026-06-19: Pull-quote (id="quote") — full-width (no max-w-[760px]),
  fixed 2.5rem (no md:3rem), attribution trimmed to "Marius Montarou".
- 2026-06-19: Ruta section (id="ruta") — description made full-width
  (removed max-w-[560px]).
- 2026-06-19: Siste reisebrev (id="siste-reisebrev") — eyebrow changed
  to "Reisebrev"; section h2 "Siste reisebrev" added; image+content
  grid layout matching Reisebrev page; "Les mer →" text link added
  (targets reisebrev6.html); "Les reisebrev" button renamed "Alle
  reisebrev"; LATEST_REISEBREV data extended with img and postHref fields.
- 2026-06-19: Title card drop shadow made visible — `.title-card` uses
  `filter: drop-shadow()` (not `box-shadow`, which is clipped by `clip-path`).
  Prior attempts used only dark/black shadow colors which were invisible against
  the dark hero background. Orange glow raised from rgba(251,146,60,0.18) to
  0.65 opacity with 56px blur; dark shadow increased to 0.95 opacity with 28px
  offset/64px blur. `.hero-header { overflow: hidden }` confirmed as ancestor
  clipping context; downward shadow into strip area is not clipped; only a
  cosmetically irrelevant ~4px of upward glow is clipped at the hero's top edge.
- 2026-06-19: Individual Reisebrev post pages built — 6 HTML pages
  (reisebrev1.html through reisebrev6.html), shared data file
  (src/data/reisebrev.js), shared post component (ReisebrevPost.jsx).
  All letter content recovered verbatim from 02-restored-static/. Kadaver
  status table included on entry 1. Reisebrev list page updated to import
  from shared data and link all entries. Vite config updated with 6 new
  inputs. All 11 pages build cleanly.
- 2026-06-20: `.title-card` clip-path removed; box-shadow replaces filter.
  Final: `box-shadow: 0 28px 64px -12px rgba(2,6,23,0.92), 0 6px 20px rgba(2,6,23,0.88)`.
  Color is slate-950 / #020617 only — orange glow removed entirely.
- 2026-06-20: Inner page header rework — compact masthead variant removed.
  Inner pages now use `InnerHeader` component: same full-size title card +
  photo strip on plain dark bg (`.inner-header` CSS), no hero image/text.
  Title card on inner pages renders as `<a href="index.html">` link. No
  overflow:hidden on `.inner-header`, ensuring box-shadow isn't clipped.
  Old `.compact-header`, `.compact-inner`, `.compact-card`,
  `.compact-strip-wrapper` CSS removed.
- 2026-06-20: Body/ingress text sizing applied across all pages.
  Bulk prose text → `text-[1.125rem] leading-normal` (18px / lh 1.5).
  Ingress/sub-text under page titles → `text-[1.5rem] leading-normal`.
  Inner-page h1 titles → `text-[2.5rem] md:text-[4.5rem]`.
  `leading-relaxed` (1.625) replaced by `leading-normal` (1.5) in all
  prose contexts.
- 2026-06-20: Hero changes — min-height reduced from max(85vh,480px) to
  max(75vh,480px). Overlay darkened (~0.52/0.68/0.90/1.00, was 0.35/0.55/0.85/1.00).
  `.hero-subtext` max-width removed (was 560px).
- 2026-06-20: `.hero-subtext` aligned to match inner-page sub-text — font-size
  1.5rem, line-height 1.5, color #94a3b8 (full slate-400, was 1.125rem/1.65/rgba).
- 2026-06-20: Titles/headlines made fully white — removed `<span>` accent
  treatments from `.hero-headline` (SiteHeader.jsx) and all inner-page h1s
  (OmOss, Utstyr, Reiserute, Reisebrev). TitleCard wordmark and section h2s
  unaffected.
- 2026-06-20: Reisebrev images — consolidated to single highest-res image per
  entry. Removed `images[]` array from data; only `img` remains. Gallery block
  removed from ReisebrevPost.jsx. See "Content inventory" for selected filenames.
  Homepage LATEST_REISEBREV.img updated from 0601 to 0602.
- 2026-06-20: Hero background image switched from Velkommen.jpg to Velkommen.webp.
- 2026-06-20: Footer credit (02-restored-static): removed hyperlink from Arne's
  WEBMASTER entry — folk.ntnu.no/arnesigm is outdated and no longer linked.
  "WEBMASTER: ARNE S. SKEIE" is now plain text. Marius's omoss.html link unaffected.
  Applied across all 16 HTML pages.
- 2026-06-20: Version-switcher outer pill background changed from #1e1e1e to
  rgba(0,0,0,0.9) — true black at 90% opacity reads more consistently against
  both sites' backgrounds. Hover tint and all other values unchanged.
- 2026-06-20: Version-switcher redesigned — segmented pill control. Outer dark pill
  (#1e1e1e) floats on the page's own background (no background of its own). Inner
  white pill on the active/current side; inactive side is a link with
  rgba(255,255,255,0.1) hover tint, 0.15s ease transition. Labels: "Original nettside"
  (left) / "Oppdatert nettside" (right). Wrapper: 20px vertical padding, flex
  center. Font 14px Inter. Identical markup on both sites; only which side is
  active differs. Applied via SiteFooter.jsx (03-modernized) and inline in all
  16 HTML pages (02-restored-static).
- 2026-06-20: Typography swap — Instrument Serif → Fraunces (display/serif
  role), Inter → Work Sans (body/sans role), site-wide. Google Fonts import
  updated; Instrument Serif and Inter removed entirely. tailwind.config.js:
  font-serif now maps to Fraunces (variable, opsz 9–144, wght 100–900, italic),
  font-sans now maps to Work Sans (wght 300;400;500;600). font-fraunces testing
  utility removed (now redundant with font-serif); font-dm-serif retained for
  visual comparison.
  Reason for swap: Fraunces' built-in optical-size axis (opsz) natively handles
  small-size readability — at small sizes the browser auto-selects a more
  legible optical cut (more open spacing, taller x-height), which removes the
  need for the minimum-size floor rule that existed for Instrument Serif. The
  hard rule "Instrument Serif never below 40px" is now REMOVED.
  All elements that had been switched FROM serif TO Inter specifically because
  of the floor rule are reverted to font-serif (Fraunces): stat values on
  homepage, latest-reisebrev preview title, person name in OmOss card, etappe
  row titles in Reiserute, oppvarmingstur title in Reiserute, category accordion
  labels in Utstyr. TitleCard wordmark also switched to Fraunces (previously a
  documented exception that stayed Instrument Serif). Elements that were always
  Inter in their original intended role (eyebrows, labels, body prose, nav,
  buttons) are now Work Sans. font-optical-sizing: auto is in effect (browser
  default — not overridden anywhere).
- 2026-06-20: Type scale updated — floor raised from 0.625rem to 0.75rem
  (10px removed, 12px is new minimum). 1.125rem (18px) and 1.25rem (20px)
  added as proper rungs (1.125rem was previously a documented off-ladder
  exception; it is now simply on the ladder). Increment rule clarified:
  at/below 2rem, use rungs as listed (irregular fine-grained steps);
  above 2rem, only 0.5rem increments permitted (2.5, 3, 3.5, 4, 4.5, 5 …).
  The existing 4.5rem inner-page h1 size and clamp(3rem,8vw,6rem) hero
  headline are valid. Type scale audit applied:
  - Snapped: `text-[0.625rem]` → `text-xs` (0.75rem) in Home.jsx (×2,
    RouteLine Nordkapp/Lindesnes labels), OmOss.jsx (×1, etappe label).
  - No other off-ladder font-size values found in JSX or CSS.
- 2026-06-20: 4/8pt spacing & sizing grid established as a hard rule.
  Applies to: padding, margin, gap, border-radius, element widths/heights.
  Does NOT apply to: font-size, line-height, letter-spacing, or text column
  max-widths. Grid (px): 4, 8, 12, 16, 18, 20, 24, 32, 36, 40, 48, 56,
  64, 72, 80, then +8 per step (88, 96, 104 …).
  Spacing audit applied — snapped values:
  - `.site-nav` padding: 10px → 8px (CSS)
  - `.strip-track` gap: 14px → 16px (equidistant; went up for cleaner image spacing)
  - `.strip-track` padding: 10px 7px → 8px 8px (both to nearest grid value)
  - `gap-1.5` (6px) → `gap-2` (8px) in Reiserute.jsx strip thumbnail rows (×2)
  - `mt-1.5` (6px) → `mt-2` (8px) in Utstyr.jsx bullet dash
  - `mt-1.5` (6px) → `mt-2` (8px) in SiteHeader.jsx title card subtitle
  Flagged (not auto-applied — pending user review):
  A. `.hero-content { padding: 28px 1.5rem 0 }` — 28px off-grid (24 or 32).
     Shifts title card vertical position.
  B. `.strip-wrapper { top: 102px; height: 133px }` — both off-grid (96/104
     and 128/136 respectively), derived together from title card height and
     photo aspect ratios. Must be changed in tandem or not at all.
  C. `SIZE_BUCKETS` in SiteHeader.jsx — photo strip image dimensions include
     off-grid values (76, 58, 90, 68, 106, 90, 102px). These set the visual
     size variety in the scrapbook strip; snapping would change the aesthetic
     rhythm.
  D. Version-switcher pill inner padding: `7px 18px` in SiteFooter.jsx — 7px
     off-grid (→8px). NOT applied: changing only the modernized site while
     leaving 02-restored-static at 7px would create a visible cross-site
     inconsistency. Requires updating both simultaneously (or accepting the
     1px discrepancy as intentional).
- 2026-06-20: Repo renamed norgepalangs-ny → norgepalangs. Vite base updated from
  /norgepalangs-ny/ to /norgepalangs/. Version-switcher added to SiteFooter pointing
  to arneskeie.github.io/norgepalangs-2009/ (restored site). Restored site repo renamed
  norgepalangs → norgepalangs-2009 simultaneously. All June 19-20 uncommitted work
  pushed in the same commit.
