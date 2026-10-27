/**
 * ─────────────────────────────────────────────────────────────
 *  THEMES
 *  Spider-Man theme: colours, fonts, cursor, corner
 *  ornament, sound effects and section names.
 *
 *  Content lives in `src/content/portfolio.ts`.
 * ─────────────────────────────────────────────────────────────
 */

export type ThemeId = "spider";

export type Theme = {
  id: ThemeId;
  label: string;
  glyph: string;
  cursor: "web";
  ornament: "web";
  eyebrow: string;
  tagline: string;
  kicker: string;
  headings: Record<string, string>;
  navLabels: Record<string, string>;
  sfx: Record<string, string>;
  projectSfx: string[];
  intro: string;
  divider: "web";
  bullet: string;
  feel: {
    stiffness: number;
    damping: number;
    lift: number;
    tilt: number;
  };
};

export const themes: Record<ThemeId, Theme> = {
  spider: {
    id: "spider",
    label: "Spider-Man",
    glyph: "🕷",
    cursor: "web",
    ornament: "web",
    eyebrow: "With great code comes great responsibility",
    tagline: "Your friendly neighbourhood developer.",
    kicker: "Chapter",
    headings: {
      about: "ORIGIN STORY",
      skills: "THE ARSENAL",
      work: "THE WORK",
      experience: "THE HISTORY",
      feats: "THE FEATS",
      timeline: "THE TIMELINE",
      contact: "SEND UP THE SIGNAL",
    },
    navLabels: {
      about: "Origin",
      skills: "Arsenal",
      work: "Work",
      experience: "History",
      feats: "Feats",
      timeline: "Timeline",
      contact: "Contact",
    },
    sfx: {
      about: "ORIGIN!",
      skills: "POW!",
      work: "THWIP!",
      experience: "BAM!",
      feats: "KAPOW!",
      timeline: "CHRONO!",
      contact: "ZAP!",
    },
    projectSfx: ["THWIP!", "POW!", "BAM!", "ZAP!", "KRAK!", "SNIKT!"],
    intro: "THWIP!",
    divider: "web",
    bullet: "✦",
    feel: { stiffness: 380, damping: 26, lift: -8, tilt: 7 },
  },
};

export const THEME_IDS = Object.keys(themes) as ThemeId[];
export const DEFAULT_THEME: ThemeId = "spider";
export const THEME_STORAGE_KEY = "portfolio-theme";
