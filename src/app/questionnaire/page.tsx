"use client";

import Link from "next/link";
import { useState } from "react";
import "./questionnaire.css";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const quizData = [
  {
    id: 'symptoms',
    emoji: '🩺',
    title: 'Symptoms',
    subtitle: "Let's start with what your body is telling you",
    questions: [
      { id: 'q1', text: 'How regular is your menstrual cycle?', options: [
        { label: 'Regular', value: 0 }, { label: 'Slightly Irregular', value: 1 },
        { label: 'Irregular', value: 2 }, { label: 'Very Irregular', value: 3 }
      ]},
      { id: 'q2', text: 'Do you experience acne frequently?', options: [
        { label: 'Rarely', value: 0 }, { label: 'Sometimes', value: 1 },
        { label: 'Often', value: 2 }, { label: 'Very Often', value: 3 }
      ]},
      { id: 'q3', text: 'Do you notice excess facial or body hair?', options: [
        { label: 'No', value: 0 }, { label: 'A Little', value: 1 },
        { label: 'Moderate', value: 2 }, { label: 'Significant', value: 3 }
      ]},
      { id: 'q4', text: 'Do you have hair thinning or hair fall?', options: [
        { label: 'No', value: 0 }, { label: 'Mild', value: 1 },
        { label: 'Moderate', value: 2 }, { label: 'Severe', value: 3 }
      ]}
    ]
  },
  {
    id: 'insulin',
    emoji: '🍽',
    title: 'Insulin Resistance',
    subtitle: 'These questions help identify metabolic patterns',
    questions: [
      { id: 'q5', text: 'Do you feel sleepy or tired after meals?', options: [
        { label: 'Never', value: 0 }, { label: 'Sometimes', value: 1 },
        { label: 'Often', value: 2 }, { label: 'Almost Always', value: 3 }
      ]},
      { id: 'q6', text: 'Do you experience frequent sugar cravings?', options: [
        { label: 'Rarely', value: 0 }, { label: 'Sometimes', value: 1 },
        { label: 'Often', value: 2 }, { label: 'Very Often', value: 3 }
      ]},
      { id: 'q7', text: 'Do you feel hungry soon after eating?', options: [
        { label: 'No', value: 0 }, { label: 'Sometimes', value: 1 },
        { label: 'Often', value: 2 }, { label: 'Almost Always', value: 3 }
      ]}
    ]
  },
  {
    id: 'body',
    emoji: '⚖️',
    title: 'Body & Lifestyle',
    subtitle: 'Understanding your body composition and activity',
    questions: [
      { id: 'q8', text: 'What is your BMI range?', hint: 'BMI = weight(kg) / height(m)²', type: 'bmi', options: [
        { label: 'Under 18.5 (Underweight)', value: 1 }, { label: '18.5–24.9 (Normal)', value: 0 },
        { label: '25–29.9 (Overweight)', value: 2 }, { label: '30+ (Obese)', value: 3 }
      ]},
      { id: 'q9', text: 'Has your weight increased recently without clear reason?', options: [
        { label: 'No', value: 0 }, { label: 'Slightly', value: 1 },
        { label: 'Noticeably', value: 2 }, { label: 'Significantly', value: 3 }
      ]},
      { id: 'q10', text: 'How often do you exercise?', options: [
        { label: 'Daily', value: 0 }, { label: 'A few times/week', value: 1 },
        { label: 'Rarely', value: 2 }, { label: 'Never', value: 3 }
      ]}
    ]
  },
  {
    id: 'sleep',
    emoji: '😴',
    title: 'Sleep & Stress',
    subtitle: 'Stress and sleep directly impact your hormones',
    questions: [
      { id: 'q11', text: 'How many hours do you sleep on average?', options: [
        { label: '7–9 hours', value: 0 }, { label: '6–7 hours', value: 1 },
        { label: '5–6 hours', value: 2 }, { label: 'Less than 5', value: 3 }
      ]},
      { id: 'q12', text: 'Do you sleep and wake at regular times?', options: [
        { label: 'Yes, very regular', value: 0 }, { label: 'Mostly regular', value: 1 },
        { label: 'Irregular', value: 2 }, { label: 'Very irregular', value: 3 }
      ]},
      { id: 'q13', text: 'How would you rate your stress level?', options: [
        { label: 'Low', value: 0 }, { label: 'Moderate', value: 1 },
        { label: 'High', value: 2 }, { label: 'Very High', value: 3 }
      ]}
    ]
  },
  {
    id: 'food',
    emoji: '🍔',
    title: 'Food Habits',
    subtitle: 'Your eating patterns matter more than you think',
    questions: [
      { id: 'q14', text: 'Do you skip breakfast?', options: [
        { label: 'Never', value: 0 }, { label: 'Sometimes', value: 1 },
        { label: 'Often', value: 2 }, { label: 'Almost Always', value: 3 }
      ]},
      { id: 'q15', text: 'How often do you eat processed or sugary food?', options: [
        { label: 'Rarely', value: 0 }, { label: 'A few times/week', value: 1 },
        { label: 'Daily', value: 2 }, { label: 'Multiple times/day', value: 3 }
      ]},
      { id: 'q16', text: 'Do you eat late at night?', options: [
        { label: 'No', value: 0 }, { label: 'Sometimes', value: 1 },
        { label: 'Often', value: 2 }, { label: 'Almost Every Night', value: 3 }
      ]}
    ]
  },
  {
    id: 'medical',
    emoji: '💊',
    title: 'Medical Background',
    subtitle: 'A few final questions about your health history',
    questions: [
      { id: 'q17', text: 'Are you currently taking any medication for PCOS?', options: [
        { label: 'No', value: 0 }, { label: 'Previously, not now', value: 1 },
        { label: 'Yes, currently', value: 2 }
      ]},
      { id: 'q18', text: 'Any family history of PCOS or diabetes?', options: [
        { label: 'No', value: 0 }, { label: 'Not sure', value: 1 },
        { label: 'Yes (distant relative)', value: 2 }, { label: 'Yes (parent/sibling)', value: 3 }
      ]}
    ]
  }
];

