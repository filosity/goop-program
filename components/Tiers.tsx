"use client";

import { useState, useEffect, useRef } from "react";
import { DollarSignCircle, GiftBox, DiscountTag, Bolt, User, Star, Gifts, XmarkCircle } from "@vectoricons/atlas-icons-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const benefitDescriptions: Record<string, string> = {
  "10% back on all purchases":
    "Earn 10% back in Goop Credit on every purchase you make.",
  "15% back on all purchases":
    "Earn 15% back in Goop Credit on every purchase you make.",
  "Yearly beauty mini gift":
    "Receive a complimentary beauty mini gift each year as a member perk.",
  "Core content access":
    "Unlock access to curated goop content and editorial features.",
  "Free expedited shipping":
    "Enjoy free expedited shipping on all orders.",
  "Overnight shipping and returns":
    "Get overnight shipping and free returns on all orders.",
  "Early access to product drops and launches":
    "Be the first to shop new product drops and exclusive launches.",
  "Yearly beauty full sized gift":
    "Receive a complimentary full-sized beauty product each year.",
  "Curated quarterly box":
    "Receive a curated box of goop favorites delivered to you each quarter.",
  "1:1 Digital styling sessions":
    "Book personalized one-on-one digital styling sessions with our team.",
  "Premium content access":
    "Unlock premium goop content, guides, and exclusive editorial features.",
  "Yearly beauty gift":
    "Receive a complimentary beauty gift each year as a member perk.",
  "VIP access to events":
    "Receive invitations to exclusive VIP goop events and experiences.",
  "Exclusive merchandise":
    "Access limited-edition goop merchandise available only to top-tier members.",
};

/* ─── Unique SVG icon per benefit ─── */
function BenefitIcon({
  benefit,
  size = 22,
}: {
  benefit: string;
  size?: number;
}) {
  const b = benefit.toLowerCase();
  if (b.includes("spend") && b.includes("get"))
    return <DollarSignCircle size={size} color="currentColor" />;
  if (b.includes("birthday"))
    return <GiftBox size={size} color="currentColor" />;
  if (b.includes("merch"))
    return <Gifts size={size} color="currentColor" />;
  if (b.includes("partner"))
    return <DiscountTag size={size} color="currentColor" />;
  if (b.includes("referral"))
    return <User size={size} color="currentColor" />;
  if (b.includes("focus group"))
    return <User size={size} color="currentColor" />;
  if (b.includes("support"))
    return <Bolt size={size} color="currentColor" />;
  if (b.includes("event"))
    return <Star size={size} color="currentColor" />;
  return <DollarSignCircle size={size} color="currentColor" />;
}

const tiers = [
  {
    name: "Tier 1",
    subtitle: "your tier",
    spend: "On sign-up",
    current: true,
    image: "/ag1-tier1.avif",
    benefits: [
      "10% back on all purchases",
    ],
  },
  {
    name: "Tier 2",
    subtitle: "",
    spend: "$350 annual spend",
    current: false,
    image: "/ag1-tier2.avif",
    benefits: [
      "10% back on all purchases",
      "Yearly beauty mini gift",
      "Core content access",
    ],
  },
  {
    name: "Tier 3",
    subtitle: "",
    spend: "$900 annual spend",
    current: false,
    image: "/ag1-tier3.avif",
    benefits: [
      "10% back on all purchases",
      "Free expedited shipping",
      "Overnight shipping and returns",
      "Early access to product drops and launches",
      "Yearly beauty full sized gift",
      "Curated quarterly box",
      "1:1 Digital styling sessions",
      "Premium content access",
    ],
  },
  {
    name: "Tier 4",
    subtitle: "Invite Only",
    spend: "Invite only / Prestige",
    current: false,
    image: "/ag1-tier4.avif",
    benefits: [
      "15% back on all purchases",
      "Free expedited shipping",
      "Overnight shipping and returns",
      "Early access to product drops and launches",
      "Yearly beauty gift",
      "Curated quarterly box",
      "1:1 Digital styling sessions",
      "VIP access to events",
      "Exclusive merchandise",
      "Premium content access",
    ],
  },
];

