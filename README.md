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
- [Building for production](#building-for-production)
- [Deployment](#deployment)
- [Merging into the university site](#merging-into-the-university-site)
- [License](#license)

---

## About

The official [SUB Innovation Club](https://sub.ac.bd/innovationclub) page consists of little more
than a one-line objective and a list of activity names. This project is a **complete redesign**
that turns the club's presence into a rich, content-driven page while remaining fully compatible
with the university's technology stack (Bootstrap 5, static front-end), so it can be adopted by the
university IT team later.

Real club information (from the official SUB site and the club's Facebook page) has already been
incorporated: the Convenor, recent workshops, and flagship activities.

## Features

- 🎯 **Hero** with animated tagline + key stats strip
- 📖 **About** the club
- 🧭 **Mission & Vision**
- 🧩 **Major Activities** — all 8 flagship competitions and challenges
- 📅 **Events / Highlights** timeline (from the club's Facebook page)
- 👥 **Executive Committee** — editable member cards (data-driven)
- 🧑‍🏫 **Convenor & Advisors**
- 🖼️ **Photo Gallery** with lightbox
- 💬 **Floating WhatsApp button** and scroll-to-top button
- 🎨 **SUB-branded styling** on a Bootstrap 5 foundation
- 🌙 **Dark mode toggle** with `localStorage` persistence
- 📊 **Animated stat counters** that count up on scroll
- ✨ **Scroll-reveal animations** on all sections
- 🎞️ **Preloader** with SUB logo animation
- 📋 **FAQ accordion** with 8 common questions
- 💬 **Testimonials** from club members
- 🤝 **Partners & Affiliations** section
- 📰 **News & Announcements** blog-style cards
- 🏆 **Online Membership System** — multi-step registration with online payment

## Live preview

The project is automatically deployed to GitHub Pages on every push to `main`:

**https://riyadh5674.github.io/sub-innovation-club/**

## Project structure

```
sub-innovation-club/
├── index.html                 # Page structure + membership form
├── src/
│   ├── data/
│   │   └── club-data.js       # ★ ALL editable content lives here ★
│   ├── js/
│   │   ├── main.js            # Page renderer + init
│   │   ├── membership.js      # Multi-step membership form logic
│   │   ├── animations.js      # Scroll reveal, counters, parallax
│   │   └── darkmode.js        # Dark mode toggle
│   └── scss/
│       ├── main.scss          # Main stylesheet (imports all partials)
│       ├── _preloader.scss    # Preloader styles
│       ├── _animations.scss   # Reveal/counter/parallax keyframes
│       ├── _sections.scss     # FAQ, testimonials, partners, blog
│       ├── _membership.scss   # Membership form styles
│       └── _dark.scss         # Dark mode overrides
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions → GitHub Pages
├── vite.config.js
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
| Activities | `clubData.activities` |
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
| Contact & social | `clubData.contacts` |

## Online Membership System

The site includes a complete online membership application system with:

- **6-step profession form:**
  1. **Personal Information** — Name, Student ID, Photo, DOB, Gender, Blood Group
  2. **Academic Information** — Department, Batch, Semester, Session
  3. **Contact Information** — Email, Phone, WhatsApp, Address, Emergency Contact
  4. **Skills & Interests** — Interest checkboxes, motivation, experience
  5. **Payment** — bKash/Nagad/Rocket/Bank with payment instructions + transaction ID + screenshot
  6. **Review & Submit** — Summary of all entered data + Terms & Conditions

- **Online fee payment** — ৳300 via bKash, Nagad, Rocket, or bank transfer
- **Real-time validation** — Form validates fields like student ID pattern, email, phone
- **Formspree integration** — Submissions are emailed to the club automatically
- **Confirmation page** — Success message with reference number

### Payment methods accepted

| Method | Number |
|--------|--------|
| bKash | 01766-662992 |
| Nagad | 01766-662992 |
| Rocket | 01766-662992 |
| Bank | Contact club for details |

## Configuring Formspree

The membership form uses [Formspree](https://formspree.io) (free tier, no signup limits) to deliver
submissions to your email.

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID (e.g., `xdennkvw`)
3. Open `src/js/membership.js` and replace the endpoint:

```js
const resp = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

4. Rebuild and deploy.

## Building for production

```bash
npm run build
npm run preview
```

## Deployment

Deployment is fully automated with **GitHub Actions**. On every push to `main`:

1. The project is built with Vite.
2. The `dist/` output is uploaded as a Pages artifact.
3. It is published to GitHub Pages.

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
