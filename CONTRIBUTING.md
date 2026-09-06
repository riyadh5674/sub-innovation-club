# Contributing

Thanks for helping make the SUB Innovation Club website better. Keep it small,
readable, and consistent with the existing code.

## Development setup

```bash
npm install
npm run dev        # Vite dev server with hot reload
```

## Before you open a pull request

1. **Formatting** — keep the existing code style: same indentation (2 spaces),
   the `/* -- Section --------------------------------------- */` comment banners,
   and no leftover debug logs.
2. **Build clean** — run the full gate:

   ```bash
   npm run build:all    # production build + post-build smoke test
   ```

   `npm run check` (`scripts/verify-build.mjs`) asserts that every critical
   element, style, and data string survives the build and that all referenced
   assets exist. Add new markers there when you add new components.
3. **Preview** — `npm run preview` and smoke-test at `http://localhost:4173`
   in both light and dark mode.

## Where things live

| What you change | File |
|-----------------|------|
| Page copy, stats, activities, events, FAQs, forms, countdown | `src/data/club-data.js` |
| Page renderer, lightbox, countdown wiring, init | `src/js/main.js` |
| Hero / filter visuals | `src/js/effects.js` |
| Membership form behavior | `src/js/membership.js` |
| Contact form | `src/js/contact.js` |
| Navigation / scrollspy | `src/js/nav.js` |
| Toasts | `src/js/toast.js` |
| Dark mode | `src/js/darkmode.js` |
| Styles | `src/scss/` (partials imported via `@use`) |

## Content edits

Don't touch markup to change copy — **all content lives in
`src/data/club-data.js`**. Keep the file's inline comments updated when you add
fields so future editors know what each key does.

## Conventions to respect

- Use `@use` when pulling SCSS, never `@import`.
- New reusable components need: an element in `index.html` (or a guarded
  renderer), a style block in the right SCSS partial, and (if interactive) a
  `verify-build.mjs` marker.
- Accessibility is required, not optional: `aria-*` states on toggles, focus
  rings via `:focus-visible`, and reduced-motion handling in `_animations.scss`.