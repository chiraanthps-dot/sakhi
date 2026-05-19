"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./understand.css";
import FlipCard from "@/components/FlipCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const sectionsInfo = [
  { id: "what-is-pcos", title: "What is PCOS?" },
  { id: "why-pcos", title: "Why Does It Happen?" },
  { id: "symptoms", title: "Common Symptoms" },
  { id: "insulin", title: "Insulin Resistance" },
  { id: "what-to-do", title: "What You Should Do" },
  { id: "myths", title: "Myths vs Facts" },
];

export default function Understand() {
  useScrollReveal();
  const [activeSection, setActiveSection] = useState("what-is-pcos");
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Progress Bar calculation
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgressWidth(progress);

      // Active dots tracking
      const scrollY = window.scrollY + window.innerHeight / 3;
      let currentActive = sectionsInfo[0].id;

      for (const section of sectionsInfo) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollY) {
          currentActive = section.id;
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="edu-page">
      {/* Reading progress bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
      </div>

      {/* Hero */}
      <section className="edu-hero">
        <div className="blob blob-primary" style={{ width: "300px", height: "300px", top: "-80px", right: "-50px" }}></div>
        <div className="blob blob-secondary" style={{ width: "200px", height: "200px", bottom: "-50px", left: "-30px" }}></div>
        <div className="container reveal">
          <span className="section-tag">Your PCOS Guide</span>
          <h1>Understand <span className="text-gradient">Your Body</span></h1>
          <p>Knowledge is the first step to wellness. Scroll through to learn everything about PCOS in simple, clear terms.</p>
        </div>
      </section>

      {/* Side nav dots */}
      <nav className="edu-nav-dots" aria-label="Section navigation">
        {sectionsInfo.map((s) => (
          <button
            key={s.id}
            className={`edu-dot ${activeSection === s.id ? "active" : ""}`}
            onClick={() => scrollToSection(s.id)}
            title={s.title}
          />
        ))}
      </nav>

      {/* 1. What is PCOS? */}
      <section className="edu-section" id="what-is-pcos">
        <div className="container">
          <div className="edu-section-inner">
            <div className="pcos-explain">
              <div className="pcos-explain-text reveal-left">
                <span className="section-tag">🌿 The Basics</span>
                <h2>What is PCOS?</h2>
                <p className="lead">
                  PCOS (Polycystic Ovary Syndrome) is a condition where <strong>hormones and metabolism are imbalanced</strong>, affecting periods, skin, weight, and fertility. It's one of the most common hormonal disorders in women of reproductive age — and it's more manageable than you think.
                </p>
              </div>
              <div className="pcos-visual reveal-right">
                <div style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "var(--radius-xl)",
                  background: "var(--grad-warm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "0.5rem",
                  boxShadow: "var(--shadow-lg)"
                }}>
                  <span style={{ fontSize: "5rem" }}>🌸</span>
                  <span style={{ fontFamily: "var(--ff-heading)", fontWeight: 700, color: "var(--clr-primary)" }}>Hormones</span>
                  <span style={{ fontFamily: "var(--ff-heading)", fontWeight: 700, color: "var(--clr-secondary)" }}>Metabolism</span>
                  <span style={{ fontFamily: "var(--ff-heading)", fontWeight: 700, color: "var(--clr-accent)" }}>Lifestyle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Does PCOS Happen? */}
      <section className="edu-section" id="why-pcos">
        <div className="container">
          <div className="edu-section-inner">
            <div className="section-header reveal">
              <span className="section-tag">⚖️ Root Causes</span>
              <h2>Why Does PCOS Happen?</h2>
              <p>PCOS is rarely caused by a single factor. It's usually a combination of these:</p>
            </div>
            <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-xl)" }}>
              <div className="card" style={{ textAlign: "center" }}>
                <div className="card-icon" style={{ margin: "0 auto var(--space-md)" }}>🍬</div>
                <h3>Insulin Resistance</h3>
                <p>When cells don't respond well to insulin, the body produces more — disrupting hormonal balance.</p>
              </div>
              <div className="card" style={{ textAlign: "center" }}>
                <div className="card-icon" style={{ margin: "0 auto var(--space-md)" }}>⚡</div>
                <h3>Hormonal Imbalance</h3>
                <p>Excess androgens (male hormones) lead to symptoms like acne, facial hair, and irregular periods.</p>
              </div>
              <div className="card" style={{ textAlign: "center" }}>
                <div className="card-icon" style={{ margin: "0 auto var(--space-md)" }}>🧬</div>
                <h3>Genetics & Lifestyle</h3>
                <p>Family history, stress, poor sleep, and diet all contribute to triggering or worsening PCOS.</p>
              </div>
            </div>
            {/* Flow Diagram */}
            <div className="flow-diagram reveal" style={{ marginTop: "var(--space-2xl)" }}>
              <div className="flow-step">🍔 Poor Diet</div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">📈 Insulin ↑</div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">⚡ Hormones Disturbed</div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">🩺 Symptoms Appear</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Common Symptoms */}
      <section className="edu-section" id="symptoms">
        <div className="container">
          <div className="edu-section-inner">
            <div className="section-header reveal">
              <span className="section-tag">🌸 Know The Signs</span>
              <h2>Common Symptoms</h2>
              <p>PCOS can show up in many ways. Here are the most common signs to watch for:</p>
            </div>
            <div className="symptoms-grid stagger-children">
              <div className="card symptom-card">
                <span className="symptom-icon">📅</span>
                <h4>Irregular Periods</h4>
              </div>
              <div className="card symptom-card">
                <span className="symptom-icon">🔴</span>
                <h4>Acne & Oily Skin</h4>
              </div>
              <div className="card symptom-card">
                <span className="symptom-icon">⚖️</span>
                <h4>Weight Gain</h4>
              </div>
              <div className="card symptom-card">
                <span className="symptom-icon">💇‍♀️</span>
                <h4>Hair Fall</h4>
              </div>
              <div className="card symptom-card">
                <span className="symptom-icon">🧔‍♀️</span>
                <h4>Excess Facial Hair</h4>
              </div>
              <div className="card symptom-card">
                <span className="symptom-icon">😴</span>
                <h4>Fatigue After Meals</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Insulin Resistance */}
      <section className="edu-section" id="insulin">
        <div className="container">
          <div className="edu-section-inner">
            <div className="pcos-explain">
              <div className="pcos-explain-text reveal-left">
                <span className="section-tag">🧬 Key Concept</span>
                <h2>What is Insulin Resistance?</h2>
                <p className="lead">
                  Your body produces insulin to help glucose enter cells for energy. In insulin resistance, <strong>cells don't respond properly</strong>, so the body produces more and more insulin. This excess insulin triggers higher androgen levels — leading to PCOS symptoms.
                </p>
                <p style={{ marginTop: "var(--space-md)", fontSize: "var(--fs-small)", color: "var(--clr-text-muted)" }}>
                  Signs: Feeling sleepy after meals, frequent sugar cravings, dark patches on skin (acanthosis nigricans), and difficulty losing weight.
                </p>
              </div>
              <div className="pcos-visual reveal-right">
                <div style={{ width: "300px", padding: "var(--space-xl)", borderRadius: "var(--radius-xl)", background: "var(--clr-surface)", boxShadow: "var(--shadow-lg)", textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--ff-heading)", fontWeight: 700, color: "var(--clr-text)", marginBottom: "var(--space-md)" }}>The Insulin Cycle</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", alignItems: "center" }}>
                    <span style={{ fontSize: "2rem" }}>🍞</span>
                    <span style={{ color: "var(--clr-primary)", fontWeight: 600 }}>↓ You eat</span>
                    <span style={{ fontSize: "2rem" }}>📈</span>
                    <span style={{ color: "var(--clr-primary)", fontWeight: 600 }}>↓ Insulin rises</span>
                    <span style={{ fontSize: "2rem" }}>🚫</span>
                    <span style={{ color: "var(--clr-risk-high)", fontWeight: 600 }}>↓ Cells don't respond</span>
                    <span style={{ fontSize: "2rem" }}>⚡</span>
                    <span style={{ color: "var(--clr-risk-moderate)", fontWeight: 600 }}>↓ More insulin produced</span>
                    <span style={{ fontSize: "2rem" }}>😔</span>
                    <span style={{ color: "var(--clr-secondary)", fontWeight: 600 }}>Hormones disrupted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What You Should Do */}
      <section className="edu-section" id="what-to-do">
        <div className="container">
          <div className="edu-section-inner">
            <div className="section-header reveal">
              <span className="section-tag">🍽 Take Action</span>
              <h2>What You Should Do</h2>
              <p>Small consistent changes make a big difference. Here's where to start:</p>
            </div>
            <div className="tips-grid stagger-children">
              <div className="card tip-column">
                <h3>🥗 Diet</h3>
                <ul>
                  <li>Reduce sugar and refined carbs</li>
                  <li>Eat more protein with every meal</li>
                  <li>Include healthy fats (nuts, seeds, avocado)</li>
                  <li>Eat whole grains over processed grains</li>
                  <li>Stay hydrated throughout the day</li>
                </ul>
              </div>
              <div className="card tip-column">
                <h3>🏃‍♀️ Lifestyle</h3>
                <ul>
                  <li>Walk or move for at least 30 minutes daily</li>
                  <li>Sleep before 11 PM consistently</li>
                  <li>Practice stress reduction (yoga, meditation)</li>
                  <li>Get sunlight exposure in the morning</li>
                  <li>Limit screen time before bed</li>
                </ul>
              </div>
              <div className="card tip-column">
                <h3>🌟 Habits</h3>
                <ul>
                  <li>Never skip breakfast</li>
                  <li>Avoid eating late at night</li>
                  <li>Eat meals at regular times</li>
                  <li>Track your menstrual cycle</li>
                  <li>Get regular health check-ups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Myths vs Facts */}
      <section className="edu-section" id="myths">
        <div className="container">
          <div className="edu-section-inner">
            <div className="section-header reveal">
              <span className="section-tag">🚫 Bust The Myths</span>
              <h2>Myths vs Facts</h2>
              <p>Click on each card to reveal the truth!</p>
            </div>
            <div className="myths-grid stagger-children">
              <FlipCard
                myth={`"PCOS means you can't lose weight"`}
                fact={`"Weight can absolutely be managed with proper diet, exercise, and habits"`}
              />
              <FlipCard
                myth={`"Only overweight girls get PCOS"`}
                fact={`"Even lean individuals can have PCOS — it's about hormones, not just weight"`}
              />
              <FlipCard
                myth={`"PCOS always means infertility"`}
                fact={`"Many women with PCOS conceive naturally or with treatment. It's manageable!"`}
              />
              <FlipCard
                myth={`"You need medication forever"`}
                fact={`"Lifestyle changes can significantly reduce or eliminate the need for medication"`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="edu-cta" id="edu-cta">
        <div className="container reveal">
          <span className="section-tag" style={{ color: "var(--clr-primary-dark)" }}>📊 Ready?</span>
          <h2>Check Your Risk</h2>
          <p>Take our research-based questionnaire to understand where you stand. It's quick, private, and shareable with your doctor.</p>
          <Link href="/questionnaire" className="btn btn-primary btn-lg pulse-btn">Take the Quiz Now 🌸</Link>
        </div>
      </section>
    </main>
  );
}
