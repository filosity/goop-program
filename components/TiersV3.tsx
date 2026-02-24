"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DollarSignCircle,
  GiftBox,
  DiscountTag,
  Bolt,
  DeliveryTruck,
  User,
  Star,
  PresentBox,
  Gifts,
} from "@vectoricons/atlas-icons-react";

/* ─── Tier data ─── */
const tiers = [
  {
    name: "Tier 1",
    spend: "$0–$349 annual spend",
    image: "/tier1.jpg",
    benefits: [
      "10% cashback on all purchases",
      "Birthday gift",
      "Member-only sales access",
      "Early access to new products",
      "Free standard shipping",
    ],
  },
  {
    name: "Tier 2",
    spend: "$350–$899 annual spend",
    image: "/tier2.jpg",
    benefits: [
      "10% cashback on all purchases",
      "Birthday gift",
      "Member-only sales access",
      "Early access to new products",
      "Free expedited shipping",
      "Exclusive quarterly gift",
    ],
  },
  {
    name: "Tier 3",
    spend: "$900+ annual spend",
    image: "/tier3.jpg",
    benefits: [
      "10% cashback on all purchases",
      "Birthday gift",
      "Member-only sales access",
      "Early access to new products",
      "Free overnight shipping",
      "Exclusive quarterly gift",
      "Annual beauty consultation",
    ],
  },
  {
    name: "The Collective",
    spend: "Invite only",
    image: "/tier4.jpg",
    benefits: [
      "10% cashback on all purchases",
      "Birthday gift",
      "Member-only sales access",
      "Early access to new products",
      "Free overnight shipping",
      "Exclusive quarterly gift",
      "Annual beauty consultation",
      "VIP event invitations",
      "Premium curated boxes",
    ],
  },
];

/* ─── Benefit icon ─── */
function TierBenefitIcon({ benefit, size = 22 }: { benefit: string; size?: number }) {
  const b = benefit.toLowerCase();
  if (b.includes("cashback") || b.includes("earn"))
    return <DollarSignCircle size={size} color="#ffffff" />;
  if (b.includes("birthday"))
    return <GiftBox size={size} color="#ffffff" />;
  if (b.includes("sales"))
    return <DiscountTag size={size} color="#ffffff" />;
  if (b.includes("early access"))
    return <Bolt size={size} color="#ffffff" />;
  if (b.includes("shipping"))
    return <DeliveryTruck size={size} color="#ffffff" />;
  if (b.includes("quarterly"))
    return <PresentBox size={size} color="#ffffff" />;
  if (b.includes("consultation"))
    return <User size={size} color="#ffffff" />;
  if (b.includes("vip") || b.includes("event"))
    return <Star size={size} color="#ffffff" />;
  if (b.includes("curated") || b.includes("premium"))
    return <Gifts size={size} color="#ffffff" />;
  return <DollarSignCircle size={size} color="#ffffff" />;
}

export default function TiersV3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);
  const [currentTier, setCurrentTier] = useState(0);
  const [leftArrowHovered, setLeftArrowHovered] = useState(false);
  const [rightArrowHovered, setRightArrowHovered] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      setCurrentTier((e as CustomEvent).detail.tier);
    };
    window.addEventListener("tier-updated", handler);
    return () => {
      window.removeEventListener("tier-updated", handler);
    };
  }, []);

  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (animating || index === activeIndex) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActiveIndex(index);
        setTimeout(() => {
          setAnimating(false);
        }, 50);
      }, 300);
    },
    [animating, activeIndex]
  );

  const goLeft = useCallback(() => {
    const prev = activeIndex === 0 ? tiers.length - 1 : activeIndex - 1;
    goTo(prev, "left");
  }, [activeIndex, goTo]);

  const goRight = useCallback(() => {
    const next = activeIndex === tiers.length - 1 ? 0 : activeIndex + 1;
    goTo(next, "right");
  }, [activeIndex, goTo]);

  const tier = tiers[activeIndex];

  return (
    <section
      id="section-tiers"
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <style>{`
        @keyframes tiersV3FadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes tiersV3FadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes tiersV3FadeOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-20px); }
        }
        @keyframes tiersV3FadeOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(20px); }
        }
      `}</style>

      {/* Full-width panel */}
      <div
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          height: "600px",
          overflow: "hidden",
        }}
      >
        {/* Background tier image */}
        <div
          key={`bg-${activeIndex}`}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${tier.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation:
              direction === "right"
                ? "tiersV3FadeIn 0.5s ease forwards"
                : "tiersV3FadeInLeft 0.5s ease forwards",
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Content overlay — left side */}
        <div
          key={`content-${activeIndex}`}
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "50%",
            padding: "64px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            animation:
              direction === "right"
                ? "tiersV3FadeIn 0.5s ease forwards"
                : "tiersV3FadeInLeft 0.5s ease forwards",
          }}
        >
          {/* Small uppercase label */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 16px 0",
              lineHeight: 1,
            }}
          >
            YOUR JOURNEY
          </p>

          {/* Tier name */}
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "48px",
              fontWeight: 400,
              color: "#ffffff",
              margin: "0 0 8px 0",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {tier.name}
          </h2>

          {/* Spend requirement */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 32px 0",
              lineHeight: 1.4,
            }}
          >
            {tier.spend}
          </p>

          {/* Benefits list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tier.benefits.map((benefit, j) => (
              <div
                key={j}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px 0",
                  borderBottom:
                    j < tier.benefits.length - 1
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "none",
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <TierBenefitIcon benefit={benefit} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.5,
                  }}
                >
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Left arrow button */}
        <button
          onClick={goLeft}
          onMouseEnter={() => setLeftArrowHovered(true)}
          onMouseLeave={() => setLeftArrowHovered(false)}
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: leftArrowHovered
              ? "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.15)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
            transition: "background-color 0.2s ease",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Right arrow button */}
        <button
          onClick={goRight}
          onMouseEnter={() => setRightArrowHovered(true)}
          onMouseLeave={() => setRightArrowHovered(false)}
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: rightArrowHovered
              ? "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.15)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
            transition: "background-color 0.2s ease",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            zIndex: 3,
          }}
        >
          {tiers.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i !== activeIndex) {
                  goTo(i, i > activeIndex ? "right" : "left");
                }
              }}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor:
                  i === activeIndex ? "#ffffff" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Current tier badge */}
        {currentTier === activeIndex && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "24px",
              backgroundColor: "#ffffff",
              padding: "6px 12px",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "#000000",
              zIndex: 3,
            }}
          >
            current tier
          </div>
        )}
      </div>
    </section>
  );
}
