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
  - `.card-title` — `font-serif font-medium` with `font-size: 1.5rem; line-height: 1.25`
    (`leading-tight`). The primary title style for named items on cards, accordion rows,
    list entries, and sheet headers — wherever an item's identity label (name, title,
    category) is the focal point of a card-like layout. Per-instance color and spacing
    stay in JSX. Applied to: Home #reisebrev card h3 (post titles), OmOss card h3
    (person names), SheetContent h3 in both 'profile' and 'header' layouts (added
    `font-medium` — previously only `font-serif`), Reiserute timeline EtappeContent h3
    (etappe titles — increased from 1.125rem to 1.5rem), Galleri GalleriSection label p
    (section headings — changed from `.eyebrow` to `.card-title`), Utstyr CategorySection
    accordion title span (was inline `font-serif font-medium text-[1.5rem]`), Sponsorer
    SponsorRow h3 and Rui Fjellstoge h3 (increased from 1.25rem/text-xl to 1.5rem).
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

- **Nav (5 items):** Om oss · Reiserute · Galleri · Utstyr · Sponsorer
  Updated in Batch 5 (2026-06-21): "Reiserute & galleri" split into "Reiserute" and
  "Galleri" as separate nav items, now that they are separate pages.
  "Reisebrev" was removed from the nav (2026-06-21). The standalone reisebrev.html list
  page was deleted earlier and replaced by the homepage #reisebrev grid section, but the
  nav item was not removed at that time — now corrected. Reisebrev content is discoverable
  via the homepage.
  `NAV_LINKS` is exported from `SiteNav.jsx` and imported by `MobileNav.jsx` — single
  source of truth for both the desktop nav and the mobile overlay.
