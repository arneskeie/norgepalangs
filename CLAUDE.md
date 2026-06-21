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

- **Nav (4 items):** Om oss · Reiserute & galleri · Utstyr · Sponsorer
  "Reisebrev" was removed from the nav (2026-06-21). The standalone reisebrev.html list
  page was deleted earlier and replaced by the homepage #reisebrev grid section, but the
  nav item was not removed at that time — now corrected. Reisebrev content is discoverable
  via the homepage.
  `NAV_LINKS` is exported from `SiteNav.jsx` and imported by `MobileNav.jsx` — single
  source of truth for both the desktop nav and the mobile overlay.
- **Desktop nav (≥ 768px):** Renders as a 912px-wide rounded pill. Items use
  `justify-content: center; gap: 3rem` (48px) — centered cluster, items sit close together
  rather than stretching across the full pill width. Gap was 2rem when nav had 5 items;
  increased to 3rem with 4 items to maintain ~53% cluster fill in the pill (vs. 47% at 2rem,
  which was too sparse). Font size: 16px (1rem). Letter-spacing: 0.02em. Sentence case.
  Active state: orange-400 2px `border-bottom` (border only, no fill).
  **This replaces the prior `space-evenly + width: 100%` layout** (see 2026-06-21 changelog).
- **Mobile nav (< 768px) — floating hamburger + full-screen overlay:**
  The inline nav bar is **completely hidden** on mobile (`display: none`). Two new elements
  implemented in `src/components/MobileNav.jsx`, rendered by `SiteHeader` default export:
  - **Floating trigger button:** `position: fixed; bottom: 24px; right: 24px; z-index: 100`.
    72px circle. **Closed state:** `background: #fb923c` (orange-400), `color: #020617` (slate-950 dark icon).
    **Open state** (`.mobile-nav-trigger--open` class applied when `open` is true): `background: #0f172a`
    (slate-900), `color: #f8fafc` (white icon). `transition: background 0.2s, color 0.2s`. Box shadow.
    Always visible while scrolling. Hamburger icon (28×28, strokeWidth 2.5) when closed, X when overlay is open.
    Tap target 72px ≥ 44px guideline. `aria-expanded`, `aria-haspopup="dialog"`. When overlay
    is open, `tabIndex={-1}` prevents keyboard Tab from landing on the trigger (focus stays inside overlay).
    **BottomSheet z-index interaction:** BottomSheet `Drawer.Overlay` is `z-[105]` and `Drawer.Content`
    is `z-[110]` — both above the trigger's z-100. When a sheet is open, the overlay dims the trigger
    and the sheet content covers it on mobile (full-width panel). The button is effectively hidden
    and inaccessible while a sheet is open.
  - **Full-screen overlay:** `position: fixed; inset: 0; z-index: 90; background: #020617`.
    Centered flex column. All 4 links at `font-size: 2rem` Work Sans, `font-weight: 500`,
    `color: rgba(148,163,184,0.80)` default, `#f8fafc` on hover, `#fb923c` when active. Tap
    target per link: ~56px (2rem line-height × 1.2 + 2 × 0.75rem padding).
  - **Accessibility:** `role="dialog" aria-modal="true" aria-label="Navigasjonsmeny"` on overlay.
    Focus moves to first nav link on open; focus returns to trigger on close (via `useEffect`
    cleanup). Escape key closes overlay (`document.addEventListener('keydown', …)`). Focus trap:
    `onKeyDown` on overlay div intercepts Tab/Shift+Tab and cycles within overlay focusables.
    Body scroll lock: `document.body.style.overflow = 'hidden'` while open, restored on close.
  - **Closing:** tap the X trigger button, press Escape, or tap any nav link (each link has
    `onClick={close}`, navigating away and dismissing the overlay simultaneously).
  - **Focus ring behavior — `:focus-visible` only (never plain `:focus`):**
    The trigger button uses `.mobile-nav-trigger:focus-visible` (not `:focus`) for the orange
    outline ring, so keyboard users see a ring but pointer/touch interactions do not. Chrome 86+
    applies `:focus-visible` to `<button>` clicks by policy — the trigger suppresses this via
    `onMouseDown={(e) => e.preventDefault()}`, which prevents focus acquisition on pointer events
    (the default action of mousedown = focus element) while leaving click, Tab, and Space/Enter
    unaffected. Overlay links use CSS `.mobile-nav-link:focus:not(:focus-visible) { outline:none }`
    to suppress browser-default rings on tap/click without touching keyboard-initiated `:focus-visible`.
    **Do NOT change `:focus-visible` to plain `:focus`, do NOT remove `onMouseDown.preventDefault()`,
    and do NOT add a blanket `outline: none` without the `:not(:focus-visible)` guard** — doing any of
    these would break keyboard accessibility.
  - **This REVERSES the 2026-06-19 hamburger-removal decision** — deliberate, see 2026-06-21
    changelog entry.
