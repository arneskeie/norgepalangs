import React from 'react'

/**
 * SheetContent — composable layout template for BottomSheet interiors.
 *
 * Used by all three planned consumers (Utstyr, Om Oss, Reiserute).
 * All props are optional except `title`.
 *
 * Props:
 *   image     string              — image src (full-width hero at top of sheet)
 *   title     string | ReactNode  — heading (Fraunces 1.5rem)
 *   subtitle  string              — optional accent line above title (.eyebrow styling)
 *   body      string | ReactNode  — description / details (Work Sans 1.125rem, slate-300)
 *   link      { href, label, external? }
 *                                 — optional CTA rendered as .btn-outline pill
 *                                   external defaults to true (opens in new tab)
 *   gallery   Array<string | { src, alt }>
 *                                 — optional thumbnail grid (3-col, aspect-[4/3])
 *                                   empty/omitted → grid not rendered
 */
export default function SheetContent({ image, title, subtitle, body, link, gallery }) {
  return (
    <div>
      {/* Full-width hero image */}
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content area */}
      <div className="px-6 pt-5 pb-8">

        {/* Accent subtitle — eyebrow style */}
        {subtitle && (
          <p className="eyebrow mb-3">{subtitle}</p>
        )}

        {/* Title */}
        <h3 className="font-serif text-[1.5rem] leading-tight text-slate-50 mb-4 text-pretty">
          {title}
        </h3>

        {/* Body text */}
        {body != null && (
          typeof body === 'string'
            ? <p className="font-sans text-[1.125rem] text-slate-300 leading-normal text-pretty">{body}</p>
            : <div className="font-sans text-[1.125rem] text-slate-300 leading-normal text-pretty">{body}</div>
        )}

        {/* CTA link */}
        {link && (
          <div className="mt-6">
            <a
              href={link.href}
              target={link.external !== false ? '_blank' : undefined}
              rel={link.external !== false ? 'noopener noreferrer' : undefined}
              className="btn-outline"
            >
              {link.label}
            </a>
          </div>
        )}

        {/* Thumbnail gallery grid */}
        {gallery && gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-6">
            {gallery.map((item, i) => {
              const src = typeof item === 'string' ? item : item.src
              const alt = typeof item === 'string' ? '' : (item.alt || '')
              return (
                <img
                  key={i}
                  src={src}
                  alt={alt}
                  className="w-full aspect-[4/3] object-cover rounded border border-white/10"
                />
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
