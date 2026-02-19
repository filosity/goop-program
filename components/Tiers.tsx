"use client";

import { useState, useEffect } from "react";
import { DollarSignCircle, GiftBox, DiscountTag, Bolt, DeliveryTruck, User, Star, PresentBox, Gifts, XmarkCircle } from "@vectoricons/atlas-icons-react";

const benefitDescriptions: Record<string, string> = {
  "10% cashback on all purchases":
    "Earn 10% back on every purchase as goop credit, automatically applied to your account.",
  "Birthday gift":
    "Receive a complimentary gift from our curated collection delivered to you during your birthday month.",
  "Member-only sales access":
    "Get early and exclusive access to seasonal sales events reserved only for loyalty members.",
  "Early access to new products":
    "Be the first to shop new product launches before they become available to the public.",
  "Free standard shipping":
    "Enjoy free standard shipping on all orders, no minimum purchase required.",
  "Free expedited shipping":
    "Upgraded shipping at no cost — receive your orders faster with complimentary expedited delivery.",
  "Free overnight shipping":
    "The fastest delivery, completely free. All your orders arrive the very next day.",
  "Exclusive quarterly gift":
    "Four times a year, receive a surprise luxury gift hand-selected by our beauty editors.",
  "Annual beauty consultation":
    "A one-on-one virtual session with our beauty experts to create a personalised skincare and beauty routine.",
  "VIP event invitations":
    "Receive invitations to exclusive in-person and virtual events, product launches, and masterclasses.",
  "Premium curated boxes":
    "Receive specially curated boxes featuring full-size products from our most coveted collections.",
};

/* ─── Unique SVG icon per benefit ─── */
function BenefitIcon({
  benefit,
  light,
  size = 22,
}: {
  benefit: string;
  light?: boolean;
  size?: number;
}) {
  const bg = light ? "#ffffff" : "#1a1a1a";
  const fg = light ? "#000000" : "#ffffff";

  const iconMap: Record<string, React.ReactNode> = {
    points: <DollarSignCircle size={size} color="currentColor" />,
    birthday: <GiftBox size={size} color="currentColor" />,
    sales: <DiscountTag size={size} color="currentColor" />,
    early: <Bolt size={size} color="currentColor" />,
    shipping: <DeliveryTruck size={size} color="currentColor" />,
    quarterly: <PresentBox size={size} color="currentColor" />,
    consultation: <User size={size} color="currentColor" />,
    vip: <Star size={size} color="currentColor" />,
    curated: <Gifts size={size} color="currentColor" />,
  };

  // Map benefit text to icon key
  let key = "points";
  const b = benefit.toLowerCase();
  if (b.includes("cashback") || b.includes("earn")) key = "points";
  else if (b.includes("birthday")) key = "birthday";
  else if (b.includes("sales")) key = "sales";
  else if (b.includes("early access")) key = "early";
  else if (b.includes("shipping")) key = "shipping";
  else if (b.includes("quarterly")) key = "quarterly";
  else if (b.includes("consultation")) key = "consultation";
  else if (b.includes("vip") || b.includes("event")) key = "vip";
  else if (b.includes("curated") || b.includes("premium")) key = "curated";

  return <>{iconMap[key]}</>;
}

const tiers = [
  {
    name: "Tier 1",
    subtitle: "your tier",
    spend: "$0–$349 annual spend",
    current: true,
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
    subtitle: "",
    spend: "$350–$899 annual spend",
    current: false,
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
    subtitle: "",
    spend: "$900+ annual spend",
    current: false,
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
    subtitle: "",
    spend: "Invite only",
    current: false,
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
            fontFamily: "var(--font-serif)",
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);
  const [activeBenefit, setActiveBenefit] = useState<string | null>(null);
  const [currentTier, setCurrentTier] = useState<number>(0);

  useEffect(() => {
    const handler = (e: Event) => {
      setCurrentTier((e as CustomEvent).detail.tier);
    };
    window.addEventListener("tier-updated", handler);
    return () => {
      window.removeEventListener("tier-updated", handler);
    };
  }, []);

  return (
    <section
      id="section-tiers"
      style={{
        backgroundColor: "#ffffff",
        padding: "20px 48px 40px",
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

      {/* Tier cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {tiers.map((tier, i) => {
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
                borderRight: !isLast ? "1px solid #e5e2de" : "none",
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
                {currentTier === i && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.15)",
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
                        letterSpacing: "0.06em",
                        color: "#000000",
                        border: "1px solid #e0e0e0",
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
                  backgroundColor: currentTier === i ? "#ffffff" : "#f9f7f5",
                  padding: "32px 36px 44px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  ...(currentTier === i ? { boxShadow: [
                    i === 0 ? "inset 1px 0 0 0 #e5e2de" : "",
                    "inset 0 -1px 0 0 #e5e2de",
                    isLast ? "inset -1px 0 0 0 #e5e2de" : "",
                  ].filter(Boolean).join(", ") } : {}),
                }}
              >

                {/* Tier name */}
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "30px",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: "#000000",
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
                    color: "#888888",
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
                              ? "1px solid #e5e2de"
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
                            color: "#1a1a1a",
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