- **Nav two-layer structure (desktop):** `.nav-inner` is an invisible layout wrapper
  (`max-width: 960px; margin: 0 auto; padding: 0 1.5rem` — no background, no border-radius).
  Inside it sits `.nav-pill`, which gets the background and border-radius. Since `.nav-pill`
  fills `.nav-inner`'s content area, it naturally renders at 912px (960 − 2 × 24px), exactly
  matching content sections that use `max-w-content mx-auto px-6`.
  Do NOT put background or border-radius on `.nav-inner` — that would make the pill 960px.
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
   LEFT: `<Wordmark>` at `text-[1.125rem]` + a subtitle line "med Montarou & co" directly
   below it, grouped in a `<div>`. Subtitle: `font-sans font-medium text-[8px] leading-4
   uppercase tracking-[0.2em] text-slate-400 text-center sm:text-left` — no margin-top; sits
   flush below the wordmark (spacing comes entirely from `leading-4`'s line-height).
   Alignment is responsive: **centered on mobile** (matching the Wordmark's mobile centering
   via the parent's `flex-col items-center`), **left-aligned on desktop** (`sm:text-left`,
   matching its position as the footer's left column). Mirrors the right credit column's
   `text-center sm:text-right` pattern. **8px is an explicit one-off exception**
   — below both the 0.75rem site-wide floor and the 0.625rem TitleCard-mobile exception.
   Scoped to this single element only; the floor rule is unchanged everywhere else.
   RIGHT: credit as a `<div>` with 3 separate `<p>` lines (no "|" separators),
   `text-slate-500 text-[0.875rem] leading-snug`, right-aligned on desktop, centered mobile.
   Lines: "Turgåer & Ansvarlig redaktør: Marius Montarou" (Marius linked to
   norgepalangs-2009/omoss.html), "Webmaster: Arne S. Skeie", "NORGEpåLANGS © 2008/2009".
   Mobile: `flex-col items-center gap-4` (stacked centered). Desktop (sm+):
   `flex-row items-start justify-between` (top-aligned — both columns align to top of
   the flex row, not vertically centered against each other).
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
- Sportsbua → (no link) — dead (connection refused, re-verified 2026-06-21); logo rendered unlinked
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
- Femund Fjellstue → (no link) — dead (suspended account, re-verified 2026-06-21); logo rendered unlinked
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
   - **No snap points** — opens at `h-[93dvh]`, leaves ~7% of viewport visible at top edge.
     Drag handle + drag-down dismisses. No two-stage peek/expand.
   - Why no snap points: vaul's `snapPointsOffset` calculation (`window.innerHeight −
     snapPoint × window.innerHeight`) assumes the drawer fills the full viewport. When
     content is shorter than `window.innerHeight`, the resulting `translateY` overshoots
     and pushes the drawer off-screen. Without snap points, vaul uses a simple
     `slideFromBottom` animation (translateY(100%) → translateY(0)) that is height-
     independent and works on all viewport sizes and screen types (desktop AND mobile).
   - `h-[93dvh]` — explicit viewport-relative height ensures the drawer is always 93% of
     the dynamic viewport height regardless of content. `dvh` (dynamic viewport height)
     accounts for browser UI showing/hiding on mobile. This value is exempt from the
     4/8pt spacing grid (viewport-relative sizing, not a pixel spacing decision).
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
   - **layout** `'header' | 'profile'` — controls the arrangement; default `'header'`.
     - `'header'`: full-width image on top (h-48), then subtitle / title / meta / body stacked
       below. Best for high-res product images (Utstyr) and large landscape/portrait photos.
     - `'profile'`: for low-resolution thumbnail sources where stretching to full-width shows
       upscaling artifacts. Circular image on the left beside subtitle / title / meta stacked
       in a right column (desktop); on mobile the image is centered above all text (stacked layout).
       Image size: 80px mobile / 144px desktop. Body text (bio) below the header row, separated by
       a thin divider. Used by Om Oss; Reiserute per-etappe sheets may also use this if their
       thumbnail sources have the same resolution constraint.
   - **image** `string` — image src.
     In `'header'` layout: full-width strip (h-48 / 192px); styled by `imageMode`.
     In `'profile'` layout: circular; `imageMode` is ignored; always `object-cover` with
     `scale-[1.15]` to push baked-in white borders outside the circular clip.
     Size: **w-20 h-20 (80px) on mobile / w-36 h-36 (144px = 9rem) on desktop (sm+)**.
   - **imageHeight** `string` — (`'header'` layout only) one or more Tailwind height class(es)
     applied to the image container. Default: `'h-48'` (192px) — preserves existing behavior for
     all consumers that don't pass this prop. Pass multiple classes for responsive sizing, e.g.
     `'h-48 sm:h-64'`. Opt-in per consumer. Currently only Utstyr overrides this:
     `imageHeight="h-40 sm:h-64"` (160px = 10rem mobile / 256px = 16rem desktop). Ignored in `'profile'`
     layout. Do not change the default; any new consumer that needs a different size should pass
     the prop explicitly.
   - **fullBleedImage** `boolean` — (`'header'` layout only) Default `false`. When `false` (default),
     the image renders INSIDE the padded content container — padding applies above (4rem desktop),
     on both sides (4rem desktop), and the image flows naturally before the title/body. When `true`,
     the image renders OUTSIDE (above) the padded container, edge-to-edge (ignoring horizontal and
     top padding). Reserved for future consumers that specifically need a full-bleed image strip;
     no current consumer passes this prop. Ignored in `'profile'` layout.
   - **imageMode** `'contain' | 'cover'` — (`'header'` layout only) how the image fills the strip.
     `'contain'` (default): `object-contain` + px-6/py-4 padding, renders on the sheet's own
     `bg-slate-900` background — correct for transparent-background product PNGs (Utstyr). The
     previous `bg-slate-950` dark box has been removed (2026-06-21). `'cover'`: `object-cover`
     fills the strip edge-to-edge — correct for portrait/landscape photos.
   - **title** `string | ReactNode` — Fraunces 1.5rem, slate-50.
   - **subtitle** `string` — accent line above title, `.eyebrow` class (orange-400, uppercase).
   - **meta** `Array<{ label: string, value: string }>` — optional label/value pairs (e.g. Alder,
     Oppvokst i, Studerer). Entries with falsy value are silently skipped. In `'profile'` layout:
     rendered in the right column below the title. In `'header'` layout: rendered below the title,
     above body.
   - **body** `string | ReactNode` — prose text, Work Sans 1.125rem, slate-300, leading-normal.
   - **link** `{ href, label, external? }` — rendered as `.btn-outline` pill; `external` defaults
     to `true` (adds `target="_blank" rel="noopener noreferrer"`).
   - **gallery** `Array<string | { src, alt }>` — 3-column `aspect-[4/3]` thumbnail grid;
     omit or pass empty array to hide.
   - Spacing (header content area):
     Mobile: px-6 / pt-5 (20px) / pb-8 (32px).
     Desktop (sm+): px-16 (4rem) / pt-12 (3rem) / pb-24 (6rem).
     Image container (contain mode): no top padding inside container — `pb-4` only (16px bottom).
     The container's top padding comes from the enclosing div's pt-5/pt-12. mb-4 (16px) below image to title.
     subtitle → title: mb-3. title → meta/body: mb-4/mb-5. link/button margin-top: mt-10 (40px / 2.5rem).
   - Spacing (profile):
     Header row — mobile: px-6 pt-6 pb-4 gap-4. Desktop (sm+): px-16 pt-12 pb-4 gap-8 (32px between image and text).
     Body section — mobile: px-6 pt-5 pb-8. Desktop (sm+): px-16 pt-5 pb-24 (6rem).
     Divider: mx-6 sm:mx-16.
   - `MetaDl` and `BodyArea` extracted as internal sub-components (not exported) so both layouts
     share the same dl and body rendering logic without duplication.

**Accessibility implemented:**
- `role="dialog"` + `aria-modal="true"` via Radix Dialog (vaul).
- `aria-label` on `Drawer.Content` (consumer supplies meaningful label via BottomSheet prop).
- Drag handle is `aria-hidden="true"` — decorative only.
- Focus trap + Escape key dismiss — Radix Dialog.
- Body scroll lock — vaul built-in.
- Touch targets: handle area is pt-3 + 4px pill + pb-2 = 24px clickable zone (above 44px min
  recommended for the handle area itself — drag interaction, not a tap target).
- `prefers-reduced-motion` CSS suppresses slide animation.

**Max-width centering:** `Drawer.Content` stays `left:0 right:0` (full-viewport) because vaul
controls `transform` on that element for the `slideFromBottom` animation. Adding `translateX(-50%)`
there would be overwritten by vaul's animation. Instead, an inner wrapper `div` with
`mx-auto w-full max-w-[720px]` constrains the visible dark panel to **720px** centered — transparent
outer container, styled inner container. This inner wrapper carries `bg-slate-900 rounded-t-xl
overflow-hidden flex flex-col max-h-[93dvh]` (was 960px / `h-full` / no max-h — changed 2026-06-21).

**Height (auto-sizing + desktop floor):** The inner wrapper uses `max-h-[93dvh]` and
`flex flex-col` — short content sizes the panel down to fit naturally; long content hits the
93dvh cap and the scrollable `flex-1 overflow-y-auto` area handles internal scrolling. The
outer `Drawer.Content` has **no explicit height** (removed `h-[93dvh]`), so vaul's
`translateY(100%→0)` slides by the panel's actual height, not a fixed 93dvh. This eliminates
the large empty space below short-content sheets without reintroducing snap points.
**Desktop minimum height (sm+): `sm:min-h-[70vh]`** — the panel never shrinks below 70% of
viewport height on desktop. Short-content sheets (e.g. an Om Oss entry with minimal bio) still
render tall enough to feel substantive. Mobile auto-height behavior is unchanged (no min-h on
mobile). The 70vh min coexists correctly with the 93dvh max: short content → floor, medium
content → auto, long content → 93dvh ceiling with internal scroll.

**Desktop dismiss zones:** `Drawer.Content` (the full-viewport-width transparent outer container)
has an `onClick={() => onOpenChange(false)}` handler — clicking the transparent areas left or right
of the 720px panel now dismisses the sheet. The inner styled panel has `onClick={(e) =>
e.stopPropagation()}` to prevent content clicks from bubbling up. The above-panel area continues to
be handled by `Drawer.Overlay`. This pattern is safe with vaul drag gestures: a drag release fires
a `pointermove + pointerup`, not a `click`, so the dismiss handler is not triggered on drag.

**Desktop content padding:** All text/body content areas in SheetContent use:
- Left/right: `px-6 sm:px-16` (24px mobile / 64px = 4rem desktop)
- Top: `pt-5 sm:pt-12` (20px mobile / 48px = 3rem desktop) — `'header'` content area and
  `'profile'` header row
- Bottom: `pb-8 sm:pb-24` (32px mobile / 96px = 6rem desktop) — `'header'` content area and
  `'profile'` body section
In the `'header'` layout, the image renders INSIDE the padded container by default — padding
appears above and beside the image. The image container (contain mode) uses `pb-4` only (no top
padding — top space comes from the enclosing `pt-5/pt-12`). `mb-4` (16px) separates image from
title below. Pass `fullBleedImage={true}` to opt into full-bleed rendering (image above the
padded container, edge-to-edge) — no current consumer uses this.
The profile layout header row has `gap-4 sm:gap-8` — 16px mobile (stacked), 32px desktop (side-by-side).
The profile layout divider uses `mx-6 sm:mx-16`.

## Etappe rendering (Om Oss)

**Data shape:** `etapper` in the `PEOPLE` array is already an array of separate strings per person
(e.g. `['Etappe 11 del I: Elgå – Ringebu', 'Etappe 11 del II: Ringebu – Fagernes', 'Etappe 12: Fagernes – Geilo']`).
No data restructuring was needed — the data was already correct; only the rendering was updated.

**Two-tone color pattern (both cards AND sheet):**
Each etappe string is split at the first colon via `parseEtappe(str)`:
- Prefix (`"Etappe N[ del X]:"`) → `text-orange-400`
- Route (` "City – City"`) → `text-slate-500`

Strings without a colon (e.g. `"Hele turen"`, `"Oppvarmingstur i Finland"`) are returned fully as prefix
(all orange-400, no route span). Implemented as `EtappeLabel` + `parseEtappe` helper functions in
`OmOss.jsx` — shared by both card and sheet rendering to keep the split-and-style logic in one place.

**Card rendering:**
Each etappe in a separate `<p key={e} className="font-sans font-medium text-xs uppercase tracking-widest">`.
Multiple etappes stack with `space-y-1` (4px gap) on the wrapper div. `tracking-widest` = 0.1em.

**BottomSheet subtitle rendering:**
`subtitle` prop receives a ReactNode (not a string). The `.eyebrow` parent `<p>` in SheetContent
provides `font-sans font-medium text-sm uppercase text-orange-400 tracking-[0.2em]`. A wrapper
`<span className="tracking-[0.1em]">` overrides the inherited `tracking-[0.2em]` to 0.1em for
the Om Oss etappe context only — scoped override, does not affect `.eyebrow` globally or any other
consumer. Multiple etappes separated by `<br />` elements (keeps all content inline-valid inside `<p>`).
`React.Fragment key={e}` used for the `{i > 0 && <br />}` + `<EtappeLabel>` pair.

**Letter-spacing rationale:**
`.eyebrow` class uses `tracking-[0.2em]` (the site-wide eyebrow standard). For the Om Oss sheet's
etappe display, `0.1em` is used because: (1) `tracking-widest` on the cards is already `0.1em`
(Tailwind default), so 0.1em is consistent across both surfaces; (2) multiple etappe labels at 0.2em
read too wide for a multi-line compact label stack. The `.eyebrow` class is unchanged — override is
scoped to the subtitle prop ReactNode only.

## Video gallery (Reiserute & Galleri page)

Added as the last section of `src/pages/reiserute/Reiserute.jsx`, below the
Vår-etapper accordion, visually separated with `mt-20 pt-16 border-t border-white/[.06]`.

**Source:** Verbatim from `02-restored-static/videogalleri.html` — same 6 videos
and same order as the original table. Video IDs and titles are as-recovered; do not
change or reorder without verifying against the original source.

**Videos (verbatim from source):**
| ID            | Title                         | Subtitle                              |
|---------------|-------------------------------|---------------------------------------|
| 5An_8LozHB0   | Fjernsynskjøkkenet, Episode 1 | Idag: hjemmelaget brød                |
| ez5pVtzbmIg   | Ronny og storørreten          | Kilosørret på kroken                  |
| WmM8az1Ql14   | Fjernsynskjøkkenet, Episode 2 | Idag: pannekaker og camp-utsikt       |
| K7v6iB05Ofw   | Kampen med Storgjedda         | Montarou drar i land et smakfullt udyr|
| lkf7TvXuDIU   | Nestenkanovelt                | Farlig nær katastrofe                 |
| 3JrKnijl7wA   | Status dag 7                  | Truls presenterer ukesrapport         |

**Layout:**
- Section heading: eyebrow "Video" + h2 "Videogalleri" (`text-[2rem] md:text-[2.5rem]`)
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with `gap-6`
- Each video: wrapper `relative w-full aspect-video overflow-hidden rounded` with `<iframe>` inside as `absolute inset-0 w-full h-full`
- `loading="lazy"` on all iframes; `allowFullScreen`; `title` set to video title for accessibility
- No thumbnail overlay or play-button chrome — standard YouTube embed UI

## SEO metadata

All 11 HTML entry points have been updated with the same tag set:

**Per-page `<head>` additions:**
- `<meta name="description">` — specific to each page, grounded in real content
- `<meta property="og:title">` — same as or slight variation on the `<title>` tag
- `<meta property="og:description">` — same as `name="description"`
- `<meta property="og:type" content="website">` — all pages are `website` type
- `<meta property="og:url">` — full absolute canonical URL
- `<meta property="og:image">` — absolute URL to a real image (see below)
- `<link rel="canonical">` — same full absolute URL as og:url

**Important note on URL handling:** Vite's base URL injection (`/norgepalangs/`) only
transforms `href="/"` and `src="/"` attributes — NOT `content=""` in meta tags. All
canonical and og: URLs are therefore hardcoded as full absolute
`https://arneskeie.github.io/norgepalangs/` paths. Do not use root-relative paths
(`/norgepalangs/...`) in meta tag content attributes — they will NOT be prefixed at
build time and will render as broken relative URLs.

**og:image selection:**
- Homepage, Om Oss, Reiserute, Utstyr, Sponsorer: `images/Velkommen.webp`
  (the hero background image at `public/images/Velkommen.webp`)
- Reisebrev 1–6: individual cover images (`images/reisebrev/Reisebrev0N02.jpg`),
  matching the highest-res image selected for each entry

**Reisebrev title improvements:** HTML shell titles updated from "Reisebrev N — Norge På Langs"
to include the actual etappe info, e.g. "Etappe 1: Nordkapp – Skaidi — Norge På Langs".
These are static strings in the HTML shells (React doesn't set document.title at runtime).

**sitemap.xml:** Created at `public/sitemap.xml` — served at `/norgepalangs/sitemap.xml`
in production. Lists all 11 pages with lastmod 2026-06-21 and sensible priority values
(homepage 1.0; main inner pages 0.8; content pages 0.7; Sponsorer 0.6).

**robots.txt:** Created at `public/robots.txt` — served at `/norgepalangs/robots.txt`.
Contains `User-agent: * / Allow: /` and a `Sitemap:` reference to the absolute sitemap URL.
**Note:** On GitHub Pages project pages, `robots.txt` at a subdirectory path
(`/norgepalangs/robots.txt`) is non-standard — crawlers expect it at the domain root
(`/robots.txt`). This cannot be remedied on GitHub Pages project pages (no control over
the domain root). The sitemap URL in the HTML canonical tags compensates for
crawlers that discover the sitemap directly.

## Security hardening

**External link audit (rel="noopener noreferrer"):**
All external links in `src/` that use `target="_blank"` already have `rel="noopener noreferrer"`.
Locations confirmed:
- `Home.jsx` — all 20 sponsor logo links ✓ (via conditional `<a>` wrapper)
- `SheetContent.jsx` — the `link.external` prop defaults to true and conditionally sets both attributes ✓
- `Sponsorer.jsx` — all sponsor logo links ✓
No instances of bare `target="_blank"` without `rel="noopener noreferrer"` found.

**Sensitive data scan:**
- No `.env` file present in `03-modernized/`
- `grep` of all `src/` files for API keys, secrets, tokens, passwords, credentials: no results
- Only env var used anywhere is `import.meta.env.BASE_URL` (injected by Vite at build, not secret) ✓

**Dead/unsafe URL re-verification (2026-06-21):**
Both previously-flagged sponsor URLs re-verified live on 2026-06-21:
- `http://www.sportsbua.no/` — curl: 000 (connection refused). Confirmed dead.
- `http://www.femundfjellstue.no/` — curl: 200 but redirects to `/cgi-sys/suspendedpage.cgi`.
  Confirmed dead (suspended hosting account).
**Resolution:** Both sponsors unlinked in 03-modernized — `url: null` set in Home.jsx and
Sponsorer.jsx SPONSORS/TJENESTER arrays (same pattern as Jule Ferie & Fritid). Logos still
rendered; text/description retained on Sponsorer page. Content inventory updated accordingly.
02-restored-static: both were already unlinked in the static HTML output files from the
2026-06-20 audit; no changes needed there.

All other dead/unsafe URLs from the 02-restored-static audit were either:
- Already corrected in 03-modernized (alfasko.no → alfa.no; mx-sport.no subpath → root;
  fjellpulken.no → fjellpulken.com; rottefella.no → rottefella.com)
- Not present at all in 03-modernized (arcticfemme.com, sidebar links, norgepaakryssogtvers.net, etc.)

**Content Security Policy (CSP) — DEFERRED:**
Not implemented. Reasons:
1. GitHub Pages does not support custom HTTP response headers — CSP would need to be a
   `<meta http-equiv="Content-Security-Policy">` tag in the source HTML files.
2. Vite injects an inline `<script>` for React Fast Refresh in dev mode (`@vitejs/plugin-react`
   preamble). Adding `script-src 'self'` to the source HTML meta tag blocks this script
   in dev mode, breaking hot reload. Production builds do not contain the inline script,
   but the meta tag is in the same source HTML file used for both dev and prod.
3. vaul and React apply inline `style` attributes to DOM elements at runtime — requiring
   `'unsafe-inline'` in `style-src`, which significantly weakens that directive.
4. A meta-tag CSP cannot enforce `frame-ancestors` (ignored by spec) — one of the more
   useful directives for project pages.
If CSP is desired in a future session, the recommended approach is a post-build
Vite plugin that modifies the HTML output files (not the source files), allowing
the policy to be active in production only. Recommended policy for that scenario:
`default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; frame-src https://www.youtube.com; object-src 'none'`

## Known open items / TO DO

All items below are **NOT YET STARTED** unless explicitly marked otherwise.
A future session (or fresh instance with no chat history) should treat everything
here as outstanding work, not shipped features.

- [ ] **Reiserute & Galleri full rebuild** — real Norway map with route overlay,
  per-etappe hover/click interaction, eventually animated SVG route.
  Explicitly deferred to last, after all other work is done.
- [x] **Video gallery section** — DONE 2026-06-21. Added at the bottom of
  Reiserute.jsx, after the Vår-etapper accordion section. See "Video gallery"
  section below for full documentation.
- [x] **Shared bottom-sheet component** — DONE 2026-06-20: BottomSheet + SheetContent built.
  See "Bottom sheet component" section above.
  2026-06-21: BottomSheet updated with inner-wrapper max-width centering (960px on desktop,
  full-width on mobile). SheetContent updated with `imageMode` prop ('contain'/'cover').
- [x] **Utstyr page** — DONE 2026-06-21:
  (a) section-description split applied 2026-06-20.
  (b) All 58 items wired to BottomSheet + SheetContent. Data in `src/data/utstyr.js`.
  56 product images copied from 02-restored-static to `public/images/utstyr/`
  (2 renamed for URL safety: Magellan space-filename → magellanGPS.png,
  BEVERPROGRIP+svart.png → beverprogrip_svart.png). All items clickable.
  Fishing items (2) have no images (none existed in original source).
  Descriptions in Norwegian (2–4 sentences), links to current brand/product pages.
  Temp demo button and DEMO_ITEM const removed from Utstyr.jsx.
- [x] **Om Oss page** — DONE 2026-06-21:
  Color thumbnails (grayscale removed), hover zoom (baseline `scale-[1.15]` hides
  baked-in white border from 70×70px sources; `group-hover:scale-[1.21]` is the
  hover zoom ≈ 5% relative increase matching site-wide scale-105 convention).
  Circular thumbnail uses a wrapper div (`overflow-hidden rounded-full`) containing
  the img — the wrapper handles clipping so CSS `scale` transform on the img
  genuinely hides the border. Two-column grid on desktop (`md:grid-cols-2`, was
  `sm:grid-cols-2 lg:grid-cols-3`). Card padding: `p-5 md:p-6` (20px mobile /
  24px desktop, was `p-6` both). Name: `text-[1.25rem] md:text-[1.5rem]` (was
  `text-base`). Expand-in-place mechanic removed; clicking any card opens shared
  BottomSheet with SheetContent (`layout="profile"`, see Bottom sheet component
  section). Sheet: 80px circle photo + name/etappe subtitle/metadata right column,
  bio below. `activeId` state → `selectedPerson` state. Refined same day:
  initial `imageMode="cover"` (full-width 192px strip) replaced by `layout="profile"`
  (80px circle) because 70×70px source JPGs look poor at 2.7× upscale.
  **Etappe display (2026-06-21):** See "Etappe rendering" section below.
  `etapper` data is already an array of separate strings — no restructuring needed.
  Two-tone pattern on both cards and sheet (orange-400 prefix, slate-500 route).
  Sheet eyebrow letter-spacing scoped to 0.1em (vs 0.2em site-wide).
- [x] **Mobile nav redesign** — DONE 2026-06-21. Floating hamburger trigger (56px fixed circle,
  bottom-right) + full-screen overlay with all 5 links at 2rem. Desktop nav updated to centered
  gap-based cluster (gap: 2rem). Reverses the 2026-06-19 hamburger-removal decision. See Nav
  section and 2026-06-21 changelog for full spec.
- [ ] **Desktop nav refinement** — current desktop nav has too much spacing between items and
  could use visual refinement. Consider adding a drop-shadow on the homepage/hero variant
  specifically, for depth against the hero background image. Explicitly deferred: revisit once
  all other content work (Om Oss, Reiserute rebuild) is complete, since the nav's visual weight
  should be judged against the finished page, not a partially-built one.
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
- [x] **SEO optimization** — DONE 2026-06-21. meta descriptions, og: tags,
  canonical links, title improvements, sitemap.xml, robots.txt added to all
  11 pages. See "SEO metadata" section below for pattern documentation.
- [x] **Site security hardening** — DONE 2026-06-21 (CSP deferred — see note).
  External links audited ✓; sensitive data scan ✓; dead-URL equivalence check
  done (2 flags). See "Security hardening" section below.

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
- 2026-06-21: Utstyr page — BottomSheet fully wired. All 58 equipment items now clickable;
  clicking opens a BottomSheet with SheetContent showing product image, Norwegian description,
  and a link to the current brand/product page.
  Product data extracted to `src/data/utstyr.js` (new file) — 58 items across 7 categories,
  each with `{ name, image, body, link }`. Descriptions are 2–4 sentences in Norwegian (Bokmål),
  based on web-verified factual product information. Links point to current brand or product pages;
  all original product-specific URLs from 2009 are dead (confirmed via 02-restored-static dead-link
  audit). Key sourcing notes: Optimus Nova+ → Katadyn Group (acquired Optimus). Ajungilak products
  → Mammut (acquired Ajungilak/Fuglesangs Sønner in 2008). Bamse Extreme → Mammut/Ajungilak.
  Sarek termos → Hammarplast. Tallrikslåda → Edvardson Sweden. ALLY kano → Bergans (distributor).
  Fishing items (2) have no images (none existed in original source).
  56 product PNGs copied from `02-restored-static/images/utstyr/` to `public/images/utstyr/`.
  Two filenames sanitised on copy: "Magellan eXplorist 500LE Handheld GPS1-01.png"
  → `magellanGPS.png` (space in filename causes URL issues); "BEVERPROGRIP+svart.png"
  → `beverprogrip_svart.png` (+ is interpreted as space in URLs).
  CategorySection now renders items as `<button>` elements (was plain `<li>` text); clicking
  sets `selectedItem` state. Single `<BottomSheet>` at page root, keyed to `selectedItem`.
  Temp "Test BottomSheet" demo button and `DEMO_ITEM` const removed from Utstyr.jsx.
  Image path: `${import.meta.env.BASE_URL}images/utstyr/${item.image}` — handles /norgepalangs/
  base URL in production and / in dev.
- 2026-06-21: BottomSheet max-width centering. On desktop viewports wider than 960px, the sheet
  panel now centers at `max-w-content` (960px) while staying full-width on mobile. Implementation:
  inner wrapper div (`mx-auto w-full max-w-content`) inside `Drawer.Content`. Outer `Drawer.Content`
  stays `left:0 right:0` (full-viewport, transparent) because vaul controls `transform` there for
  the `slideFromBottom` animation — adding `translateX(-50%)` on the same element would be
  overwritten by vaul's animation keyframes. The styled inner div (bg, rounded corners, flex layout)
  slides up with the outer container while centering the visible panel horizontally.
- 2026-06-21: SheetContent `imageMode` prop added ('contain' | 'cover', default 'contain').
  'contain': dark `bg-slate-950` container, `object-contain` + px-6/py-4 padding — transparent-
  background product PNGs render cleanly against the dark sheet. 'cover': `object-cover` fills
  the container edge-to-edge — appropriate for portrait and landscape photographs (Om Oss, Reiserute).
  Default changed from 'cover' to 'contain' to match the primary Utstyr use case.
- 2026-06-21: SheetContent desktop padding and Utstyr image height.
  1. Desktop content padding fully specified: left/right 4rem (px-16), top 4rem (pt-16),
     bottom 6rem (pb-24). Applied via sm: breakpoint overrides — mobile values (pt-5/pb-8)
     unchanged. Applied to 'header' content area, 'profile' header row (top only), and
     'profile' body section (bottom only).
  2. SheetContent `imageHeight` prop added ('header' layout only). Default 'h-48' (192px)
     preserves behavior for all existing and future consumers. Utstyr now passes
     imageHeight="h-48 sm:h-64" — 192px mobile / 256px (16rem) desktop. Other consumers
     (Om Oss uses 'profile' layout, Reiserute not yet wired) are unaffected.
- 2026-06-21: BottomSheet + SheetContent overhaul batch.
  1. BottomSheet max-width reduced 960px → 720px (inner wrapper max-w-[720px]).
  2. BottomSheet height changed from fixed h-[93dvh] to auto-height with max-h-[93dvh]
     on the inner wrapper. Short content now sizes the panel to fit (no large empty space);
     long content still scrolls. Drawer.Content has no explicit height — vaul's
     translateY(100%→0) correctly slides by the panel's actual height in both cases.
  3. Desktop dismiss zones fixed: Drawer.Content gets onClick dismiss handler; inner wrapper
     gets stopPropagation. Clicks on the transparent left/right backdrop areas beside the 720px
     panel now correctly dismiss the sheet (previously those clicks were captured by Drawer.Content
     above Drawer.Overlay in z-order without triggering a dismiss).
  4. Desktop content padding increased to 4rem (px-16) on sm+ breakpoint, from 24px (px-6)
     on all sizes. Applied in SheetContent to all text/body areas in both 'header' and 'profile'
     layouts. Image area at top of 'header' layout unaffected.
  5. SheetContent 'contain' imageMode: removed bg-slate-950 dark box behind product images.
     Transparent PNGs now render on the sheet's own bg-slate-900 background instead.
  6. SheetContent 'profile' layout — mobile stacking: flex-col items-center on mobile
     (image centered above text), sm:flex-row sm:items-start on desktop (side-by-side).
  7. SheetContent 'profile' layout — desktop image size: w-36 h-36 (144px = 9rem) on sm+,
     up from flat w-20 h-20 (80px) at all sizes. Mobile stays 80px.
- 2026-06-21: Dead sponsor links removed from 03-modernized.
  Sportsbua (sportsbua.no) and Femund Fjellstue (femundfjellstue.no) confirmed dead on
  re-verification (curl 000 / suspendedpage.cgi). Both set to url: null in Home.jsx and
  Sponsorer.jsx. Logos still rendered unlinked. Content inventory and Security hardening
  sections updated. 02-restored-static was already unlinked from the June 20 audit.
- 2026-06-21: SheetContent 'profile' layout added. Problem: Om Oss profile photos
  are 70×70px source JPGs — rendering them as the default full-width h-48 strip
  (192px) meant 2.7× upscaling with obvious blurriness. Solution: new `layout` prop
  ('header' default, 'profile' new). 'profile' layout: circular image (w-20 / 80px,
  near-native resolution for 70px sources after border-crop scale), beside a right
  column with subtitle/title/meta; bio text below a thin divider. `imageMode` is
  irrelevant in 'profile' (always circular object-cover + scale-[1.15] border crop).
  New `meta` prop `Array<{label, value}>` extracted as first-class prop used in both
  layouts (right column in 'profile', below title in 'header'). Om Oss updated to
  `layout="profile"`, removed `imageMode="cover"`, passes `meta` with Alder/Oppvokst i/
  Studerer, body is now bio-only ReactNode via `PersonBio` component. `PersonSheetBody`
  (which mixed metadata + bio) removed. Reiserute per-etappe sheets may also use
  'profile' if their thumbnail sources have the same resolution constraint. Utstyr
  unaffected — uses default `layout="header"` implicitly.
- 2026-06-21: Video gallery section added to Reiserute.jsx. 6 YouTube embeds
  verbatim from 02-restored-static/videogalleri.html, same order. Section placed
  at the bottom of the page after Vår-etapper, separated by a border-t divider.
  Grid: 1/2/3 col at mobile/sm/lg. Each video: aspect-video responsive iframe
  with lazy loading, title and subtitle below. VIDEOS data const uses verbatim
  video IDs and Norwegian titles/subtitles from source.
- 2026-06-21: SEO metadata batch added to all 11 HTML entry points. Added:
  meta name="description", og:title/description/type/url/image, link canonical.
  og:image: Velkommen.webp for main pages; per-entry Reisebrev0N02.jpg for post
  pages. Reisebrev HTML shell titles updated to include actual etappe title (e.g.
  "Etappe 1: Nordkapp – Skaidi — Norge På Langs"). sitemap.xml and robots.txt
  created at public/ (served at /norgepalangs/ base). Key constraint: Vite does
  NOT inject base URL into meta content="" attributes — canonical and og: URLs
  must be full absolute https:// paths, not root-relative.
- 2026-06-21: Reisebrev removed from primary nav (missed cleanup). When the standalone
  reisebrev.html list page was deleted and its content moved to the homepage #reisebrev
  section, the nav item was not removed. It was pointing to `index.html#reisebrev` (anchor
  link, never showing as active) — that behavior was documented as acceptable but the item
  itself was incorrect. Removed from `NAV_LINKS` in SiteNav.jsx; propagates automatically
  to MobileNav.jsx (shared export). Nav is now 4 items: Om oss · Reiserute & galleri ·
  Utstyr · Sponsorer. Desktop gap increased 2rem → 3rem (48px) to maintain proportional
  cluster fill in the 912px pill after losing one item.
- 2026-06-21: Nav redesign — desktop gap-based + mobile hamburger (REVERSAL of 2026-06-19 decision).
  Desktop: `.nav-links` changed from `justify-content: space-evenly; width: 100%` to
  `justify-content: center; gap: 2rem` (32px). Items now form a centered cluster rather than
  stretching across the full 912px pill, eliminating the excessive spacing between short labels.
  Mobile: DELIBERATELY reverses the "hamburger removal" decision from 2026-06-19. Reason: with 5
  items and "Reiserute & galleri" as the longest label, the inline strip approach had already
  been reduced to 12px (type-scale floor) and was still cramped on narrow screens. No further
  reduction was possible, and abbreviated labels were undesirable. A floating hamburger trigger
  (56px fixed circle, bottom-right, z-index 100) + full-screen overlay (z-index 90, centered,
  2rem links) gives ample space and a comfortable tap target for all 5 items. Accessibility:
  focus trap, Escape key, body scroll lock, focus return to trigger on close. Implementation:
  `src/components/MobileNav.jsx` (new); `NAV_LINKS` exported from `SiteNav.jsx` for shared use.
  Hero mobile spacing updated: `.hero-text-inner` padding increased from 32px to 48px (3rem)
  top — nav bar's 64px vertical space is gone from the flow, so the gap between the title card
  and the "Velkommen" text block needed to be re-established. `.hero-text-block` stays
  `position: relative` on mobile (originally for nav overlap prevention; kept because at 480px
  min-height, absolute bottom:0 leaves too little clearance above the card).
- 2026-06-21: SheetContent 'header' layout image positioning fixed. Bug: the image was rendered
  OUTSIDE the padded content container, so `pt-5 sm:pt-16` landed between the image and the text
  (64px unwanted gap on desktop) while the image touched the very top of the sheet with no padding
  above it. Fix: image now renders INSIDE the padded container by default — `pt-5 sm:pt-16` applies
  above the image, `mb-4` (16px) separates image from title below. Added `fullBleedImage` boolean
  prop (default `false`) to opt into the old behavior (image full-bleed outside the padded container,
  edge-to-edge) — reserved for future consumers, no current consumer passes this prop.
- 2026-06-21: Spacing + nav button batch.
  1. SheetContent 'header' top padding: desktop reduced 4rem → 3rem (`sm:pt-16` → `sm:pt-12`).
     Left/right (4rem) and bottom (6rem) unchanged. Mobile top (20px) unchanged.
  2. SheetContent 'header' image container (contain mode): removed top padding — changed `py-4`
     to `pb-4`. Top breathing room comes from the enclosing container's pt-5/pt-12; only the bottom
     padding (16px) remains internal to the container.
  3. SheetContent BodyArea link/button: margin-top increased 1.5rem → 2.5rem (`mt-6` → `mt-10`, 40px).
  4. SheetContent 'profile' header row: desktop top padding reduced 4rem → 3rem (`sm:pt-16` → `sm:pt-12`).
     Added `sm:gap-8` — desktop gap between image and text column increases from 16px to 32px (2rem);
     mobile gap stays 16px. Keeps mobile stacking unchanged.
  5. Utstyr imageHeight mobile: reduced `h-48` → `h-40` (192px → 160px = 10rem). Desktop `sm:h-64`
     (256px = 16rem) unchanged. CLAUDE.md imageHeight prop description updated accordingly.
  6. BottomSheet z-index fix: `Drawer.Overlay` raised `z-40` → `z-[105]`, `Drawer.Content` raised
     `z-50` → `z-[110]`. Both are now above the mobile nav trigger (z-index: 100). When a sheet
     opens, the overlay dims the trigger and the sheet panel covers it on mobile. Previously the
     trigger floated above the open sheet.
  7. MobileNav trigger: size increased 56px → 72px. Closed state color inverted: background
     changed `#0f172a` → `#fb923c` (orange-400), icon color `#f8fafc` → `#020617` (slate-950).
     Open state (`.mobile-nav-trigger--open` class) keeps dark: `#0f172a` bg / `#f8fafc` icon.
     Transition extended: `background 0.15s` → `background 0.2s, color 0.2s`. Hover: closed
     state `#fdba74` (orange-300), open state `#1e293b` (slate-800). SVG size increased 22×22
     → 28×28 (viewBox and coordinates), strokeWidth 2 → 2.5.
- 2026-06-21: Security hardening audit. External links: all target="_blank" links
  in src/ already had rel="noopener noreferrer" — no changes needed. Sensitive
  data: no .env files, no API keys/secrets found in src/. Dead URL equivalence:
  two sponsor URLs in 03-modernized that were flagged dead in the 02-restored-static
  audit (sportsbua.no, femundfjellstue.no) kept live — both appear in the
  03-modernized content inventory as verified ✓ on June 19 (one day earlier);
  status likely fluctuating, not a sourcing error. CSP not implemented — Vite dev
  mode inline React preamble would be blocked by source-HTML meta tag CSP;
  documented in "Security hardening" section with recommended future approach.
- 2026-06-21: Om Oss page redesign — card grid + BottomSheet integration.
  Grayscale filter removed from thumbnail images (was applied always-on via className, lifted
  only on the active card — now always full color). Circular thumbnail cropping: wrapper div
  (`w-14 h-14 overflow-hidden rounded-full`) handles clipping; img inside at `scale-[1.15]`
  baseline pushes the 3–4px white border baked into the 70×70px source JPGs outside the circle;
  `group-hover:scale-[1.21]` adds hover zoom (≈ 5% relative increase on a 1.15 base, matching
  the scale-105 site convention on sponsors and reisebrev covers). `will-change-transform` on
  the img for GPU promotion. Grid changed from `sm:grid-cols-2 lg:grid-cols-3` to
  `md:grid-cols-2` (two columns on desktop, one on mobile — better for card width given bio
  content depth). Card padding: `p-5 md:p-6` (was flat `p-6` — reduces by 4px on mobile only).
  Name font-size: `text-[1.25rem] md:text-[1.5rem]` (was `text-base` / 16px).
  Expand-in-place mechanic (ring highlight, isActive prop, inline-expanding bio block) removed
  entirely. `activeId` state → `selectedPerson` state. Clicking any card opens shared
  BottomSheet with SheetContent: `imageMode="cover"` (portrait photos), title = person name,
  subtitle = etapper joined with " · " (orange-400 eyebrow via .eyebrow class), body =
  `<PersonSheetBody>` ReactNode (metadata dl + bio paragraphs). The ReactNode body approach
  avoids duplicating SheetContent's font/size/color wrapper classes on each paragraph.
- 2026-06-21: Mobile nav focus ring fix — pointer vs keyboard discrimination.
  Root cause (two separate issues): (1) Chrome 86+ applies :focus-visible to <button> clicks
  by policy, so the explicit orange .mobile-nav-trigger:focus-visible ring appeared after
  tapping the trigger. (2) <a> overlay links could show browser-default focus rings on tap
  in Firefox/Safari. The :focus-visible selector in the CSS was already correct (not plain :focus).
  Fix: (1) Added onMouseDown={(e) => e.preventDefault()} to the trigger <button> — prevents
  focus acquisition on pointer events (mousedown's default action), leaving click/Tab/Space/Enter
  unaffected. (2) Added .mobile-nav-link:focus:not(:focus-visible) { outline: none } in main.css
  — suppresses browser default rings for pointer-initiated link focus without touching
  keyboard :focus-visible. Keyboard users: Tab to button still shows orange ring; Tab to
  overlay links still shows browser default focus indicator. Pointer users: no ring after
  tap/click on either element.
- 2026-06-21: Om Oss etappe display — multi-line, two-tone, scoped letter-spacing.
  Previously: etapper joined as a single " · " string in the BottomSheet subtitle (one run-on line);
  cards showed all etappe text in flat orange-400. Updated:
  1. Multi-line: each etappe now renders on its own line. Cards: each etappe in its own `<p>` (was
     already the case but now DRY via shared helper). Sheet: `<br />` separators between etappes
     inside a single `<span>` wrapper (inline-valid inside the `.eyebrow` `<p>`).
  2. Two-tone color: `parseEtappe(str)` splits at first colon → prefix `"Etappe N[ del X]:"` in
     orange-400, route `" City – City"` in slate-500. Strings without a colon (e.g. "Hele turen",
     "Oppvarmingstur i Finland") render fully in orange-400. Applied in both cards and sheet.
  3. Letter-spacing override on sheet: `.eyebrow` class sets `tracking-[0.2em]` site-wide; the Om Oss
     sheet subtitle overrides to `tracking-[0.1em]` via a wrapper `<span className="tracking-[0.1em]">`
     passed as a ReactNode to the `subtitle` prop. Scoped to this element only — `.eyebrow` unchanged.
     Cards use `tracking-widest` (Tailwind = 0.1em) — consistent with the sheet override.
  4. Shared helpers: `parseEtappe(str)` and `EtappeLabel({ text })` in OmOss.jsx eliminate
     duplication of the colon-split and two-tone rendering logic across card and sheet.
  5. Data was already correct (arrays, not concatenated strings) — no data changes needed.
- 2026-06-21: Footer — top alignment + wordmark subtitle.
  1. Desktop alignment changed from `sm:items-center` → `sm:items-start`. Both the wordmark
     column (left) and credit text column (right) now align to the top of the footer flex row
     instead of vertically centering against each other. Especially important now that the
     left column is taller due to the subtitle line.
  2. "med Montarou & co" subtitle added below the wordmark. Styled matching the TitleCard
     subtitle treatment (Work Sans, font-medium, uppercase, tracking-[0.2em], slate-400) but
     left-aligned and at `font-size: 8px` (0.5rem). 8px is an explicit one-off exception —
     below both the 0.75rem site-wide floor and the 0.625rem TitleCard-mobile exception.
     Scoped to this single footer element only. No margin-top — sits flush below wordmark.
     `leading-4` matches TitleCard subtitle treatment. Wordmark + subtitle wrapped in a `<div>`.
     (`mt-1` removed in subsequent fix — subtitle now flush against wordmark.)
- 2026-06-21: BottomSheet desktop minimum height added.
  Added `sm:min-h-[70vh]` to the inner wrapper div. On desktop (≥640px), the panel never
  shrinks below 70% of viewport height — short-content sheets (e.g. Om Oss entry with a
  brief bio) now render tall rather than cramped. Mobile auto-height behavior unchanged (no
  min-h on mobile). The 70vh min coexists correctly with the existing `max-h-[93dvh]` ceiling:
  short content → 70vh floor, medium content → auto-height, long content → 93dvh cap with
  internal scrolling via `flex-1 overflow-y-auto`. vaul's `translateY(100%→0)` animation
  still works correctly — it slides by the panel's actual height (now at least 70vh on desktop).
- 2026-06-20: BottomSheet bug fixes — desktop non-render + mobile too-short height.
  Bug 1 (desktop): vaul's snap-point offset math (`window.innerHeight - snapPoint ×
  window.innerHeight`) assumes the drawer is full-viewport-height tall. When content is
  shorter (e.g. ~300px for the demo entry), applying `translateY(offset_px)` where
  `offset_px = 0.5 × 800px = 400px` onto a 300px drawer at `position:fixed;bottom:0`
  pushes the entire element below the fold. On mobile the content happened to fill more
  of the narrow viewport, leaving a partial sliver visible; on desktop wider viewports
  the same content filled less and disappeared entirely.
  Bug 2 (height): Initial snap=0.5 opened at 50vh which required user to drag up before
  seeing most content.
  Fix for both: removed snap points entirely. Without snapPoints, vaul uses the simpler
  `slideFromBottom` CSS animation (translateY(100%) → translateY(0)) which is completely
  height-independent. Added `h-[93dvh]` to Drawer.Content — explicit near-full height,
  7% gap at top, `dvh` accounts for mobile browser UI. The snapshot/animation approach
  is now the same on desktop and mobile. `useState(snap)` and `useEffect` removed.
