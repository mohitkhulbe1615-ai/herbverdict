"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

// Static data - herbs from lib/herbs.js are duplicated here since this is a client component
// When you add new herbs, update both lib/herbs.js AND this array
const HERBS = [
  { name: "Ashwagandha", verdict: "PROVEN", studies: 15, slug: "ashwagandha", tagline: "Stress, cortisol, endurance — 15+ RCTs confirm real effects", icon: "🌿" },
  { name: "Turmeric / Curcumin", verdict: "PROVEN", studies: 20, slug: "turmeric", tagline: "Anti-inflammatory powerhouse — but bioavailability is the catch", icon: "🟡" },
  { name: "Boswellia", verdict: "PROVEN", studies: 8, slug: "boswellia", tagline: "Comparable to NSAIDs for arthritis — fewer side effects", icon: "🌳" },
  { name: "Triphala", verdict: "PROMISING", studies: 6, slug: "triphala", tagline: "Gut health and antioxidant effects — more large trials needed", icon: "🫐" },
  { name: "Brahmi", verdict: "PROMISING", studies: 7, slug: "brahmi", tagline: "Memory and cognition gains in 12-week studies", icon: "🧠" },
  { name: "Shatavari", verdict: "PROMISING", studies: 4, slug: "shatavari", tagline: "Women's health — emerging but limited clinical evidence", icon: "🌸" },
  { name: "Shilajit", verdict: "LIMITED", studies: 4, slug: "shilajit-evidence-scorecard", tagline: "Massive popularity, limited clinical trials — the gap is the story", icon: "🏔️" },
  { name: "Giloy", verdict: "LIMITED", studies: 3, slug: "giloy", tagline: "Government promoted it during COVID — what does the evidence actually show?", icon: "🌱" },
  { name: "Tulsi (Holy Basil)", verdict: "PROMISING", studies: 5, slug: "tulsi", tagline: "Documented compounds, adaptogenic potential — needs larger human trials", icon: "🌿" },
  { name: "Neem", verdict: "PROMISING", studies: 4, slug: "neem", tagline: "Antimicrobial properties documented — limited large-scale human data", icon: "🍃" },
  { name: "Amla", verdict: "PROMISING", studies: 5, slug: "amla", tagline: "Vitamin C powerhouse — antioxidant and lipid research emerging", icon: "🫒" },
];

const ALL_ARTICLES = [
  { title: "Himalaya vs Patanjali Ashwagandha: Label-by-Label", section: "reviews", slug: "himalaya-vs-patanjali-ashwagandha", category: "Product Review", color: "#1565C0", bg: "#E3F2FD", desc: "Factual label comparison of India's two biggest Ayurveda brands" },
  { title: "Top Ashwagandha Brands in India Compared", section: "reviews", slug: "top-ashwagandha-brands-india", category: "Product Review", color: "#1565C0", bg: "#E3F2FD", desc: "8 brands, label-by-label — specs, certifications, and value math" },
  { title: "Top Shilajit Brands in India Compared", section: "reviews", slug: "top-shilajit-brands-india", category: "Product Review", color: "#1565C0", bg: "#E3F2FD", desc: "6 Shilajit brands compared on fulvic acid %, heavy metal testing, and value" },
  { title: "Dabur vs Baidyanath Chyawanprash", section: "reviews", slug: "dabur-vs-baidyanath-chyawanprash", category: "Product Review", color: "#1565C0", bg: "#E3F2FD", desc: "India's two biggest chyawanprash brands compared on ingredients and specs" },
  { title: "Kapiva Shilajit Gold Review", section: "reviews", slug: "kapiva-shilajit-gold-review", category: "Product Review", color: "#1565C0", bg: "#E3F2FD", desc: "Full label analysis of India's bestselling Shilajit product" },
  { title: "Shilajit: How to Check If Yours Is Real", section: "guides", slug: "shilajit-real-vs-fake", category: "Consumer Guide", color: "#E65100", bg: "#FFF3E0", desc: "Home tests, label red flags, and the adulteration problem nobody talks about" },
  { title: "How to Read an Ayurvedic Product Label", section: "guides", slug: "how-to-read-ayurvedic-product-label", category: "Consumer Guide", color: "#E65100", bg: "#FFF3E0", desc: "FSSAI, extract types, withanolide percentages — what every label section means" },
  { title: "Dabur Chyawanprash: What's Actually In It?", section: "guides", slug: "dabur-chyawanprash-ingredients", category: "Consumer Guide", color: "#E65100", bg: "#FFF3E0", desc: "Every ingredient analysed — what has evidence, what doesn't, and the sugar question" },
  { title: "Shilajit: Gummies vs Capsules vs Resin", section: "guides", slug: "shilajit-gummies-vs-capsules-vs-resin", category: "Consumer Guide", color: "#E65100", bg: "#FFF3E0", desc: "Which form was actually tested in clinical trials? The answer might surprise you" },
  { title: "Giloy Benefits and Side Effects", section: "guides", slug: "giloy-benefits-and-side-effects", category: "Consumer Guide", color: "#E65100", bg: "#FFF3E0", desc: "The full picture — what research supports, and the liver injury signal you need to know" },
  { title: "Tulsi Types: Ram vs Krishna vs Vana", section: "guides", slug: "tulsi-types-ram-vs-krishna-vs-vana", category: "Consumer Guide", color: "#E65100", bg: "#FFF3E0", desc: "Three Tulsi varieties — do they have different compounds and evidence?" },
  { title: "What Is CCRAS and Why It Matters", section: "research", slug: "what-is-ccras", category: "Research News", color: "#6A1B9A", bg: "#F3E5F5", desc: "India's Ayurveda research body — who they are and what they've found" },
  { title: "Giloy During COVID: Science vs Claims", section: "myths", slug: "giloy-during-covid", category: "Myth Busting", color: "#C62828", bg: "#FFEBEE", desc: "Government promoted it as an immunity booster. What did the research actually show?" },
];

