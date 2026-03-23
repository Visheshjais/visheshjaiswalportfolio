/* =============================================================
   PORTFOLIO — script.js  v4
   Sections:
     1.  Preloader
     2.  DOM Cache
     3.  EmailJS Init
     4.  Cursor Glow
     5.  Hamburger Menu
     6.  Theme Toggle (with localStorage memory)
     7.  Scroll Handler (active link, progress bar, shrink,
                         reveal, back-to-top, whatsapp btn)
     8.  Typing Effect
     9.  Scroll Reveal (initial call)
    10.  Skill Ring Animation
    11.  Stat Counter Animation
    12.  Project Filter
    13.  Particle Background
    14.  GitHub Repos
    15.  Project Data & Modal
    16.  Contact Form (EmailJS)
    17.  Copy Email Button
    18.  Back to Top
    19.  Sound Effects
   ============================================================= */


/* ================= 1. PRELOADER ================= */
/* Waits for the full page (all images, fonts etc.) to load,
   then fades out the preloader by adding .hidden class. */

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  /* Small delay so the spinning animation is actually seen */
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 700);
});


/* ================= 2. DOM CACHE ================= */
/* Every DOM lookup done once at startup and stored in constants.
   Avoids repeated getElementById calls inside scroll/event handlers. */

const hamburger    = document.getElementById("hamburger");
const navMenu      = document.getElementById("navLinks");
const themeBtn     = document.getElementById("themeToggle");
const scrollBar    = document.getElementById("scrollBar");
const navbar       = document.getElementById("navbar");
const backToTop    = document.getElementById("backToTop");
const whatsappBtn  = document.getElementById("whatsappBtn");
const sections     = document.querySelectorAll("section");
const navLinks     = document.querySelectorAll(".nav-links a");
const typingEl     = document.querySelector(".typing");
const projectModal = document.getElementById("projectModal");
const sliderImage  = document.getElementById("sliderImage");
const sliderDots   = document.getElementById("sliderDots");
const modalVideo   = document.getElementById("modalVideo");
const modalVideoSrc= document.getElementById("modalVideoSrc");
const noVideoMsg   = document.getElementById("noVideoMsg");
const panelImages  = document.getElementById("panelImages");
const panelVideo   = document.getElementById("panelVideo");
const tabImages    = document.getElementById("tabImages");
const tabVideo     = document.getElementById("tabVideo");
const contactForm  = document.getElementById("contactForm");
const formMessage  = document.getElementById("formMessage");
const cursorGlow   = document.getElementById("cursorGlow");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const copyToast    = document.getElementById("copyToast");


/* ================= 3. EMAILJS INIT ================= */
/* Initialized immediately on page load — NOT inside the submit handler.
   This eliminates the 15-20 second delay on first form submit. */

emailjs.init("mj63OiHBpYlItbYc0"); /* ← replace with your EmailJS Public Key */


/* ================= 4. CURSOR GLOW ================= */
/* Moves the glowing dot to follow the mouse position.
   CSS handles centering via translate(-50%,-50%). */

document.addEventListener("mousemove", e => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top  = e.clientY + "px";
});

/* Hide the glow dot when mouse leaves the browser window */
document.addEventListener("mouseleave", () => { cursorGlow.style.opacity = "0"; });
document.addEventListener("mouseenter", () => { cursorGlow.style.opacity = "1"; });

/* Restore pointer cursor on all clickable elements */
document.querySelectorAll("a, button, input, textarea, .project-card, .filter-btn, .copy-email").forEach(el => {
  el.style.cursor = "pointer";
});


/* ================= 5. HAMBURGER MENU ================= */
/* Mobile only. Toggling "open" class slides the nav in from right
   and shows a dark overlay backdrop behind it.
   Clicking the overlay or any nav link closes the menu. */

const navOverlay = document.getElementById("navOverlay");

