import React from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import { LETTERS } from '../../data/reisebrev.js'

export default function ReisebrevPost({ n }) {
  const base = import.meta.env.BASE_URL
  const letter = LETTERS.find(l => l.n === n)

  if (!letter) return null

  const idx = LETTERS.indexOf(letter)
  const prevLetter = idx > 0 ? LETTERS[idx - 1] : null
  const nextLetter = idx < LETTERS.length - 1 ? LETTERS[idx + 1] : null

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="reisebrev.html" />

      <main className="max-w-content mx-auto px-6 py-12 md:py-20">

        {/* Back link */}
        <a
          href={`${base}reisebrev.html`}
          className="font-sans text-sm text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-2 mb-10"
        >
          ← Alle reisebrev
        </a>

        {/* Entry header */}
        <p className="eyebrow mb-4">{letter.etappe}</p>
        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-4">
          {letter.title}
        </h1>
        <p className="font-sans text-sm text-slate-500 tracking-wider mb-10">
          {letter.date} — Marius Montarou
        </p>

        {/* Hero image */}
        <div className="mb-10 overflow-hidden rounded">
          <img
            src={`${base}images/reisebrev/${letter.img}`}
            alt={letter.title}
            className="w-full max-h-[480px] object-cover"
          />
        </div>

        {/* Body text */}
        <div className="space-y-6 mb-12">
          {letter.body.map((para, i) => (
            <p key={i} className="font-sans text-[1.125rem] text-slate-300 leading-normal">
              {para}
            </p>
          ))}
        </div>

        {/* Kadaver status — entry 1 only */}
        {letter.kadaver && (
          <div className="mb-12 border-t border-white/[.06] pt-10">
            <p className="eyebrow mb-6">Kadaver status</p>
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-0 border border-white/[.08] rounded overflow-hidden max-w-[560px]">
              <div className="font-sans font-medium text-xs text-slate-500 uppercase tracking-widest px-4 py-3 bg-slate-900/60">
                —
              </div>
              <div className="font-sans font-medium text-xs text-slate-400 uppercase tracking-widest px-4 py-3 bg-slate-900/60 border-l border-white/[.06]">
                Marius
              </div>
              <div className="font-sans font-medium text-xs text-slate-400 uppercase tracking-widest px-4 py-3 bg-slate-900/60 border-l border-white/[.06]">
                Emil
              </div>
              {letter.kadaver.map((row) => (
                <React.Fragment key={row.label}>
                  <div className="font-sans font-medium text-xs text-slate-500 uppercase tracking-widest px-4 py-3 border-t border-white/[.06]">
                    {row.label}
                  </div>
                  <div className="font-sans text-sm text-slate-300 px-4 py-3 border-t border-l border-white/[.06]">
                    {row.marius}
                  </div>
                  <div className="font-sans text-sm text-slate-300 px-4 py-3 border-t border-l border-white/[.06]">
                    {row.emil}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between pt-10 border-t border-white/[.06] mb-10">
          {prevLetter ? (
            <a
              href={`${base}reisebrev${prevLetter.n}.html`}
              className="group flex flex-col gap-1"
            >
              <span className="font-sans text-xs text-slate-600 uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                ← Forrige
              </span>
              <span className="font-sans text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                {prevLetter.title}
              </span>
            </a>
          ) : <div />}

          {nextLetter ? (
            <a
              href={`${base}reisebrev${nextLetter.n}.html`}
              className="group flex flex-col gap-1 text-right"
            >
              <span className="font-sans text-xs text-slate-600 uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                Neste →
              </span>
              <span className="font-sans text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                {nextLetter.title}
              </span>
            </a>
          ) : <div />}
        </div>

        <a href={`${base}reisebrev.html`} className="btn-outline">Alle reisebrev</a>

      </main>
      <SiteFooter />
    </div>
  )
}
