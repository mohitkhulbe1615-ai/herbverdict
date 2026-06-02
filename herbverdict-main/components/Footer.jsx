import Link from "next/link";
import { DISCLAIMER_SHORT } from "@/lib/constants";

export default function Footer() {
  return (
    <>
      {/* Disclaimer Bar */}
      <div style={{
        background: "var(--bg-warm)", borderTop: "1px solid var(--border)",
        padding: "16px 40px", textAlign: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--lighter-text)",
          maxWidth: 700, margin: "0 auto", lineHeight: 1.6,
        }}>
          <strong style={{ color: "var(--medium)" }}>Medical Disclaimer:</strong> {DISCLAIMER_SHORT}{" "}
          <Link href="/disclaimer" style={{ color: "var(--green-accent)" }}>Read full disclaimer →</Link>
        </p>
      </div>

      {/* Footer */}
      <footer style={{
        background: "var(--bg-dark)", borderTop: "1px solid #333",
        padding: "40px 40px 30px",
      }}>
        <div className="footer-inner" style={{
          maxWidth: 900, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "start",
          flexWrap: "wrap", gap: 32,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", background: "var(--green-accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700,
              }}>HV</div>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "#fff" }}>
                HerbVerdict
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#666", maxWidth: 280, lineHeight: 1.6 }}>
              India's independent, science-first Ayurveda research publication. Every claim cited. Every verdict honest.
            </p>
          </div>
          <div style={{ display: "flex", gap: 48 }}>
            <FooterCol title="Content" links={[
              { label: "Herb Library", href: "/herbs" },
              { label: "Product Reviews", href: "/reviews" },
              { label: "Consumer Guides", href: "/guides" },
              { label: "Research News", href: "/research" },
              { label: "Myth Busting", href: "/myths" },
            ]} />
            <FooterCol title="About" links={[
              { label: "About Us", href: "/about" },
              { label: "Methodology", href: "/methodology" },
              { label: "Disclaimer", href: "/disclaimer" },
            ]} />
          </div>
        </div>
        <div style={{
          maxWidth: 900, margin: "24px auto 0", paddingTop: 20,
          borderTop: "1px solid #2a2a2a", textAlign: "center",
        }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#555" }}>
            © 2026 HerbVerdict. Not affiliated with any supplement brand.
          </span>
        </div>
      </footer>
    </>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
        color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
      }}>{title}</div>
      {links.map(link => (
        <Link key={link.href} href={link.href} style={{
          display: "block", fontFamily: "var(--font-sans)",
          fontSize: 13, color: "#999", marginBottom: 8,
        }}>{link.label}</Link>
      ))}
    </div>
  );
}
