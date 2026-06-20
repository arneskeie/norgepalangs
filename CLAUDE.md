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
  introduced. Permanent documented exceptions: `.strip-wrapper` top/height
  (photo geometry, not spacing) and `SIZE_BUCKETS` in SiteHeader.jsx (aesthetic
  scrapbook size variety) — both confirmed in 2026-06-20 changelog. Do not re-audit.
- **`text-wrap: balance` on all headings.** Applied globally via
  `h1, h2, h3 { text-wrap: balance }` in `@layer base` in main.css.
  Produces symmetrical line-breaks on multi-line headings. Progressive
  enhancement — no visual change on single-line headings. The TitleCard
  `h1 { white-space: nowrap }` rule already makes `text-wrap: balance`
  a no-op there. Do not override per-element unless there's a specific reason.
- **`text-wrap: pretty` on prose paragraphs.** Applied via Tailwind
  `text-pretty` class on long-form paragraph elements site-wide (body
  text, ingress, excerpts, bio, etappe notes). Prevents orphan words at
  the end of the last line. Applied selectively in JSX — NOT on eyebrows,
  metadata, labels, or short UI text.
- **`scroll-behavior: smooth` on `<html>`.** Set globally in `html {}`
  in @layer base. Used by in-page anchor links (e.g. reisebrev post pages
  linking to homepage sections). Do not override on individual elements.
- **Semantic CSS component classes — function-based reuse only.** Use
  `@apply` in `@layer components` in main.css for clusters of utilities
  that repeat across multiple components because they share a FUNCTION,
  not just a coincidental style match. Identify new candidates by usage
  pattern across components, not by guessing upfront. Current classes:
  - `.eyebrow` — `font-sans font-medium text-sm uppercase tracking-[0.2em] text-orange-400`
  - `.section-description` — `font-sans leading-normal text-slate-400` with
    `font-size: clamp(1.25rem, calc(3.5vw + 0.5rem), 1.5rem)` — scales from
    20px (≤320px) to 24px (≥457px), smooth between. The previously fixed
    `text-[1.5rem]` is replaced by this clamp in CSS.
    Applied to: #ruta description (Home), #sponsorer description (Home),
    OmOss intro, Utstyr intro (first paragraph only — see split below),
    Sponsorer page intro, Reisebrev post pages (first body paragraph),
    Reiserute INTRO (added 2026-06-20).
    Per-instance spacing (mb-*) stays in JSX; **no max-width** — text is
    full content-column width, constrained only by the page's max-w-content wrapper.
    The per-instance max-w was removed from all 3 inner pages (OmOss had 560px,
    Utstyr and Sponsorer page had 640px each). Reiserute INTRO previously had
    max-w-[640px] and text-slate-300; both removed/updated when class was applied.
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

- **Nav (5 items):** Om oss · Reiserute & galleri · Reisebrev · Utstyr · Sponsorer
  "Reisebrev" nav link now points to `index.html#reisebrev` (homepage section anchor) —
  no separate list page exists. It will never show as "active" since no page passes that
  href as currentPage; this is acceptable and expected.
- **Nav layout:** No hamburger menu. Desktop (≥ 768px): nav renders
  as a 912px-wide rounded pill. Mobile (< 768px): full-bleed strip (no
  pill shape, no max-width). Items use `justify-content: space-evenly`
  and `width: 100%` at ALL screen sizes. Nav items are **sentence case**
  (no uppercase). Font size: 16px desktop / 12px mobile (reduced from 14px
  when 5th item was added — 5 items at 14px is too cramped on 375px screens).
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
  every page. TitleCard styling (shared across all variants):
  - Eyebrow: "2008 — 2009 · Nordkapp → Lindesnes" on desktop / "2008 — 2009"
    on mobile — uses `.eyebrow` CSS class (Work Sans, font-medium, uppercase,
    tracking-[0.2em], orange-400) with a `.title-card .eyebrow` CSS override that
    reduces font-size to **0.75rem (12px) / line-height 1rem** desktop;
    **0.625rem (10px)** mobile (see mobile exception below). The "· Nordkapp →
    Lindesnes" portion is wrapped in `<span className="hidden sm:inline">` —
    hidden below 640px (sm breakpoint), visible at sm and above. Eyebrow wraps
    to 2 lines on mobile — expected and accounted for in the strip centering
    calculation.
  - Wordmark: "NORGE på LANGS" — rendered via `<Wordmark />` named export from
    SiteHeader.jsx. Base styles in Wordmark: `font-serif font-normal leading-none
    tracking-tight text-slate-50`, orange `<em>` on "på". TitleCard h1 wraps
    it at `text-[1.75rem] sm:text-[3rem]` with `leading-none` on the h1 to
    stabilize block line-height. Mobile 1.75rem stays compact at
    `white-space: nowrap` (375px). Footer uses the same component at
    `text-[1.125rem]`.
  - Subtitle: "med Montarou & co" — `font-sans font-medium text-[0.625rem]
    sm:text-[0.75rem] leading-4 uppercase tracking-[0.2em] text-slate-400
    mt-4` (desktop 0.75rem / 12px; mobile 0.625rem / 10px; line-height 1rem
    = 16px at both sizes). Matches eyebrow treatment exactly except color
    (slate-400, not orange-400).
  - **Mobile-only TitleCard typography exception (permanent):** eyebrow and
    subtitle both drop to 0.625rem (10px) on mobile (< 640px). This is below
    the site-wide 0.75rem type-scale floor. Exception is TitleCard-only and
    mobile-only — the floor rule still applies everywhere else. h1 drops to
    1.75rem on mobile (vs 3rem desktop). All three values are set in the
    CSS/JSX mobile breakpoint, not changing the base/desktop rules.
  - Card padding: **1.5rem 3rem** (desktop); mobile override **1.25rem 1.5rem**
    to prevent h1 overflow on narrow screens.
  - Card border-radius: **4px**.
  - All content is centered: `text-align: center` on `.title-card` in CSS.
  - Card/nav spacing: `.hero-content` has `padding-bottom: 24px` — this is the
    single shared source of truth for the gap between the card and the nav in
    BOTH hero and inner variants. `.inner-header` has no padding-bottom.
  - **Homepage:** full hero variant — `HeroHeader` renders Velkommen.webp
    background, dark overlay, photo strip, title card (not a link), nav strip
    (inside the hero, below the card), and bottom-anchored text block (eyebrow
    "Velkommen" + headline). CSS class: `.hero-header` (overflow: hidden).
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

