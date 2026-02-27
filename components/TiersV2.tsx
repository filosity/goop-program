"use client";

import { useState, useEffect } from "react";
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

const tabLabels = ["Tier 1", "Tier 2", "Tier 3", "The Collective"];

function BenefitIcon({ benefit, size = 22 }: { benefit: string; size?: number }) {
  const b = benefit.toLowerCase();
  if (b.includes("cashback") || b.includes("earn"))
    return <DollarSignCircle size={size} color="currentColor" />;
  if (b.includes("birthday"))
    return <GiftBox size={size} color="currentColor" />;
  if (b.includes("sales"))
    return <DiscountTag size={size} color="currentColor" />;
  if (b.includes("early access"))
    return <Bolt size={size} color="currentColor" />;
  if (b.includes("shipping"))
    return <DeliveryTruck size={size} color="currentColor" />;
  if (b.includes("quarterly"))
    return <PresentBox size={size} color="currentColor" />;
  if (b.includes("consultation"))
    return <User size={size} color="currentColor" />;
  if (b.includes("vip") || b.includes("event"))
    return <Star size={size} color="currentColor" />;
  if (b.includes("curated") || b.includes("premium"))
    return <Gifts size={size} color="currentColor" />;
  return <DollarSignCircle size={size} color="currentColor" />;
}

export default function TiersV2() {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedTab, setDisplayedTab] = useState(0);
  const [fading, setFading] = useState(false);
  const [currentTier, setCurrentTier] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      setCurrentTier((e as CustomEvent).detail.tier);
    };
    window.addEventListener("tier-updated", handler);
    return () => {
      window.removeEventListener("tier-updated", handler);
    };
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeTab) return;
    setFading(true);
    setActiveTab(index);
    setTimeout(() => {
      setDisplayedTab(index);
      setFading(false);
    }, 250);
  };

  const tier = tiers[displayedTab];

  return (
    <section
      id="section-tiers"
      style={{
        padding: "20px 48px 40px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "44px",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "#000000",
          textAlign: "center",
          margin: "0 0 56px 0",
          letterSpacing: "-0.01em",
        }}
      >
        Tiers
      </h2>

      {/* Tab buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "32px",
        }}
      >
        {tabLabels.map((label, i) => {
          const isActive = activeTab === i;
          const isCurrent = currentTier === i;
          return (
            <button
              key={label}
              onClick={() => handleTabClick(i)}
              style={{
                position: "relative",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 400,
                height: "38px",
                padding: "0 22px",
                borderRadius: "40px",
                border: isActive ? "1px solid #0f2e2f" : "1px solid #d4e0df",
                backgroundColor: isActive ? "#0f2e2f" : "transparent",
                color: isActive ? "#ffffff" : "#000000",
                cursor: "pointer",
                transition: "all 0.25s ease",
                lineHeight: 1,
              }}
            >
              {label}
              {isCurrent && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-4px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "#ffffff",
                    backgroundColor: "#0f2e2f",
                    padding: "2px 6px",
                    borderRadius: "20px",
                    lineHeight: 1.3,
                    border: "2px solid #ffffff",
                  }}
                >
                  current
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Large card */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          border: "1px solid #d4e0df",
          display: "flex",
          overflow: "hidden",
          minHeight: "520px",
        }}
      >
        {/* Left half — image */}
        <div
          style={{
            width: "50%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {tiers.map((t, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${t.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: displayedTab === i ? (fading ? 0 : 1) : 0,
                transition: "opacity 0.35s ease",
              }}
            />
          ))}
        </div>

        {/* Right half — content */}
        <div
          style={{
            width: "50%",
            backgroundColor: "#ffffff",
            padding: "48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: fading ? 0 : 1,
            transition: "opacity 0.25s ease",
          }}
        >
          {/* Tier name */}
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "36px",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#000000",
              margin: "0 0 6px 0",
              letterSpacing: "-0.01em",
            }}
          >
            {tier.name}
          </h3>

          {/* Spend requirement */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 400,
              color: "#000000",
              margin: "0",
              lineHeight: 1.4,
            }}
          >
            {tier.spend}
          </p>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "#d4e0df",
              margin: "24px 0",
            }}
          />

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
                  padding: "14px 0",
                  borderTop: j > 0 ? "1px solid #d4e0df" : "none",
                  color: "#1a1a1a",
                }}
              >
                <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                  <BenefitIcon benefit={benefit} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#1a1a1a",
                    lineHeight: 1.5,
                  }}
                >
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tiersV2FadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
