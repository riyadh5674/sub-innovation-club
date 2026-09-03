import '../scss/main.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import '@fortawesome/fontawesome-free/scss/brands.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { clubData } from '../data/club-data.js';

/*  =============================================
    SUB Innovation Club - page renderer
    Pulls content from club-data.js and injects it
    into the page. Edit club-data.js to update the
    site - no need to touch HTML.
    ============================================= */

const DATA_KEY = 'subic_page_data';

function initials(name) {
  const clean = String(name || '?').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function avatarHtml(member) {
  if (member.photo) {
    return `<img src="${member.photo}" alt="${member.name}" loading="lazy" class="member-photo">`;
  }
  const hue = [...String(member.name || '')].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return `<span class="member-photo member-initials" style="--h:${hue}">${initials(member.name)}</span>`;
}

function memberCard(member) {
  const hasName = Boolean(member.name && member.name.trim());
  const nameHtml = hasName
    ? `<h4 class="member-name">${member.name}</h4>` +
      (member.dept ? `<p class="member-dept">${member.dept}</p>` : '')
    : `<h4 class="member-name member-open">Open Position</h4>
       <p class="member-dept">To be announced</p>`;
  return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="member-card">
        <div class="member-avatar">${hasName ? avatarHtml(member) : '<span class="member-photo member-initials member-open-avatar"><i class="fa-solid fa-user-plus"></i></span>'}</div>
        <p class="member-role">${member.role}</p>
        ${nameHtml}
      </div>
    </div>`;
}

function render(data) {
  /* Title / meta */
  document.title = `${data.name} - State University of Bangladesh`;

  /* University logo (nav + footer) */
  const navLogo = document.getElementById('nav-logo');
  const footerLogo = document.getElementById('footer-logo');
  if (data.universityLogo) {
    if (navLogo) navLogo.src = data.universityLogo;
    if (footerLogo) footerLogo.src = data.universityLogo;
  }

  /* Hero */
  document.getElementById('hero-club-name').textContent = data.name;
  document.getElementById('hero-tagline').textContent = data.tagline;

  /* Stats */
  const statsRow = document.getElementById('stats-row');
  statsRow.innerHTML = data.stats
    .map(
      (s) => `
      <div class="col-6 col-lg-3">
        <div class="stat-box">
          <span class="stat-value">${s.value}</span>
          <span class="stat-label">${s.label}</span>
        </div>
      </div>`
    )
    .join('');

  /* About */
  const aboutEl = document.getElementById('about-text');
  aboutEl.innerHTML = data.about.map((p) => `<p>${p}</p>`).join('');

  /* About image */
  const aboutImage = document.getElementById('about-image');
  if (aboutImage) {
    aboutImage.src = data.aboutImage || '';
    aboutImage.alt = `${data.name} event`;
  }

  /* Mission */
  const missionEl = document.getElementById('mission-list');
  missionEl.innerHTML = data.mission.map((m) => `<li><i class="fa-solid fa-check"></i> ${m}</li>`).join('');
  document.getElementById('vision-text').textContent = data.vision;

  /* Activities */
  document.getElementById('activities-grid').innerHTML = data.activities
    .map(
      (a) => `
      <div class="col-md-6 col-lg-3">
        <div class="activity-card">
          <div class="activity-icon"><i class="${a.icon}"></i></div>
          <h4>${a.title}</h4>
          <p>${a.desc}</p>
        </div>
      </div>`
    )
    .join('');

  /* Events */
  const eventsWrap = document.getElementById('events-wrap');
  if (data.events.length === 0) {
    eventsWrap.innerHTML =
      '<div class="col-12 text-center text-muted"><p>Events coming soon — check our Facebook page for updates.</p></div>';
  } else {
    eventsWrap.innerHTML = data.events
      .map(
        (e) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <span class="event-date">${e.date}</span>
          <h4 class="event-title">${e.title}</h4>
          <p class="event-body">${e.body}</p>
          <div class="event-tags">${e.tags.map((t) => `<span class="badge">${t}</span>`).join('')}</div>
        </div>
      </div>`
      )
      .join('');
  }

  /* Committee */
  document.getElementById('committee-grid').innerHTML = data.committee.map(memberCard).join('');

  /* Advisors */
  const advisorWrap = document.getElementById('advisors-grid');
  if (data.advisors.length) {
    advisorWrap.innerHTML = data.advisors.map(memberCard).join('');
  } else {
    advisorWrap.innerHTML = '';
    document.getElementById('advisors-section').style.display = 'none';
  }

  /* Gallery */
  const gallery = document.getElementById('gallery-grid');
  if (data.gallery.length) {
    gallery.innerHTML = data.gallery
      .map((item) => {
        const src = typeof item === 'string' ? item : item.src;
        const caption = typeof item === 'string' ? '' : item.caption || '';
        return `
      <div class="col-6 col-lg-3">
        <a href="${src}" class="gallery-item" data-lightbox="gallery" ${caption ? `data-caption="${caption}"` : ''}>
          <img src="${src}" alt="${caption || 'Club photo'}" loading="lazy">
        </a>
      </div>`;
      })
      .join('');
  } else {
    document.getElementById('gallery-section').style.display = 'none';
  }

  /* Contacts */
  const c = data.contacts;
  document.getElementById('contact-email').textContent = c.email || 'TBD';
  document.getElementById('contact-phone').textContent = c.phone || 'TBD';
  document.getElementById('contact-location').textContent = c.location || 'TBD';
  if (c.whatsapp) document.getElementById('contact-whatsapp').href = c.whatsapp;
  if (c.facebook) document.getElementById('contact-facebook').href = c.facebook;

  const socials = [
    c.facebook && { href: c.facebook, icon: 'fa-brands fa-facebook-f' },
    c.instagram && { href: c.instagram, icon: 'fa-brands fa-instagram' },
    c.linkedin && { href: c.linkedin, icon: 'fa-brands fa-linkedin-in' },
    c.youtube && { href: c.youtube, icon: 'fa-brands fa-youtube' },
  ].filter(Boolean);
  const socialMarkup = socials
    .map((s) => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="Social link"><i class="${s.icon}"></i></a>`)
    .join('');
  const contactSocial = document.getElementById('social-links');
  const footerSocial = document.getElementById('social-links-footer');
  if (contactSocial) contactSocial.innerHTML = socialMarkup;
  if (footerSocial) footerSocial.innerHTML = socialMarkup;
}

/* -- Lightbox + scroll helpers ----------------------------------------- */

document.addEventListener('click', (e) => {
  const item = e.target.closest('[data-lightbox]');
  if (!item) return;
  e.preventDefault();
  showLightbox(item.getAttribute('href'), item.getAttribute('data-caption') || '');
});

function showLightbox(src, caption = '') {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `<img src="${src}" alt="Club photo"><button class="lightbox-close" aria-label="Close">&times;</button>${caption ? `<p class="lightbox-caption">${caption}</p>` : ''}`;
  overlay.addEventListener('click', () => overlay.remove());
  document.body.appendChild(overlay);
}

/* Scroll-to-top button */
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (scrollTopBtn) scrollTopBtn.style.display = window.scrollY > 400 ? 'grid' : 'none';
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Navbar collapse close on link click */
document.querySelectorAll('.navbar .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('navbarNav');
    if (collapse && collapse.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    }
  });
});

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Init */
render(clubData);
