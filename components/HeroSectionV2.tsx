"use client";

import { useState, useEffect, useRef } from "react";
import { DollarSignCircle, GiftBox, DiscountTag, Bolt, DeliveryTruck, User, Star, PresentBox, Gifts, XmarkCircle } from "@vectoricons/atlas-icons-react";

/* ─── Tier config ─── */
const TIER_NAMES: Record<number, string> = {
  0: "Tier 1",
  1: "Tier 2",
  2: "Tier 3",
  3: "The Collective",
};

const MILESTONE_LABELS = ["Tier 2", "Tier 3", "The Collective"];
const MILESTONE_POSITIONS = ["20%", "60%", "100%"];
const MILESTONE_THRESHOLDS = [350, 900, 3000];

function getBarWidth(spend: number): number {
  if (spend >= 3000) return 100;
  if (spend >= 900) return 60 + ((spend - 900) / 2100) * 40;
  if (spend >= 350) return 20 + ((spend - 350) / 550) * 40;
  return (spend / 350) * 20;
}

/* ─── Tier data for popup ─── */
const tierData = [
  {
    name: "Tier 2",
    spend: "$350\u2013$899 annual spend",
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
    spend: "$900\u2013$2,999 annual spend",
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

const popupBenefitDescriptions: Record<string, string> = {
  "10% cashback on all purchases": "Earn 10% back on every purchase as store credit, automatically applied to your account.",
  "Birthday gift": "Receive a complimentary gift from our curated collection delivered to you during your birthday month.",
  "Member-only sales access": "Get early and exclusive access to seasonal sales events reserved only for loyalty members.",
  "Early access to new products": "Be the first to shop new product launches before they become available to the public.",
  "Free expedited shipping": "Upgraded shipping at no cost \u2014 receive your orders faster with complimentary expedited delivery.",
  "Free overnight shipping": "The fastest delivery, completely free. All your orders arrive the very next day.",
  "Exclusive quarterly gift": "Four times a year, receive a surprise luxury gift hand-selected by our beauty editors.",
  "Annual beauty consultation": "A one-on-one virtual session with our beauty experts to create a personalised skincare and beauty routine.",
  "VIP event invitations": "Receive invitations to exclusive in-person and virtual events, product launches, and masterclasses.",
  "Premium curated boxes": "Receive specially curated boxes featuring full-size products from our most coveted collections.",
};

function PopupBenefitIcon({ benefit }: { benefit: string }) {
  const s = 22;
  const b = benefit.toLowerCase();
  if (b.includes("cashback") || b.includes("earn")) return <DollarSignCircle size={s} color="currentColor" />;
  if (b.includes("birthday")) return <GiftBox size={s} color="currentColor" />;
  if (b.includes("sales")) return <DiscountTag size={s} color="currentColor" />;
  if (b.includes("early access")) return <Bolt size={s} color="currentColor" />;
  if (b.includes("shipping")) return <DeliveryTruck size={s} color="currentColor" />;
  if (b.includes("quarterly")) return <PresentBox size={s} color="currentColor" />;
  if (b.includes("consultation")) return <User size={s} color="currentColor" />;
  if (b.includes("vip") || b.includes("event")) return <Star size={s} color="currentColor" />;
  if (b.includes("curated") || b.includes("premium")) return <Gifts size={s} color="currentColor" />;
  return <DollarSignCircle size={s} color="currentColor" />;
}

function PopupBenefitRow({ benefit, hasBorder }: { benefit: string; hasBorder: boolean }) {
  const [hovered, setHovered] = useState(false);
  const desc = popupBenefitDescriptions[benefit] || "Learn more about this exclusive benefit available to loyalty members.";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "flex", alignItems: "center", gap: "12px", padding: "14px 0", borderTop: hasBorder ? "1px solid #e5e2de" : "none", cursor: "default" }}
    >
      <div style={{ flexShrink: 0 }}><PopupBenefitIcon benefit={benefit} /></div>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "#1a1a1a", lineHeight: 1.5 }}>{benefit}</span>
      {hovered && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: "100%", marginBottom: "6px", backgroundColor: "#000000", color: "#ffffff", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, lineHeight: 1.5, padding: "10px 14px", borderRadius: "0", zIndex: 20, cursor: "default", animation: "heroV2TooltipIn 0.15s ease" }}>
          {desc}
        </div>
      )}
    </div>
  );
}