function BenefitPopup({
  benefit,
  description,
  onClose,
}: {
  benefit: string;
  description: string;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        animation: "tierOverlayIn 0.25s ease",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#ffffff",
          padding: "40px 44px",
          maxWidth: "420px",
          width: "100%",
          position: "relative",
          animation: "tierPopupIn 0.3s ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#999999",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <XmarkCircle size={17} color="currentColor" />
        </button>

        {/* Benefit icon */}
        <div style={{ marginBottom: "20px" }}>
          <BenefitIcon benefit={benefit} size={22} />
        </div>

        {/* Benefit name */}
        <h4
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "24px",
            fontWeight: 400,
            color: "#000000",
            margin: "0 0 14px 0",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {benefit}
        </h4>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 400,
            color: "#666666",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>

      <style>{`
        @keyframes tierOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tierPopupIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function Tiers() {
  const isMobile = useIsMobile();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);
  const [activeBenefit, setActiveBenefit] = useState<string | null>(null);
  const [currentTier, setCurrentTier] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tierHandler = (e: Event) => {
      setCurrentTier((e as CustomEvent).detail.tier);
    };
    const subHandler = (e: Event) => {
      const month = (e as CustomEvent).detail.month;
      if (month < 1) setCurrentTier(0);
      else if (month <= 3) setCurrentTier(1);
      else if (month <= 11) setCurrentTier(2);
      else setCurrentTier(3);
    };
    window.addEventListener("tier-updated", tierHandler);
    window.addEventListener("subscription-updated", subHandler);
    return () => {
      window.removeEventListener("tier-updated", tierHandler);
      window.removeEventListener("subscription-updated", subHandler);
    };
  }, []);

  return (
    <section
      id="section-tiers"
      style={{
        backgroundColor: "#ffffff",
        padding: isMobile ? "0px 16px 60px" : "0px 48px 100px",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: isMobile ? "32px" : "44px",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "#000000",
          textAlign: "left",
          margin: isMobile ? "0 0 32px 0" : "0 0 56px 0",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          letterSpacing: "-0.01em",
        }}
      >
        Tiers
      </h2>

      {/* Tier cards */}
      <div
        id="tiers-scroll"
        ref={scrollRef}
        style={isMobile ? {
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          gap: "12px",
          marginLeft: "-16px",
          marginRight: "-16px",
          paddingLeft: "16px",
          paddingRight: "16px",
          scrollbarWidth: "none",
        } as React.CSSProperties : {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
      {isMobile && (
        <style>{`
          #tiers-scroll::-webkit-scrollbar { display: none; }
        `}</style>
      )}
        {tiers.map((tier, i) => {
          const isCurrent = currentTier === i;
          const isHovered = hoveredIndex === i;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i;
          const isLast = i === tiers.length - 1;

          return (
            <div
              key={tier.name}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setHoveredBenefit(null);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                cursor: "pointer",
                ...(isMobile ? {
                  minWidth: "78vw",
                  maxWidth: "78vw",
                  scrollSnapAlign: "start",
                  flexShrink: 0,
                  borderRadius: "12px",
                  border: "1px solid #d4e0df",
                } : {
                  borderRight: !isLast
                    ? `1px solid ${isCurrent ? "rgba(255,255,255,0.15)" : "#d4e0df"}`
                    : "none",
                }),
              }}
            >
              {/* Image area */}
              <div
                style={{
                  height: "240px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url('${tier.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.4s ease",
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                />
                {isCurrent && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(12,61,61,0.35)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "14px",
                        backgroundColor: "#ffffff",
                        padding: "5px 10px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#000000",
                      }}
                    >
                      current tier
                    </div>
                  </>
                )}
              </div>

              {/* Card content */}
              <div
                style={{
                  backgroundColor: isCurrent ? "#000000" : "#F6F5F1",
                  padding: isMobile ? "24px 20px 32px" : "32px 36px 44px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >

                {/* Tier name */}
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "30px",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: isCurrent ? "#ffffff" : "#000000",
                    margin: "0 0 4px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tier.name}
                </h3>

                {/* Spend requirement */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: isCurrent ? "rgba(255,255,255,0.6)" : "#000000",
                    margin: "0 0 28px 0",
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
                    color: isCurrent ? "#ffffff" : "#1a1a1a",
                  }}
                >
                  {tier.benefits.map((benefit, j) => {
                    const isFirst = j === 0;
                    const isBenefitDimmed =
                      hoveredBenefit !== null &&
                      hoveredBenefit.startsWith(`${i}-`) &&
                      hoveredBenefit !== `${i}-${j}`;

                    return (
                      <div
                        key={j}
                        onMouseEnter={() => setHoveredBenefit(`${i}-${j}`)}
                        onMouseLeave={() => setHoveredBenefit(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveBenefit(benefit);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "16px 0",
                          borderTop:
                            !isFirst
                              ? `1px solid ${isCurrent ? "rgba(255,255,255,0.15)" : "#d4e0df"}`
                              : "none",
                          opacity: isBenefitDimmed ? 0.35 : 1,
                          transition: "opacity 0.2s ease",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ flexShrink: 0 }}>
                          <BenefitIcon benefit={benefit} />
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: isCurrent ? "rgba(255,255,255,0.85)" : "#1a1a1a",
                            lineHeight: 1.5,
                          }}
                        >
                          {benefit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Benefit popup */}
      {activeBenefit && (
        <BenefitPopup
          benefit={activeBenefit}
          description={
            benefitDescriptions[activeBenefit] ||
            "Learn more about this exclusive benefit available to loyalty members."
          }
          onClose={() => setActiveBenefit(null)}
        />
      )}
    </section>
  );
}
