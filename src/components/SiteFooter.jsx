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
      <style>{`.npls-link:hover{background:rgba(255,255,255,0.1);}`}</style>
      <div style={{display:'flex',justifyContent:'center',padding:'20px 16px',fontFamily:"'Work Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",fontSize:'14px'}}>
        <div style={{display:'inline-flex',alignItems:'center',background:'rgba(0,0,0,0.9)',borderRadius:'9999px',padding:'4px'}}>
          <a href="https://arneskeie.github.io/norgepalangs-2009/" className="npls-link" style={{color:'rgba(255,255,255,0.85)',textDecoration:'none',padding:'7px 18px',borderRadius:'9999px',whiteSpace:'nowrap',transition:'background 0.15s'}}>Original nettside</a>
          <span style={{background:'#ffffff',color:'#1e1e1e',borderRadius:'9999px',padding:'7px 18px',fontWeight:500,whiteSpace:'nowrap'}}>Oppdatert nettside</span>
        </div>
      </div>
    </>
  )
}
