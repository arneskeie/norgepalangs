import React, { useState } from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import BottomSheet from '../../components/BottomSheet.jsx'
import SheetContent from '../../components/SheetContent.jsx'
import NorwayMap from '../../components/NorwayMap.jsx'
import { PEOPLE } from '../../data/people.js'

// ─── Text from 01-original-php/Reiserute.php (authoritative) ─────────────────
// 02-restored-static/reiserute.html has severely truncated notes (Wayback capture);
// the full etappe notes were restored from the PHP source in Batch 1 (2026-06-21).

const INTRO = 'Turen starter fra Nordkapp 1. september og følger en variert rute sørover, fordelt på ca 15 etapper. Vi planlegger å nå Mo i Rana før vi unner oss en pust i bakken ved juletider. Turen fortsetter videre mot Lindesnes på vårparten.'


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
    note: 'Deilig etappe! Ikke like stort forflytningspress på denne etappen. Som tidligere antatt er Saltfjellet slukt av vinteren tidlig i november. Vi har av erfaring (over Skjomenfjellene) lært at det ikke har noen hensikt å jobbe mot naturen. For å kunne fortsette til fots dro vi sørover til Hegra og gikk den siste høstetappen til Gressli. Når vi begynner på igjen med ski under beina i februar, vil vi starte nøyaktig der vi slapp i Nord-Norge, nærmere bestemt Lønsdal.',
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

// ─── Participant cross-reference ──────────────────────────────────────────────

function canonicalLabel(e) {
  if (e.nr === '11a') return `Etappe 11 del I: ${e.fra} – ${e.til}`
  if (e.nr === '11b') return `Etappe 11 del II: ${e.fra} – ${e.til}`
  return `Etappe ${e.nr}: ${e.fra} – ${e.til}`
}

function getParticipants(etappe) {
  const canonical = canonicalLabel(etappe)
  const nr = typeof etappe.nr === 'number' ? etappe.nr : null
  return PEOPLE.filter((person) =>
    person.etapper.some((e) => {
      if (e === 'Hele turen') return true
      // Emil walked E1-4 as a range
      if (e === 'Etappe 1–4: Nordkapp – Fauske' && nr !== null && nr >= 1 && nr <= 4) return true
      return e === canonical
    })
  )
}

function getOppParticipants() {
  return PEOPLE.filter((p) => p.etapper.some((e) => e === 'Oppvarmingstur i Finland' || e === 'Hele turen'))
}

function getGalleriId(etappe, isOpp = false) {
  if (isOpp) return 'oppvarmingstur'
  const nr = etappe.nr
  if (nr === '11a' || nr === '11b') return 'etappe11'
  return `etappe${nr}`
}

function getReisebrevNr(etappe) {
  const nr = etappe.nr
  return typeof nr === 'number' && nr >= 1 && nr <= 6 ? nr : null
}

// ─── Timeline components ──────────────────────────────────────────────────────

function PersonSheetSubtitle({ etapper }) {
  return (
    <>
      {etapper.map((e, i) => (
        <React.Fragment key={e}>
          {i > 0 && <br />}
          <span className="tracking-[0.1em]">{e}</span>
        </React.Fragment>
      ))}
    </>
  )
}

function ParticipantList({ people, base, onSelectPerson }) {
  if (!people.length) return null
  return (
    <div className="flex flex-wrap gap-3">
      {people.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelectPerson(p)}
          className="flex items-center gap-2 rounded-full pl-1 pr-4 py-1 hover:bg-white/[.06] transition-colors"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={`${base}images/profiles/${p.id}.jpg`}
              alt={p.name}
              className="w-full h-full object-cover scale-[1.15]"
            />
          </div>
          <span className="font-sans text-base text-slate-500">
            {p.name.split(' ')[0]}
          </span>
        </button>
      ))}
    </div>
  )
}

function EtappeContent({ etappe, participants, base, onSelectPerson, isOpp = false }) {
  const statParts = []
  if (!isOpp) {
    if (etappe.dager) statParts.push(`${etappe.dager} dager`)
    if (etappe.hvile > 0) statParts.push(`${etappe.hvile} hvile`)
    if (etappe.km) statParts.push(`${etappe.km} km`)
  }

  const label = isOpp
    ? 'Nord-Finland (kanotur)'
    : `${etappe.fra} – ${etappe.til}`

  const eyebrow = isOpp
    ? 'Oppvarmingstur'
    : (etappe.nr === '11a' ? 'Etappe 11 del I'
      : etappe.nr === '11b' ? 'Etappe 11 del II'
      : `Etappe ${etappe.nr}`)

  const galleriId = getGalleriId(etappe, isOpp)
  const reisebrevNr = isOpp ? null : getReisebrevNr(etappe)

  return (
    <div className="pl-7 pb-10">
      <p className="font-sans font-medium text-xs uppercase tracking-widest text-orange-400 mb-1">
        {eyebrow}
      </p>
      <h3 className="card-title text-slate-100 mb-1">
        {label}
      </h3>
      {statParts.length > 0 && (
        <p className="font-sans text-xs text-slate-600 mb-3">
          {statParts.join(' · ')}
        </p>
      )}
      <p className="font-sans text-base text-slate-50 leading-relaxed text-pretty">
        {etappe.note}
      </p>
      <div className="flex flex-col gap-4 mt-4">
        <ParticipantList people={participants} base={base} onSelectPerson={onSelectPerson} />
        <div className="flex flex-row items-center gap-4 flex-shrink-0">
          {reisebrevNr && (
            <a
              href={`${base}reisebrev${reisebrevNr}.html`}
              className="font-sans text-base text-slate-500 hover:text-slate-200 transition-colors"
            >
              Les reisebrev →
            </a>
          )}
          <a
            href={`${base}galleri.html#${galleriId}`}
            className="font-sans text-base text-slate-500 hover:text-slate-200 transition-colors"
          >
            Se bilder →
          </a>
        </div>
      </div>
    </div>
  )
}

