import React from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'

// ─── Verbatim from 02-restored-static/sponsorer.html ─────────────────────────

const INTRO = 'Uten støtte fra våre sponsorer hadde vi ikke klart å mestre de økonomiske utfordringene til denne turen! For å realisere dette prosjektet har vi fått flere bedrifter med på laget. Jeg vil gjerne rette en stor personlig takk til Anders Fjeld i XXL og Arne Fonneland hos Janus!'

const UTSTYR = [
  {
    name: 'XXL',
    file: 'XXL.jpg',
    url: 'http://www.xxl.no/',
    desc: 'XXL Sport og Villmark AS tilbyr utstyr til samtlige sports- og fritidsgrener, og har Norges største sportsbutikk på internett. XXL er vår hovedsponsor og har gitt oss spesialrabatt på mye nytt utstyr som trengs på turen! Vi er hjertelig takknemlige!',
  },
  {
    name: 'Janus',
    file: 'Janus.jpg',
    url: 'http://www.janus.no/',
    desc: 'Janusfabrikken AS er blant Europas ledende produsenter av undertøy og sokker for barn og voksne. Janus har bidratt med undertøy, sokker og balaclava etter mitt ønske. Stor takk til Janus for knallbra ullbekledning av forskjellig slag!',
  },
  {
    name: 'Sportsbua',
    file: 'sportsbua.jpg',
    url: null, // dead — connection refused (re-verified 2026-06-21)
    desc: 'Sportsbua åpnet første gang for 27 år siden som en liten bruktbutikk. De har siden det utviklet seg til å bli en av midt-norges ledende nisjebutikker innen sport- og friluftsutstyr. Sportsbua har sponset meg med den svært viktige SPOT Satellite Personal Tracker! Tusen takk for dette viktige bidraget.',
  },
  {
    name: 'Helsport',
    file: 'Helsport.jpg',
    url: 'http://www.helsport.no/',
    desc: 'Helsport er i dag skandinavias ledende teltprodusent. Helsport har gitt meg halv pris på klær og utstyr. Ved siden av har jeg et samarbeidsprosjekt med Helsport om kondens og ventilasjonssystemer i telt. Vi er stolte av å ha Helsport som sponsor!',
  },
  {
    name: 'Cappelen Damm',
    file: 'Cappelen.jpg',
    url: 'http://www.cappelendamm.no/',
    desc: 'Cappelen Damm AS omfatter bokhandel, bokklubber, distribusjon og forlagsvirksomhet innenfor et bredt utvalg titler i alle sjangrer. Cappelen Damm AS har gitt meg 40% på kart til turen. Vi takker Cappelen Damm for støtten.',
  },
  {
    name: 'Alfa',
    file: 'Alfasko.jpg',
    url: 'https://www.alfa.no/',
    desc: 'Alfa har utviklet sko til ulike formål i over 76 år, blant annet for ekstrembrukere på polferder, samt på ekspedisjoner i alle verdens hjørner. Alfa har gitt meg ypperlig skotøy av type Bever Pro Grip+, som jeg er meget takknemlig for og fornøyd med.',
  },
  {
    name: 'Åsnes',
    file: 'Asnes.jpg',
    url: 'http://www.asnes.com/',
    desc: 'Åsnes har stått for stor skiglede gjennom kvalitetsprodukter siden 1922. Åsnes (Skigutane) har bidratt med fritt valg av ski. Valget falt til slutt på den klassiske ekspedisjonsskien Åsnes Amundsen. Tusen takk for svært viktig støtte på turen!',
  },
  {
    name: 'Fjellpulken',
    file: 'Fjellpulken.jpg',
    url: 'https://www.fjellpulken.com/',
    desc: 'Fjellpulken har laget funksjonelt pulkutstyr av beste kvalitet i over 40 år. Av deres 18 forskjellige modeller har jeg fått en X-Plorer pulk (ekspedisjonspulk) til svært nedsatt pris. Tusen takk til Fjellpulken for et viktig bidrag!',
  },
  {
    name: 'Rottefella',
    file: 'rottefella.jpg',
    url: 'https://www.rottefella.com/',
    desc: 'Rottefella er idag verdensledende produsent av skibindinger. Bedriften utvikler sine produkter i nært samarbeid med skibrukere på alle nivå. Rottefella har sponset meg med bindingssystem som jeg er meget takknemlig for!',
  },
  {
    name: 'Amfibi',
    file: 'amfibi.jpg',
    url: 'http://www.amfibi.no/',
    desc: 'Amfibi er en av Norges mest omfattende nettbutikker innen friluftsutstyr, etablert i 2004. De fører sterke merkevarer som Bergans, Ajungilak, Brynje, Garmin, Humminbird, Primus, Optimus og Trangia. Amfibi jobber mot å bli en total-leverandør av utstyr til en aktiv fritid både til lands og til vanns. Amfibi har sponset Ajungilak Bivouac Boots, Aclima Woolnet over- og underdel, Silva Stormtenner, nye kanoårer samt Ridge Rest Deluxe Liggeunderlag. Tusen hjertelig takk for viktig støtte!',
  },
  {
    name: 'Adidas Eyewear',
    file: 'adidaseyewear.jpg',
    url: 'https://www.adidas.com/eyewear',
    desc: 'Silhouette har sponset meg med Adidas Evil Eye Explorer L briller og Adidas ID2 goggles. Hjertelig takk for et viktig bidrag!',
  },
  {
    name: 'MX Sport',
    file: 'mxsport.jpg',
    url: 'http://www.mx-sport.no/',
    desc: 'MX Sport Haukeli lånte oss sykler for etappe 14 — tusen takk for hjelpen!',
  },
]

