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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setStatus("subscribed");
      setEmail("");
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
            ✓ You're subscribed! Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, maxWidth: 440, margin: "0 auto" }}>
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
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
