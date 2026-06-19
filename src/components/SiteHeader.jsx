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

function seededShuffle(arr, seed) {
  // Simple deterministic-ish shuffle using Math.random seeded at component init
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// Pick `n` random items from array, non-repeating
function pickRandom(arr, n) {
  const shuffled = seededShuffle(arr)
  return shuffled.slice(0, n)
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function PhotoStrip({ base, count = 18 }) {
  // Randomize on every page load — useMemo with no deps = stable per mount
  const items = useMemo(() => {
    const picked = pickRandom(PHOTO_POOL, Math.min(count, PHOTO_POOL.length))
    return picked.map((slug) => ({
      src: `${base}strip/${slug}.jpg`,
      size: randomFrom(SIZE_BUCKETS),
      rotate: randomFrom(ROTATIONS),
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Double for seamless loop
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

function TitleCard({ size = 'lg' }) {
  return (
    <div className={size === 'lg' ? 'title-card' : 'title-card-compact'}>
      <h1 className={`font-serif font-normal leading-none tracking-tight text-slate-50 ${
        size === 'lg' ? 'text-[1.875rem] sm:text-[3.5rem]' : 'text-2xl sm:text-3xl'
      }`}>
        NORGE <em className="text-orange-400">på</em> LANGS
      </h1>
      <p className="font-mono text-xs sm:text-sm text-slate-400 mt-1.5 sm:mt-2 tracking-widest">
        med Montarou &amp; co
      </p>
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
          style={{ backgroundImage: `url(${base}images/Velkommen.jpg)` }}
          aria-hidden="true"
        />
        <div className="hero-overlay" aria-hidden="true" />

        {/* Photo strip — behind card */}
        <div className="strip-wrapper" aria-hidden="true">
          <PhotoStrip base={base} count={18} />
        </div>

        {/* Title card — pinned near the top */}
        <div className="hero-content">
          <TitleCard size="lg" />
        </div>

        {/* Text block — bottom-anchored, lower third */}
        <div className="hero-text-block">
          <div className="hero-text-inner">
            <div className="hero-eyebrow">
              <span className="accent-bar" aria-hidden="true" />
              71°10′N → 57°58′N
            </div>
            <h2 className="hero-headline">Veien er <span className="hero-headline-accent">målet.</span></h2>
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

/* ─── Compact masthead (inner pages) ─── */
export function CompactHeader({ base, currentPage = '' }) {
  return (
    <>
      <header className="compact-header">
        <div className="compact-strip-wrapper" aria-hidden="true">
          <PhotoStrip base={base} count={14} />
        </div>

        <div className="compact-inner">
          <a href={`${base}index.html`} className="compact-card" aria-label="Til forsiden">
            <span className="font-serif text-2xl font-normal leading-none text-slate-50">
              NORGE <em className="text-orange-400">på</em> LANGS
            </span>
            <span className="font-mono text-xs text-slate-400 ml-4 tracking-widest hidden sm:inline">
              med Montarou &amp; co
            </span>
          </a>
        </div>
      </header>
      <SiteNav currentPage={currentPage} />
    </>
  )
}

export default function SiteHeader({ variant = 'hero', currentPage = '' }) {
  const base = import.meta.env.BASE_URL
  return variant === 'compact'
    ? <CompactHeader base={base} currentPage={currentPage} />
    : <HeroHeader base={base} />
}
