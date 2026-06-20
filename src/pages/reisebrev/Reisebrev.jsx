import React from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import { LETTERS } from '../../data/reisebrev.js'

export default function Reisebrev() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="reisebrev.html" />
      <main className="max-w-content mx-auto px-6 py-12 md:py-20">

        <p className="eyebrow mb-4">Reisebrev</p>
        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-4">
          Fra veien.
        </h1>
        <p className="font-sans text-[1.5rem] text-slate-400 leading-normal max-w-[560px] mb-16">
          Seks reisebrev ble skrevet underveis — ett etter hver etappe. Alle er skrevet av Marius Montarou fra felten.
        </p>

        <div className="space-y-0">
          {LETTERS.map((letter) => (
            <article
              key={letter.n}
              className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 py-12 border-b border-white/[.06] last:border-0"
            >
              <a
                href={`${base}reisebrev${letter.n}.html`}
                className="aspect-[4/3] md:aspect-auto overflow-hidden rounded block"
              >
                <img
                  src={`${base}images/reisebrev/${letter.img}`}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </a>
              <div className="flex flex-col justify-center">
                <p className="font-sans text-xs text-slate-500 tracking-wider mb-1">{letter.date}</p>
                <p className="font-sans font-medium text-xs text-orange-400 uppercase tracking-widest mb-2">{letter.etappe}</p>
                <h2 className="font-serif text-[2.5rem] md:text-5xl text-slate-100 mb-4 leading-snug">
                  <a
                    href={`${base}reisebrev${letter.n}.html`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {letter.title}
                  </a>
                </h2>
                <p className="font-sans text-[1.125rem] text-slate-400 leading-normal mb-4 max-w-prose">{letter.excerpt}</p>
                <a
                  href={`${base}reisebrev${letter.n}.html`}
                  className="font-sans font-medium text-sm text-orange-400 hover:text-orange-300 transition-colors self-start"
                >
                  Les mer →
                </a>
              </div>
            </article>
          ))}
        </div>

      </main>
      <SiteFooter />
    </div>
  )
}
