import React, { useState } from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'

// ─── Verbatim from 02-restored-static/utstyr.html ────────────────────────────
const INTRO = 'For å kunne gjennomføre prosjektet kreves produkter som ikke svikter under kontinuerlig og hard bruk. Alle produktene vi bruker er vi helt avhengige av at fungerer som de skal, når de skal. Dette stiller store krav til de produktene og produsentene vi velger å stole på. Alle produktene, med noen få unntak, har jeg mye personlig erfaring med. Gjennom deltidsjobben på XXL og tidligere jobb i Sport 1-butikk, samt en etter hvert betydelig porsjon turerfaring, har jeg en viss oversikt over hva som finnes på markedet og hva som fungerer. Dermed er lite overlatt til tilfeldighetene hva angår valg av utstyr.'

const CATEGORIES = [
  {
    id: 'kjokken',
    label: 'Kjøkkenhjørnet',
    items: [
      'Trangia Hard Anodized Ultralight 25-8 stormkjøkken',
      'Optimus Nova+ brenner ladd med parafin',
      'Trangia brenselsflaske 1L',
      'Sarek termos',
      'Tallrikslåda',
      'Quechua alu. drikkeflaske',
      'Nalgene Lexanflaske med thermocover',
    ],
  },
  {
    id: 'bekledning',
    label: 'Bekledning',
    items: [
      'Lowe Alpine Multitasker Pro Balaclava',
      'Norrøna Nansen Yttervotter',
      'Innervotter Tovet (Irene Bakken)',
      'Pelslue av Bisam',
      'Helsport Fimbul Shell Jakke og Bukse',
      'Helsport Fimbul Down Expedition',
      'Norrøna Trollveggen Gore-Tex Gamasjer',
      'Janus Ekstra',
      'Janus IRIS',
      'Janus Design Wool',
      'Janus balaclava',
      'Janus hals',
      'Janus sokker',
      'Sasta Ullsokker',
      'Aclima Woolnet trøye og longs (netting)',
    ],
  },
  {
    id: 'bolig',
    label: 'Bolig & Sovepose',
    items: [
      'Helsport Fjellheimen 3 Camp (sommer)',
      'Helsport Svalbard (vinter)',
      'Ajungilak Future Winter',
      'Ajungilak Tyin 5-season',
      'Bamse Extreme liggeunderlag',
      'Therm-a-Rest Ridge Deluxe liggeunderlag',
    ],
  },
  {
    id: 'diverse',
    label: 'Diverse',
    items: [
      'Norrøna Recon Pack 125 liter rammesekk',
      'Sea to Summit kartmappe large',
      'Sea to Summit Drybag 8L & 35L',
      'ALLY 16,5′ DR kano',
      'Silva Helios stormtenner',
      'Ajungilak Bivouac Boots',
      'Rottefella Snøspade',
      'Ortovox 320 søkestang',
      'Adidas Evil Eye Explorer L',
      'ID2 goggles',
      'Alfa Bever Pro Grip+',
      'Buck Øks',
      'Buck diamantbryne',
      'Helle Fjellkniven',
      'Petzl Tikka Plus hodelykt',
      'Silva Expedition 15 kompass',
      'Kart: 1 : 50 000 (M711)',
    ],
  },
  {
    id: 'fiske',
    label: 'Fiske',
    items: [
      'Berkley Lightning IM6 8′ 3–15g stang med Cardinal 101F snelle med veske og 270m 0,12 Fireline',
      'Fisker mest med spesialsluker (12 grams) eller mark',
    ],
  },
  {
    id: 'elektronikk',
    label: 'Elektronikk',
    items: [
      'Fujifilm Finepix S 5600',
      'Canon MD110 DV-Kamera',
      'Magellan eXplorist 500 LE GPS',
      'SILVA Solar II Solcelle',
      'SPOT Satellite Personal Tracker',
    ],
  },
  {
    id: 'ski',
    label: 'Skiutstyr',
    items: [
      'Åsnes Amundsen Fjellski med kortfellelås',
      'Crispi Sydpolen 75mm Skistøvler',
      'Rottefella Super Telemark m/wire, oppbygningsplater og hælløfter',
      'Swix Extreme Composite skistaver',
      'Åsnes Nansen 2-delt stav (sammenleggbare reservestaver)',
      'Fjellpulken Ekspedisjon 168 med forsterket ekspedisjonsdrag og ekspedisjonssele',
    ],
  },
]

function CategorySection({ cat, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/[.06]">
      <button
        className="w-full flex items-center justify-between py-5 text-left hover:bg-white/[.02] transition-colors px-2 -mx-2 rounded"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-serif font-medium text-[1.5rem] text-slate-100">{cat.label}</span>
        <span className="font-sans text-xs text-slate-600">
          {cat.items.length} gjenstander {isOpen ? '↑' : '↓'}
        </span>
      </button>
      {isOpen && (
        <ul className="pb-6 pl-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {cat.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="text-orange-400/60 mt-1.5 flex-shrink-0 text-xs">—</span>
              <span className="font-sans text-sm text-slate-300 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Utstyr() {
  const [open, setOpen] = useState(new Set(['kjokken']))

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (open.size === CATEGORIES.length) {
      setOpen(new Set())
    } else {
      setOpen(new Set(CATEGORIES.map((c) => c.id)))
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="utstyr.html" />
      <main className="max-w-content mx-auto px-6 py-12 md:py-20">

        <p className="eyebrow mb-4">Utstyr</p>
        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-6">
          Det vi stolte på.
        </h1>
        <p className="font-sans text-[1.5rem] text-slate-400 leading-normal max-w-[640px] mb-4">{INTRO}</p>

        <div className="flex justify-end mb-6">
          <button
            onClick={toggleAll}
            className="btn-outline"
          >
            {open.size === CATEGORIES.length ? 'Lukk alle' : 'Åpne alle'}
          </button>
        </div>

        <div>
          {CATEGORIES.map((cat) => (
            <CategorySection
              key={cat.id}
              cat={cat}
              isOpen={open.has(cat.id)}
              onToggle={() => toggle(cat.id)}
            />
          ))}
        </div>

      </main>
      <SiteFooter />
    </div>
  )
}