1. **Hero** — one continuous hero section containing three layers top-to-bottom:
   a. TitleCard + photo strip (card centered at top, strip behind it)
   b. Nav strip (`<SiteNav />` rendered inside `<header className="hero-header">`,
      directly below the card — hero bg/overlay extend behind it). `.site-nav`
      has `z-index: 20` to stay above the photo strip layer (z-index 5).
   c. Bottom-anchored text block (`.hero-text-block`, absolute bottom:0):
      eyebrow "Velkommen" (`.eyebrow mb-4`) + headline "Norge skal krysses fra
      nord til sør <span class='hero-headline-accent'>— veien er målet.</span>"
      (`hero-headline` clamp(3rem, 8vw, 4.5rem) Fraunces). No subtext paragraph.
      No buttons. Text is **left-aligned**. The em-dash and second clause both
      render in orange-400 via the accent span. Documented exception to the
      "no accent on titles" rule — the accent span is explicitly part of the
      design here.
2. **Om turen** — **single column, full-width.** No eyebrow or headline
   (both removed). Padding-top: 2rem (32px); bottom padding unchanged (56px /
   96px on md). INGRESS paragraph at 1.5rem using **font-serif (Fraunces)**,
   followed by VELKOMMEN body paragraphs at 1.125rem (font-sans). INGRESS
   starts: "Høsten 2008 setter to glade vandrere..." — the two opening sentences
   ("Da er det endelig avgjort..." and "Norge skal krysses...") were removed
   as redundant with the hero headline. The last sentence of VELKOMMEN[2]
   ("Vi legger bort vekkerklokka…tørke sokker.") is split into a standalone
   FEATURED paragraph rendered **in its original position** (between paragraphs
   2 and 3) with ingress styling (font-serif, 1.5rem, slate-200) — same
   `space-y-5` spacing as surrounding paragraphs. Closes with the
   handwritten signature image (`public/images/diverse/Signatur.webp`,
   285×69 WebP with transparent background; no blend mode needed) **right-aligned**
   (flex justify-end). No text attribution — the image IS the attribution.
3. **Ruta section** — id="ruta". Eyebrow "Ruta" + h2 "15 etapper,
   <span orange-400>Nordkapp til Lindesnes.</span>" (orange accent on the
   "Nordkapp til Lindesnes." portion of the h2 only — section h2s are not
   subject to the "inner-page h1s are fully white" rule) + short description
   (1.5rem / ingress size, full-width, no max-w constraint) + route-line SVG
   + 3 stats (2 500 km / 6 måneder / 15 etapper — NOT 4) + "Se hele ruta" button.
4. **Reisebrev** — id="reisebrev". Eyebrow "Reisebrev", section h2
   "Oppdateringer underveis". Full 3-column grid of all 6 reisebrev entries
   (1 col mobile, 2 col sm, 3 col lg). Each card: cover image (aspect-[4/3],
   hover:scale-105 via .reisebrev-cover-img), date label, then h3 with
   zero-padded entry number (muted, font-sans font-normal) + title text
   (font-serif, text-xl). No excerpt, no "Les mer" link, no "Alle reisebrev"
   button — all entries shown directly. Each card is a single `<a>` block link
   pointing to `reisebrevN.html`. The old list page (reisebrev.html) is deleted.
