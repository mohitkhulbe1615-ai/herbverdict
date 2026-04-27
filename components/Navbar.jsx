"use client";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 40px", borderBottom: "1px solid var(--border)",
      background: "var(--bg-main)", position: "sticky", top: 0, zIndex: 100,
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: "var(--green-accent)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 14, fontFamily: "var(--font-sans)", fontWeight: 700,
        }}>HV</div>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
          HerbVerdict
        </span>
      </Link>
      <div style={{ display: "flex", gap: 32 }}>
        {NAV_LINKS.map(item => (
          <Link key={item.href} href={item.href} style={{
            fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--medium)",
          }}>{item.label}</Link>
        ))}
      </div>
    </nav>
  );
}
