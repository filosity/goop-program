"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { currentUser } from "@/lib/data";

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Hero() {
  const [animatedOffset, setAnimatedOffset] = useState(CIRCUMFERENCE);

  const { name, points, tier, nextRewardAt } = currentUser;
  const remaining = nextRewardAt - points;

  useEffect(() => {
    const progress = points / nextRewardAt;
    const offset = CIRCUMFERENCE * (1 - progress);
    const id = requestAnimationFrame(() => setAnimatedOffset(offset));
    return () => cancelAnimationFrame(id);
  }, [points, nextRewardAt]);

  return (
    <section className="bg-burgundy-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20">
        <div className="md:grid md:grid-cols-2 gap-8 items-center">
          {/* Left column */}
          <div>
            <p className="text-burgundy-300 text-sm tracking-widest uppercase">
              Welcome back
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-white mt-2">
              Hello, {name}.
            </h1>

            {/* Points & Tier */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-3xl font-bold text-white">
                {points} Points
              </span>
              <span className="bg-gold-400/20 text-gold-400 px-3 py-1 rounded-full text-xs font-semibold">
                {tier} Member
              </span>
            </div>

            {/* Progress ring — 80×80 */}
            <div className="flex items-center gap-4 mt-6">
              <div className="relative flex-shrink-0">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  className="-rotate-90"
                >
                  {/* Track */}
                  <circle
                    cx="40"
                    cy="40"
                    r={RADIUS}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    className="text-burgundy-700"
                  />
                  {/* Fill */}
                  <circle
                    cx="40"
                    cy="40"
                    r={RADIUS}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={animatedOffset}
                    className="text-gold-400 transition-[stroke-dashoffset] duration-700 ease-out"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                  {points}/{nextRewardAt}
                </span>
              </div>

              <p className="text-burgundy-300 text-sm">
                {remaining} points to your next reward
              </p>
            </div>

            {/* CTA */}
            <button className="bg-gold-400 text-burgundy-950 rounded-full px-8 py-3 font-semibold mt-6 hover:bg-gold-300 transition">
              View Rewards
            </button>
          </div>

          {/* Right column: Product images with flexbox + float animation */}
          <div className="hidden md:flex justify-center items-center gap-[-2rem]">
            <div className="flex items-end -space-x-12">
              <div className="relative z-10" style={{ animation: "float 4s ease-in-out infinite" }}>
                <Image
                  src="https://picsum.photos/seed/skincare-hero/400/500"
                  alt="Skincare hero product"
                  width={320}
                  height={400}
                  className="rounded-xl shadow-2xl object-cover"
                />
              </div>
              <div className="relative z-20" style={{ animation: "float 4s ease-in-out infinite 0.5s" }}>
                <Image
                  src="https://picsum.photos/seed/cream-product/300/400"
                  alt="Cream product"
                  width={260}
                  height={340}
                  className="rounded-xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
