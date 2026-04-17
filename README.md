<div align="center">
<img src="images/profile.png" width="100" height="100" style="border-radius:50%; object-fit:cover;" alt="Vishesh Jaiswal"/>
#  Vishesh Jaiswal — Portfolio 

### A Hand-Crafted Developer Portfolio. Zero Frameworks. Pure Craft.

![Portfolio](https://img.shields.io/badge/Portfolio-v8-7c5cfc?style=for-the-badge&logo=firefox&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![EmailJS](https://img.shields.io/badge/EmailJS-Contact%20Form-orange?style=for-the-badge&logo=gmail&logoColor=white)
![Vercel](https://img.shields.io/badge/Hosted-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**No React. No Vue. No build tools. Just raw HTML, CSS & JS — deployed in seconds.**

[🌐 Live Site](https://visheshjaiswal.vercel.app) · [🐛 Report Bug](https://github.com/Visheshjais/portfolio_vishesh_v8/issues) · [💡 Request Feature](https://github.com/Visheshjais/portfolio_vishesh_v8/issues)

</div>

---

## 🪐 What is this?

This is my **personal developer portfolio** — fully hand-coded from scratch with vanilla HTML, CSS, and JavaScript. No frameworks, no build pipeline, no bloat. Every animation, every interaction, every pixel is written by hand.

It features a **live animated space canvas**, a **custom elastic cursor**, **scroll-reveal animations**, a working **contact form via EmailJS**, live **GitHub API** integration, and a full **dark/light theme** — all shipping as a single HTML page under 200 KB.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🌠 **Space Background** | Animated canvas — stars, nebulae, shooting stars, constellations & particle network |
| 🖱️ **Custom Cursor** | Dot + elastic ring cursor (CSS-only, zero canvas overhead) |
| ⏳ **Preloader** | Animated progress bar counter 0 → 100 with logo reveal |
| 🎞️ **Scroll Reveal** | IntersectionObserver-based staggered section animations |
| 🌙 **Dark / Light Mode** | Theme toggle, persisted in localStorage |
| ⌨️ **Typing Effect** | 4-role typewriter with erase loop |
| 📊 **Skill Bars** | Animated progress bars with per-skill brand colours |
| 🔷 **Tech Galaxy** | Hexagonal icon grid for the full tech stack |
| 🖼️ **Project Modals** | Full-screen lightbox with image slider, video tab & tech tags |
| 📂 **Expandable Details** | "View Details" accordion inside each project card |
| 🐙 **GitHub Repos** | Live-fetched from GitHub API — latest 6 repos |
| 📬 **Contact Form** | EmailJS — sends directly to Gmail, no backend needed |
| 📋 **Copy Email** | Click-to-copy with toast notification |
| 💬 **WhatsApp Float** | Pre-filled WhatsApp message button |
| 🃏 **3D Card Tilt** | Mouse-tracked perspective tilt on project cards |
| 🧲 **Magnetic Buttons** | CTA buttons shift toward cursor on hover |
| 📱 **Fully Responsive** | Mobile-first, works on all screen sizes |
| 🚫 **Custom 404** | Branded error page with countdown redirect |
| ⚡ **Vercel Deploy** | `vercel.json` with caching headers & 404 routing |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 — Semantic, Open Graph tags, accessibility attributes |
| Styling | CSS3 — Custom properties, Grid, Flexbox, animations, glassmorphism |
| Logic | JavaScript ES6+ — Canvas API, IntersectionObserver, Fetch API, localStorage |
| Mail | EmailJS — contact form without a backend |
| Analytics | Google Analytics GA4 |
| Icons | Font Awesome 6 |
| Fonts | Space Grotesk · Inter · Fira Code |
| Hosting | Vercel |

---

## 📁 Project Structure

```
portfolio_vishesh_v8/
├── index.html              # Main single-page portfolio
├── 404.html                # Custom 404 error page
├── style.css               # All styles (design tokens → components)
├── script.js               # All JS (22 documented sections)
├── vercel.json             # Vercel deployment config
├── README.md               # This file
│
├── images/                 # PNG originals (fallback)
│   ├── profile.png
│   ├── logo.png
│   ├── groovix *.png
│   ├── jobhunt *.png
│   ├── golf *.png
│   ├── Unmasking *.png
│   └── Lingua AI*.png
│
├── images/webp/            # WebP optimised (primary — faster loading)
│   └── *.webp
│
└── resume/
    └── VISHESH JAISWAL.pdf
```

---

## 🚀 Deploy on Vercel

```bash
# 1. Install Vercel CLI (if you haven't)
npm i -g vercel

# 2. Deploy from project folder
cd portfolio_vishesh_v8
vercel --prod
```

Or just drag-and-drop the folder onto [vercel.com/new](https://vercel.com/new).

The included `vercel.json` handles:
- **404 routing** — unknown paths → `404.html`
- **Image caching** — 1-year immutable cache for `/images/*`
- **Security headers** — X-Frame-Options, X-Content-Type-Options, XSS protection

---

## ⚙️ Configuration

### 📬 EmailJS (Contact Form)
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service (Gmail) + email template
3. In `script.js`, find `§3 EmailJS Init` and replace:

```js
'mj63OiHBpYlItbYc0'     →  your Public Key
'service_portfolioVJ'   →  your Service ID
'template_portfolioVJ'  →  your Template ID
```

### 📈 Google Analytics
In `index.html`, replace both instances of `G-N9FM4XEDPK` with your GA4 Measurement ID.

### 💬 WhatsApp Button
In `index.html`, update the `wa.me/` URL:
```
91XXXXXXXXXX  →  91 (India) + your 10-digit number
```

---

## 🖼️ Adding / Updating Images

- Place **PNG** files in `/images/` — filenames must match exactly what's used in `script.js` `projectData`
- Place **WebP** versions in `/images/webp/` for faster loading
- The portfolio uses `<picture>` with WebP source + PNG fallback throughout

---

## 📊 Performance

| Metric | Value |
|---|---|
| Lighthouse Performance | ~95+ |
| First Contentful Paint | < 1.2s |
| No external JS frameworks | ✅ |
| Images lazy-loaded | ✅ |
| Canvas paused when tab hidden | ✅ |
| Scroll handler RAF-throttled | ✅ |

---

## 🏗️ How It's Built

```
index.html loads → preloader runs (0→100) → space canvas boots
         ↓
script.js initialises 22 modules in sequence:
  §1  Canvas (stars, nebulae, shooting stars, constellations)
  §2  Custom cursor (dot + elastic ring)
  §3  EmailJS init
  §4  Theme toggle (dark/light + localStorage)
  §5  Typewriter effect (4 roles, erase loop)
  §6  Scroll reveal (IntersectionObserver stagger)
  §7  Skill bars (animated on scroll)
  §8  3D card tilt (mouse-tracked perspective)
  §9  Magnetic buttons (cursor-shift CTA)
  §10 Project modals (lightbox + image slider + video tab)
  §11 GitHub API fetch (latest 6 repos)
  §12 Contact form (EmailJS send)
  ...and 10 more
```

---

## 📄 License

MIT — Free to use as inspiration. Please don't copy-paste without any changes; make it your own! 🙏

---

<div align="center">

Designed & Built by **Vishesh Jaiswal** · © 2026

⭐ Star this repo if you liked it!

</div>
