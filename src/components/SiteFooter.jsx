import React from 'react'

export default function SiteFooter() {
  return (
    <>
      <footer className="border-t border-white/[.06] py-8">
        <div className="max-w-content mx-auto px-6">
          <p className="font-sans text-xs text-slate-600">
            Turgåer & Ansvarlig redaktør: Marius Montarou | Webmaster: Arne S. Skeie | NORGEpåLANGS © 2008/2009
          </p>
        </div>
      </footer>
      <div style={{background:'#1a1a1a',borderTop:'1px solid rgba(255,255,255,0.08)',padding:'10px 16px',textAlign:'center',fontFamily:"Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",fontSize:'13px',lineHeight:'1.4',color:'#888'}}>
        <a href="https://arneskeie.github.io/norgepalangs-2009/" style={{color:'#888',textDecoration:'none'}}>Original nettside (2009)</a>
        <span style={{color:'#444'}}> · </span>
        <span style={{color:'#555'}}>Oppdatert/responsiv nettside →</span>
      </div>
    </>
  )
}
