import React, { useState } from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'

// ─── Text from 01-original-php/Reiserute.php (authoritative) ─────────────────
// 02-restored-static/reiserute.html has severely truncated notes (Wayback capture);
// the full etappe notes were restored from the PHP source in Batch 1 (2026-06-21).
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
    note: 'Her må vi sette opp farten litt, komme skikkelig i gang med kilometerslukingen. Rutinene bør være på plass på denne etappen.',
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
    note: 'Ved Fauske venter resten av kartene ned til Meråker, samt et lass med Drytech-poser. Det siste depotet, evt de to siste, sendes ut fra Fauske. De neste etappene er gjenstand for diskusjon.',
  },
  {
    nr: 5, slug: 'e05', sesong: 'høst',
    fra: 'Sulitjelma', til: 'Lønsdal',
    dager: 8, hvile: 1, km: 90,
    note: 'Deilig etappe! Ikke like stort forflytningspress på denne etappen.',
  },
  {
    nr: 6, slug: 'e06', sesong: 'høst',
    fra: 'Hegra', til: 'Gressli',
    dager: 6, hvile: 1, km: 80,
    note: 'Vi drar sørover for å kunne fortsette ferden til fots. Meget naturskjønn og fin etappe. Vi avslutter høsten med ekstra store frokostrasjoner og ekstra sjokolade!',
  },
  {
    nr: 7, slug: 'e07', sesong: 'vår',
    fra: 'Lønsdal', til: 'Umbukta',
    dager: 10, hvile: 2, km: 220,
    note: 'Fra Kjemåvatnet videre til Saltfjellstua gjennom steindalen. Sørover, krysser E6 litt øst for Bjølånes. Sørover mot Kallvatnet. Kanskje innom Sauvasshytta. Videre mot Umbukta Fjellstue. Gressvasshytta. Sørover øst for Oksskolten mot Stekvasselv gjestegård og N-å-enden av Røssvatnet. Langs Røssvatnet helt til sørenden. Herfra inn til Hattfjelldal. Dette er startetappen og vi har litt dårlig tid på denne. Det er langt! Vær og føre avgjør om det går bra.',
  },
  {
    nr: 8, slug: 'e08', sesong: 'vår',
    fra: 'Umbukta', til: 'Nordli',
    dager: 7, hvile: 1, km: 140,
    note: 'Ned Susendalen gjennom Børgefjell (kanskje via Bøttjønnhytta). Ned i Viermadalen og Namsvatnet. Mot Røyrvik. Følger Limingen sørover. Passerer øst for Havdalsvatnet. Mot Nordli. Buss fra Nordli til Sørli.',
  },
  {
    nr: 9, slug: 'e09', sesong: 'vår',
    fra: 'Sørli', til: 'Meråker',
    dager: 10, hvile: 2, km: 180,
    note: 'Mot Gressmøen, kanskje innom Holden, Bringsenhytta, Innstua, Ferslia, Angeltjønnhytta, Kopperå.',
  },
  {
    nr: 10, slug: 'e10', sesong: 'vår',
    fra: 'Tydal (Gressli)', til: 'Elgå',
    dager: 7, hvile: 1, km: 120,
    note: 'Fra Tydal mot Kjølihytta, videre vest for eller over Aursunden. Sørover vest for Feragen. Mot nordenden av Femunden, langs østsiden ned til Elgå.',
  },
  {
    nr: '11a', slug: 'e11', sesong: 'vår',
    fra: 'Elgå', til: 'Ringebu',
    dager: 8, hvile: 1, km: 140,
    note: 'Sør-vestover mot Otnes nord for Sølensjøen. Krysser Rv 30 ved Søre Hårset. Videre mot Atna, krysse E3 her. Mot Ringebu, passerer sør for Skjerdingen Høyfjellshotell.',
  },
  {
    nr: '11b', slug: 'e11', sesong: 'vår',
    fra: 'Ringebu', til: 'Fagernes',
    dager: 4, hvile: 0, km: 90,
    note: 'Fra Ringebu mot Fagerhøi, kanskje innom Fagerhøi leirskole. Krysser Rv 255 ved Svatsum. Videre innom Svarthamarhytta. Ned til Fagernes.',
  },
  {
    nr: 12, slug: 'e12', sesong: 'vår',
    fra: 'Fagernes', til: 'Geilo',
    dager: 5, hvile: 0, km: 120,
    note: 'Fra Fagernes mot Tisleia, kanskje innom Golsfjell fjellstue. Passerer nordvest for Vassfjorden ned til Hol. Muligens langs veien herfra til Geilo.',
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
    note: 'Haukeliseter – Holmavasshytta – via Sloaros – sørover øst for store Førsvatn og Ormsavatnet. Ned til Vassdalstjønn, via Hovatn mot Kringlevatn. Bossbu – Svartenut – Øyuvsbu – Gaukhei – Ljosland. Dersom det er tidlig vårløsning, kan man kanskje gå til fots på østsiden av Setesdalen. Naturen bestemmer. Hvis føret tillater det, blir ruta lagt mer direkte nord – sør.',
  },
  {
    nr: 15, slug: 'e15', sesong: 'vår',
    fra: 'Ljosland', til: 'Lindesnes',
    dager: '5–6', hvile: 0, km: 140,
    note: 'Med kano fra Ljosland fjellstue, langs Monn, mot Øseral og Ørevatnet. Sørover i enten Audna eller Mandalselva, vannforhold avgjør. Går til fots fra hhv Vigeland eller Mandal ut til fyret på Lindesnes. Tror jeg vil ha denne etappen alene. Denne koseetappen går jeg forhåpentligvis i slutten av mai. Viktig å ikke stresse på denne etappen!',
  },
]