- **Desktop nav (≥ 768px):** Fully transparent — no pill background, no border-radius.
  Items use `justify-content: center; gap: 4rem` (64px).
  Font size: 1.125rem (18px). Letter-spacing: 0.02em. Sentence case.
  Default link color: `rgba(248, 250, 252, 0.75)` (75% white). Hover: `#f8fafc` (full white).
  Active state: `#f8fafc` + orange-400 2px `border-bottom` (border only, no fill).
  **This replaces the prior dark pill (#0f172a, 9999px radius, 2rem gap, 1rem, slate-400 links)** (see Batch 19 changelog).
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
    outline ring. The overlay links show their browser-default focus ring on `:focus-visible` only.
    The core problem: Chrome treats any programmatic `element.focus()` call as keyboard-like and
    shows `:focus-visible`, regardless of whether the interaction that triggered it was a pointer
    or keyboard event. Three separate mechanisms are required across the open AND close paths:
    1. **`onMouseDown={(e) => e.preventDefault()}`** on the trigger button — prevents the button
       itself from acquiring focus on mousedown (pointer click to open). Chrome 86+ applies
       `:focus-visible` to `<button>` clicks by policy; cancelling the mousedown default avoids
       this for the button's own ring. Does NOT help with the ring on the first link (see #2).
    2. **`openedByKeyboardRef`** (open path, first link ring) — when the overlay opens, the
       focus-management `useEffect` previously called `firstLink?.focus()` unconditionally,
       showing a blue ring on "Om oss" after every pointer-click open (programmatic `.focus()`
       triggers `:focus-visible` in Chrome). Fixed: `openedByKeyboardRef = useRef(false)` is set
       to `true` by `onKeyDown` on the trigger button when Enter or Space is pressed. The useEffect
       only calls `firstLink?.focus()` when `openedByKeyboardRef.current` is true, then resets
       it to false. Pointer opens (click/tap): `onKeyDown` never fires → ref stays false →
       no `focus()` call → no ring. Keyboard opens (Enter/Space on focused trigger): ref is true
       → first link focused with ring showing ✓ (correct — user is keyboard-navigating).
    3. **`closedByEscapeRef`** (close path, trigger button ring) — programmatic `.focus()` on
       the trigger in the useEffect cleanup also shows `:focus-visible`. The cleanup previously
       called `triggerRef.current?.focus()` unconditionally, showing the orange button ring after
       every pointer-triggered close. Fixed: `closedByEscapeRef = useRef(false)` is set by the
       Escape key handler. Cleanup only calls `triggerRef.current?.focus()` when it is true, then
       resets it. Pointer closes skip the `focus()` call entirely — `onMouseDown.preventDefault()`
       already prevented the button from receiving focus on click, so no ring appears.
    Overlay links also use CSS `.mobile-nav-link:focus:not(:focus-visible) { outline:none }` —
    suppresses browser-default rings on direct tap/click of links (pointer-initiated focus).
    Focus trap `handleOverlayKeyDown` calls `.focus()` programmatically during Tab-wrapping; Chrome
    correctly shows `:focus-visible` there because the last user interaction was a Tab keypress.
    **Do NOT change `:focus-visible` to plain `:focus`, do NOT remove `onMouseDown.preventDefault()`,
    do NOT remove the `openedByKeyboardRef` guard in the useEffect open path, do NOT remove the
    `closedByEscapeRef` guard in the useEffect close path, and do NOT add a blanket `outline: none`
    without the `:not(:focus-visible)` guard** — doing any of these would break keyboard
    accessibility or re-introduce pointer-click rings on the button or the first link.
  - **This REVERSES the 2026-06-19 hamburger-removal decision** — deliberate, see 2026-06-21
    changelog entry.
- **Photo strip height control:** Photo sizes are driven by `SIZE_BUCKETS` in `SiteHeader.jsx` —
  an array of 6 `{w, h}` objects picked randomly per-photo at mount via `useMemo`. These are
  applied as inline `style={{ width, height }}` on each `<img>`. Two sets exist:
  - **`SIZE_BUCKETS`** (default): min h=48, max h=102. Used by the hero strip (all viewports)
    and by inner-page strips on desktop (≥ 640px).
  - **`SMALL_SIZE_BUCKETS`** (compact mode): min h=22, max h=46. Scale factor 46/102 ≈ 0.451
    applied to both w and h, preserving the ~4:3 aspect ratio and variety ratio (46/22 ≈ 2.09
    vs 102/48 ≈ 2.13). Used only by inner-page strips on mobile (< 640px). Max h=46 → track
    height 62px < 64px wrapper (2px safety margin, no clipping).
  - **`compact` prop on `PhotoStrip`:** Passed as `compact={true}` from `InnerHeader`. The
    `useMemo` checks `compact && window.matchMedia('(max-width: 639px)').matches` at mount and
    picks the appropriate bucket set. The hero (`HeroHeader`) never passes `compact` — always
    uses `SIZE_BUCKETS`. Desktop inner pages (`compact=true` but media query false) also use
    `SIZE_BUCKETS`. Only mobile inner pages use `SMALL_SIZE_BUCKETS`.
  - **Do NOT re-audit `SIZE_BUCKETS` widths/heights against the 4/8pt grid** — confirmed
    exception (aesthetic scrapbook variety; not spacing values).
- **Nav two-layer structure (desktop):** `.nav-inner` is an invisible layout wrapper
  (`max-width: 960px; margin: 0 auto; padding: 0 1.5rem` — no background, no border-radius).
  Inside it sits `.nav-pill` — a transparent flex container (no background, no border-radius since Batch 19).
  Both are purely layout wrappers; no visible container around the nav links.
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
  - **Mobile-only TitleCard typography exception — HERO (permanent):** eyebrow and
    subtitle both drop to 0.625rem (10px) on mobile (< 640px). This is below
    the site-wide 0.75rem type-scale floor. Exception is TitleCard-only and
    mobile-only — the floor rule still applies everywhere else. h1 drops to
    1.75rem on mobile (vs 3rem desktop). All three values are set in the
    CSS/JSX mobile breakpoint, not changing the base/desktop rules.
    **Hero-only strip centering (mobile):** padding 20px, eyebrow 2 lines (32px),
    mb-4 16px, h1 28px, mt-4 16px, subtitle 16px, padding 20px → card height
    148px → strip top = 24 + 74 = 98px. (`.strip-wrapper { top: 98px }` in media query.)
  - **Mobile-only TitleCard compact variant — INNER PAGES ONLY:** The inner-page
    TitleCard uses significantly smaller sizing on mobile only (< 640px). Implemented
    via `.inner-header .title-card` overrides in the mobile media query — the hero
    variant (homepage) is completely unaffected. All values match the footer's
    wordmark/subtitle treatment exactly:
    - Card padding: **0.75rem 1.5rem** (12px top/bottom, 24px left/right)
    - Eyebrow "2008 — 2009": **8px** (same as footer subtitle), `line-height: 1rem`
      (inherited from `.title-card .eyebrow`), **margin-bottom: 0** (footer has no
      gap between wordmark and "med Montarou & co")
    - h1 "NORGE på LANGS": **1.125rem / 18px** (same as footer wordmark)
    - Subtitle "med Montarou & co": **8px**, `leading-4` = 16px, **margin-top: 0**
    - **Strip centering math:** padding 12px + eyebrow 16px (lh) + mb 0 + h1 18px
      (leading-none) + mt 0 + subtitle 16px (lh) + padding 12px = **card height 74px**.
      Strip top = hero-content padding-top(24) + card-height/2(37) = **61px**
      (`top` is the center of the strip due to `transform: translateY(-50%)`).
      Strip height: **64px** (Batch 19 — reduced from 122px; dark background shows
      above/below the strip, which is intentional). `top: 61px` unchanged.
    - CSS selector for subtitle override: `.inner-header .title-card p:last-child` —
      the subtitle `<p>` is always the last child of `.title-card`; specificity
      (0,3,1) wins over Tailwind's `mt-4` utility (0,1,0). The `<p>` eyebrow uses
      `.inner-header .title-card .eyebrow` (0,3,0) which wins over `mb-4` (0,1,0).
  - Card padding (desktop, both variants): **1.5rem 3rem** (unchanged).
  - Card padding (mobile hero): **1.25rem 1.5rem** (unchanged).
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
    was removed. Inner pages use the same full-size `.title-card` on desktop,
    but now have their own mobile-only compact sizing via `.inner-header` scoping.
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
   c. Bottom-anchored text block (`.hero-text-block`, `absolute bottom:0` desktop /
      `position:relative; margin-top:auto` mobile — flex pushes it to the hero's bottom):
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
   + 3 stats (2 500 km / 6 måneder / 15 etapper — NOT 4) + two buttons side-by-side
   in a `flex flex-wrap gap-4` wrapper: "Se hele ruta" (`.btn-solid`, primary CTA,
   links to reiserute.html) + "Møt vandrerne" (`.btn-outline`, links to omoss.html).
4. **Reisebrev** — id="reisebrev". Eyebrow "Reisebrev", section h2
   "Oppdateringer underveis". Full 3-column grid of all 6 reisebrev entries
   (1 col mobile, 2 col sm, 3 col lg). Each card: cover image (aspect-[4/3],
   hover:scale-105 via .reisebrev-cover-img), date label, then h3 with
   zero-padded entry number (muted, font-sans font-normal) + title text
   (`.card-title`). No excerpt, no "Les mer" link — all entries shown directly.
   Each card is a single `<a>` block link pointing to `reisebrevN.html`.
   Below the grid: "Se bildene →" (`.btn-outline`) in a `mt-10` wrapper, linking
   to `galleri.html`. The old list page (reisebrev.html) is deleted.
5. **Sponsor logos** — own dedicated section, NOT inside the footer.
   Logo grid, all 20 real sponsors (see Content inventory). Logos sit
   directly on the dark background with `mix-blend-mode: screen`. Default:
   grayscale (`grayscale` Tailwind). Hover: full color (`group-hover:grayscale-0`) +
   scale-105. No opacity treatment — logos are fully opaque at all times.
   Section title h2/font-serif ("Sponsorer" — no trailing period). Description line below title
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

## Galleri page — accordion behavior and heading structure

**Two-tier section headings** (added 2026-06-22):
- `eyebrow` (`.eyebrow` class, orange-400 uppercase): section label, e.g. "Etappe 1" or "Oppvarmingstur"
- `card-title` below it: the route, e.g. "Nordkapp – Skaidi" — sourced from `galleri.js` `route` field
  (all 16 sections now have a `route` field; values match ETAPPER `fra – til` in Reiserute.jsx exactly)
- Photo count + ↑/↓ toggle indicator in `text-xs text-slate-600` below

**Accordion behavior** (added 2026-06-22, collapsed-state redesigned 2026-06-22):
- All sections collapsed by default (empty Set state)
- **Multiple sections open simultaneously** — better for gallery browsing (no forced single-open)
- Toggle: clicking the entire header row (chevron + eyebrow + card-title + preview thumbs)
- Hash-based auto-expand: if `window.location.hash` matches a section `id` on page load, that
  section opens and scrolls into view (100ms delay allows React to render before scroll).
  Hash IDs: `oppvarmingstur`, `etappe1`–`etappe15`. Used by "Se bilder →" links on Reiserute.
  Section DOM: `<section id={section.id}>` (Galleri `id` field matches hash target directly).

**Collapsed-state header row** (redesigned 2026-06-22):
Single `<button>` spanning the full row. Internal layout is responsive:
- **Desktop (sm+):** `flex-row` — LEFT: `ChevronDown`/`ChevronUp` (lucide-react, 20px, orange-400) +
  eyebrow label + `.card-title` route + photo count; RIGHT: 3 small `w-16 h-16` (64px) square thumbnails.
- **Mobile:** `flex-col` — heading row on top (chevron + text), 3 thumbnails below with `mt-3`.
- Thumbnails are `<div>` wrappers (not `<button>`) — clicking them triggers the parent button's
  `onClick`, expanding the accordion. They do **not** open the lightbox.
- Thumbnails: `w-16 h-16 rounded overflow-hidden`, `object-cover`, `group-hover:scale-105` (200ms).
- `ChevronIcon` variable swaps between `ChevronUp` (open) and `ChevronDown` (closed) based on `isOpen`.
- Photo count line uses `text-xs text-slate-600` with `group-hover:text-slate-500` transition.
- 3 random images per section, selected from `section.images` on mount via `useMemo` (stable per page load).

**Accordion fade transitions** (updated 2026-06-22 Batch 9):
- **Both** the preview thumbs and the full grid are **always in the DOM** — no conditional rendering.
  Visibility is controlled via opacity + max-height CSS transitions, enabling smooth crossfades.
- **Preview thumbs** (collapsed-state thumbs): `transition-[opacity,max-height] duration-200`.
  - Open (accordion expanded): `max-h-0 sm:max-h-none opacity-0 pointer-events-none` — on mobile,
    `max-h-0 overflow-hidden` collapses the height to 0 so invisible thumbs don't leave a blank gap.
    On desktop (flex-row), `sm:max-h-none` keeps natural height; only opacity changes (invisible
    but in-flow — the heading's `flex-1` fills the available width, so no visible gap on desktop).
  - Closed: `max-h-20 sm:max-h-none opacity-100` — mobile shows full 80px (h-16 = 64px + pt-3 = 12px ≤ 80px).
  - Inner div uses `pt-3 sm:pt-0` instead of `mt-3 sm:mt-0` (padding vs margin) so `max-h-0
    overflow-hidden` clips the top spacing too — no gap left below the heading when collapsed.
- **Full photo grid**: `transition-[opacity,max-height] duration-300`.
  - Open: `opacity-100 max-h-[8000px]` (covers even very large sections with 100+ images).
  - Closed: `opacity-0 max-h-0 pointer-events-none` — height collapses, no blank space.
  - Grid buttons: `tabIndex={isOpen ? 0 : -1}` — hidden grid buttons are removed from tab order.
  - `aria-hidden={!isOpen}` — hidden grid excluded from screen readers.
- **prefers-reduced-motion**: `motion-reduce:transition-none` on both transitioning elements —
  Tailwind v3 built-in variant; applies `transition: none` when user has reduced motion enabled.
  Instant show/hide with no animation (CSS-only, no React state involved).
- `showFull` state and its `useEffect` removed — no longer needed; pure CSS handles all transitions.

## NorwayMap component

**File:** `src/components/NorwayMap.jsx`

Inline SVG component rendering an animated route-draw on the Norway silhouette.
Replaces the `<img src="norway-map.svg">` that was used in the static Batch 3 version.

**Why inline SVG (not `<img>`):** External SVG files referenced via `<img>` cannot be
targeted by CSS animations or JS — the SVG document is isolated. Inlining the paths
directly in the React component makes all child elements available to CSS keyframe
animations.

**Authoritative SVG sources (both kept):**
- `public/norway-map-rotated.svg` — **current source**. norway-map-route.svg rotated
  -20° (CCW) by coordinate transformation. Component silhouette, route, and waypoints
  are extracted from this file.
- `public/norway-map-route.svg` — **unrotated reference** (manually verified in
  Illustrator). Used as the input to generate norway-map-rotated.svg. Do not modify it.
- `public/norway-map.svg` — old file, no longer used by the component.

**Rotation approach (Batch 10e — two-step process):**
All coordinates in norway-map-route.svg were transformed by a -20° rotation matrix
(counter-clockwise visually in SVG's y-down coordinate system) around the original
viewBox centroid (64.8, 81.7). This was done in two steps:
1. Python script (`transform_path_d`) parsed every SVG path `d` attribute (handling M,
   Z, H, h, L, l, V, v, C, c, S, s, Q, q), converted all commands to absolute coordinates,
   rotated each coordinate around the centroid, and output absolute-command paths.
   Circles were rotated analytically. Result: `norway-map-rotated.svg` (no labels).
2. Labels re-applied at rotated dot positions (horizontal text — no rotation on text).
   Label side threshold: cx > viewBox_x + viewBox_w × 0.6 → LEFT, else RIGHT.
The `<text>` elements are NOT present in norway-map-rotated.svg — they are generated
in NorwayMap.jsx from the WAYPOINTS array (same approach as pre-rotation).

**viewBox:** `9.784 -17.297 103.026 202.210` (rotated bounding box + 8 SVG unit margin,
plus label-width buffer on right side). Note the negative y origin — Nordkapp's dot
ends up above the original zero line after rotation.

**Silhouette:** 97 paths (rotated coordinates, absolute commands). `class="st0"` →
replaced with `fill="#475569"` (slate-600) at generation time. Rendered via
`<g opacity="0.6" dangerouslySetInnerHTML={{ __html: SILHOUETTE }} />`.

**Route path:** Extracted from `<path class="st1">` and transformed. Now uses absolute
M/L/C/S/Q commands. Stored as `ROUTE` const. `pathLength="1"` normalises dasharray/
dashoffset to 0–1 regardless of actual path geometry.
Styled: `stroke="#fb923c"`, `strokeWidth="1.5"`, `strokeLinecap="round"`,
`strokeLinejoin="round"`, `fill="none"`.

**Route line styling:** `strokeOpacity={0.8}` (80% opacity — slightly muted).

**Animation — route draw:** `pathLength="1"`, CSS class `norway-map-route`,
keyframe `norway-draw-route`, **2.5s duration**, 0.15s initial delay, **`linear` easing**.
`linear` is required for correct dot sync: our delay formula assumes fraction-drawn =
elapsed/duration, which is only true with linear easing. ease-in-out caused early dots
to appear before the line (line slow-starts → less drawn than expected) and late dots
to appear after the line passed (line accelerated past the midpoint → more drawn than
expected). See Batch 10g changelog for root-cause detail.
(Duration halved from 5s→2.5s in Batch 15; all dot delays scaled ×0.5 proportionally.)

**Animation — waypoint dots and labels:**
- **17 waypoints**. Each `<g>` contains a `<circle className="norway-map-circle">` and
  a `<text className="norway-map-label">`. Both have `style={{ animationDelay: wp.delay }}`
  directly on the element (not on the group) so each can animate independently.
- **Appearance animation (white-flash):**
  - `norway-dot-circle-appear` (0.6s): 0% opacity 0 white → 20% opacity 1 white → 100% opacity 1 #fb923c
  - `norway-dot-label-appear` (0.6s): same pattern, final fill #94a3b8
  - The 20% "white phase" = 0.12s (pop to full-white), 80% = 0.48s color settle to final colors.
  - CSS `fill` in keyframes overrides SVG presentation `fill` attribute (higher cascade priority).
- **Delay formula (y-coordinate timing):** `delay = 0.15 + (cum_len_at_y_crossing / 194.9) × 2.5`
  - For each waypoint, find cumulative path length along the route where the stroke tip
    first reaches that waypoint's y-coordinate (moving southward). Since all route segments
    go southward in the rotated coordinate system, this equals the cumulative length at
    the segment endpoint matching that waypoint.
- Nordkapp and Lindesnes: `r=3.5`. All others: `r=2.5`.

**Labels styling:**
- Font-size: `4` SVG units (up from 3.5).
- `fontWeight={700}` — bold.
- `letterSpacing="0.1em"`.
- `textTransform="uppercase"`.
- Defined via constants `FONT_SIZE`, `LABEL_WEIGHT`, `LABEL_LETTER_SPACING` (single source).

**Waypoint coordinates (rotated -20° from norway-map-route.svg, viewBox 9.784 -17.297 103.026 202.210):**
Nordkapp cx=74.984 cy=-5.225 · Skaidi cx=74.124 cy=3.814 · Kautokeino cx=77.700 cy=20.071 ·
Abisko cx=63.642 cy=37.000 · Fauske cx=55.360 cy=54.594 · Lønsdal cx=55.669 cy=61.292 ·
Umbukta cx=54.928 cy=67.734 · Nordli cx=56.327 cy=89.998 · Hegra cx=49.266 cy=104.806 ·
Gressli cx=52.275 cy=111.905 · Elgå cx=56.157 cy=119.645 · Ringebu cx=50.767 cy=126.182 ·
Fagernes cx=44.781 cy=134.001 · Geilo cx=40.426 cy=141.333 · Haukeliseter cx=38.584 cy=152.645 ·
Ljosland cx=39.484 cy=163.598 · Lindesnes cx=41.460 cy=173.414

**Pre-rotation coords (original norway-map-route.svg, for reference):**
Nordkapp cx=104.1 cy=3.5 · Skaidi cx=100.2 cy=11.7 · Kautokeino cx=98.0 cy=28.2 ·
Abisko cx=79.0 cy=39.3 · Fauske cx=65.2 cy=53.0 · Lønsdal cx=63.2 cy=59.4 ·
Umbukta cx=60.3 cy=65.2 · Nordli cx=54.0 cy=86.6 · Hegra cx=42.3 cy=98.1 ·
Gressli cx=42.7 cy=105.8 · Elgå cx=43.7 cy=114.4 · Ringebu cx=36.4 cy=118.7 ·
Fagernes cx=28.1 cy=124.0 · Geilo cx=21.5 cy=129.4 · Haukeliseter cx=15.9 cy=139.4 ·
Ljosland cx=13.0 cy=150.0 · Lindesnes cx=11.5 cy=159.9 (viewBox 0 0 129.6 163.4)

**Delay table (y-coordinate timing, 2.5s route duration, 0.15s initial delay):**
Nordkapp 0.15s · Skaidi 0.267s · Kautokeino 0.48s · Abisko 0.762s · Fauske 1.012s ·
Lønsdal 1.097s · Umbukta 1.181s · Nordli 1.467s · Hegra 1.678s · Gressli 1.776s ·
Elgå 1.888s · Ringebu 1.997s · Fagernes 2.123s · Geilo 2.233s · Haukeliseter 2.38s ·
Ljosland 2.521s · Lindesnes 2.649s

**Labels implementation:**
- Font-size: `4` SVG units, `fontWeight={700}`. No uppercase, no letter-spacing (removed Batch 14).
  Constants: `FONT_SIZE = 4`, `LABEL_WEIGHT = 700`. (`LABEL_LETTER_SPACING` deleted in Batch 14.)
- Default fill: `#94a3b8` (slate-400) — muted. Animates from white → #94a3b8 via keyframe.
  After `animationDone` (interactive mode): white (#f8fafc) when highlighted, slate-400 otherwise.
- `fontFamily="inherit"` → Work Sans (loaded on page).
- `dominantBaseline="middle"` → vertically centered with dot.
- Right-side labels (14 waypoints): `textAnchor="start"`, `x = cx + r + 6`.
  Gap of 6 SVG units ≈ 1 CSS rem.
- **Left-side labels:** Nordkapp, Skaidi, Kautokeino (cx > 71.6 threshold). `textAnchor="end"`, `x = cx − r − 6`.
- Threshold: `wp.cx > VB_RIGHT_THRESH` where `VB_RIGHT_THRESH = VB_X + VB_W × 0.6 ≈ 71.6`.

**CSS keyframes:** `norway-draw-route`, `norway-dot-circle-appear`, `norway-dot-label-appear`
defined in `main.css` outside any `@layer`. Not in Tailwind utilities — named keyframes
need global scope. Old `norway-dot-appear` keyframe removed in Batch 10f.

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` in main.css sets
`.norway-map-route` (dashoffset 0, no animation), `.norway-map-circle` (opacity 1,
fill #fb923c, no animation), `.norway-map-label` (opacity 1, fill #94a3b8, no animation)
— instant show of everything in final colors, consistent with BottomSheet treatment.

**Layout on Reiserute page (two-column — Batch 11+):**
- **Mobile:** `<NorwayMap />` (no `interactive` prop) in `.reiserute-map-mobile` — width 200px,
  centered, below the intro paragraph and above the timeline. Scroll-triggered animation.
- **Desktop (≥960px):** `<NorwayMap interactive />` in `.reiserute-right > .reiserute-map-sticky` —
  sticky, vertically centered in viewport, max-width 22rem. Animation starts immediately.
- Both instances are always in the DOM; CSS `display:none` hides the inactive one.
  `display:none` elements don't run CSS animations — no double animation issue.

**Accessibility:** The wrapper `<div>` has `aria-hidden="true" role="presentation"` —
the map is purely decorative, screen readers skip it entirely. The SVG has
`focusable="false"` to prevent IE/Edge from making it keyboard-focusable.

**Desktop interactivity (Batch 16 — `interactive` prop, desktop only):**

Three behaviors, all gated on `animationDone` (true 3.3s after `started`):

1. **Hover highlighting:** 16 invisible `<rect>` hit areas span the full SVG width, each
   covering the y-band between two consecutive waypoints. `onMouseEnter` on each rect sets
   `hoveredSegment` state (index 0–15). `onMouseLeave` on the SVG clears it.

2. **Click-to-scroll:** `onClick` on a hit rect calls `document.querySelector('[data-etappe="…"]')`
   and `scrollIntoView({ behavior:'smooth', block:'center' })`. Guarded with
   `matchMedia('(min-width:960px)')` so it never fires on mobile.

3. **Viewport highlighting:** `IntersectionObserver` (threshold:1.0) watches each
   `[data-etappe="…"]` div in the left column. Fully-visible entries add their segment
   index to `viewportSegments` (a Set); partially/non-visible entries remove their index.
   Multiple segments can be in `viewportSegments` simultaneously.

**`data-etappe` attribute:** Set on `EtappeContent`'s outer `<div>` via
`{...(!isOpp && { 'data-etappe': String(etappe.nr) })}`. Values: `'1'`–`'10'`,
`'11a'`, `'11b'`, `'12'`–`'15'`. Oppvarmingstur entry gets no attribute (no map segment).

**SEGMENTS array (16 entries, geographic order):**
```
0  Nordkapp→Skaidi       etappeId:'1'
1  Skaidi→Kautokeino     etappeId:'2'
2  Kautokeino→Abisko     etappeId:'3'
3  Abisko→Fauske         etappeId:'4'
4  Fauske→Lønsdal        etappeId:'5'
5  Lønsdal→Umbukta       etappeId:'7'  ← spring E7 (geographic)
6  Umbukta→Nordli        etappeId:'8'  ← spring E8
7  Nordli→Hegra          etappeId:'9'  ← spring E9
8  Hegra→Gressli         etappeId:'6'  ← autumn detour E6
9  Gressli→Elgå          etappeId:'10'
10 Elgå→Ringebu          etappeId:'11a'
11 Ringebu→Fagernes      etappeId:'11b'
12 Fagernes→Geilo        etappeId:'12'
13 Geilo→Haukeliseter    etappeId:'13'
14 Haukeliseter→Ljosland etappeId:'14'
15 Ljosland→Lindesnes    etappeId:'15'
```

**Three visual states (applied only after `animationDone`):**
- **HIGHLIGHTED** (hovered OR fully in viewport): boundary dots fill #fb923c, boundary labels fill
  #f8fafc (white), route segment stroke-opacity 1.0. A dot is highlighted if EITHER adjacent
  segment is highlighted (shared boundary logic in `isDotHighlighted`).
- **DIMMED** (animationDone, not highlighted): all dots fill #94a3b8, all labels fill #94a3b8,
  all segments stroke-opacity 0.3.
- **PRE-INTERACTION** (animationDone=false): CSS animation controls everything — no inline
  style overrides. `dotStyle`/`labelStyle` return `{}` when animationDone is false.

**Dot scale:** ALL dots scale to 0.8 when `svgHovered` is true (mouse anywhere in SVG).
Scale 1.0 when mouse leaves SVG. Driven by `transform: scale(0.8|1)` in inline style.
CSS: `.norway-map-circle { transform-box: fill-box; transform-origin: center; }` ensures
scale is relative to each dot's own center, not the SVG origin.

**Animation cancel:** When `animationDone` becomes true, `dotStyle`/`labelStyle` include
`animation: 'none'` via inline style, which overrides `.norway-map-started .norway-map-circle`'s
`animation` declaration (inline style specificity > class). This cancels `forwards`-fill from
the keyframe, allowing inline `fill` to take effect. CSS `transition: fill 0.25s ease` on
`.norway-map-circle` and `.norway-map-label` then animates state changes smoothly.

**CRITICAL — opacity must be set alongside animation:'none' (Batch 17 bug fix):**
The CSS base rule `.norway-map-circle { opacity: 0 }` is the starting state for the intro
animation. The animation sets `opacity: 1` via keyframes; `animation-fill-mode: forwards`
keeps `opacity: 1` after the animation ends. When `animation: 'none'` is set inline,
`forwards`-fill is cancelled and opacity reverts to the CSS base `0` — dots vanish.
Fix: `dotStyle`/`labelStyle` MUST include `opacity: 1` in the same style object as
`animation: 'none'`. React applies the full style object in a single DOM commit, so
there is no intermediate frame where the animation is cancelled but opacity is still 0.
Do NOT split these into separate renders or useEffect calls — that reintroduces the race.

**Route switch:** The full-route `<path className="norway-map-route">` drives the intro
animation. When `animationDone`, its inline `strokeOpacity` changes 0.5→0 (0.4s transition).
Simultaneously, 16 individual `<path className="norway-map-segment">` paths fade in to 0.3
(dimmed) or 1.0 (highlighted). Both path sets are always in the DOM — no conditional mount flash.

**`animationDone` gate:** `setTimeout(() => setAnimationDone(true), 3300)` fires when
`started` becomes true (and `interactive=true`). 3300ms = last waypoint delay (2.649s) +
flash duration (0.6s) + 50ms buffer. Only one timeout, cleaned up on unmount.

**SEGMENT_RECTS (hit area geometry):**
First rect extends to viewBox top (VB_Y = -17.297); last rect extends to viewBox bottom
(VB_BOTTOM = 184.913). All rects span full viewBox width (VB_X=9.784, VB_W=103.026).

**CSS additions in main.css:**
- `.norway-map-circle`: `transform-box: fill-box; transform-origin: center; transition: fill 0.25s ease, transform 0.25s ease`
- `.norway-map-label`: `transition: fill 0.25s ease`
- `.norway-map-segment`: `transition: stroke-opacity 0.25s ease`

## Reiserute — participant interaction and links

**Clickable participants → BottomSheet** (added 2026-06-22):
- Each participant chip is now a `<button>` with hover pill background (`hover:bg-white/[.06]`).
- Clicking opens a `BottomSheet` with `SheetContent layout="profile"` — same data and layout
  as the Om Oss page. `selectedPerson` state in `Reiserute` default export.
- Person data: `ParticipantList` receives the PEOPLE array entries directly from `getParticipants()`,
  which already returns full person objects. Passed via `onSelectPerson` prop → `setSelectedPerson`.
- Sheet subtitle: `<PersonSheetSubtitle etapper={p.etapper} />` ReactNode — same tracking-[0.1em]
  override pattern as OmOss (scoped, does not affect `.eyebrow` globally).
- Sheet body: `<div class="space-y-4">` with one `<p>` per bio paragraph (matching OmOss treatment).
- Profile images: `${base}images/profiles/${p.id}.jpg` (same path as OmOss).
- Name mismatch check: all 10 PEOPLE entries with etapper strings match the cross-reference logic
  in `getParticipants` — no mismatches that break the lookup.

**Participant sizing** (updated 2026-06-22):
- Thumbnail: `w-6 h-6` (24px) → `w-8 h-8` (32px). On the 4/8pt grid. Proportional to name size increase.
- Name (first name only): `text-xs` (12px) → `text-base` (16px). Display via `p.name.split(' ')[0]`.
- `mt-4` moved from `ParticipantList` outer div to the wrapper in `EtappeContent`.
- Gap between participant chips: `gap-3` (12px / 0.75rem). Button padding: `pl-1 pr-4 py-1`
  (0.25rem left, 1rem right). Container: `flex flex-wrap gap-3`. (Batch 10g — previously gap-4/px-3.)

**Etappe note text** (updated 2026-06-22):
- `font-sans text-sm text-slate-400 leading-relaxed text-pretty` → `text-sm` changed to `text-base` (1rem).
- Color: `text-slate-400` → `text-slate-50` (2026-06-22 Batch 9) — note text is now white, matching
  the page's base prose color. `text-slate-50` is consistent with `html { color: #f8fafc }` baseline.

**"Les reisebrev →" and "Se bilder →" links** (added 2026-06-22, layout fixed 2026-06-22):
- Outer wrapper: `flex flex-col sm:flex-row sm:items-start gap-4 mt-4` — on mobile: participants
  row on top, links row below (two separate flex rows). On desktop: side-by-side on the same row.
- Links div: `flex flex-row items-center gap-4 sm:ml-auto flex-shrink-0` — the two links are always
  side-by-side (never stacked), with 1rem gap. `sm:ml-auto` pushes the group to the right on desktop.
- "Les reisebrev →": shown only for etapper 1–6 (numeric nr 1–6). `href={${base}reisebrev${nr}.html}`.
- "Se bilder →": shown for all etapper including Oppvarmingstur. `href={${base}galleri.html#${galleriId}}`.
  `galleriId`: etappe1–etappe15 (numeric nr), etappe11 for both 11a and 11b, oppvarmingstur for isOpp.
- Styling: `font-sans text-base text-slate-500 hover:text-slate-200 transition-colors` — subtle text links,
  no pill/button styling (low visual weight; secondary CTAs alongside the primary participant profiles).

## Galleri page — three-tier image system

**Three source tiers (Batch 18 — never collapse these back to one):**

| Tier | Path | Max dim | Size | Used for |
|---|---|---|---|---|
| Original | `public/images/galleri/` | 900px | 70MB | Lightbox main image only (full quality) |
| Preview | `public/images/galleri-preview/` | 128px | 4MB | Accordion header thumbs (64px display) + lightbox strip thumbs (48px display) |
| Thumb | `public/images/galleri-thumb/` | 400px | 16MB | Expanded grid thumbnails (~147px at lg, ~224px at sm) |

All three tiers have identical subfolder structure (`oppvarmingstur/`, `etappe1/`–`etappe15/`)
and identical filenames. All 944 files exist in all three tiers.

**Generation method (macOS only):**
```
sips -Z <size> --setProperty format png <input.webp> -o /tmp/tmp.png && cwebp -q 80 /tmp/tmp.png -o <output.webp>
```
`sips` cannot write WebP directly — must go via PNG temp file.

**Galleri.jsx image src mapping (4 locations):**
- Line 25 (`src` in Lightbox): `galleri/` — lightbox main image, KEEP as-is
- Line 165 (Lightbox strip `<img>`): `galleri-preview/`
- Line 228 (GalleriSection preview thumb `<img>`): `galleri-preview/`
- Line 261 (GalleriSection grid thumbnail `<img>`): `galleri-thumb/`

**loading/decoding on all thumbnail elements:** `loading="lazy"` and `decoding="async"` are
present on all four img elements. The lightbox main image (line 127) can be eager — user has
clicked to view it — but the other three all have lazy+async.

## Lightbox — etappe context and thumbnail strip

**Etappe context bar** (top of lightbox, added 2026-06-22):
- Section label (e.g. "Etappe 1") in `.eyebrow` style (orange-400, uppercase, tracking-[0.2em], text-xs).
- Route (e.g. "Nordkapp – Skaidi") from `section.route` in `text-xs text-slate-500`, truncated.
- Counter (e.g. "5 / 38") and close button in the same top bar, right-aligned.

**Scrollable thumbnail strip** (bottom of lightbox, added 2026-06-22):
- All images in the current section rendered as 48px square thumbnails.
- Active thumbnail: `ring-2 ring-orange-400 opacity-100`. Others: `opacity-40 hover:opacity-70`.
- Clicking a thumbnail navigates directly to that image via `onNavigate(i)` (replaces prev/next callbacks).
- Auto-scroll: `useEffect` watches `index`; queries `[data-active="true"]` and calls
  `scrollIntoView({ inline: 'center', behavior: 'smooth' })`. Handles sections with 60+ photos.
- Scrollbar hidden: `.scrollbar-hide` class added to main.css (scrollbar-width: none + webkit display: none).
- Strip background: `bg-black/50` (semi-transparent). Height: ~72px (48px thumb + 12px top/bottom py-3).
- `onNavigate(index)` callback replaces separate `onPrev`/`onNext` props — cleaner for arbitrary jumps.

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

- [x] **Reiserute & Galleri rebuild** — **ALL BATCHES DONE 2026-06-22.** Full architecture plan below.

### Reiserute & Galleri rebuild — architecture plan (2026-06-21, finalized)

**Decision: split into two pages.**
- **Reiserute** (existing page, to be rebuilt) — route map + vertical etappe timeline
  with inline content. No photos, no video.
- **Galleri** (new page) — all photo galleries per etappe (983 photos total across
  16 etapper/Oppvarmingstur, ~234MB original size, needs WebP conversion) + the video
  gallery section (migrated from Reiserute). Becomes a 5th primary nav item.

**Content audit findings (already completed, see audit report 2026-06-21):**
- `02-restored-static/reiserute.html` has truncated etappe notes for 11 of 15 etapper
  (3 severely: Etappe 7, 8, 14). `01-original-php/Reiserute.php` contains the FULL
  original text — this is the authoritative source for the rebuild. Even at full length,
  every etappe is short (longest is Etappe 7 at 68 words/12 sentences, most are 1–3
  sentences) — full text renders directly inline on the page; no BottomSheet needed.
- Oppvarmingstur's current description in Reiserute.jsx ("En måneds kanotur i Nord-Finland
  — innledning til livet i villmarken.") has NO source in either original file. Flagged as
  unsourced, but decision made to KEEP IT AS-IS (documented exception to the "never invent
  text content" rule, explicitly approved 2026-06-21).
- Map assets exist but are NOT used in the new design: `02-restored-static/images/
  kartfotogalleri/norgekart.png` + 15 per-etappe overlay PNGs. The new illustrative SVG
  map uses the same simplified path geometry sourced for the favicon instead.
- Participant data already exists in OmOss.jsx's PEOPLE array — reusable, needs
  extraction to a shared `src/data/people.js`. Two etappe-naming mismatches between
  OmOss and Reiserute data need reconciling:
  - "Lønsdal – Hattfjelldal" (OmOss) vs "Lønsdal – Umbukta" (Reiserute) — Etappe 7
  - "Nordli – Meråker" (OmOss) vs "Sørli – Meråker" (Reiserute) — Etappe 9
- 983 gallery photos exist in `02-restored-static/Galleri/Etappe{1-15}/images/` (raw
  Fuji camera filenames), NOT yet copied into `03-modernized`. Will need the same
  thumbnail-optimization treatment applied to the homepage photo strip (originals stay
  untouched in `02-restored-static/`; optimized WebP copies used on-site).

### Reiserute page — finalized structure (2026-06-21)

**No BottomSheet on this page.** All content renders directly, always visible — no
click-to-reveal interaction needed, since the source text (even at full restored length)
is short enough to display inline.

**Page structure, top to bottom:**
1. Existing TitleCard/header (unchanged).
2. Section description / intro paragraph (existing, `.section-description` already applied).
3. **Illustrative map** — small/medium SVG, positioned beside the intro text on desktop,
   below it on mobile. Dark grey silhouette of Norway (reuse the same simplified path
   geometry sourced for the favicon — do NOT re-derive from scratch). On page load, a short
   animation draws the route + town/waypoint markers from north to south (Nordkapp →
   Lindesnes). This map is PURELY illustrative/ambient — no hover, no click, no interaction,
   not synced to anything else on the page. A static (non-animated) version is an acceptable
   first-pass placeholder while the rest of the page is built; animation can be added once
   the page structure is confirmed working.
4. **Vertical etappe timeline** — a vertical version of the homepage Ruta section's
   dot-and-line visual element (reuse that existing visual language and styling). Dots run
   down the LEFT edge, one dot per town/waypoint, with line segments between them
   representing each etappe. To the RIGHT of each dot/line, inline (not hidden, not behind
   a click): etappe title (e.g. "Etappe 7: Lønsdal – Umbukta"), stats (days/km, e.g.
   "10 dager, hvorav 2 hvile, 220 km"), the FULL restored text (sourced from
   `01-original-php/Reiserute.php` per the audit, NOT the truncated static version), and
   participants for that leg (cross-referenced from shared people data, accounting for the
   two naming reconciliations already identified). No hover effects, no interactive labels
   on the line — keep it simple.
5. Existing accordion sections (Oppvarmingstur, etc.) — review whether these are superseded
   by the new vertical timeline or coexist; to be clarified when implementation starts.

**Galleri page** remains a separate, new page (5th nav item) as previously planned —
photo galleries per etappe + migrated video gallery. Unaffected by this update.

**Batch sequence:**
1. ✅ **Text restoration + data extraction** — DONE 2026-06-21. All 15 etappe notes
   restored from PHP source. PEOPLE array extracted to `src/data/people.js`. Five
   etappe-naming mismatches fixed (Jarle E7, Rasmus E8, Anders E9, Vegard E5, Truls E10).
   Emil's range 'Etappe 1–4' flagged (not yet expanded to individual entries).
   Build confirmed clean. TEMPORARY section deleted from CLAUDE.md.
2. ✅ **Vertical etappe timeline** — DONE 2026-06-21. Accordion (EtappeRow) fully replaced
   by a vertical dot-and-line timeline. Dots at left-3 centered via -translate-x-1/2.
   Each entry: season label, etappe eyebrow/title, stats, restored note, participants
   (via getParticipants() cross-referencing people.js). Oppvarmingstur as top entry.
   h1 updated to "Reiserute" (nav rename = Batch 5).
   Saltfjellet pause text merged into E5's note — see Decision changelog 2026-06-22.
3. ✅ **Illustrative SVG map** — DONE 2026-06-21 (static), animated 2026-06-22 (Batch 10).
   Static silhouette: public/norway-map.svg (derived from favicon.svg). Animated inline
   component: src/components/NorwayMap.jsx. See "NorwayMap component" section for full spec.
4. ✅ **New Galleri page** — DONE 2026-06-21. 944 images from 02-restored-static/Galleri/
   converted to WebP (q80, max 900px) with cwebp 1.6.0 → 70MB (avg 74KB/image).
   Stored in public/images/galleri/{oppvarmingstur,etappe1-15}/. Filenames with spaces
   renamed to underscores. Manifest at src/data/galleri.js (16 sections, 944 total).
   Gallery UI: grid 3/4/5/6 cols responsive, lazy loading. Lightbox: full-size WebP,
   next/prev navigation, Escape/X/backdrop close, scroll lock, focus trap. New page:
   src/pages/galleri/Galleri.jsx + main.jsx + galleri.html. Registered in vite.config.js.
5. ✅ **Video gallery migration + nav update** — DONE 2026-06-21. VIDEOS const and
   video gallery section moved from Reiserute.jsx to bottom of Galleri.jsx (below photo
   galleries, separated by border-t). SiteNav.jsx NAV_LINKS updated: "Reiserute & galleri"
   → "Reiserute", "Galleri" added as 3rd item (galleri.html). Final nav: Om oss · Reiserute ·
   Galleri · Utstyr · Sponsorer (5 items). Desktop nav gap reduced 3rem → 2rem (was increased
   when nav had 4 items). Sponsorer.jsx: added currentPage="sponsorer.html" (was missing).
   MobileNav automatically reflects the new NAV_LINKS (shared export). Build clean.
6. ✅ **Reiserute interaction + Galleri accordion + lightbox improvements** — DONE 2026-06-22.
   See Decision changelog 2026-06-22 (Batch 6) for full details.

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
  top — nav bar's 64px vertical space is gone from the flow. `.hero-text-block` stays
  `position: relative` on mobile (originally for nav overlap prevention). `margin-top: auto`
  added (2026-06-21 bug fix) to push the block to the bottom of the flex column — restoring
  the visual bottom-anchoring that `absolute bottom:0` gave on desktop, via flex instead.
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
- 2026-06-21: Mobile nav focus ring fix (first attempt, incomplete).
  Fix 1: Added onMouseDown={(e) => e.preventDefault()} to the trigger <button> — prevents
  focus acquisition on OPENING click (Chrome 86+ policy: :focus-visible fires on button clicks).
  Fix 2: Added .mobile-nav-link:focus:not(:focus-visible) { outline: none } in main.css —
  suppresses browser default rings for pointer-initiated link focus.
  These fixes were incomplete — the ring still appeared after click-to-CLOSE. See next entry.
- 2026-06-21: Mobile nav focus ring fix — complete (second pass, actual root cause).
  The remaining ring after click-to-close was caused by the focus-management useEffect cleanup:
  `setTimeout(() => triggerRef.current?.focus(), 10)` ran unconditionally whenever the overlay
  closed, programmatically restoring focus to the trigger. Programmatic element.focus() in
  Chrome also triggers :focus-visible (Chrome treats any .focus() call as keyboard-like), so
  the orange ring appeared 10ms after every close — including pointer-triggered closes where
  onMouseDown.preventDefault() had already prevented the INITIAL focus from the click.
  Fix: added `closedByEscapeRef` (useRef, default false). The Escape key handler sets it to
  true before calling close(). The useEffect cleanup now only calls triggerRef.current?.focus()
  when closedByEscapeRef.current is true, then resets it to false. Pointer closes (button click,
  link click) skip the focus() call entirely — no programmatic focus, no ring.
  Keyboard accessibility preserved: Tab to trigger → ring (browser-native); Escape to close →
  ring on trigger (programmatic focus, now only for keyboard-triggered close). Pointer users:
  no ring after click/tap on either open or close.
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
- 2026-06-21: Inner-page TitleCard mobile compact variant added.
  On mobile (< 640px), inner-page TitleCards now use compact sizing matching the footer's
  wordmark/subtitle treatment. Hero variant (homepage) is pixel-identical to before.
  Implementation: `.inner-header .title-card` scoped overrides in the mobile media query.
  No JSX changes — pure CSS. Values:
  - Card padding: 0.75rem 1.5rem (was 1.25rem 1.5rem for all mobile)
  - Eyebrow font-size: 8px (was 0.625rem / 10px); margin-bottom: 0 (was mb-4 / 16px)
  - h1 font-size: 1.125rem / 18px (was 1.75rem / 28px) — matches footer wordmark
  - Subtitle font-size: 8px (was 0.625rem / 10px); margin-top: 0 (was mt-4 / 16px)
  Card height drops from 148px → 74px. Strip centering recalculated:
  top = 24 + 74/2 = 61px. Strip height reduced to 122px (= 2×61) to exactly fill
  the 122px inner-header (24+74+24) with no overflow above or below. All photos fit.
  Previous `.strip-wrapper { top: 98px }` in the media query applies to hero only;
  `header.inner-header .strip-wrapper { top: 61px; height: 122px }` overrides for inner pages.
  (Selector uses `header.inner-header` — specificity 0,2,1 — rather than `.inner-header` alone
  (0,2,0) because PostCSS was not reliably applying the lower-specificity form. See 2026-06-21 bug fix.)
- 2026-06-21: Mobile nav focus ring fix — open path (third and final mechanism).
  After the close-path fix (closedByEscapeRef), a blue ring was still visible on the first
  nav link ("Om oss") each time the overlay opened via pointer click. Root cause: the focus-
  management useEffect called `firstLink?.focus()` unconditionally when `open` became true —
  same underlying problem as the close-path ring. Chrome treats any `element.focus()` call
  as keyboard-like and shows `:focus-visible`.
  Fix: added `openedByKeyboardRef = useRef(false)`. The trigger button's `onKeyDown` handler
  sets it to true when Enter or Space is pressed (the two keys that activate a button). The
  useEffect only calls `firstLink?.focus()` when the ref is true, then resets it to false.
  Pointer opens: `onKeyDown` never fires → ref stays false → no `.focus()` call → no ring.
  Keyboard opens (Enter/Space): ref is true → first link focused with ring visible — correct,
  the user is keyboard-navigating.
  Focus trap `handleOverlayKeyDown` (Tab-wrapping) was audited and requires no change —
  its `.focus()` calls fire in response to keyboard Tab events, so Chrome correctly shows
  `:focus-visible` for them.
  All three mechanisms now documented together in the "Focus ring behavior" section above.
- 2026-06-21: Inner-page eyebrow/h1 simplified to single h1 title on all 4 inner pages.
  Before: each page showed an eyebrow paragraph + a separate h1 (both below the TitleCard).
  After: single h1 only, using the former eyebrow text as the page title. The old h1 texts
  ("Folka bak turen.", "71°10′N → 57°58′N", "Det vi stolte på.", "Uten dem, ingen tur.") are
  deleted — all were generated/invented copy, not sourced content. New h1 texts:
  - Om Oss: "Om oss" (was eyebrow; h1 was "Folka bak turen.")
  - Reiserute & Galleri: "Reiserute & galleri" (was eyebrow; h1 was "71°10′N → 57°58′N")
  - Utstyr: "Utstyr" (was eyebrow; h1 was "Det vi stolte på.")
  - Sponsorer: "Sponsorer" (was eyebrow; h1 was "Uten dem, ingen tur.")
  All 4 new h1s use the same styling as before: `font-serif text-[2.5rem] md:text-[4.5rem]
  text-slate-50 leading-[0.95]`. The mb-* on each h1 is unchanged (spacing to the following
  section-description paragraph is preserved). Section eyebrows deeper within each page are
  completely unaffected: Reiserute keeps its "Oppvarmingstur" / "Høst-etapper" / "Vår-etapper"
  / "Video" section eyebrows; Sponsorer keeps its "Utstyr" / "Tjenester & overnatting" /
  "Vi vil også rette en stor takk til" section eyebrows. The TitleCard eyebrow
  ("2008 — 2009 · Nordkapp → Lindesnes") on the shared header is completely unaffected.
- 2026-06-21: Reiserute & Galleri rebuild Batch 1 complete — text restoration + data extraction.
  All 15 etappe notes in `Reiserute.jsx` restored from PHP source (11 had been truncated by the
  Wayback Machine capture; 3 severely: E7, E8, E14). PEOPLE array extracted from `OmOss.jsx`
  to new shared `src/data/people.js`. Five etappe-name mismatches corrected in people.js
  (canonical values now match Reiserute ETAPPER `fra`/`til` fields): Jarle E7 Hattfjelldal→
  Umbukta, Rasmus E8 Hattfjelldal→Umbukta (start), Anders E9 Nordli→Sørli (start), Vegard E5
  'Fauske (Sulitjelma)'→'Sulitjelma', Truls E10 'Tydal'→'Tydal (Gressli)'. Emil's range
  'Etappe 1–4: Nordkapp – Fauske' flagged but not changed (display-string decision deferred).
  Source comment in Reiserute.jsx updated to reference PHP as authoritative source.
  TEMPORARY section deleted from this file. Build confirmed clean.
- 2026-06-21: Two regressions from the inner-page TitleCard mobile compact batch fixed.
  Bug 1 — Hero text block near top: The mobile `position: relative` override (added in the
  mobile-nav redesign) placed `.hero-text-block` in flex flow immediately after `.hero-content`
  (~196px from hero top in a 480px hero), with no force pushing it down. Fix: added
  `margin-top: auto` to the mobile `.hero-text-block` rule — pushes the block to the bottom of
  the flex column, restoring the visual bottom-anchoring without reverting to `position: absolute`.
  Bug 2 — Inner-page strip not scaled: The CSS rule `.inner-header .strip-wrapper { top: 61px;
  height: 122px }` (specificity 0,2,0) was not reliably overriding `.strip-wrapper { top: 98px }`
  (0,1,0) in the same @media block — Tailwind's PostCSS pipeline did not honor the cascade in this
  specific case despite the higher specificity. Fix: selector upgraded to `header.inner-header
  .strip-wrapper` (adds the `header` element type → specificity 0,2,1), which is definitively
  unambiguous and not affected by any PostCSS reordering. Values unchanged: top: 61px, height: 122px.
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
- 2026-06-22: Typography fixes, .card-title class, and content fixes batch.
  1. `.card-title` semantic class added to main.css `@layer components` — `font-serif
     font-medium` + `font-size: 1.5rem; line-height: 1.25` (`leading-tight`). Applied to
     7 locations (see "Semantic CSS component classes" section for full list). SheetContent
     h3s in both layouts gained `font-medium` (previously only `font-serif`). Galleri
     section labels changed from `.eyebrow` (small orange uppercase) to `.card-title`
     (Fraunces 1.5rem, slate-100). Reiserute etappe title h3s increased from 1.125rem
     to 1.5rem. Sponsorer sponsor name h3s increased from text-xl (1.25rem) to 1.5rem.
  2. Home #ruta: "Se hele ruta" changed from `.btn-outline` to `.btn-solid` (primary CTA).
     Second button "Møt vandrerne" (`.btn-outline`, links omoss.html) added alongside in a
     `flex flex-wrap gap-4` wrapper.
  3. Home #reisebrev: "Se bildene →" (`.btn-outline`) added below the grid in a `mt-10`
     div, linking to `galleri.html`.
  4. Home #sponsorer: section h2 changed from "Sponsorer." to "Sponsorer" (period removed).
  5. ReisebrevPost kadaver table: body row cells increased from `text-xs`/`text-sm` to
     `text-base` (1rem) — labels (category names) and value cells (Marius/Emil columns).
     Header row (`text-xs` "Marius"/"Emil" column headers) unchanged.
  6. Utstyr INTRO_BODY: text color changed from `text-slate-300` to `text-slate-400` to
     match `.section-description` (the preceding INTRO_DESC paragraph).
  7. Utstyr accordion items: item text (product names) increased from `text-sm` (0.875rem)
     to `text-base` (1rem).
  8. Reiserute Saltfjellet callout: the `isLastBeforePause` conditional logic removed (dead code —
     both branches rendered `<Waypoint name={e.til} />` anyway). NOTE: the styled italic callout
     block and the `NOTE` const were NOT fully removed in this batch — see 2026-06-22 Batch 7.
- 2026-06-22 Batch 6: Reiserute interaction + Galleri accordion/lightbox improvements.
  1. Saltfjellet callout: incorrectly confirmed gone — the `NOTE` const and styled italic callout
     block (`border-l-2`) were still present and still rendering. Corrected in 2026-06-22 Batch 7.
  2. **galleri.js**: `route` field added to all 16 sections. Values match ETAPPER `fra – til`
     in Reiserute.jsx exactly. Etappe 11 (combined 11a+11b folder) → "Elgå – Fagernes".
  3. **Galleri heading structure**: Each section now shows a two-tier heading — `eyebrow`
     (section label, e.g. "Etappe 1") + `card-title` (route, e.g. "Nordkapp – Skaidi").
     Previously only `card-title` with the label. Photo count + ↑/↓ indicator below.
  4. **Galleri accordion**: All sections collapsed by default. Toggle via heading button.
     Multiple sections open simultaneously (better for browsing). Collapsed state shows 3
     random preview thumbnails (picked from `section.images` on mount via `useMemo`).
     Full grid fades in (16ms delay + `transition-opacity duration-300`) when expanded.
     Preview thumbs click to open the lightbox directly (not to expand the accordion).
  5. **Galleri hash-based auto-expand**: Page load with URL hash matching a section id
     (e.g. `#etappe1`, `#oppvarmingstur`) opens that section and scrolls to it (100ms delay).
     Used by "Se bilder →" links on Reiserute. Section `id` attributes match hash targets.
  6. **Reiserute note text**: `text-sm` → `text-base` (1rem) on all etappe note paragraphs.
  7. **Reiserute participants**: Thumbnail `w-6 h-6` → `w-8 h-8` (32px); name `text-xs` →
     `text-base` (16px). Both changes proportional / on the 4/8pt grid.
  8. **Reiserute clickable participants**: Each participant chip is now a `<button>`. Clicking
     opens a `BottomSheet` with `SheetContent layout="profile"` (same Om Oss design). State:
     `selectedPerson` in `Reiserute`. Sheet image, subtitle, meta, bio all from PEOPLE data.
     New `PersonSheetSubtitle` helper handles etappe list with tracking-[0.1em] override.
  9. **Reiserute "Les reisebrev →" / "Se bilder →" links**: Inline text links added to each
     etappe. "Les reisebrev →": etapper 1–6 only. "Se bilder →": all etapper (incl. Oppvarmingstur).
     Links hash-target the correct Galleri section. Positioned right of participants via `ml-auto`.
  10. **Lightbox context bar**: Etappe label (orange-400 eyebrow) + route (slate-500) + counter
      + close button in a single top bar. Replaces floating counter + floating close button.
  11. **Lightbox thumbnail strip**: Scrollable horizontal strip at bottom showing all section
      images as 48px thumbs. Active thumb highlighted with `ring-2 ring-orange-400`. Clicking
      any thumb jumps to that image. Auto-scrolls to keep active thumb visible (`scrollIntoView`).
      `onNavigate(index)` replaces separate `onPrev`/`onNext` callbacks throughout.
  12. **main.css**: `.scrollbar-hide` utility class added (scrollbar-width: none + webkit display: none)
      for the lightbox thumbnail strip.
- 2026-06-22 Batch 7: Four targeted fixes across Galleri and Reiserute.
  1. **Saltfjellet — definitive fix.** Pre-fix grep found 3 occurrences: reisebrev.js (legitimate,
     untouched), Reiserute.jsx line 14 (`NOTE` const with Saltfjellet text that was still rendering
     as a styled italic callout block), and Reiserute.jsx line 45 (Etappe 5's note with short
     placeholder text, not the full verbatim text). Changes: `NOTE` const deleted; the
     `border-l-2 border-orange-400/30` italic callout block in the JSX intro section deleted entirely;
     Etappe 5's `note` field replaced with the full verbatim text from the PHP source:
     "Deilig etappe! Ikke like stort forflytningspress på denne etappen. Som tidligere antatt er
     Saltfjellet slukt av vinteren tidlig i november. Vi har av erfaring (over Skjomenfjellene)
     lært at det ikke har noen hensikt å jobbe mot naturen. For å kunne fortsette til fots dro vi
     sørover til Hegra og gikk den siste høstetappen til Gressli. Når vi begynner på igjen med ski
     under beina i februar, vil vi starte nøyaktig der vi slapp i Nord-Norge, nærmere bestemt Lønsdal."
     Post-fix grep: Saltfjellet appears only in reisebrev.js (letter body, correct) and Reiserute.jsx
     Etappe 5 data (correct). The NOTE const and callout block are completely gone from the JSX.
  2. **Galleri accordion collapsed-state redesign.** Previous design: heading button + separate full-size
     preview grid below it (clickable to lightbox). New design: single button spanning chevron + heading
     + 3 small square thumbnails. Desktop: `flex-row` — heading left, thumbs (w-16 h-16, 64px) right.
     Mobile: `flex-col` — heading top, thumbs below (mt-3). Clicking anywhere (including thumbs) expands
     the accordion; thumbs no longer open the lightbox. `ChevronDown`/`ChevronUp` from lucide-react
     (already a dependency) indicates open/closed state. Separate preview `<div>` grid removed entirely.
  3. **Reiserute links layout.** Previous: links stacked vertically (`flex-col items-end`), positioned
     beside participants via `ml-auto`. Now: outer wrapper `flex flex-col sm:flex-row` — on mobile,
     participants row sits above the links row (two separate rows in a column); on desktop, participants
     and links are on the same horizontal row. Links div: `flex flex-row items-center gap-4 sm:ml-auto`
     — the two links are always side-by-side (1rem gap), never stacked on either breakpoint.
  4. **Reiserute participant gap.** Gap between participant chips: `gap-3` → `gap-4` (16px, on 4/8pt grid).
- 2026-06-22 Batch 8: Oppvarmingstur participant fix + first-name display.
  1. **Oppvarmingstur missing Marius.** Root cause: `getOppParticipants()` only matched
     `'Oppvarmingstur i Finland'`, but Marius's entry in people.js has `etapper: ['Hele turen']`.
     The regular `getParticipants()` function already handles `'Hele turen'` as a wildcard, but
     `getOppParticipants()` was a simpler filter that didn't. Fix: added `|| e === 'Hele turen'`
     to the filter condition. Oppvarmingstur now shows both Marius and Truls (Stende) as participants.
     No data changes — people.js `'Hele turen'` is correct and canonical.
  2. **Participant buttons — first name only.** Previously showed the last token of `p.name`
     via `p.name.split(' ').pop()` (e.g. "Montarou", "Stende"). Changed to `p.name.split(' ')[0]`
     to show the first token (e.g. "Marius", "Truls"). All 10 participant names have a clean first
     name as the first token — no edge cases (verified: Marius, Emil, Vegard, Jarle, Andreas, Truls,
     Sverre, Rasmus, Anders, Karin). Display-only change: underlying data (full names in people.js)
     unchanged. The BottomSheet profile still shows the full name via `selectedPerson.name` — the
     lookup is by object reference, not name string, so the profile is unaffected.
- 2026-06-22 Batch 9: Three fixes across Reiserute and Galleri.
  1. **Participant gap root cause and fix.** `gap-4` (1rem) between participant chips was visually
     absent because the `<button>` had `-mx-3 -my-1` negative margins (intended to extend the hover
     hit area beyond the visible pill). In a flex container, `gap` is measured between margin boxes,
     not border boxes — so `-0.75rem` on each side of every button meant `1rem - 2×0.75rem = -0.5rem`
     effective visual gap (buttons overlapping). Fix: removed `-mx-3 -my-1` from the button
     `className`. The hover background now fills the `px-3 py-1` pill padding, which remains a
     sufficient interactive area. All participant chips now show a visible 1rem gap between them.
  2. **Etappe note text color.** Changed from `text-slate-400` to `text-slate-50` (white). Applies
     to all etappe note paragraphs on the Reiserute page. Consistent with the page's base text color
     (`html { color: #f8fafc }` = slate-50); previous slate-400 was unintentionally muted.
  3. **Galleri accordion fade transitions.** Preview thumbs and full photo grid now crossfade on
     expand/collapse. Both elements are always in the DOM (no conditional rendering) — opacity +
     max-height CSS transitions handle all state changes. Preview thumbs: `duration-200`, fade out
     + max-height collapse to 0 on mobile (no blank gap), opacity-only on desktop. Full grid:
     `duration-300`, max-h-[8000px] when open / max-h-0 when closed, pointer-events-none + aria-hidden
     when closed, tabIndex={-1} on grid buttons when closed. `motion-reduce:transition-none` (Tailwind
     v3 built-in) disables all transitions for users who prefer reduced motion — instant show/hide.
     `showFull` state and useEffect removed — pure CSS handles everything. Inner thumb div uses
     `pt-3 sm:pt-0` (padding not margin) so max-height collapse correctly clips the gap too.
- 2026-06-22 Batch 20: Mobile inner-page photo strip — SMALL_SIZE_BUCKETS for compact strip.
  **Problem:** Strip height reduced to 64px (Batch 19) but photos still used SIZE_BUCKETS (max h=102),
  causing clipping inside the 64px wrapper. CSS max-height override was rejected because it would
  eliminate height variety (all photos capped at the same height). **Fix:** Added `SMALL_SIZE_BUCKETS`
  (6 buckets, scale factor 46/102 ≈ 0.451 applied to both w and h): min {w:29, h:22} → max {w:61, h:46}.
  Max h=46 → track height=62px < 64px wrapper (no clipping). Variety ratio 46/22 ≈ 2.09 matches the
  original 102/48 ≈ 2.13. Added `compact` prop to `PhotoStrip`; `useMemo` checks
  `compact && matchMedia('(max-width:639px)')` at mount to pick the bucket set. `InnerHeader` passes
  `compact={true}`; `HeroHeader` never does. Desktop inner pages: compact=true but media query false →
  SIZE_BUCKETS used (desktop strip unchanged). Mobile inner pages: compact=true + media query true →
  SMALL_SIZE_BUCKETS.
- 2026-06-22 Batch 19: Desktop nav pill removed; nav link color/size updated; mobile inner-page strip height 64px.
  **Nav:** `.nav-pill` background (#0f172a) and border-radius (9999px) removed — fully transparent on all pages
  (hero and inner). `.nav-links` gap: 2rem → 4rem (64px). `.nav-link` font-size: 1rem → 1.125rem; color:
  rgba(148,163,184,0.80) → rgba(248,250,252,0.75) (75% white, brightens to full #f8fafc on hover).
  Active state unchanged: #f8fafc + orange-400 border-bottom. Hover previously brightened slate-400→white;
  now brightens 75%white→100%white — same directional effect, functional feedback preserved.
  **Strip:** `header.inner-header .strip-wrapper { height: 122px }` → `64px`. `top: 61px` unchanged
  (center of the 74px compact mobile card = padding-top 24 + card-height/2 37 = 61; `translateY(-50%)`
  makes `top` the center point, not the top edge). Strip is now shorter than the inner-header total height
  (122px); dark background shows above/below — intentional.
- 2026-06-22 Batch 18: Galleri — three-tier image system for thumbnail performance.
  **Problem:** All 944 gallery images served at 900px max dimension even for 64px preview thumbs and
  ~147px grid thumbnails. 70MB total; collapsed accordions still trigger lazy-loads for oversized images.
  **Three tiers created:**
  - `public/images/galleri/` — original 900px WebP, q80. Used ONLY by the lightbox main image (full quality).
  - `public/images/galleri-preview/` — 128px max dimension WebP, q80. 4MB total (94% reduction).
    Used by: accordion header preview thumbs (64×64px display) and lightbox thumbnail strip (48×48px display).
  - `public/images/galleri-thumb/` — 400px max dimension WebP, q80. 16MB total (77% reduction).
    Used by: expanded grid thumbnails (up to ~224px at sm viewport, 147px at lg).
  **Generation:** sips (macOS) to resize and convert to PNG temp → cwebp -q 80 to encode WebP.
  Subfolder structure mirrors `galleri/` (oppvarmingstur, etappe1–etappe15). All 944 files processed.
  **Galleri.jsx changes:** 3 of 4 image src paths updated. Lightbox strip (line 165): galleri/ → galleri-preview/
  + added decoding="async". Preview thumbs (line 228): galleri/ → galleri-preview/. Grid thumbs (line 261):
  galleri/ → galleri-thumb/. Main lightbox image (line 25) unchanged. loading="lazy" and decoding="async"
  were already present on all gallery image elements except the lightbox strip (decoding added there now).
- 2026-06-22 Batch 17: NorwayMap — fix dots/labels disappearing after intro animation.
  **Root cause:** `.norway-map-circle { opacity: 0 }` is the CSS base. The animation keyframe
  sets `opacity: 1` with `forwards`-fill keeping it visible. Setting `animation: 'none'` inline
  cancels the forwards-fill — opacity reverts to base `0`. `dotStyle`/`labelStyle` did not
  explicitly set `opacity: 1`, so all dots and labels vanished permanently on `animationDone`.
  **Fix:** Added `opacity: 1` to both `dotStyle` and `labelStyle` return values alongside
  `animation: 'none'`. React applies the full style object atomically in one DOM commit — no
  intermediate frame where animation is cancelled but opacity is 0. Transition from orange→grey
  still works because `fill` transition fires after the style update.
- 2026-06-22 Batch 16: NorwayMap — desktop interactive mode (hover, click-to-scroll, viewport highlighting).
  **`interactive` prop** added to `NorwayMap`. Passed as `<NorwayMap interactive />` to the desktop
  sticky instance in Reiserute.jsx; mobile instance stays `<NorwayMap />` (no prop, no interactivity).
  **`data-etappe`** attribute added to each `EtappeContent` outer div (values `'1'`–`'15'`, `'11a'`,
  `'11b'`; Oppvarmingstur omitted). Used by both the viewport IntersectionObserver and click-to-scroll.
  **SEGMENTS array (16):** maps each SVG waypoint band to an etappe entry by geographic
  correspondence — E6 (autumn detour Hegra→Gressli) maps to band 9 which is geographically out of
  sequential order. **SEGMENT_RECTS:** invisible `<rect>` hit areas; first extends to viewBox top,
  last to viewBox bottom. **animationDone gate:** 3300ms setTimeout after `started`.
  **Three visual states:** PRE_INTERACTION (animation running) → DIMMED (done, all grey/0.3 opacity)
  → HIGHLIGHTED (hovered or in-viewport: dots orange, labels white, segment opacity 1.0). Dot scale:
  0.8 while SVG hovered (all dots together), 1.0 on mouse leave. **Route switch:** full path fades
  out (strokeOpacity 0.5→0, 0.4s), 16 segment paths fade in to 0.3/1.0. Both always in DOM.
  **Animation cancel:** `animation:'none'` in inline style overrides keyframe forwards-fill, enabling
  inline fill + CSS transition to take over. CSS: `transform-box:fill-box; transform-origin:center`
  on `.norway-map-circle` for correct SVG scale behavior.
- 2026-06-22 Batch 15: NorwayMap — halve route animation duration.
  Route draw: 5s → 2.5s; CSS initial delay: 0.3s → 0.15s (`norway-draw-route 2.5s linear 0.15s`).
  All 17 waypoint dot/label `animationDelay` values multiplied ×0.5 so dots remain in sync with
  the stroke tip as it passes each waypoint. Delay formula updated: `0.15 + (frac × 2.5)`.
  No other changes — easing, keyframes, opacity, component structure all unchanged.
- 2026-06-22 Batch 14: Reiserute map — max-width cap and label style simplification.
  **Max-width:** Added `max-width: 22rem` (352px) to `.reiserute-map-sticky` in main.css.
  The right column uses `justify-content: center`, so the map stays centered as it scales
  down to fit within the cap. `width: 100%` remains so the map fills smaller containers.
  **Labels:** Removed `textTransform="uppercase"` and `letterSpacing={LABEL_LETTER_SPACING}`
  from the `<text>` element in NorwayMap.jsx. Deleted the `LABEL_LETTER_SPACING` constant
  (was `'0.1em'`). Labels now render in mixed case with default letter-spacing. `FONT_SIZE`,
  `LABEL_WEIGHT`, and all other label attributes unchanged.
- 2026-06-22 Batch 13: Reiserute — extend right column to viewport edge.
  **Approach:** Negative right margin on `.reiserute-right` within the 960px media query.
  Formula: `margin-right: calc(-1 * ((100vw - 960px) / 2 + 1.5rem))`.
  Explanation: the max-w-content container (960px, mx-auto) is centered by the browser
  distributing remaining viewport width equally as left/right auto margins: each =
  `(100vw - 960px) / 2`. The px-6 class adds a further 1.5rem (24px) right padding.
  The negative margin exactly cancels both, pulling .reiserute-right to the viewport edge.
  Guard: rule is inside `@media (min-width: 960px)` only — below this the container has
  no auto margins and the formula would produce negative pixel values (e.g. at 800px:
  `-((-160px)/2 + 24px) = +56px` — wrong direction). Two-column layout only activates
  at 960px, so the guard is the same breakpoint.
  `padding-right: 1.5rem` added to `.reiserute-right` to keep the map off the viewport edge.
  The `justify-content: center` already on `.reiserute-right` centers the map in the
  full extended space automatically — no other changes needed.
  **Grid note:** `margin-right: calc(...)` is a dynamic viewport-derived value (not a
  fixed px amount) — exempt from the 4/8pt grid rule (same class of exception as
  `.strip-wrapper` top/height). `padding-right: 1.5rem = 24px` is on the grid ✓.
  **Unchanged:** Layout structure, left column, sticky behavior, mobile layout.
- 2026-06-22 Batch 12: Reiserute map — y-compression, sticky fix, centering, mobile size.
  **SVG y-compression:** Route extends too far south. Fix: linear compression of all y-coords
  between Nordkapp (anchor, stays fixed) and Lindesnes (old cy=173.414 → target=169.0).
  Formula: `factor = (169.0 - nordkapp_cy) / (173.414 - nordkapp_cy) = 174.225/178.639 = 0.975291`.
  Applied to every point in ROUTE path and all WAYPOINTS cy values. Only route/dots/labels
  are compressed — Norway silhouette paths left untouched (they fit the viewBox correctly).
  Before→after: Nordkapp -5.225→-5.225 (fixed), Skaidi 3.814→3.591, Kautokeino 20.071→19.446,
  Abisko 37.0→35.957, Fauske 54.594→53.116, Lønsdal 61.292→59.648, Umbukta 67.734→65.931,
  Nordli 89.998→87.645, Hegra 104.806→102.087, Gressli 111.905→109.011, Elgå 119.645→116.560,
  Ringebu 126.182→122.935, Fagernes 134.001→130.561, Geilo 141.333→137.712,
  Haukeliseter 152.645→148.744, Ljosland 163.598→159.427, Lindesnes 173.414→169.000.
  Route y-values compressed with same formula (they differ slightly from waypoint cy due to
  original path computation); route Lindesnes y → 169.066 (0.066 units off dot, imperceptible).
  **Sticky root cause:** `align-items: flex-start` on `.reiserute-layout` caused `.reiserute-right`
  to be only as tall as the map itself (its in-flow content = position:sticky element's margin box).
  With no scroll room in the parent, position:sticky never activated. Fix: removed
  `align-items: flex-start` from `.reiserute-layout` — default `stretch` makes `.reiserute-right`
  grow to match `.reiserute-left` height (the full timeline), giving sticky room to scroll.
  **Desktop map centering:** Changed `.reiserute-right` from `display:block` to
  `display:flex; justify-content:center; align-items:flex-start`. Added `width:100%` to
  `.reiserute-map-sticky` so the SVG fills the right column; 1rem padding retained on the
  wrapper (not replaced by margin). The 16px visual space on each side of the 320px map
  comes from the padding within the 352px-wide sticky wrapper.
  **Mobile map width:** 160px → 200px (160 × 1.25 = 200px, 25% larger).
- 2026-06-22 Batch 11: Reiserute two-column layout + scroll-triggered mobile animation.
  **Route opacity:** strokeOpacity 0.8 → 0.5 (NorwayMap.jsx).
  **Mobile map (50%):** `reiserute-map-mobile` CSS class, width 160px (half of 320px desktop),
  centered with `margin: 0 auto 3rem`. Shown only on mobile; hidden via `display:none` ≥960px.
  **Desktop two-column layout (960px breakpoint):**
  Breakpoint calculation: 560px (left) + 352px (right) + 48px (px-6 outer padding) = 960px.
  Right column = 912px content − 560px = 352px. Map = 352 − 32px (1rem×2 padding) = 320px wide.
  CSS Grid alternative rejected; using flexbox: `display:flex; align-items:flex-start` on
  `.reiserute-layout`. Left: `flex:0 0 560px`. Right: `flex:1; min-width:0`.
  Reiserute.jsx: h1 stays full-width above the layout div. Left column contains intro +
  mobile-map-placeholder + full timeline. Right column contains desktop-only sticky map.
  **Sticky map:** `position:sticky; top:calc(50vh - 314px)` on `.reiserute-map-sticky`.
  Map height calculation: 320px × (202.210/103.026) ≈ 628px → half = 314px.
  When map top is at 50vh−314px, map center is at 50vh = viewport center.
  **Two NorwayMap instances:** mobile instance in `.reiserute-map-mobile`, desktop instance
  in `.reiserute-right`. CSS hides the appropriate one per breakpoint. Since `display:none`
  elements don't run CSS animations, both instances are inert when hidden.
  **Scroll-triggered mobile animation (IntersectionObserver):** NorwayMap now uses
  `useRef + useState(started) + useEffect`. Initial started state reads matchMedia at
  component creation: true on desktop (≥960px), false on mobile. On mobile, an
  IntersectionObserver with `rootMargin:'0px 0px -50% 0px'` watches the wrapper div;
  fires when the wrapper's top edge reaches the viewport center. On fire: started=true,
  observer disconnects. On desktop, useEffect sees started=true and returns early.
  **Animation gating (CSS):** Animations moved from unconditional class selectors to
  `.norway-map-started` descendants. Base `.norway-map-route` keeps dasharray/dashoffset=1
  (invisible). `.norway-map-started .norway-map-route` gets the 5s linear animation.
  Same pattern for `.norway-map-circle` and `.norway-map-label`. The `.norway-map-started`
  class is added to the wrapper div when started=true.
  **Reduced motion fix (specificity):** `.norway-map-started .X` has specificity (0,2,0),
  beating the old single-class reduced-motion override (0,1,0). Both selectors now appear
  in the reduced-motion block: `.norway-map-route, .norway-map-started .norway-map-route { ... }`.
  **Links below participants:** Removed `sm:flex-row sm:items-start` from EtappeContent
  links container (line 236 area) and `sm:ml-auto` from links div. Links are now always
  in a flex-col stack below the participant buttons, on both mobile and desktop.
- 2026-06-22 Batch 10g: NorwayMap timing fix, white-flash tweak, participant button spacing.
  **Root cause (animation desync):** Route used `ease-in-out` timing. Dot delays assumed
  linear progress (fraction-drawn = elapsed/duration). With ease-in-out, the path draws
  slower at start and end, faster in the middle. Early dots appeared before the line
  (line slow-start → less drawn than expected); late dots appeared after the line passed
  (line accelerated past midpoint → more drawn than expected). Fix: changed route
  `animation-timing-function` from `ease-in-out` to `linear`. The existing delay formula
  `delay = 0.3 + (cum_frac × 5.0)` is now exactly correct. Delay values unchanged.
  **White-flash:** duration 1.5s → 0.6s. Keyframes 0/8/100 → 0/20/100 (pop at 20%=0.12s,
  settle over 80%=0.48s). Effect is snappier and more visible.
  **Participant buttons:** container `gap-4` → `gap-3`, button `px-3` → `pl-1 pr-4`.
- 2026-06-22 Batch 10f: NorwayMap animation and label refinement.
  **Labels:** font-size 4 SVG units (was 3.5), font-weight 700, letter-spacing 0.1em,
  text-transform uppercase. Defined via FONT_SIZE/LABEL_WEIGHT/LABEL_LETTER_SPACING consts.
  **Route opacity:** strokeOpacity=0.8 added to route `<path>` element.
  **Route duration:** 5s (doubled from 2.5s). Dot delays scale proportionally.
  **Y-coordinate timing:** Dot delays now based on when the stroke tip first reaches each
  waypoint's y-coordinate (not cumulative Euclidean distance). For the rotated route
  (all segments southward), this equals cumulative length to each segment endpoint.
  Delays: Nordkapp 0.3s → Lindesnes 5.298s (vs old 0.3s → 2.8s).
  **White-flash animation:** dot/label appearance changed from simple opacity fade to:
  0%→8% pop to white (0.12s), 8%→100% color settle to final (1.38s). CSS `fill` keyframes
  override SVG presentation `fill` attributes (higher cascade priority). Separate keyframes
  `norway-dot-circle-appear` and `norway-dot-label-appear` so circle and label can settle
  to different final colors (#fb923c orange, #94a3b8 slate-400). `animationDelay` moved
  from `<g>` to individual `<circle>` and `<text>` elements; `norway-map-dot` class removed.
  **Reduced motion:** updated to use .norway-map-circle/.norway-map-label, show in final
  colors with no animation.
- 2026-06-22 Batch 10e: NorwayMap — rotate all SVG coordinates -20° (CCW).
  **Approach:** Two-step Python coordinate transformation (not CSS transform). Step 1:
  Parse every path `d` attribute in norway-map-route.svg (commands: M/Z/H/h/L/l/V/v/
  C/c/S/s/Q/q), convert to absolute coords, rotate -20° around original viewBox centroid
  (64.8, 81.7), write to `public/norway-map-rotated.svg` (no labels). Step 2: Re-apply
  horizontal labels at rotated dot positions; threshold cx > viewBox_w × 60% for LEFT
  vs RIGHT side. NorwayMap.jsx regenerated from norway-map-rotated.svg.
  **Result:** New viewBox `9.784 -17.297 103.026 202.210`. Norway silhouette visually
  taller/narrower. Nordkapp, Skaidi, Kautokeino get left-side labels (cx > 71.6 after
  rotation). Animation timing and delays unchanged. Labels remain horizontal (no SVG
  text rotation). prefers-reduced-motion still works correctly.
  **Files:** norway-map-rotated.svg = current source; norway-map-route.svg = unrotated
  reference (keep both). NorwayMap.jsx updated.
- 2026-06-22 Batch 10d: NorwayMap — switch to norway-map-route.svg, add labels, 17 waypoints.
  **Source change:** Component now extracts silhouette, route, and dots from
  `public/norway-map-route.svg` (manually verified in Illustrator) rather than the
  programmatically-derived `norway-map.svg`. viewBox changed from `0 0 180 180` to
  `0 0 129.6 163.4`. Silhouette paths had CSS class `st0` stripped and replaced with
  inline `fill="#475569"` at generation time.
  **17th waypoint:** Umbukta (cx=60.3 cy=65.2) added between Lønsdal and Nordli — was
  missing from all previous versions. Waypoint names updated: Narvik→Abisko,
  Sulitjelma→Fauske, Sørli→Nordli, Meråker→Hegra, Tydal→Gressli.
  **Labels:** Each waypoint now renders a `<text>` element inside the same `<g>` as its
  dot — both animate in together. Color #94a3b8 (slate-400), fontSize 3.5 SVG units
  (≈ 0.5 CSS rem at 320px render width). Gap of 6 SVG units from dot edge. Labels right
  of dot for all except Nordkapp (left-side, text-anchor end) to avoid viewBox clip.
  **Delays:** Recalculated from norway-map-route.svg path geometry (total ≈ 194.9 units).
- 2026-06-22 Batch 10c: NorwayMap waypoint coordinate second correction.
  Northern and middle waypoints shifted further west to align with the Norway silhouette.
  Nordkapp and Lindesnes unchanged (already correct). All other cx/cy values and the
  route `d` attribute updated. Animation timing, radii, and styling unchanged.
- 2026-06-22 Batch 10b: NorwayMap waypoint coordinate correction.
  All 16 waypoint cx/cy values and the route `d` attribute updated based on a visual
  overlay comparison of the SVG dots against real Norway geography. The original
  coordinates were calculated programmatically and were slightly off the silhouette.
  Animation timing delays left unchanged — per-waypoint differences are sub-pixel
  and imperceptible after the small coordinate adjustments. ROUTE and WAYPOINTS in
  NorwayMap.jsx updated; CLAUDE.md coordinate table replaced with corrected values.
- 2026-06-22 Batch 10: Animated NorwayMap component.
  **Decision: inline SVG required for CSS animation.** External SVG via `<img>` isolates the SVG
  document — CSS keyframes on the host page cannot reach elements inside it. The only way to animate
  the route-draw is to inline the SVG paths directly in the React component tree.
  **Implementation:** New `src/components/NorwayMap.jsx`. The 97 silhouette paths from
  `public/norway-map.svg` are stored as a template literal (`SILHOUETTE`) and rendered via
  `<g dangerouslySetInnerHTML>` at 60% opacity. Route line and waypoint dots are regular JSX
  elements on top. `pathLength="1"` normalises the stroke-dasharray/dashoffset animation to
  0–1 range. Total route length ≈ 201 SVG units (16 waypoints, straight-line segments).
  **CSS:** Two keyframes + two classes in main.css (`norway-draw-route`, `norway-dot-appear`,
  `.norway-map-route`, `.norway-map-dot`). `prefers-reduced-motion` block sets instant static
  display. **Layout change:** Map moved from beside the intro text (desktop side-by-side) to
  below the section-description on ALL screen sizes. Width: 320px (`w-80`), centered via
  `flex justify-center`. The old `flex flex-col sm:flex-row` wrapper in Reiserute.jsx replaced
  with separate paragraph + centered map div. Bundle impact: reiserute JS +72KB (inlined paths).

