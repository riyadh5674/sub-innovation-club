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
- [Building for production](#building-for-production)
- [Deployment](#deployment)
- [Merging into the university site](#merging-into-the-university-site)
- [Roadmap](#roadmap)
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

- 🎯 **Hero** with tagline + key stats strip
- 📖 **About** the club
- 🧭 **Mission & Vision**
- 🧩 **Major Activities** — all 8 flagship competitions and challenges
- 📅 **Events / Highlights** timeline (from the club's Facebook page)
- 👥 **Executive Committee** — editable member cards (data-driven)
- 🧑‍🏫 **Convenor & Advisors**
- 🖼️ **Photo Gallery** with lightbox
- ✉️ **Join / Contact** section with form and social links
- 💬 Floating WhatsApp button and scroll-to-top button
- 🎨 **SUB-branded styling** on a Bootstrap 5 foundation

## Live preview

The project is automatically deployed to GitHub Pages on every push to `main`:

**https://riyadh5674.github.io/sub-innovation-club/**

## Project structure

```
sub-innovation-club/
├── index.html              # Page structure (hero, about, activities, events,
│                           #   committee, gallery, join, contact) inside a
│                           #   SUB-style header/nav/footer wrapper
├── src/
│   ├── data/
│   │   └── club-data.js    # ★ ALL editable content lives here ★
│   ├── js/
│   │   └── main.js         # Renders data into the page + interactivity
│   └── scss/
│       └── main.scss       # Bootstrap 5 + SUB/brand styling
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions → GitHub Pages deployment
├── vite.config.js
└── README.md
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or newer
- [npm](https://www.npmjs.com) 9 or newer

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
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
| **Executive committee** | `clubData.committee` — placeholders, fill in real members |
| Convenor / advisors | `clubData.advisors` |
| Photo gallery | `clubData.gallery` |
| Email / phone / WhatsApp / socials | `clubData.contacts` |

> **Note:** The *Executive Committee* names are placeholders until the real
> members are published. Fill them in `clubData.committee`; add a `photo` URL
> or leave it blank to show an auto-generated initials avatar.

Real details already included: Convenor **Md. Samiul Islam** (Asst. Prof., CSE),
the **Freelancing for Everyone** workshop (13 May 2025), and the **25 May 2025**
club election. The About image and photo gallery use **real event photos**
pulled from the club's Facebook page, hosted locally so they never break.

## Building for production

```bash
npm run build
npm run preview
```

The compiled static site is written to `dist/` and is ready to host anywhere
(no backend required).

## Deployment

Deployment is fully automated with **GitHub Actions**. On every push to `main`:

1. The project is built with Vite.
2. The `dist/` output is uploaded as a Pages artifact.
3. It is published to GitHub Pages.

The workflow lives at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
No manual steps are required after the initial Pages enablement.

## Merging into the university site (sub.ac.bd)

The page was designed so the club content can be dropped into the university CMS:

1. Run `npm run build` to produce the compiled `dist/` files.
2. In the CMS page, replace the `<header>` and `<footer>` blocks in `index.html`
   with the **live SUB site header/footer** so navigation and branding stay consistent.
3. Keep all content inside `<main>…</main>` — that is the club page.
4. Add the compiled CSS and JS to the theme, or compile `src/scss/main.scss`
   into the site's stylesheet.

## Roadmap

- [ ] Fill in the real executive committee once the members are published
- [ ] Add more real event photos (Hackathon, Robotics, Treasure Hunt, etc.)
- [ ] Wire the contact form to a mail service
- [ ] Add a news/announcements block
- [ ] Add a light/dark theme toggle (optional)

## License

Distributed under the [MIT](LICENSE) license. See `LICENSE` for more information.

---

<div align="center">
  Made with ❤️ for the SUB Innovation Club<br/>
  <sub>State University of Bangladesh</sub>
</div>
