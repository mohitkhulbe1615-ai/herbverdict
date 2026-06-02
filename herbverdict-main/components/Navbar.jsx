"use client";
import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Herbs", href: "/herbs" },
  { label: "Reviews", href: "/reviews" },
  { label: "Guides", href: "/guides" },
  { label: "Research", href: "/research" },
  { label: "Myths", href: "/myths" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <div className="navbar-logo-icon">HV</div>
          <span className="navbar-logo-text">HerbVerdict</span>
        </Link>

        {/* Desktop links */}
        <div className="navbar-links-desktop">
          {NAV_LINKS.map(item => (
            <Link key={item.href} href={item.href} className="navbar-link">{item.label}</Link>
          ))}
        </div>

        {/* Hamburger button */}
        <button
          className="navbar-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${open ? "open" : ""}`} />
          <span className={`hamburger-line ${open ? "open" : ""}`} />
          <span className={`hamburger-line ${open ? "open" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="navbar-mobile-menu">
          {NAV_LINKS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="navbar-mobile-link"
              onClick={() => setOpen(false)}
            >{item.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
