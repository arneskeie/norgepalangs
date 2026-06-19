import React from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'

// ─── Verbatim from 02-restored-static/index.html ────────────────────────────
const VELKOMMEN = [
  'Hvorfor spør mange. Et stort spørsmål for noen, helt naturlig for andre. Er det en flukt fra hverdagen? En asketisk øvelse? En test eller en utfordring? En søken etter noe annet? En annerledes hverdag? Antageligvis litt av alle disse tingene, men fremfor alt handler det om å leve ute i og med naturen over tid. Ren glede over å være ute og bryne seg på naturens meny av utfordringer; holde varmen, bli mett, finne en god leirplass, eller få liv i bålet.',
  'Jeg legger på ingen måte skjul på at å legge vekk klokka, mobilen og universitetet er noe av poenget å komme nærmere noe vi stadig beveger oss bort fra i hverdagen. Hva dette noe er håper jeg å finne ut. Det vil i så fall bli publisert her!',
  'Viktig er det også å nevne at dette ikke er et rekordsforsøk. Snarere tvert imot. Her er veien målet. Det å kunne se mot horisonten vitende om at bak den er en ny horisont, og bak den enda en, og tenke at «over den skal vi» blir et eventyr. Vi legger bort vekkerklokka, timeplanen og de andre heftelsene som hører sivilisasjonen til og lar bekymringene dreie seg om å holde varmen, finne brensel, få ørret i gryta og tørke sokker.',
  'På denne siden vil vi prøve å holde deg oppdatert på hva som skjer, så du kan få med deg alt som går galt og glatt underveis.',
  'Før Norge på langs 08/09 skal jeg på en måneds kanotur i Nord-Finland. Det blir en glimrende innledning til livet i villmarken! Bilder fra denne turen vil også bli lagt ut på denne siden.',
]

const STATS = [
  { value: '2 500', unit: 'km',           label: 'Turen lengde'          },
  { value: '15',    unit: 'etapper',      label: 'Norges ryggrad'        },
  { value: 'Sep',   unit: '2008 → 2009', label: 'Tidsrom'               },
  { value: '71°N',  unit: '→ 57°N',      label: 'Nordkapp – Lindesnes'  },
]

// 4 recovered turlogg entries — tagged GJENFUNNET, not TURLOGG
const GJENFUNNET = [
  { title: 'Andre dag på sykkel',       date: '19. mai 2009' },
  { title: 'Avgang etappe 14!',         date: '18. mai 2009' },
  { title: 'Bilder (igjen)',             date: '14. mai 2009' },
  { title: 'Tilbakefall på Geilosyken', date: '14. mai 2009' },
]

// Latest recovered reisebrev — verbatim excerpt from reisebrev.html
const LATEST_REISEBREV = {
  label: 'Etappe 6',
  title: 'Hegra – Gressli',
  date:  '10. november 2008',
  excerpt: 'Oktober har blitt til november. Enda en måned har passert og gjort sinnet rikere og midjen smalere. Vi har blitt nødt til å flytte prosjektet sørover som tidligere antatt.',
  href: 'reisebrev6.html',
}

// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="hero" />

      {/* ── Om turen ──────────────────────────────────────────────────────── */}
      <section id="om-turen" className="py-14 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="max-w-[680px]">
            <p className="eyebrow mb-6">Om turen</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[0.95] text-slate-50 mb-10">
              Veien er <span className="text-orange-400">målet.</span>
            </h2>
            <div className="space-y-5">
              {VELKOMMEN.map((para, i) => (
                <p key={i} className="font-sans text-[0.9375rem] text-slate-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 border-t border-b border-white/[.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map(({ value, unit, label }) => (
              <div key={label}>
                <p className="font-serif text-3xl md:text-4xl text-slate-50 leading-none">{value}</p>
                <p className="font-mono text-xs text-orange-400 mt-1 tracking-wider">{unit}</p>
                <p className="font-mono text-[0.65rem] text-slate-500 mt-2 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull-quote ────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <blockquote className="max-w-[760px] mx-auto text-center">
            <div className="w-px h-14 bg-orange-400 mx-auto mb-8" />
            <p className="font-serif text-xl md:text-2xl text-slate-200 leading-snug italic">
              «Vi legger bort vekkerklokka, timeplanen og de andre heftelsene som hører sivilisasjonen til
              og lar bekymringene dreie seg om å holde varmen, finne brensel, få ørret i gryta og tørke sokker.»
            </p>
            <footer className="mt-6">
              <cite className="font-mono text-xs text-slate-500 uppercase tracking-widest not-italic">
                Marius Montarou — Velkommen-tekst
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Siste nytt ────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="eyebrow mb-3">Siste nytt</p>
          <p className="font-mono text-xs text-slate-500 mb-10 max-w-prose">
            Fire logginnlegg er gjenfunnet fra det opprinnelige nettstedet. Resten av turloggen er tapt.
          </p>

          {/* GJENFUNNET cards — fill only (rule 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {GJENFUNNET.map(({ title, date }) => (
              <article key={title} className="bg-slate-900 rounded-lg p-5">
                <span className="gjenfunnet-tag">GJENFUNNET</span>
                <h3 className="font-serif text-lg text-slate-100 leading-snug mt-3 mb-2">{title}</h3>
                <p className="font-mono text-xs text-slate-500 tracking-wider">{date}</p>
              </article>
            ))}
          </div>

          {/* Latest reisebrev */}
          <div className="border-t border-white/[.06] pt-12">
            <p className="eyebrow mb-6">Siste reisebrev</p>
            <div className="max-w-[560px]">
              <p className="font-mono text-xs text-slate-500 tracking-wider mb-2">{LATEST_REISEBREV.date}</p>
              <p className="font-mono text-xs text-orange-400 uppercase tracking-widest mb-1">{LATEST_REISEBREV.label}</p>
              <h3 className="font-serif text-2xl text-slate-100 mb-3">{LATEST_REISEBREV.title}</h3>
              <p className="font-sans text-[0.9375rem] text-slate-400 leading-relaxed mb-6">
                {LATEST_REISEBREV.excerpt}
              </p>
              <a href={`${base}${LATEST_REISEBREV.href}`} className="btn-outline">
                Les reisebrev
              </a>
            </div>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
