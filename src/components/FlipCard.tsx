"use client";

import { useState } from "react";

interface FlipCardProps {
  myth: string;
  fact: string;
  mythIcon?: string;
  factIcon?: string;
}

export default function FlipCard({ myth, fact, mythIcon = "❌", factIcon = "✅" }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flip-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="flip-card-inner">
        <div className="flip-front">
          <span className="myth-icon">{mythIcon}</span>
          <p>{myth}</p>
          <span className="flip-hint">Tap to see the truth →</span>
        </div>
        <div className="flip-back">
          <span className="fact-icon">{factIcon}</span>
          <p>{fact}</p>
        </div>
      </div>
    </div>
  );
}
