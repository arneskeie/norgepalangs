import React, { useMemo } from 'react'
import SiteNav from './SiteNav.jsx'

// Full pool — one entry per image copied to public/strip/
const PHOTO_POOL = [
  'opp_0','opp_1','opp_2',
  'e01_0','e01_1','e01_2',
  'e02_0','e02_1','e02_2',
  'e03_0','e03_1','e03_2',
  'e04_0','e04_1','e04_2',
  'e05_0','e05_1','e05_2',
  'e06_0','e06_1','e06_2',
  'e07_0','e07_1','e07_2',
  'e08_0','e08_1','e08_2',
  'e09_0','e09_1','e09_2',
  'e10_0','e10_1','e10_2',
  'e11_0','e11_1','e11_2',
  'e12_0','e12_1','e12_2',
  'e13_0','e13_1','e13_2',
  'e14_0','e14_1','e14_2',
  'e15_0','e15_1','e15_2',
]

// Size buckets — strip is ~133px tall, inner space ~113px after track padding
// Photos cap at h:102 so they fit comfortably without clipping
const SIZE_BUCKETS = [
  { w: 64,  h: 48  },
  { w: 76,  h: 58  },
  { w: 90,  h: 68  },
  { w: 106, h: 80  },
  { w: 120, h: 90  },
  { w: 136, h: 102 },
]

// Wide rotation range — real scrapbook scatter
const ROTATIONS = [-9, -6.5, -4.8, -3.2, -1.5, 0.8, 2.5, 4.2, 6.0, 8.5]

function seededShuffle(arr) {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function pickRandom(arr, n) {
  return seededShuffle(arr).slice(0, n)
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function PhotoStrip({ base, count = 18 }) {
  const items = useMemo(() => {
    const picked = pickRandom(PHOTO_POOL, Math.min(count, PHOTO_POOL.length))
    return picked.map((slug) => ({
      src: `${base}strip/${slug}.jpg`,
      size: randomFrom(SIZE_BUCKETS),
      rotate: randomFrom(ROTATIONS),
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const doubled = [...items, ...items]

  return (
    <div className="strip-track" aria-hidden="true">
      {doubled.map(({ src, size, rotate }, i) => (
        <div
          key={i}
          className="strip-item"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          <img
            src={src}
            alt=""
            style={{ width: size.w, height: size.h }}
            className="strip-img"
            loading="eager"
          />
        </div>
      ))}
    </div>
  )
}

/* TitleCard — when href is provided (inner pages), renders as a link to homepage */
function TitleCard({ href = null }) {
  const inner = (
    <>
      <h1 className="font-serif font-normal leading-none tracking-tight text-slate-50 text-[2rem] sm:text-[3.5rem]">
        NORGE <em className="text-orange-400">på</em> LANGS
      </h1>
      <p className="font-sans font-medium text-xs sm:text-sm text-slate-400 mt-2 tracking-widest">
        med Montarou &amp; co
      </p>
    </>
  )

  if (href) {
    return (
      <a href={href} className="title-card" aria-label="Til forsiden" style={{ textDecoration: 'none', display: 'block' }}>
        {inner}
      </a>
    )
  }

  return (
    <div className="title-card">
      {inner}
    </div>
  )
}

/* ─── Hero (homepage) ─── */
export function HeroHeader({ base }) {
  return (
    <>
      <header className="hero-header">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${base}images/Velkommen.webp)` }}
          aria-hidden="true"
        />
        <div className="hero-overlay" aria-hidden="true" />

        {/* Photo strip — behind card */}
        <div className="strip-wrapper" aria-hidden="true">
          <PhotoStrip base={base} count={18} />
        </div>

        {/* Title card — pinned near the top */}
        <div className="hero-content">
          <TitleCard />
        </div>

        {/* Text block — bottom-anchored, lower third */}
        <div className="hero-text-block">
          <div className="hero-text-inner">
            <div className="hero-eyebrow">
              <span className="accent-bar" aria-hidden="true" />
              71°10′N → 57°58′N
            </div>
            <h2 className="hero-headline">Veien er målet.</h2>
            <p className="hero-subtext">
              Det å kunne se mot horisonten vitende om at bak den er en ny horisont,
              og bak den enda en, og tenke at «over den skal vi» blir et eventyr.
            </p>
            <div className="hero-buttons">
              <a href="#om-turen" className="btn-solid">Les historien</a>
              <a href={`${base}reiserute.html`} className="btn-outline">Se ruta</a>
            </div>
          </div>
        </div>
      </header>
      <SiteNav />
    </>
  )
}

/* ─── Inner page header (card + strip, no hero bg/text) ─── */
export function InnerHeader({ base, currentPage = '' }) {
  return (
    <>
      <header className="inner-header">
        <div className="strip-wrapper" aria-hidden="true">
          <PhotoStrip base={base} count={14} />
        </div>
        <div className="hero-content">
          <TitleCard href={`${base}index.html`} />
        </div>
      </header>
      <SiteNav currentPage={currentPage} />
    </>
  )
}

export default function SiteHeader({ variant = 'hero', currentPage = '' }) {
  const base = import.meta.env.BASE_URL
  return variant === 'compact'
    ? <InnerHeader base={base} currentPage={currentPage} />
    : <HeroHeader base={base} />
}
