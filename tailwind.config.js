/**
 * @type {import('tailwindcss').Config}
 *
 * ─── Design rules (03-modernized only) ──────────────────────────────────────
 * 1. BUTTONS / CTAs — always pill-shaped (rounded-full). Never rectangular
 *    or underlined text-links.
 * 2. FILL OR STROKE, NEVER BOTH — a filled element has no border; a bordered
 *    element has no fill. Applies to buttons, cards, badges, tags, any
 *    element with a background-color and a border.
 * 3. OUTLINED BUTTONS — border-width always 2px. 1px reads too thin on dark.
 * ────────────────────────────────────────────────────────────────────────────
 */
export default {
  content: [
    './*.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif:      ['Fraunces', 'Georgia', 'serif'],
        sans:       ['"Work Sans"', 'system-ui', 'sans-serif'],
        'dm-serif': ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '960px',
      },
      colors: {
        // explicit aliases keep utility classes readable in JSX
        brand: {
          bg:      '#020617', // slate-950
          surface: '#0f172a', // slate-900
          text:    '#f8fafc', // slate-50
          muted:   '#94a3b8', // slate-400
          accent:  '#fb923c', // orange-400
        },
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
