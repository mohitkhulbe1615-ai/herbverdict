export const herbs = [
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    botanical: "Withania somnifera",
    verdict: "PROVEN",
    studies: 15,
    icon: "🌿",
    tagline: "Stress, cortisol, endurance — 15+ RCTs confirm real effects",
    summary: "Ashwagandha is one of the most well-studied Ayurvedic herbs. Multiple randomized controlled trials confirm its effects on stress reduction, cortisol levels, and physical performance.",
    keywords: ["ashwagandha benefits", "ashwagandha side effects", "himalaya ashwagandha", "ashwagandha benefits in hindi"],
  },
  {
    slug: "turmeric",
    name: "Turmeric / Curcumin",
    botanical: "Curcuma longa",
    verdict: "PROVEN",
    studies: 20,
    icon: "🟡",
    tagline: "Anti-inflammatory powerhouse — but bioavailability is the catch",
    summary: "Curcumin, the active compound in turmeric, has extensive clinical evidence for anti-inflammatory effects. However, its poor bioavailability without piperine is a critical factor most articles ignore.",
    keywords: ["turmeric benefits", "curcumin vs turmeric", "haldi benefits"],
  },
  {
    slug: "boswellia",
    name: "Boswellia",
    botanical: "Boswellia serrata",
    verdict: "PROVEN",
    studies: 8,
    icon: "🌳",
    tagline: "Comparable to NSAIDs for arthritis — fewer side effects",
    summary: "Boswellia serrata has clinical evidence showing anti-inflammatory effects comparable to NSAIDs in arthritis, with significantly fewer gastrointestinal side effects.",
    keywords: ["boswellia benefits", "shallaki benefits", "boswellia vs ibuprofen"],
  },
  {
    slug: "triphala",
    name: "Triphala",
    botanical: "Emblica officinalis + Terminalia bellirica + Terminalia chebula",
    verdict: "PROMISING",
    studies: 6,
    icon: "🫐",
    tagline: "Gut health and antioxidant effects — more large trials needed",
    summary: "Triphala shows promising results for gut microbiota improvement and constipation relief in clinical trials, with emerging antioxidant research in preclinical studies.",
    keywords: ["triphala benefits", "triphala for digestion", "triphala side effects"],
  },
  {
    slug: "brahmi",
    name: "Brahmi",
    botanical: "Bacopa monnieri",
    verdict: "PROMISING",
    studies: 7,
    icon: "🧠",
    tagline: "Memory and cognition gains in 12-week studies",
    summary: "Brahmi (Bacopa monnieri) has multiple clinical trials showing improvements in memory and cognitive function over 12-week study periods, though dose standardization remains inconsistent.",
    keywords: ["brahmi benefits", "bacopa monnieri", "brahmi for memory"],
  },
  {
    slug: "shatavari",
    name: "Shatavari",
    botanical: "Asparagus racemosus",
    verdict: "PROMISING",
    studies: 4,
    icon: "🌸",
    tagline: "Women's health — emerging but limited clinical evidence",
    summary: "Shatavari has traditional use for women's health and hormonal balance, with some clinical evidence for lactation support. PCOS-specific research is emerging but limited.",
    keywords: ["shatavari benefits", "shatavari for women", "shatavari pcos"],
  },
];

export function getHerbBySlug(slug) {
  return herbs.find(h => h.slug === slug);
}

export function getVerdictClass(verdict) {
  switch (verdict) {
    case "PROVEN": return "verdict-proven";
    case "PROMISING": return "verdict-promising";
    case "LIMITED": return "verdict-limited";
    default: return "";
  }
}