// Waypoint dot + town label (shown between etappes).
// The dot is absolutely positioned at left-3 (12px) and centered via -translate-x-1/2.
// Container uses pl-7 (28px) so content starts 16px to the right of the line.
function Waypoint({ name, isStart = false, isEnd = false, isResumption = false, coords = null }) {
  return (
    <div className="relative flex items-center gap-3 mb-6 pl-7">
      <div
        className={`absolute left-3 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0 rounded-full ring-2 ring-slate-950 z-10 ${
          isStart || isEnd
            ? 'w-5 h-5 bg-orange-400'
            : isResumption
            ? 'w-4 h-4 bg-orange-400/60'
            : 'w-3 h-3 bg-orange-400/40'
        }`}
      />
      <div>
        <span className={`font-sans text-xs uppercase tracking-widest ${
          isStart || isEnd ? 'text-slate-300' : 'text-slate-500'
        }`}>
          {name}
          {coords && <span className="text-slate-600 ml-2">{coords}</span>}
        </span>
        {isResumption && (
          <span className="ml-3 font-sans text-xs text-orange-400/60 italic">
            — oppstart vår-etapper
          </span>
        )}
      </div>
    </div>
  )
}

// Season divider / label
function SeasonDivider({ label }) {
  return (
    <div className="mb-8 pl-7">
      <p className="eyebrow text-slate-600">{label}</p>
    </div>
  )
}

export default function Reiserute() {
  const base = import.meta.env.BASE_URL
  const [selectedPerson, setSelectedPerson] = useState(null)

  const hostEtapper = ETAPPER.filter((e) => e.sesong === 'høst')
  const varEtapper  = ETAPPER.filter((e) => e.sesong === 'vår')

  const oppParticipants = getOppParticipants()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="reiserute.html" />
      <main className="max-w-content mx-auto px-6 py-12 md:py-20">

        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-6">
          Reiserute
        </h1>

        {/* Two-column layout: 560px left (intro + timeline) + sticky map right.
            Mobile: single column, map at 50% size (160px) between intro and timeline.
            Breakpoint: 960px = 560px left + 352px right (320px map + 32px padding) + 48px outer padding. */}
        <div className="reiserute-layout">

          {/* LEFT COLUMN: always visible */}
          <div className="reiserute-left">
            <p className="section-description mb-8 text-pretty">{INTRO}</p>

            {/* Mobile map: 50% of desktop width (160px), hidden above 960px breakpoint */}
            <div className="reiserute-map-mobile">
              <NorwayMap />
            </div>

            {/* ─── Vertical timeline ─── */}
            <div className="relative">
              {/* Continuous vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-[1.5px] bg-orange-400/15" aria-hidden="true" />

              {/* Oppvarmingstur — above the main høst/vår timeline */}
              <SeasonDivider label="Oppvarmingstur" />
              <Waypoint name="Nord-Finland" />
              <EtappeContent
                etappe={OPPVARMINGSTUR}
                participants={oppParticipants}
                base={base}
                onSelectPerson={setSelectedPerson}
                isOpp
              />

              {/* Høst-etapper */}
              <SeasonDivider label="Høst-etapper 2008" />
              <Waypoint name="Nordkapp" coords="71°10′N" isStart />

              {hostEtapper.map((e) => {
                const participants = getParticipants(e)
                return (
                  <React.Fragment key={e.slug + e.nr}>
                    <EtappeContent etappe={e} participants={participants} base={base} onSelectPerson={setSelectedPerson} />
                    <Waypoint name={e.til} />
                  </React.Fragment>
                )
              })}

              {/* Vår-etapper — resume from Lønsdal */}
              <SeasonDivider label="Vår-etapper 2009" />
              <Waypoint name="Lønsdal" isResumption />

              {varEtapper.map((e) => {
                const participants = getParticipants(e)
                return (
                  <React.Fragment key={e.slug + e.nr}>
                    <EtappeContent etappe={e} participants={participants} base={base} onSelectPerson={setSelectedPerson} />
                    {e.nr === 15 ? (
                      <Waypoint name="Lindesnes" coords="57°58′N" isEnd />
                    ) : (
                      <Waypoint name={e.til} />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: desktop only — map sticky-centered in viewport */}
          <div className="reiserute-right" aria-hidden="true">
            <div className="reiserute-map-sticky">
              <NorwayMap />
            </div>
          </div>

        </div>

      </main>
      <SiteFooter />

      <BottomSheet
        open={selectedPerson !== null}
        onOpenChange={(open) => { if (!open) setSelectedPerson(null) }}
        ariaLabel={selectedPerson?.name ?? 'Person'}
      >
        {selectedPerson && (
          <SheetContent
            layout="profile"
            image={`${base}images/profiles/${selectedPerson.id}.jpg`}
            subtitle={<PersonSheetSubtitle etapper={selectedPerson.etapper} />}
            title={selectedPerson.name}
            meta={[
              { label: 'Alder', value: selectedPerson.alder },
              { label: 'Oppvokst i', value: selectedPerson.oppvokst },
              { label: 'Studerer', value: selectedPerson.studerer },
            ]}
            body={
              <div className="space-y-4">
                {selectedPerson.bio.map((para, i) => (
                  <p key={i} className="font-sans text-[1.125rem] text-slate-300 leading-normal text-pretty">{para}</p>
                ))}
              </div>
            }
          />
        )}
      </BottomSheet>
    </div>
  )
}
