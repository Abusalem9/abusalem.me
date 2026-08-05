# abusalem.me

Personal portfolio with three switchable skins — **Spider-Man** (default),
**Kung Fu Panda** and **Minions**. Next.js (App Router) + Tailwind v4 +
Framer Motion.

## Run it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Fill in your content

**Everything you need to edit lives in one file: `src/content/portfolio.ts`.**

It's already filled in from your resume and commit history. Anything still
worth a second look is marked `CHECK:`. That file controls:

| Export         | What it drives                                                     |
| -------------- | ------------------------------------------------------------------ |
| `site`         | Page title, meta description, canonical URL                        |
| `hero`         | Name, the rotating role lines, intro blurb, CTAs                   |
| `about`        | Origin-story paragraphs and the three stat cards                   |
| `skills`       | Signature skills + `level` (0–100), drives the web meters          |
| `skillGroups`  | The grouped arsenal panels below the meters                        |
| `projects`     | Project cards, tags, links, and the comic `sfx` stamp              |
| `experience`   | Companies → roles → bullets. One company can hold several roles.   |
| `feats`        | The white stat panels in the Feats section                         |
| `achievements` | The two wide cards under the feats                                 |
| `education`    | The training cards at the end of the timeline                      |
| `contact`      | Email, location, social links, resume link                         |
| `nav`          | Section order and anchors (the visible labels come from the theme) |

`public/resume.pdf` backs the Resume link — replace it when you update the PDF.

## Themes

Pick a skin with the three buttons in the nav. The choice is saved to
`localStorage`, and a small script in `<head>` applies it before first paint so
there's no flash of the wrong theme on reload.

**A theme owns the flavour, never the content.** Your bio, projects and jobs
live once in `src/content/portfolio.ts` and are shared by all three.

| A theme controls        | Where                                              |
| ----------------------- | -------------------------------------------------- |
| Palette                 | `:root[data-theme=...]` in `src/app/globals.css`   |
| Display + accent fonts  | same block (`--display-family`, `--comic-family`)  |
| Background texture      | `--dot-size` / `--dot-radius`, and the `.halftone` override |
| Cursor, ornament, mascot| `cursor` / `ornament` fields in `src/themes/index.ts` |
| Heading rule + marquee bullet | `divider` / `bullet` in `src/themes/index.ts` |
| How the theme *moves* | `feel` in `src/themes/index.ts` — spring stiffness/damping, hover lift, card tilt. Spider-Man is snappy, Panda slow, Minions overshoot. |
| Hero type size | `--hero-size` per theme in `globals.css` (display faces differ a lot in width) |
| Section names, nav labels, sound effects, eyebrow, footer line | `src/themes/index.ts` |

To add a fourth theme: add an entry to `themes` in `src/themes/index.ts`, add a
matching `:root[data-theme="..."]` block in `globals.css`, and — if you want a
new cursor or corner motif — a branch in `ThemeCursor.tsx` / `Ornament.tsx`.

Contrast note: two derived colours keep every theme legible — `--on-accent` for
text sitting *on* an accent fill, and `--accent-ink` for accent-coloured text on
the light panels. Minion yellow is unreadable on cream, so its `--accent-ink` is
denim blue.

## The themed bits

| Where                        | What it does                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `components/ThemeCursor`     | Canvas cursor, one mode per theme: web strand + spider-sense, brush nib + ink splat, or a goggle whose pupil leans into the turn |
| `components/IntroCurtain` + `intro/IntroPops` | Load-in: ten small motifs pop on one by one and stick — webs, brush ensō or goggles — then peel away together |
| `components/ComicBackground` | Texture field + two colour washes that drift and hue-shift on scroll                                         |
| `components/Ornament`        | Corner motif per theme: quarter-webs, bamboo stalks, or a goggle and strap                                   |
| `components/ui/Sfx`          | Starbursts that spring in — THWIP!, SKADOOSH! or BANANA! depending on the theme                              |
| `components/Projects`        | Comic panels with a pulsing spider-sense hover ripple                                                        |
| `components/Skills`          | Web-strand meters with a spider riding the tip                                                               |
| `components/Experience`      | Timeline strand that pays out as you scroll                                                                  |
| `components/Feats`           | Hard-numbers panels and achievement cards                                                                    |
| `components/HangingCard`     | The "currently" card strung from the top of the hero, mascot riding the thread                                |
| `components/Marquee`         | Tilted full-bleed band of skills scrolling between sections                                                   |
| `components/ui/Divider`      | The rule under each heading, in the theme's hand: web strand, brush stroke or stitched seam                   |

Shared shape (panels, halftone, print offset) lives in `src/app/globals.css`;
each theme's values sit in its own `:root[data-theme=...]` block above it.

## Accessibility

The site respects `prefers-reduced-motion` — the intro is skipped, the custom
cursor stays off, and animations collapse. The custom cursor also never
activates on touch devices. The theme buttons are real `<button>`s with
`aria-pressed`, and every theme's text was checked against its own background.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — no
config needed. Set `site.url` in `src/content/portfolio.ts` to the final domain
so link previews resolve correctly.