/* Helper — opens or closes the mobile nav */
function toggleNav(forceClose){
  const isOpen = navMenu.classList.contains("open");
  if(forceClose || isOpen){
    /* Close */
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
    if(navOverlay) navOverlay.classList.remove("open");
    document.body.style.overflow = ""; /* restore page scroll */
  } else {
    /* Open */
    hamburger.classList.add("open");
    navMenu.classList.add("open");
    if(navOverlay) navOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; /* lock page scroll */
  }
}

hamburger.addEventListener("click", () => toggleNav());

/* Clicking the dark backdrop closes the nav */
if(navOverlay){
  navOverlay.addEventListener("click", () => toggleNav(true));
}

/* Any nav link click closes the menu */
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => toggleNav(true));
});


/* ================= 6. THEME TOGGLE ================= */
/* Toggles light-mode class on <body> and swaps the button icon.
   Saves the preference to localStorage so it persists on reload. */

/* Restore saved theme on page load */
if(localStorage.getItem("theme") === "light"){
  document.body.classList.add("light-mode");
  themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeBtn.textContent = isLight ? "🌙" : "☀️";
  /* Persist the preference across page reloads */
  localStorage.setItem("theme", isLight ? "light" : "dark");
});


/* ================= 7. SCROLL HANDLER ================= */
/* Single merged scroll listener — one listener is cheaper than many.
   Handles: active nav, progress bar, navbar shrink,
            reveal animations, floating button visibility. */

window.addEventListener("scroll", () => {

  const scrollTop = document.documentElement.scrollTop;
  const height    = document.documentElement.scrollHeight
                  - document.documentElement.clientHeight;

  /* --- Active nav link highlight ---
       Checks which section is currently in view and marks its link. */
  let current = "";
  sections.forEach(section => {
    if(pageYOffset >= section.offsetTop - 160){
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if(link.getAttribute("href").includes(current)){
      link.classList.add("active");
    }
  });

  /* --- Gradient scroll progress bar ---
       Width percentage = how far user has scrolled. */
  scrollBar.style.width = ((scrollTop / height) * 100) + "%";

  /* --- Scroll reveal ---
       Adds .active to .reveal elements when they enter the viewport. */
  document.querySelectorAll(".reveal").forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 80){
      el.classList.add("active");
    }
  });

  /* --- Navbar scroll-shrink ---
       After 80px scroll, .scrolled reduces navbar padding. */
  navbar.classList.toggle("scrolled", scrollTop > 80);

  /* --- Floating buttons visibility ---
       Back-to-top and WhatsApp both show after 300px scroll. */
  const showFloating = scrollTop > 300;
  backToTop.classList.toggle("show", showFloating);
  if(whatsappBtn) whatsappBtn.classList.toggle("show", showFloating);

  /* --- Skill ring animation trigger --- */
  animateRings();

});


/* ================= 8. TYPING EFFECT ================= */
/* Cycles through developer role phrases, typing one character
   at a time. Pauses 1.2s at end of each phrase before next. */

const phrases = [
  "I am a Frontend Developer",
  "I am a MERN Stack Developer",
  "I am a Web Designer",
  "I am a Full Stack Developer"
];

let phraseIndex = 0;
let charIndex   = 0;

(function type(){
  if(phraseIndex === phrases.length) phraseIndex = 0;
  const current = phrases[phraseIndex];
  typingEl.textContent = current.slice(0, ++charIndex);
  if(charIndex === current.length){
    phraseIndex++;
    charIndex = 0;
    setTimeout(type, 1200); /* pause at end of phrase */
  } else {
    setTimeout(type, 90);   /* type next character at 90ms interval */
  }
})();


/* ================= 9. SCROLL REVEAL (initial call) ================= */
/* Called once on load so elements already visible on the page
   (above the fold) animate in without requiring any scroll. */

(function revealOnLoad(){
  document.querySelectorAll(".reveal").forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 80){
      el.classList.add("active");
    }
  });
})();


