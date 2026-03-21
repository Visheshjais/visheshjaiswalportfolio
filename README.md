<div align="center">

# 🚀 Vishesh Jaiswal — Developer Portfolio

[![Portfolio](https://img.shields.io/badge/🌐_Live_Portfolio-Visit_Now-38bdf8?style=for-the-badge)](https://visheshjaiswal.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Visheshjais-181717?style=for-the-badge&logo=github)](https://github.com/Visheshjais)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vishesh_Jaiswal-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/vishesh-j-a085b3236)

<br/>

> **A modern, fully responsive personal portfolio website built with pure HTML, CSS & JavaScript — no frameworks needed.**

<br/>


</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Setup & Installation](#️-setup--installation)
- [🔑 Configuration](#-configuration)
- [📱 Sections Overview](#-sections-overview)
- [🎨 Design Highlights](#-design-highlights)
- [📊 Performance](#-performance)
- [🤝 Contact](#-contact)

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🌀 **Preloader** | Spinning gradient ring with logo before page loads |
| 🎯 **Cursor Glow** | Custom glowing dot follows the mouse |
| 🌗 **Dark / Light Mode** | Toggle with preference saved to localStorage |
| ⌨️ **Typing Animation** | Cycles through developer roles automatically |
| 📊 **Stat Counters** | Animated count-up numbers on page load |
| 💫 **Scroll Animations** | Sections fade in as user scrolls |
| 📈 **Skill Rings** | Animated SVG circular progress rings |
| 🎯 **Project Filter** | Filter projects by tech stack (React, Node, Python, MongoDB) |
| 📸 **Project Modal** | Full-screen modal with image slider + video tab |
| 🏆 **Certifications** | Dedicated section for certificates |
| 📋 **Copy Email** | One-click copy email to clipboard with toast notification |
| 💚 **WhatsApp Button** | Floating WhatsApp chat button |
| 📤 **Contact Form** | EmailJS powered — sends directly to Gmail, no backend needed |
| 🔍 **SEO Ready** | Open Graph tags for WhatsApp/LinkedIn share preview |
| 📊 **Google Analytics** | Visitor tracking with GA4 |
| 🔊 **Sound Effects** | Subtle synthetic click sounds on interactions |
| 📱 **Mobile Nav** | Slide-in drawer with dark overlay backdrop |
| 🚀 **Back to Top** | Floating button appears after scrolling |
| 🎨 **Gradient Scroll Bar** | Blue → purple progress bar at page top |
| 📄 **Custom 404** | Matching branded error page with particles |

---

## 🛠️ Tech Stack

```
Frontend    →  HTML5, CSS3, JavaScript (ES6+)
Font        →  Plus Jakarta Sans (Google Fonts)
Icons       →  Font Awesome 6.5
Email       →  EmailJS (no backend required)
Analytics   →  Google Analytics 4
Animation   →  CSS Keyframes + SVG stroke-dashoffset
```

**No frameworks. No build tools. No dependencies to install.**
Just open `index.html` in a browser and it works. ✅

---

## 📁 Project Structure

```
visheshjaiswalportfolio/
│
├── 📄 index.html          → Main portfolio page (fully commented)
├── 🎨 style.css           → All styles — dark/light mode, animations, responsive
├── ⚙️  script.js           → All JavaScript — animations, EmailJS, GitHub API
├── 📄 404.html            → Custom branded 404 error page
│
├── 📁 images/
│   ├── logo.png           → Avatar used as navbar logo & favicon
│   ├── profile.png        → Hero section profile photo
│   ├── groovix 1.png      → Groovix project screenshot 1
│   ├── groovix 2.png      → Groovix project screenshot 2
│   ├── groovix 3.png      → Groovix project screenshot 3
│   ├── Unmasking 1.png    → Unmasking Illusion screenshot 1
│   ├── Unmasking 2.png    → Unmasking Illusion screenshot 2
│   ├── Unmasking 3.png    → Unmasking Illusion screenshot 3
│   ├── All in One 1.jpg   → Translation project screenshot 1
│   ├── All in One 2.jpg   → Translation project screenshot 2
│   └── All in One 3.jpg   → Translation project screenshot 3
│
└── 📁 resume/
    └── Vishesh_Jaiswal.pdf  → Resume file (download & view buttons)
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Visheshjais/visheshjaiswalportfolio.git
cd visheshjaiswalportfolio
```

### 2. Open locally
```bash
# Simply open index.html in your browser
# OR use VS Code Live Server extension for hot reload
```

### 3. Deploy to GitHub Pages
```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
# Then enable GitHub Pages in repo Settings → Pages → main branch
```

---

## 🔑 Configuration

Before deploying, replace these placeholder values:

### `index.html` — Google Analytics
```html
<!-- Replace BOTH instances of G-XXXXXXXXXX -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
gtag('config', 'G-XXXXXXXXXX');

<!-- Get your ID: analytics.google.com → Admin → Data Streams -->
```

### `index.html` — WhatsApp Button
```html
<!-- Replace 91XXXXXXXXXX with 91 + your 10-digit mobile number -->
href="https://wa.me/91XXXXXXXXXX?text=Hi%20Vishesh..."

<!-- Example: 919876543210 for number 9876543210 -->
```

### `script.js` — EmailJS Keys
```javascript
// Line 1 — Your EmailJS Public Key
emailjs.init("YOUR_PUBLIC_KEY");
// Get from: emailjs.com → Account → General → Public Key

// Line 2 — Your EmailJS Template ID
"YOUR_TEMPLATE_ID"
// Get from: emailjs.com → Email Templates → your template
```

> **Service ID** `service_0kgo05i` is already set and does not need to change.

---

## 📱 Sections Overview

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Profile photo, name, typing animation, stat counters, resume buttons |
| 2 | **About** | Bio, education, focus, interests, hobbies highlight cards |
| 3 | **Skills** | Animated SVG ring gauges with tech icons and percentages |
| 4 | **Timeline** | B.Tech education + Infowiz internship experience |
| 5 | **Projects** | 3 projects with filter, modal, GitHub & Live Demo buttons |
| 6 | **Certifications** | 4 certificates with icon, platform, and year badge |
| 7 | **GitHub** | Live repos fetched from GitHub API (latest 6) |
| 8 | **Contact** | EmailJS form, copy email button, LinkedIn link |

---

## 🎨 Design Highlights

```
Color Palette
─────────────────────────────────────
Primary Blue    →  #38bdf8
Accent Purple   →  #6c63ff
Success Green   →  #4ade80  (Open to Work badge)
WhatsApp Green  →  #25d366
Dark Background →  #0f172a
Card Background →  #1e293b
Text Muted      →  #94a3b8

Typography
─────────────────────────────────────
Font Family  →  Plus Jakarta Sans
Weights      →  300 · 400 · 500 · 600 · 700 · 800

Animations
─────────────────────────────────────
Profile ring      →  conic-gradient spin (5s)
Typing effect     →  character-by-character (90ms/char)
Skill rings       →  stroke-dashoffset transition (1.2s)
Section reveal    →  translateY + opacity (0.8s)
Heading shimmer   →  background-position scroll (4s)
Cursor glow       →  follows mousemove in real-time
Preloader ring    →  conic-gradient spin (1.2s)
```

---

## 📊 Performance

- ✅ All images use `loading="lazy"` — deferred loading
- ✅ Google Fonts uses `display=swap` — no blank text on load
- ✅ EmailJS loaded in `<head>` — eliminates form send delay
- ✅ Single scroll event listener handles all scroll logic
- ✅ `Set()` used for ring animation to prevent re-animating
- ✅ `requestAnimationFrame` used for smooth particle animation
- ✅ `cancelAnimationFrame` on resize to prevent memory leaks
- ✅ `localStorage` saves theme — no flash on reload

---

## 🤝 Contact

<div align="center">

| Platform | Link |
|----------|------|
| 📧 Email | jaiswalvishesh1214@gmail.com |
| 💼 LinkedIn | [vishesh-j-a085b3236](https://linkedin.com/in/vishesh-j-a085b3236) |
| 🐙 GitHub | [Visheshjais](https://github.com/Visheshjais) |
| 📸 Instagram | [@vishesh.jswl](https://www.instagram.com/vishesh.jswl) |

</div>

---

<div align="center">

**Designed & Built by Vishesh Jaiswal**

© 2026 · Made with ❤️

⭐ If you like this portfolio, give it a star on GitHub!

</div>