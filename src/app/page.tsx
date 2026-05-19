"use client";

import Link from "next/link";
import "./page.css";
import Counter from "@/components/Counter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  useScrollReveal();

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="blob blob-primary hero-blob-1"></div>
          <div className="blob blob-secondary hero-blob-2"></div>
          <div className="blob blob-accent hero-blob-3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">🌿 Trusted by women, built with care</div>
            <h1 className="hero-title">
              Your body speaks.<br />
              <span className="highlight">Let's learn to listen.</span>
            </h1>
            <p className="hero-subtitle">
              Sakhi is your companion in understanding PCOS & PCOD. Take a research-based assessment, learn about your body, and discover what you can do — all in one place.
            </p>
            <div className="hero-actions">
              <Link href="/questionnaire" className="btn btn-primary btn-lg">Check Your Risk →</Link>
              <Link href="/understand" className="btn btn-secondary btn-lg">Learn About PCOS</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-illustration-placeholder" style={{
              width: '100%',
              maxWidth: '440px',
              aspectRatio: '1',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--grad-warm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <span style={{ fontSize: '6rem' }}>🌸</span>
              <span style={{
                fontFamily: 'var(--ff-heading)',
                fontSize: '2.5rem',
                fontWeight: 800,
                background: 'var(--grad-accent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Sakhi</span>
              <span style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.2rem', color: 'var(--clr-text-muted)' }}>सखी — Your Companion</span>
            </div>
            <div className="hero-float-card card-1">
              💜 1 in 10 women affected
            </div>
            <div className="hero-float-card card-2">
              ✨ Early awareness helps
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats section" id="stats">
        <div className="container">
          <div className="stats-grid stagger-children">
            <div className="stat-item">
              <h3><Counter target={10} suffix="%" /></h3>
              <p>of women of reproductive age are affected by PCOS</p>
            </div>
            <div className="stat-item">
              <h3><Counter target={70} suffix="%" /></h3>
              <p>of cases remain undiagnosed worldwide</p>
            </div>
            <div className="stat-item">
              <h3><Counter target={50} suffix="%" /></h3>
              <p>linked to insulin resistance as a root cause</p>
            </div>
            <div className="stat-item">
              <h3><Counter target={80} suffix="%" /></h3>
              <p>can be managed with lifestyle changes</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works section" id="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">How It Works</span>
            <h2>Three simple steps to <span className="text-gradient">understand yourself better</span></h2>
            <p>No sign-ups, no judgment — just insight.</p>
          </div>
          <div className="hiw-grid stagger-children">
            <div className="card hiw-card">
              <div className="hiw-step">1</div>
              <h3>Answer the Quiz</h3>
              <p>Take our research-based questionnaire covering symptoms, lifestyle, and medical history.</p>
            </div>
            <div className="card hiw-card">
              <div className="hiw-step">2</div>
              <h3>Get Your Insight</h3>
              <p>Receive a personalized risk breakdown with category-wise analysis. Share it with your doctor.</p>
            </div>
            <div className="card hiw-card">
              <div className="hiw-step">3</div>
              <h3>Learn & Act</h3>
              <p>Explore our education page to understand PCOS, debunk myths, and discover healthy habits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner" id="cta-banner">
        <div className="container reveal">
          <h2>Ready to understand your body better?</h2>
          <p>Our assessment takes less than 5 minutes and gives you a complete risk breakdown.</p>
          <Link href="/questionnaire" className="btn btn-lg">Take the Quiz Now 🌸</Link>
        </div>
      </section>
    </main>
  );
}
