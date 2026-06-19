import React from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'

// ─── Verbatim from 02-restored-static/reisebrev.html ─────────────────────────
const LETTERS = [
  {
    n: 1,
    etappe: 'Etappe 1',
    title: 'Nordkapp – Skaidi',
    date: 'Mandag 08. september 2008',
    img: 'Reisebrev0101.jpg',
    excerpt: 'De første skrittene er tatt og så er eventyret i gang. Overgangen fra å skulle gjøre det til å gjøre det, å faktisk være i gang, er som en prikk på tidslinjen; du vet ikke at du er der før du ser tilbake og finner deg selv på andre siden av det kritiske punktet.',
  },
  {
    n: 2,
    etappe: 'Etappe 2',
    title: 'Skaidi – Kautokeino',
    date: 'Mandag 22. september 2008',
    img: 'Reisebrev0201.jpg',
    excerpt: 'Vi går og går, toppene forsvinner bak oss og det er rart at det vi ser bak oss – et endeløst landskap så langt øyet kan se – har vi gått gjennom skritt for skritt.',
  },
  {
    n: 3,
    etappe: 'Etappe 3',
    title: 'Kautokeino – Narvik',
    date: 'Onsdag 08. oktober 2008',
    img: 'Reisebrev0301.jpg',
    excerpt: 'Det er ingen tvil. Vinteren kommer enten vi liker det eller ei. Enkelte netter ligger snøen tung på teltet, og at vannposen får et centimeters tykt lag is i løpet av natten begynner å bli vanlig.',
  },
  {
    n: 4,
    etappe: 'Etappe 4',
    title: 'Abisko / Narvik – Fauske (Sulitjelma)',
    date: 'Lørdag 25. oktober 2008',
    img: 'Reisebrev0401.jpg',
    excerpt: 'Det handler om kontraster. En uavbrutt rekke av kontraster. De gir seg oftest til kjenne gjennom behov/tilfredsstillelse eller kanskje rettere sagt ubehag/behag.',
  },
  {
    n: 5,
    etappe: 'Etappe 5',
    title: 'Fauske (Sulitjelma) – Lønsdal',
    date: 'Søndag 02. november 2008',
    img: 'Reisebrev0501.jpg',
    excerpt: 'Femte etappe er over og vi er like ved polarsirkelen. Det har vært en deilig uke med ekstra mat, bra vær, sympatiske dagsetapper og godt selskap.',
  },
  {
    n: 6,
    etappe: 'Etappe 6',
    title: 'Hegra – Gressli',
    date: 'Mandag 10. november 2008',
    img: 'Reisebrev0601.jpg',
    excerpt: 'Oktober har blitt til november. Enda en måned har passert og gjort sinnet rikere og midjen smalere. Vi har blitt nødt til å flytte prosjektet sørover som tidligere antatt.',
  },
]

export default function Reisebrev() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="reisebrev.html" />
      <main className="max-w-[1100px] mx-auto px-6 py-12 md:py-20">

        <p className="eyebrow mb-4">Reisebrev</p>
        <h1 className="font-serif text-4xl md:text-5xl text-slate-50 leading-[0.95] mb-4">
          Fra <span className="text-orange-400">veien.</span>
        </h1>
        <p className="font-sans text-[0.9375rem] text-slate-400 leading-relaxed max-w-[560px] mb-16">
          Seks reisebrev ble skrevet underveis — ett etter hver etappe. Alle er skrevet av Marius Montarou fra felten.
        </p>

        <div className="space-y-0">
          {LETTERS.map((letter, i) => (
            <article
              key={letter.n}
              className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 py-12 border-b border-white/[.06] last:border-0"
            >
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden rounded">
                <img
                  src={`${base}images/reisebrev/${letter.img}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-mono text-xs text-slate-500 tracking-wider mb-1">{letter.date}</p>
                <p className="font-mono text-xs text-orange-400 uppercase tracking-widest mb-2">{letter.etappe}</p>
                <h2 className="font-serif text-2xl md:text-3xl text-slate-100 mb-4 leading-snug">{letter.title}</h2>
                <p className="font-sans text-[0.9375rem] text-slate-400 leading-relaxed mb-6 max-w-prose">{letter.excerpt}</p>
                <div>
                  <span className="font-mono text-xs text-slate-600 uppercase tracking-widest">Av Marius Montarou</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </main>
      <SiteFooter />
    </div>
  )
}