const FEATURED = [
  { title: "Is Your Ashwagandha Actually Working?", desc: "Most Indian brands don't disclose withanolide content. Here's what that means for you.", link: "/herbs/ashwagandha", tag: "Most Read" },
  { title: "We Checked 8 Brands. Here's What We Found.", desc: "Label-by-label comparison of every major Ashwagandha brand in India.", link: "/reviews/top-ashwagandha-brands-india", tag: "Investigation" },
  { title: "The Giloy Controversy", desc: "During COVID, it was promoted as an immunity booster. The evidence tells a different story.", link: "/myths/giloy-during-covid", tag: "Myth Busting" },
];

const STATS = [
  { num: "150+", label: "Clinical trials reviewed" },
  { num: "30", label: "In-depth articles" },
  { num: "15+", label: "Indian brands compared" },
  { num: "0", label: "Brand affiliations" },
];

const POPULAR_SEARCHES = ["Ashwagandha", "Shilajit", "Turmeric", "Himalaya", "Patanjali"];

const vc = (v) => v === "PROVEN" ? "#2E7D32" : v === "PROMISING" ? "#E65100" : "#9E9E9E";
const vbg = (v) => v === "PROVEN" ? "#E8F5E9" : v === "PROMISING" ? "#FFF3E0" : "#F5F5F5";

