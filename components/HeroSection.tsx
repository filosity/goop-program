"use client";

import { useState, useEffect, useRef } from "react";
import { DollarSignCircle, GiftBox, DiscountTag, Bolt, DeliveryTruck, User, Star, PresentBox, Gifts, XmarkCircle } from "@vectoricons/atlas-icons-react";
import HeroSectionV2 from "./HeroSectionV2";
import HeroSectionV3 from "./HeroSectionV3";

/* ─── Pill Button ─── */
function PillButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "13px",
        fontWeight: 600,
        color: "#ffffff",
        backgroundColor: hovered ? "#333333" : "#000000",
        padding: "12px 22px",
        borderRadius: "40px",
        textDecoration: "none",
        lineHeight: 1,
        transition: "background-color 0.2s ease",
      }}
    >
      {label}
    </a>
  );
}

/* ─── Section Label with underline matching text width ─── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "inline-block", marginBottom: "20px" }}>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: "#1a1a1a",
          margin: "0 0 10px 0",
          lineHeight: 1,
        }}
      >
        {text}
      </p>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#d5d5d5",
        }}
      />
    </div>
  );
}

/* ─── Tier data ─── */
const tierData = [
  {
    name: "Tier 2",
    spend: "$100–$299 annual spend",
    image: "/tier2.jpg",
    benefits: [
      "Earn 1.5 points per $1 spent",
      "Birthday gift",
      "Member-only sales access",
      "Early access to new products",
      "Free expedited shipping",
      "Exclusive quarterly gift",
    ],
  },
  {
    name: "Tier 3",
    spend: "$300–$499 annual spend",
    image: "/tier3.jpg",
    benefits: [
      "Earn 2 points per $1 spent",
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
    spend: "$500+ annual spend",
    image: "/tier4.jpg",
    benefits: [
      "Earn 3 points per $1 spent",
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

/* ─── Benefit icon (matches Tiers section) ─── */
function PopupBenefitIcon({ benefit }: { benefit: string }) {
  const s = 22;

  const b = benefit.toLowerCase();
  if (b.includes("point") || b.includes("earn"))
    return <DollarSignCircle size={s} color="currentColor" />;
  if (b.includes("birthday"))
    return <GiftBox size={s} color="currentColor" />;
  if (b.includes("sales"))
    return <DiscountTag size={s} color="currentColor" />;
  if (b.includes("early access"))
    return <Bolt size={s} color="currentColor" />;
  if (b.includes("shipping"))
    return <DeliveryTruck size={s} color="currentColor" />;
  if (b.includes("quarterly"))
    return <PresentBox size={s} color="currentColor" />;
  if (b.includes("consultation"))
    return <User size={s} color="currentColor" />;
  if (b.includes("vip") || b.includes("event"))
    return <Star size={s} color="currentColor" />;
  if (b.includes("curated") || b.includes("premium"))
    return <Gifts size={s} color="currentColor" />;
  // default
  return <DollarSignCircle size={s} color="currentColor" />;
}

/* ─── Benefit descriptions ─── */
const popupBenefitDescriptions: Record<string, string> = {
  "Earn 1 point per $1 spent":
    "Every dollar you spend earns you 1 reward point that can be redeemed for discounts, free products, and exclusive experiences.",
  "Earn 1.5 points per $1 spent":
    "Accelerate your rewards — earn 50% more points on every purchase to unlock perks faster.",
  "Earn 2 points per $1 spent":
    "Double the rewards. Every dollar now earns you 2 points, getting you to your next reward in half the time.",
  "Earn 3 points per $1 spent":
    "Our highest earning rate. Triple points on every purchase means you'll never run out of rewards.",
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

/* ─── Single benefit row with hover tooltip ─── */
function PopupBenefitRow({ benefit, hasBorder }: { benefit: string; hasBorder: boolean }) {
  const [hovered, setHovered] = useState(false);
  const desc = popupBenefitDescriptions[benefit] || "Learn more about this exclusive benefit available to loyalty members.";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 0",
        borderTop: hasBorder ? "1px solid #e5e2de" : "none",
        cursor: "default",
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <PopupBenefitIcon benefit={benefit} />
      </div>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          fontWeight: 400,
          color: "#1a1a1a",
          lineHeight: 1.5,
        }}
      >
        {benefit}
      </span>
      {/* Hover tooltip */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "100%",
            marginBottom: "6px",
            backgroundColor: "#000000",
            color: "#ffffff",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: 1.5,
            padding: "10px 14px",
            borderRadius: "0",
            zIndex: 20,
            cursor: "default",
            animation: "popupTooltipIn 0.15s ease",
          }}
        >
          {desc}
        </div>
      )}
    </div>
  );
}

