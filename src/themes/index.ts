/**
 * ─────────────────────────────────────────────────────────────
 *  THEMES
 *  Each theme owns the *flavour*: colours, fonts, cursor, corner
 *  ornament, sound effects and section names.
 *
 *  It never owns the *content* — your bio, projects and jobs all
 *  live in `src/content/portfolio.ts` and are shared by all three.
 * ─────────────────────────────────────────────────────────────
 */

export type ThemeId = "spider" | "panda" | "minion";

export type Theme = {
  id: ThemeId;
  /** Shown in the theme switcher */
  label: string;
  /** Tiny glyph for the switcher button */
  glyph: string;
  /** Which cursor + corner ornament + intro this theme draws */
  cursor: "web" | "ink" | "goggle";
  ornament: "web" | "bamboo" | "goggle";
  /** Line above the hero name */
  eyebrow: string;
  /** Line in the footer */
  tagline: string;
  /** "Chapter 01", "Scroll 01", "Log 01" */
  kicker: string;
  /** Section headings, keyed by section id */
  headings: Record<string, string>;
  /** Nav labels, keyed by section id */
  navLabels: Record<string, string>;
  /** The starburst word per section id */
  sfx: Record<string, string>;
  /** Cycled across the project cards */
  projectSfx: string[];
  /** The word stamped on the loading curtain */
  intro: string;
  /** Shape of the rule under each section heading */
  divider: "web" | "brush" | "stitch";
  /** Separator drawn between words in the scrolling band */
  bullet: string;
  /**
   * How the theme moves. Spider-Man is snappy, Panda is slow and deliberate,
   * the Minions overshoot and wobble. Cards and buttons read from this so a
   * theme feels different even before you notice the colours.
   */
  feel: {
    stiffness: number;
    damping: number;
    /** px a card rises on hover */
    lift: number;
    /** max degrees of pointer tilt on a card */
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
      contact: "SEND UP THE SIGNAL",
    },
    navLabels: {
      about: "Origin",
      skills: "Arsenal",
      work: "Work",
      experience: "History",
      feats: "Feats",
      contact: "Contact",
    },
    sfx: {
      about: "ORIGIN!",
      skills: "POW!",
      work: "THWIP!",
      experience: "BAM!",
      feats: "KAPOW!",
      contact: "ZAP!",
    },
    projectSfx: ["THWIP!", "POW!", "BAM!", "ZAP!", "KRAK!", "SNIKT!"],
    intro: "THWIP!",
    divider: "web",
    bullet: "✦",
    feel: { stiffness: 380, damping: 26, lift: -8, tilt: 7 },
  },

  panda: {
    id: "panda",
    label: "Kung Fu Panda",
    glyph: "🐼",
    cursor: "ink",
    ornament: "bamboo",
    eyebrow: "There is no charge for awesomeness",
    tagline: "Yesterday is history. Today I ship.",
    kicker: "Scroll",
    headings: {
      about: "THE ORIGIN SCROLL",
      skills: "THE THOUSAND SCROLLS",
      work: "THE WORK",
      experience: "THE PATH",
      feats: "THE FEATS",
      contact: "SEND A MESSENGER",
    },
    navLabels: {
      about: "Origin",
      skills: "Scrolls",
      work: "Work",
      experience: "Path",
      feats: "Feats",
      contact: "Message",
    },
    sfx: {
      about: "AWAKEN!",
      skills: "HIYAA!",
      work: "SKADOOSH!",
      experience: "THE PATH!",
      feats: "WUXI!",
      contact: "SPEAK!",
    },
    projectSfx: ["SKADOOSH!", "HIYAA!", "WHATAA!", "KI-YAH!", "WUXI!", "SHIFU!"],
    intro: "SKADOOSH!",
    divider: "brush",
    bullet: "❉",
    feel: { stiffness: 130, damping: 22, lift: -5, tilt: 3 },
  },

  minion: {
    id: "minion",
    label: "Minions",
    glyph: "🍌",
    cursor: "goggle",
    ornament: "goggle",
    eyebrow: "Bello! Me build the things",
    tagline: "Poopaye! Thanks for scrolling.",
    kicker: "Log",
    headings: {
      about: "HOW ME HAPPENED",
      skills: "ME GADGETS",
      work: "STUFF ME MADE",
      experience: "WHERE ME WORKED",
      feats: "BIG WINS",
      contact: "TALK TO ME",
    },
    navLabels: {
      about: "Origin",
      skills: "Gadgets",
      work: "Stuff",
      experience: "Jobs",
      feats: "Wins",
      contact: "Talk",
    },
    sfx: {
      about: "BELLO!",
      skills: "BANANA!",
      work: "TULALILOO!",
      experience: "POOPAYE!",
      feats: "BEE-DO!",
      contact: "TANK YU!",
    },
    projectSfx: [
      "BANANA!",
      "BEE-DO!",
      "TULALILOO!",
      "PAPOY!",
      "BOING!",
      "GELATO!",
    ],
    intro: "BELLO!",
    divider: "stitch",
    bullet: "🍌",
    feel: { stiffness: 520, damping: 11, lift: -13, tilt: 10 },
  },
};

export const THEME_IDS = Object.keys(themes) as ThemeId[];
export const DEFAULT_THEME: ThemeId = "spider";
export const THEME_STORAGE_KEY = "portfolio-theme";
