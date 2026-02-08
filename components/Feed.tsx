"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Mock data types (local to feed; aligns with lib/data.ts where applicable)
// ---------------------------------------------------------------------------

type EarnItem = {
  kind: "earn";
  id: string;
  emoji: string;
  title: string;
  description: string;
  points: number;
  cta: string;
};

type RedeemItem = {
  kind: "redeem";
  id: string;
  name: string;
  pointsCost: number;
  gradientFrom: string;
  gradientTo: string;
};

type PromoItem = {
  kind: "promo";
  id: string;
  headline: string;
  subtext: string;
  cta: string;
};

type FeedItem = EarnItem | RedeemItem | PromoItem;

// ---------------------------------------------------------------------------
// Mock feed data
// ---------------------------------------------------------------------------

const FEED_ITEMS: FeedItem[] = [
  {
    kind: "earn",
    id: "e1",
    emoji: "\u270D\uFE0F",
    title: "Write a Review",
    description: "Share your thoughts on a recent purchase and help fellow beauty lovers.",
    points: 50,
    cta: "Write Review",
  },
  {
    kind: "redeem",
    id: "r1",
    name: "Rose Petal Lip Balm",
    pointsCost: 200,
    gradientFrom: "#E89AA8",
    gradientTo: "#C2415C",
  },
  {
    kind: "promo",
    id: "p1",
    headline: "Double Points Weekend",
    subtext: "Earn 2\u00D7 on every purchase this Saturday & Sunday.",
    cta: "Shop Now",
  },
  {
    kind: "earn",
    id: "e2",
    emoji: "\uD83D\uDC65",
    title: "Refer a Friend",
    description: "Send your unique link \u2014 you both earn points when they make their first order.",
    points: 150,
    cta: "Get Link",
  },
  {
    kind: "redeem",
    id: "r2",
    name: "Vitamin C Brightening Serum",
    pointsCost: 450,
    gradientFrom: "#FDE68A",
    gradientTo: "#D4A017",
  },
  {
    kind: "earn",
    id: "e3",
    emoji: "\uD83D\uDCF8",
    title: "Share on Instagram",
    description: "Post a photo with #GlowRewards and tag us for easy points.",
    points: 75,
    cta: "Share",
  },
  {
    kind: "redeem",
    id: "r3",
    name: "Hydrating Sheet Mask Set",
    pointsCost: 300,
    gradientFrom: "#F3C4CC",
    gradientTo: "#A32E48",
  },
  {
    kind: "promo",
    id: "p2",
    headline: "Birthday Bonus \uD83C\uDF82",
    subtext: "It\u2019s your month! Claim 100 free points as our gift to you.",
    cta: "Claim Gift",
  },
];

// ---------------------------------------------------------------------------
// Intersection Observer hook for fade-in
// ---------------------------------------------------------------------------

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ---------------------------------------------------------------------------
// Card wrapper with fade-in-up animation
// ---------------------------------------------------------------------------

function AnimatedCard({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Earn Card
// ---------------------------------------------------------------------------

function EarnCard({ item }: { item: EarnItem }) {
  return (
    <div className="rounded-xl bg-white border border-burgundy-100 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-burgundy-50 text-2xl">
          {item.emoji}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-burgundy-900 truncate">
              {item.title}
            </h3>
            <span className="shrink-0 text-sm font-bold text-gold-600">
              +{item.points} pts
            </span>
          </div>

          {/* Description */}
          <p className="mt-1 text-sm text-cream-700 leading-relaxed">
            {item.description}
          </p>

          {/* CTA */}
          <button className="mt-3 inline-flex items-center rounded-full bg-burgundy-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-burgundy-700 active:scale-[0.97] transition-all">
            {item.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Redeem Card
// ---------------------------------------------------------------------------

function RedeemCard({ item }: { item: RedeemItem }) {
  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden border border-cream-200">
      {/* Gradient placeholder image */}
      <div
        className="h-40 w-full"
        style={{
          background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
        }}
      />

      <div className="p-5">
        <h3 className="text-base font-semibold text-foreground">{item.name}</h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-gold-600">
            {item.pointsCost.toLocaleString()} pts
          </span>
          <button className="inline-flex items-center rounded-full border border-burgundy-600 px-4 py-1.5 text-sm font-medium text-burgundy-600 hover:bg-burgundy-50 active:scale-[0.97] transition-all">
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Promo Card
// ---------------------------------------------------------------------------

function PromoCard({ item }: { item: PromoItem }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-burgundy-700 to-burgundy-950 p-6 text-white shadow-md">
      <h3 className="text-lg font-bold leading-tight">{item.headline}</h3>
      <p className="mt-2 text-sm text-burgundy-200 leading-relaxed">
        {item.subtext}
      </p>
      <button className="mt-4 inline-flex items-center rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-burgundy-950 hover:bg-gold-300 active:scale-[0.97] transition-all">
        {item.cta}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feed component
// ---------------------------------------------------------------------------

export default function Feed() {
  return (
    <section className="mx-auto w-full max-w-lg px-4 py-6">
      <div className="flex flex-col gap-3">
        {FEED_ITEMS.map((item) => (
          <AnimatedCard key={item.id}>
            {item.kind === "earn" && <EarnCard item={item} />}
            {item.kind === "redeem" && <RedeemCard item={item} />}
            {item.kind === "promo" && <PromoCard item={item} />}
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}
