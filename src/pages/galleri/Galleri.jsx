import React, { useState, useEffect, useRef, useCallback } from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import { GALLERI_SECTIONS } from '../../data/galleri.js'

// ─── Verbatim from 02-restored-static/videogalleri.html ──────────────────────
const VIDEOS = [
  { id: '5An_8LozHB0', title: 'Fjernsynskjøkkenet, Episode 1', subtitle: 'Idag: hjemmelaget brød' },
  { id: 'ez5pVtzbmIg', title: 'Ronny og storørreten', subtitle: 'Kilosørret på kroken' },
  { id: 'WmM8az1Ql14', title: 'Fjernsynskjøkkenet, Episode 2', subtitle: 'Idag: pannekaker og camp-utsikt' },
  { id: 'K7v6iB05Ofw', title: 'Kampen med Storgjedda', subtitle: 'Montarou drar i land et smakfullt udyr' },
  { id: 'lkf7TvXuDIU', title: 'Nestenkanovelt', subtitle: 'Farlig nær katastrofe' },
  { id: '3JrKnijl7wA', title: 'Status dag 7', subtitle: 'Truls presenterer ukesrapport' },
]

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ section, index, onClose, onPrev, onNext }) {
  const overlayRef = useRef(null)
  const closeRef = useRef(null)
  const base = import.meta.env.BASE_URL
  const img = section.images[index]
  const src = `${base}images/galleri/${section.folder}/${img}`
  const total = section.images.length

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  // Focus the close button on open
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Focus trap
  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return
    const focusables = Array.from(
      overlayRef.current?.querySelectorAll('button') || []
    ).filter((el) => !el.disabled)
    if (focusables.length < 2) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Bilde ${index + 1} av ${total} — ${section.label}`}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onKeyDown={handleKeyDown}
    >
      {/* Close */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Lukk"
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-sans text-xs text-white/50">
        {index + 1} / {total}
      </div>

      {/* Prev */}
      <button
        onClick={onPrev}
        disabled={index === 0}
        aria-label="Forrige bilde"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-20"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <polyline points="13,4 7,10 13,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Image */}
      <img
        src={src}
        alt={`${section.label} bilde ${index + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain select-none"
        draggable={false}
      />

      {/* Next */}
      <button
        onClick={onNext}
        disabled={index === total - 1}
        aria-label="Neste bilde"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-20"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <polyline points="7,4 13,10 7,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

// ─── Section grid ──────────────────────────────────────────────────────────────

function GalleriSection({ section, onOpen }) {
  const base = import.meta.env.BASE_URL
  return (
    <section className="mb-16">
      <p className="card-title text-slate-100 mb-4">{section.label}</p>
      <p className="font-sans text-xs text-slate-600 mb-6">{section.images.length} bilder</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5">
        {section.images.map((img, idx) => (
          <button
            key={img}
            onClick={() => onOpen(section, idx)}
            className="relative aspect-square overflow-hidden rounded group focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400"
            aria-label={`Åpne bilde ${idx + 1} av ${section.images.length} fra ${section.label}`}
          >
            <img
              src={`${base}images/galleri/${section.folder}/${img}`}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Galleri() {
  const [lightbox, setLightbox] = useState(null) // { section, index }

  const openLightbox = useCallback((section, index) => {
    setLightbox({ section, index })
  }, [])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const prevImage = useCallback(() => {
    setLightbox((lb) => lb && lb.index > 0 ? { ...lb, index: lb.index - 1 } : lb)
  }, [])

  const nextImage = useCallback(() => {
    setLightbox((lb) => lb && lb.index < lb.section.images.length - 1 ? { ...lb, index: lb.index + 1 } : lb)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="galleri.html" />

      <main className="max-w-content mx-auto px-6 py-12 md:py-20">
        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-4">
          Galleri
        </h1>
        <p className="section-description mb-14 text-pretty">
          944 bilder fra turen — oppvarmingstur i Nord-Finland og 15 etapper fra Nordkapp til Lindesnes.
        </p>

        {GALLERI_SECTIONS.map((section) => (
          <GalleriSection key={section.id} section={section} onOpen={openLightbox} />
        ))}

        {/* Video gallery — migrated from Reiserute.jsx in Batch 5 */}
        <div className="mt-20 pt-16 border-t border-white/[.06]">
          <p className="eyebrow mb-6">Video</p>
          <h2 className="font-serif text-[2rem] md:text-[2.5rem] text-slate-50 leading-tight mb-10">
            Videogalleri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((video) => (
              <div key={video.id}>
                <div className="relative w-full aspect-video overflow-hidden rounded">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                <h3 className="font-serif text-base text-slate-100 mt-3 mb-1">{video.title}</h3>
                <p className="font-sans text-sm text-slate-500">{video.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <SiteFooter />

      {lightbox && (
        <Lightbox
          section={lightbox.section}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  )
}
