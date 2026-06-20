import React from 'react'

const NAV_LINKS = [
  { label: 'Om oss',              href: 'omoss.html'     },
  { label: 'Reiserute & galleri', href: 'reiserute.html' },
  { label: 'Reisebrev',           href: 'index.html#reisebrev' },
  { label: 'Utstyr',              href: 'utstyr.html'    },
]

export default function SiteNav({ currentPage = '' }) {
  const base = import.meta.env.BASE_URL
  const isActive = (href) => currentPage === href

  return (
    <nav className="site-nav" aria-label="Hovednavigasjon">
      {/* Invisible layout wrapper — same box model as content sections (960px, px-6) */}
      <div className="nav-inner">
        {/* Pill background — fills nav-inner's padded content area (912px) */}
        <div className="nav-pill">
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
        </div>
      </div>
    </nav>
  )
}
