"use client";
import { useState } from "react";

export default function Newsletter({ variant = "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const isDark = variant === "dark";
  const bg = isDark ? "var(--bg-dark)" : "var(--bg-warm)";
  const headColor = isDark ? "#fff" : "var(--dark)";
  const subColor = isDark ? "#888" : "var(--medium)";
  const inputBg = isDark ? "#2a2a2a" : "#fff";
  const inputBorder = isDark ? "#333" : "var(--border)";
  const inputColor = isDark ? "#fff" : "var(--dark)";

  // Set NEXT_PUBLIC_NEWSLETTER_ENDPOINT in Vercel to your list provider's
  // form-post URL (Zoho Campaigns, Buttondown, Beehiiv, etc). Until that is
  // set, the form never claims a subscription it did not make.
  const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    if (!ENDPOINT) {
      setStatus("unavailable");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`Subscribe failed: ${res.status}`);
      setStatus("subscribed");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section style={{
      borderTop: `1px solid ${isDark ? "#333" : "var(--border)"}`,
      background: bg,
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "60px 40px", textAlign: "center" }}>
        <div className="label" style={{ marginBottom: 12, color: isDark ? "#666" : "var(--lighter-text)" }}>
          Newsletter
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: headColor, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
          Ayurveda research, explained
        </h2>
        <p style={{ fontSize: 15, color: subColor, marginBottom: 28, fontWeight: 300 }}>
          New evidence scorecards and product investigations delivered to your inbox. No spam. No brand promotions.
        </p>

        {status === "subscribed" ? (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--green-accent)", fontWeight: 600 }}>
            ✓ You're on the list. A confirmation email is on its way.
          </p>
        ) : status === "unavailable" || status === "error" ? (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: subColor, lineHeight: 1.6 }}>
            Sign-ups aren't running through this form yet. Email{" "}
            <a href="mailto:ash@herbverdict.com?subject=Newsletter" style={{ color: "var(--green-accent)", fontWeight: 600 }}>
              ash@herbverdict.com
            </a>{" "}
            and you'll be added by hand.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form" style={{ display: "flex", gap: 8, maxWidth: 440, margin: "0 auto" }}>
            <input
              type="email" placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)} required
              style={{
                flex: 1, padding: "12px 16px", fontSize: 14,
                fontFamily: "var(--font-sans)",
                border: `1px solid ${inputBorder}`, borderRadius: 6,
                background: inputBg, color: inputColor, outline: "none",
              }}
            />
            <button type="submit" className="btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Adding…" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
