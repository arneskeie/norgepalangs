import React, { useState } from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'

// ─── Verbatim from 02-restored-static/reiserute.html ─────────────────────────
const INTRO = 'Turen starter fra Nordkapp 1. september og følger en variert rute sørover, fordelt på ca 15 etapper. Vi planlegger å nå Mo i Rana før vi unner oss en pust i bakken ved juletider. Turen fortsetter videre mot Lindesnes på vårparten.'

const NOTE = 'Som tidligere antatt er Saltfjellet slukt av vinteren tidlig i november. Vi har av erfaring (over Skjomenfjellene) lært at det ikke har noen hensikt å jobbe mot naturen. For å kunne fortsette til fots dro vi sørover til Hegra og gikk den siste høstetappen til Gressli. Når vi begynner på igjen med ski under beina i februar, vil vi starte nøyaktig der vi slapp i Nord-Norge, nærmere bestemt Lønsdal.'

const ETAPPER = [
  {
    nr: 1, slug: 'e01', sesong: 'høst',
    fra: 'Nordkapp', til: 'Skaidi',
    dager: 8, hvile: 1, km: 125,
    note: 'Her blir det prøving og feiling, og ikke minst tilvenning av kroppen til belastningen.',
  },
  {
    nr: 2, slug: 'e02', sesong: 'høst',
    fra: 'Skaidi', til: 'Kautokeino',
    dager: 12, hvile: 2, km: 220,
    note: 'Her må vi sette opp farten litt, komme skikkelig i gang med kilometerslukingen.',
  },
  {
    nr: 3, slug: 'e03', sesong: 'høst',
    fra: 'Kautokeino', til: 'Abisko / Narvik',
    dager: 12, hvile: 1, km: 250,
    note: 'Skikkelig lang etappe. Vi går innom Finland og Sverige på veien.',
  },
  {
    nr: 4, slug: 'e04', sesong: 'høst',
    fra: 'Narvik', til: 'Fauske / Sulitjelma',
    dager: 14, hvile: 2, km: 230,
    note: 'Ved Fauske venter resten av kartene ned til Meråker, samt et lass med Drytech-poser.',
  },
  {
    nr: 5, slug: 'e05', sesong: 'høst',
    fra: 'Sulitjelma', til: 'Lønsdal',
    dager: 8, hvile: 1, km: 90,
    note: 'Deilig etappe!',
  },
  {
    nr: 6, slug: 'e06', sesong: 'høst',
    fra: 'Hegra', til: 'Gressli',
    dager: 6, hvile: 1, km: 80,
    note: 'Vi drar sørover for å kunne fortsette ferden til fots. Meget naturskjønn og fin etappe.',
  },
  {
    nr: 7, slug: 'e07', sesong: 'vår',
    fra: 'Lønsdal', til: 'Umbukta',
    dager: 10, hvile: 2, km: 220,
    note: 'Fra Kjemåvatnet videre til Saltfjellstua gjennom steindalen.',
  },
  {
    nr: 8, slug: 'e08', sesong: 'vår',
    fra: 'Umbukta', til: 'Nordli',
    dager: 7, hvile: 1, km: 140,
    note: 'Ned Susendalen gjennom Børgefjell.',
  },
  {
    nr: 9, slug: 'e09', sesong: 'vår',
    fra: 'Sørli', til: 'Meråker',
    dager: 10, hvile: 2, km: 180,
    note: 'Mot Gressmøen, kanskje innom Holden.',
  },
  {
    nr: 10, slug: 'e10', sesong: 'vår',
    fra: 'Tydal (Gressli)', til: 'Elgå',
    dager: 7, hvile: 1, km: 120,
    note: 'Fra Tydal mot Kjølihytta, videre vest for eller over Aursunden.',
  },
  {
    nr: '11a', slug: 'e11', sesong: 'vår',
    fra: 'Elgå', til: 'Ringebu',
    dager: 8, hvile: 1, km: 140,
    note: 'Sør-vestover mot Otnes nord for Sølensjøen.',
  },
  {
    nr: '11b', slug: 'e11', sesong: 'vår',
    fra: 'Ringebu', til: 'Fagernes',
    dager: 4, hvile: 0, km: 90,
    note: 'Fra Ringebu mot Fagerhøi.',
  },
  {
    nr: 12, slug: 'e12', sesong: 'vår',
    fra: 'Fagernes', til: 'Geilo',
    dager: 5, hvile: 0, km: 120,
    note: 'Fra Fagernes mot Tisleia.',
  },
  {
    nr: 13, slug: 'e13', sesong: 'vår',
    fra: 'Ustaoset', til: 'Haukeliseter',
    dager: 8, hvile: 1, km: null,
    note: 'Ustaoset – Tuva – Heinsæter – Rauhellern – Sandhaug – Litlos – Hellevassbu – Haukeliseter.',
  },
  {
    nr: 14, slug: 'e14', sesong: 'vår',
    fra: 'Haukeliseter', til: 'Ljosland',
    dager: 10, hvile: 2, km: 170,
    note: 'Haukeliseter – Holmavasshytta – via Sloaros – Bossbu – Svartenut – Øyuvsbu – Gaukhei – Ljosland.',
  },
  {
    nr: 15, slug: 'e15', sesong: 'vår',
    fra: 'Ljosland', til: 'Lindesnes',
    dager: '5–6', hvile: 0, km: 140,
    note: 'Med kano fra Ljosland fjellstue, langs Monn, mot Øseral og Ørevatnet. Går til fots fra hhv Vigeland eller Mandal ut til fyret på Lindesnes.',
  },
]

