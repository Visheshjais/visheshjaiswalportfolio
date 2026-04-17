# Vishesh Jaiswal — Portfolio  🚀

> **Live:** [visheshjaiswal.vercel.app](https://visheshjaiswal.vercel.app) &nbsp;|&nbsp; **GitHub:** [@Visheshjais](https://github.com/Visheshjais)

A fully hand-coded personal portfolio built with **vanilla HTML, CSS & JavaScript** — zero frameworks, zero build tools, deploys in seconds on Vercel.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Space background** | Animated canvas with stars, nebulae, shooting stars, constellations & particle network |
| **Custom cursor** | Dot + elastic ring cursor (CSS-only, no canvas overhead) |
| **Preloader** | Animated progress bar counter (0 → 100) with logo |
| **Scroll reveal** | IntersectionObserver-based staggered section animations |
| **Dark / Light mode** | Theme toggle persisted in localStorage |
| **Typing effect** | 4-role typewriter with erase loop |
| **Skill bars** | Animated progress bars with per-skill brand colours |
| **Tech galaxy** | Hexagonal icon grid for full tech stack |
| **Project modals** | Full-screen lightbox with image slider, video tab, and tech tags |
| **Expandable details** | "View Details" accordion inside each project card |
| **GitHub Repos** | Live-fetched from GitHub API (latest 6 repos) |
| **Contact form** | EmailJS — sends directly to Gmail, no backend needed |
| **Copy email** | Click-to-copy with toast notification |
| **WhatsApp float** | Pre-filled WhatsApp message button |
| **3D card tilt** | Mouse-tracked perspective tilt on project cards |
| **Magnetic buttons** | CTA buttons shift toward cursor on hover |
| **Responsive** | Mobile-first, works on all screen sizes |
| **Custom 404** | Branded error page with countdown redirect |
| **Vercel deploy** | `vercel.json` with caching headers and 404 routing |

---

## 📁 Project Structure

```
portfolio_vishesh_v8/
├── index.html          # Main single-page portfolio
├── 404.html            # Custom 404 error page
├── style.css           # All styles (design tokens → components)
├── script.js           # All JS (22 documented sections)
├── vercel.json         # Vercel deployment config
├── README.md           # This file
│
├── images/             # PNG originals (fallback)
│   ├── profile.png
│   ├── logo.png
│   ├── groovix *.png
│   ├── jobhunt *.png
│   ├── golf *.png
│   ├── Unmasking *.png
│   └── Lingua AI*.png
│
├── images/webp/        # WebP optimised images (primary)
│   └── *.webp
│
└── resume/
    └── VISHESH JAISWAL.pdf
```

---

## 🛠 Tech Stack

- **HTML5** — Semantic markup, Open Graph tags, accessibility attributes
- **CSS3** — Custom properties, CSS Grid, Flexbox, animations, glassmorphism
- **JavaScript (ES6+)** — Canvas API, IntersectionObserver, Fetch API, localStorage
- **EmailJS** — Contact form without a backend
- **Google Analytics** — Traffic tracking (GA4)
- **Font Awesome 6** — Icons
- **Google Fonts** — Space Grotesk + Inter + Fira Code

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

### EmailJS (contact form)
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service (Gmail) + template
3. In `script.js` find `§3 EmailJS Init` and replace:
   - `'mj63OiHBpYlItbYc0'` → your **Public Key**
   - `'service_portfolioVJ'` → your **Service ID**
   - `'template_portfolioVJ'` → your **Template ID**

### Google Analytics
In `index.html`, both instances of `G-N9FM4XEDPK` → your **GA4 Measurement ID**.

### WhatsApp button
In `index.html`, update the `wa.me/` URL with your number:
```
91XXXXXXXXXX  →  91 (India) + your 10-digit number
```

---

## 🖼 Adding / Updating Images

- Place **PNG** files in `/images/` with the exact filenames used in `script.js` `projectData`
- Place **WebP** versions in `/images/webp/` for faster loading
- Portfolio uses `<picture>` with WebP source + PNG fallback throughout

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

## 📄 License

MIT — Free to use as inspiration. Please don't copy-paste without any changes; make it your own! 🙏

---

<p align="center">Designed & Built by <strong>Vishesh Jaiswal</strong> · © 2026</p>
