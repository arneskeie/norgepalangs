import React from 'react'

/**
 * SheetContent — composable layout template for BottomSheet interiors.
 *
 * Used by all three planned consumers (Utstyr, Om Oss, Reiserute).
 * All props are optional except `title`.
 *
 * Props:
 *   layout     'header' | 'profile'
 *                                  — controls the overall arrangement (default: 'header').
 *                                    'header': full-width image on top, then subtitle/title/
 *                                      meta/body stacked below. Best for product images and
 *                                      high-res landscape/portrait photos (Utstyr).
 *                                    'profile': circular image on the LEFT beside subtitle/
 *                                      title/meta stacked in a right column, bio below.
 *                                      Best for low-res thumbnail sources where stretching
 *                                      to full-width would show upscaling artifacts (Om Oss,
 *                                      potentially Reiserute). imageMode is ignored in this
 *                                      layout — the image is always circular object-cover.
 *
 *   image      string              — image src
 *   imageMode  'contain' | 'cover' — (header layout only) how the image fills its container.
 *                                    'contain' (default): product images on dark bg with padding.
 *                                    'cover': portrait/landscape photos cropped to fill.
 *   title      string | ReactNode  — heading (Fraunces 1.5rem)
 *   subtitle   string              — optional accent line above title (.eyebrow styling)
 *   meta       Array<{ label: string, value: string }>
 *                                  — optional label/value pairs (Alder, Oppvokst i, Studerer…).
 *                                    'profile': rendered in the right column below the title.
 *                                    'header': rendered below the title, above body.
 *                                    Entries with falsy value are skipped automatically.
 *   body       string | ReactNode  — description / details (Work Sans 1.125rem, slate-300)
 *   link       { href, label, external? }
 *                                  — optional CTA rendered as .btn-outline pill
 *                                    external defaults to true (opens in new tab)
 *   gallery    Array<string | { src, alt }>
 *                                  — optional thumbnail grid (3-col, aspect-[4/3])
 *                                    empty/omitted → grid not rendered
 */

function MetaDl({ items }) {
  const valid = (items || []).filter(m => m.value)
  if (!valid.length) return null
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
      {valid.map(({ label, value }) => (
        <React.Fragment key={label}>
          <dt className="font-sans font-medium text-xs text-slate-500 uppercase tracking-widest self-center">{label}</dt>
          <dd className="font-sans text-sm text-slate-300">{value}</dd>
        </React.Fragment>
      ))}
    </dl>
  )
}

function BodyArea({ body, link, gallery }) {
  const hasContent = body != null || link || (gallery && gallery.length > 0)
  if (!hasContent) return null
  return (
    <>
      {body != null && (
        typeof body === 'string'
          ? <p className="font-sans text-[1.125rem] text-slate-300 leading-normal text-pretty">{body}</p>
          : <div className="font-sans text-[1.125rem] text-slate-300 leading-normal">{body}</div>
      )}
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
    </>
  )
}

export default function SheetContent({
  layout = 'header',
  image,
  imageMode = 'contain',
  title,
  subtitle,
  meta,
  body,
  link,
  gallery,
}) {
  if (layout === 'profile') {
    const hasBody = body != null || link || (gallery && gallery.length > 0)
    return (
      <div>
        {/* Profile header row: circular photo left, identity stack right */}
        <div className="flex items-start gap-4 px-6 pt-6 pb-4">
          {image && (
            /* w-20 (80px) circle: source JPGs are 70×70px so this is near-native
               resolution (≈1.15× upscale of actual photo content after border crop). */
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={image}
                alt=""
                /* scale-[1.15] pushes baked-in white border outside the circle clip,
                   consistent with the card thumbnail treatment in OmOss. */
                className="w-full h-full object-cover scale-[1.15] origin-center"
              />
            </div>
          )}
          <div className="min-w-0 pt-1">
            {subtitle && <p className="eyebrow mb-2">{subtitle}</p>}
            <h3 className="font-serif text-[1.5rem] leading-tight text-slate-50 text-pretty">
              {title}
            </h3>
            {meta && meta.length > 0 && (
              <div className="mt-3">
                <MetaDl items={meta} />
              </div>
            )}
          </div>
        </div>

        {/* Bio body — full-width, below the header row */}
        {hasBody && (
          <>
            <div className="border-t border-white/[.06] mx-6" />
            <div className="px-6 pt-5 pb-8">
              <BodyArea body={body} link={link} gallery={gallery} />
            </div>
          </>
        )}
      </div>
    )
  }

  // layout === 'header' (default) — full-width image on top
  return (
    <div>
      {/* Hero image */}
      {image && (
        imageMode === 'cover' ? (
          <div className="w-full h-48 overflow-hidden">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          /* contain: dark bg so transparent PNGs render cleanly; px/py give breathing room */
          <div className="w-full h-48 bg-slate-950 flex items-center justify-center px-6 py-4">
            <img src={image} alt="" className="max-h-full max-w-full object-contain" />
          </div>
        )
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

        {/* Metadata — rendered below title in header layout */}
        {meta && meta.length > 0 && (
          <div className="mb-5">
            <MetaDl items={meta} />
          </div>
        )}

        <BodyArea body={body} link={link} gallery={gallery} />
      </div>
    </div>
  )
}