/* ================= 10. SKILL RING ANIMATION ================= */
/* Each .ring-fill SVG circle has data-progress (0–100).
   We calculate stroke-dashoffset to draw the arc.
   Circumference = 2π × radius = 2π × 32 ≈ 201.06 px */

const CIRC = 2 * Math.PI * 32;

/* Inject a hidden SVG with the gradient definition used by all rings.
   Must be in the DOM so ring-fill circles can reference #ringGrad. */
(function injectRingGradient(){
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden");
  svg.innerHTML = `
    <defs>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#6c63ff"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svg);
})();

/* Tracks rings already animated so we don't re-animate them */
const animatedRings = new Set();

function animateRings(){
  document.querySelectorAll(".ring-fill").forEach(circle => {
    /* Skip if already animated */
    if(animatedRings.has(circle)) return;
    /* Only animate when circle enters the viewport */
    if(circle.getBoundingClientRect().top < window.innerHeight - 40){
      const progress = parseFloat(circle.dataset.progress) || 0;
      /* offset = full circumference minus the filled portion */
      const offset = CIRC - (progress / 100) * CIRC;
      circle.style.strokeDasharray  = CIRC;
      circle.style.strokeDashoffset = offset;
      animatedRings.add(circle); /* mark as done */
    }
  });
}

/* Call on page load too — for rings already in view */
animateRings();


/* ================= 11. STAT COUNTER ANIMATION ================= */
/* Counts each .stat-number from 0 up to its data-target value.
   Duration: ~1.2 seconds total per counter. */

function animateCounters(){
  document.querySelectorAll(".stat-number").forEach(el => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1200; /* total animation time in ms */
    const step     = duration / target; /* ms per increment */
    let current    = 0;
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if(current >= target) clearInterval(timer); /* stop when done */
    }, step);
  });
}

/* Delay slightly so the preloader is gone before counters start */
setTimeout(animateCounters, 800);


/* ================= 12. PROJECT FILTER ================= */
/* Clicking a filter button shows only project cards whose
   data-tags attribute contains the selected filter keyword. */

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    /* Mark only the clicked button as active */
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter; /* "all", "react", "node" etc. */

    document.querySelectorAll(".project-card").forEach(card => {
      const tags = card.dataset.tags || "";
      if(filter === "all" || tags.includes(filter)){
        /* Show the card with a fade-in animation */
        card.classList.remove("hidden");
        card.style.animation = "filterFadeIn 0.4s ease forwards";
      } else {
        /* Hide the card */
        card.classList.add("hidden");
      }
    });

    playClick(); /* subtle sound on filter change */
  });
});


/* ================= 13. PARTICLE BACKGROUND ================= */
/* Canvas-based floating dot animation.
   animationId stored so we can cancel cleanly on resize. */

const canvas = document.getElementById("particles");
const ctx    = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let particles  = [];
let animationId;

function createParticles(){
  particles = [];
  for(let i = 0; i < 100; i++){
    particles.push({
      x     : Math.random() * canvas.width,
      y     : Math.random() * canvas.height,
      size  : Math.random() * 2 + 1,           /* 1–3px */
      speedX: (Math.random() - 0.5) * 0.7,
      speedY: (Math.random() - 0.5) * 0.7
    });
  }
}

function animate(){
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    /* Wrap around edges so particles loop endlessly */
    if(p.x < 0)             p.x = canvas.width;
    if(p.x > canvas.width)  p.x = 0;
    if(p.y < 0)             p.y = canvas.height;
    if(p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.6)";
    ctx.fill();
  });
}

/* Cancel loop, resize canvas, rebuild particles, restart on window resize */
window.addEventListener("resize", () => {
  cancelAnimationFrame(animationId);
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
  animate();
});

/* Resume animation when user switches back to this browser tab */
document.addEventListener("visibilitychange", () => {
  if(!document.hidden){
    cancelAnimationFrame(animationId);
    animate();
  }
});

createParticles();
animate();


/* ================= 14. GITHUB REPOS ================= */
/* Fetches the latest 6 non-forked repos from the GitHub REST API.
   Each card shows name, description, star/fork counts, and a link. */

fetch("https://api.github.com/users/Visheshjais/repos?sort=updated")
  .then(res => res.json())
  .then(data => {
    const repoContainer = document.getElementById("repos");
    repoContainer.innerHTML = "";
    data
      .filter(repo => !repo.fork) /* exclude forks */
      .slice(0, 6)                /* max 6 repos */
      .forEach(repo => {
        const div = document.createElement("div");
        div.classList.add("repo");
        div.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available"}</p>
          <div class="repo-meta">
            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
          </div>
          <a href="${repo.html_url}" target="_blank" class="repo-link">
            View Repo <i class="fas fa-arrow-right"></i>
          </a>`;
        repoContainer.appendChild(div);
      });
  })
  .catch(() => {
    /* Show friendly error if API call fails (rate limit, offline etc.) */
    document.getElementById("repos").innerHTML =
      '<p style="color:#94a3b8;">Could not load repositories. Please check back later.</p>';
  });


