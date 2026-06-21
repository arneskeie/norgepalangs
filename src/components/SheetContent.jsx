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
 *   imageHeight string             — (header layout only) Tailwind height class(es) for the image
 *                                    container. Default: 'h-48' (192px). Pass multiple classes for
 *                                    responsive sizing (e.g. 'h-48 sm:h-64'). Ignored in 'profile'
 *                                    layout. Opt-in per consumer — default preserves existing behavior.
 *   fullBleedImage boolean         — (header layout only) When false (default), the image renders
 *                                    INSIDE the padded content container — padding applies above,
 *                                    on both sides, and below the image as part of the normal
 *                                    content flow. When true, the image renders OUTSIDE (above) the
 *                                    padded container, edge-to-edge (full-bleed). Reserved for
 *                                    future consumers that specifically need a full-bleed image
 *                                    strip; no current consumer passes this prop. Ignored in
 *                                    'profile' layout.
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
        <div className="mt-10">
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
  imageHeight = 'h-48',
  fullBleedImage = false,
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
        {/* Profile header row: mobile → image centered above text (stacked);
            desktop (sm+) → circular photo left, identity stack right. */}
        <div className="flex flex-col items-center gap-4 sm:gap-8 sm:flex-row sm:items-start px-6 sm:px-16 pt-6 sm:pt-12 pb-4">
          {image && (
            /* w-20 mobile / w-36 desktop (144px = 9rem). Source JPGs are 70×70px so
               80px is near-native (≈1.15× upscale after border crop); 144px on desktop
               gives a larger, more impactful portrait at wider viewports. */
            <div className="w-20 h-20 sm:w-36 sm:h-36 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={image}
                alt=""
                /* scale-[1.15] pushes baked-in white border outside the circle clip,
                   consistent with the card thumbnail treatment in OmOss. */
                className="w-full h-full object-cover scale-[1.15] origin-center"
              />
            </div>
          )}
          <div className="min-w-0 w-full sm:w-auto sm:pt-1">
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
            <div className="border-t border-white/[.06] mx-6 sm:mx-16" />
            <div className="px-6 sm:px-16 pt-5 pb-8 sm:pb-24">
              <BodyArea body={body} link={link} gallery={gallery} />
            </div>
          </>
        )}
      </div>
    )
  }

  // layout === 'header' (default) — image inside padded container by default
  return (
    <div>
      {/* Full-bleed image — outside padded container (opt-in, no current consumer uses this) */}
      {fullBleedImage && image && (
        imageMode === 'cover' ? (
          <div className={`w-full ${imageHeight} overflow-hidden`}>
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className={`w-full ${imageHeight} flex items-center justify-center px-6 py-4`}>
            <img src={image} alt="" className="max-h-full max-w-full object-contain" />
          </div>
        )
      )}

      {/* Content area — 4rem left/right + 3rem top + 6rem bottom on desktop */}
      <div className="px-6 sm:px-16 pt-5 sm:pt-12 pb-8 sm:pb-24">

        {/* Default: image inside padded container — padding above/beside image, natural gap below */}
        {!fullBleedImage && image && (
          imageMode === 'cover' ? (
            <div className={`w-full ${imageHeight} overflow-hidden mb-4`}>
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            /* pb-4 gives breathing room below image; top padding comes from the container's pt-5/pt-12 */
            <div className={`w-full ${imageHeight} flex items-center justify-center pb-4 mb-4`}>
              <img src={image} alt="" className="max-h-full max-w-full object-contain" />
            </div>
          )
        )}

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
