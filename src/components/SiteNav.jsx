import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Om oss',              href: 'omoss.html'     },
  { label: 'Reiserute & galleri', href: 'reiserute.html' },
  { label: 'Reisebrev',           href: 'reisebrev.html' },
  { label: 'Utstyr',              href: 'utstyr.html'    },
]

export default function SiteNav({ currentPage = '' }) {
  const [open, setOpen] = useState(false)
  const base = import.meta.env.BASE_URL

  const isActive = (href) => currentPage === href

  return (
    <nav className="site-nav" aria-label="Hovednavigasjon">
      <div className="nav-inner">
        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={`${base}${href}`}
                className={`nav-link ${isActive(href) ? 'nav-link--active' : ''}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label={open ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="nav-mobile" role="dialog" aria-label="Meny">
          <ul role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={`${base}${href}`}
                  className={`nav-mobile-link ${isActive(href) ? 'nav-mobile-link--active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
