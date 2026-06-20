import React from 'react'
import { Wordmark } from './SiteHeader.jsx'

export default function SiteFooter() {
  return (
    <>
      <footer className="border-t border-white/[.06] py-8">
        <div className="max-w-content mx-auto px-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark className="text-[1.125rem]" />
          <div className="font-sans text-[0.875rem] text-slate-500 leading-snug text-center sm:text-right">
            <p>Turgåer &amp; Ansvarlig redaktør: <a href="https://arneskeie.github.io/norgepalangs-2009/omoss.html" className="hover:text-slate-300 transition-colors duration-150">Marius Montarou</a></p>
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
    </>
  )
}
