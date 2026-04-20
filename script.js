/* ══════════════════════════════════════════════════════════════════
   PORTFOLIO — script.js
   Owner  : Vishesh Jaiswal
   ──────────────────────────────────────────────────────────────────
   SECTIONS IN THIS FILE:
   §1    Preloader          — progress bar 0→88 + fade on window.load
                              (0→100 counter removed for cleaner look)
   §2    DOM Cache          — getElementById calls cached once at top
   §3    EmailJS Init       — initialise SDK early (prevents send delay)
   §4    Custom CSS Cursor  — dot snaps, ring lerps at 0.11 factor
   §5    Hamburger Nav      — slide-in mobile menu + overlay backdrop
   §6    Theme Toggle       — dark/light mode, saved to localStorage
   §7    Scroll Handler     — RAF-throttled: navbar shrink, scroll bar,
                              active nav link, show/hide FABs
   §8    Typing Effect      — 4 roles typed/erased in loop
   §9    Scroll Reveal      — IntersectionObserver fade-in for sections
   §10   Skill Bar Anim     — bars animate to data-w% on scroll reveal
   §11   Stat Counter       — countUp() easeOutCubic RAF loop
   §12   Project Filter     — filter buttons show/hide project cards
   §13   Space Canvas       — stars, nebula, particles, shooting stars,
                              constellations, pulsing rings (paused on
                              hidden tab, resized debounced 300ms)
   §14   3D Card Tilt       — mousemove perspective tilt on .tilt-card
   §15   Magnetic Buttons   — cursor-attraction on .magnetic elements
   §16   GitHub Repos       — live fetch + skeleton + repo card inject
   §17   Project Data       — all 5 projects + modal open/close/slide
   §17b  Certificate Modal  — openCert/closeCert image lightbox for
                              3 certs: cpp, dsa, infosys
   §18   Contact Form       — EmailJS send + success/error feedback
   §18b  Quick-Desc Toggle  — expandable accordion on project cards
   §19   Copy Email         — clipboard copy + toast notification
   §20   Back to Top        — smooth scroll to #hero
   §21   Button Ripple      — water-ripple effect on .btn click
   §22   Cursor Hover State — body.c-hover on interactive elements
   ══════════════════════════════════════════════════════════════════ */

   
/* Prevent scroll restoration on back/forward nav (some browsers restore to old scroll position by default) */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
/* ─── §1  CINEMATIC INTRO / PRELOADER ───────────────────────── */
/*
   Drives the full cinematic opening animation:

   PHASE 1 — Loading (0 → 88% progress bar):
     • Photo scales from 2.4× → 1.8× with a smooth CSS transition
     • Letter-by-letter name animation runs via CSS (staggered delays)
     • Progress bar ticks up quickly from 0 → 88

   PHASE 2 — On window.load (assets done):
     • Bar jumps to 100%
     • Short pause (300ms) then .reveal is added to #preloader
     • CSS .reveal triggers:
         - Photo zooms from 1.8× → 0.5× and fades (scale + opacity)
         - cin-stage (text/ring) fades out
         - cin-top curtain slides UP off screen
         - cin-bot curtain slides DOWN off screen
     • 900ms later: .gone class removes the overlay from DOM flow
     • Hero content staggered-animates in after overlay is gone
*/
(function initCinematicIntro() {
  const preloader = document.getElementById('preloader');
  const bar       = document.getElementById('preBar');
  const cinPhoto  = document.getElementById('cinPhoto');
  let   current   = 0;
  let   loaded    = false;

  /* ── Phase 1: tick bar from 0 → 88 quickly ── */
  function tick() {
    if (current < 88 && !loaded) {
      current += Math.random() * 3.5 + 1;
      if (current > 88) current = 88;
      if (bar) bar.style.width = current + '%';
      setTimeout(tick, 30);
    }
  }
  tick();

  /* ── Phase 2: on window.load → trigger cinematic reveal ── */
  window.addEventListener('load', () => {
    loaded = true;
    if (bar) bar.style.width = '100%';

    /* Last letter animates at 2.10s delay + 0.4s duration = 2.5s from page start.
       We wait until the full name is written before revealing (minimum 2.6s from load). */
    const pageStartTime = performance.now();
    const minWaitMs = 2600; /* ms from page load until all letters are visible */

    function doReveal() {
      if (preloader) preloader.classList.add('reveal');

      /* After curtains finish sliding (900ms), fully remove overlay */
      setTimeout(() => {
        if (preloader) preloader.classList.add('gone');
        document.body.classList.add('reveal-done'); /* ← triggers #cinemaOverlay to slide away */

        /* Stagger hero content in once the stage is clear */
        document.querySelectorAll('.hero-left > *').forEach((el, i) => {
          el.style.opacity    = '0';
          el.style.transform  = 'translateY(28px)';
          el.style.transition = `opacity .6s ease ${0.15 + i * 0.1}s,
                                 transform .6s ease ${0.15 + i * 0.1}s`;
          requestAnimationFrame(() => requestAnimationFrame(() => {
            el.style.opacity   = '1';
            el.style.transform = 'translateY(0)';
          }));
        });
      }, 900);
    }

    /* Wait until minWaitMs has elapsed since page load so all name letters appear */
    const elapsed = performance.now() - pageStartTime;
    const remaining = Math.max(300, minWaitMs - elapsed);
    setTimeout(doReveal, remaining);
  });
})();


/* ─── §2  DOM CACHE ───────────────────────────────────────────── */
/*
   Cache all frequently-accessed elements once so we never call
   getElementById repeatedly inside loops or scroll handlers.
*/
const $ = id => document.getElementById(id);

