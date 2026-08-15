// Presentation metadata ONLY.
// Verdicts and study counts are NOT stored here — they are read from the
// frontmatter of content/herbs/*.mdx via getHerbsIndex() in lib/content.js.
// The article is the single source of truth. Never duplicate verdict data here.

export const HERB_META = {
  ashwagandha: {
    icon: "🌿",
    tagline: "22 RCTs reviewed — stress and sleep signals, with real caveats on trial quality",
  },
  turmeric: {
    icon: "🟡",
    tagline: "17 RCTs reviewed — bioavailability decides whether the evidence applies at all",
  },
  boswellia: {
    icon: "🌳",
    tagline: "9 RCTs reviewed — the most consistent single-condition evidence base we found",
  },
  triphala: {
    icon: "🫐",
    tagline: "9 human trials reviewed — gut and dental data hold up, the rest is thin",
  },
  brahmi: {
    icon: "🧠",
    tagline: "9 RCTs reviewed — cognition changes show up only past the 8-week mark",
  },
  shatavari: {
    icon: "🌸",
    tagline: "5 human trials reviewed — small lactation dataset, PCOS claims largely untested",
  },
  shilajit: {
    icon: "🏔️",
    tagline: "6 trials reviewed — popularity far outruns the clinical trial base",
  },
  giloy: {
    icon: "🌱",
    tagline: "4 RCTs reviewed — thin evidence, plus a documented liver injury signal",
  },
  tulsi: {
    icon: "🌿",
    tagline: "7 RCTs reviewed — stress and sleep data exist, sample sizes stay small",
  },
  neem: {
    icon: "🍃",
    tagline: "5 RCTs reviewed — strongest for oral health and psoriasis, patchy elsewhere",
  },
  amla: {
    icon: "🫒",
    tagline: "8 RCTs reviewed — lipid and glucose markers are the real story",
  },
};

export const DEFAULT_HERB_ICON = "🌿";

export function getVerdictClass(verdict) {
  switch (verdict) {
    case "PROVEN": return "verdict-proven";
    case "PROMISING": return "verdict-promising";
    case "LIMITED": return "verdict-limited";
    default: return "";
  }
}

export const VERDICT_ORDER = ["PROVEN", "PROMISING", "LIMITED"];