const categoryWeights: { [key: string]: number } = {
  symptoms: 1.2,
  insulin: 1.5,
  body: 1.0,
  sleep: 0.9,
  food: 0.8,
  medical: 1.3
};

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [bmiWeight, setBmiWeight] = useState("");
  const [bmiHeight, setBmiHeight] = useState("");
  const [bmiResult, setBmiResult] = useState("");
  const [shakingQuestions, setShakingQuestions] = useState<{ [key: string]: boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [shareText, setShareText] = useState("📤 Share with Doctor");

  // Re-run scroll animations whenever the step changes or results show
  useScrollReveal([currentStep, showResults]);

  const selectOption = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateBMI = () => {
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight);
    if (!w || !h) {
      setBmiResult("Please enter both values");
      return;
    }
    const bmiVal = (w / ((h / 100) ** 2)).toFixed(1);
    const bmiNum = parseFloat(bmiVal);
    let category = "";
    let selectedOptionVal = 0;

    if (bmiNum < 18.5) {
      category = "Underweight";
      selectedOptionVal = 1;
    } else if (bmiNum < 25) {
      category = "Normal";
      selectedOptionVal = 0;
    } else if (bmiNum < 30) {
      category = "Overweight";
      selectedOptionVal = 2;
    } else {
      category = "Obese";
      selectedOptionVal = 3;
    }

    setBmiResult(`Your BMI: ${bmiVal} (${category})`);
    selectOption("q8", selectedOptionVal);
  };

  const validateStep = () => {
    const category = quizData[currentStep];
    const unanswered = category.questions.filter(q => answers[q.id] === undefined);
    if (unanswered.length > 0) {
      const newShakes = { ...shakingQuestions };
      unanswered.forEach(q => {
        newShakes[q.id] = true;
      });
      setShakingQuestions(newShakes);
      setTimeout(() => {
        const clearedShakes = { ...newShakes };
        unanswered.forEach(q => {
          clearedShakes[q.id] = false;
        });
        setShakingQuestions(clearedShakes);
      }, 600);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShowResults = () => {
    if (validateStep()) {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setBmiWeight("");
    setBmiHeight("");
    setBmiResult("");
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Compile calculations
  const getResults = () => {
    const categoryScores: {
      [key: string]: {
        score: number;
        max: number;
        pct: number;
        title: string;
        emoji: string;
      };
    } = {};

    let totalWeightedScore = 0;
    let maxPossibleScore = 0;

    quizData.forEach((cat) => {
      let catScore = 0;
      let catMax = 0;
      cat.questions.forEach((q) => {
        const val = answers[q.id] || 0;
        catScore += val;
        const maxOption = Math.max(...q.options.map(o => o.value));
        catMax += maxOption;
      });
      const weight = categoryWeights[cat.id] || 1;
      categoryScores[cat.id] = {
        score: catScore,
        max: catMax,
        pct: Math.round((catScore / catMax) * 100),
        title: cat.title,
        emoji: cat.emoji
      };
      totalWeightedScore += catScore * weight;
      maxPossibleScore += catMax * weight;
    });

    const overallPct = Math.round((totalWeightedScore / maxPossibleScore) * 100);
    let riskLevel = "Low";
    let riskColor = "var(--clr-risk-low)";
    let riskAdvice = "Your responses suggest a low risk. Keep maintaining your healthy habits! Regular check-ups are still recommended.";

    if (overallPct <= 30) {
      riskLevel = "Low";
      riskColor = "var(--clr-risk-low)";
      riskAdvice = "Your responses suggest a low risk. Keep maintaining your healthy habits! Regular check-ups are still recommended.";
    } else if (overallPct <= 60) {
      riskLevel = "Moderate";
      riskColor = "var(--clr-risk-moderate)";
      riskAdvice = "Some of your responses indicate moderate risk factors. Consider consulting a healthcare professional and reviewing our lifestyle tips.";
    } else {
      riskLevel = "High";
      riskColor = "var(--clr-risk-high)";
      riskAdvice = "Your responses suggest several risk indicators. We strongly recommend consulting a gynecologist or endocrinologist for proper evaluation.";
    }

    return { overallPct, riskLevel, riskColor, riskAdvice, categoryScores };
  };

  const handleShare = () => {
    const { overallPct, categoryScores } = getResults();
    let text = `🌸 Sakhi — PCOS Risk Assessment Results\n\nOverall Score: ${overallPct}%\n\n`;
    Object.values(categoryScores).forEach(c => {
      text += `${c.title}: ${c.pct}%\n`;
    });
    text += `\n⚠️ This is not a diagnosis. Please consult a doctor.\n🔗 Take the quiz: ${window.location.href}`;

    if (navigator.share) {
      navigator.share({ title: "Sakhi — My PCOS Risk Assessment", text })
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareText("✅ Copied to Clipboard!");
      setTimeout(() => {
        setShareText("📤 Share with Doctor");
      }, 2500);
    }).catch(() => {
      alert("Could not copy automatically. Here are the results:\n\n" + text);
    });
  };

  const currentCategory = quizData[currentStep];
  const progressPct = ((currentStep + 1) / quizData.length) * 100;

  if (showResults) {
    const { overallPct, riskLevel, riskColor, riskAdvice, categoryScores } = getResults();

    return (
      <main className="quiz-page">
        <div className="container">
          <div className="results-container reveal">
            <div className="results-header">
              <h2>Your Results</h2>
              <div className="results-score-circle" style={{ borderColor: riskColor } as React.CSSProperties}>
                <span className="results-pct">{overallPct}%</span>
                <span className="results-risk" style={{ color: riskColor }}>{riskLevel} Risk</span>
              </div>
              <p className="results-advice">{riskAdvice}</p>
            </div>
            <div className="results-breakdown stagger-children">
              <h3>Category Breakdown</h3>
              <div className="results-categories">
                {Object.values(categoryScores).map((cat, idx) => {
                  let barColor = "var(--clr-risk-low)";
                  if (cat.pct > 60) barColor = "var(--clr-risk-high)";
                  else if (cat.pct > 30) barColor = "var(--clr-risk-moderate)";

                  return (
                    <div key={idx} className="result-category-row">
                      <span className="result-cat-label">{cat.emoji} {cat.title}</span>
                      <div className="result-bar-track">
                        <div className="result-bar-fill" style={{ width: `${cat.pct}%`, background: barColor }}></div>
                      </div>
                      <span className="result-cat-pct">{cat.pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="results-actions reveal">
              <Link href="/understand" className="btn btn-primary btn-lg">Learn About PCOS →</Link>
              <button className="btn btn-secondary btn-lg" onClick={handleShare}>{shareText}</button>
              <button className="btn btn-secondary" onClick={handleRestart}>↻ Retake Quiz</button>
            </div>
            <div className="results-disclaimer reveal">
              <p>⚠️ <strong>Disclaimer:</strong> This assessment is for awareness purposes only and does not constitute a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation and treatment.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="quiz-page">
      <div className="container">
        <div className="quiz-progress">
          <span className="quiz-progress-label">Step {currentStep + 1} of {quizData.length}</span>
          <div className="quiz-progress-track">
            <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>
        <div id="quiz-container">
          <div className="quiz-step" id={`step-${currentStep}`}>
            <div className="quiz-step-header reveal">
              <span className="quiz-emoji">{currentCategory.emoji}</span>
              <h2>{currentCategory.title}</h2>
              <p>{currentCategory.subtitle}</p>
            </div>
            <div className="quiz-questions stagger-children">
              {currentCategory.questions.map((q) => (
                <div
                  key={q.id}
                  className={`quiz-question ${shakingQuestions[q.id] ? "shake" : ""}`}
                  id={`question-${q.id}`}
                >
                  <h3 className="quiz-question-text">{q.text}</h3>
                  {q.hint && <p className="quiz-hint">{q.hint}</p>}

                  {/* Render BMI calculator if body type is bmi */}
                  {q.id === "q8" && (
                    <div className="bmi-calculator card-glass" style={{ marginBottom: "var(--space-md)", textAlign: "left" }}>
                      <p className="bmi-label">Quick BMI Calculator</p>
                      <div className="bmi-inputs">
                        <div className="bmi-field">
                          <label>Weight (kg)</label>
                          <input
                            type="number"
                            placeholder="e.g. 60"
                            min="20"
                            max="200"
                            value={bmiWeight}
                            onChange={(e) => setBmiWeight(e.target.value)}
                          />
                        </div>
                        <div className="bmi-field">
                          <label>Height (cm)</label>
                          <input
                            type="number"
                            placeholder="e.g. 160"
                            min="100"
                            max="250"
                            value={bmiHeight}
                            onChange={(e) => setBmiHeight(e.target.value)}
                          />
                        </div>
                        <button className="btn btn-sm btn-primary" onClick={calculateBMI}>Calculate</button>
                      </div>
                      {bmiResult && <p className="bmi-result">{bmiResult}</p>}
                    </div>
                  )}

                  <div className="option-cards">
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        className={`option-card ${answers[q.id] === opt.value ? "selected" : ""}`}
                        onClick={() => selectOption(q.id, opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="quiz-nav reveal">
              {currentStep > 0 ? (
                <button className="btn btn-secondary" onClick={handlePrev}>← Previous</button>
              ) : (
                <div></div>
              )}
              {currentStep < quizData.length - 1 ? (
                <button className="btn btn-primary" id="next-btn" onClick={handleNext}>Next →</button>
              ) : (
                <button className="btn btn-accent btn-lg" id="results-btn" onClick={handleShowResults}>See My Results ✨</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