const hamburger     = $('hamburger');
const navMenu       = $('navLinks');
const navOverlay    = $('navOverlay');
const themeBtn      = $('themeToggle');
const scrollBar     = $('scrollBar');
const navbar        = $('navbar');
const backToTop     = $('backToTop');
const whatsappBtn   = $('whatsappBtn');
const allSections   = document.querySelectorAll('section');
const navLinks      = document.querySelectorAll('.nav-links a');
const typingEl      = $('typingEl');
const projectModal  = $('projectModal');
const sliderImage   = $('sliderImage');
const sliderDots    = $('sliderDots');
const modalVideo    = $('modalVideo');
const modalVideoSrc = $('modalVideoSrc');
const noVideoMsg    = $('noVideoMsg');
const panelImages   = $('panelImages');
const panelVideo    = $('panelVideo');
const tabImages     = $('tabImages');
const tabVideo      = $('tabVideo');
const contactForm   = $('contactForm');
const formMessage   = $('formMessage');
const copyEmailBtn  = $('copyEmailBtn');
const copyToast     = $('copyToast');
const cursorDot     = $('cursorDot');
const cursorRing    = $('cursorRing');


/* ─── §3  EMAILJS INIT ────────────────────────────────────────── */
/*
   Initialise in <head> / early in JS (EmailJS SDK is loaded in <head>).
   This prevents the 15–20s first-send delay that occurs when the
   SDK is initialised lazily on first form submit.
   Replace 'mj63OiHBpYlItbYc0' with your own EmailJS Public Key.
*/
if (typeof emailjs !== 'undefined') {
  emailjs.init('mj63OiHBpYlItbYc0');
}


/* ─── §4  CUSTOM CSS CURSOR ───────────────────────────────────── */
/*
   Two-element cursor system (replaces old heavy canvas cursor):
   • #cursorDot  — 8px dot, snaps to mouse instantly via direct style
   • #cursorRing — 32px ring, lerps toward dot for elastic lag feel
   Lerp factor 0.11 = smooth but not too slow.
   Hidden on touch devices via CSS `@media (pointer: coarse)`.
*/
let mx = 0, my = 0;  /* mouse position */
let rx = 0, ry = 0;  /* ring position (lerped) */

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  /* Dot snaps immediately — no lag */
  if (cursorDot) {
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  }
});

/* Ring follows with smooth interpolation via RAF loop */
(function ringFollow() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  if (cursorRing) {
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
  }
  requestAnimationFrame(ringFollow);
})();

/* Hide cursors when mouse leaves the window */
document.addEventListener('mouseleave', () => {
  if (cursorDot)  cursorDot.style.opacity  = '0';
  if (cursorRing) cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  if (cursorDot)  cursorDot.style.opacity  = '1';
  if (cursorRing) cursorRing.style.opacity = '.55';
});


/* ─── §22  CURSOR HOVER STATE ─────────────────────────────────── */
/*
   Adds body.c-hover while the cursor is over an interactive element.
   CSS uses this to enlarge the ring and change its colour.
   Listed here (before §5) because it must run after DOM cache.
*/
const hoverTargets = 'a, button, .proj-card, .pf-btn, .tg-item, .clink, .cert-card, .ac';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
});


/* ─── §5  HAMBURGER MOBILE NAV ────────────────────────────────── */
/*
   On mobile: clicking the hamburger slides in the nav menu from the right.
   The navOverlay (semi-dark backdrop) clicking closes it.
   Any nav link click also closes the menu.
   body overflow is locked while menu is open to prevent scroll.
*/
function closeNav() {
  if (hamburger) hamburger.classList.remove('open');
  if (navMenu)   navMenu.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  if (navMenu)    navMenu.classList.toggle('open', open);
  if (navOverlay) navOverlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

if (navOverlay) navOverlay.addEventListener('click', closeNav);
navLinks.forEach(l => l.addEventListener('click', closeNav));


/* ─── §6  THEME TOGGLE ────────────────────────────────────────── */
/*
   Persists dark/light preference in localStorage.
   On page load: reads saved preference and applies immediately.
   Toggle: flips .light-mode on <body>, updates icon, saves to storage.
   ☀️ icon shown in dark mode | 🌙 icon shown in light mode.
*/
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
}

if (themeBtn) themeBtn.addEventListener('click', () => {
  const light = document.body.classList.toggle('light-mode');
  themeBtn.innerHTML = light ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  localStorage.setItem('theme', light ? 'light' : 'dark');
});


/* ─── §7  SCROLL HANDLER ──────────────────────────────────────── */
/*
   All scroll-triggered updates run inside a single RAF-throttled
   function (doScroll). This prevents multiple layout reads per
   frame and keeps 60fps scrolling smooth.
   { passive: true } tells the browser we won't call preventDefault(),
   so it doesn't have to wait for us before scrolling.
*/
let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(doScroll);
    ticking = true;
  }
}

