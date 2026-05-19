"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import { LogOut, Trash2, Calendar, Award, User, RefreshCw } from "lucide-react";
import PageTransition from "@/components/PageTransition";

interface QuizResult {
  id: string;
  overall_score: number;
  risk_level: string;
  category_scores: Record<string, number>;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  
  const [attempts, setAttempts] = useState<QuizResult[]>([]);
  const [fetching, setFetching] = useState(true);

  const fetchResults = async () => {
    if (!user) return;
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAttempts(data || []);
    } catch (err: any) {
      console.error("Error fetching results:", err);
      // Suppress errors during development if table doesn't exist yet
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    } else if (user) {
      fetchResults();
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast("Logged Out", "Successfully signed out of your account.", "info");
      router.push("/");
    } catch (err: any) {
      toast("Error", "Failed to sign out.", "error");
    }
  };

  const handleDeleteData = async () => {
    if (!user) return;
    if (!confirm("Are you sure you want to delete all your quiz history? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("quiz_results")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      setAttempts([]);
      toast("History Deleted", "All your assessment records have been deleted.", "success");
    } catch (err: any) {
      toast("Error", err.message || "Failed to delete history.", "error");
    }
  };

  if (loading || (!user && fetching)) {
    return (
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "var(--clr-text-muted)" }}>
          <RefreshCw className="animate-spin" size={32} style={{ marginBottom: "var(--space-md)", margin: "0 auto 10px" }} />
          <p>Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  // Chart configuration (Pure SVG Responsive Graph)
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const chronologicalAttempts = [...attempts].reverse();
  const maxIdx = Math.max(1, chronologicalAttempts.length - 1);

  const points = chronologicalAttempts.map((item, idx) => {
    const x = paddingX + (idx * (width - 2 * paddingX)) / maxIdx;
    const y = height - paddingY - (item.overall_score * (height - 2 * paddingY)) / 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <PageTransition>
      <main style={{
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "var(--space-3xl)",
        background: "linear-gradient(180deg, var(--clr-bg) 0%, var(--clr-bg-alt) 100%)"
      }}>
        <div className="container" style={{ maxWidth: "900px" }}>
        {/* Profile Card & Info Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "var(--space-lg)",
          marginBottom: "var(--space-2xl)"
        }}>
          {/* User Details */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "var(--grad-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--clr-text-light)",
                fontSize: "1.5rem",
                fontWeight: 700
              }}>
                {user.user_metadata.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontSize: "var(--fs-h2)", fontFamily: "var(--ff-heading)", fontWeight: 700, margin: 0 }}>
                  {user.user_metadata.full_name || "Sakhi User"}
                </h2>
                <p style={{ color: "var(--clr-text-muted)", fontSize: "var(--fs-small)", margin: 0 }}>
                  {user.email}
                </p>
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid var(--clr-border)", margin: "var(--space-sm) 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "var(--fs-small)" }}>
                <User size={16} style={{ color: "var(--clr-primary)" }} />
                <span><strong>Age:</strong> {user.user_metadata.age || "N/A"} years old</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "var(--fs-small)" }}>
                <Award size={16} style={{ color: "var(--clr-primary)" }} />
                <span><strong>Assessments Taken:</strong> {attempts.length}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "var(--space-sm)", marginTop: "var(--space-md)" }}>
              <button onClick={handleSignOut} className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", flex: 1 }}>
                <LogOut size={16} /> Sign Out
              </button>
              <button onClick={handleDeleteData} className="btn" style={{
                background: "transparent",
                border: "1px solid var(--clr-risk-high)",
                color: "var(--clr-risk-high)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontWeight: 600
              }}>
                <Trash2 size={16} /> Delete Data
              </button>
            </div>
          </div>

          {/* Quick CTA Card */}
          <div style={{
            background: "var(--grad-card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--clr-border)",
            padding: "var(--space-xl)",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center"
          }}>
            <span style={{ fontSize: "3rem", marginBottom: "var(--space-sm)" }}>🌸</span>
            <h3 style={{ fontFamily: "var(--ff-heading)", fontSize: "var(--fs-h3)", fontWeight: 700, marginBottom: "var(--space-xs)" }}>
              Check Your Wellness
            </h3>
            <p style={{ color: "var(--clr-text-muted)", fontSize: "var(--fs-small)", marginBottom: "var(--space-lg)" }}>
              Track regular changes by taking our assessment monthly or whenever symptoms shift.
            </p>
            <Link href="/questionnaire" className="btn btn-primary" style={{ alignSelf: "center" }}>
              Start Assessment →
            </Link>
          </div>
        </div>

        {/* History Graph (Show only if attempts exist) */}
        {attempts.length > 0 && (
          <div style={{
            background: "var(--clr-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--clr-border)",
            padding: "var(--space-xl)",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "var(--space-2xl)"
          }}>
            <h3 style={{ fontFamily: "var(--ff-heading)", fontSize: "var(--fs-h3)", fontWeight: 700, marginBottom: "var(--space-lg)" }}>
              Risk Score Progression
            </h3>

            {/* Pure SVG Graph */}
            <div style={{ width: "100%", overflowX: "auto" }}>
              <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ minWidth: "500px", overflow: "visible" }}>
                {/* Horizontal grid lines & labels */}
                {[0, 25, 50, 75, 100].map((val) => {
                  const y = height - paddingY - (val * (height - 2 * paddingY)) / 100;
                  return (
                    <g key={val}>
                      <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="var(--clr-border)" strokeWidth="1" strokeDasharray="4 4" />
                      <text x={paddingX - 10} y={y + 4} textAnchor="end" fontSize="10" fill="var(--clr-text-muted)" fontFamily="var(--ff-body)">
                        {val}%
                      </text>
                    </g>
                  );
                })}

                {/* Plot line */}
                {attempts.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="var(--clr-primary)"
                    strokeWidth="3"
                    points={points}
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                )}

                {/* Plot points */}
                {chronologicalAttempts.map((item, idx) => {
                  const x = paddingX + (idx * (width - 2 * paddingX)) / maxIdx;
                  const y = height - paddingY - (item.overall_score * (height - 2 * paddingY)) / 100;
                  const date = new Date(item.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" });
                  
                  return (
                    <g key={item.id} style={{ cursor: "pointer" }}>
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill="var(--clr-surface)"
                        stroke={item.risk_level === "High" ? "var(--clr-risk-high)" : item.risk_level === "Moderate" ? "var(--clr-risk-moderate)" : "var(--clr-risk-low)"}
                        strokeWidth="3"
                      />
                      <text x={x} y={height - 8} textAnchor="middle" fontSize="10" fill="var(--clr-text-muted)" fontFamily="var(--ff-body)">
                        {date}
                      </text>
                      {/* Tooltip on hover */}
                      <title>{`Score: ${item.overall_score}% (${item.risk_level} Risk)`}</title>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* Previous Assessment Table list */}
        <div style={{
          background: "var(--clr-surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--clr-border)",
          padding: "var(--space-xl)",
          boxShadow: "var(--shadow-sm)"
        }}>
          <h3 style={{ fontFamily: "var(--ff-heading)", fontSize: "var(--fs-h3)", fontWeight: 700, marginBottom: "var(--space-lg)" }}>
            Assessment Records
          </h3>

          {attempts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "var(--space-xl) 0", color: "var(--clr-text-muted)" }}>
              <p>You haven't completed any assessments yet.</p>
              <Link href="/questionnaire" className="btn btn-secondary" style={{ marginTop: "var(--space-sm)", display: "inline-block" }}>
                Take Your First Assessment
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
              {attempts.map((item) => {
                const date = new Date(item.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                });

                let riskBadgeBg = "hsla(145, 60%, 42%, 0.1)";
                let riskBadgeText = "var(--clr-risk-low)";
                if (item.risk_level === "High") {
                  riskBadgeBg = "hsla(0, 70%, 55%, 0.1)";
                  riskBadgeText = "var(--clr-risk-high)";
                } else if (item.risk_level === "Moderate") {
                  riskBadgeBg = "hsla(40, 90%, 50%, 0.1)";
                  riskBadgeText = "var(--clr-risk-moderate)";
                }

                return (
                  <div key={item.id} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--space-md)",
                    border: "1px solid var(--clr-border)",
                    borderRadius: "var(--radius-md)",
                    flexWrap: "wrap",
                    gap: "var(--space-md)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                      <div style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: riskBadgeBg,
                        color: riskBadgeText,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "var(--fs-small)",
                        fontWeight: 700
                      }}>
                        {item.overall_score}%
                      </div>
                      <div>
                        <div style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-full)",
                          background: riskBadgeBg,
                          color: riskBadgeText,
                          fontSize: "var(--fs-xs)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          marginBottom: "4px"
                        }}>
                          {item.risk_level} Risk
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "var(--fs-xs)", color: "var(--clr-text-muted)" }}>
                          <Calendar size={12} />
                          <span>{date}</span>
                        </div>
                      </div>
                    </div>
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
