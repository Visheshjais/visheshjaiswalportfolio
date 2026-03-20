/* =============================================================
   PORTFOLIO — script.js
   Sections (in order):
     1. DOM Cache
     2. Hamburger Menu
     3. Theme Toggle
     4. Scroll Handler  (navbar active + scroll progress — merged)
     5. Typing Effect
     6. Scroll Reveal
     7. Skill Bar Animation
     8. Particle Background
     9. GitHub Repos
    10. Project Data
    11. Project Modal
    12. Contact Form
   ============================================================= */


/* ================= 1. DOM CACHE ================= */
/* All getElementById / querySelector calls are done once here
   and stored in constants. Reusing these avoids repeated DOM
   lookups which is slower, especially inside scroll handlers. */

const hamburger    = document.getElementById("hamburger");
const navMenu      = document.getElementById("navLinks");
const themeBtn     = document.getElementById("themeToggle");
const scrollBar    = document.getElementById("scrollBar");
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
const form         = document.querySelector("form");
const formMessage  = document.getElementById("formMessage");


/* ================= 2. HAMBURGER MENU ================= */
/* Mobile-only toggle. Clicking the hamburger adds/removes "open"
   on both the button (animates bars → X) and the nav list
   (shows/hides the dropdown).  Auto-closes on any link click. */

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});


/* ================= 3. THEME TOGGLE ================= */
/* Toggles "light-mode" class on <body> and swaps the button icon. */

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeBtn.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
});


/* ================= 4. SCROLL HANDLER ================= */
/* Originally there were two separate scroll listeners:
   one for the navbar active link and one for the progress bar.
   Merged into one listener to cut scroll event overhead in half. */

window.addEventListener("scroll", () => {

  /* --- Navbar active link --- */
  let current = "";
  sections.forEach(section => {
    if(pageYOffset >= section.offsetTop - 150){
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if(link.getAttribute("href").includes(current)){
      link.classList.add("active");
    }
  });

  /* --- Scroll progress bar --- */
  const scrollTop = document.documentElement.scrollTop;
  const height    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollBar.style.width = ((scrollTop / height) * 100) + "%";

  /* --- Scroll reveal --- */
  document.querySelectorAll(".reveal").forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 100){
      el.classList.add("active");
    }
  });

  /* --- Skill bar animation --- */
  document.querySelectorAll(".progress-bar").forEach(bar => {
    if(bar.getBoundingClientRect().top < window.innerHeight){
      bar.style.width = bar.dataset.progress + "%";
    }
  });

});

/* ================= 6. SCROLL REVEAL ================= */
/* reveal() is now called inline inside the merged scroll handler above.
   We still call it once here on page load so elements already in view
   (above the fold) animate in without requiring a scroll. */

function reveal(){
  document.querySelectorAll(".reveal").forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 100){
      el.classList.add("active");
    }
  });
}
reveal(); /* initial call on page load */

/* ================= 5. TYPING EFFECT ================= */
/* Cycles through the phrases array, typing one character at a time.
   Pauses for 1 second at the end of each phrase before the next. */

const phrases = [
  "I am a Frontend Developer",
  "I am a MERN Stack Developer",
  "I am a Web Designer"
];

let phraseIndex = 0; /* which phrase is currently being typed */
let charIndex   = 0; /* how many characters have been typed so far */

(function type(){
  if(phraseIndex === phrases.length) phraseIndex = 0;
  const current = phrases[phraseIndex];
  typingEl.textContent = current.slice(0, ++charIndex);
  if(charIndex === current.length){
    phraseIndex++;
    charIndex = 0;
    setTimeout(type, 1000); /* pause at end of phrase */
  } else {
    setTimeout(type, 100);  /* type next character */
  }
})();





/* ================= 7. SKILL BAR ANIMATION ================= */
/* animateSkills() is also called inline inside the merged scroll handler.
   Defined here so it stays readable as a named function. */