function doScroll() {
  const y    = window.scrollY;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const prog = (y / maxY) * 100;

  /* Scroll progress bar width */
  if (scrollBar) scrollBar.style.width = prog + '%';

  /* Navbar shrink: add .scrolled class after 60px */
  if (navbar) navbar.classList.toggle('scrolled', y > 60);

  /* Show floating action buttons after 280px */
  const show = y > 280;
  if (backToTop)   backToTop.classList.toggle('show', show);
  if (whatsappBtn) whatsappBtn.classList.toggle('show', show);

  /* Highlight the active section's nav link */
  let current = '';
  allSections.forEach(s => {
    if (y >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });

  ticking = false;
}

window.addEventListener('scroll', onScroll, { passive: true });


/* ─── §8  TYPING EFFECT ───────────────────────────────────────── */
/*
   Typewriter that cycles through exactly 4 roles:
   type → hold 1700ms at full word → erase → next role → repeat.
   Uses setTimeout (not setInterval) so timing stays accurate
   across tab switches and throttled timers.
*/
const ROLES = [
  'Frontend Developer',
  'MERN Stack Developer',
  'UI/UX Enthusiast',
  'Full Stack Developer',
];

let roleIdx  = 0;
let charIdx  = 0;
let erasing  = false;
let holdType = false;

function runTyping() {
  if (!typingEl) return;

  /* Hold pause at end of word */
  if (holdType) {
    holdType = false;
    setTimeout(runTyping, 1700);
    return;
  }

  const word = ROLES[roleIdx];

  if (!erasing) {
    /* Type one character */
    charIdx++;
    typingEl.textContent = word.slice(0, charIdx);
    if (charIdx === word.length) { erasing = true; holdType = true; }
    setTimeout(runTyping, 75);
  } else {
    /* Erase one character */
    charIdx--;
    typingEl.textContent = word.slice(0, charIdx);
    if (charIdx === 0) {
      erasing = false;
      roleIdx = (roleIdx + 1) % ROLES.length;
    }
    setTimeout(runTyping, 38);
  }
}
runTyping();


/* ─── §9  SCROLL REVEAL + STAGGER ────────────────────────────── */
/*
   IntersectionObserver fires only when elements enter the viewport.
   revObs  — observes .reveal-section (adds .visible to trigger CSS)
   stagObs — observes .reveal-child (staggered delay per sibling index)
   cardObs — observes .proj-card, .tl-item, .cert-card individually
             so each animates in as it enters the viewport
   All observers unobserve after first trigger (one-time animation).
*/
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    revObs.unobserve(e.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-section').forEach(el => revObs.observe(el));

const stagObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const siblings = Array.from(e.target.parentElement.querySelectorAll('.reveal-child'));
    const i = siblings.indexOf(e.target);
    /* Only set delay if CSS hasn't already set one via nth-child */
    if (!e.target.style.transitionDelay) {
      e.target.style.transitionDelay = (i * 0.1) + 's';
    }
    e.target.classList.add('visible');
    stagObs.unobserve(e.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-child').forEach(el => stagObs.observe(el));

/* Individual card observer — proj-card, tl-item, cert-card each enter one by one */
const cardObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    cardObs.unobserve(e.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

/* Observe each project card, timeline item, cert card */
document.querySelectorAll('.proj-card, .tl-item, .cert-card').forEach(el => cardObs.observe(el));


/* ─── §10  SKILL BAR ANIMATION ────────────────────────────────── */
/*
   Watches .panel-bars with IntersectionObserver.
   When scrolled into view, animates each .sbar-fill to its
   data-w% width with a staggered delay (i × 90ms).
*/
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.sbar-fill').forEach((bar, i) => {
      const w = bar.getAttribute('data-w') || 0;
      setTimeout(() => { bar.style.width = w + '%'; }, i * 90);
    });
    barObs.unobserve(e.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.panel-bars').forEach(el => barObs.observe(el));


/* ─── §11  STAT COUNTER ANIMATION ─────────────────────────────── */
/*
   countUp: animates a number element from 0 to data-target
   using easeOutCubic over 1800ms via requestAnimationFrame.
   IntersectionObserver triggers it only once when .hero-stats
   enters the viewport (threshold 0.5 = half visible).
*/
function countUp(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const dur    = 1800;
  const start  = performance.now();

  function step(now) {
    const t = Math.min((now - start) / dur, 1);
    /* easeOutCubic easing: fast start, smooth deceleration */
    el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.stat-n').forEach(countUp);
    statObs.unobserve(e.target);
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statObs.observe(statsEl);

/* Also animate the .sk-num counters in the skills stat strip */
/* These use the same countUp() function — just a different container */
const skStatObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    /* sk-num elements use data-target just like stat-n */
    e.target.querySelectorAll('.sk-num').forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const dur = 1600;
      const start = performance.now();
      function step(now) {
        const t = Math.min((now - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
    skStatObs.unobserve(e.target);
  });
}, { threshold: 0.4 });

const skStripEl = document.querySelector('.skills-stat-strip');
if (skStripEl) skStatObs.observe(skStripEl);


/* ─── §12  PROJECT FILTER ─────────────────────────────────────── */
/*
   Filter buttons show/hide project cards based on data-tags.
   Active filter button gets .active class (for CSS styling).
   Cards not matching get .hidden class (CSS: display:none / scale:0).
*/
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.getAttribute('data-filter');
    document.querySelectorAll('.proj-card').forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      card.classList.toggle('hidden', f !== 'all' && !tags.includes(f));
    });
  });
});


