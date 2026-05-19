"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/Toast";
import PageTransition from "@/components/PageTransition";
import { Calendar as CalendarIcon, Heart, ShieldAlert, Sparkles, Plus, Trash2, CheckCircle2 } from "lucide-react";

interface CycleLog {
  id: string;
  start_date: string;
  cycle_length: number;
  period_days: number;
  symptoms: {
    flow?: string;
    mood?: string[];
    symptoms?: string[];
  };
  created_at: string;
}

export default function TrackerPage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const [startDate, setStartDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodDays, setPeriodDays] = useState("5");

  // Daily log state
  const [flow, setFlow] = useState("Medium");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const [logs, setLogs] = useState<CycleLog[]>([]);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchLogs = async () => {
    if (!user) return;
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from("cycle_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("start_date", { ascending: false });

      if (error) throw error;
      setLogs(data || []);
      if (data && data.length > 0) {
        // Pre-fill fields with latest settings
        setStartDate(data[0].start_date);
        setCycleLength(String(data[0].cycle_length));
        setPeriodDays(String(data[0].period_days));
      }
    } catch (err: any) {
      console.error("Error fetching cycle logs:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLogs();
    } else {
      setFetching(false);
    }
  }, [user]);

  const handleSaveLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) {
      toast("Select Start Date", "Please choose the starting date of your last period.", "error");
      return;
    }

    setSaving(true);
    const payload = {
      start_date: startDate,
      cycle_length: parseInt(cycleLength, 10),
      period_days: parseInt(periodDays, 10),
      symptoms: {
        flow,
        mood: selectedMoods,
        symptoms: selectedSymptoms,
      },
    };

    try {
      if (user) {
        const { error } = await supabase
          .from("cycle_logs")
          .insert({
            user_id: user.id,
            ...payload,
          });

        if (error) throw error;
        toast("Log Saved", "Successfully saved details to your timeline.", "success");
        fetchLogs();
      } else {
        // Guest mode fallback
        const mockLog: CycleLog = {
          id: Math.random().toString(),
          ...payload,
          created_at: new Date().toISOString(),
        };
        setLogs([mockLog]);
        toast("Saved Locally", "Saved successfully. Sign in to sync across devices.", "info");
      }
    } catch (err: any) {
      toast("Error", err.message || "Failed to save cycle log.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLog = async (id: string) => {
    if (!confirm("Remove this entry from your timeline?")) return;
    try {
      if (user) {
        const { error } = await supabase
          .from("cycle_logs")
          .delete()
          .eq("id", id);

        if (error) throw error;
        toast("Entry Removed", "Log entry deleted successfully.", "success");
        fetchLogs();
      } else {
        setLogs(logs.filter((l) => l.id !== id));
        toast("Entry Removed", "Log entry deleted locally.", "info");
      }
    } catch (err: any) {
      toast("Error", "Failed to remove entry.", "error");
    }
  };

  // Calculations for predictions
  const getPredictions = () => {
    if (!startDate) return null;
    const start = new Date(startDate);
    const length = parseInt(cycleLength, 10) || 28;
    const period = parseInt(periodDays, 10) || 5;

    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + length);

    const ovulation = new Date(start);
    ovulation.setDate(start.getDate() + length - 14);

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(ovulation.getDate() - 5);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(ovulation.getDate() + 1);

    return {
      nextPeriod: nextPeriod.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      ovulation: ovulation.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      fertileWindow: `${fertileStart.toLocaleDateString(undefined, { month: "short", day: "numeric" })} - ${fertileEnd.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`,
    };
  };

  const predictions = getPredictions();

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <PageTransition>
      <main style={{
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "var(--space-3xl)",
        background: "linear-gradient(180deg, var(--clr-bg) 0%, var(--clr-bg-alt) 100%)"
      }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
            <span style={{ fontSize: "3rem", display: "block" }}>🗓️</span>
            <h1 style={{
              fontFamily: "var(--ff-heading)",
              fontSize: "var(--fs-hero)",
              fontWeight: 800,
              background: "var(--grad-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginTop: "var(--space-xs)"
            }}>
              Cycle Tracker
            </h1>
            <p style={{ color: "var(--clr-text-muted)", fontSize: "var(--fs-body)" }}>
              Understand your cycle rhythm, predict fertility, and track PCOS symptoms.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-xl)",
            marginBottom: "var(--space-2xl)"
          }}>
            {/* Input Settings Card */}
            <div style={{
              background: "var(--clr-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--clr-border)",
              padding: "var(--space-xl)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-md)"
            }}>
              <h2 style={{ fontSize: "var(--fs-h3)", fontFamily: "var(--ff-heading)", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <CalendarIcon size={20} style={{ color: "var(--clr-primary)" }} /> Setup Parameters
              </h2>
              <form onSubmit={handleSaveLog} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                <div>
                  <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "4px" }}>Start of Last Period</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "var(--space-sm)",
                      border: "2px solid var(--clr-border)",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--clr-bg-alt)",
                      color: "var(--clr-text)",
                      outline: "none"
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "4px" }}>Cycle Length (Days)</label>
                    <input
                      type="number"
                      required
                      min="15"
                      max="90"
                      value={cycleLength}
                      onChange={(e) => setCycleLength(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "var(--space-sm)",
                        border: "2px solid var(--clr-border)",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--clr-bg-alt)",
                        color: "var(--clr-text)",
                        outline: "none"
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "4px" }}>Period Duration (Days)</label>
                    <input
                      type="number"
                      required
                      min="2"
                      max="15"
                      value={periodDays}
                      onChange={(e) => setPeriodDays(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "var(--space-sm)",
                        border: "2px solid var(--clr-border)",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--clr-bg-alt)",
                        color: "var(--clr-text)",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                {/* Symptom selection */}
                <hr style={{ border: "none", borderTop: "1px solid var(--clr-border)", margin: "var(--space-sm) 0" }} />
                
                <div>
                  <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "6px" }}>Period Flow</label>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {["Light", "Medium", "Heavy"].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFlow(f)}
                        style={{
                          flex: 1,
                          padding: "6px 0",
                          borderRadius: "var(--radius-sm)",
                          border: flow === f ? "2px solid var(--clr-primary)" : "2px solid var(--clr-border)",
                          background: flow === f ? "hsla(330, 65%, 55%, 0.05)" : "transparent",
                          color: flow === f ? "var(--clr-primary)" : "var(--clr-text-muted)",
                          fontWeight: 600,
                          cursor: "pointer",
                          fontSize: "var(--fs-xs)"
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "6px" }}>Mood Tracker</label>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["Happy", "Sad", "Irritable", "Anxious", "Fatigued"].map((m) => {
                      const selected = selectedMoods.includes(m);
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => toggleMood(m)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "var(--radius-full)",
                            border: selected ? "1px solid var(--clr-primary)" : "1px solid var(--clr-border)",
                            background: selected ? "var(--clr-primary)" : "transparent",
                            color: selected ? "var(--clr-text-light)" : "var(--clr-text)",
                            fontSize: "11px",
                            cursor: "pointer"
                          }}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "6px" }}>PCOS/Period Symptoms</label>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["Cramps", "Bloating", "Acne", "Backache", "Headache"].map((s) => {
                      const selected = selectedSymptoms.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSymptom(s)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "var(--radius-full)",
                            border: selected ? "1px solid var(--clr-primary)" : "1px solid var(--clr-border)",
                            background: selected ? "var(--clr-primary)" : "transparent",
                            color: selected ? "var(--clr-text-light)" : "var(--clr-text)",
                            fontSize: "11px",
                            cursor: "pointer"
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                  style={{
                    padding: "var(--space-sm)",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: 600,
                    cursor: saving ? "not-allowed" : "pointer",
                    opacity: saving ? 0.7 : 1,
                    marginTop: "var(--space-sm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  <Plus size={16} /> {saving ? "Saving..." : "Log Cycle Start"}
                </button>
              </form>
            </div>

            {/* Predictions & Insights Card */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
              {predictions ? (
                <div style={{
                  background: "var(--clr-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--clr-border)",
                  padding: "var(--space-xl)",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-md)"
                }}>
                  <h2 style={{ fontSize: "var(--fs-h3)", fontFamily: "var(--ff-heading)", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    <Sparkles size={20} style={{ color: "var(--clr-accent)" }} /> predictions & window
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                    <div style={{
                      background: "hsla(345, 75%, 55%, 0.05)",
                      borderLeft: "4px solid var(--clr-risk-high)",
                      padding: "var(--space-md)",
                      borderRadius: "0 var(--radius-sm) var(--radius-sm) 0"
                    }}>
                      <p style={{ margin: 0, fontSize: "var(--fs-xs)", color: "var(--clr-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                        Estimated Next Period
                      </p>
                      <h4 style={{ margin: "4px 0 0", fontSize: "1.1rem", fontFamily: "var(--ff-heading)", fontWeight: 700, color: "var(--clr-text)" }}>
                        {predictions.nextPeriod}
                      </h4>
                    </div>

                    <div style={{
                      background: "hsla(260, 65%, 55%, 0.05)",
                      borderLeft: "4px solid var(--clr-primary)",
                      padding: "var(--space-md)",
                      borderRadius: "0 var(--radius-sm) var(--radius-sm) 0"
                    }}>
                      <p style={{ margin: 0, fontSize: "var(--fs-xs)", color: "var(--clr-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                        Fertile Window
                      </p>
                      <h4 style={{ margin: "4px 0 0", fontSize: "1.1rem", fontFamily: "var(--ff-heading)", fontWeight: 700, color: "var(--clr-text)" }}>
                        {predictions.fertileWindow}
                      </h4>
                    </div>

                    <div style={{
                      background: "hsla(180, 65%, 45%, 0.05)",
                      borderLeft: "4px solid var(--clr-risk-low)",
                      padding: "var(--space-md)",
                      borderRadius: "0 var(--radius-sm) var(--radius-sm) 0"
                    }}>
                      <p style={{ margin: 0, fontSize: "var(--fs-xs)", color: "var(--clr-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                        Estimated Ovulation Day
                      </p>
                      <h4 style={{ margin: "4px 0 0", fontSize: "1.1rem", fontFamily: "var(--ff-heading)", fontWeight: 700, color: "var(--clr-text)" }}>
                        {predictions.ovulation}
                      </h4>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  background: "var(--clr-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--clr-border)",
                  padding: "var(--space-xl)",
                  boxShadow: "var(--shadow-sm)",
                  textAlign: "center",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Heart size={48} style={{ color: "var(--clr-text-muted)", marginBottom: "var(--space-md)" }} />
                  <h3 style={{ fontFamily: "var(--ff-heading)", fontSize: "var(--fs-h3)", fontWeight: 700, marginBottom: "4px" }}>
                    No Predictable Data
                  </h3>
                  <p style={{ color: "var(--clr-text-muted)", fontSize: "var(--fs-small)", maxWidth: "260px" }}>
                    Please configure parameters on the left to estimate your cycle calendars.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Timeline and past logs list */}
          <div style={{
            background: "var(--clr-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--clr-border)",
            padding: "var(--space-xl)",
            boxShadow: "var(--shadow-sm)"
          }}>
            <h3 style={{ fontFamily: "var(--ff-heading)", fontSize: "var(--fs-h3)", fontWeight: 700, marginBottom: "var(--space-lg)" }}>
              Cycle Timeline Records
            </h3>

            {logs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "var(--space-xl) 0", color: "var(--clr-text-muted)" }}>
                <p>No logged periods yet. Record your last start date to populate logs.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                {logs.map((log) => {
                  const dateStr = new Date(log.start_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  });

                  return (
                    <div key={log.id} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "var(--space-md)",
                      border: "1px solid var(--clr-border)",
                      borderRadius: "var(--radius-md)",
                      flexWrap: "wrap",
                      gap: "var(--space-md)"
                    }}>
                      <div>
                        <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem", fontFamily: "var(--ff-heading)", fontWeight: 700 }}>
                          Period Date: {dateStr}
                        </h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", fontSize: "11px" }}>
                          <span style={{
                            padding: "2px 6px",
                            borderRadius: "var(--radius-full)",
                            background: "hsla(330, 65%, 55%, 0.1)",
                            color: "var(--clr-primary)",
                            fontWeight: 600
                          }}>
                            Flow: {log.symptoms?.flow || "Normal"}
                          </span>

                          {log.symptoms?.mood && log.symptoms.mood.map((m) => (
                            <span key={m} style={{
                              padding: "2px 6px",
                              borderRadius: "var(--radius-full)",
                              background: "var(--clr-bg-alt)",
                              color: "var(--clr-text-muted)"
                            }}>
                              Mood: {m}
                            </span>
                          ))}

                          {log.symptoms?.symptoms && log.symptoms.symptoms.map((s) => (
                            <span key={s} style={{
                              padding: "2px 6px",
                              borderRadius: "var(--radius-full)",
                              background: "hsla(260, 65%, 55%, 0.1)",
                              color: "var(--clr-primary)"
                            }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--clr-risk-high)",
                          cursor: "pointer",
                          padding: "6px",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
