"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import { Lock, Mail, User as UserIcon, Calendar, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";

export default function AuthPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (!fullName || !age) {
          toast("Details Missing", "Please enter your name and age to create a profile.", "error");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              age: parseInt(age, 10),
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          toast("Registration Success", "Check your email for the confirmation link!", "success");
          setIsSignUp(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast("Welcome Back", "Successfully logged in!", "success");
        router.push("/profile");
      }
    } catch (err: any) {
      toast("Authentication Error", err.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <main style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-2xl) var(--space-md)",
        background: "linear-gradient(180deg, var(--clr-bg) 0%, var(--clr-bg-alt) 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
      {/* Dynamic decoration blobs */}
      <div className="blob blob-primary" style={{ width: "300px", height: "300px", top: "-50px", left: "-50px" }}></div>
      <div className="blob blob-secondary" style={{ width: "250px", height: "250px", bottom: "-50px", right: "-50px" }}></div>

      <div style={{
        width: "100%",
        maxWidth: "450px",
        background: "var(--clr-surface)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--clr-border)",
        padding: "var(--space-xl)",
        zIndex: 2,
        position: "relative"
      }}>
        {/* Branding header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
          <span style={{ fontSize: "2.5rem", display: "block" }}>🌸</span>
          <h1 style={{
            fontFamily: "var(--ff-heading)",
            fontSize: "var(--fs-h1)",
            fontWeight: 800,
            background: "var(--grad-accent)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: "var(--space-xs)"
          }}>
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "var(--fs-small)", marginTop: "4px" }}>
            {isSignUp ? "Save your assessment history and track improvements." : "Sign in to access your dashboard and history."}
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{
          display: "flex",
          background: "var(--clr-bg-alt)",
          borderRadius: "var(--radius-sm)",
          padding: "4px",
          marginBottom: "var(--space-lg)"
        }}>
          <button
            onClick={() => setIsSignUp(false)}
            style={{
              flex: 1,
              padding: "var(--space-xs) 0",
              border: "none",
              borderRadius: "var(--radius-sm)",
              background: !isSignUp ? "var(--clr-surface)" : "transparent",
              color: !isSignUp ? "var(--clr-text)" : "var(--clr-text-muted)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--tr-fast)"
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            style={{
              flex: 1,
              padding: "var(--space-xs) 0",
              border: "none",
              borderRadius: "var(--radius-sm)",
              background: isSignUp ? "var(--clr-surface)" : "transparent",
              color: isSignUp ? "var(--clr-text)" : "var(--clr-text-muted)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--tr-fast)"
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          {isSignUp && (
            <>
              <div style={{ position: "relative" }}>
                <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "4px" }}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--clr-text-muted)", display: "flex" }}>
                    <UserIcon size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "var(--space-sm) var(--space-md) var(--space-sm) 38px",
                      border: "2px solid var(--clr-border)",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--clr-bg-alt)",
                      color: "var(--clr-text)",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div style={{ position: "relative" }}>
                <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "4px" }}>Age</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--clr-text-muted)", display: "flex" }}>
                    <Calendar size={16} />
                  </span>
                  <input
                    type="number"
                    required
                    min="10"
                    max="100"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "var(--space-sm) var(--space-md) var(--space-sm) 38px",
                      border: "2px solid var(--clr-border)",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--clr-bg-alt)",
                      color: "var(--clr-text)",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "4px" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--clr-text-muted)", display: "flex" }}>
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "var(--space-sm) var(--space-md) var(--space-sm) 38px",
                  border: "2px solid var(--clr-border)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--clr-bg-alt)",
                  color: "var(--clr-text)",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--clr-text-muted)", marginBottom: "4px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--clr-text-muted)", display: "flex" }}>
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "var(--space-sm) var(--space-md) var(--space-sm) 38px",
                  border: "2px solid var(--clr-border)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--clr-bg-alt)",
                  color: "var(--clr-text)",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              padding: "var(--space-sm)",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "var(--space-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-xs)"
            }}
          >
            {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Footnote */}
        <div style={{ textAlign: "center", marginTop: "var(--space-lg)", fontSize: "var(--fs-xs)", color: "var(--clr-text-muted)" }}>
          {isSignUp ? (
            <p>
              By signing up, you agree to our privacy policy regarding health records.
            </p>
          ) : (
            <p>
              Don't have an account? <span onClick={() => setIsSignUp(true)} style={{ color: "var(--clr-primary)", cursor: "pointer", fontWeight: 600 }}>Create one</span> to save your quiz history.
            </p>
          )}
        </div>
      </div>
    </main>
  </PageTransition>
  );
}