/* ─── §13  SPACE CANVAS BACKGROUND ─────────────────────────────── */
/*
   Unified canvas rendering all space effects:

   Elements rendered each frame:
   ┌─────────────────────────────────────┐
   │ 1. Nebula blobs (5 radial gradients)│
   │ 2. Pulse rings (random intervals)   │
   │ 3. Constellation edges + nodes      │
   │ 4. Stars (twinkle via sin wave)     │
   │ 5. Particles + connection lines     │
   │ 6. Shooting stars (colorful trails) │
   └─────────────────────────────────────┘

   Optimisations:
   ✓ Canvas paused via document.visibilitychange when tab hidden
   ✓ Resize debounced 300ms (no rebuild spam during window drag)
   ✓ Particle count auto-halved on mobile (≤768px viewport)
   ✓ Mouse move for canvas throttled to once per rAF frame
   ✓ canvas.getContext called once, no repeated calls
*/
(function initSpaceCanvas() {
  const cv  = $('spaceCanvas');
  if (!cv) return;
  /* alpha:true needed (transparent bg). willReadFrequently:false = default,
     which is correct here — we only write to the canvas, never read back. */
  const ctx = cv.getContext('2d', { alpha: true });

  let W, H;
  let pmx = 0, pmy = 0;           /* canvas-tracked mouse position */
  let mouseDirty = false;          /* throttle: update pmx/pmy once per frame */
  let animPaused = false;          /* true when tab is hidden */
  let rafId      = null;           /* requestAnimationFrame ID for cancellation */
  let resizeTimer = null;          /* debounce resize rebuild */

  /* Track mouse but only write to pmx/pmy once per frame (throttle) */
  document.addEventListener('mousemove', e => {
    if (!mouseDirty) {
      requestAnimationFrame(() => {
        pmx = e.clientX;
        pmy = e.clientY;
        mouseDirty = false;
      });
      mouseDirty = true;
    }
  });

  /* Pause canvas rAF loop when tab is hidden — saves significant CPU */
  document.addEventListener('visibilitychange', () => {
    animPaused = document.hidden;
    if (!animPaused && !rafId) {
      rafId = requestAnimationFrame(draw); /* resume */
    }
  });

  /* Debounced resize: only rebuilds scene 300ms after last resize event */
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 300);
  });

  function resize() {
    W = cv.width  = window.innerWidth;
    H = cv.height = window.innerHeight;
    buildStars();
    buildConstellations();
    buildParts();
  }

  /* ── Stars — 3 size tiers, random blue/warm hue ── */
  let stars = [];
  function buildStars() {
    /* Density capped at 800 max; scales to viewport size */
    const count = Math.min(Math.floor((W * H) / 1800), 800);
    stars = Array.from({ length: count }, () => {
      const tier = Math.random();
      return {
        x:            Math.random() * W,
        y:            Math.random() * H,
        r:            tier > .9 ? Math.random() * 1.6 + 1.2
                    : tier > .7 ? Math.random() * .9  + .6
                    :             Math.random() * .5  + .15,
        alpha:        Math.random() * 0.7 + 0.15,
        twinkleSpd:   Math.random() * 0.025 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
        /* 85% cool white, 7.5% cool blue, 7.5% warm amber */
        hue: Math.random() > .85
          ? (Math.random() > .5 ? '180,200,255' : '255,200,180')
          : '220,220,255',
      };
    });
  }

  /* ── Nebula blobs (5 large slowly-drifting coloured patches) ── */
  const NEBULAE = [
    { x:.12, y:.18, r:.32, hue:'124,92,252',  t:0,   ts:.00035 },
    { x:.80, y:.50, r:.28, hue:'0,229,200',   t:1.5, ts:.00028 },
    { x:.42, y:.85, r:.22, hue:'255,100,150', t:3,   ts:.00042 },
    { x:.70, y:.12, r:.18, hue:'255,180,50',  t:0.8, ts:.00050 },
    { x:.25, y:.60, r:.20, hue:'80,180,255',  t:2.2, ts:.00038 },
  ];

  /* ── Constellation clusters (star groups with connecting lines) ── */
  let constellations = [];
  function buildConstellations() {
    constellations = [];
    const clusterCount = Math.floor(W / 400);
    for (let c = 0; c < clusterCount; c++) {
      const cx = Math.random() * W;
      const cy = Math.random() * H;
      const nodeCount = Math.floor(Math.random() * 4) + 3;
      const nodes = Array.from({ length: nodeCount }, () => ({
        x: cx + (Math.random() - .5) * 180,
        y: cy + (Math.random() - .5) * 180,
        r: Math.random() * 1.2 + .5,
      }));
      const edges = [];
      for (let i = 0; i < nodes.length - 1; i++) {
        edges.push([i, i + 1]);
        if (i < nodes.length - 2 && Math.random() > .5) edges.push([i, i + 2]);
      }
      constellations.push({ nodes, edges });
    }
  }

  /* ── Floating particles — halved on mobile for performance ── */
  /* Mobile (≤768px): 28 particles; desktop: 55 particles */
  const isMobile   = () => window.innerWidth <= 768;
  const PART_COUNT = () => isMobile() ? 28 : 55;
  const CONN_DIST  = 130;
  let   parts      = [];
  const PART_COLORS = ['124,92,252', '0,229,200', '180,180,255', '255,120,180'];

  function buildParts() {
    const count = PART_COUNT();
    parts = Array.from({ length: count }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      r:  Math.random() * 1.8 + .5,
      ci: Math.floor(Math.random() * PART_COLORS.length),
    }));
  }

  /* ── Shooting stars (spawn every 3–7 seconds) ── */
  let shooters = [];
  const SHOOTER_COLORS = [
    'rgba(255,255,255,',  /* white */
    'rgba(160,120,255,',  /* violet */
    'rgba(0,229,200,',    /* cyan */
    'rgba(255,200,80,',   /* gold */
  ];

  function spawnShooter() {
    const fromTop = Math.random() > .4;
    const ci = Math.floor(Math.random() * SHOOTER_COLORS.length);
    shooters.push({
      x:     fromTop ? Math.random() * W * .8 : -20,
      y:     fromTop ? -20 : Math.random() * H * .5,
      vx:    fromTop ? (Math.random() * 5 + 3.5) : (Math.random() * 6 + 4),
      vy:    fromTop ? (Math.random() * 3.5 + 2) : (Math.random() * 2 + .8),
      len:   Math.random() * 130 + 70,
      alpha: 1,
      fade:  Math.random() * 0.018 + 0.012,
      color: SHOOTER_COLORS[ci],
      width: Math.random() * 1.2 + .8,
    });
  }

  /* Recurring shooter spawn (not setInterval so timing drifts less) */
  function scheduleShooter() {
    if (!animPaused) spawnShooter();
    setTimeout(scheduleShooter, Math.random() * 4000 + 3000);
  }
  setTimeout(scheduleShooter, 1500);

  /* ── Pulsing deep-space rings ── */
  let pulseRings = [];
  function spawnRing() {
    if (animPaused) return;
    pulseRings.push({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     0,
      maxR:  Math.random() * 120 + 60,
      alpha: .18,
      speed: Math.random() * .6 + .3,
      hue:   Math.random() > .5 ? '124,92,252' : '0,229,200',
    });
  }
  setInterval(spawnRing, 4500);

  /* ─── MAIN DRAW LOOP ─── */
  function draw() {
    /* If tab hidden, stop scheduling new frames */
    if (animPaused) { rafId = null; return; }

    ctx.clearRect(0, 0, W, H);
    const isLight = document.body.classList.contains('light-mode');
    const ba      = isLight ? 0.22 : 1; /* reduce all alpha in light mode */

    /* ── Draw: Nebulae ── */
    NEBULAE.forEach(n => {
      n.t += n.ts;
      const nx = (n.x + Math.sin(n.t) * .06) * W;
      const ny = (n.y + Math.cos(n.t * .7) * .05) * H;
      const nr = n.r * Math.min(W, H);
      const g  = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
      g.addColorStop(0, `rgba(${n.hue},${.10 * ba})`);
      g.addColorStop(.5,`rgba(${n.hue},${.04 * ba})`);
      g.addColorStop(1, `rgba(${n.hue},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(nx, ny, nr, 0, Math.PI * 2);
      ctx.fill();
    });

    /* ── Draw: Pulse rings ── */
    pulseRings = pulseRings.filter(ring => {
      ring.r += ring.speed;
      ring.alpha -= ring.alpha / (ring.maxR / ring.speed);
      if (ring.alpha < .005 || ring.r > ring.maxR) return false;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ring.hue},${ring.alpha * ba})`;
      ctx.lineWidth   = 1;
      ctx.stroke();
      return true;
    });

    /* ── Draw: Constellations ── */
    constellations.forEach(cl => {
      cl.edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(cl.nodes[a].x, cl.nodes[a].y);
        ctx.lineTo(cl.nodes[b].x, cl.nodes[b].y);
        ctx.strokeStyle = `rgba(180,160,255,${.07 * ba})`;
        ctx.lineWidth   = .5;
        ctx.stroke();
      });
      cl.nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${.55 * ba})`;
        ctx.fill();
      });
    });

    /* ── Draw: Stars (with twinkle and glow for large ones) ── */
    stars.forEach(s => {
      s.twinklePhase += s.twinkleSpd;
      const a = s.alpha * (.55 + .45 * Math.sin(s.twinklePhase)) * ba;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.hue},${a})`;
      ctx.fill();
      /* Soft glow only for larger stars (r > 1.1) to save draw calls */
      if (s.r > 1.1) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${a * .15})`;
        ctx.fill();
      }
    });

    /* ── Draw: Particles + mouse attraction physics ── */
    parts.forEach(p => {
      /* Attract particle toward mouse within 200px radius */
      const dx = pmx - p.x, dy = pmy - p.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 200) {
        const f = (200 - d) / 200 * .0008;
        p.vx += dx * f;
        p.vy += dy * f;
      }
      /* Apply friction + clamp speed to 1.5 */
      p.vx *= .993; p.vy *= .993;
      const spd = Math.hypot(p.vx, p.vy);
      if (spd > 1.5) { p.vx /= spd / 1.5; p.vy /= spd / 1.5; }
      /* Move + wrap around edges */
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      /* Draw particle dot */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${PART_COLORS[p.ci]},${.6 * ba})`;
      ctx.fill();
    });

    /* ── Draw: Particle connection lines ── */
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        const dx = parts[i].x - parts[j].x;
        const dy = parts[i].y - parts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONN_DIST) {
          ctx.beginPath();
          ctx.moveTo(parts[i].x, parts[i].y);
          ctx.lineTo(parts[j].x, parts[j].y);
          ctx.strokeStyle = `rgba(${PART_COLORS[parts[i].ci]},${(1 - d / CONN_DIST) * .2 * ba})`;
          ctx.lineWidth   = .6;
          ctx.stroke();
        }
      }
    }

    /* ── Draw: Shooting stars ── */
    shooters = shooters.filter(s => {
      s.x += s.vx; s.y += s.vy; s.alpha -= s.fade;
      if (s.alpha <= 0 || s.x > W + 150 || s.y > H + 150) return false;

      const mag  = Math.hypot(s.vx, s.vy);
      const tail = { x: s.x - (s.vx / mag) * s.len, y: s.y - (s.vy / mag) * s.len };
      const grad = ctx.createLinearGradient(tail.x, tail.y, s.x, s.y);
      grad.addColorStop(0,   s.color + '0)');
      grad.addColorStop(.7,  s.color + (s.alpha * .4 * ba) + ')');
      grad.addColorStop(1,   s.color + (s.alpha * ba) + ')');

      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = s.width;
      ctx.shadowBlur  = 12;
      ctx.shadowColor = s.color + (s.alpha * .8) + ')';
      ctx.stroke();
      ctx.shadowBlur  = 0;

      /* Head flare dot */
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.width * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = s.color + (s.alpha * .9 * ba) + ')';
      ctx.fill();

      return true;
    });

    rafId = requestAnimationFrame(draw); /* schedule next frame */
  }

  /* Initial setup */
  resize();
  rafId = requestAnimationFrame(draw);
})();


