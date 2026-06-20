import React, { useEffect } from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import { LETTERS } from '../../data/reisebrev.js'

// ─── Verbatim from 02-restored-static/index.html ────────────────────────────
const INGRESS =
  'Høsten 2008 setter to glade vandrere ut fra Nordkapp i håp om å nå helskinnet gjennom vår langsgående rute nedover Norges land. Ruta vil inneholde vidder, skoger og fjell kledd i nesten alle årstidene. Tidsperspektivet er ca seks måneder, tre før jul og tre etter.'

const VELKOMMEN = [
  'Hvorfor spør mange. Et stort spørsmål for noen, helt naturlig for andre. Er det en flukt fra hverdagen? En asketisk øvelse? En test eller en utfordring? En søken etter noe annet? En annerledes hverdag? Antageligvis litt av alle disse tingene, men fremfor alt handler det om å leve ute i og med naturen over tid. Ren glede over å være ute og bryne seg på naturens meny av utfordringer; holde varmen, bli mett, finne en god leirplass, eller få liv i bålet.',
  'Jeg legger på ingen måte skjul på at å legge vekk klokka, mobilen og universitetet er noe av poenget å komme nærmere noe vi stadig beveger oss bort fra i hverdagen. Hva dette noe er håper jeg å finne ut. Det vil i så fall bli publisert her!',
  'Viktig er det også å nevne at dette ikke er et rekordsforsøk. Snarere tvert imot. Her er veien målet. Det å kunne se mot horisonten vitende om at bak den er en ny horisont, og bak den enda en, og tenke at «over den skal vi» blir et eventyr.',
  'På denne siden vil vi prøve å holde deg oppdatert på hva som skjer, så du kan få med deg alt som går galt og glatt underveis.',
  'Før Norge på langs 08/09 skal jeg på en måneds kanotur i Nord-Finland. Det blir en glimrende innledning til livet i villmarken! Bilder fra denne turen vil også bli lagt ut på denne siden.',
]

// Last sentence of VELKOMMEN[2] — rendered as a featured ingress paragraph in its original position
const FEATURED = 'Vi legger bort vekkerklokka, timeplanen og de andre heftelsene som hører sivilisasjonen til og lar bekymringene dreie seg om å holde varmen, finne brensel, få ørret i gryta og tørke sokker.'

// URLs verified 2026-06-19. Dead/unverifiable flagged with comment.
const SPONSORS = [
  { name: 'XXL',                 file: 'XXL.jpg',           url: 'http://www.xxl.no/'                    },
  { name: 'Janus',               file: 'Janus.jpg',         url: 'http://www.janus.no/'                  },
  { name: 'Sportsbua',           file: 'sportsbua.jpg',     url: 'http://www.sportsbua.no/'              },
  { name: 'Helsport',            file: 'Helsport.jpg',      url: 'http://www.helsport.no/'               },
  { name: 'Cappelen',            file: 'Cappelen.jpg',      url: 'http://www.cappelendamm.no/'           },
  { name: 'Alfasko',             file: 'Alfasko.jpg',       url: 'https://www.alfa.no/'                  }, // rebranded to Alfa, new domain
  { name: 'Åsnes',               file: 'Asnes.jpg',         url: 'http://www.asnes.com/'                 },
  { name: 'Fjellpulken',         file: 'Fjellpulken.jpg',   url: 'https://www.fjellpulken.com/'          },
  { name: 'Rottefella',          file: 'rottefella.jpg',    url: 'https://www.rottefella.com/'           },
  { name: 'Amfibi',              file: 'amfibi.jpg',        url: 'http://www.amfibi.no/'                 },
  { name: 'Adidas',              file: 'adidaseyewear.jpg', url: 'https://www.adidas.com/eyewear'        }, // 403 is bot-detection, path updated to lowercase
  { name: 'MX Sport',            file: 'mxsport.jpg',       url: 'http://www.mx-sport.no/'               }, // original subpath /medlemmer/telemark/ 404; upgraded to root
  { name: 'Skaidi',              file: 'Skaidi.jpg',        url: 'http://www.skaidihotel.no/'            },
  { name: 'Breidablikk',         file: 'Breidablikk.jpg',   url: 'http://www.breidablikk.no/'            },
  { name: 'Lundhogda',           file: 'Lundhogda.jpg',     url: 'http://www.lundhogdacamping.no/'       },
  { name: 'Femund Fjellstue',    file: 'Femund.jpg',        url: 'http://www.femundfjellstue.no/'        },
  { name: 'Umbukta Fjellstue',   file: 'Umbukta.jpg',       url: 'http://www.umbuktafjellstue.no/'       },
  { name: 'Jule Ferie & Fritid', file: 'Jule.jpg',          url: null                                    }, // no current website — intentionally no link
  { name: 'Dokka Camping',       file: 'Dokkacamping.jpg',  url: 'http://www.dokkacamping.no/'           },
  { name: 'Gudbrandsdal Hotell', file: 'sgh.jpg',           url: 'http://www.sgh.no/'                    },
]