const OPPVARMINGSTUR = {
  slug: 'opp',
  label: 'Oppvarmingstur',
  note: 'En måneds kanotur i Nord-Finland — innledning til livet i villmarken.',
}

function EtappeRow({ etappe, base, activeSlug, onToggle }) {
  const isOpen = activeSlug === etappe.slug + etappe.nr

  return (
    <div className="border-b border-white/[.06] last:border-0">
      <button
        className="w-full flex items-start gap-6 py-5 text-left hover:bg-white/[.02] transition-colors px-2 -mx-2 rounded"
        onClick={() => onToggle(etappe.slug + etappe.nr)}
        aria-expanded={isOpen}
      >
        <span className="font-sans text-xs text-slate-600 w-8 flex-shrink-0 pt-1">
          {String(etappe.nr).replace('a','').replace('b','b')}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-serif font-medium text-base text-slate-100">
            {etappe.fra} <span className="text-slate-500 font-sans text-sm">→</span> {etappe.til}
          </p>
          <p className="font-sans text-xs text-slate-500 mt-1">
            {etappe.dager} dager
            {etappe.hvile > 0 && ` · ${etappe.hvile} hvile`}
            {etappe.km && ` · ${etappe.km} km`}
          </p>
        </div>

        {/* Gallery thumbnails — hidden on small screens where they'd crowd the route name */}
        <div className="hidden sm:flex gap-2 flex-shrink-0">
          {[0,1,2].map((i) => (
            <img
              key={i}
              src={`${base}strip/${etappe.slug}_${i}.jpg`}
              alt=""
              className="w-12 h-9 object-cover rounded opacity-60"
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <div className="pb-6 pl-14 pr-2">
          <p className="font-sans text-sm text-slate-400 leading-relaxed mb-5">{etappe.note}</p>
          <div className="grid grid-cols-3 gap-2">
            {[0,1,2].map((i) => (
              <img
                key={i}
                src={`${base}strip/${etappe.slug}_${i}.jpg`}
                alt=""
                className="w-full aspect-[4/3] object-cover rounded border border-white/10"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Reiserute() {
  const base = import.meta.env.BASE_URL
  const [activeSlug, setActiveSlug] = useState(null)

  const toggle = (key) => setActiveSlug(activeSlug === key ? null : key)

  const hostEtapper = ETAPPER.filter((e) => e.sesong === 'høst')
  const varEtapper  = ETAPPER.filter((e) => e.sesong === 'vår')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="reiserute.html" />
      <main className="max-w-content mx-auto px-6 py-12 md:py-20">

        <p className="eyebrow mb-4">Reiserute & galleri</p>
        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-6">
          71°10′N → 57°58′N
        </h1>
        <p className="font-sans text-[1.5rem] text-slate-300 leading-normal max-w-[640px] mb-4">{INTRO}</p>

        {/* Route note */}
        <div className="border-l-2 border-orange-400/30 pl-5 mb-16 max-w-[640px]">
          <p className="font-sans text-[1.125rem] text-slate-500 leading-normal italic">{NOTE}</p>
        </div>

        {/* Oppvarmingstur */}
        <div className="mb-12">
          <p className="eyebrow mb-6">Oppvarmingstur</p>
          <div className="flex items-start gap-6 py-4 border-b border-white/[.06]">
            <span className="font-sans text-xs text-slate-600 w-8 flex-shrink-0 pt-1">—</span>
            <div className="flex-1">
              <p className="font-serif font-medium text-base text-slate-100">Nord-Finland (kanotur)</p>
              <p className="font-sans text-sm text-slate-400 mt-1 leading-relaxed">{OPPVARMINGSTUR.note}</p>
            </div>
            <div className="hidden sm:flex gap-2 flex-shrink-0">
              {[0,1,2].map((i) => (
                <img key={i} src={`${base}strip/opp_${i}.jpg`} alt="" className="w-12 h-9 object-cover rounded opacity-60" />
              ))}
            </div>
          </div>
        </div>

        {/* Høst */}
        <div className="mb-12">
          <p className="eyebrow mb-6">Høst-etapper</p>
          <div>
            {hostEtapper.map((e) => (
              <EtappeRow key={e.slug + e.nr} etappe={e} base={base} activeSlug={activeSlug} onToggle={toggle} />
            ))}
          </div>
        </div>

        {/* Vår */}
        <div>
          <p className="eyebrow mb-6">Vår-etapper</p>
          <div>
            {varEtapper.map((e) => (
              <EtappeRow key={e.slug + e.nr} etappe={e} base={base} activeSlug={activeSlug} onToggle={toggle} />
            ))}
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  )
}
