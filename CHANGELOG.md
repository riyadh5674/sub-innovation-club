# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Hero experience upgrade: particle canvas background, word-by-word gradient
  headline animation, marquee activity ticker, cursor glow and magnetic buttons.
- Scroll progress bar at the top of the page.
- Activity filter tabs (All / Competition / Challenge) with per-activity gradient
  accents, 3D tilt cards, shine sweep and re-filter animation.
- Committee avatars with conic-gradient rings and an "Apply for this role" link on
  open positions.
- New JS modules: `effects.js` (hero/filters), `nav.js` (scrollspy, sticky navbar
  shrink + blur, collapse autoclose, smooth anchors), `toast.js` (notification
  system), `contact.js` (contact form → Formspree).
- Membership form upgrade: animated step progress bar, `localStorage` draft
  autosave/restore with resume toast, required-interests validation, and toast
  feedback instead of `alert()`.
- Dormant event countdown banner (hidden until `clubData.countdown.target` is set).
- Toast container, skip link, `:focus-visible` rings, custom selection and
  scrollbar styles, `scroll-margin-top` anchors, section-title gradient accents.
- Home-page metadata: `theme-color` metas, apple-touch icon, `site.webmanifest`.
- `scripts/verify-build.mjs` + `npm run check` / `npm run build:all` build gate.
- `CHANGELOG.md` and `CONTRIBUTING.md`.

### Changed
- SCSS migrated from `@import` to modern `@use`; new `_base.scss` partial.
- Formspree endpoints centralized in `club-data.js` (`forms` key) — the membership
  and contact forms now read their endpoint from data instead of hardcoding it.
- Hero stats updated to: 8+ Flagship Activities / 10+ Departments Represented /
  100+ Workshop Participants / 100% Open to Every Student.
- Navbar and active-link states restyled (scrollspy underline, scrolled blur).
- `darkmode.js` rewritten to keep the desktop and mobile toggles in sync and to
  remove the duplicated logic previously living in `main.js`.
- FAQ toggles expose correct `aria-expanded`/`aria-controls` states.
- Lightbox closes on `Esc`, locks body scroll, and traps focus on open.
- `package.json` `preview` script now pins port 4173.

### Fixed
- Odd duplicate favicon link removed; favicon/article images resolve from `public/`.
- Activity filter buttons are now real buttons with `aria-pressed` state.
- Navbar collapse no longer leaves the mobile menu open after tapping a link.
- Membership submit now uses the data-driven endpoint (keeping the Formspree
  no-file-uploads strategy and `photoProvided`/`screenshotProvided` flags).