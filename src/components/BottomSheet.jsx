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

        {/* Sheet panel — h-[93dvh] leaves ~7% of viewport visible at top */}
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-xl bg-slate-900 outline-none h-[93dvh]"
          aria-label={ariaLabel}
        >
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
