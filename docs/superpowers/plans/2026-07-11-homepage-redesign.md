# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage (`src/pages/index.astro`) around a modern designer-portfolio structure, academic-tuned: warm-cream + ink palette, clay accent, italic-serif-accent headlines, and sections Hero → Affiliations → About → Research (dark band) → Contact.

**Architecture:** Redefine the *values* of existing CSS custom properties in `global.css` (keep token names like `--color-accent`, `--color-bg`) so every component and page inherits the new palette without renames; add a handful of new tokens (`--color-ink`, `--color-on-ink`, `--color-accent-on-ink`, `--color-accent-deep`) and utility classes for the ink band, arched portrait frame, and editorial headline. Then restyle the shared components (`Nav`, `PaperCard`, `Footer`) and finally rebuild `index.astro` to assemble the five sections.

**Tech Stack:** Astro 5, Svelte islands (unused on homepage), plain CSS with custom properties, Google Fonts already wired (Space Grotesk / Source Serif 4 / IBM Plex Mono).

## Global Constraints

- **No new dependencies.** Use existing fonts and Astro/CSS only.
- **Token names are stable.** Change token *values* in `global.css`; do not rename `--color-accent`, `--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-muted`, `--color-border`, `--font-heading`, `--font-body`, `--font-mono` — other pages depend on them.
- **Accent = clay `#C2673F`.** Blue `#4E6E8E` is the documented fallback; keep it commented in `global.css`.
- **Verification loop (no unit-test framework in this project):** every task ends with `npm run build` succeeding (0 errors) and, for visual tasks, a browser check via `npm run dev` (http://localhost:4321/).
- **Fonts already loaded** via `src/styles/fonts.css` — do not add font links.
- **Content values to confirm with JT (defaults baked in, flagged inline):**
  - Hero headline draft: *"I study how **ideology** & **politics** shape ORGANIZATIONS"* (bold words = italic-serif clay).
  - Email: `jtgard@umich.edu`.
  - LinkedIn URL: `https://www.linkedin.com/in/jtgardner` — **confirm/replace before publishing.**
  - Affiliations: University of Michigan (Ross) · Brigham Young University · Wheatley Institute · Purpose Lab · Global Politics Lab.
- **Commit after every task.**

---

## File Structure

- `src/styles/global.css` — **Modify.** Repoint palette tokens to cream+ink+clay; add ink/on-ink/accent-deep tokens; add utility classes `.ink-band`, `.editorial-title`, `.editorial-title .accent`, `.arched-frame`, `.eyebrow`, `.btn--ghost`, `.wordmark-row`. Owns all design tokens + shared utilities.
- `src/components/ui/Nav.astro` — **Modify.** Restyle to tokens (works already via tokens), add scroll-triggered border state, add Contact link + About anchor.
- `src/components/ui/PaperCard.astro` — **Modify.** Add `variant?: 'default' | 'dark'` prop for the dark research band.
- `src/components/ui/Footer.astro` — **Modify.** Add LinkedIn link; confirm tokenized styling.
- `src/pages/index.astro` — **Modify (full rebuild).** Assemble the five sections using the new tokens/utilities, new headshot, and dark-variant PaperCards.
- `src/assets/images/headshot-2026.jpg` — **Exists** (added during brainstorming). Hero portrait.

---

## Task 1: Palette, type tokens & shared utilities in `global.css`

**Files:**
- Modify: `src/styles/global.css` (`:root` block ~lines 1–78; append utilities near existing utility classes ~line 137+)

**Interfaces:**
- Produces (consumed by all later tasks):
  - Tokens: `--color-bg:#F3EFE7`, `--color-bg-alt:#EAE4D8`, `--color-ink:#211E1A`, `--color-text:#211E1A`, `--color-text-muted:#6B655C`, `--color-accent:#C2673F`, `--color-accent-deep:#A8542F`, `--color-on-ink:#EDE8DF`, `--color-accent-on-ink:#D98A5E`, `--color-border:rgba(33,30,26,.12)`, `--color-accent-light:rgba(194,103,63,.10)`.
  - Utility classes: `.eyebrow`, `.editorial-title` + `.editorial-title .accent`, `.arched-frame`, `.ink-band`, `.btn--ghost`, `.wordmark-row`.

- [ ] **Step 1: Repoint the palette tokens.** In `src/styles/global.css`, replace the color section of `:root` (the block from `--color-bg:` through `--color-card-bg:`) with:

```css
  /* Palette — warm cream + ink, clay accent.
     Fallback (previous dusty-blue): accent #4E6E8E / deep #3C5876 */
  --color-bg: #F3EFE7;
  --color-bg-alt: #EAE4D8;
  --color-bg-warm: #F6F1E8;
  --color-ink: #211E1A;
  --color-on-ink: #EDE8DF;
  --color-text: #211E1A;
  --color-text-muted: #6B655C;
  --color-accent: #C2673F;
  --color-accent-hover: #A8542F;
  --color-accent-deep: #A8542F;
  --color-accent-on-ink: #D98A5E;
  --color-accent-light: rgba(194, 103, 63, 0.10);
  --color-secondary: #4E6E8E;
  --color-secondary-hover: #3C5876;
  --color-secondary-light: rgba(78, 110, 142, 0.12);
  --color-tertiary: #8B7BAD;
  --color-highlight: #E2B08A;
  --color-border: rgba(33, 30, 26, 0.12);
  --color-border-hover: rgba(33, 30, 26, 0.20);
  --color-card-bg: rgba(255, 255, 255, 0.55);
```

- [ ] **Step 2: Add shared utilities.** Append to `src/styles/global.css` (after the `.btn--secondary` rules, before `.divider`):

```css
/* ===== EDITORIAL / REDESIGN UTILITIES ===== */
.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  font-weight: 500;
}

.editorial-title {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 0.98;
  color: var(--color-text);
  text-wrap: balance;
}

.editorial-title .accent {
  font-family: var(--font-body);
  font-style: italic;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-accent);
}

.arched-frame {
  border-radius: 46% 46% 14px 14px / 34% 34% 5px 5px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.ink-band {
  background: var(--color-ink);
  color: var(--color-on-ink);
}
.ink-band h1, .ink-band h2, .ink-band h3 { color: var(--color-on-ink); }
.ink-band .eyebrow { color: rgba(237, 232, 223, 0.6); }
.ink-band .editorial-title .accent { color: var(--color-accent-on-ink); }

.btn--ghost {
  background: transparent;
  color: var(--color-text);
  box-shadow: inset 0 0 0 1px var(--color-border-hover);
}
.btn--ghost:hover {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--color-text);
  color: var(--color-text);
}

.wordmark-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-lg) var(--space-2xl);
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--text-base);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-muted);
}
```

- [ ] **Step 3: Build to verify no CSS breakage.**

Run: `cd /Users/jtgard/Documents/personalwebsite && npm run build`
Expected: build completes, `0 errors`. (Warnings about unused images are acceptable.)

- [ ] **Step 4: Visual smoke check.**

Run: `npm run dev` and open http://localhost:4321/ — confirm the site now renders on a cream background with clay links (layout still old; that's expected — only palette changed). Stop the dev server.

- [ ] **Step 5: Commit.**

```bash
git add src/styles/global.css
git commit -m "feat: repoint palette to warm cream + clay, add editorial utilities"
```

---

## Task 2: Restyle Nav (scroll border + Contact link)

**Files:**
- Modify: `src/components/ui/Nav.astro`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: nav with links Home · About · Research · Consulting · CV · Contact; `.nav--scrolled` class toggled after 12px scroll.

- [ ] **Step 1: Update links + markup.** In `src/components/ui/Nav.astro` frontmatter, replace the `links` array with:

```js
const links = [
  { href: '/#about', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/consulting', label: 'Consulting' },
  { href: '/cv', label: 'CV' },
  { href: '/#contact', label: 'Contact' },
];
```

- [ ] **Step 2: Add scroll-border behavior.** Replace the `<script>` block in `Nav.astro` with:

```html
<script>
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu?.classList.toggle('nav__menu--open');
  });

  const onScroll = () => nav?.classList.toggle('nav--scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
</script>
```

- [ ] **Step 3: Update nav styles.** In the `<style>` block, replace the `.nav {` rule and add a scrolled state + clay underline. Replace the existing `.nav { ... }` rule with:

```css
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(243, 239, 231, 0.72);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid transparent;
    transition: border-color var(--transition-fast), background var(--transition-fast);
  }
  .nav--scrolled {
    background: rgba(243, 239, 231, 0.88);
    border-bottom-color: var(--color-border);
  }
```

And replace the `.nav__link--active` rule with an underline treatment:

```css
  .nav__link--active {
    color: var(--color-text);
    background: transparent;
    box-shadow: inset 0 -2px 0 var(--color-accent);
    border-radius: 0;
  }
```

- [ ] **Step 4: Build.**

Run: `npm run build`
Expected: 0 errors.

- [ ] **Step 5: Visual check.** `npm run dev`, load `/`, scroll down — nav gains a hairline border; the current section link shows a clay underline. Stop server.

- [ ] **Step 6: Commit.**

```bash
git add src/components/ui/Nav.astro
git commit -m "feat: nav scroll-border, clay underline, add Contact link"
```

---

## Task 3: PaperCard dark-band variant

**Files:**
- Modify: `src/components/ui/PaperCard.astro`

**Interfaces:**
- Consumes: tokens from Task 1; `Paper` type from `src/data/papers`.
- Produces: `PaperCard` accepting `variant?: 'default' | 'dark'`. Homepage passes `variant="dark"`.

- [ ] **Step 1: Add the prop.** Replace the frontmatter `interface Props` + destructure in `PaperCard.astro` with:

```astro
interface Props {
  paper: Paper;
  variant?: 'default' | 'dark';
}

const { paper, variant = 'default' } = Astro.props;
```

- [ ] **Step 2: Apply variant class.** Change the opening `<article>` tag to:

```astro
<article class:list={['paper-card', 'card', { 'paper-card--dark': variant === 'dark' }]}>
```

- [ ] **Step 3: Add dark styles.** Append to the `PaperCard.astro` `<style>` block:

```css
  .paper-card--dark {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(237, 232, 223, 0.14);
    backdrop-filter: none;
  }
  .paper-card--dark:hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
  .paper-card--dark .paper-card__title a { color: var(--color-on-ink); }
  .paper-card--dark .paper-card__title a:hover { color: var(--color-accent-on-ink); }
  .paper-card--dark .paper-card__authors,
  .paper-card--dark .paper-card__abstract { color: rgba(237, 232, 223, 0.65); }
  .paper-card--dark .label { color: var(--color-accent-on-ink); }
  .paper-card--dark .paper-card__badge {
    background: rgba(217, 138, 94, 0.18);
    color: var(--color-accent-on-ink);
  }
```

- [ ] **Step 4: Build.**

Run: `npm run build`
Expected: 0 errors.

- [ ] **Step 5: Commit.**

```bash
git add src/components/ui/PaperCard.astro
git commit -m "feat: add dark-band variant to PaperCard"
```

---

## Task 4: Footer — add LinkedIn, confirm tokens

**Files:**
- Modify: `src/components/ui/Footer.astro`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: footer with Research · Consulting · CV · LinkedIn · Email links.

- [ ] **Step 1: Add LinkedIn link.** In `Footer.astro`, replace the `<nav class="footer__links">` block with:

```astro
      <nav class="footer__links" aria-label="Footer navigation">
        <a href="/research">Research</a>
        <a href="/consulting">Consulting</a>
        <a href="/cv">CV</a>
        <a href="https://www.linkedin.com/in/jtgardner" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:jtgard@umich.edu">Email</a>
      </nav>
```

> CONFIRM the LinkedIn URL with JT before publishing.

- [ ] **Step 2: Build.**

Run: `npm run build`
Expected: 0 errors.

- [ ] **Step 3: Commit.**

```bash
git add src/components/ui/Footer.astro
git commit -m "feat: add LinkedIn to footer"
```

---

## Task 5: Rebuild `index.astro` — five sections

**Files:**
- Modify: `src/pages/index.astro` (full rewrite)

**Interfaces:**
- Consumes: tokens + utilities (Task 1), `PaperCard` dark variant (Task 3), `papers` data, `headshot-2026.jpg`.
- Produces: the redesigned homepage with `id="about"` and `id="contact"` anchors (targeted by Nav).

- [ ] **Step 1: Replace the entire file.** Overwrite `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { Image } from 'astro:assets';
import headshot from '../assets/images/headshot-2026.jpg';
import { papers } from '../data/papers';
import PaperCard from '../components/ui/PaperCard.astro';

const featuredPapers = papers.filter(p => p.order <= 3);

// CONFIRM with JT: affiliations list
const affiliations = [
  'University of Michigan · Ross',
  'Brigham Young University',
  'Wheatley Institute',
  'Purpose Lab',
  'Global Politics Lab',
];
---

<BaseLayout title="Home" description="JT Gardner — Strategy PhD student at Ross School of Business, University of Michigan. Research on ideology in organizations, socio-political positioning, and AI ethics.">

  <!-- ① HERO -->
  <section class="hero">
    <div class="hero__inner container">
      <div class="hero__text">
        <p class="eyebrow">Strategy · Organizations · Politics</p>
        <h1 class="editorial-title hero__title">
          I study how <span class="accent">ideology</span><br />
          &amp; <span class="accent">politics</span> shape<br />
          organizations
        </h1>
        <p class="hero__lede">
          PhD student in Strategy at the <strong>Ross School of Business</strong>,
          University of Michigan — researching corporate socio-political positioning,
          network theory, and AI &amp; ethical decision-making.
        </p>
        <div class="hero__actions">
          <a href="/research" class="btn btn--primary">View Research
            <span class="btn__arrow" aria-hidden="true">→</span>
          </a>
          <a href="/cv" class="btn btn--ghost">CV</a>
        </div>
      </div>
      <div class="hero__portrait">
        <Image
          src={headshot}
          alt="JT Gardner"
          width={842}
          height={1176}
          class="hero__portrait-img arched-frame"
          loading="eager"
        />
      </div>
    </div>
  </section>

  <!-- ② AFFILIATIONS -->
  <section class="affiliations container">
    <p class="eyebrow affiliations__label">Affiliations</p>
    <div class="wordmark-row">
      {affiliations.map(a => <span>{a}</span>)}
    </div>
  </section>

  <!-- ③ ABOUT -->
  <section class="about" id="about">
    <div class="container about__inner">
      <div class="about__head">
        <p class="eyebrow">About</p>
        <h2 class="editorial-title about__title">
          Ideology, politics, and the <span class="accent">choices</span> organizations make
        </h2>
      </div>
      <div class="about__body">
        <p>
          I'm a Strategy PhD student at the Ross School of Business, University of Michigan.
          My research focuses on ideology and politics in organizations, corporate
          socio-political positioning, network theory, and AI and ethical decision-making.
        </p>
        <p>
          Before starting my PhD, I studied International Relations at Brigham Young University,
          where I was a Wheatley Scholar and worked as a research assistant in the Purpose Lab
          and Global Politics Lab.
        </p>
      </div>
    </div>
  </section>

  <!-- ④ RESEARCH (dark band) -->
  <section class="research ink-band">
    <div class="container">
      <div class="research__head">
        <div>
          <p class="eyebrow">Research</p>
          <h2 class="editorial-title research__title">Featured Work</h2>
        </div>
        <a href="/research" class="research__all">All research →</a>
      </div>
      <div class="research__grid">
        {featuredPapers.map(paper => (
          <PaperCard paper={paper} variant="dark" />
        ))}
      </div>
    </div>
  </section>

  <!-- ⑤ CONTACT -->
  <section class="contact" id="contact">
    <div class="container container--narrow contact__inner">
      <p class="eyebrow">Contact</p>
      <h2 class="editorial-title contact__title">Let's <span class="accent">connect</span></h2>
      <a href="mailto:jtgard@umich.edu" class="contact__email">jtgard@umich.edu</a>
      <div class="contact__links">
        <a href="https://www.linkedin.com/in/jtgardner" target="_blank" rel="noopener">LinkedIn</a>
        <a href="/JT_Gardner_Academic_CV.pdf" target="_blank" rel="noopener">CV (PDF)</a>
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  /* ① HERO */
  .hero {
    padding: var(--space-4xl) 0 var(--space-3xl);
  }
  .hero__inner {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: var(--space-3xl);
    align-items: center;
    min-height: calc(100vh - 4.5rem - var(--space-4xl));
  }
  .hero__title {
    font-size: clamp(2.6rem, 6.2vw, 4.8rem);
    margin: var(--space-md) 0 var(--space-xl);
  }
  .hero__lede {
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
    color: var(--color-text-muted);
    max-width: 34rem;
  }
  .hero__lede strong { color: var(--color-text); }
  .hero__actions {
    display: flex;
    gap: var(--space-md);
    margin-top: var(--space-2xl);
  }
  .btn__arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.22);
  }
  .hero__portrait { display: flex; justify-content: center; }
  .hero :global(.hero__portrait-img) {
    width: 360px !important;
    height: 460px !important;
    object-fit: cover;
    object-position: center top;
  }

  /* ② AFFILIATIONS */
  .affiliations {
    padding: var(--space-2xl) var(--space-xl);
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }
  .affiliations__label { margin-bottom: var(--space-md); }

  /* ③ ABOUT */
  .about {
    background: var(--color-bg-alt);
    padding: var(--space-5xl) 0;
  }
  .about__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
    align-items: start;
  }
  .about__title {
    font-size: clamp(2rem, 3.6vw, 3rem);
    margin-top: var(--space-sm);
  }
  .about__body {
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
    color: var(--color-text-muted);
  }

  /* ④ RESEARCH */
  .research { padding: var(--space-5xl) 0; }
  .research__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--space-lg);
    margin-bottom: var(--space-2xl);
  }
  .research__title {
    font-size: clamp(2rem, 3.6vw, 3rem);
    margin-top: var(--space-sm);
  }
  .research__all {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    letter-spacing: var(--tracking-wide);
    color: var(--color-accent-on-ink);
    white-space: nowrap;
  }
  .research__all:hover { color: var(--color-on-ink); }
  .research__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-xl);
  }

  /* ⑤ CONTACT */
  .contact { padding: var(--space-5xl) 0 var(--space-4xl); }
  .contact__title {
    font-size: clamp(2.4rem, 5vw, 4rem);
    margin: var(--space-sm) 0 var(--space-xl);
  }
  .contact__email {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    letter-spacing: var(--tracking-tight);
    color: var(--color-accent);
    border-bottom: 2px solid var(--color-accent);
    padding-bottom: 2px;
  }
  .contact__email:hover { color: var(--color-accent-deep); }
  .contact__links {
    display: flex;
    gap: var(--space-xl);
    margin-top: var(--space-2xl);
    font-family: var(--font-heading);
    font-size: var(--text-base);
    letter-spacing: var(--tracking-wide);
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .hero__inner { grid-template-columns: 1fr; gap: var(--space-2xl); min-height: 0; }
    .hero__portrait { order: -1; }
    .hero :global(.hero__portrait-img) { width: 260px !important; height: 330px !important; }
    .about__inner { grid-template-columns: 1fr; gap: var(--space-lg); }
    .research__head { flex-direction: column; align-items: flex-start; }
  }
</style>
```

- [ ] **Step 2: Build.**

Run: `npm run build`
Expected: 0 errors. If Astro reports an unused import for the old `heroGeo`/`vistaCity`, confirm they are gone from this file (they should be — full rewrite).

- [ ] **Step 3: Full visual verification.**

Run: `npm run dev`, open http://localhost:4321/. Confirm, top to bottom:
- Hero: eyebrow, italic-serif-accent headline, lede, two buttons, arched portrait right.
- Affiliations wordmark row between hairlines.
- About band in cream-alt, two columns.
- Research on dark ink band with 3 dark PaperCards + "All research →".
- Contact: big "Let's connect", clay email link, LinkedIn + CV links.
- Resize to mobile width: hero stacks (portrait on top), grids collapse to 1 column.

- [ ] **Step 4: Commit.**

```bash
git add src/pages/index.astro
git commit -m "feat: rebuild homepage — hero, affiliations, about, research band, contact"
```

---

## Task 6: Final full-site build & cross-page sanity

**Files:** none (verification only).

- [ ] **Step 1: Clean build.**

Run: `npm run build`
Expected: 0 errors across all pages.

- [ ] **Step 2: Cross-page palette check.** `npm run dev`; visit `/`, `/research`, `/cv`, `/consulting`. Confirm every page renders on the new cream palette with clay accents and nothing is unreadable (e.g., light-on-light). Note any page that needs follow-up (deferred to the next round per spec §5) — do not fix layout here, only flag.

- [ ] **Step 3: Confirm open content values with JT.** Headline wording, email, LinkedIn URL, affiliations list. Apply any corrections, rebuild, and amend the relevant commit or add a small follow-up commit.

- [ ] **Step 4: Stop dev server.**

---

## Self-Review

- **Spec coverage:** visual system → Task 1; Nav → Task 2; PaperCard dark variant → Task 3; Footer/LinkedIn → Task 4; Hero + Affiliations + About + Research + Contact → Task 5; responsive/a11y baked into Tasks 2 & 5; cross-page sanity → Task 6. Stats strip, testimonials, process, Scholar deliberately absent per spec §5. ✔
- **Placeholder scan:** LinkedIn URL and headline wording are real defaults with explicit CONFIRM flags (external content, not implementation vagueness). No TODO/TBD in code. ✔
- **Type consistency:** `variant` prop name identical in Task 3 (definition) and Task 5 (usage: `variant="dark"`). Token names unchanged site-wide. Anchors `#about`/`#contact` defined in Task 5 match Nav links in Task 2. ✔