const TJENESTER = [
  {
    name: 'Skaidi Hotel',
    file: 'Skaidi.jpg',
    url: 'http://www.skaidihotel.no/',
    desc: 'Vi takker luksuriøse Skaidi Hotel for meget bekvemmelig overnatting til rimelig pris!',
  },
  {
    name: 'Breidablikk Gjestehus',
    file: 'Breidablikk.jpg',
    url: 'http://www.breidablikk.no/',
    desc: 'Mange takk til Breidablikk Gjestehus for god bevertning og bekvem innkvartering i hyggelige omgivelser til en svært hyggelig pris.',
  },
  {
    name: 'Lundhøgda Camping',
    file: 'Lundhogda.jpg',
    url: 'http://www.lundhogdacamping.no/',
    desc: 'Lundhøgda Camping & Cafe AS ved Fauske gav oss meget rimelig overnatting. Vi takker og bukker for oppholdet.',
  },
  {
    name: 'Femund Fjellstue',
    file: 'Femund.jpg',
    url: null, // dead — suspended account (re-verified 2026-06-21)
    desc: 'Femund Fjellstue ligger ved enden av vei 221 i Elgå ved bredden av innsjøen Femund, nær grensen til Sverige. Her får vi mat og opphold mot et innblikk i vår turhverdag gjennom et foredrag for fjellstuens påskegjester. De passer også godt på vår depotpakke. Tusen takk for støtten!',
  },
  {
    name: 'Umbukta Fjellstue',
    file: 'Umbukta.jpg',
    url: 'http://www.umbuktafjellstue.no/',
    desc: 'Umbukta Fjellstue er en tradisjonsrik og gammel skyss- og tollstasjon med masse historie i veggene. Umbukta og fjellområdene rundt er et mye brukt friluftsområde for folk i Rana. Umbukta Fjellstue kan tilby restaurant med alle rettigheter, overnatting og aktiviteter. Lokalene er populære til arrangementer som konfirmasjon, julebord o.l. Tusen takk til Thor Inge og Heidi for «Norge på langs-pris» på overnatting og topp bevertning.',
  },
  {
    name: 'Jule Ferie & Fritid',
    file: 'Jule.jpg',
    url: null,
    desc: 'Jule Ferie Og Fritid tilbyr overnatting — gjerne i kombinasjon med jakt og fiske — i naturskjønne omgivelser. Tusen takk til Karsten for svært gunstig pris på overnatting og annen hjelp!',
  },
  {
    name: 'Dokka Camping',
    file: 'Dokkacamping.jpg',
    url: 'http://www.dokkacamping.no/',
    desc: 'Takk til Dokka Camping for gratis overnatting i campinghytte!',
  },
  {
    name: 'Gudbrandsdal Hotell',
    file: 'sgh.jpg',
    url: 'http://www.sgh.no/',
    desc: 'Takk til Gudbrandsdal Hotell Spidsbergseter for lån av sykler!',
  },
]

