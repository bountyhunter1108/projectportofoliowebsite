# Technical Specification - Grady Warren Rusli Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | React DOM renderer |
| gsap | ^3.12.0 | Core animation engine, ScrollTrigger, SplitText |
| lenis | ^1.1.0 | Smooth scroll with inertia |
| react-fast-marquee | ^1.6.0 | Infinite logo loop for skills |
| swiper | ^11.0.0 | Touch slider for projects & testimonials |
| lucide-react | ^0.400.0 | Lightweight icon library (fallback only — prioritize custom SVGs) |
| tailwindcss | ^3.4.0 | Utility-first CSS |
| postcss | ^8.4.0 | CSS processing |
| autoprefixer | ^10.4.0 | Vendor prefixes |
| typescript | ^5.5.0 | Type safety |
| vite | ^5.4.0 | Build tool |
| @vitejs/plugin-react | ^4.3.0 | React support for Vite |
| @types/react | ^18.3.0 | React type definitions |
| @types/react-dom | ^18.3.0 | ReactDOM type definitions |

**Google Fonts** (loaded via `<link>` in index.html): Playfair Display (400,500,600), Inter (300,400,500), JetBrains Mono (400)

---

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Navbar | Custom | Singleton — fixed bottom dock with glassmorphism |
| BackgroundCanvas | Custom | Singleton — fullscreen canvas (galaxy + lines + waves) |
| Preloader | Custom | Singleton — signature SVG drawing + progress bar |
| CustomCursor | Custom | Singleton — lerp-following dot cursor |
| Footer | Custom | Singleton |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| NeubrutalismCard | Custom | Services, Pricing, Testimonials, FAQ — accepts children, border/shadow/radius props |
| ElectricBorder | Custom | Profile photo, Project cards — SVG animated border wrapper |
| RGBBorder | Custom | Project images, Footer logo — CSS hue-rotate animated border |
| SplitText | Custom + GSAP SplitText | Hero heading — per-character scroll-triggered reveal |
| ShinyText | Custom (CSS) | Hero subtitle — gradient shine sweep animation |
| TiltCard | Custom | Profile card — 3D mouse-following tilt with glow |
| MarqueeLogo | Custom + react-fast-marquee | Skills section — infinite scrolling tech logos |
| AccordionItem | Custom | FAQ, Why Choose Me — animated height expand/collapse |
| ProgressBar | Custom + GSAP | Skill cards — animated fill on scroll |
| SectionHeading | Custom | All sections — Playfair Display with optional gradient |
| SocialIcon | Custom | About, Contact, Hero — LinkedIn, GitHub, Instagram SVGs |

### Section Components