function SearchDropdown({ results }) {
  if (!results.length) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: "100%", marginTop: 4, background: "#fff", border: "1px solid #e0ddd5", borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.1)", zIndex: 20, overflow: "hidden" }}>
      {results.map((r, i) => (
        <Link key={i} href={r.link} style={{ display: "block", padding: "12px 18px", borderBottom: i < results.length - 1 ? "1px solid #f5f5f5" : "none", textDecoration: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{r.title}</span>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {r.verdict && <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: vc(r.verdict), background: vbg(r.verdict), padding: "2px 8px", borderRadius: 10 }}>{r.verdict}</span>}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#bbb", textTransform: "uppercase" }}>{r.type}</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 3, lineHeight: 1.4 }}>{r.desc}</div>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const heroResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const herbs = HERBS.filter(h => h.name.toLowerCase().includes(q) || h.tagline.toLowerCase().includes(q))
      .map(h => ({ title: h.name, desc: h.tagline, link: `/herbs/${h.slug}`, type: "Herb", verdict: h.verdict }));
    const articles = ALL_ARTICLES.filter(a => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q))
      .map(a => ({ title: a.title, desc: a.desc, link: `/${a.section}/${a.slug}`, type: a.category }));
    return [...herbs, ...articles].slice(0, 6);
  }, [search]);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <header className="hero-section container" style={{ paddingTop: 68, paddingBottom: 20, textAlign: "center" }}>
        <div className="label label-green" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ width: 20, height: 1, background: "var(--green-accent)", display: "inline-block" }} />
          Independent Research · No Brand Affiliations
          <span style={{ width: 20, height: 1, background: "var(--green-accent)", display: "inline-block" }} />
        </div>
        <h1 className="hero-title" style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
          What does science <span style={{ color: "var(--green-accent)" }}>actually say</span> about Ayurveda?
        </h1>
        <p className="hero-subtitle" style={{ fontSize: 18, lineHeight: 1.7, color: "var(--medium)", maxWidth: 600, margin: "0 auto 36px", fontWeight: 300 }}>
          We read the clinical trials so you don't have to. Every herb rated on real evidence — <strong style={{ color: "var(--dark)", fontWeight: 600 }}>Proven</strong>, <strong style={{ color: "var(--orange)", fontWeight: 600 }}>Promising</strong>, or <strong style={{ color: "var(--gray-limited)", fontWeight: 600 }}>Limited</strong> — with every claim linked to its source.
        </p>

        {/* ═══ BIG SEARCH BAR ═══ */}
        <div className="hero-search" style={{ position: "relative", maxWidth: 560, margin: "0 auto 20px" }}>
          <div className="search-bar-inner" style={{
            display: "flex", alignItems: "center",
            background: "#fff", border: searchFocused ? "2px solid var(--green-accent)" : "2px solid var(--border)",
            borderRadius: 14, padding: "4px 6px 4px 18px",
            boxShadow: searchFocused ? "0 4px 20px rgba(46,125,50,0.1)" : "0 2px 12px rgba(0,0,0,0.04)",
            transition: "all 0.2s",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={searchFocused ? "#2E7D32" : "#bbb"} strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search any herb, brand, or topic..."
              style={{
                flex: 1, padding: "14px 12px", fontSize: 15, fontFamily: "var(--font-sans)",
                border: "none", outline: "none", background: "transparent", color: "var(--dark)",
              }}
            />
            <button className="btn-primary" style={{ padding: "10px 20px", borderRadius: 10, fontSize: 13, flexShrink: 0, width: "auto" }}>Search</button>
          </div>

          {!search && !searchFocused && (
            <div className="popular-searches" style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#bbb" }}>Popular:</span>
              {POPULAR_SEARCHES.map(s => (
                <button key={s} onClick={() => setSearch(s)} style={{
                  fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--medium)",
                  background: "var(--bg-warm)", border: "1px solid var(--border)", borderRadius: 20,
                  padding: "4px 12px", cursor: "pointer",
                }}>{s}</button>
              ))}
            </div>
          )}

          <SearchDropdown results={heroResults} />
        </div>

        <div className="hero-buttons" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/herbs" className="btn-primary">Browse Evidence Scorecards</Link>
          <Link href="/methodology" className="btn-outline">Our Methodology</Link>
        </div>
      </header>

      {/* ═══ STATS BAR ═══ */}
      <div className="stats-bar" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-dark)", padding: "28px 40px", marginTop: 40 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap", maxWidth: 900, margin: "0 auto" }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 500, color: "var(--green-accent)" }}>{s.num}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#888", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ EDITOR'S PICKS ═══ */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div className="label" style={{ marginBottom: 8 }}>Editor's Picks</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 24px" }}>Start here</h2>
        <div className="featured-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {FEATURED.map((f, i) => (
            <Link key={i} href={f.link} style={{
              display: "block", padding: "24px 20px",
              background: i === 0 ? "var(--green-accent)" : "#fff",
              border: i === 0 ? "none" : "1px solid var(--border)",
              borderRadius: 10, textDecoration: "none",
            }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: i === 0 ? "#A5D6A7" : "var(--green-accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{f.tag}</span>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: i === 0 ? "#fff" : "var(--dark)", marginTop: 8, lineHeight: 1.35 }}>{f.title}</div>
              <div style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.5, marginTop: 8, color: i === 0 ? "rgba(255,255,255,0.8)" : "var(--light-text)" }}>{f.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ HERB SCORECARDS ═══ */}
      <section id="scorecards" className="container" style={{ paddingTop: 20, paddingBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <div>
            <div className="label" style={{ marginBottom: 8 }}>Evidence Scorecards</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Herbs by verdict</h2>
          </div>
          <Link href="/herbs" style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--green-accent)" }}>View all →</Link>
        </div>
        <p style={{ fontSize: 15, color: "var(--light-text)", marginTop: 4, marginBottom: 28, fontWeight: 300 }}>Each scorecard summarizes every available clinical trial — sample sizes, findings, limitations, and an honest verdict.</p>
        <div className="card-list">
          {HERBS.map(herb => (
            <Link key={herb.slug} href={`/herbs/${herb.slug}`} className="card-list-item herb-row" style={{
              display: "grid", gridTemplateColumns: "44px 1fr auto auto", alignItems: "center", gap: 16,
            }}>
              <span className="herb-icon" style={{ fontSize: 24, textAlign: "center" }}>{herb.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--dark)" }}>{herb.name}</div>
                <div style={{ fontSize: 13, color: "var(--light-text)", marginTop: 2, fontWeight: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{herb.tagline}</div>
              </div>
              <div className="study-count" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--light-text)", whiteSpace: "nowrap" }}>{herb.studies} studies</div>
              <span className={`verdict-badge verdict-${herb.verdict.toLowerCase()}`}>{herb.verdict}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ MORE ARTICLES ═══ */}
      <section className="container" style={{ paddingTop: 20, paddingBottom: 48 }}>
        <div className="label" style={{ marginBottom: 8 }}>Beyond Scorecards</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 24px" }}>More from HerbVerdict</h2>
        <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {ALL_ARTICLES.map((a, i) => (
            <Link key={i} href={`/${a.section}/${a.slug}`} style={{
              display: "block", padding: "18px 18px",
              background: "#fff", border: "1px solid var(--border)", borderRadius: 10, textDecoration: "none",
            }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: a.color, background: a.bg, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em", display: "inline-block" }}>{a.category}</span>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--dark)", marginTop: 8, lineHeight: 1.35 }}>{a.title}</div>
              <div style={{ fontSize: 12, color: "var(--light-text)", marginTop: 6, fontWeight: 300, lineHeight: 1.5 }}>{a.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ WHY TRUST US ═══ */}
      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-warm)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="label" style={{ marginBottom: 8 }}>Why trust us</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px" }}>How we're different</h2>
          <p style={{ fontSize: 15, color: "var(--light-text)", marginBottom: 32, fontWeight: 300 }}>Every decision we make is designed to earn trust, not clicks.</p>
          <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { icon: "📎", title: "Every claim cited", desc: "Every factual claim links to its PubMed DOI. You can verify every statement we make." },
              { icon: "🚫", title: "No brand money", desc: "No supplement company pays us to write content. Editorial verdicts are never influenced by commercial relationships." },
              { icon: "⚖️", title: "We include negative results", desc: "If a study found no significant effect, we report it. Cherry-picking is what brands do." },
              { icon: "🇮🇳", title: "India-specific", desc: "We compare Himalaya, Patanjali, Kapiva — brands you actually buy. Not US supplements you can't get." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--dark)", marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "var(--medium)", lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="label" style={{ marginBottom: 8 }}>How we work</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 32px" }}>Research you can verify</h2>
          <div className="methodology-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {[
              { step: "01", title: "We read the papers", desc: "Every RCT, systematic review, and clinical trial on PubMed. We note sample sizes, durations, journals, and limitations." },
              { step: "02", title: "We rate the evidence", desc: "PROVEN means multiple quality RCTs confirm it. PROMISING means some evidence but more trials needed. LIMITED means insufficient human data." },
              { step: "03", title: "We show our sources", desc: "Every claim links to its PubMed DOI. You can click through and read the original study yourself." },
            ].map(item => (
              <div key={item.step} style={{ padding: "20px 0" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 500, color: "#d4d0c8", marginBottom: 10 }}>{item.step}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--dark)", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "var(--medium)", lineHeight: 1.65, fontWeight: 300 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BROWSE SECTIONS ═══ */}
      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-warm)" }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div className="label" style={{ marginBottom: 8 }}>Explore</div>
          <h2 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 24px" }}>Browse by section</h2>
          <div className="section-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {[
              { href: "/herbs", label: "Herb Scorecards", desc: "Evidence ratings", count: "6 herbs", icon: "🌿" },
              { href: "/reviews", label: "Product Reviews", desc: "Brand comparisons", count: "2 reviews", icon: "🔬" },
              { href: "/guides", label: "Consumer Guides", desc: "Labels & purity", count: "2 guides", icon: "📋" },
              { href: "/research", label: "Research News", desc: "CCRAS & AYUSH", count: "1 article", icon: "📰" },
              { href: "/myths", label: "Myth Busting", desc: "Claims vs evidence", count: "1 investigation", icon: "🔍" },
            ].map(s => (
              <Link key={s.href} href={s.href} style={{
                display: "block", padding: "18px 14px", background: "#fff",
                border: "1px solid var(--border)", borderRadius: 10, textDecoration: "none", textAlign: "center",
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: "var(--dark)", marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--lighter-text)", marginBottom: 6 }}>{s.desc}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green-accent)" }}>{s.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
