# Homepage Redesign — Design Spec

**Date:** 2026-07-11
**Scope:** Homepage only (`src/pages/index.astro`). The resulting visual system rolls out to Research / CV / Consulting in a later round.
**Goal:** Rebuild the homepage around the structure of a modern designer-portfolio layout (per two reference templates JT provided), *academic-tuned* — papers instead of "projects," affiliations instead of "clients," no salesy stats or testimonials.

---

## Decisions locked (from brainstorming)

| Decision | Choice |
|---|---|
| Aesthetic direction | Hybrid, academic-tuned (portfolio bones, scholarly tone) |
| Palette | Warm cream + ink |
| Accent | **Clay / terracotta** (`#C2673F`) — *blue `#4E6E8E` is the fallback, one-token swap* |
| Headline treatment | Heavy sans caps + **italic-serif accent** on key words |
| Homepage composition | Full portfolio layout: Hero → Affiliations → About → Research grid → Contact |
| Hero stats strip | **Skipped** (not salesy) |
| Contact links | Email · LinkedIn · CV (PDF). *No Google Scholar this round.* |
| Hero portrait | New headshot `src/assets/images/headshot-2026.jpg` (Gemini sparkle cropped out) |

---

## 1. Visual system

### Palette (tokens replace current `:root` values in `global.css`)
```
--color-bg:        #F3EFE7   /* warm cream */
--color-bg-alt:    #EAE4D8   /* cream panel (About band) */
--color-ink:       #211E1A   /* dark band + primary text */
--color-text:      #211E1A
--color-text-muted:#6B655C
--color-accent:    #C2673F   /* clay */
--color-accent-deep:#A8542F
--color-on-ink:    #EDE8DF   /* text on the ink band */
--color-accent-on-ink:#D98A5E /* clay lightened for dark-band contrast */
--color-border:    rgba(33,30,26,.12)
```
Keep the existing blue palette values commented in the file as the documented fallback.

### Typography (already loaded in `fonts.css` — no new fonts)
- **Display / headings:** Space Grotesk 700, `letter-spacing:-.03em`, tight leading.
- **Italic-serif accent:** Source Serif 4 *italic* 600 — used on 1–2 words inside display headlines, colored clay.
- **Body:** Source Serif 4, `line-height:1.7`, measure ≤ 40rem.
- **Labels / kickers / numbers:** IBM Plex Mono, uppercase, `letter-spacing:.2em`, clay or muted.

### Signature move
Editorial headline mixing heavy sans caps with an italic-serif accent word, e.g.:
> I study how *ideology* & *politics* shape ORGANIZATIONS

This + the dark ink research band are what differentiate the page from the generic "cream + serif + terracotta" AI look. Lean into both.

---

## 2. Layout — sections top to bottom

### Nav (sticky, minimal)
- Wordmark "JT Gardner" left; links right: About · Research · CV · Consulting · Contact.
- Clay underline on active/hover.
- Transparent over cream hero; gains a hairline bottom border after scroll (small JS/IntersectionObserver or scroll listener; keep lightweight).
- Reuse/adapt existing `src/components/ui/Nav.astro`.

### ① Hero — full-height, asymmetric (text left, portrait right)
- Eyebrow (mono): `Strategy · Organizations · Politics`
- Display headline with italic-serif accent (final wording TBD with JT; draft above).
- Lede (one sentence): PhD student in Strategy, Ross School of Business, University of Michigan; studies socio-political positioning, network theory, AI & ethical decision-making.
- CTAs: **View Research** (clay pill w/ arrow) · **CV** (ghost/outline).
- Portrait: `headshot-2026.jpg` in a **soft top-arched frame** (organic curve à la reference Image 1), not a plain square.
- **No stats strip.**

### ② Affiliations strip
- Kicker: e.g. `Affiliations`.
- Quiet muted **wordmark row** (text, not logos): University of Michigan (Ross) · Brigham Young University · Wheatley Institute · Purpose Lab · Global Politics Lab.
- On cream; thin top/bottom hairline. Wraps gracefully on mobile.

### ③ About — two-column editorial band
- Background: `--color-bg-alt` (cream panel).
- Left column: large statement headline (Space Grotesk, may carry an italic-serif accent).
- Right column: existing two bio paragraphs (research focus; BYU / Wheatley / labs background).

### ④ Research grid — dark ink band
- Background: `--color-ink`; text `--color-on-ink`; accents `--color-accent-on-ink`.
- Section header (mono kicker + heading, e.g. "Featured Research").
- Existing featured papers (`papers.filter(p => p.order <= 3)`) as restyled `PaperCard`s, 2-up grid, dark-band variant.
- "All Research →" link (clay-on-ink).
- `PaperCard.astro` gains a dark-band style variant (prop or a wrapping class) without breaking its use on `/research`.

### ⑤ Contact + Footer
- Back on cream.
- Large "Let's connect" headline.
- Email as a big clay link: **jtgard@umich.edu** *(confirm address)*.
- Icon/text links: **LinkedIn** *(URL placeholder — confirm)* · **CV (PDF)** → `/JT_Gardner_Academic_CV.pdf`.
- Reuse existing `src/components/ui/Footer.astro`, restyled to tokens.

---

## 3. Components & files touched
- `src/styles/global.css` — swap palette tokens; add ink-band + arched-frame + editorial-headline utilities. Keep blue fallback commented.
- `src/pages/index.astro` — rebuild markup to the five sections above.
- `src/components/ui/Nav.astro` — restyle; scroll-border behavior.
- `src/components/ui/PaperCard.astro` — add dark-band variant.
- `src/components/ui/Footer.astro` — restyle to tokens.
- `src/assets/images/headshot-2026.jpg` — already added (hero portrait).
- Old geometric-art assets (`hero-geo.png`, `vista-city.png`) — no longer used on homepage; leave in repo for other pages.

## 4. Responsive & a11y
- Hero collapses to single column on mobile (portrait above text, per current pattern).
- Research grid 2-up → 1-up on mobile.
- Visible keyboard focus states; `prefers-reduced-motion` respected for any nav/scroll animation.
- Body measure capped; headings `text-wrap:balance`.

## 5. Out of scope (this round)
- Research / CV / Consulting page redesigns (later, once the system is proven on the homepage).
- Stats strip, testimonials, process timeline, contact form (deliberately cut as not fitting an academic).
- Google Scholar link.

## 6. Open items to confirm before/at build
1. Final hero headline wording.
2. Email address to display (default `jtgard@umich.edu`).
3. LinkedIn URL.
4. Exact affiliations list (confirm Wheatley / lab names).