| Component | Notes |
|-----------|-------|
| HeroSection | SplitText + ShinyText + CTAs + social links |
| AboutSection | Two-column: TiltCard + text + accordion |
| SkillsSection | Filter tabs + 18 skill cards + marquee |
| ProjectsSection | Swiper carousel + ElectricBorder cards |
| TestimonialsSection | Swiper carousel with auto-slide |
| ServicesSection | 4 neubrutalism cards |
| PricingSection | 3 cards with highlighted Standard |
| FAQSection | 6 accordion items |
| ProcessSection | 4-step horizontal timeline with scroll progress |
| ContactSection | Form + contact info with social icons |
| WhyChooseSection | 6-item accordion |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Signature drawing preloader | GSAP | stroke-dashoffset animation on SVG path, 3s duration | Medium |
| Progress bar fill | GSAP | tween width 0→100% over 2.5s | Low |
| Preloader fade out | GSAP | opacity + scale, then unmount | Low |
| **Hero Split Text** | GSAP SplitText + ScrollTrigger | split chars, stagger 50ms, y:40→0, opacity 0→1, duration 1.3s, power3.out, threshold 0.1 | Medium |
| **Hero Shiny Text** | CSS @keyframes | background-clip:text, linear-gradient 120deg, 2s infinite sweep, #b5b5b5 → #ffffff | Low |
| Galaxy background | Canvas 2D | requestAnimationFrame, particle system with twinkle, slow rotation, ~800 particles | **High** |
| Floating lines | Canvas 2D | Curved bezier lines drifting with sine wave offset, semi-transparent | Medium |
| Line waves | Canvas 2D | Horizontal sinusoidal waves with glow at peaks using shadowBlur | Medium |
| **Electric border** | SVG + JS | SVG path with animated stroke-dashoffset, feGaussianBlur filter, chaos distortion via randomized path points, ResizeObserver for responsive | **High** |
| **3D tilt card** | Custom hook | mousemove → calculate rotateX/Y ±10deg, lerp 0.1, radial gradient glow follows cursor position | Medium |
| RGB animated border | CSS @keyframes | border-image with conic-gradient + hue-rotate 4s infinite, 4px border | Low |
| Navbar mouse follow | Custom | mousemove Y → lerp translateY ±8px | Low |
| Navbar hover spring | CSS | scale(1.15) with cubic-bezier bounce | Low |
| Scroll-triggered sections | GSAP ScrollTrigger | Each section: fade-in-up / slide-in-left / slide-in-right / scale-in / flip-in-3D. Reversible (toggleActions: "play none none play"). Threshold 0.2 | Medium |
| Skill cards stagger | GSAP ScrollTrigger | scale(0.9)→1, opacity 0→1, stagger 0.08s | Low |
| Progress bar fill | GSAP ScrollTrigger | width 0%→target%, 1.2s ease-out, triggered on viewport enter | Low |
| Logo loop marquee | react-fast-marquee | speed 80px/s, pauseOnHover, fade-out edges via mask-image gradient | Low |
| Project carousel | Swiper | slidesPerView:3/1, autoSlide 5s, navigation arrows, pagination | Low |
| Testimonial carousel | Swiper | slidesPerView:1/1, autoSlide 4s, smooth transition | Low |
| Accordion expand | GSAP | height:0→auto, 0.4s ease, icon rotation 45→0deg | Low |
| Custom cursor | Custom | requestAnimationFrame lerp 0.15, scale up on hoverable elements | Medium |
| Dark mode toggle | CSS + React state | class toggle on root, transition 0.5s, localStorage persistence | Low |
| Process line fill | GSAP ScrollTrigger | stroke-dashoffset tied to scroll progress | Medium |
| Card hover neubrutalism | CSS | translate(-4px,-4px), shadow expansion, transition 0.2s | Low |
| CTA button hover | CSS | translate(-2px,-2px), shadow color change, 0.25s ease | Low |

---

## State & Logic

### Preloader State Machine
States: `loading` → `completing` → `done`
- `loading`: signature draws (3s) + progress fills (2.5s)
- `completing`: fade out animation (0.6s)
- `done`: component unmounts, main content becomes interactive

### Dark Mode
- React context: `isDark` boolean
- localStorage key: `portfolio-theme`
- CSS: `.dark` class on `<html>` toggles all color variables
- Transition: 0.5s on background-color, color, border-color

### Active Section Tracking
- Intersection Observer on each section (threshold 0.3)
- Updates `activeSection` state → drives navbar dot indicator
- Smooth scroll to section on nav click

### 3D Tilt Logic (TiltCard)
- onMouseMove: calculate relative position (0-1), map to rotateX/Y ±10deg
- onMouseLeave: reset to 0 with spring animation
- Glow position: radial-gradient center follows mouse within card bounds

### Electric Border (ElectricBorder)
- ResizeObserver watches wrapper size → updates SVG viewBox
- SVG path generated with chaos distortion (randomized control points)
- Two paths: one for glow (blurred, thicker), one for visible line
- stroke-dashoffset animation creates flowing effect

### Canvas Background
- Single canvas element, position:fixed, z-index:-1
- Three draw functions called per frame:
  1. `drawGalaxy()`: particle array (x,y,size,opacity,twinkleSpeed), slow rotation
  2. `drawFloatingLines()`: line array (startX,startY,controlPoints,driftSpeed), bezier curves
  3. `drawLineWaves()`: wave array (amplitude,frequency,phase,speed), horizontal sine waves
- Offscreen canvas optional for performance optimization

---

## Other Key Decisions

- **No shadcn/ui components** — design is fully custom neubrutalism, no standard UI patterns needed
- **Single-page application** — all sections on one page with anchor navigation
- **Vite + React (not Next.js)** — static portfolio, no SSR needed, simpler deployment
- **Canvas for background (not Three.js)** — 2D canvas sufficient for particle effects, lighter bundle
- **GSAP for all scroll animations** — consistent API, ScrollTrigger is industry standard
- **Custom SVGs over icon libraries** — requirement for unique, non-generic icons. Only lucide-react as fallback for simple utility icons
