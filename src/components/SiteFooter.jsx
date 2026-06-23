import React, { useState } from 'react'
import { Wordmark } from './SiteHeader.jsx'
import BottomSheet from './BottomSheet.jsx'
import SheetContent from './SheetContent.jsx'
import { PEOPLE } from '../data/people.js'

const MARIUS = PEOPLE.find(p => p.id === 'Montarou')

function parseEtappe(str) {
  const colonIdx = str.indexOf(':')
  if (colonIdx < 0) return { prefix: str, route: '' }
  return { prefix: str.slice(0, colonIdx + 1), route: str.slice(colonIdx + 1) }
}

function EtappeLabel({ text }) {
  const { prefix, route } = parseEtappe(text)
  return (
    <>
      <span className="text-orange-400">{prefix}</span>
      {route && <span className="text-slate-500">{route}</span>}
    </>
  )
}

export default function SiteFooter() {
  const BASE = import.meta.env.BASE_URL
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      <footer className="border-t border-white/[.06] py-8">
        <div className="max-w-content mx-auto px-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href={`${BASE}index.html`} style={{ textDecoration: 'none', display: 'block' }}>
              <Wordmark className="text-[1.125rem]" />
            </a>
            {/* 8px is a deliberate one-off exception — below the 0.75rem floor and the 0.625rem TitleCard-mobile exception.
                Scoped exclusively to this element; the floor rule is unchanged everywhere else. */}
            <p className="font-sans font-medium text-[8px] leading-4 uppercase tracking-[0.2em] text-slate-400 text-center sm:text-left">med Montarou &amp; co</p>
          </div>
          <div className="font-sans text-[0.875rem] text-slate-500 leading-snug text-center sm:text-right">
            <p>Turgåer &amp; Ansvarlig redaktør:{' '}
              <button
                onClick={() => setSheetOpen(true)}
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }}
                className="hover:text-slate-300 transition-colors duration-150"
              >
                Marius Montarou
              </button>
            </p>
            <p>Webmaster: Arne S. Skeie</p>
            <p>NORGEpåLANGS © 2008/2009</p>
          </div>
        </div>
      </footer>

      {/* Version switcher — modernized-site palette (02-restored-static keeps original black/white) */}
      <style>{`.npls-link{color:rgba(148,163,184,0.9);transition:color 0.15s;}.npls-link:hover{color:#f8fafc;}`}</style>
      <div style={{display:'flex',justifyContent:'center',padding:'32px 16px',fontFamily:"'Work Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",fontSize:'14px'}}>
        <div style={{display:'inline-flex',alignItems:'center',background:'#1e293b',borderRadius:'9999px',padding:'4px'}}>
          <a href="https://arneskeie.github.io/norgepalangs-2009/" className="npls-link" style={{textDecoration:'none',padding:'8px 18px',borderRadius:'9999px',whiteSpace:'nowrap'}}>Original nettside</a>
          <span style={{background:'#f8fafc',color:'#0f172a',borderRadius:'9999px',padding:'8px 18px',fontWeight:500,whiteSpace:'nowrap'}}>Oppdatert nettside</span>
        </div>
      </div>

      <BottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        ariaLabel={MARIUS.name}
      >
        <SheetContent
          layout="profile"
          image={`${BASE}images/profiles/Montarou.jpg`}
          title={MARIUS.name}
          subtitle={
            <span className="tracking-[0.1em]">
              {MARIUS.etapper.map((e, i) => (
                <React.Fragment key={e}>
                  {i > 0 && <br />}
                  <EtappeLabel text={e} />
                </React.Fragment>
              ))}
            </span>
          }
          meta={[
            { label: 'Alder', value: MARIUS.alder },
            { label: 'Oppvokst i', value: MARIUS.oppvokst },
            { label: 'Studerer', value: MARIUS.studerer },
          ]}
          body={
            <div className="space-y-3">
              {MARIUS.bio.map((para, i) => (
                <p key={i} className="text-pretty">{para}</p>
              ))}
            </div>
          }
        />
      </BottomSheet>
    </>
  )
}
