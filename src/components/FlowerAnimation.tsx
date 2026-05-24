"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function FlowerAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // End animation and callback after 2.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate 12 floating background petals for depth
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    angle: (i * 360) / 12 + Math.random() * 20,
    delay: Math.random() * 0.4,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1.5 + 1.2,
  }));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2.5, times: [0, 0.8, 1], ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--clr-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "all",
      }}
    >
      {/* Dynamic Background Rays */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, hsla(330, 65%, 55%, 0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Petal Particles */}
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const xDist = Math.cos(rad) * 400;
        const yDist = Math.sin(rad) * 400;

        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0.5],
              x: xDist,
              y: yDist,
              rotate: p.angle + 360,
            }}
            transition={{
              duration: p.speed,
              delay: p.delay,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              width: `${p.size}px`,
              height: `${p.size * 0.8}px`,
              background: "linear-gradient(135deg, hsl(330, 65%, 70%) 0%, hsl(270, 50%, 65%) 100%)",
              borderRadius: "80% 0% 55% 50% / 55% 0% 80% 50%",
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Central Sakura/Lotus Flower Zooming In */}
      <motion.div
        initial={{ scale: 0.1, rotate: 0, opacity: 0 }}
        animate={{
          scale: [0.1, 1, 28],
          rotate: [0, 180, 720],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.4, 0.85, 1],
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{
          width: "280px",
          height: "280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: "center",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0px 8px 30px hsla(330, 65%, 55%, 0.35))",
          }}
        >
          <defs>
            <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(40, 95%, 70%)" />
              <stop offset="60%" stopColor="hsl(330, 80%, 65%)" />
              <stop offset="100%" stopColor="hsl(270, 60%, 50%)" />
            </radialGradient>
            <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(330, 85%, 72%)" />
              <stop offset="60%" stopColor="hsl(330, 75%, 60%)" />
              <stop offset="100%" stopColor="hsl(270, 65%, 52%)" />
            </linearGradient>
          </defs>

          {/* Layered Petals (8 Rotated Segments) */}
          {Array.from({ length: 8 }).map((_, idx) => {
            const rot = idx * 45;
            return (
              <path
                key={idx}
                d="M 50 50 C 35 15, 65 15, 50 50 Z"
                fill="url(#petalGrad)"
                transform={`rotate(${rot} 50 50)`}
                opacity={0.9}
              />
            );
          })}

          {/* Inner Petal Ring for extra density */}
          {Array.from({ length: 8 }).map((_, idx) => {
            const rot = idx * 45 + 22.5;
            return (
              <path
                key={`inner-${idx}`}
                d="M 50 50 C 40 25, 60 25, 50 50 Z"
                fill="url(#petalGrad)"
                transform={`rotate(${rot} 50 50) scale(0.75)`}
                style={{ transformOrigin: "50px 50px" }}
                opacity={0.95}
              />
            );
          })}

          {/* Center Pistil / Pistils */}
          <circle cx="50" cy="50" r="11" fill="url(#centerGrad)" />
          {Array.from({ length: 12 }).map((_, idx) => {
            const rot = idx * 30;
            return (
              <line
                key={`pistil-${idx}`}
                x1="50"
                y1="50"
                x2="50"
                y2="42"
                stroke="hsl(40, 95%, 75%)"
                strokeWidth="1.2"
                transform={`rotate(${rot} 50 50)`}
              />
            );
          })}
          <circle cx="50" cy="50" r="6" fill="hsl(45, 95%, 68%)" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
