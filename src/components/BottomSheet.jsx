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
 *   • Opens at 93dvh — leaves ~7% of the page visible at the top edge.
 *   • Centered at max-w-content (960px) on desktop; full-width on mobile.
 *   • Backdrop dims page; tapping it dismisses.
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
 * Max-width centering: Drawer.Content stays left:0/right:0 (full-viewport) because vaul
 * controls transform on that element for the slideFromBottom animation. Adding
 * translateX(-50%) there would be overwritten by vaul's animation. Instead, an inner
 * wrapper div constrains the visible content to 960px centered — transparent outer
 * container, styled inner container.
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
        <Drawer.Overlay className="fixed inset-0 bg-slate-950/80 z-40" />

        {/* Outer container — vaul controls transform here for slide animation.
            Transparent + full-width so vaul's translateY(100%→0) works unobstructed. */}
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-50 h-[93dvh] outline-none"
          aria-label={ariaLabel}
        >
          {/* Inner wrapper — centers at 960px on desktop, full-width on mobile.
              mx-auto centers the block; max-w-content caps at 960px. */}
          <div className="mx-auto w-full max-w-content h-full flex flex-col bg-slate-900 rounded-t-xl overflow-hidden">

            {/* Drag handle affordance — purely visual, aria-hidden */}
            <div
              className="flex justify-center pt-3 pb-2 flex-shrink-0 cursor-grab active:cursor-grabbing"
              aria-hidden="true"
            >
              <div className="w-10 h-1 rounded-full bg-slate-600" />
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
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