/* ─── §14  3D CARD TILT EFFECT ────────────────────────────────── */
/*
   On mousemove over .tilt-card: rotateX/Y up to ±9° based on
   the cursor's offset from the card centre.
   On mouseleave: smoothly resets to flat.
   The project image inside gets a subtle parallax shift too.
*/
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const rx = ((e.clientY - cy) / (r.height / 2)) * -9;
    const ry = ((e.clientX - cx) / (r.width  / 2)) *  9;

    card.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    card.style.transition = 'transform 0.08s ease';

    /* Parallax the card's image in the opposite direction */
    const img = card.querySelector('.proj-img');
    if (img) {
      img.style.transform  = `translate(${ry * .55}px, ${rx * -.55}px) scale(1.06)`;
      img.style.transition = 'transform 0.08s ease';
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform .55s cubic-bezier(.4,0,.2,1)';
    const img = card.querySelector('.proj-img');
    if (img) {
      img.style.transform  = '';
      img.style.transition = 'transform .55s cubic-bezier(.4,0,.2,1)';
    }
  });
});


/* ─── §15  MAGNETIC BUTTON EFFECT ─────────────────────────────── */
/*
   .magnetic buttons shift toward the cursor on hover,
   creating a satisfying tactile pull effect.
   Shift amount: 32% of cursor offset from button centre.
*/
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) * .32;
    const dy = (e.clientY - r.top  - r.height / 2) * .32;
    btn.style.transform  = `translate(${dx}px, ${dy}px)`;
    btn.style.transition = 'transform .12s ease';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform  = '';
    btn.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1)';
  });
});


