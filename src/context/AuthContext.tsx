"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: any | null;
  session: Session | null;
  loading: boolean;
  loginLocally: (name: string, age: number, email: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for local guest session first
    const savedLocalUser = localStorage.getItem("sakhi-local-user");
    if (savedLocalUser) {
      try {
        const parsedUser = JSON.parse(savedLocalUser);
        setUser(parsedUser);
        setLoading(false);
        return;
      } catch (e) {
        console.error("Failed to parse local user:", e);
      }
    }

    // Check initial active session in Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    });

    // Listen to changes in auth state (e.g. sign in, sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user);
      } else if (!localStorage.getItem("sakhi-local-user")) {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginLocally = (name: string, age: number, email: string) => {
    const localUser = {
      id: "local-" + Math.random().toString(36).substring(2, 9),
      email: email || "guest@sakhi.wellness",
      user_metadata: {
        full_name: name,
        age: age,
      },
      isLocal: true,
    };
    localStorage.setItem("sakhi-local-user", JSON.stringify(localUser));
    setUser(localUser);
  };

  const signOut = async () => {
    setLoading(true);
    localStorage.removeItem("sakhi-local-user");
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, loginLocally, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