/* ─── Tier benefits popup ─── */
function TierPopup({
  tier,
  onClose,
}: {
  tier: (typeof tierData)[0];
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "popupOverlay 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          backgroundColor: "#f9f7f5",
          width: "90%",
          maxWidth: "380px",
          maxHeight: "80vh",
          overflow: "auto",
          animation: "popupCard 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 10,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.35)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.55)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.35)")}
        >
          <XmarkCircle size={17} color="currentColor" />
        </button>
        {/* Header — image + tier name */}
        <div
          style={{
            position: "relative",
            height: "200px",
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
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "24px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "28px",
                fontWeight: 400,
                color: "#ffffff",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {tier.name}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.7)",
                margin: "4px 0 0 0",
              }}
            >
              {tier.spend}
            </p>
          </div>
        </div>
        {/* Benefits — matching tier card style */}
        <div style={{ padding: "20px 32px 28px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tier.benefits.map((benefit, i) => (
              <PopupBenefitRow key={i} benefit={benefit} hasBorder={i > 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Tier milestone icon on progress bar ─── */
function TierMilestone({
  label,
  position,
  tooltip,
  reached,
  align = "center",
  tierIndex,
  onOpenPopup,
  dimmed,
  onHover,
  onLeave,
}: {
  label: string;
  position: string;
  tooltip: string;
  reached: boolean;
  align?: "center" | "right";
  tierIndex: number;
  onOpenPopup: (index: number) => void;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => { setHovered(true); onHover(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
      onClick={(e) => {
        e.stopPropagation();
        onOpenPopup(tierIndex);
      }}
      style={{
        position: "absolute",
        left: position,
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        cursor: "pointer",
        opacity: dimmed ? 0.7 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Dot */}
      <div
        style={{
          width: reached ? "20px" : "12px",
          height: reached ? "20px" : "12px",
          borderRadius: "50%",
          backgroundColor: reached ? "#000000" : "#ffffff",
          border: reached || hovered ? "2px solid #000000" : "2px solid #cccccc",
          transition: "border-color 0.3s ease, transform 0.3s ease, width 0.3s ease, height 0.3s ease",
          transform: hovered ? "scale(1.2)" : "scale(1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {reached && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M6 12.5l4 4 8-9" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {/* Label below */}
      <span
        style={{
          position: "absolute",
          top: reached ? "24px" : "18px",
          ...(align === "right"
            ? { right: 0 }
            : { left: "50%", transform: "translateX(-50%)" }),
          fontFamily: "var(--font-serif)",
          fontSize: "14px",
          fontWeight: reached ? 600 : 500,
          color: "#1a1a1a",
          whiteSpace: "nowrap",
          transition: "opacity 0.2s ease, top 0.3s ease",
        }}
      >
        {label}
      </span>
      {/* Tooltip on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: reached ? "26px" : "22px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000000",
            color: "#ffffff",
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 500,
            padding: "7px 12px 9px",
            borderRadius: "0",
            whiteSpace: "nowrap",
            animation: "tooltipIn 0.2s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {reached ? (
            <span><span style={{ fontWeight: 700 }}>{label}</span> unlocked</span>
          ) : (
            <span>Spend <span style={{ fontWeight: 700 }}>{tooltip}</span> more to unlock</span>
          )}
        </div>
      )}
    </div>
  );
}

function getBarWidth(spend: number): number {
  if (spend >= 500) return 100;
  if (spend >= 300) return 60 + ((spend - 300) / 200) * 40;
  if (spend >= 100) return 20 + ((spend - 100) / 200) * 40;
  return (spend / 100) * 20;
}
const HERO_TIER_NAMES: Record<number, string> = { 0: "Tier 1", 1: "Tier 2", 2: "Tier 3", 3: "The Collective" };

function HeroSectionV1() {
  const [barWidth, setBarWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const [openTier, setOpenTier] = useState<number | null>(null);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const [userPoints, setUserPoints] = useState(50);
  const [totalSpend, setTotalSpend] = useState(50);
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Tier is based on cumulative spend (never decreases), not point balance
  const userTier = totalSpend >= 500 ? 3 : totalSpend >= 300 ? 2 : totalSpend >= 100 ? 1 : 0;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            setTimeout(() => setBarWidth(getBarWidth(totalSpend)), 500);
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
      if (detail?.points !== undefined) {
        setUserPoints(detail.points);
      }
    };
    const spendHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.spend !== undefined) {
        setTotalSpend(detail.spend);
        const newTier = detail.spend >= 500 ? 3 : detail.spend >= 300 ? 2 : detail.spend >= 100 ? 1 : 0;
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
        minHeight: "60vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
      }}
    >
      <style>{`
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroCardSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popupOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupCard {
          from { opacity: 0; transform: scale(0.9) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popupTooltipIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
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
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Content wrapper — left aligned */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "48px 0 40px 48px",
          width: "100%",
          maxWidth: "540px",
        }}
      >
        {/* ═══ Eyebrow ═══ */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.03em",
            color: "rgba(255, 255, 255, 0.85)",
            margin: "0 0 10px 0",
            lineHeight: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
          }}
        >
          rewards club
        </p>

        {/* ═══ Heading ═══ */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "38px",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#ffffff",
            margin: "0 0 32px 0",
            letterSpacing: "-0.01em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s",
          }}
        >
          Welcome back, Bethany
        </h1>

        {/* ═══ Cards ═══ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* ═══ CARD 1: rewards available to spend ═══ */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "36px 40px 40px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <SectionLabel text="rewards available to spend" />

            {/* Dollar amount */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "44px",
                fontWeight: 400,
                lineHeight: 1,
                color: "#000000",
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em",
              }}
            >
              ${(userPoints * 0.05).toFixed(2)}
            </p>

            {/* Points info */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                fontWeight: 400,
                color: "#1a1a1a",
                margin: "0 0 12px 0",
                lineHeight: 1.55,
              }}
            >
              You have {userPoints.toLocaleString()} points
            </p>

            {/* Activity link */}
            <a
              href="#"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                fontWeight: 400,
                color: "#1a1a1a",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "0.5px",
              }}
            >
              View account activity
            </a>

          </div>

          {/* ═══ CARD 2: your current tier ═══ */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "36px 40px 32px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <SectionLabel text="your current tier" />

            {/* Tier name */}
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "48px",
                fontWeight: 400,
                lineHeight: 1,
                color: "#000000",
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em",
              }}
            >
              {HERO_TIER_NAMES[userTier]}
            </h2>

            {/* Member since */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                fontWeight: 400,
                color: "#1a1a1a",
                margin: "0 0 36px 0",
                lineHeight: 1.55,
              }}
            >
              Member since <span style={{ fontWeight: 600 }}>March 2026</span>
            </p>

            {/* Progress bar with tier milestones */}
            <div
              ref={barRef}
              style={{
                position: "relative",
                width: "94%",
                height: "3px",
                backgroundColor: "#e5e5e5",
                marginBottom: "28px",
                borderRadius: "2px",
              }}
            >
              {/* Animated fill */}
              <div
                style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  backgroundColor: "#000000",
                  borderRadius: "2px",
                  transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />

              {/* Tier milestones */}
              <TierMilestone
                label="Tier 2"
                position="20%"
                tooltip={`$${Math.max(100 - totalSpend, 0)}`}
                reached={userTier >= 1}
                tierIndex={0}
                onOpenPopup={setOpenTier}
                dimmed={false}
                onHover={() => setHoveredMilestone(0)}
                onLeave={() => setHoveredMilestone(null)}
              />
              <TierMilestone
                label="Tier 3"
                position="60%"
                tooltip={`$${Math.max(300 - totalSpend, 0)}`}
                reached={userTier >= 2}
                tierIndex={1}
                onOpenPopup={setOpenTier}
                dimmed={false}
                onHover={() => setHoveredMilestone(1)}
                onLeave={() => setHoveredMilestone(null)}
              />
              <TierMilestone
                label="The Collective"
                position="100%"
                tooltip={`$${Math.max(500 - totalSpend, 0)}`}
                reached={userTier >= 3}
                align="right"
                tierIndex={2}
                onOpenPopup={setOpenTier}
                dimmed={false}
                onHover={() => setHoveredMilestone(2)}
                onLeave={() => setHoveredMilestone(null)}
              />
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

/* ─── Version Switcher ─── */
export default function HeroSection() {
  const [version, setVersion] = useState(1);

  useEffect(() => {
    function handleVersion(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.version) setVersion(detail.version);
    }
    window.addEventListener("hero-version", handleVersion);
    return () => window.removeEventListener("hero-version", handleVersion);
  }, []);

  if (version === 2) return <HeroSectionV2 />;
  if (version === 3) return <HeroSectionV3 />;
  return <HeroSectionV1 />;
}