function TierPopup({ tier, onClose }: { tier: (typeof tierData)[0]; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", animation: "heroV2Overlay 0.25s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", backgroundColor: "#f9f7f5", width: "90%", maxWidth: "380px", maxHeight: "80vh", overflow: "auto", animation: "heroV2PopupCard 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: "12px", right: "12px", zIndex: 10, width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.35)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", transition: "background-color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.55)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.35)")}>
          <XmarkCircle size={17} color="currentColor" />
        </button>
        <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${tier.image}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))" }} />
          <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 400, color: "#ffffff", margin: 0, letterSpacing: "-0.01em" }}>{tier.name}</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.7)", margin: "4px 0 0 0" }}>{tier.spend}</p>
          </div>
        </div>
        <div style={{ padding: "20px 32px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {tier.benefits.map((benefit, i) => (
              <PopupBenefitRow key={i} benefit={benefit} hasBorder={i > 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive progress dot with hover tooltip ─── */
function ProgressDot({
  position,
  reached,
  label,
  spendToGo,
  align,
  onClick,
}: {
  position: string;
  reached: boolean;
  label: string;
  spendToGo: number;
  align?: "center" | "right";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        position: "absolute",
        left: position,
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
    >
      {/* Dot */}
      <div
        style={{
          width: reached ? "18px" : "11px",
          height: reached ? "18px" : "11px",
          borderRadius: "50%",
          backgroundColor: reached ? "#000000" : "rgba(255,255,255,0.92)",
          border: reached || hovered ? "2px solid #000000" : "2px solid #cccccc",
          transition: "border-color 0.3s ease, transform 0.3s ease, width 0.3s ease, height 0.3s ease",
          transform: hovered ? "scale(1.2)" : "scale(1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {reached && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M6 12.5l4 4 8-9" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {/* Tooltip on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: reached ? "24px" : "18px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000000",
            color: "#ffffff",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 500,
            padding: "6px 11px",
            borderRadius: "0",
            whiteSpace: "nowrap",
            animation: "heroV2TooltipIn 0.15s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {reached ? (
            <span><span style={{ fontWeight: 700 }}>{label}</span> unlocked</span>
          ) : (
            <span>Spend <span style={{ fontWeight: 700 }}>${spendToGo}</span> more to unlock</span>
          )}
        </div>
      )}
      {/* Label below */}
      <span
        style={{
          position: "absolute",
          top: reached ? "22px" : "17px",
          ...(align === "right"
            ? { right: 0 }
            : { left: "50%", transform: "translateX(-50%)" }),
          fontFamily: "var(--font-serif)",
          fontSize: "13px",
          fontWeight: reached ? 600 : 400,
          color: "#1a1a1a",
          whiteSpace: "nowrap",
          transition: "top 0.3s ease",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function HeroSectionV2() {
  const [userPoints, setUserPoints] = useState(50);
  const [totalSpend, setTotalSpend] = useState(50);
  const [barWidth, setBarWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const [openTier, setOpenTier] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const userTier =
    totalSpend >= 3000 ? 3 : totalSpend >= 900 ? 2 : totalSpend >= 350 ? 1 : 0;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            setTimeout(() => setBarWidth(getBarWidth(totalSpend)), 600);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pointsHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) setUserPoints(detail.points);
    };
    const spendHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.spend !== undefined) {
        setTotalSpend(detail.spend);
        setBarWidth(getBarWidth(detail.spend));
      }
    };
    window.addEventListener("points-updated", pointsHandler);
    window.addEventListener("spend-updated", spendHandler);
    return () => {
      window.removeEventListener("points-updated", pointsHandler);
      window.removeEventListener("spend-updated", spendHandler);
    };
  }, []);

  return (
    <section
      id="section-hero"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "50vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes heroV2CardSlide {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroV2TooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes heroV2Overlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroV2PopupCard {
          from { opacity: 0; transform: scale(0.9) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/background-header.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Bottom-center frosted card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px 48px 32px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            backgroundColor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "40px 56px 40px 48px",
            display: "flex",
            alignItems: "stretch",
            gap: "0",
            opacity: visible ? 1 : 0,
            animation: visible ? "heroV2CardSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none",
          }}
        >
          {/* Column 1: Welcome */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingRight: "40px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#888888",
                margin: "0 0 10px 0",
                lineHeight: 1,
              }}
            >
              rewards club
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "30px",
                fontWeight: 400,
                color: "#000000",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Welcome back, Bethany
            </p>
          </div>

          {/* Divider 1 */}
          <div
            style={{
              width: "1px",
              backgroundColor: "#e5e2de",
              alignSelf: "stretch",
            }}
          />

          {/* Column 2: goop credit / Dollar value */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 40px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "44px",
                fontWeight: 400,
                color: "#000000",
                margin: "0 0 4px 0",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              ${(userPoints * 0.05).toFixed(2)}
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "16px",
                fontWeight: 400,
                color: "#1a1a1a",
                margin: "0 0 8px 0",
                lineHeight: 1.4,
              }}
            >
              {userPoints.toLocaleString()} goop credit
            </p>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                color: "#888888",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "0.5px",
                letterSpacing: "0.02em",
              }}
            >
              View activity
            </a>
          </div>

          {/* Divider 2 */}
          <div
            style={{
              width: "1px",
              backgroundColor: "#e5e2de",
              alignSelf: "stretch",
            }}
          />

          {/* Column 3: Tier + Progress */}
          <div
            style={{
              flex: 1.4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "40px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "44px",
                fontWeight: 400,
                color: "#000000",
                margin: "0 0 4px 0",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {TIER_NAMES[userTier]}
            </p>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "16px",
                fontWeight: 400,
                color: "#1a1a1a",
                margin: "0 0 20px 0",
                lineHeight: 1.4,
              }}
            >
              Member since March 2026
            </p>

            {/* Progress bar */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "3px",
                backgroundColor: "#e5e2de",
                borderRadius: "2px",
                marginBottom: "28px",
              }}
            >
              {/* Animated fill */}
              <div
                style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  backgroundColor: "#000000",
                  borderRadius: "2px",
                  transition:
                    "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />

              {/* Interactive milestones */}
              {MILESTONE_LABELS.map((label, i) => (
                <ProgressDot
                  key={label}
                  position={MILESTONE_POSITIONS[i]}
                  reached={userTier >= i + 1}
                  label={label}
                  spendToGo={Math.max(MILESTONE_THRESHOLDS[i] - totalSpend, 0)}
                  align={i === 2 ? "right" : "center"}
                  onClick={() => setOpenTier(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tier benefits popup */}
      {openTier !== null && (
        <TierPopup
          tier={tierData[openTier]}
          onClose={() => setOpenTier(null)}
        />
      )}
    </section>
  );
}