/* ================= 15. PROJECT DATA & MODAL ================= */
/* All project content in one object.
   To add a demo video: put .mp4 in videos/ and set videoSrc path.
   Leave videoSrc as "" to show the "coming soon" fallback screen. */

const projectData = {
  groovix: {
    title      : "Groovix Music Player",
    description: "A Spotify-inspired music streaming web application with a modern interface and smooth playback features. Users can browse songs and control music with interactive UI components built on the MERN stack.",
    tech       : ["React","Node.js","MongoDB","Express"],
    images     : ["images/groovix 1.png","images/groovix 2.png","images/groovix 3.png"],
    videoSrc   : "videos/groovix-demo.mp4",
    github     : "https://github.com/Visheshjais",
    demo       : "#"
  },
  unmasking: {
    title      : "Unmasking Illusion",
    description: "A deepfake detection system that analyzes manipulated faces in videos and images using machine learning models built with PyTorch.",
    tech       : ["Python","PyTorch","JavaScript","Flask"],
    images     : ["images/Unmasking 1.png","images/Unmasking 2.png","images/Unmasking 3.png"],
    videoSrc   : "",
    github     : "https://github.com/Visheshjais",
    demo       : "#"
  },
  translation: {
    title      : "Lingua AI-All-in-One Translation",
    description: "A multilingual translation platform supporting 50+ languages with a responsive interface and multiple translation methods including text, document, and speech translation.",
    tech       : ["Node.js","JavaScript","HTML","CSS"],
    images     : ["images/Lingua AI-All-in-One Translation 1.png","images/Lingua AI-All-in-One Translation 2.png","images/Lingua AI-All-in-One Translation 3.png","images/Lingua AI-All-in-One Translation 4.png","images/Lingua AI-All-in-One Translation 5.png","images/Lingua AI-All-in-One Translation 6.png"],
    videoSrc   : "",
    github     : "https://github.com/Visheshjais",
    demo       : "#"
  }
};

let currentSlide   = 0;
let currentProject = null;

/* Opens modal for the given project key.
   Populates all fields, resets to screenshots tab,
   builds dot indicators, and locks background scroll. */
function openProject(key){
  const proj = projectData[key];
  if(!proj) return;

  currentProject = proj;
  currentSlide   = 0;

  document.getElementById("modalTitle").innerText       = proj.title;
  document.getElementById("modalDescription").innerText = proj.description;
  document.getElementById("modalTech").innerHTML        = proj.tech.map(t=>`<span>${t}</span>`).join("");
  document.getElementById("modalGithub").href           = proj.github;
  document.getElementById("modalDemo").href             = proj.demo;

  switchTab("images");
  buildDots(proj.images.length);
  showSlide();
  setupVideo(proj.videoSrc);

  projectModal.style.display   = "flex";
  document.body.style.overflow = "hidden"; /* lock background scroll */
}