5. **Sponsor logos** — own dedicated section, NOT inside the footer.
   Logo grid, all 20 real sponsors (see Content inventory). Logos sit
   directly on the dark background with `mix-blend-mode: screen`. Default:
   grayscale (`grayscale` Tailwind). Hover: full color (`group-hover:grayscale-0`) +
   scale-105. No opacity treatment — logos are fully opaque at all times.
   Section title h2/font-serif ("Sponsorer."). Description line below title
   uses `.section-description` class. Grid: 4 columns mobile, 5 columns md+
   (`grid-cols-4 md:grid-cols-5`). "Les mer om sponsorene" btn-outline below
   grid in a `<div className="mt-4">` wrapper (16px extra spacing above button,
   on top of the grid's mb-10). Links to `sponsorer.html`. `.sponsor-logo` GPU
   hint: `will-change: transform` (opacity removed since opacity no longer
   transitions). Note: 5 logos (Helsport, MX Sport, Skaidi Hotel, Femund
   Fjellstue, Umbukta Fjellstue) have non-black backgrounds — they show their
   original bg color via screen blend; acceptable, PNG conversion deferred.
6. **Footer** — two-part layout within `max-w-content` container:
   LEFT: "NORGE på LANGS" wordmark at `text-[1.125rem]` via `<Wordmark>` component
   (same font/accent/tracking as TitleCard but footer-sized). RIGHT: credit as a
   `<div>` with 3 separate `<p>` lines (no "|" separators), `text-slate-500
   text-[0.875rem] leading-snug`, right-aligned on desktop, centered mobile.
   Lines: "Turgåer & Ansvarlig redaktør: Marius Montarou" (Marius linked to
   norgepalangs-2009/omoss.html), "Webmaster: Arne S. Skeie", "NORGEpåLANGS © 2008/2009".
   Mobile: `flex-col items-center gap-4` (stacked centered). Desktop (sm+):
   `flex-row justify-between`. No eyebrow or subtitle from TitleCard — wordmark only.
   The `<Wordmark>` component is a named export from SiteHeader.jsx; import it from
   there to avoid drift between TitleCard and footer wordmark markup.
7. **Version switcher** — sits BELOW the footer (separate element), centered.
   Vertical padding: `32px 16px` (32px top/bottom — on-grid; was 20px). Applied
   identically on both sites.
   **Hover behavior (both sites):** Text-color-only hover — the inactive link
   text brightens to full white on hover. No background pill/tint on hover.
   **Implementation:** Base color AND transition MUST be in the `<style>` CSS rule
   (`.npls-link { color: ...; transition: color 0.15s; }`), NOT in the inline `style`
   attribute. Reason: inline `style` has higher CSS specificity than any class selector
   (including `:hover` pseudo-class), so `:hover` can never override an inline color.
   CSS: `.npls-link { color: X; transition: color 0.15s; } .npls-link:hover { color: Y; }`
   The inline `style` attribute on the `<a>` must NOT contain `color` or `transition`.
   03-modernized: `X = rgba(148,163,184,0.9)`, `Y = #f8fafc`.
   02-restored-static: `X = rgba(255,255,255,0.85)`, `Y = #ffffff`.
   The modernized site uses on-palette colors (differs from 02-restored-static):
   - Outer pill: `#1e293b` (slate-800)
   - Active side (Oppdatert nettside): bg `#f8fafc`, color `#0f172a`, fontWeight 500
   - Inactive link (Original nettside): color `rgba(148,163,184,0.9)` (slate-400)
   `02-restored-static` keeps: outer pill `rgba(0,0,0,0.9)`, active bg `#ffffff` /
   color `#1e1e1e`, inactive link `rgba(255,255,255,0.85)`. The two sites' switchers
   intentionally differ in palette — do not sync them back to match.

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
Base font size: 16px (1rem) on `body`. Hero headline: `clamp(3rem, 8vw, 4.5rem)`.

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

**Inner-page h1s are entirely white — no accent word.** All inner-page h1s are
plain `text-slate-50` with no `<span>` accent treatment. Exception: the
`.hero-headline` carries orange-400 on both the em-dash and second clause
("— veien er målet.") — documented design decision, not a violation. The
TitleCard wordmark (`NORGE <em>på</em> LANGS`) is a brand mark, not a title.
Section h2s on the homepage (e.g. #ruta, #siste-reisebrev) are unaffected.

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

**Homepage section ids:** hero, om-turen, ruta, reisebrev, sponsorer.

## Individual Reisebrev post pages

Each letter has its own static page: `reisebrev1.html` through `reisebrev6.html`.
The standalone list page (`reisebrev.html`) has been deleted — all 6 entries are now
presented directly in the homepage `#reisebrev` section.

**File structure (all in `03-modernized/`):**
- `src/data/reisebrev.js` — single source of truth for all letter data (etappe, title, date, img, excerpt, body paragraphs, kadaver table for entry 1). Both Home.jsx and ReisebrevPost.jsx import from here.
- `src/pages/reisebrevpost/ReisebrevPost.jsx` — shared post template (compact masthead, back link → homepage #reisebrev, eyebrow/h1/date, hero image, body text, kadaver table, prev/next nav, "Alle reisebrev" button → homepage #reisebrev).
- `src/pages/reisebrevN/main.jsx` (N=1..6) — minimal entry points rendering `<ReisebrevPost n={N} />`.
- `reisebrevN.html` (N=1..6) — HTML entry points at project root.

**All 6 pages registered in `vite.config.js` under `build.rollupOptions.input`.** (reisebrev.html removed.)

**Kadaver status table** appears only on entry 1 (Etappe 1), rendered as a CSS grid table with header row + 5 body rows (Føtter/Knær/Rygg/Skuldre/Moral × Marius/Emil).

**Linking:** Back link (top) and button (bottom) on each post page both link to
`${base}index.html#reisebrev`. Both are styled as `.btn-outline` pill buttons with
caption "← Tilbake til Reisebrev". The top link is wrapped in `<div className="mb-10">`.
Homepage grid card links each go to `reisebrev${n}.html`.

**Hash-scroll on homepage load:** `Home.jsx` runs a `useEffect` on mount that checks
`window.location.hash` and calls `el.scrollIntoView({ behavior: 'smooth' })` if a
matching element exists. Required because cross-page navigation (full page reload) does
not automatically scroll to the hash position — `scroll-behavior: smooth` only handles
same-page anchor clicks. This makes `index.html#reisebrev` actually land at the section.

## Sponsorer page

`sponsorer.html` is a dedicated inner page listing all sponsors with logos and verbatim
descriptions from `02-restored-static/sponsorer.html`. **Now the 5th primary nav item**
("Sponsorer"), and also reachable via the "Les mer om sponsorene" btn-outline on the
homepage sponsors section.

**File structure:**
- `src/pages/sponsorer/Sponsorer.jsx` — page component
- `src/pages/sponsorer/main.jsx` — entry point
- `sponsorer.html` — HTML shell at project root
- Registered in `vite.config.js` as `sponsorer: resolve(__dirname, 'sponsorer.html')`

**Content structure (all verbatim from 02-restored-static/sponsorer.html):**
- Intro paragraph: "Uten støtte fra våre sponsorer..." (original text)
- UTSTYR section (12 sponsors with logo + description): XXL, Janus, Sportsbua, Helsport,
  Cappelen Damm, Alfa, Åsnes, Fjellpulken, Rottefella, Amfibi, Adidas Eyewear, MX Sport.
- TJENESTER section (8 sponsors + Rui Fjellstoge): Skaidi Hotel, Breidablikk, Lundhøgda
  Camping, Femund Fjellstue, Umbukta Fjellstue, Jule Ferie & Fritid, Dokka Camping,
  Gudbrandsdal Hotell; plus Rui Fjellstoge (Haukeli) as a text-only entry (no logo in
  the 20-logo set).
- "Vi vil også rette en stor takk til" section: 26 personal helpers listed by name.
- Logos rendered with `mix-blend-mode: screen` (same as homepage). No grayscale on this
  page — logos shown at full color directly (they have enough context/description here).
- `SiteHeader variant="compact"` with no currentPage (not in nav, never active).

## Bottom sheet component

`src/components/BottomSheet.jsx` + `src/components/SheetContent.jsx`.
Single source of truth for bottom-sheet behavior site-wide — Utstyr, Om Oss,
and Reiserute all consume this same pair.

**Library: vaul 1.1.2** (`npm install vaul`). Chosen because:
- Purpose-built for bottom-sheet/drawer UX, ~15 KB gzipped.
- Wraps Radix Dialog: focus trap, `aria-modal`, and Escape-key dismiss come free.
- Handles snap-point geometry and drag-gesture math natively (no hand-rolled pointer math).
- Used by shadcn/ui; actively maintained; API stable at v1.

**Two-layer architecture:**

1. **BottomSheet** (`src/components/BottomSheet.jsx`) — mechanics only, generic children.
   - `snapPoints={[0.5, 1]}` — opens at 50% height ("peek"), drag up → 100%, drag down → dismiss.
   - Resets to 0.5 snap on every close so re-opening is consistent.
   - `Drawer.Overlay` dims page behind sheet; click to dismiss.
   - Body scroll lock while open (vaul built-in).
   - Focus trapped inside sheet; returns to trigger on close (Radix Dialog).
   - Escape key dismisses (Radix Dialog).
   - Visible drag-handle pill rendered as decorative `aria-hidden` div above content.
   - `env(safe-area-inset-bottom)` spacer prevents iPhone notch clipping.
   - `prefers-reduced-motion`: CSS in main.css targets `[data-vaul-drawer]` /
     `[data-vaul-overlay]` with `transition: none !important` when motion is reduced.
   - Props: `open`, `onOpenChange`, `ariaLabel` (string, default "Detaljer"), `children`.

2. **SheetContent** (`src/components/SheetContent.jsx`) — layout template for the interior.
   - Designed for the Utstyr / Om Oss / Reiserute use cases; all props optional except `title`.
   - **image** `string` — full-width hero image at top of sheet (h-48 / 192px, object-cover).
   - **title** `string | ReactNode` — Fraunces 1.5rem, slate-50.
   - **subtitle** `string` — accent line above title, `.eyebrow` class (orange-400, uppercase).
   - **body** `string | ReactNode` — prose text, Work Sans 1.125rem, slate-300, leading-normal.
   - **link** `{ href, label, external? }` — rendered as `.btn-outline` pill; `external` defaults
     to `true` (adds `target="_blank" rel="noopener noreferrer"`).
   - **gallery** `Array<string | { src, alt }>` — 3-column `aspect-[4/3]` thumbnail grid;
     omit or pass empty array to hide.
   - Spacing: px-6 / pt-5 / pb-8 (all on 4/8pt grid). subtitle → title: mb-3. title → body: mb-4.
     body → link/gallery: mt-6.

**Accessibility implemented:**
- `role="dialog"` + `aria-modal="true"` via Radix Dialog (vaul).
- `aria-label` on `Drawer.Content` (consumer supplies meaningful label via BottomSheet prop).
- Drag handle is `aria-hidden="true"` — decorative only.
- Focus trap + Escape key dismiss — Radix Dialog.
- Body scroll lock — vaul built-in.
- Touch targets: handle area is pt-3 + 4px pill + pb-2 = 24px clickable zone (above 44px min
  recommended for the handle area itself — drag interaction, not a tap target).
- `prefers-reduced-motion` CSS suppresses slide animation.

**Demo:** A temporary "Test BottomSheet" button is wired in `src/pages/utstyr/Utstyr.jsx`
(marked `// TEMP — remove when Utstyr wires BottomSheet for real`). Remove it when Utstyr is
properly wired in the next batch.

## Known open items / TO DO

All items below are **NOT YET STARTED** unless explicitly marked otherwise.
A future session (or fresh instance with no chat history) should treat everything
here as outstanding work, not shipped features.

- [ ] **Reiserute & Galleri full rebuild** — real Norway map with route overlay,
  per-etappe hover/click interaction, eventually animated SVG route.
  Explicitly deferred to last, after all other work is done.
- [ ] **Video gallery section** — to be added at the bottom of the Reiserute &
  Galleri page, sourced from `02-restored-static`'s video gallery tab.
- [x] **Shared bottom-sheet component** — DONE 2026-06-20: BottomSheet + SheetContent built.
  See "Bottom sheet component" section above. Demo wired in Utstyr (temporary).
  Consumers (Utstyr, Om Oss, Reiserute) still need to be wired in separately.
- [ ] **Utstyr page** — sub-task (b) still open:
  Items made clickable into bottom sheets showing image / description / external link.
  Sub-task (a) DONE: section-description split applied 2026-06-20.
- [ ] **Om Oss page** — color thumbnails with hover zoom (white border hidden in
  circular crop), two-column desktop layout, reduced mobile card padding, larger
  names, click-to-bottom-sheet instead of expand-in-place.
- [x] **Title card mobile eyebrow** — DONE 2026-06-20: "· Nordkapp → Lindesnes"
  hidden on mobile via `<span className="hidden sm:inline">`. Desktop unchanged.
- [x] **Main nav: add Sponsorer as a real nav item** — DONE 2026-06-20: 5th item
  added. Mobile font-size reduced from 14px to 12px (0.75rem) to fit 5 items.
- [x] **Sponsorer page: mobile logo alignment** — DONE 2026-06-20: logos now
  left-aligned on mobile via `justify-start sm:justify-center`.
- [x] **Reisebrev post pages** — DONE 2026-06-20: `.section-description` applied
  to first body paragraph. Long first paragraphs split at natural boundaries:
  entry 1 (after "teltplass"), entry 3 (after "Alt avhenger av været"),
  entry 6 (after "ikke noe problem"). Entries 2, 4, 5 not split (short enough).
- [x] **General: ingress / `.section-description` mobile scaling** — DONE 2026-06-20:
  `.section-description` now uses `clamp(1.25rem, calc(3.5vw + 0.5rem), 1.5rem)`.
  Serif ingress paragraphs in Home.jsx (INGRESS, FEATURED) also updated to same
  clamp as arbitrary Tailwind value `text-[clamp(1.25rem,calc(3.5vw+0.5rem),1.5rem)]`.
- [x] **Reiserute & Galleri page** — DONE 2026-06-20: `.section-description` applied
  to route summary paragraph; max-w-[640px] removed; color updated slate-300 → slate-400.
- [ ] **SEO optimization** — meta descriptions, og:image, title tags, sitemap
  (modernized site only).
- [ ] **Site security hardening** — review CSP headers, external link safety,
  and any other hardening applicable to a static GitHub Pages site.

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
- Reordered homepage: Hero → Om turen → Ruta → Siste reisebrev →
  Sponsor logos → Footer. (Pull-quote section added here; subsequently
  removed — see 2026-06-20 changelog.) Ruta section (stats + route
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
  (quote id subsequently removed — see 2026-06-20 changelog.)
- 2026-06-19: om-turen section redesigned — eyebrow and "Veien er målet."
  headline removed; single-column full-width layout; typed signature
  replaced with handwritten SignaturLiten.jpg (190×46, mix-blend-mode:
  screen). Image copied to public/images/diverse/.
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
  Resolved:
  A. `.hero-content { padding: 28px 1.5rem 0 }` → `24px 1.5rem 0`.
     Chose 24px (card moves up 4px). 1.5rem (24px) and 0 were already on grid.
  D. Version-switcher pill inner padding: `7px 18px` → `8px 18px` applied
     simultaneously in SiteFooter.jsx AND all 16 02-restored-static HTML pages.
     18px (horizontal) is on-grid ✓. Both sites now pixel-identical at 8px.
  Permanent exceptions (do not re-audit):
  B. `.strip-wrapper { height: 133px }` — off-grid. Derived from photo aspect
     ratios. Geometry, not a spacing decision. Leave as-is indefinitely.
     Note: `top` changes when card content/padding changes (formula:
     hero-content-padding-top + card-height/2). Current: 104px desktop,
     100px mobile. Not a permanent value but also not a spacing decision.
  C. `SIZE_BUCKETS` in SiteHeader.jsx — photo strip image dimensions (76, 58,
     90, 68, 106, 90, 102px) are intentionally off-grid. They create the
     organic size variety of a real scrapbook strip; snapping to the grid
     would produce uniform sizes and kill the aesthetic. Leave as-is indefinitely.
- 2026-06-20: Repo renamed norgepalangs-ny → norgepalangs. Vite base updated from
  /norgepalangs-ny/ to /norgepalangs/. Version-switcher added to SiteFooter pointing
  to arneskeie.github.io/norgepalangs-2009/ (restored site). Restored site repo renamed
  norgepalangs → norgepalangs-2009 simultaneously. All June 19-20 uncommitted work
  pushed in the same commit.
- 2026-06-20: TitleCard styling updated (applies to both hero and inner page variant):
  - Eyebrow line added above wordmark: "2008 — 2009 · Nordkapp → Lindesnes" using
    `.eyebrow` class (orange-400, uppercase, tracking-[0.2em], text-sm). `mb-2`.
  - Wordmark "NORGE på LANGS" reduced from `text-[2rem] sm:text-[3.5rem]` to
    `text-[2rem] sm:text-[3rem]` (desktop from 56px to 48px; mobile unchanged at 32px
    to prevent overflow at `white-space: nowrap`).
  - Subtitle "med Montarou & co" changed from `text-xs sm:text-sm` to `text-base
    leading-normal` (from 12/14px to 16px / lh 1.5).
  - `text-align: center` added to `.title-card` CSS — all content now centered.
- 2026-06-20: Homepage hero restructured. Nav moved inside `<header class="hero-header">`,
  between the title card and the bottom-anchored text block. Hero background image and
  overlay now visually span all three layers (card/strip → nav → text block). Removed:
  old `.hero-eyebrow` div (with accent-bar), `.hero-subtext` paragraph, `.hero-buttons`
  div, and the two buttons ("Les historien", "Se ruta"). Removed associated CSS:
  `.hero-eyebrow`, `.accent-bar`, `.hero-subtext`, `.hero-buttons`. New text block:
  eyebrow "Velkommen" + headline "Norge skal krysses fra nord til sør —
  <span>veien er målet.</span>" (accent span on the second clause — explicit exception
  to the no-accent-on-titles rule). No subtext. No buttons. Added `z-index: 20` to
  `.site-nav` to ensure it sits above the photo strip layer (z-index 5). HeroHeader
  now returns a single `<header>` element (no outer fragment needed).
- 2026-06-20: Om turen INGRESS trimmed — opening two sentences removed ("Da er det
  endelig avgjort at det blir langtur! Norge skal krysses fra nord til sør det
  kommende året!"). These repeated ideas now in the hero headline. INGRESS now
  starts: "Høsten 2008 setter to glade vandrere ut fra Nordkapp..." Verified against
  02-restored-static/index.html source before editing.
- 2026-06-20: TitleCard refinements:
  - Padding changed from `2rem 2.5rem` to `1.5rem 3rem` (taller→shorter, narrower→wider).
    Mobile override stays `1.25rem 1.5rem`.
  - `border-radius: 4px` added to `.title-card`.
  - Eyebrow font-size overridden via `.title-card .eyebrow { font-size: 0.75rem; line-height: 1rem }`
    (0.75rem = type scale floor; the `.eyebrow` class itself stays at text-sm site-wide).
  - Subtitle `leading-normal` removed — single-line element, line-height inherited at 1.5 from
    html preflight (same visual result, no redundant declaration).
- 2026-06-20: Photo strip centering recalculated after card padding/size changes:
  Desktop: card height = 24+16+8+48+8+24+24 = 152px → strip top = 24+76 = 100px (was 102px).
  Mobile: eyebrow wraps to 2 lines, card height = 20+32+8+32+8+24+20 = 144px →
  strip top = 24+72 = 96px (was 74px — the old value was stale, pre-eyebrow).
- 2026-06-20: Homepage/inner-page nav spacing unified. Root cause: when SiteNav was
  moved inside `<header class="hero-header">` in the previous task, the 24px spacing that
  `.inner-header { padding-bottom: 24px }` provided on inner pages was not replicated in
  the hero variant, giving HeroHeader only 8px (site-nav top padding) vs InnerHeader's
  32px (24px + 8px). Fix: moved the 24px to `.hero-content { padding-bottom: 24px }`,
  which is shared by both HeroHeader and InnerHeader. Removed `padding-bottom` from
  `.inner-header`. Both variants now have exactly 32px from card bottom to nav pill top.
- 2026-06-20: Pull-quote section (id="quote") removed entirely from the homepage.
  Not deferred or hidden — gone. The sentence "Vi legger bort vekkerklokka…
  tørke sokker." (last sentence of VELKOMMEN[2]) is rendered as a FEATURED
  paragraph with ingress styling (font-serif, 1.5rem) in its original position
  within the text flow (between paragraphs 2 and 3), not moved to the end.
- 2026-06-20: TitleCard subtitle restyled to match eyebrow treatment —
  `text-[0.75rem] leading-4 uppercase tracking-[0.2em]` (0.75rem font, 1rem lh).
  Color stays slate-400 (not orange-400). Eyebrow spacing increased: `mb-2` →
  `mb-4` (8px → 16px above title). Subtitle spacing increased: `mt-2` → `mt-4`
  (8px → 16px below title). Both are grid-compliant (16px).
- 2026-06-20: Photo strip centering recalculated after subtitle/spacing changes:
  Desktop: card height = 24+16+16+48+16+16+24 = 160px → strip top = 24+80 = 104px
  (was 100px). Mobile: card height = 20+32+16+32+16+16+20 = 152px →
  strip top = 24+76 = 100px (was 96px). [Mobile h1 subsequently reduced to
  1.75rem — see 2026-06-20 mobile TitleCard entry: strip top updated to 98px.]
- 2026-06-20: hero-header min-height reduced from max(75vh,480px) to max(65vh,480px).
- 2026-06-20: hero-headline max clamp reduced from 6rem to 4.5rem →
  `clamp(3rem, 8vw, 4.5rem)`. Em-dash moved into accent span:
  "— veien er målet." both orange-400. Text-align: center → left on
  `.hero-text-inner` (both desktop and mobile).
- 2026-06-20: Om turen section: padding-top changed from 56px (py-14) to 32px
  (pt-8 = 2rem); bottom padding unchanged. INGRESS paragraph changed from
  font-sans to font-serif (Fraunces). Signature image right-aligned
  (flex justify-end on wrapper div).
- 2026-06-20: Photo strip performance fix. Root cause: full-res strip images
  (675–1000px, 13MB total across 48 files) were being downloaded, decoded, and
  held as GPU textures at their native resolution despite being displayed at
  64–136px (SIZE_BUCKETS range). The CPU/GPU heat and animation degradation over
  time was thermal throttling from sustained GPU texture overhead — NOT a memory
  leak; the React component is clean (useMemo, no effects, no intervals).
  Fix applied (four changes):
  1. Resized copies of all 48 strip images created at 400px max dimension
     (maintaining aspect ratio) using sips. Saved to `public/strip-thumbs/`
     (separate from originals). Total: 13MB → 1.8MB (7× reduction). Largest
     file dropped from 840KB to 66KB.
     `public/strip/` (originals) remains the source for galleries and all
     other image references — untouched. `public/strip-thumbs/` is the
     canonical source for the photo strip in SiteHeader.jsx only.
  2. `will-change: transform` added to `.strip-track` — promotes the element
     to its own compositor layer before animation begins, so the GPU composites
     a pre-rasterized layer rather than repainting per frame.
  3. `contain: layout paint` added to `.strip-wrapper` — isolates the
     animation's layout and paint effects from the rest of the page.
  4. `decoding="async"` added to strip `<img>` elements — moves JPEG decode
     off the main thread.
- 2026-06-20: Signature image swapped — `SignaturLiten.jpg` (190×46, white bg,
  mix-blend-mode: screen) replaced with `Signatur.webp` (800×194 source,
  transparent bg, rendered at 285×69 — ~50% larger than original). No
  mix-blend-mode needed; the WebP transparency renders naturally against the
  dark section background with no white box/halo artifact. `SignaturLiten.jpg`
  remains in public/images/diverse/ but is no longer referenced anywhere.
- 2026-06-20: TitleCard mobile typography exception (permanent, mobile-only).
  On mobile (< 640px): eyebrow and subtitle scale down to 0.625rem (10px) —
  below the site-wide 0.75rem floor, which still applies everywhere else.
  h1 reduced from 2rem to 1.75rem to fit tighter at 375px while maintaining
  white-space: nowrap. Both changes in CSS/JSX mobile breakpoint; desktop
  (sm:) rules unchanged. Strip centering recalculated: mobile card height =
  20+32+16+28+16+16+20 = 148px → strip top = 24+74 = 98px (was 100px).
- 2026-06-20: Hero/nav overlap fix on iPhone 8 (375×667). Root cause:
  `.hero-text-block { position: absolute; bottom: 0 }` is not a flex child,
  so it floats outside normal flow. At min-height 480px with ~248px of
  in-flow content (hero-content + nav), the text block's height at 3rem
  headline on 375px exceeded the remaining ~232px gap, pushing it up into
  the nav zone. Fix: on mobile (< 640px), override to `position: relative;
  bottom: auto` — the block becomes a 3rd flex child after the nav. Added
  `padding-top: 32px` to `.hero-text-inner` on mobile (matching `pt-8` used
  on the om-turen section below, and the same approach as inner pages — normal
  flow, not absolute positioning). Desktop behavior (absolute bottom: 0)
  unchanged at sm and above.
- 2026-06-20: Foundational text, scroll, semantic-class, and GPU hints batch.
  1. scroll-behavior: smooth — added to `html {}` in @layer base. Used by
     future in-page anchor links (e.g. reisebrev → homepage section).
  2. text-wrap: balance — added globally via `h1, h2, h3 { text-wrap: balance }`
     in @layer base. Progressive enhancement; no-op on single-line headings.
     `.title-card h1 { white-space: nowrap }` already prevents balance from
     having any effect on the TitleCard wordmark.
  3. text-wrap: pretty — added via Tailwind `text-pretty` class to all
     long-form prose paragraph elements site-wide (INGRESS, VELKOMMEN, FEATURED,
     INTRO, NOTE, bio, etappe notes, excerpts, reisebrev post body). NOT applied
     to eyebrows, metadata, or short UI text.
  4. .section-description semantic class — established in @layer components.
     `@apply font-sans text-[1.5rem] leading-normal text-slate-400`. Applied to
     4 instances: Home #ruta, OmOss intro, Reisebrev intro, Utstyr intro.
     Reiserute INTRO (slate-300) excluded — different visual role.
  5. GPU acceleration on hover-animated images:
     - .sponsor-logo: `will-change: transform, opacity; transform: translateZ(0);
       backface-visibility: hidden` — applied to all 20 sponsor logo <img>
       elements (group-hover:scale-105 + opacity transition).
     - .reisebrev-cover-img: same properties except will-change: transform only
       (opacity doesn't transition) — applied to 6 reisebrev list cover images
       (hover:scale-105).
     - Photo strip images: NOT given per-image hints. `.strip-track { will-change:
       transform }` already handles the animated track as one compositor layer;
       per-image hints would create 36+ unnecessary additional layers.
- 2026-06-20: Version-switcher recolored for modernized site (03-modernized only).
  02-restored-static keeps its original rgba(0,0,0,0.9)/white switcher unchanged.
  New modernized-site colors: outer pill #1e293b (slate-800); active span bg #f8fafc /
  color #0f172a; inactive link rgba(148,163,184,0.9) (slate-400); hover tint
  rgba(251,146,60,0.10) (orange-400 10%). The two sites' switchers now intentionally
  differ and should not be synced back to match.
- 2026-06-20: Version-switcher hover refined on BOTH sites. Removed background-tint
  hover (rgba tint pill on hover) in favour of text-color-only hover: the inactive link
  brightens to full white (#ffffff on 02-restored-static, #f8fafc on 03-modernized).
  No background change on hover — cleaner, no extra "pill within pill" visual effect.
  Transition updated from `background 0.15s` to `color 0.15s`. Vertical padding
  increased from 20px to 32px top/bottom (on 4/8pt grid) on both sites — more
  breathing room. Applied to all 16 02-restored-static HTML pages and SiteFooter.jsx.
- 2026-06-20: Reisebrev homepage migration (03-modernized only). Deleted standalone
  reisebrev.html list page and its source files (src/pages/reisebrev/Reisebrev.jsx,
  main.jsx). Replaced the `#siste-reisebrev` section on the homepage with a full
  3-column grid (1/2/3 cols at mobile/sm/lg) showing all 6 entries. New section:
  id="reisebrev", h2 "Oppdateringer underveis". Cards show cover image
  (aspect-[4/3], hover:scale-105), date, and h3 with zero-padded entry number
  (muted, font-sans) + title (font-serif text-xl). No excerpt, no "Les mer",
  no button — all entries directly visible. Nav "Reisebrev" link updated from
  reisebrev.html → index.html#reisebrev (homepage anchor). Post page back-links
  and "Alle reisebrev" buttons both updated to index.html#reisebrev. Grep confirms
  zero remaining references to reisebrev.html in src/ or vite.config.js.
- 2026-06-20: Footer redesigned — two-part layout with wordmark left and credit right.
  `<Wordmark>` extracted as named export from SiteHeader.jsx (base styles: font-serif
  font-normal leading-none tracking-tight text-slate-50, orange <em> on "på"). TitleCard
  h1 refactored to `<Wordmark />` inside `<h1 className="leading-none text-[1.75rem]
  sm:text-[3rem]">` — leading-none kept on both h1 (stabilizes block strut) and Wordmark
  span (inline line-height). Footer: Wordmark at text-[1.125rem], credit text
  font-sans text-xs text-slate-600 right-aligned (sm+). Mobile: flex-col centered.
  Desktop (sm+): flex-row justify-between. Version switcher remains below footer.
- 2026-06-20: Version-switcher hover regression fixed on BOTH sites. Root cause: CSS
  specificity — inline `style` attributes have higher specificity than any class selector
  (including `:hover`). The previous batch put base `color` + `transition` in the inline
  style, which permanently won over the `.npls-link:hover` CSS rule, making hover states
  invisible. Fix: moved `color` and `transition` from inline `style` into the `<style>`
  CSS block as `.npls-link { ... }`. Inline `style` on the `<a>` no longer contains
  `color` or `transition`. Applied to SiteFooter.jsx and all 16 02-restored-static HTML pages.
- 2026-06-20: Reisebrev post page back-links restyled. Both the top "back" link and
  bottom "Alle reisebrev" button are now `.btn-outline` pill buttons with identical
  caption "← Tilbake til Reisebrev". Previously the top was a text-link style and bottom
  was already btn-outline with different text.
- 2026-06-20: Homepage hash-scroll-on-load added. `Home.jsx` now runs a `useEffect`
  on mount that checks `window.location.hash` and scrolls to the matching element via
  `scrollIntoView({ behavior: 'smooth' })`. Cross-page hash navigation (e.g. clicking
  "← Tilbake til Reisebrev" from a post page) now actually lands at the #reisebrev
  section instead of the top of the page. `scroll-behavior: smooth` only fires for
  same-page clicks; this useEffect handles the cross-page case.
- 2026-06-20: Sponsors section updated. Grayscale→color hover replaces opacity-70→100
  (logos now fully opaque at all times; filter: grayscale→none on hover instead).
  Description line upgraded from `text-xs text-slate-500` to `.section-description`
  class (matching Ruta and other sections). Grid: 3 mobile cols → 4 mobile cols
  (`grid-cols-4 md:grid-cols-5`). "Les mer om sponsorene" btn-outline added below grid,
  linking to sponsorer.html. `.sponsor-logo` will-change updated from
  `transform, opacity` to `transform` only (opacity no longer animates).
- 2026-06-20: New sponsorer.html inner page created. Content verbatim from
  02-restored-static/sponsorer.html: two-section layout (Utstyr / Tjenester), each
  sponsor shown with logo + name + description. Includes Rui Fjellstoge (Haukeli) as
  a text-only entry (no logo in the 20-logo set). Personal thank-you list of 26 names.
  Not in primary nav — only reachable via the homepage "Les mer om sponsorene" button.
  Build now 11 pages (was 10).
- 2026-06-20: Two new homepage sections added between Reisebrev and Sponsors.
  "Andre på tur" (id="andre-paa-tur"): eyebrow "Lenker", h2 "Andre på tur", 2-column
  text-link layout. Lenker (3) + NPL-Ekspedisjoner vi har møtt (4). All content
  verbatim from 02-restored-static/index.html sidebar. Links in slate-400 with
  hover:slate-100 transition, text-[1.125rem], target="_blank".
  "Presse" (id="presse"): eyebrow "Presse", h2 "I pressen.", 4-logo grid
  (grid-cols-2 md:grid-cols-4). Logos: arcticfemme.jpg, saltenposten.jpg,
  nordlys.png, gamme.png — copied from 02-restored-static/images/diverse/ to
  public/images/diverse/. mix-blend-mode: screen, opacity-60 default / opacity-100
  hover. URLs verbatim from 02-restored-static. Homepage section order renumbered:
  Sponsors now item 7, Footer item 8, Version switcher item 9.
- 2026-06-20: Sponsor section button spacing: added `<div className="mt-4">` wrapper
  around "Les mer om sponsorene" button — adds 16px (1rem, on-grid) above button
  beyond the grid's existing mb-10.
- 2026-06-20: `.section-description` max-width removed from all inner pages. OmOss
  had max-w-[560px], Utstyr and Sponsorer page both had max-w-[640px]. All now
  full content-column width (960px, constrained by max-w-content wrapper).
  CLAUDE.md section-description rule updated accordingly.
- 2026-06-20: Footer credit text restyled. Was: single `<p>` with `|` separators,
  text-xs (12px), text-slate-600. Now: `<div>` with 3 separate `<p>` lines (no `|`),
  text-[0.875rem] (14px), text-slate-500 (lighter), leading-snug. Lines:
  "Turgåer & Ansvarlig redaktør: Marius Montarou" / "Webmaster: Arne S. Skeie" /
  "NORGEpåLANGS © 2008/2009". Marius now linked to norgepalangs-2009/omoss.html
  (was plain text on the modernized site; the restored-site omoss page is the
  appropriate target since the link existed on the original 2009 site).
- 2026-06-20: Favicon added. White Norway silhouette on orange-400 (#fb923c) background.
  SVG source: simplemaps.com (free for commercial use;
  https://simplemaps.com/resources/svg-license). Silhouette is a simplified 15-point
  polygon approximation (not tracing the real SVG path data — at icon sizes, the actual
  coastal complexity is illegible; a geometric approximation reads better). Generated:
  favicon.svg (scalable, rx=14 rounded square bg), favicon-16x16.png, favicon-32x32.png,
  apple-touch-icon.png (180×180), favicon.ico (16/32/48 multi-res PNG-in-ICO).
  Rasterization: pure Python polygon fill with 8× supersampling (anti-aliasing) using
  only struct/zlib (no PIL/ImageMagick — not available in this environment).
  All 11 HTML entry points updated with 4 favicon `<link>` tags. Vite transforms
  `/favicon.svg` → `/norgepalangs/favicon.svg` at build time (base URL injection).
- 2026-06-20: "Andre på tur" (id="andre-paa-tur") and "Presse" (id="presse") sections
  removed from the homepage. Both were added in the same session but removed immediately
  after: every link in "Andre på tur" (Lenker + NPL-Ekspedisjoner) returned 404 or
  timed out on verification; every link in "Presse" was dead or flagged unsafe (arcticfemme.com
  specifically flagged as unsafe regardless of HTTP status). Sections were data-arrays
  + JSX only — removing them left no dangling CSS or shared imports.
  Press logo image files deleted from public/images/diverse/: arcticfemme.jpg,
  saltenposten.jpg, nordlys.png, gamme.png. Homepage section order renumbered:
  Sponsors back to item 5, Footer item 6, Version switcher item 7.
  Section ids updated: andre-paa-tur and presse removed.
- 2026-06-20: Sponsorer page — mobile layout fix. Each sponsor entry (SponsorRow component
  and the Rui Fjellstoge text-only entry) previously showed logo and text side-by-side on
  all screen widths, which was cramped on narrow mobile screens. Changed outer div from
  `flex` to `flex flex-col sm:flex-row` and logo container from `flex-none w-20` to
  `flex-none w-full sm:w-20`. Desktop (sm+) layout unchanged. No changes to Sponsorer.jsx
  content, description text, or sponsor URLs.
- 2026-06-20: favicon.ico regenerated from new Norway silhouette source files.
  apple-touch-icon.png, favicon-16x16.png, favicon-32x32.png, and favicon.svg were
  manually replaced in place with a professionally designed Adobe Illustrator SVG
  (115 lines, viewBox 0 0 180 180, orange-400 background, complex white Norway path).
  favicon.ico regenerated via pure Python (no PIL/ImageMagick available): reads
  favicon-16x16.png and favicon-32x32.png as raw PNG bytes; decodes 32x32 PNG to RGBA
  (struct/zlib, all 5 filter types); bilinear-scales to 48x48; re-encodes 48x48 as PNG;
  packs all three into a valid 3-image ICO container (PNG-in-ICO format, supported by
  all modern browsers). Result: 7120 bytes.
- 2026-06-20: Batch of 7 independent small fixes applied:
  1. TitleCard mobile eyebrow: "· Nordkapp → Lindesnes" now hidden on mobile (<640px)
     via `<span className="hidden sm:inline">` on the trailing text. Desktop unchanged.
     Eyebrow still wraps to 2 lines on mobile (just "2008 — 2009").
  2. Nav: Sponsorer added as 5th nav item (href: sponsorer.html). Mobile nav font-size
     reduced from 0.875rem (14px) to 0.75rem (12px, type-scale floor) to prevent
     cramping — 5 items at 14px on a 375px full-bleed strip left < 2px per gap.
     CLAUDE.md nav count updated from 4 to 5. Sponsorer page status changed from
     "not in nav" to "5th nav item."
  3. Reisebrev post pages: `.section-description` applied to body[0] in ReisebrevPost.jsx.
     Long first paragraphs split at natural sentence boundaries in reisebrev.js:
     entry 1 (split after "teltplass" — terrain difficulty vs. anxiety/resolution),
     entry 3 (split after "Alt avhenger av været" — route planning vs. daylight concerns),
     entry 6 (split after "ikke noe problem" — status recap vs. etappe description).
     Entries 2, 4, 5 not split (first paragraphs already short enough for ingress).
  4. Sponsorer page: mobile logo container changed from `justify-center` to
     `justify-start sm:justify-center`. Applies to all SponsorRow instances and
     the Rui Fjellstoge text-only entry. Desktop (sm+) alignment unchanged.
  5. Utstyr intro split: INTRO renamed to INTRO_DESC (first 3 sentences — the
     section-description) + new INTRO_BODY (rest). INTRO_BODY rendered as normal
     prose (`font-sans text-[1.125rem] text-slate-300`) below the section-description.
  6. `.section-description` font-size changed from fixed `text-[1.5rem]` to
     `clamp(1.25rem, calc(3.5vw + 0.5rem), 1.5rem)` in main.css — scales from
     20px (≤320px) to 24px (≥457px). Serif ingress equivalents in Home.jsx (INGRESS
     and FEATURED paragraphs) updated to the same clamp via Tailwind arbitrary value
     `text-[clamp(1.25rem,calc(3.5vw+0.5rem),1.5rem)]`. These stay font-serif/slate-200
     and cannot adopt the class, so the clamp is applied inline.
  7. Reiserute INTRO: class changed from inline `font-sans text-[1.5rem] text-slate-300
     leading-normal max-w-[640px]` to `.section-description`. Color shifts from
     slate-300 → slate-400; max-w-[640px] removed (full content-column width).
     CLAUDE.md updated: section-description "NOT applied to Reiserute INTRO" rule
     reversed.
- 2026-06-20: Shared bottom-sheet component built (vaul 1.1.2).
  Two files: `src/components/BottomSheet.jsx` (mechanics wrapper) +
  `src/components/SheetContent.jsx` (layout template).
  Library choice: vaul over hand-rolling — handles snap-point geometry and drag
  gestures natively; wraps Radix Dialog for focus trap + aria-modal + Escape key.
  Architecture: BottomSheet is generic (any children), SheetContent provides the
  shared layout used by all three consumers (image / title / subtitle / body / link /
  gallery). snapPoints={[0.5, 1]}: opens at 50% height (peek), drag up → full,
  drag down → dismiss. Resets to peek on every close. prefers-reduced-motion CSS
  added to main.css targeting [data-vaul-drawer] and [data-vaul-overlay].
  env(safe-area-inset-bottom) spacer handles iPhone notch. Temporary demo button
  wired in Utstyr.jsx (marked TEMP — remove when Utstyr wires it for real next batch).
  Build: 117 modules (up from 60 — vaul + Radix UI deps). 11 pages clean.
