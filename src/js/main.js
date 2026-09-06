import '../scss/main.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import '@fortawesome/fontawesome-free/scss/brands.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { clubData } from '../data/club-data.js';
import subLogo from '../assets/images/sub-logo.jpg';
import { initAnimations } from './animations.js';
import { initEffects, rebindTilts } from './effects.js';
import { initDarkMode } from './darkmode.js';
import { initMembership } from './membership.js';
import { initNav } from './nav.js';
import { initContact } from './contact.js';

let currentData = null;

/*  =============================================
    SUB Innovation Club - page renderer
    Pulls content from club-data.js and injects it
    into the page. Edit club-data.js to update the
    site - no need to touch HTML.
    ============================================= */

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

  /* If the member has a profile URL, make the photo+name clickable */
  let avatarContent = hasName
    ? avatarHtml(member)
    : '<span class="member-photo member-initials member-open-avatar"><i class="fa-solid fa-user-plus"></i></span>';

  let nameHtml = hasName
    ? `<h4 class="member-name">${member.name}</h4>` +
      (member.dept ? `<p class="member-dept">${member.dept}</p>` : '')
    : `<h4 class="member-name member-open">Open Position</h4>
       <p class="member-dept">To be announced</p>
       <a class="open-apply" href="#membership">Apply for this role</a>`;

  if (member.url) {
    avatarContent = `<a href="${member.url}" target="_blank" rel="noopener" title="View ${member.name}'s profile">${avatarContent}</a>`;
    nameHtml = `<h4 class="member-name"><a href="${member.url}" target="_blank" rel="noopener" class="member-name-link">${member.name}</a></h4>` +
      (member.dept ? `<p class="member-dept">${member.dept}</p>` : '');
  }

  return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="member-card">
        <div class="member-avatar">${avatarContent}</div>
        <p class="member-role">${member.role}</p>
        ${nameHtml}
      </div>
    </div>`;
}

/* -- Activity card + filters --------------------------- */

function activityCardHtml(a) {
  return `
    <div class="col-md-6 col-lg-3" data-category="${a.category}">
      <div class="activity-card" style="--accent:${a.accent};--accent-deep:${a.accentDeep}" data-tilt>
        <span class="activity-accent-bar" aria-hidden="true"></span>
        <span class="activity-shine" aria-hidden="true"></span>
        <div class="activity-icon"><i class="${a.icon}"></i></div>
        <h4>${a.title}</h4>
        <p>${a.desc}</p>
        <span class="activity-chip">${a.category}</span>
      </div>
    </div>`;
}

function renderActivities(list) {
  const grid = document.getElementById('activities-grid');
  grid.innerHTML = list.map(activityCardHtml).join('');
  rebindTilts();
  if (grid.classList.contains('revealed')) {
    grid.classList.remove('filter-pop');
    /* force reflow so the entrance animation replays on filter change */
    void grid.offsetWidth;
    grid.classList.add('filter-pop');
  }
}

function initActivityFilters(data) {
  const wrap = document.getElementById('activity-filters');
  if (!wrap) return;
  const categories = ['All', ...new Set(data.activities.map((a) => a.category))];
  wrap.innerHTML = categories
    .map((c, i) => `<button type="button" class="filter-btn ${i === 0 ? 'active' : ''}" aria-pressed="${i === 0}" data-category="${c}">${c}</button>`)
    .join('');
}

function render(data) {
  currentData = data;

  /* Title / meta */
  document.title = `${data.name} - State University of Bangladesh`;

  /* University logo (nav + footer) + favicon */
  const navLogo = document.getElementById('nav-logo');
  const footerLogo = document.getElementById('footer-logo');
  if (data.universityLogo) {
    if (navLogo) navLogo.src = data.universityLogo;
    if (footerLogo) footerLogo.src = data.universityLogo;
  }
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) favicon.href = subLogo;

  /* Hero */
  const heroName = document.getElementById('hero-club-name');
  if (heroName) {
    heroName.innerHTML = data.name
      .split(' ')
      .map((w, i) => `<span class="hero-word" style="--i:${i}">${w}</span>`)
      .join(' ');
  }
  document.getElementById('hero-tagline').textContent = data.tagline;

  /* Hero marquee ticker */
  const marqueeTrack = document.getElementById('hero-marquee');
  if (marqueeTrack) {
    const half = data.activities
      .map((a) => `<span class="hero-marquee-item"><i class="${a.icon}"></i>${a.title}</span>`)
      .join('');
    marqueeTrack.innerHTML = half + half;
  }

  /* Stats (with data-target for counter animation) */
  const statsRow = document.getElementById('stats-row');
  statsRow.innerHTML = data.stats
    .map(
      (s) => `
      <div class="col-6 col-lg-3">
        <div class="stat-box">
          <span class="stat-value" data-target="${s.value}" data-suffix="${s.suffix || ''}">${s.value}${s.suffix || ''}</span>
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
  renderActivities(data.activities);
  initActivityFilters(data);

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
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) gallerySection.style.display = 'none';
  }

  /* Testimonials */
  const testimonialsGrid = document.getElementById('testimonials-grid');
  if (data.testimonials && data.testimonials.length) {
    testimonialsGrid.innerHTML = data.testimonials
      .map(
        (t) => `
      <div class="col-md-4">
        <div class="testimonial-card">
          <div class="testimonial-quote">&ldquo;</div>
          <p class="testimonial-text">${t.text}</p>
          <div class="testimonial-author">
            <div class="author-avatar">${initials(t.name)}</div>
            <div class="author-info">
              <div class="author-name">${t.name}</div>
              <div class="author-role">${t.dept}</div>
            </div>
          </div>
        </div>
      </div>`
      )
      .join('');
  }

  /* FAQ */
  const faqList = document.getElementById('faqList');
  if (data.faq && data.faq.length) {
    faqList.innerHTML = data.faq
      .map(
        (f, i) => `
      <div class="faq-item" data-faq="${i}">
        <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-answer-${i}" onclick="toggleFaq(${i})">
          <span>${f.q}</span>
          <span class="faq-toggle"><i class="fa-solid fa-chevron-down"></i></span>
        </button>
        <div class="faq-answer" id="faq-answer-${i}">${f.a}</div>
      </div>`
      )
      .join('');
  }

  /* Countdown (dormant until a target date is set in club-data.js) */
  const countdownWrap = document.getElementById('countdownWrap');
  if (countdownWrap) {
    const cd = data.countdown;
    if (cd && cd.target) {
      const titleEl = document.getElementById('countdownTitle');
      if (titleEl) titleEl.textContent = cd.title || 'Next event';
      countdownWrap.style.display = '';
      initCountdown(new Date(cd.target).getTime());
    } else {
      countdownWrap.style.display = 'none';
    }
  }

  /* Partners */
  const partnersGrid = document.getElementById('partnersGrid');
  if (data.partners && data.partners.length) {
    partnersGrid.innerHTML = data.partners
      .map(
        (p) => `
      <div class="partner-card">
        ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener"><img src="${p.url}" alt="${p.name}" /></a>` : `<span class="partner-name">${p.name}</span>`}
      </div>`
      )
      .join('');
  }

  /* Blog */
  const blogGrid = document.getElementById('blogGrid');
  if (data.blog && data.blog.length) {
    blogGrid.innerHTML = data.blog
      .map(
        (b) => `
      <div class="col-md-4">
        <div class="blog-card">
          <div class="blog-image">
            <img src="${b.image}" alt="${b.title}" loading="lazy" />
          </div>
          <div class="blog-body">
            <span class="blog-date">${b.date}</span>
            <h4 class="blog-title">${b.title}</h4>
            <p class="blog-excerpt">${b.excerpt}</p>
            <span class="blog-tag">${b.tag}</span>
          </div>
        </div>
      </div>`
      )
      .join('');
  }

  /* Contacts */
  const c = data.contacts;
  document.getElementById('contact-email').textContent = c.email || 'TBD';
  document.getElementById('contact-phone').textContent = c.phone || 'TBD';
  document.getElementById('contact-location').textContent = c.location || 'TBD';

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

/* -- Lightbox ----------------------------------------- */

document.addEventListener('click', (e) => {
  const item = e.target.closest('[data-lightbox]');
  if (!item) return;
  e.preventDefault();
  showLightbox(item.getAttribute('href'), item.getAttribute('data-caption') || '');
});

/* -- Activity filter tabs ------------------------------ */

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn || !currentData) return;
  const cat = btn.dataset.category;
  document.querySelectorAll('.filter-btn').forEach((b) => {
    const active = b === btn;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
  if (cat === 'All') {
    renderActivities(currentData.activities);
    return;
  }
  renderActivities(currentData.activities.filter((a) => a.category === cat));
});

function showLightbox(src, caption = '') {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `<img src="${src}" alt="Club photo"><button class="lightbox-close" aria-label="Close">&times;</button>${caption ? `<p class="lightbox-caption">${caption}</p>` : ''}`;

  const close = () => {
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';
    overlay.remove();
  };

  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('lightbox-close')) close();
  });
  document.addEventListener('keydown', onKey);
  document.body.style.overflow = 'hidden';
  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.focus();
}

/* -- FAQ toggle --------------------------------------- */
window.toggleFaq = function (index) {
  const item = document.querySelector(`.faq-item[data-faq="${index}"]`);
  if (!item) return;
  const isOpen = item.classList.contains('open');
  // close all
  document.querySelectorAll('.faq-item').forEach((el) => {
    el.classList.remove('open');
    const btn = el.querySelector('.faq-question');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    const btn = item.querySelector('.faq-question');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
};

/* -- Dormant countdown --------------------------------- */
function initCountdown(targetTime) {
  const boxes = {
    days: document.getElementById('cdDays'),
    hours: document.getElementById('cdHours'),
    minutes: document.getElementById('cdMinutes'),
    seconds: document.getElementById('cdSeconds'),
  };
  const grid = document.getElementById('countdownGrid');
  const live = document.getElementById('cdLive');
  if (!grid || !live) return;

  const pad = (n) => String(n).padStart(2, '0');

  const tick = () => {
    const diff = targetTime - Date.now();
    if (diff <= 0) {
      grid.style.display = 'none';
      live.style.display = 'flex';
      clearInterval(interval);
      return;
    }
    if (boxes.days) boxes.days.textContent = String(Math.floor(diff / 86400000));
    if (boxes.hours) boxes.hours.textContent = pad(Math.floor((diff / 3600000) % 24));
    if (boxes.minutes) boxes.minutes.textContent = pad(Math.floor((diff / 60000) % 60));
    if (boxes.seconds) boxes.seconds.textContent = pad(Math.floor((diff / 1000) % 60));
  };

  tick();
  const interval = setInterval(tick, 1000);
}

/* -- Scroll-to-top ------------------------------------ */
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (scrollTopBtn) scrollTopBtn.style.display = window.scrollY > 400 ? 'grid' : 'none';
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* -- Preloader ---------------------------------------- */
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 600);
  }
}

/* -- Init --------------------------------------------- */
try { render(clubData); } catch (e) { console.error('render failed', e); }
try { initNav(); } catch (e) { console.error('nav init failed', e); }
try { initAnimations(); } catch (e) { console.error('animations failed', e); }
try { initEffects(); } catch (e) { console.error('effects failed', e); }
try { initDarkMode(); } catch (e) { console.error('darkmode failed', e); }
try { initMembership(); } catch (e) { console.error('membership init failed', e); }
try { initContact(); } catch (e) { console.error('contact init failed', e); }

window.addEventListener('load', hidePreloader);
