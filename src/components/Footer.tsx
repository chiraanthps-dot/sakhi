import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="nav-logo">
              🌸 Sakhi <span className="logo-devanagari">सखी</span>
            </Link>
            <p>Your companion in understanding PCOS. Built with empathy, backed by research.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link href="/">Home</Link>
            <Link href="/understand">Understand Your Body</Link>
            <Link href="/questionnaire">Check Your Risk</Link>
            <Link href="/about">About Pi</Link>
          </div>
          <div className="footer-col">
            <h4>Learn</h4>
            <Link href="/understand#what-is-pcos">What is PCOS?</Link>
            <Link href="/understand#symptoms">Common Symptoms</Link>
            <Link href="/understand#myths">Myths vs Facts</Link>
            <Link href="/understand#what-to-do">What You Should Do</Link>
          </div>
          <div className="footer-col">
            <h4>Team</h4>
            <Link href="/about">About Pi</Link>
            <Link href="/about#mission">Our Mission</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sakhi by Pi. Made with <span className="footer-bottom-heart">♥</span> for every woman.</span>
          <span>Not a medical tool. Consult a healthcare professional.</span>
        </div>
      </div>
    </footer>
  );
}
