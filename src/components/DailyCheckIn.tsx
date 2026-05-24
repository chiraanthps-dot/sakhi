"use client";

import React, { useState, useEffect } from "react";
import { Smile, Frown, Meh, Zap, Moon, Droplet, Dumbbell, Calendar, Flame, Check } from "lucide-react";
import "./DailyCheckIn.css";

interface DailyCheckInData {
  date: string;
  mood: string;
  water: number;
  sleep: number;
  exercise: boolean;
  symptoms: string[];
}

export default function DailyCheckIn() {
  const [todayData, setTodayData] = useState<DailyCheckInData | null>(null);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState<{ date: string; checked: boolean }[]>([]);
  
  // Form states
  const [mood, setMood] = useState("good");
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(3);
  const [exercise, setExercise] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  
  const symptomOptions = ["Cramps", "Bloating", "Fatigue", "Acne", "Mood Swings", "Headache"];
  const getTodayString = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadCheckInData();
  }, []);

  const loadCheckInData = () => {
    const todayStr = getTodayString();
    
    // 1. Get today's check-in
    const savedToday = localStorage.getItem(`sakhi-checkin-${todayStr}`);
    if (savedToday) {
      setTodayData(JSON.parse(savedToday));
    } else {
      setTodayData(null);
    }

    // 2. Fetch all checkins to calculate streak and history
    const allKeys = Object.keys(localStorage).filter(k => k.startsWith("sakhi-checkin-"));
    allKeys.sort().reverse(); // newest first

    // Calculate streak
    let currentStreak = 0;
    let checkDate = new Date();
    
    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (localStorage.getItem(`sakhi-checkin-${dateStr}`)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // If today hasn't been checked in yet, let streak continue if yesterday was checked in
        if (dateStr === todayStr) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
    }
    setStreak(currentStreak);

    // 3. Generate last 7 days history
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split("T")[0];
      last7Days.push({
        date: d.toLocaleDateString("en-US", { weekday: "short" }),
        checked: localStorage.getItem(`sakhi-checkin-${dStr}`) !== null
      });
    }
    setHistory(last7Days);
  };

  const handleSymptomToggle = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todayStr = getTodayString();
    const newData: DailyCheckInData = {
      date: todayStr,
      mood,
      water,
      sleep,
      exercise,
      symptoms
    };

    localStorage.setItem(`sakhi-checkin-${todayStr}`, JSON.stringify(newData));
    setTodayData(newData);
    loadCheckInData();
  };

  const getMoodIcon = (m: string) => {
    switch (m) {
      case "great": return <Smile size={28} className="mood-icon active-great" />;
      case "good": return <Smile size={28} className="mood-icon active-good" />;
      case "meh": return <Meh size={28} className="mood-icon active-meh" />;
      case "tired": return <Moon size={28} className="mood-icon active-tired" />;
      case "crampy": return <Frown size={28} className="mood-icon active-crampy" />;
      default: return <Smile size={28} />;
    }
  };

  return (
    <div className="checkin-container">
      {/* Header with stats */}
      <div className="checkin-header">
        <div className="checkin-title-block">
          <h2>Daily Wellness Check-In</h2>
          <p>Track your daily mood, habits, and symptoms to spot trends.</p>
        </div>
        <div className="checkin-streak-badge">
          <Flame size={20} className="flame-icon" />
          <span>{streak} Day Streak</span>
        </div>
      </div>

      {todayData ? (
        /* Completed Today View */
        <div className="checkin-completed">
          <div className="completed-banner">
            <Check size={28} className="completed-tick" />
            <div>
              <h3>You're Checked In!</h3>
              <p>Awesome job tracking your wellness today. Check back tomorrow!</p>
            </div>
          </div>

          <div className="completed-grid">
            <div className="completed-card">
              <span className="card-label">Mood Today</span>
              <div className="card-val">
                {getMoodIcon(todayData.mood)}
                <span className="mood-text-capital">{todayData.mood}</span>
              </div>
            </div>

            <div className="completed-card">
              <span className="card-label">Hydration</span>
              <div className="card-val text-water">
                <Droplet size={20} />
                <span>{todayData.water} glasses</span>
              </div>
            </div>

            <div className="completed-card">
              <span className="card-label">Sleep</span>
              <div className="card-val text-sleep">
                <Moon size={20} />
                <span>{todayData.sleep} / 5 Quality</span>
              </div>
            </div>

            <div className="completed-card">
              <span className="card-label">Activity</span>
              <div className="card-val text-exercise">
                <Dumbbell size={20} />
                <span>{todayData.exercise ? "Completed" : "Rest Day"}</span>
              </div>
            </div>
          </div>

          {todayData.symptoms.length > 0 && (
            <div className="completed-symptoms">
              <span className="card-label">Logged Symptoms</span>
              <div className="symptoms-tags">
                {todayData.symptoms.map(s => (
                  <span key={s} className="symptom-tag-active">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Active Form View */
        <form onSubmit={handleSubmit} className="checkin-form">
          {/* Mood */}
          <div className="form-group">
            <label className="group-label">How is your mood & energy?</label>
            <div className="mood-selector">
              {[
                { val: "great", label: "Great", icon: <Smile size={24} /> },
                { val: "good", label: "Good", icon: <Smile size={24} /> },
                { val: "meh", label: "Meh", icon: <Meh size={24} /> },
                { val: "tired", label: "Tired", icon: <Moon size={24} /> },
                { val: "crampy", label: "Crampy", icon: <Frown size={24} /> }
              ].map(item => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setMood(item.val)}
                  className={`mood-btn mood-${item.val} ${mood === item.val ? "selected" : ""}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="checkin-row">
            {/* Water */}
            <div className="form-group flex-1">
              <label className="group-label">Water Intake</label>
              <div className="water-counter">
                <button
                  type="button"
                  onClick={() => setWater(Math.max(0, water - 1))}
                  className="counter-btn"
                >-</button>
                <div className="water-display">
                  <Droplet size={18} className="water-droplet-anim" />
                  <span>{water} Glasses</span>
                </div>
                <button
                  type="button"
                  onClick={() => setWater(water + 1)}
                  className="counter-btn"
                >+</button>
              </div>
            </div>

            {/* Sleep */}
            <div className="form-group flex-1">
              <label className="group-label">Sleep Quality (1-5)</label>
              <div className="sleep-selector">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSleep(star)}
                    className={`star-btn ${sleep >= star ? "star-active" : ""}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Exercise */}
          <div className="form-group">
            <label className="group-label exercise-toggle-label">
              <span>Did you do any physical exercise/stretching today?</span>
              <button
                type="button"
                onClick={() => setExercise(!exercise)}
                className={`toggle-switch ${exercise ? "active" : ""}`}
              >
                <Dumbbell size={16} />
                <span>{exercise ? "Yes, I did!" : "No, rest day"}</span>
              </button>
            </label>
          </div>

          {/* Symptoms */}
          <div className="form-group">
            <label className="group-label">Any cycle or PCOS symptoms today?</label>
            <div className="symptoms-grid-select">
              {symptomOptions.map(option => {
                const isSelected = symptoms.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSymptomToggle(option)}
                    className={`symptom-select-btn ${isSelected ? "selected" : ""}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="submit" className="btn btn-primary submit-checkin-btn">
            Submit Daily Check-In
          </button>
        </form>
      )}

      {/* History timeline */}
      <div className="checkin-history">
        <h4>Last 7 Days Wellness Log</h4>
        <div className="history-dots">
          {history.map((day, idx) => (
            <div key={idx} className="history-dot-wrapper">
              <div className={`history-dot ${day.checked ? "checked" : "missed"}`}>
                {day.checked && <Check size={10} strokeWidth={3} />}
              </div>
              <span className="history-day">{day.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