const OPPVARMINGSTUR = {
  slug: 'opp',
  label: 'Oppvarmingstur',
  note: 'En måneds kanotur i Nord-Finland — innledning til livet i villmarken.',
}

// ─── Verbatim from 02-restored-static/videogalleri.html ──────────────────────
const VIDEOS = [
  { id: '5An_8LozHB0', title: 'Fjernsynskjøkkenet, Episode 1', subtitle: 'Idag: hjemmelaget brød' },
  { id: 'ez5pVtzbmIg', title: 'Ronny og storørreten', subtitle: 'Kilosørret på kroken' },
  { id: 'WmM8az1Ql14', title: 'Fjernsynskjøkkenet, Episode 2', subtitle: 'Idag: pannekaker og camp-utsikt' },
  { id: 'K7v6iB05Ofw', title: 'Kampen med Storgjedda', subtitle: 'Montarou drar i land et smakfullt udyr' },
  { id: 'lkf7TvXuDIU', title: 'Nestenkanovelt', subtitle: 'Farlig nær katastrofe' },
  { id: '3JrKnijl7wA', title: 'Status dag 7', subtitle: 'Truls presenterer ukesrapport' },
]

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
          <p className="font-sans text-sm text-slate-400 leading-relaxed mb-5 text-pretty">{etappe.note}</p>
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

        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-6">
          Reiserute & galleri
        </h1>
        <p className="section-description mb-4 text-pretty">{INTRO}</p>

        {/* Route note */}
        <div className="border-l-2 border-orange-400/30 pl-5 mb-16 max-w-[640px]">
          <p className="font-sans text-[1.125rem] text-slate-500 leading-normal italic text-pretty">{NOTE}</p>
        </div>

        {/* Oppvarmingstur */}
        <div className="mb-12">
          <p className="eyebrow mb-6">Oppvarmingstur</p>
          <div className="flex items-start gap-6 py-4 border-b border-white/[.06]">
            <span className="font-sans text-xs text-slate-600 w-8 flex-shrink-0 pt-1">—</span>
            <div className="flex-1">
              <p className="font-serif font-medium text-base text-slate-100">Nord-Finland (kanotur)</p>
              <p className="font-sans text-sm text-slate-400 mt-1 leading-relaxed text-pretty">{OPPVARMINGSTUR.note}</p>
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

        {/* Video gallery */}
        <div className="mt-20 pt-16 border-t border-white/[.06]">
          <p className="eyebrow mb-6">Video</p>
          <h2 className="font-serif text-[2rem] md:text-[2.5rem] text-slate-50 leading-tight mb-10">
            Videogalleri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((video) => (
              <div key={video.id}>
                <div className="relative w-full aspect-video overflow-hidden rounded">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                <h3 className="font-serif text-base text-slate-100 mt-3 mb-1">{video.title}</h3>
                <p className="font-sans text-sm text-slate-500">{video.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  )
}
