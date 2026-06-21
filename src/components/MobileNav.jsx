import React, { useState, useEffect, useRef, useCallback } from 'react'
import { NAV_LINKS } from './SiteNav.jsx'

export default function MobileNav({ currentPage = '' }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const overlayRef = useRef(null)
  const base = import.meta.env.BASE_URL

  const close = useCallback(() => setOpen(false), [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  // Focus management: first link on open, trigger on close
  useEffect(() => {
    if (open) {
      const firstLink = overlayRef.current?.querySelector('a')
      firstLink?.focus()
      return () => {
        // Runs when open goes false — return focus to trigger
        setTimeout(() => triggerRef.current?.focus(), 10)
      }
    }
  }, [open])

  // Focus trap within overlay
  const handleOverlayKeyDown = (e) => {
    if (e.key !== 'Tab') return
    const focusables = Array.from(
      overlayRef.current?.querySelectorAll('a[href], button') || []
    )
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
    <>
      {/* Floating hamburger / close trigger — fixed bottom-right, mobile only via CSS */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        tabIndex={open ? -1 : 0}
        aria-label={open ? 'Lukk meny' : 'Åpne meny'}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="mobile-nav-trigger"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <line x1="2" y1="6"  x2="20" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Full-screen overlay — shown only when open */}
      {open && (
        <div
          role="dialog"
          aria-label="Navigasjonsmeny"
          aria-modal="true"
          ref={overlayRef}
          onKeyDown={handleOverlayKeyDown}
          className="mobile-nav-overlay"
        >
          <nav aria-label="Sidenavigasjon">
            <ul role="list" className="mobile-nav-list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={`${base}${href}`}
                    onClick={close}
                    className={`mobile-nav-link${currentPage === href ? ' mobile-nav-link--active' : ''}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
