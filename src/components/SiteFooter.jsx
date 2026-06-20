import React from 'react'
import { Wordmark } from './SiteHeader.jsx'

export default function SiteFooter() {
  return (
    <>
      <footer className="border-t border-white/[.06] py-8">
        <div className="max-w-content mx-auto px-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark className="text-[1.125rem]" />
          <p className="font-sans text-xs text-slate-600 text-center sm:text-right">
            Turgåer &amp; Ansvarlig redaktør: Marius Montarou | Webmaster: Arne S. Skeie | NORGEpåLANGS © 2008/2009
          </p>
        </div>
      </footer>

      {/* Version switcher — modernized-site palette (02-restored-static keeps original black/white) */}
      <style>{`.npls-link:hover{color:#f8fafc;}`}</style>
      <div style={{display:'flex',justifyContent:'center',padding:'32px 16px',fontFamily:"'Work Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",fontSize:'14px'}}>
        <div style={{display:'inline-flex',alignItems:'center',background:'#1e293b',borderRadius:'9999px',padding:'4px'}}>
          <a href="https://arneskeie.github.io/norgepalangs-2009/" className="npls-link" style={{color:'rgba(148,163,184,0.9)',textDecoration:'none',padding:'8px 18px',borderRadius:'9999px',whiteSpace:'nowrap',transition:'color 0.15s'}}>Original nettside</a>
          <span style={{background:'#f8fafc',color:'#0f172a',borderRadius:'9999px',padding:'8px 18px',fontWeight:500,whiteSpace:'nowrap'}}>Oppdatert nettside</span>
        </div>
      </div>
    </>
  )
}
