import React from 'react'
import { Drawer } from 'vaul'

/**
 * BottomSheet — mechanics-only wrapper around vaul Drawer.
 *
 * Props:
 *   open          boolean          — controlled open state
 *   onOpenChange  (bool) => void   — toggle callback
 *   ariaLabel     string           — accessible name for the dialog (default: 'Detaljer')
 *   children      ReactNode        — content to render inside (typically <SheetContent />)
 *
 * Behaviour:
 *   • Auto-height up to max 93dvh — short content sizes down; long content scrolls.
 *   • Centered at max 720px on desktop; full-width on mobile.
 *   • Backdrop dims page; clicking anywhere on the backdrop (above, left, or right of
 *     the panel) dismisses. Clicks inside the panel do NOT dismiss.
 *   • Escape key dismisses.
 *   • Drag handle + drag-down gesture dismisses.
 *   • Focus trapped inside the sheet while open; returns on close (via Radix Dialog).
 *   • Body scroll locked while open (vaul built-in).
 *   • env(safe-area-inset-bottom) padding applied to avoid iPhone notch clipping.
 *   • prefers-reduced-motion: CSS in main.css suppresses vaul's slide transition.
 *
 * No snap points — vaul's snap-point height math assumes the drawer fills the full
 * viewport, which breaks when content is shorter. The simple slideFromBottom animation
 * (used when snapPoints is omitted) is height-independent and works on all viewports.
 *
 * Height: The inner wrapper has max-h-[93dvh] and flex flex-col — it sizes to content
 * naturally, capped at 93dvh. The outer Drawer.Content has no explicit height so vaul's
 * translateY(100%→0) slides by the panel's actual height, not a fixed 93dvh.
 *
 * Dismiss zones: Drawer.Content (the full-viewport-width transparent container) gets an
 * onClick to dismiss. The inner styled panel stops propagation so clicks inside don't
 * bubble up. This covers the left/right transparent areas that sit above Drawer.Overlay
 * in z-order and would otherwise swallow those clicks without dismissing.
 *
 * Max-width centering: Drawer.Content stays left:0/right:0 (full-viewport) because vaul
 * controls transform on that element. An inner wrapper div centers the visible panel at
 * max-w 720px — transparent outer container, styled inner container.
 */
export default function BottomSheet({
  open,
  onOpenChange,
  ariaLabel = 'Detaljer',
  children,
}) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <Drawer.Portal>
        {/* Backdrop — dims page, click to dismiss */}
        <Drawer.Overlay className="fixed inset-0 bg-slate-950/80 z-[105]" />

        {/* Outer container — vaul controls transform here for slide animation.
            Transparent + full-width so vaul's translateY(100%→0) works unobstructed.
            onClick dismisses when clicking the transparent side areas (left/right of panel)
            that sit above Drawer.Overlay in z-order and would otherwise swallow clicks. */}
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-[110] outline-none"
          aria-label={ariaLabel}
          onClick={() => onOpenChange(false)}
        >
          {/* Inner wrapper — centers at 720px on desktop, full-width on mobile.
              max-h-[93dvh] + flex flex-col: auto-height for short content, scrolls
              for long content. stopPropagation prevents panel clicks from bubbling
              up to the outer container's dismiss handler. */}
          <div
            className="mx-auto w-full max-w-[720px] max-h-[93dvh] sm:min-h-[70vh] flex flex-col bg-slate-900 rounded-t-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Drag handle affordance — purely visual, aria-hidden */}
            <div
              className="flex justify-center pt-3 pb-2 flex-shrink-0 cursor-grab active:cursor-grabbing"
              aria-hidden="true"
            >
              <div className="w-10 h-1 rounded-full bg-slate-600" />
            </div>

            {/* Scrollable content area — min-h-0 required for flex overflow in some browsers */}
            <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
              {children}
              {/* Safe-area spacer for iPhone notch */}
              <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} aria-hidden="true" />
            </div>

          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