function RouteLine() {
  const DOTS = 15
  const W = 640
  const pad = 16
  const inner = W - pad * 2
  return (
    <svg
      viewBox={`0 0 ${W} 40`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[640px]"
      aria-hidden="true"
    >
      <line x1={pad} y1="20" x2={W - pad} y2="20" stroke="#fb923c" strokeWidth="1.5" strokeOpacity="0.2" />
      {Array.from({ length: DOTS }).map((_, i) => (
        <circle
          key={i}
          cx={pad + (inner / (DOTS - 1)) * i}
          cy="20"
          r="3"
          fill="#fb923c"
          fillOpacity="0.45"
        />
      ))}
      <circle cx={pad} cy="20" r="6" fill="#fb923c" />
      <circle cx={W - pad} cy="20" r="6" fill="#fb923c" />
    </svg>
  )
}

// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div id="hero">
        <SiteHeader variant="hero" />
      </div>

      {/* ── Om turen ────────────────────────────────────────────────────────── */}
      <section id="om-turen" className="pt-8 pb-14 md:pt-8 md:pb-24">
        <div className="max-w-content mx-auto px-6">
          <p className="font-serif text-[clamp(1.25rem,calc(3.5vw+0.5rem),1.5rem)] text-slate-200 leading-normal mb-8 text-pretty">{INGRESS}</p>
          <div className="space-y-5">
            {VELKOMMEN.slice(0, 3).map((para, i) => (
              <p key={i} className="font-sans text-[1.125rem] text-slate-300 leading-normal text-pretty">
                {para}
              </p>
            ))}
            <p className="font-serif text-[clamp(1.25rem,calc(3.5vw+0.5rem),1.5rem)] text-slate-200 leading-normal text-pretty">{FEATURED}</p>
            {VELKOMMEN.slice(3).map((para, i) => (
              <p key={i + 3} className="font-sans text-[1.125rem] text-slate-300 leading-normal text-pretty">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <img
              src={`${base}images/diverse/Signatur.webp`}
              alt="Marius Montarou"
              width={285}
              height={69}
            />
          </div>
        </div>
      </section>

      {/* ── Ruta ────────────────────────────────────────────────────────────── */}
      <section id="ruta" className="py-12 md:py-20">
        <div className="max-w-content mx-auto px-6">
          <p className="eyebrow mb-5">Ruta</p>
          <h2 className="font-serif text-[2.5rem] md:text-5xl leading-[0.95] text-slate-50 mb-6">
            15 etapper, <span className="text-orange-400">Nordkapp til Lindesnes.</span>
          </h2>
          <p className="section-description mb-10 text-pretty">
            Et halvt år til fots langs Norges ryggrad — fra Arctic Ocean-kapp til Skandinavias sydspiss.
            Gjennom vidder, skoger og fjell, i alle årstidene.
          </p>

          <div className="mb-10">
            <RouteLine />
            <div className="flex justify-between mt-2 max-w-[640px]">
              <span className="font-sans font-medium text-xs text-slate-600 uppercase tracking-widest">Nordkapp 71°10′N</span>
              <span className="font-sans font-medium text-xs text-slate-600 uppercase tracking-widest">Lindesnes 57°58′N</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 mb-10">
            {[
              { value: '2 500', unit: 'km'       },
              { value: '6',     unit: 'måneder'  },
              { value: '15',    unit: 'etapper'  },
            ].map(({ value, unit }) => (
              <div key={unit}>
                <p className="font-serif text-[2rem] md:text-[2.5rem] text-slate-50 leading-none">{value}</p>
                <p className="font-sans text-xs text-orange-400 mt-1 tracking-wider">{unit}</p>
              </div>
            ))}
          </div>

          <a href={`${base}reiserute.html`} className="btn-outline">Se hele ruta</a>
        </div>
      </section>

      {/* ── Reisebrev ───────────────────────────────────────────────────────── */}
      <section id="reisebrev" className="py-12 md:py-20">
        <div className="max-w-content mx-auto px-6">
          <p className="eyebrow mb-4">Reisebrev</p>
          <h2 className="font-serif text-[2.5rem] md:text-5xl leading-[0.95] text-slate-50 mb-10">
            Oppdateringer underveis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {LETTERS.map((letter) => (
              <a
                key={letter.n}
                href={`${base}reisebrev${letter.n}.html`}
                className="group block"
              >
                <div className="overflow-hidden rounded mb-4 aspect-[4/3]">
                  <img
                    src={`${base}images/reisebrev/${letter.img}`}
                    alt=""
                    className="reisebrev-cover-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="font-sans text-xs text-slate-500 tracking-wider mb-2">{letter.date}</p>
                <h3 className="font-serif text-xl leading-snug text-slate-100">
                  <span className="font-sans font-normal text-slate-500 mr-2">{String(letter.n).padStart(2, '0')}</span>
                  {letter.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsorer ───────────────────────────────────────────────────────── */}
      <section id="sponsorer" className="py-12 md:py-20">
        <div className="max-w-content mx-auto px-6">
          <h2 className="font-serif text-[2.5rem] md:text-5xl leading-[0.95] text-slate-50 mb-4">
            Sponsorer.
          </h2>
          <p className="section-description mb-10">
            Uten støtte fra sponsorene hadde ikke dette vært mulig.
          </p>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-6 mb-10">
            {SPONSORS.map(({ name, file, url }) => {
              const img = (
                <img
                  src={`${base}images/sponsors/${file}`}
                  alt={name}
                  className="sponsor-logo max-h-full w-auto max-w-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  style={{ mixBlendMode: 'screen' }}
                />
              )
              return url ? (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center h-16"
                  aria-label={name}
                >
                  {img}
                </a>
              ) : (
                <div key={name} className="group flex items-center justify-center h-16">
                  {img}
                </div>
              )
            })}
          </div>
          <div className="mt-4">
            <a href={`${base}sponsorer.html`} className="btn-outline">Les mer om sponsorene</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