/* Loads video src or shows "coming soon" fallback.
   Always pauses and rewinds first to clear previous project. */
function setupVideo(src){
  modalVideo.pause();
  modalVideo.currentTime = 0;
  if(src && src.trim() !== ""){
    modalVideoSrc.src        = src;
    modalVideo.load();
    modalVideo.style.display = "block";
    noVideoMsg.style.display = "none";
  } else {
    modalVideoSrc.src        = "";
    modalVideo.style.display = "none";
    noVideoMsg.style.display = "flex";
  }
}

/* Switches between Screenshots and Video tab panels.
   Pauses video when leaving the video panel. */
function switchTab(tab){
  const isImages = tab === "images";
  panelImages.style.display = isImages ? "block" : "none";
  panelVideo.style.display  = isImages ? "none"  : "block";
  tabImages.classList.toggle("active",  isImages);
  tabVideo.classList.toggle("active",  !isImages);
  if(isImages) modalVideo.pause();
}

/* Builds one clickable dot indicator per screenshot. */
function buildDots(count){
  sliderDots.innerHTML = "";
  for(let i = 0; i < count; i++){
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if(i === 0) dot.classList.add("active");
    dot.onclick = () => goToSlide(i);
    sliderDots.appendChild(dot);
  }
}

/* Syncs dot highlight to current slide. */
function updateDots(){
  document.querySelectorAll(".dot").forEach((dot,i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

/* Displays the current slide image and updates dots. */
function showSlide(){
  sliderImage.src = currentProject.images[currentSlide];
  updateDots();
}

/* Jump directly to a specific slide (used by dot click handlers). */
function goToSlide(i){
  currentSlide = i;
  showSlide();
}

/* Advance to next screenshot — wraps back to 0 after last. */
function nextSlide(){
  currentSlide = (currentSlide + 1) % currentProject.images.length;
  showSlide();
}

/* Go back to previous screenshot — wraps to last from first. */
function prevSlide(){
  currentSlide = (currentSlide - 1 + currentProject.images.length) % currentProject.images.length;
  showSlide();
}

/* Close modal: stop video, hide overlay, restore page scroll. */
function closeProject(){
  modalVideo.pause();
  modalVideo.currentTime       = 0;
  projectModal.style.display   = "none";
  document.body.style.overflow = "";
}

/* Close by clicking the dark backdrop (outside the modal card). */
window.addEventListener("click", e => {
  if(e.target === projectModal) closeProject();
});

/* Close with Escape key — standard dialog accessibility pattern. */
window.addEventListener("keydown", e => {
  if(e.key === "Escape") closeProject();
});


/* ================= 16. CONTACT FORM (EmailJS) ================= */
/* EmailJS sends form data directly to Gmail — no backend needed.
   Service ID : service_0kgo05i  (your Gmail service)
   Template ID: replace YOUR_TEMPLATE_ID below
   Public Key : replace YOUR_PUBLIC_KEY at top of this file */

if(contactForm){
  contactForm.addEventListener("submit", (e) => {

    /* Stop the browser from navigating/refreshing on submit */
    e.preventDefault();

    /* Trim all values to remove accidental leading/trailing spaces */
    const name    = contactForm.name.value.trim();
    const email   = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    /* Show warning and stop if any field is empty */
    if(!name || !email || !message){
      formMessage.innerText   = "⚠️ Please fill in all fields.";
      formMessage.style.color = "#f87171"; /* red */
      return;
    }

    /* Disable button and show loading state during send */
    const submitBtn       = contactForm.querySelector("button[type='submit']");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled    = true;
    formMessage.innerText = "";

    /* Send via EmailJS — reads name, email, message fields automatically */
    emailjs.sendForm(
      "service_0kgo05i",  /* ← your Gmail Service ID */
      "template_zt1s51c", /* ← replace with your EmailJS Template ID */
      contactForm
    )
    .then(() => {
      /* Success — email delivered to Gmail */
      formMessage.innerText   = "✅ Message sent! I'll get back to you soon.";
      formMessage.style.color = "#4ade80"; /* green */
      contactForm.reset();                 /* clear form fields */
    })
    .catch(() => {
      /* Failure — show error with direct email fallback */
      formMessage.innerText   = "❌ Failed to send. Please email me directly.";
      formMessage.style.color = "#f87171"; /* red */
    })
    .finally(() => {
      /* Always re-enable button whether success or fail */
      submitBtn.textContent = "✉ Send Message";
      submitBtn.disabled    = false;
    });

  });
}


/* ================= 17. COPY EMAIL BUTTON ================= */
/* Clicking the email info item copies the address to clipboard
   and shows a brief toast notification for 2.5 seconds. */

if(copyEmailBtn){
  copyEmailBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("jaiswalvishesh1214@gmail.com")
      .then(() => {
        /* Show the success toast */
        copyToast.classList.add("show");
        /* Auto-hide after 2.5 seconds */
        setTimeout(() => copyToast.classList.remove("show"), 2500);
        playClick(); /* subtle sound feedback */
      })
      .catch(() => {
        /* Fallback if clipboard API is blocked (e.g. HTTP not HTTPS) */
        formMessage.innerText   = "📋 Copy: jaiswalvishesh1214@gmail.com";
        formMessage.style.color = "#38bdf8";
      });
  });
}


/* ================= 18. BACK TO TOP ================= */
/* Smoothly scrolls the page back to the top.
   Button visibility is toggled in the scroll handler above. */

backToTop.addEventListener("click", () => {
  window.scrollTo({ top:0, behavior:"smooth" });
  playClick();
});


/* ================= 19.SOUND EFFECT ================= */
/* AudioContext created once and reused — fixes browser autoplay policy.
   Browser blocks sound until first user interaction on the page.
   We resume the context on first click to unlock audio. */

let audioCtx = null; /* single shared AudioContext — created on first click */

function playClick(){
  try{
    /* Create AudioContext only once — reusing is more efficient */
    if(!audioCtx){
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    /* Resume context if browser suspended it (autoplay policy) */
    if(audioCtx.state === "suspended"){
      audioCtx.resume();
    }

    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type            = "sine";
    osc.frequency.value = 620; /* pitch of the tick sound */

    /* Start quiet, fade to silence over 80ms */
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.08);
  } catch(e){
    /* Silently fail if audio not supported */
  }
}

/* Unlock audio on very first interaction anywhere on page */
document.addEventListener("click", () => {
  if(!audioCtx){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if(audioCtx.state === "suspended"){
    audioCtx.resume();
  }
}, { once: true }); /* { once:true } removes listener after first trigger */

/* ================= SOUND EFFECTS — WHOLE SITE ================= */
/* Attaches the subtle click sound to every interactive element.
   Covers: all buttons, all links, nav links, filter buttons,
   skill cards, highlight cards, social icons, theme toggle,
   back to top, WhatsApp button, copy email, footer links. */

document.querySelectorAll(`
  .btn-primary,
  .btn-outline,
  .btn,
  .card-btn,
  .modal-links a,
  .repo-link,
  .nav-links a,
  .filter-btn,
  .social-icons a,
  .highlight-card,
  .cert-card,
  .contact-info-item,
  .footer-links a,
  .modal-tab,
  .slide-btn,
  .dot,
  #themeToggle,
  #backToTop,
  #whatsappBtn,
  #copyEmailBtn,
  .logo-img,
  .close-btn
`).forEach(el => {
  el.addEventListener("click", playClick);
});
