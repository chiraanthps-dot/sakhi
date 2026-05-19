/* SAKHI — Questionnaire Logic (questionnaire.js) */
(function () {
  const quizData = [
    {
      id: 'symptoms',
      emoji: '🩺',
      title: 'Symptoms',
      subtitle: 'Let\'s start with what your body is telling you',
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

  // Category weights (insulin resistance is most important)
  const categoryWeights = {
    symptoms: 1.2,
    insulin: 1.5,
    body: 1.0,
    sleep: 0.9,
    food: 0.8,
    medical: 1.3
  };

  let currentStep = 0;
  let answers = {};

  document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    renderStep(currentStep);
    updateProgressBar();
  });

  function renderStep(stepIndex) {
    const quizContainer = document.getElementById('quiz-container');
    const category = quizData[stepIndex];

    let html = `
      <div class="quiz-step" id="step-${stepIndex}">
        <div class="quiz-step-header reveal">
          <span class="quiz-emoji">${category.emoji}</span>
          <h2>${category.title}</h2>
          <p>${category.subtitle}</p>
        </div>
        <div class="quiz-questions stagger-children">
    `;

    category.questions.forEach((q) => {
      const selectedValue = answers[q.id];
      html += `
        <div class="quiz-question" id="question-${q.id}">
          <h3 class="quiz-question-text">${q.text}</h3>
          ${q.hint ? `<p class="quiz-hint">${q.hint}</p>` : ''}
          ${q.type === 'bmi' ? renderBMICalculator() : ''}
          <div class="option-cards">
            ${q.options.map((opt) => `
              <button class="option-card ${selectedValue === opt.value ? 'selected' : ''}"
                data-question="${q.id}" data-value="${opt.value}"
                onclick="window.sakhiQuiz.selectOption('${q.id}', ${opt.value}, this)">
                ${opt.label}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    });

    html += `</div><div class="quiz-nav reveal">`;

    if (stepIndex > 0) {
      html += `<button class="btn btn-secondary" onclick="window.sakhiQuiz.prevStep()">← Previous</button>`;
    } else {
      html += `<div></div>`;
    }

    if (stepIndex < quizData.length - 1) {
      html += `<button class="btn btn-primary" id="next-btn" onclick="window.sakhiQuiz.nextStep()">Next →</button>`;
    } else {
      html += `<button class="btn btn-accent btn-lg" id="results-btn" onclick="window.sakhiQuiz.showResults()">See My Results ✨</button>`;
    }

    html += `</div></div>`;

    quizContainer.innerHTML = html;

    // Re-trigger scroll animations
    setTimeout(() => {
      quizContainer.querySelectorAll('.reveal, .stagger-children').forEach(el => el.classList.add('revealed'));
    }, 50);
  }

  function renderBMICalculator() {
    return `
      <div class="bmi-calculator card-glass">
        <p class="bmi-label">Quick BMI Calculator</p>
        <div class="bmi-inputs">
          <div class="bmi-field">
            <label>Weight (kg)</label>
            <input type="number" id="bmi-weight" placeholder="e.g. 60" min="20" max="200">
          </div>
          <div class="bmi-field">
            <label>Height (cm)</label>
            <input type="number" id="bmi-height" placeholder="e.g. 160" min="100" max="250">
          </div>
          <button class="btn btn-sm btn-primary" onclick="window.sakhiQuiz.calcBMI()">Calculate</button>
        </div>
        <p class="bmi-result" id="bmi-result"></p>
      </div>
    `;
  }

  function selectOption(questionId, value, btn) {
    answers[questionId] = value;
    const parent = btn.closest('.option-cards');
    parent.querySelectorAll('.option-card').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  function nextStep() {
    const category = quizData[currentStep];
    const unanswered = category.questions.filter(q => answers[q.id] === undefined);
    if (unanswered.length > 0) {
      const firstUnanswered = document.getElementById('question-' + unanswered[0].id);
      firstUnanswered.classList.add('shake');
      setTimeout(() => firstUnanswered.classList.remove('shake'), 600);
      return;
    }
    currentStep++;
    renderStep(currentStep);
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      renderStep(currentStep);
      updateProgressBar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function updateProgressBar() {
    const bar = document.querySelector('.quiz-progress-fill');
    if (bar) {
      const pct = ((currentStep + 1) / quizData.length) * 100;
      bar.style.width = pct + '%';
    }
    const stepLabel = document.querySelector('.quiz-progress-label');
    if (stepLabel) {
      stepLabel.textContent = `Step ${currentStep + 1} of ${quizData.length}`;
    }
  }

  function calcBMI() {
    const w = parseFloat(document.getElementById('bmi-weight').value);
    const h = parseFloat(document.getElementById('bmi-height').value);
    const resultEl = document.getElementById('bmi-result');
    if (!w || !h) { resultEl.textContent = 'Please enter both values'; return; }
    const bmi = (w / ((h / 100) ** 2)).toFixed(1);
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    resultEl.innerHTML = `Your BMI: <strong>${bmi}</strong> (${category})`;
  }

  function showResults() {
    const category = quizData[currentStep];
    const unanswered = category.questions.filter(q => answers[q.id] === undefined);
    if (unanswered.length > 0) {
      const firstUnanswered = document.getElementById('question-' + unanswered[0].id);
      firstUnanswered.classList.add('shake');
      setTimeout(() => firstUnanswered.classList.remove('shake'), 600);
      return;
    }

    // Calculate scores per category
    const categoryScores = {};
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
        weighted: catScore * weight,
        title: cat.title,
        emoji: cat.emoji
      };
      totalWeightedScore += catScore * weight;
      maxPossibleScore += catMax * weight;
    });

    const overallPct = Math.round((totalWeightedScore / maxPossibleScore) * 100);
    let riskLevel, riskColor, riskAdvice;

    if (overallPct <= 30) {
      riskLevel = 'Low';
      riskColor = 'var(--clr-risk-low)';
      riskAdvice = 'Your responses suggest a low risk. Keep maintaining your healthy habits! Regular check-ups are still recommended.';
    } else if (overallPct <= 60) {
      riskLevel = 'Moderate';
      riskColor = 'var(--clr-risk-moderate)';
      riskAdvice = 'Some of your responses indicate moderate risk factors. Consider consulting a healthcare professional and reviewing our lifestyle tips.';
    } else {
      riskLevel = 'High';
      riskColor = 'var(--clr-risk-high)';
      riskAdvice = 'Your responses suggest several risk indicators. We strongly recommend consulting a gynecologist or endocrinologist for proper evaluation.';
    }

    const quizContainer = document.getElementById('quiz-container');
    let html = `
      <div class="results-container reveal">
        <div class="results-header">
          <h2>Your Results</h2>
          <div class="results-score-circle" style="--score-color: ${riskColor}">
            <span class="results-pct">${overallPct}%</span>
            <span class="results-risk" style="color:${riskColor}">${riskLevel} Risk</span>
          </div>
          <p class="results-advice">${riskAdvice}</p>
        </div>
        <div class="results-breakdown stagger-children">
          <h3>Category Breakdown</h3>
          <div class="results-categories">
    `;

    Object.values(categoryScores).forEach((cat) => {
      let barColor = 'var(--clr-risk-low)';
      if (cat.pct > 60) barColor = 'var(--clr-risk-high)';
      else if (cat.pct > 30) barColor = 'var(--clr-risk-moderate)';

      html += `
        <div class="result-category-row">
          <span class="result-cat-label">${cat.emoji} ${cat.title}</span>
          <div class="result-bar-track">
            <div class="result-bar-fill" style="width:${cat.pct}%;background:${barColor}"></div>
          </div>
          <span class="result-cat-pct">${cat.pct}%</span>
        </div>
      `;
    });

    html += `
          </div>
        </div>
        <div class="results-actions reveal">
          <a href="understand.html" class="btn btn-primary btn-lg">Learn About PCOS →</a>
          <button class="btn btn-secondary btn-lg" onclick="window.sakhiQuiz.shareResults()">📤 Share with Doctor</button>
          <button class="btn btn-secondary" onclick="window.sakhiQuiz.restart()">↻ Retake Quiz</button>
        </div>
        <div class="results-disclaimer reveal">
          <p>⚠️ <strong>Disclaimer:</strong> This assessment is for awareness purposes only and does not constitute a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation and treatment.</p>
        </div>
      </div>
    `;

    quizContainer.innerHTML = html;
    // Hide progress bar
    const progressEl = document.querySelector('.quiz-progress');
    if (progressEl) progressEl.style.display = 'none';

    setTimeout(() => {
      quizContainer.querySelectorAll('.reveal, .stagger-children').forEach(el => el.classList.add('revealed'));
    }, 50);
  }

  function shareResults() {
    const categoryScores = {};
    quizData.forEach((cat) => {
      let catScore = 0, catMax = 0;
      cat.questions.forEach((q) => {
        catScore += (answers[q.id] || 0);
        catMax += Math.max(...q.options.map(o => o.value));
      });
      categoryScores[cat.id] = { title: cat.title, pct: Math.round((catScore / catMax) * 100) };
    });

    let totalW = 0, maxW = 0;
    quizData.forEach((cat) => {
      let s = 0, m = 0;
      cat.questions.forEach((q) => { s += (answers[q.id]||0); m += Math.max(...q.options.map(o=>o.value)); });
      totalW += s * (categoryWeights[cat.id]||1);
      maxW += m * (categoryWeights[cat.id]||1);
    });
    const overallPct = Math.round((totalW / maxW) * 100);

    let text = `🌸 Sakhi — PCOS Risk Assessment Results\n\nOverall Score: ${overallPct}%\n\n`;
    Object.values(categoryScores).forEach(c => { text += `${c.title}: ${c.pct}%\n`; });
    text += `\n⚠️ This is not a diagnosis. Please consult a doctor.\n🔗 Take the quiz: ${window.location.href}`;

    if (navigator.share) {
      navigator.share({ title: 'Sakhi — My PCOS Risk Assessment', text: text })
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('.results-actions .btn-secondary');
      if (btn) { btn.textContent = '✅ Copied to Clipboard!'; setTimeout(() => { btn.textContent = '📤 Share with Doctor'; }, 2500); }
    }).catch(() => {
      prompt('Copy this text to share with your doctor:', text);
    });
  }

  function restart() {
    currentStep = 0;
    answers = {};
    const progressEl = document.querySelector('.quiz-progress');
    if (progressEl) progressEl.style.display = '';
    renderStep(0);
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Expose to global scope
  window.sakhiQuiz = { selectOption, nextStep, prevStep, calcBMI, showResults, shareResults, restart };
})();
