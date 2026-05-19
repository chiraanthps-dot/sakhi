"use client";

import Link from "next/link";
import "./about.css";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PageTransition from "@/components/PageTransition";

export default function About() {
  useScrollReveal();

  return (
    <PageTransition>
      <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="blob blob-primary" style={{ width: '300px', height: '300px', top: '-60px', left: '-80px' }}></div>
        <div className="blob blob-accent" style={{ width: '200px', height: '200px', bottom: '-40px', right: '-40px' }}></div>
        <div className="container reveal">
          <span className="pi-symbol" style={{ transform: 'translateY(0px)' }}>π</span>
          <div className="pi-logo">Pi</div>
          <h1>The Team Behind <span className="text-gradient">Sakhi</span></h1>
          <p>We're a passionate team dedicated to making PCOS awareness accessible, supportive, and research-driven for every woman.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section section" id="mission">
        <div className="container">
          <div className="mission-content reveal">
            <span className="section-tag">🎯 Our Mission</span>
            <h2>Why We Built Sakhi</h2>
            <blockquote>
              "We believe every woman deserves to understand her own body — without fear, confusion, or judgment. Sakhi exists to bridge the gap between medical knowledge and everyday awareness."
            </blockquote>
            <p style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left', lineHeight: 1.8 }}>
              PCOS affects 1 in 10 women, yet most don't even know they have it. The information out there is either too medical or too vague. We created Sakhi to change that — by combining research-backed questions with simple, clear education that anyone can understand.
            </p>
            <p style={{ maxWidth: '700px', margin: 'var(--space-md) auto 0', textAlign: 'left', lineHeight: 1.8 }}>
              Our questionnaire isn't just a checklist — it's designed with weighted scoring across 6 categories, emphasizing insulin resistance as a key indicator that many assessments miss. We want to give women actionable insights, not anxiety.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section section" id="values">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">💜 Our Values</span>
            <h2>What We Stand For</h2>
          </div>
          <div className="values-grid stagger-children">
            <div className="card value-card">
              <span className="value-icon">💗</span>
              <h3>Empathy First</h3>
              <p>Every design choice, every word is crafted with care and sensitivity. We know this is personal.</p>
            </div>
            <div className="card value-card">
              <span className="value-icon">🔬</span>
              <h3>Research-Driven</h3>
              <p>Our questionnaire and content are based on established medical research and clinical indicators.</p>
            </div>
            <div className="card value-card">
              <span className="value-icon">🌍</span>
              <h3>Accessible to All</h3>
              <p>No jargon, no paywalls, no sign-ups. Just clear, helpful information available to everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="closing-section section" id="closing">
        <div className="container">
          <div className="closing-message reveal">
            <h2>You're not alone in this 🌸</h2>
            <p>
              Whether you're just learning about PCOS or have been managing it for years, Sakhi is here for you. Knowledge is power, and we're putting that power in your hands.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/questionnaire" className="btn btn-primary btn-lg">Take the Quiz →</Link>
              <Link href="/understand" className="btn btn-secondary btn-lg">Learn About PCOS</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </PageTransition>
  );
}
