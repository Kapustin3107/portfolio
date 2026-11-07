# Project Specification: React Portfolio & Blog

This is a developer specification for **Claude Code CLI** to generate and structure a performance-driven, high-quality developer portfolio website.

---

## 1. Project Overview & Hosting
* **Primary Target:** Personal portfolio and tech blog showcasing frontend expertise (semantic HTML, modular SCSS with BEM, GSAP scroll animations, accessibility, and clean React architecture).
* **Deployment Target:** **GitLab Pages** (Static Site Generation / SSG).
* **Headless CMS Integration:** Decap CMS (Git-based, no external hosting required, stores Markdown/JSON directly in the repo) or Hygraph/Storyblok (GraphQL API). *Default recommendation for GitLab Pages: Decap CMS / Git-based Markdown files.*

---

## 2. Technical Stack & Tooling
* **Framework:** React 18+ (Vite for fast build/SSG or Next.js static export `output: 'export'`).
* **Animations:** GSAP + `ScrollTrigger` plugin.
* **Styling:** SCSS with **CSS/SCSS Modules** adhering strictly to **BEM naming convention** (`block__element--modifier`).
* **Routing:** `react-router-dom` (for SPA/SSG setup with static fallback).
* **CMS / Data:** Git-based Markdown / Contentlayer / Decap CMS.
* **Images & Assets:** WebP format for raster images, SVG for vectors, responsive `picture` tags.
* **CI/CD:** GitLab CI pipeline (`.gitlab-ci.yml`) targeting GitLab Pages.

---

## 3. Key Technical & Engineering Requirements

### 3.1. Accessibility & Semantic HTML (a11y)
* Mandatory usage of semantic containers: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
* WCAG 2.1 AA compliance:
  * Screen reader accessible labels (`aria-label`, `aria-expanded`, `role`).
  * Full keyboard navigation with visible focus indicators.
  * Contrast check passing standard guidelines.

### 3.2. Styling Architecture (SCSS + BEM)
* Mobile-First approach: base styles targeted at standard mobile breakpoints (`min-width` media queries for desktop enhancements).
* Each component must have its dedicated `.module.scss` file.
* Class names inside modules must strictly follow BEM:
  ```scss
  // Example: PortfolioCard.module.scss
  .portfolio-card {
    display: flex;
    flex-direction: column;

    &__image-wrapper {
      position: relative;
      overflow: hidden;
    }

    &__title {
      font-size: 1.25rem;

      &--featured {
        color: var(--color-primary);
      }
    }
  }
  ```

### 3.3. Animations (GSAP & ScrollTrigger)
* Centralized GSAP context hooks to prevent memory leaks and duplicate triggers in React components.
* Respect user preferences for reduced motion: `@media (prefers-reduced-motion: reduce)`.
* Entrance animations, parallax scrolling effects, and scroll progress indicators.

### 3.4. Graphic Optimization
* Convert raster assets to `.webp`.
* Implement responsive image loading using standard `<picture>` elements or responsive `srcset`.

---

## 4. Directory & File Architecture

```text
portfolio-app/
├── .gitlab-ci.yml                 # GitLab Pages Deployment configuration
├── public/
│   ├── admin/                     # Decap CMS config (config.yml, index.html)
│   └── assets/                    # Optimized WebP/SVG files
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── _variables.scss    # Design tokens, colors, breakpoints
│   │       ├── _mixins.scss       # Media queries, typography mixins
│   │       └── global.scss        # Reset, base typography
│   ├── components/
│   │   ├── common/                # Header, Footer, Navigation, Button
│   │   ├── animated/              # ScrollAnimationWrapper, ParallaxCard
│   │   └── sections/              # Hero, ProjectList, BlogList
│   ├── content/                   # CMS content storage (Markdown / JSON)
│   │   ├── blog/
│   │   └── portfolio/
│   ├── hooks/                     # Custom hooks (useGSAP, useScrollTrigger)
│   ├── pages/                     # Home, Portfolio, Blog, BlogPost
│   ├── services/                  # Content loader / CMS API integration
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

---

## 5. Page Structure & Features

### 5.1. Home Page (`/`)
* **Hero Section:** Interactive welcome banner with GSAP text reveal & scroll hint.
* **Featured Projects Preview:** Top 3 showcase cards using WebP thumbnails.
* **Latest Blog Posts:** Dynamic feed from CMS.
* **Contact Call-To-Action:** Accessible contact form.

### 5.2. Portfolio Page (`/portfolio`)
* Full list of projects loaded dynamically from CMS.
* Filter tags (e.g., React, SCSS, Web Performance).
* Modal or dedicated view for detailed project descriptions.

### 5.3. Blog Page (`/blog` & `/blog/:slug`)
* Overview grid of articles sorted by date.
* Article detail template with full Markdown parsing, syntax highlighting, and reading time indicator.

---

## 6. GitLab Pages CI/CD Pipeline Config (`.gitlab-ci.yml`)

Claude Code must generate the following configuration for seamless static site deployment:

```yaml
image: node:20-alpine

cache:
  paths:
    - node_modules/

pages:
  script:
    - npm ci
    - npm run build
    - rm -rf public_build
    - mv dist public
  artifacts:
    paths:
      - public
  only:
    - main
```

---

## 7. Step-by-Step Execution Plan for Claude Code

1. **Scaffold:** Initialize React project with Vite, TypeScript, and SCSS support (`npm create vite@latest`).
2. **Install Dependencies:** `gsap`, `react-router-dom`, `sass`, `lucide-react`, `marked` (or `gray-matter` for Markdown parsing).
3. **Styles Setup:** Create SASS variables, BEM utility mixins, and reset styles.
4. **GSAP Hook Integration:** Create `useGSAP` or reusable animation components to manage GSAP cleanups on component unmount.
5. **Component Construction:** Build Header, Footer, Cards, and Section components using SCSS Modules + BEM.
6. **CMS Setup:** Configure Decap CMS (`public/admin/config.yml`) for managing blog and portfolio content directly from GitLab repository.
7. **Build & CI Config:** Setup `.gitlab-ci.yml` for GitLab Pages build.