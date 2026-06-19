import React from 'react'

const SPONSORS = [
  'XXL Sport og Villmark AS',
  'Janus',
  'Helsport',
  'Sportsbua',
  'Skaidi Hotel',
  'Breidablikk Gjestehus',
  'Lundhøgda Camping & Cafe',
  'Femund Fjellstue',
  'Umbukta Fjellstue',
  'Rui Fjellstoge',
  'Cappelen Damm',
  'Alfa',
]

export default function SiteFooter() {
  const base = import.meta.env.BASE_URL
  return (
    <footer className="border-t border-white/[.06] mt-8">
      <div className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Sponsorer */}
          <div>
            <p className="eyebrow mb-6">Sponsorer</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {SPONSORS.map((name) => (
                <li key={name} className="font-mono text-xs text-slate-400 tracking-wide">
                  {name}
                </li>
              ))}
            </ul>
            <p className="font-mono text-xs text-slate-600 mt-6">
              Uten støtte fra sponsorene hadde ikke dette vært mulig.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <p className="eyebrow mb-6">Kontakt</p>
            <p className="font-sans text-sm text-slate-300 mb-1">Marius Montarou</p>
            <a
              href="mailto:montarou@stud.ntnu.no"
              className="font-mono text-xs text-orange-400 hover:text-orange-300 transition-colors"
            >
              montarou@stud.ntnu.no
            </a>

            <div className="mt-10 pt-8 border-t border-white/[.06]">
              <p className="font-mono text-xs text-slate-600 leading-relaxed">
                NORGEpåLANGS © 2008/2009<br />
                Webmaster: Arne S. Skeie
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
