"use client";

import { useEffect } from "react";

export function useScrollReveal(triggerDeps: any[] = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children"
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, [triggerDeps]);
}
