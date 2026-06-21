import React, { useState, useEffect, useRef, useCallback } from 'react'
import { NAV_LINKS } from './SiteNav.jsx'

export default function MobileNav({ currentPage = '' }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const overlayRef = useRef(null)
  const closedByEscapeRef = useRef(false)
  const base = import.meta.env.BASE_URL

  const close = useCallback(() => setOpen(false), [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape key — mark close as keyboard-initiated so focus is restored with ring visible
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closedByEscapeRef.current = true
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  // Focus management: first link on open, trigger on close (keyboard only).
  // Pointer closes skip the programmatic focus() call — onMouseDown.preventDefault()
  // already prevents the button from receiving focus on click, and programmatic focus()
  // in Chrome shows :focus-visible even for click-triggered closes (it treats any
  // element.focus() call as keyboard-like), producing the unwanted orange ring.
  // Only restoring focus for Escape key preserves the ARIA pattern (keyboard users
  // get focus back on the trigger) without showing a ring for pointer interactions.
  useEffect(() => {
    if (open) {
      const firstLink = overlayRef.current?.querySelector('a')
      firstLink?.focus()
      return () => {
        if (closedByEscapeRef.current) {
          setTimeout(() => triggerRef.current?.focus(), 10)
        }
        closedByEscapeRef.current = false
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
        onMouseDown={(e) => e.preventDefault()}
        tabIndex={open ? -1 : 0}
        aria-label={open ? 'Lukk meny' : 'Åpne meny'}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`mobile-nav-trigger${open ? ' mobile-nav-trigger--open' : ''}`}
      >
        {open ? (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <line x1="5" y1="5" x2="23" y2="23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="23" y1="5" x2="5" y2="23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <line x1="3" y1="8"  x2="25" y2="8"  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="3" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="3" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
