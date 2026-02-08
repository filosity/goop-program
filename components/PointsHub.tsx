"use client";

import { useEffect, useState } from "react";

const CURRENT_POINTS = 340;
const NEXT_REWARD_THRESHOLD = 500;
const TIER = "Gold Member";

const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function PointsHub() {
  const [animatedOffset, setAnimatedOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    const progress = CURRENT_POINTS / NEXT_REWARD_THRESHOLD;
    const offset = CIRCUMFERENCE * (1 - progress);
    // Trigger after mount so the transition animates
    const id = requestAnimationFrame(() => setAnimatedOffset(offset));
    return () => cancelAnimationFrame(id);
  }, []);

  const remaining = NEXT_REWARD_THRESHOLD - CURRENT_POINTS;

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-cream-100 px-4 py-3 shadow-sm">
      {/* Points balance */}
      <div className="flex flex-col items-start">
        <span className="text-3xl font-bold leading-none text-burgundy-800">
          {CURRENT_POINTS}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-burgundy-500">
          pts
        </span>
      </div>

      {/* Tier badge */}
      <div className="flex-1">
        <span className="inline-block rounded-full bg-gold-100 px-3 py-0.5 text-xs font-semibold text-gold-700">
          {TIER}
        </span>
      </div>

      {/* Progress ring */}
      <div className="relative flex-shrink-0">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
          {/* Track */}
          <circle
            cx="32"
            cy="32"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-cream-300"
          />
          {/* Fill */}
          <circle
            cx="32"
            cy="32"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={animatedOffset}
            className="text-gold-500 transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-burgundy-700">
          {CURRENT_POINTS}/{NEXT_REWARD_THRESHOLD}
        </span>
      </div>

      {/* Remaining text sits beside the ring on larger widths, or wraps */}
      <span className="hidden text-[10px] leading-tight text-burgundy-400 sm:block">
        {remaining} pts to<br />next reward
      </span>
    </div>
  );
}
