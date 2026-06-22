import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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

function Lightbox({ section, index, onClose, onNavigate }) {
  const overlayRef = useRef(null)
  const closeRef = useRef(null)
  const stripRef = useRef(null)
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
      if (e.key === 'ArrowLeft' && index > 0) onNavigate(index - 1)
      if (e.key === 'ArrowRight' && index < total - 1) onNavigate(index + 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onNavigate, index, total])

  // Focus close button on open
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Scroll active thumbnail into view in the strip
  useEffect(() => {
    if (!stripRef.current) return
    const active = stripRef.current.querySelector('[data-active="true"]')
    if (active) {
      active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    }
  }, [index])

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
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onKeyDown={handleKeyDown}
    >
      {/* Top bar: etappe context + counter + close */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-sans font-medium text-xs uppercase tracking-[0.2em] text-orange-400 flex-shrink-0">
            {section.label}
          </span>
          {section.route && (
            <span className="font-sans text-xs text-slate-500 truncate">{section.route}</span>
          )}
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
          <span className="font-sans text-xs text-white/50">{index + 1} / {total}</span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Lukk"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center relative min-h-0"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <button
          onClick={() => onNavigate(index - 1)}
          disabled={index === 0}
          aria-label="Forrige bilde"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-20"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <polyline points="13,4 7,10 13,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <img
          src={src}
          alt={`${section.label} bilde ${index + 1}`}
          className="max-w-[90vw] max-h-full object-contain select-none"
          draggable={false}
        />

        <button
          onClick={() => onNavigate(index + 1)}
          disabled={index === total - 1}
          aria-label="Neste bilde"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-20"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <polyline points="7,4 13,10 7,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom: scrollable thumbnail strip */}
      <div className="flex-shrink-0 py-3 bg-black/50">
        <div
          ref={stripRef}
          className="flex gap-1.5 overflow-x-auto px-4 scrollbar-hide"
        >
          {section.images.map((thumb, i) => (
            <button
              key={thumb}
              data-active={i === index ? 'true' : 'false'}
              onClick={() => onNavigate(i)}
              aria-label={`Hopp til bilde ${i + 1}`}
              className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden transition-opacity ${
                i === index
                  ? 'ring-2 ring-orange-400 opacity-100'
                  : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img
                src={`${base}images/galleri/${section.folder}/${thumb}`}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Gallery section (accordion) ──────────────────────────────────────────────

function GalleriSection({ section, isOpen, onToggle, previews, onOpen }) {
  const base = import.meta.env.BASE_URL
  // Delay full-grid opacity-0→1 slightly so it fades in after mounting
  const [showFull, setShowFull] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setShowFull(true), 16)
      return () => clearTimeout(t)
    } else {
      setShowFull(false)
    }
  }, [isOpen])

  return (
    <section id={section.id} className="mb-8 border-b border-white/[.06] pb-8">
      {/* Accordion header — entire header area is the toggle target */}
      <button
        className="w-full text-left mb-4 group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <p className="eyebrow mb-1">{section.label}</p>
        <p className="card-title text-slate-100">{section.route}</p>
        <p className="font-sans text-xs text-slate-600 mt-2 group-hover:text-slate-500 transition-colors">
          {section.images.length} bilder {isOpen ? '↑' : '↓'}
        </p>
      </button>

      {/* Preview thumbs — visible when collapsed, fade out when open */}
      <div
        aria-hidden={isOpen}
        className={`grid grid-cols-3 gap-1.5 transition-opacity duration-300 ${
          isOpen ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        {previews.map((img) => {
          const realIdx = section.images.indexOf(img)
          return (
            <button
              key={img}
              onClick={() => onOpen(section, realIdx)}
              tabIndex={isOpen ? -1 : 0}
              aria-label={`Åpne bilde fra ${section.label}`}
              className="relative aspect-square overflow-hidden rounded group focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400"
            >
              <img
                src={`${base}images/galleri/${section.folder}/${img}`}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          )
        })}
      </div>

      {/* Full photo grid — rendered only when open, fades in */}
      {isOpen && (
        <div
          className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5 transition-opacity duration-300 ${
            showFull ? 'opacity-100' : 'opacity-0'
          }`}
        >
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
      )}
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Galleri() {
  // Multiple sections can be open simultaneously — better for gallery browsing
  const [openSections, setOpenSections] = useState(new Set())
  const [lightbox, setLightbox] = useState(null) // { section, index }

  // 3 random preview thumbs per section, selected once on mount (stable across renders)
  const previewMap = useMemo(() => {
    const map = {}
    GALLERI_SECTIONS.forEach((section) => {
      const pool = [...section.images]
      const picks = []
      const count = Math.min(3, pool.length)
      while (picks.length < count) {
        const i = Math.floor(Math.random() * pool.length)
        picks.push(pool.splice(i, 1)[0])
      }
      map[section.id] = picks
    })
    return map
  }, [])

  // Hash-based auto-expand: #etappe1, #etappe2, ... #oppvarmingstur
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const section = GALLERI_SECTIONS.find((s) => s.id === hash)
    if (!section) return
    setOpenSections(new Set([hash]))
    // Small delay lets React render the expanded section before scrolling
    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  const toggleSection = useCallback((id) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const openLightbox = useCallback((section, index) => {
    setLightbox({ section, index })
  }, [])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const navigateLightbox = useCallback((index) => {
    setLightbox((lb) => lb ? { ...lb, index } : lb)
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
          <GalleriSection
            key={section.id}
            section={section}
            isOpen={openSections.has(section.id)}
            onToggle={() => toggleSection(section.id)}
            previews={previewMap[section.id] || []}
            onOpen={openLightbox}
          />
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
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  )
}
