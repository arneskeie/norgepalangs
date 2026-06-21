import React, { useState } from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import BottomSheet from '../../components/BottomSheet.jsx'
import SheetContent from '../../components/SheetContent.jsx'
import { CATEGORIES } from '../../data/utstyr.js'

const BASE = import.meta.env.BASE_URL

// ─── Verbatim from 02-restored-static/utstyr.html ────────────────────────────
const INTRO_DESC = 'For å kunne gjennomføre prosjektet kreves produkter som ikke svikter under kontinuerlig og hard bruk. Alle produktene vi bruker er vi helt avhengige av at fungerer som de skal, når de skal. Dette stiller store krav til de produktene og produsentene vi velger å stole på.'
const INTRO_BODY = 'Alle produktene, med noen få unntak, har jeg mye personlig erfaring med. Gjennom deltidsjobben på XXL og tidligere jobb i Sport 1-butikk, samt en etter hvert betydelig porsjon turerfaring, har jeg en viss oversikt over hva som finnes på markedet og hva som fungerer. Dermed er lite overlatt til tilfeldighetene hva angår valg av utstyr.'

function CategorySection({ cat, isOpen, onToggle, onItemClick }) {
  return (
    <div className="border-b border-white/[.06]">
      <button
        className="w-full flex items-center justify-between py-5 text-left hover:bg-white/[.02] transition-colors px-2 -mx-2 rounded"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-serif font-medium text-[1.5rem] text-slate-100">{cat.label}</span>
        <span className="font-sans text-xs text-slate-600">
          {cat.items.length} gjenstander {isOpen ? '↑' : '↓'}
        </span>
      </button>
      {isOpen && (
        <ul className="pb-6 pl-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
          {cat.items.map((item) => (
            <li key={item.name}>
              <button
                className="w-full flex items-start gap-3 text-left py-1 group"
                onClick={() => onItemClick(item)}
              >
                <span className="text-orange-400/60 mt-[0.35rem] flex-shrink-0 text-xs">—</span>
                <span className="font-sans text-sm text-slate-300 leading-relaxed group-hover:text-slate-100 transition-colors">
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Utstyr() {
  const [open, setOpen] = useState(new Set(['kjokken']))
  const [selectedItem, setSelectedItem] = useState(null)

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (open.size === CATEGORIES.length) {
      setOpen(new Set())
    } else {
      setOpen(new Set(CATEGORIES.map((c) => c.id)))
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="utstyr.html" />
      <main className="max-w-content mx-auto px-6 py-12 md:py-20">

        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-6">
          Utstyr
        </h1>
        <p className="section-description mb-4 text-pretty">{INTRO_DESC}</p>
        <p className="font-sans text-[1.125rem] text-slate-300 leading-normal text-pretty mb-4">{INTRO_BODY}</p>

        <div className="flex justify-end mb-6">
          <button onClick={toggleAll} className="btn-outline">
            {open.size === CATEGORIES.length ? 'Lukk alle' : 'Åpne alle'}
          </button>
        </div>

        <div>
          {CATEGORIES.map((cat) => (
            <CategorySection
              key={cat.id}
              cat={cat}
              isOpen={open.has(cat.id)}
              onToggle={() => toggle(cat.id)}
              onItemClick={setSelectedItem}
            />
          ))}
        </div>

      </main>

      <BottomSheet
        open={selectedItem !== null}
        onOpenChange={(isOpen) => { if (!isOpen) setSelectedItem(null) }}
        ariaLabel={selectedItem?.name ?? 'Produkt'}
      >
        {selectedItem && (
          <SheetContent
            image={selectedItem.image ? `${BASE}images/utstyr/${selectedItem.image}` : undefined}
            imageHeight="h-40 sm:h-64"
            title={selectedItem.name}
            body={selectedItem.body}
            link={selectedItem.link}
          />
        )}
      </BottomSheet>

      <SiteFooter />
    </div>
  )
}