function animateSkills(){
  document.querySelectorAll(".progress-bar").forEach(bar => {
    if(bar.getBoundingClientRect().top < window.innerHeight){
      bar.style.width = bar.dataset.progress + "%";
    }
  });
}


/* ================= 8. PARTICLE BACKGROUND ================= */
/* Canvas-based floating dot animation.
   Key improvements over the original:
   - animationId lets us cancel the loop cleanly on resize
   - createParticles() rebuilds particles for the new canvas size
   - requestAnimationFrame is stored FIRST inside animate() so
     the handle is always captured before any draw work
   - Edge wrapping keeps all 100 particles always on screen
   - visibilitychange restarts the loop when the tab regains focus */

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
      size  : Math.random() * 2 + 1,           /* random size 1–3px */
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8
    });
  }
}

function animate(){
  animationId = requestAnimationFrame(animate); /* store handle first */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    /* wrap around edges so particles loop infinitely */
    if(p.x < 0)             p.x = canvas.width;
    if(p.x > canvas.width)  p.x = 0;
    if(p.y < 0)             p.y = canvas.height;
    if(p.y > canvas.height) p.y = 0;
    /* draw as soft circle */
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.7)";
    ctx.fill();
  });
}

/* Resize: cancel old loop, resize canvas, rebuild, restart */
window.addEventListener("resize", () => {
  cancelAnimationFrame(animationId);
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
  animate();
});

/* Resume loop when switching back to this tab */
document.addEventListener("visibilitychange", () => {
  if(!document.hidden){
    cancelAnimationFrame(animationId);
    animate();
  }
});

createParticles();
animate();


/* ================= 9. GITHUB REPOS ================= */
/* Fetches latest 6 non-forked repos from the GitHub API.
   Each card shows the repo name, description, star/fork counts,
   and a styled "View Repo" button.
   .catch() shows a friendly message if the request fails. */

fetch("https://api.github.com/users/Visheshjais/repos?sort=updated")
  .then(res => res.json())
  .then(data => {
    const repoContainer = document.getElementById("repos");
    repoContainer.innerHTML = "";
    data
      .filter(repo => !repo.fork)
      .slice(0, 6)
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
    document.getElementById("repos").innerHTML =
      '<p style="color:#94a3b8;">Could not load repositories. Please check back later.</p>';
  });


/* ================= 10. PROJECT DATA ================= */
/* All project content lives here in one object.
   To add a demo video: put the .mp4 in a "videos/" folder
   and set videoSrc to its path e.g. "videos/groovix-demo.mp4".
   Leave videoSrc as "" to show the "coming soon" fallback. */

const projectData = {
  groovix: {
    title      : "Groovix Music Player",
    description: "A Spotify-inspired music streaming web application with a modern interface and smooth playback features. Users can browse songs and control music with interactive UI components.",
    tech       : ["React", "Node.js", "MongoDB"],
    images     : ["images/Groovix 1.png", "images/Groovix 2.png", "images/Groovix 3.png"],
    videoSrc   : "videos/groovix-demo.mp4",
    github     : "https://github.com/Visheshjais",
    demo       : "#"
  },
  unmasking: {
    title      : "Unmasking Illusion",
    description: "A deepfake detection system that analyzes manipulated faces in videos and images using machine learning models.",
    tech       : ["Python", "PyTorch", "JavaScript"],
    images     : ["images/Unmasking 1.png", "images/Unmasking 2.png", "images/Unmasking 3.png"],
    videoSrc   : "videos/unmasking-demo.mp4",
    github     : "https://github.com/Visheshjais",
    demo       : "#"
  },
  translation: {
    title      : "All-in-One Translation",
    description: "A multilingual translation platform supporting 50+ languages with a responsive interface and multiple translation methods.",
    tech       : ["Node.js", "JavaScript", "HTML"],
    images     : ["images/All in One 1.jpg", "images/All in One 2.jpg", "images/All in One 3.jpg"],
    videoSrc   : "videos/translation-demo.mp4",
    github     : "https://github.com/Visheshjais",
    demo       : "#"
  }
};