/* ─── §16  GITHUB REPOS ───────────────────────────────────────── */
/*
   Fetches latest 6 non-forked repos from GitHub API.
   Shows skeleton placeholder cards while loading.
   Falls back gracefully if API rate limit is hit.
*/
const GH_USER   = 'Visheshjais';
const LANG_DOTS = {
  JavaScript: '#F7DF1E',
  TypeScript:  '#3178C6',
  Python:      '#3572A5',
  HTML:        '#E34C26',
  CSS:         '#563D7C',
  'C++':       '#F34B7D',
  default:     '#8888aa',
};

async function loadRepos() {
  const grid = $('repos');
  if (!grid) return;

  /* Show 6 skeleton placeholder cards while fetching */
  grid.innerHTML = Array(6).fill(`
    <div class="repo-card" style="opacity:.35; pointer-events:none">
      <div class="repo-name"><i class="fab fa-github"></i> Loading…</div>
      <div class="repo-desc">Fetching data…</div>
    </div>`).join('');

  try {
    const res  = await fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=20`);
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error('Rate limit or API error');

    const repos = data.filter(r => !r.fork).slice(0, 6);

    grid.innerHTML = repos.map(r => {
      const lang = r.language || 'N/A';
      const dot  = LANG_DOTS[lang] || LANG_DOTS.default;
      /* Truncate long descriptions */
      const desc = r.description
        ? (r.description.length > 85 ? r.description.slice(0, 85) + '…' : r.description)
        : 'No description.';

      return `
        <a href="${r.html_url}" target="_blank" rel="noopener" class="repo-card">
          <div class="repo-name"><i class="fab fa-github" style="opacity:.4"></i> ${r.name}</div>
          <div class="repo-desc">${desc}</div>
          <div class="repo-meta">
            ${lang !== 'N/A' ? `<span><span class="repo-lang-dot" style="background:${dot}"></span>${lang}</span>` : ''}
            <span>⭐ ${r.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i> ${r.forks_count}</span>
          </div>
        </a>`;
    }).join('');

    /* Apply stagger reveal animation to freshly injected repo cards */
    grid.querySelectorAll('.repo-card').forEach(c => stagObs.observe(c));

  } catch {
    grid.innerHTML = '<p style="color:var(--t2); text-align:center; padding:32px">Could not load repositories. GitHub API rate limit may have been reached.</p>';
  }
}
loadRepos();


/* ─── §17  PROJECT DATA — ALL 5 PROJECTS ─────────────────────── */
/*
   Single source of truth for all project modal content.
   Images: PNG only (images/*.png, filenames use hyphens not spaces).
   videoSrc: empty string = "coming soon" message shown.
*/
const projectData = {

  groovix: {
    title:       'Groovix Music Player',
    description: 'A Spotify-inspired music streaming web app built on the MERN stack. Streams music in real-time via the YouTube Data API. Features JWT authentication with HTTP-only cookies, user playlists, song likes, search, and a fully animated dark-mode player with play/pause, seek, volume, and shuffle controls. Frontend built with React + Vite.',
    tech:        ['React', 'Node.js', 'Express', 'MongoDB', 'YouTube API', 'JWT', 'Vite'],
    images:      ['images/groovix-1.png', 'images/groovix-2.png', 'images/groovix-3.png'],
    fallback:    ['images/groovix-1.png', 'images/groovix-2.png', 'images/groovix-3.png'],
    github:      'https://github.com/Visheshjais/Groovix-MuiscPlayer',
    demo:        'https://groovix-frontend.vercel.app/',
    videoSrc:    '',
  },

  jobhunt: {
    title:       'JobHunt — Full Stack Job Portal',
    description: 'Dual-role job portal. Job seekers browse listings, apply with resume uploads, and track application status (Pending → Accepted/Rejected). Recruiters register companies, post jobs, and manage candidates. Google OAuth 2.0 login, Cloudinary for file storage, Redux Toolkit for state, JWT-cookie auth. React + Tailwind CSS frontend.',
    tech:        ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS', 'Google OAuth', 'Cloudinary', 'JWT'],
    images:      ['images/jobhunt-1.png', 'images/jobhunt-2.png', 'images/jobhunt-3.png', 'images/jobhunt-4.png'],
    fallback:    ['images/jobhunt-1.png', 'images/jobhunt-2.png', 'images/jobhunt-3.png', 'images/jobhunt-4.png'],
    github:      'https://github.com/Visheshjais/JobHunt',
    demo:        'https://job-hunt-frontend-nine.vercel.app/',
    videoSrc:    '',
  },

  golf: {
    title:       'Golf Charity Platform',
    description: 'Subscription-based golf & charity web app. Users subscribe via Stripe (monthly/yearly), submit golf scores, and enter monthly prize draws. Charity module for donations and fundraising tracking. Animated ball-reveal draw at month end. Admin dashboard for draw management, winner verification, charity control, and payouts. Nodemailer for email notifications.',
    tech:        ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'Nodemailer'],
    images:      ['images/golf-1.png', 'images/golf-2.png', 'images/golf-3.png', 'images/golf-4.png', 'images/golf-5.png'],
    fallback:    ['images/golf-1.png', 'images/golf-2.png', 'images/golf-3.png', 'images/golf-4.png', 'images/golf-5.png'],
    github:      'https://github.com/Visheshjais/golf-platform',
    demo:        'https://golfplatform-frontend.vercel.app/',
    videoSrc:    '',
  },

  unmasking: {
    title:       'Unmasking Illusion — Deepfake Detection',
    description: 'AI-powered deepfake detection system. Upload an image or video clip; the system runs it through a fine-tuned EfficientNet B4 model (PyTorch) trained on FaceForensics++ dataset, achieving ~92% accuracy. OpenCV handles frame extraction and face-region cropping. Flask backend returns confidence score and a visual heatmap of tampered regions. HTML/CSS/JS drag-and-drop frontend.',
    tech:        ['Python', 'PyTorch', 'EfficientNet B4', 'Flask', 'OpenCV', 'JavaScript', 'HTML5'],
    images:      ['images/Unmasking-1.png', 'images/Unmasking-2.png', 'images/Unmasking-3.png'],
    fallback:    ['images/Unmasking-1.png', 'images/Unmasking-2.png', 'images/Unmasking-3.png'],
    github:      'https://github.com/Visheshjais/Unmasking-Illusion-deepfake-detection-web-app',
    demo:        '',
    videoSrc:    '',
  },

  translation: {
    title:       'Lingua AI — All-in-One Translation',
    description: 'Multilingual translation platform supporting 50+ languages. Four translation modes: Text (type and translate instantly), Voice Input (speak via Web Speech API), Text-to-Speech (hear translation in target language), Document Upload (translate .txt/.pdf files). Built with pure HTML/CSS/JavaScript — no frameworks. Features dark mode, language auto-detect, and copy-to-clipboard buttons.',
    tech:        ['Node.js', 'JavaScript', 'HTML5', 'CSS3', 'Web Speech API', 'Translation APIs'],
    images: [
      'images/Lingua-AI-All-in-One-Translation-1.png',
      'images/Lingua-AI-All-in-One-Translation-2.png',
      'images/Lingua-AI-All-in-One-Translation-3.png',
      'images/Lingua-AI-All-in-One-Translation-4.png',
      'images/Lingua-AI-All-in-One-Translation-5.png',
      'images/Lingua-AI-All-in-One-Translation-6.png',
    ],
    fallback: [
      'images/Lingua-AI-All-in-One-Translation-1.png',
      'images/Lingua-AI-All-in-One-Translation-2.png',
      'images/Lingua-AI-All-in-One-Translation-3.png',
      'images/Lingua-AI-All-in-One-Translation-4.png',
      'images/Lingua-AI-All-in-One-Translation-5.png',
      'images/Lingua-AI-All-in-One-Translation-6.png',
    ],
    github:   'https://github.com/Visheshjais/LinguaAI',
    demo:     'https://lingua-ai-nu.vercel.app/',
    videoSrc: '',
  },

  /* ── PROJECT 06: TaskSphere ── */
  tasksphere: {
    title:       'TaskSphere — Multi-Tenant Task Management Platform',
    description: 'Full-stack MERN task management platform built for multiple organisations (multi-tenancy) with role-based access control. Three roles: SuperAdmin, Admin, and Member — each with isolated dashboards and permissions. Features a Kanban drag-and-drop board, dashboard analytics, overdue task alerts, and member workload management.',
    tech:        ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
    /* No screenshots yet — array populated with a placeholder so modal opens cleanly */
    images:  ['images/tasksphere-placeholder.png'],
    fallback:['images/tasksphere-placeholder.png'],
    github:   '#',   /* Add your GitHub link here when ready */
    demo:     '#',   /* Add your Live Demo link here when ready */
    videoSrc: '',
  },
};


/* ── Modal state ── */
let curSlide   = 0;
let curProject = null;

/* Opens the project modal, populates all content, and shows it */
function openProject(key) {
  const p = projectData[key];
  if (!p) return;

  curProject = p;
  curSlide   = 0;

  $('modalTitle').textContent       = p.title;
  $('modalDescription').textContent = p.description;
  /* Tech tag spans */
  $('modalTech').innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');

  $('modalGithub').href = p.github || '#';
  $('modalDemo').href   = p.demo   || '#';

  buildDots(p.images.length);
  showSlide();
  setupVideo(p.videoSrc);
  switchTab('images');

  projectModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* Build dot indicator row for the image slider */
function buildDots(n) {
  sliderDots.innerHTML = Array.from({ length: n }, (_, i) =>
    `<div class="sl-dot${i === 0 ? ' active' : ''}" onclick="goSlide(${i})"></div>`
  ).join('');
}

/* Show the current slide image using the PNG path for the current slide */
function showSlide() {
  if (!curProject) return;
  sliderImage.src = curProject.fallback[curSlide];
  /* Update active dot indicator */
  document.querySelectorAll('.sl-dot').forEach((d, i) => {
    d.classList.toggle('active', i === curSlide);
  });
}

function goSlide(i) {
  if (!curProject) return;
  curSlide = (i + curProject.images.length) % curProject.images.length;
  showSlide();
}
function nextSlide() { if (curProject) goSlide(curSlide + 1); }
function prevSlide() { if (curProject) goSlide(curSlide - 1); }

/* Set up the video tab (show video or "coming soon" message) */
function setupVideo(src) {
  if (src) {
    modalVideoSrc.src        = src;
    modalVideo.load();
    modalVideo.style.display = 'block';
    noVideoMsg.style.display = 'none';
  } else {
    modalVideo.style.display = 'none';
    noVideoMsg.style.display = 'flex';
  }
}

/* Switch between Screenshots and Video tabs in the modal */
function switchTab(tab) {
  const imgs = tab === 'images';
  panelImages.style.display = imgs ? 'block' : 'none';
  panelVideo.style.display  = imgs ? 'none'  : 'block';
  tabImages.classList.toggle('active',  imgs);
  tabVideo.classList.toggle('active',  !imgs);
  /* Pause video when switching away from it */
  if (imgs && modalVideo && !modalVideo.paused) modalVideo.pause();
}

function closeProject() {
  projectModal.classList.remove('open');
  document.body.style.overflow = '';
  if (modalVideo && !modalVideo.paused) modalVideo.pause();
  curProject = null;
}

/* Close modal on backdrop click */
if (projectModal) {
  projectModal.addEventListener('click', e => {
    if (e.target === projectModal) closeProject();
  });
}

/* Keyboard controls in modal: Escape = close, ← / → = prev/next image */
document.addEventListener('keydown', e => {
  if (!projectModal || !projectModal.classList.contains('open')) return;
  if (e.key === 'Escape')     closeProject();
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft')  prevSlide();
});


/* ─── §18  CONTACT FORM (EmailJS) ─────────────────────────────── */
/*
   Submits the form using EmailJS sendForm().
   Shows spinner on the button while sending.
   On success: clears form, shows green success message.
   On failure: shows red error with fallback email.
   IMPORTANT: Replace service/template IDs with your own values from
   emailjs.com Dashboard → Email Services / Email Templates.
*/
if (contactForm) contactForm.addEventListener('submit', async e => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled  = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  formMessage.textContent = '';
  formMessage.className   = '';

  try {
    await emailjs.sendForm(
      'service_portfolioVJ',   /* ← Replace with your EmailJS Service ID  */
      'template_portfolioVJ',  /* ← Replace with your EmailJS Template ID */
      contactForm
    );
    formMessage.textContent = '✅ Message sent! I\'ll reply soon.';
    formMessage.className   = 'success';
    contactForm.reset();
  } catch (err) {
    formMessage.textContent = '❌ Failed to send. Email me directly: jaiswalvishesh1214@gmail.com';
    formMessage.className   = 'error';
    console.error('EmailJS error:', err);
  } finally {
    btn.disabled  = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});


/* ─── §18b  PROJECT QUICK-DESC ACCORDION ──────────────────────── */
/*
   Toggles the expandable description panel inside each project card.
   Closes any previously open panel first (only one open at a time).
   Called via inline onclick — stopPropagation() prevents the card
   from also opening the full project modal when toggling.
*/
function toggleQuickDesc(btn) {
  const content = btn.nextElementSibling;
  const isOpen  = content.classList.contains('open');

  /* Close all other open panels */
  document.querySelectorAll('.proj-quick-content.open').forEach(el => {
    el.classList.remove('open');
    el.previousElementSibling.classList.remove('open');
  });

  /* Toggle the clicked panel */
  if (!isOpen) {
    content.classList.add('open');
    btn.classList.add('open');
  }
}


/* ─── §19  COPY EMAIL ─────────────────────────────────────────── */
/*
   Copies the email address to clipboard when the email contact row
   is clicked. Shows a toast notification for 2.8 seconds.
*/
if (copyEmailBtn) copyEmailBtn.addEventListener('click', () => {
  navigator.clipboard.writeText('jaiswalvishesh1214@gmail.com').then(() => {
    if (copyToast) {
      copyToast.classList.add('show');
      setTimeout(() => copyToast.classList.remove('show'), 2800);
    }
  });
});


/* ─── §20  BACK TO TOP ────────────────────────────────────────── */
/* Smooth scroll to top — FAB button shown after 280px scroll */
if (backToTop) backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ─── §21  BUTTON RIPPLE EFFECT ──────────────────────────────── */
/*
   Adds a water-ripple effect to all .btn elements on click.
   Creates a <span> element at the click position, animates it
   expanding outward, then removes it after the animation ends.
*/
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const r     = btn.getBoundingClientRect();
    const spark = document.createElement('span');
    const size  = Math.max(r.width, r.height) * 2;

    spark.className    = 'ripple-spark';
    spark.style.width  = size + 'px';
    spark.style.height = size + 'px';
    spark.style.left   = (e.clientX - r.left  - size / 2) + 'px';
    spark.style.top    = (e.clientY - r.top   - size / 2) + 'px';

    btn.appendChild(spark);
    spark.addEventListener('animationend', () => spark.remove());
  });
});


/* ─── §17b  CERTIFICATE IMAGE LIGHTBOX ───────────────────────── */
/*
   Handles the certificate image modal (separate from project modal).
   Three certificates are supported:
     'cpp'     → images/cert-cpp.jpg    (Udemy C++ course, 2024)
     'dsa'     → images/cert-dsa.jpg    (Udemy DSA course, 2024)
     'infosys' → images/cert-infosys.jpg (Infosys Springboard, 2022)

   openCert(key)  — swaps the <img> src and shows the modal
   closeCert()    — hides the modal and clears the src
   Backdrop click and ESC key also close the modal.
*/

/* Map cert keys to their image paths */
/* Map cert keys to their image paths */
const certImages = {
  wdr: 'images/cert-wdr.png',
  dsa: 'images/cert-dsa.jpg',
  infosys: 'images/cert-infosys.jpg',
  internship: [
    'images/cert-exp.jpeg',
    'images/cert-training.jpeg'
  ]
};

let currentIndex = 0;
let currentImages = [];

/* Opens the certificate lightbox and loads the correct image */
function openCert(key) {
  const modal = document.getElementById('certModal');
  const img   = document.getElementById('certModalImg');

  if (!modal || !img || !certImages[key]) return;

  const data = certImages[key];

  // If multiple images (slider case)
  if (Array.isArray(data)) {
    currentImages = data;
    currentIndex = 0;
    img.src = currentImages[currentIndex];

    document.getElementById('certPrev').style.display = 'block';
    document.getElementById('certNext').style.display = 'block';
  } 
  // Single image
  else {
    currentImages = [data];
    currentIndex = 0;
    img.src = data;

    document.getElementById('certPrev').style.display = 'none';
    document.getElementById('certNext').style.display = 'none';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* Next image */
function nextCert() {
  if (currentImages.length < 2) return;

  currentIndex = (currentIndex + 1) % currentImages.length;
  document.getElementById('certModalImg').src = currentImages[currentIndex];
}

/* Previous image */
function prevCert() {
  if (currentImages.length < 2) return;

  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  document.getElementById('certModalImg').src = currentImages[currentIndex];
}

/* Closes the certificate lightbox */
function closeCert() {
  const modal = document.getElementById('certModal');
  const img   = document.getElementById('certModalImg');

  if (!modal) return;

  modal.classList.remove('open');
  document.body.style.overflow = '';

  setTimeout(() => { if (img) img.src = ''; }, 350);
}

/* Close when clicking outside */
const certModalBg = document.getElementById('certModal');
if (certModalBg) {
  certModalBg.addEventListener('click', e => {
    if (e.target === certModalBg) closeCert();
  });
}

/* ESC key closes modal */
document.addEventListener('keydown', e => {
  const certModal = document.getElementById('certModal');
  if (certModal && certModal.classList.contains('open') && e.key === 'Escape') {
    closeCert();
  }
});
