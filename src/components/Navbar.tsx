"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // If we're on questionnaire page, it should look scrolled from start (original navbar has scrolled class)
    if (pathname === "/questionnaire") {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll(); // Check initial scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="container">
          <Link href="/" className="nav-logo" onClick={closeMenu}>
            🌸 Sakhi <span className="logo-devanagari">सखी</span>
          </Link>
          <div className={`nav-links ${menuOpen ? "open" : ""}`} id="nav-links">
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/understand"
              className={`nav-link ${pathname === "/understand" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Understand Your Body
            </Link>
            <Link
              href="/questionnaire"
              className={`nav-link ${pathname === "/questionnaire" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Check Your Risk
            </Link>
            <Link
              href="/about"
              className={`nav-link ${pathname === "/about" ? "active" : ""}`}
              onClick={closeMenu}
            >
              About Pi
            </Link>
            <Link href="/questionnaire" className="nav-cta" onClick={closeMenu}>
              Take the Quiz →
            </Link>
          </div>
          <div
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            id="nav-hamburger"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      <div
        className={`nav-overlay ${menuOpen ? "visible" : ""}`}
        id="nav-overlay"
        onClick={closeMenu}
      ></div>
    </>
  );
}