let currentSlide   = 0;
let currentProject = null;


/* ================= 11. PROJECT MODAL ================= */

/* Opens the modal for the given project key.
   Populates all fields, resets to the screenshots tab,
   builds dot indicators, sets up video, locks body scroll. */
function openProject(key){
  const proj = projectData[key];
  if(!proj) return;

  currentProject = proj;
  currentSlide   = 0;

  document.getElementById("modalTitle").innerText       = proj.title;
  document.getElementById("modalDescription").innerText = proj.description;
  document.getElementById("modalTech").innerHTML        = proj.tech.map(t => `<span>${t}</span>`).join("");
  document.getElementById("modalGithub").href           = proj.github;
  document.getElementById("modalDemo").href             = proj.demo;

  switchTab("images");
  buildDots(proj.images.length);
  showSlide();
  setupVideo(proj.videoSrc);

  projectModal.style.display  = "flex";
  document.body.style.overflow = "hidden"; /* prevent background scroll */
}

/* Loads the video or shows the "coming soon" fallback.
   Always pauses and rewinds before loading new content. */
function setupVideo(src){
  modalVideo.pause();
  modalVideo.currentTime = 0;
  if(src && src.trim() !== ""){
    modalVideoSrc.src         = src;
    modalVideo.load();
    modalVideo.style.display  = "block";
    noVideoMsg.style.display  = "none";
  } else {
    modalVideoSrc.src         = "";
    modalVideo.style.display  = "none";
    noVideoMsg.style.display  = "flex";
  }
}

/* Switches between the Screenshots and Video panels.
   Pauses the video whenever the user leaves the video panel. */
function switchTab(tab){
  const isImages = tab === "images";
  panelImages.style.display = isImages ? "block" : "none";
  panelVideo.style.display  = isImages ? "none"  : "block";
  tabImages.classList.toggle("active",  isImages);
  tabVideo.classList.toggle("active",  !isImages);
  if(isImages) modalVideo.pause();
}

/* Builds one clickable dot per screenshot image.
   Clears old dots first so the count always matches. */
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

/* Syncs the active dot to the current slide index. */
function updateDots(){
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

/* Updates the slider image and dot indicators. */
function showSlide(){
  sliderImage.src = currentProject.images[currentSlide];
  updateDots();
}

/* Jumps directly to a slide (used by dot click handlers). */
function goToSlide(i){
  currentSlide = i;
  showSlide();
}

/* Advances to the next screenshot, wrapping after the last. */
function nextSlide(){
  currentSlide = (currentSlide + 1) % currentProject.images.length;
  showSlide();
}

/* Goes back to the previous screenshot, wrapping before the first. */
function prevSlide(){
  currentSlide = (currentSlide - 1 + currentProject.images.length) % currentProject.images.length;
  showSlide();
}

/* Closes the modal, stops the video, and restores page scrolling. */
function closeProject(){
  modalVideo.pause();
  modalVideo.currentTime      = 0;
  projectModal.style.display  = "none";
  document.body.style.overflow = "";
}

/* Close by clicking the dark backdrop outside the modal card. */
window.addEventListener("click", e => {
  if(e.target === projectModal) closeProject();
});

/* Close with Escape key — standard dialog UX. */
window.addEventListener("keydown", e => {
  if(e.key === "Escape") closeProject();
});


/* ================= 12. CONTACT FORM ================= */
/* Shows a styled confirmation message after the form is submitted.
   Netlify handles the actual email delivery via data-netlify="true". */

form.addEventListener("submit", () => {
  formMessage.innerText  = "✅ Message sent successfully! I'll get back to you soon.";
  formMessage.style.color = "#38bdf8";
});
