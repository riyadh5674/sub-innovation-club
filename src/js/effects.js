// ============================================================
// HERO PARTICLES, CURSOR GLOW, MAGNETIC BUTTONS, TILT, PROGRESS
// ============================================================

export function initEffects() {
  initHeroHeadline();
  initScrollProgress();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  initHeroCanvas();
  initHeroGlow();
  initMagnetic();
  initTilt();
}

/* -- Animated word-by-word headline ---------------------- */
function initHeroHeadline() {
  const hero = document.getElementById('home');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!hero) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.classList.add('is-ready'));
  });
  if (reduceMotion) hero.classList.add('is-ready');
}

/* -- Scroll progress bar ---------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${Math.min(pct, 100)}%`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
  update();
}

/* -- Particle constellation behind the hero ---------------- */
function initHeroCanvas() {
  const hero = document.getElementById('home');
  const canvas = document.getElementById('hero-canvas');
  if (!hero || !canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = null;
  let running = false;

  const DENSITY = 9000; // px^2 per particle
  const LINK_DIST = 130;

  function resize() {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(18, Math.min(110, Math.round((width * height) / DENSITY)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < LINK_DIST * LINK_DIST) {
          const alpha = (1 - Math.sqrt(dist2) / LINK_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(126,232,180,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    if (running) rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    tick();
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  resize();

  const inView = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
    },
    { rootMargin: '100px 0px' }
  );
  inView.observe(hero);

  window.addEventListener('resize', () => {
    resize();
    if (running) tick();
  });
}

/* -- Soft cursor glow inside the hero --------------------- */
function initHeroGlow() {
  const hero = document.getElementById('home');
  const glow = document.querySelector('.hero-glow');
  if (!hero || !glow) return;

  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!hasFinePointer) return;

  const tx = { x: -260, y: -260 };
  const pos = { x: -260, y: -260 };
  let rafId = null;

  let active = false;
  hero.addEventListener('mouseenter', () => (active = true));
  hero.addEventListener('mouseleave', () => {
    active = false;
    pos.x = pos.y = -260;
  });

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    tx.x = e.clientX - rect.left;
    tx.y = e.clientY - rect.top;
    if (!rafId) {
      rafId = requestAnimationFrame(loop);
    }
  });

  function loop() {
    pos.x += (tx.x - pos.x) * 0.08;
    pos.y += (tx.y - pos.y) * 0.08;
    glow.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    if (active) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  }
}

/* -- Magnetic buttons ------------------------------------- */
function initMagnetic() {
  const buttons = document.querySelectorAll('.hero-actions .btn, .join-cta .btn');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    let rafId = null;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      target.x = (e.clientX - rect.left - rect.width / 2) * 0.22;
      target.y = (e.clientY - rect.top - rect.height / 2) * 0.24;
      if (!rafId) rafId = requestAnimationFrame(loop);
    });

    btn.addEventListener('mouseleave', () => {
      target.x = 0;
      target.y = 0;
    });

    function loop() {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      btn.style.transform = `translate(${current.x}px, ${current.y}px)`;
      if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    }
  });
}

/* -- 3D tilt on activity cards (rebindable for re-renders) -- */
const tiltBound = new WeakSet();

export function rebindTilts() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach((card) => {
    if (tiltBound.has(card)) return;
    tiltBound.add(card);

    let rafId = null;
    const rot = { x: 0, y: 0 };
    const next = { x: 0, y: 0 };

    const loop = () => {
      rot.x += (next.x - rot.x) * 0.14;
      rot.y += (next.y - rot.y) * 0.14;
      card.style.transform = `perspective(700px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`;
      if (Math.abs(next.x - rot.x) > 0.01 || Math.abs(next.y - rot.y) > 0.01) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    };

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      next.y = (px - 0.5) * 10;
      next.x = (0.5 - py) * 10;
      if (!rafId) rafId = requestAnimationFrame(loop);
    });

    card.addEventListener('mouseleave', () => {
      next.x = 0;
      next.y = 0;
    });
  });
}

function initTilt() {
  rebindTilts();
}