// No logo — text-only mention in the Tjenester section
const RUI_FJELLSTOGE = 'Vårt opphold på Haukeli ble hyggelig og bekvemt da vi for en billig penge fikk bo på Rui Fjellstoge. Det var flott å kunne være innendørs da jeg var syk i nesten to uker. Takk for hjelpen!'

const PERSONAL_THANKS = [
  'Stål og Kjersti Abrahamsen',
  'Leif Gustav Prytz Olsen',
  'Kurt Helge og Turid Bakken',
  'Jens Nilsen',
  'Hans og Bodil Nilsen',
  'Irene Bakken Leiknes',
  'Bente Hætta',
  'Merete Olaussen',
  'Morten Lønner',
  'Merete Bøe',
  'Olav Øygarden',
  'Jytte Steenholdt',
  'Trond Øverli Nilsen',
  'Christoffer og «Blåbæret»',
  'Alf, Berit og Elin Gravbrøt',
  'Mette og Stein Øberg',
  'Familien Unset',
  'Reidar med Chevyen',
  'Odd og Inger-Johanne Nord, samt hunden Topsy',
  'Borger og kona på Skjerdingen',
  'Sindre Spidsbergseter',
  'Hans Dalberg',
  'Arne Olav og Ella Irene, samt hunden Laisa på Hirmoen',
  'Egil Dieserud',
  'Knut Fjellseth — Rondane gjestegård',
  'Siv og de andre på Merket',
]

function SponsorRow({ sponsor, base }) {
  const { name, file, url, desc } = sponsor
  const logo = (
    <img
      src={`${base}images/sponsors/${file}`}
      alt={name}
      className="sponsor-logo w-full h-full object-contain"
      style={{ mixBlendMode: 'screen' }}
    />
  )

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start py-8 border-t border-white/[.06]">
      <div className="flex-none w-full sm:w-20 h-14 flex items-center justify-start sm:justify-center">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
            {logo}
          </a>
        ) : logo}
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-xl text-slate-100 mb-2">{name}</h3>
        <p className="font-sans text-[1.125rem] text-slate-400 leading-normal text-pretty">{desc}</p>
      </div>
    </div>
  )
}

export default function Sponsorer() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="sponsorer.html" />

      <main className="max-w-content mx-auto px-6 py-12 md:py-20">
        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-4">
          Sponsorer
        </h1>
        <p className="section-description mb-14 text-pretty">
          {INTRO}
        </p>

        {/* ── Utstyr ── */}
        <section className="mb-16">
          <p className="eyebrow mb-8">Utstyr</p>
          <div>
            {UTSTYR.map((s) => (
              <SponsorRow key={s.name} sponsor={s} base={base} />
            ))}
          </div>
        </section>

        {/* ── Tjenester ── */}
        <section className="mb-16">
          <p className="eyebrow mb-8">Tjenester &amp; overnatting</p>
          <div>
            {TJENESTER.map((s) => (
              <SponsorRow key={s.name} sponsor={s} base={base} />
            ))}
            {/* Rui Fjellstoge — no logo in sponsor set, text-only entry */}
            <div className="flex flex-col sm:flex-row gap-6 items-start py-8 border-t border-white/[.06]">
              <div className="flex-none w-full sm:w-20 h-14 flex items-center justify-start sm:justify-center">
                <span className="font-serif text-xs text-slate-600 leading-tight">Rui Fjellstoge</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-xl text-slate-100 mb-2">Rui Fjellstoge, Haukeli</h3>
                <p className="font-sans text-[1.125rem] text-slate-400 leading-normal text-pretty">{RUI_FJELLSTOGE}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stor takk til ── */}
        <section className="border-t border-white/[.06] pt-12">
          <p className="eyebrow mb-6">Vi vil også rette en stor takk til</p>
          <ul className="columns-1 sm:columns-2 gap-x-12 space-y-2">
            {PERSONAL_THANKS.map((name) => (
              <li key={name} className="font-sans text-[1.125rem] text-slate-400 leading-normal break-inside-avoid">
                {name}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
