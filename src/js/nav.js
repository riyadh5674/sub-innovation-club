// ============================================================
// NAVBAR — scrollspy, shrink-on-scroll, collapse handling
// ============================================================

export function initNav() {
  initScrollSpy();
  initNavShrink();
  initCollapseClose();
  initSmoothAnchors();
}

/* -- Highlight the nav link of the section in view --------- */
function initScrollSpy() {
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.navbar .nav-link[href^="#"]')];
  if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

  const targets = new Set();
  links.forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    if (id) targets.add(id);
  });

  const setActive = (id) => {
    links.forEach((a) => {
      const active = a.getAttribute('href') === `#${id}`;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  const visible = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visible.set(entry.target.id, entry.isIntersecting);
      });
      let current = null;
      visible.forEach((isVisible, id) => {
        if (isVisible && targets.has(id)) {
          const el = document.getElementById(id);
          if (!current || (el && el.getBoundingClientRect().top <= document.getElementById(current).getBoundingClientRect().top)) {
            current = id;
          }
        }
      });
      if (current) setActive(current);
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => {
    if (targets.has(s.id)) observer.observe(s);
  });
}

/* -- Compact translucent navbar once the page is scrolled --- */
function initNavShrink() {
  const nav = document.querySelector('.club-navbar');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* -- Close the mobile collapse when a link is tapped -------- */
function initCollapseClose() {
  document.querySelectorAll('.navbar .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navbarNav');
      if (collapse && collapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });
}

/* -- Smooth scroll for anchor links (kept from main.js) ----- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}