<div align="center">

# SUB Innovation Club — Website

### Redesign of the SUB Innovation Club page · State University of Bangladesh

A modern, professional redesign of the [official Innovation Club page](https://sub.ac.bd/innovationclub),
built with **Vite + SCSS + Bootstrap 5** and designed to merge cleanly into the
university's existing Bootstrap-based website.

[![Built with Vite](https://img.shields.io/badge/built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Deploy to GitHub Pages](https://github.com/riyadh5674/sub-innovation-club/actions/workflows/deploy.yml/badge.svg)](https://github.com/riyadh5674/sub-innovation-club/actions/workflows/deploy.yml)

#### 🌐 Live site
**https://riyadh5674.github.io/sub-innovation-club/**

</div>

---

## 📋 Table of contents

- [About](#about)
- [Features](#features)
- [Live preview](#live-preview)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Editing content](#editing-content)
- [Online Membership System](#online-membership-system)
- [Configuring Formspree](#configuring-formspree)
- [Activating the event countdown](#activating-the-event-countdown)
- [Building & verifying](#building--verifying)
- [Deployment](#deployment)
- [Merging into the university site](#merging-into-the-university-site)
- [License](#license)

---

## About

The official [SUB Innovation Club](https://sub.ac.bd/innovationclub) page consists of little more
than a one-line objective and a list of activity names. This project is a **complete redesign**
that turns the club's presence into a rich, interactive, content-driven page while remaining fully
compatible with the university's technology stack (Bootstrap 5, static front-end), so it can be
adopted by the university IT team later.

Real club information (from the official SUB site and the club's Facebook page) has already been
incorporated: the Convenor, recent workshops, and flagship activities.

## Features

- 🎯 **Animated hero** — particle canvas, word-by-word gradient headline, marquee ticker,
  cursor glow and magnetic buttons
- 📊 **Key stats** — animated counters and a configurable event countdown banner
- 📖 **About** the club + 🧭 **Mission & Vision**
- 🧩 **Major Activities** — all 8 flagship competitions and challenges, filterable
  (**All / Competition / Challenge**) with gradient cards, 3D tilt and shine sweep
- 📅 **Events / Highlights** timeline (from the club's Facebook page)
- 👥 **Executive Committee** — editable member cards with gradient avatars (data-driven)
- 🧑‍🏫 **Convenor & Advisors**
- 🖼️ **Photo Gallery** with keyboard-accessible lightbox
- 🏆 **Online Membership System** — 6-step registration with online payment
- 📋 **FAQ accordion**, 💬 **testimonials**, 🤝 **partners**, 📰 **news** cards
- 💬 **Floating WhatsApp button** and scroll-to-top button
- 🌙 **Dark mode toggle** with `localStorage` persistence (synced desktop/mobile)
- ✨ **Scroll-reveal animations**, animated stat counters, and a branded **preloader**
- ♿ **Accessibility** — skip link, focus rings, ARIA states, reduced-motion support
- 🍞 **Toast notifications** for form feedback; membership **draft autosave** in `localStorage`

## Live preview

The project is automatically deployed to GitHub Pages on every push to `main`:

**https://riyadh5674.github.io/sub-innovation-club/**

## Project structure

```
sub-innovation-club/
├── index.html                 # Page structure + membership form
├── public/
│   ├── sub-logo.jpg           # og:image / apple-touch / manifest icon
│   └── site.webmanifest       # PWA-style site manifest
├── scripts/
│   └── verify-build.mjs       # Post-build smoke test (npm run check)
├── src/
│   ├── data/
│   │   └── club-data.js       # ★ ALL editable content lives here ★
│   ├── js/
│   │   ├── main.js            # Page renderer + init + lightbox + countdown
│   │   ├── effects.js         # Hero particles, marquee, magnetic, 3D tilt
│   │   ├── membership.js      # 6-step membership form (drafts, validation)
│   │   ├── contact.js         # Contact form → Formspree
│   │   ├── nav.js             # Scrollspy, sticky shrink, collapse autoclose
│   │   ├── toast.js           # Toast notification system
│   │   ├── animations.js      # Scroll reveal, counters, parallax
│   │   └── darkmode.js        # Dark mode toggle (both toggles synced)
│   └── scss/
│       ├── main.scss          # Main stylesheet (@use of all partials)
│       ├── _preloader.scss    # Preloader styles
│       ├── _base.scss         # Skip link, focus rings, selection, scrollbar, toasts
│       ├── _animations.scss   # Reveal/counter/parallax keyframes
│       ├── _sections.scss     # FAQ, testimonials, partners, blog
│       ├── _membership.scss   # Membership form styles
│       └── _dark.scss         # Dark mode overrides
├── .github/workflows/deploy.yml   # GitHub Actions → GitHub Pages
├── vite.config.js
├── package.json               # build / check / preview scripts
└── README.md
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or newer
- [npm](https://www.npmjs.com) 9 or newer

### Installation

```bash
npm install
npm run dev
```

## Editing content

**All text and content live in a single, well-commented file:**

```
src/data/club-data.js
```

Edit the values there and rebuild — no HTML or JS changes required.

| Section | Editable key in `club-data.js` |
|---------|--------------------------------|
| Club name, tagline, objective | `clubData.name`, `clubData.tagline`, `clubData.objective` |
| About paragraphs | `clubData.about` |
| Mission & Vision | `clubData.mission`, `clubData.vision` |
| Key stats | `clubData.stats` |
| Activities (incl. filter category + card accent) | `clubData.activities` |
| Events / highlights | `clubData.events` |
| Executive committee | `clubData.committee` — placeholders, fill in real members |
| Convenor / advisors | `clubData.advisors` |
| Photo gallery | `clubData.gallery` |
| FAQ questions & answers | `clubData.faq` |
| Testimonials | `clubData.testimonials` |
| Partners / sponsors | `clubData.partners` |
| Blog / announcements | `clubData.blog` |
| Membership fee | `clubData.membershipFee` |
| Departments dropdown | `clubData.departments` |
| Interest checkboxes | `clubData.interests` |
| Payment instructions | `clubData.paymentInstructions` |
| Form endpoints | `clubData.forms` |
| Event countdown | `clubData.countdown` |
| Contact & social | `clubData.contacts` |

## Online Membership System

The site includes a complete online membership application system with:

- **6-step form:**
  1. **Personal Information** — Name, Student ID, Photo, DOB, Gender, Blood Group
  2. **Academic Information** — Department, Batch, Semester, Session
  3. **Contact Information** — Email, Phone, WhatsApp, Address, Emergency Contact
  4. **Skills & Interests** — Interest checkboxes, motivation, experience
  5. **Payment** — bKash/Nagad/Rocket/Bank with payment instructions + transaction ID + screenshot
  6. **Review & Submit** — Summary of all entered data + Terms & Conditions

- **Progress bar** showing how far the applicant is through the 6 steps
- **Draft autosave** — form values (including current step) are saved to `localStorage`
  and restored with a "resume" toast if the visitor closes and returns
- **Online fee payment** — ৳300 via bKash, Nagad, Rocket, or bank transfer
- **Real-time validation** — fields validate on next-step; interests required
- **Formspree integration** — submissions are emailed to the club automatically
- **Confirmation page** — success message with reference number

### Payment methods accepted

| Method | Number |
|--------|--------|
| bKash | 01766-662992 |
| Nagad | 01766-662992 |
| Rocket | 01766-662992 |
| Bank | Contact club for details |

## Configuring Formspree

Both the **membership form** and the **contact form** deliver submissions via
[Formspree](https://formspree.io). The endpoints live in `src/data/club-data.js`:

```js
forms: {
  membership: 'https://formspree.io/f/YOUR_FORM_ID',
  contact:    'https://formspree.io/f/YOUR_FORM_ID',   // can be a separate form
  showContactForm: true,
},
```

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a form (or one per form for separate inboxes) and copy the form ID
3. Paste the IDs into the `forms` block above
4. Rebuild and deploy.

## Activating the event countdown

The countdown banner is **dormant by default** — no dates are hardcoded, so nothing
ever displays a fake deadline. To activate it, set an ISO date in `club-data.js`:

```js
countdown: {
  title:  'Smart University Hackathon',
  target: '2026-11-15T09:00:00+06:00',   // leave '' to keep it hidden
},
```

The banner counts down the days/hours/minutes/seconds to that local time and flips to a
**"We're live"** state when the time passes.

## Building & verifying

```bash
npm run build       # compile to dist/
npm run check       # post-build smoke test (fast, no dev server)
npm run build:all   # build + check in one go
npm run preview     # serve the built site locally on http://localhost:4173
```

`npm run check` runs `scripts/verify-build.mjs`, which asserts that every critical
element, style, and data string survived the build and that all referenced assets exist.
The deploy workflow runs the same `build` + `check` before publishing.

## Deployment

Deployment is fully automated with **GitHub Actions**. On every push to `main`:

1. Dependencies are installed (`npm ci`).
2. The project is built and verified (`npm run build:all`).
3. The `dist/` output is uploaded as a Pages artifact.
4. It is published to GitHub Pages.

## Merging into the university site (sub.ac.bd)

1. Run `npm run build` to produce the compiled `dist/` files.
2. In the CMS page, replace the `<header>` and `<footer>` blocks in `index.html`
   with the **live SUB site header/footer**.
3. Keep all content inside `<main>…</main>` — that is the club page.
4. Add the compiled CSS and JS to the theme, or compile `src/scss/main.scss`.

## License

Distributed under the [MIT](LICENSE) license. See `LICENSE` for more information.

---

<div align="center">
  Made with ❤️ for the SUB Innovation Club<br/>
  <sub>State University of Bangladesh</sub>
</div>