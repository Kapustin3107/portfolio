# Portfolio

Developer portfolio & tech blog — React + TypeScript + Vite, SCSS Modules (BEM), GSAP ScrollTrigger.

## Scripts

```bash
npm run dev      # dev server
npm run build    # type-check + production build -> dist/
npm run preview  # preview production build
npm run lint     # oxlint
```

## Conventions

### Styles — SCSS Modules + BEM

- Every component has its own `Component.module.scss`.
- Import tokens and mixins with `@use '@/assets/styles' as *;`.
- Class names follow BEM: `block__element--modifier`. The block name is the kebab-case component name.
- Mobile-first: base styles target mobile, enhance with `@include mq(md|lg|xl)` (`min-width`).
- Map classes in TSX with the `bem` helper:

```tsx
import { bem } from '@/utils/bem'
import styles from './PortfolioCard.module.scss'

const b = bem(styles, 'portfolio-card')

<h3 className={b('title', { featured: isFeatured })} />
// -> portfolio-card__title [portfolio-card__title--featured]
```

### Animations — GSAP

- Import from `@/lib/gsap` only (plugins are registered there once).
- Use `useMotionAnimation(scopeRef, ({ reduceMotion, isDesktop }) => { ... })`:
  it scopes selectors, cleans up on unmount and respects `prefers-reduced-motion`.
- CSS Module classes are hashed, so target elements via refs or `data-animate` attributes.
- `<ScrollReveal>` (`@/components/animated/ScrollReveal`) is a ready-made entrance animation wrapper.

## Structure

```text
src/
├── assets/styles/      # _variables, _mixins, _index (forward), global.scss
├── components/
│   ├── common/         # Header, Footer, Navigation, Button
│   ├── animated/       # ScrollReveal, ParallaxCard
│   └── sections/       # Hero, ProjectList, BlogList
├── content/            # Markdown content (blog, portfolio)
├── hooks/              # useMotionAnimation, useReducedMotion
├── lib/                # gsap setup
├── pages/              # Home, Portfolio, Blog, BlogPost
├── services/           # content loaders
└── utils/              # bem helper
```
