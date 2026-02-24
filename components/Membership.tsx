"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DollarSignCircle, GiftBox, DiscountTag, Bolt, User, Star, Gifts, XmarkCircle } from "@vectoricons/atlas-icons-react";

const MembershipV2 = dynamic(() => import("./MembershipV2"), { ssr: false });
const MembershipV3 = dynamic(() => import("./MembershipV3"), { ssr: false });

/*
 * ═══════════════════════════════════════════════════════════
 *  DESIGN SYSTEM — spacing & typography reference
 * ═══════════════════════════════════════════════════════════
 *
 *  Section padding:        72–100px top / 120px bottom (sides 48px)
 *  Section heading:        font-serif, 44px, weight 400, letter-spacing -0.01em, centered
 *  Section max-width:      1280px (centered with margin auto)
 *  Card padding:           32px 36px 44px
 *  Card background:        #f5f8f8 (light) / #000000 (dark/current)
 *  Divider between items:  1px solid #d4e0df (light) / rgba(255,255,255,0.15) (dark)
 *  Card title:             font-serif, 30px, weight 400, ls -0.01em
 *  Card subtitle/spend:    font-sans, 13px, weight 400, color #6b8a89
 *  Benefit text:           font-sans, 14px, weight 400, color #1a1a1a / rgba(255,255,255,0.85)
 *  Benefit icon:           29px default, 35px popup detail, 26px header popup
 *  Benefit row padding:    16px 0
 *  Benefit gap icon–text:  14px
 *  Pill button:            font-sans, 13px, weight 600, padding 12px 22px, border-radius 999px
 *  Popup benefits padding: 20px 32px 28px
 *  Border radius:          0px throughout (except pill buttons 40px, close button circle 50%)
 *  Hover opacity dim:      0.7 (cards), 0.58 (benefits within card)
 *  Hover tooltip (circles):font-sans, 14px, weight 500, padding 7px 12px 9px, border-radius 0
 *  Hover tooltip (popup):  font-sans, 13px, weight 500, padding 10px 14px, border-radius 0
 *  Font families:          --font-serif (ACaslonPro), --font-sans (Inter Tight)
 *  Transitions:            0.3s ease (opacity, transform), 0.2s ease (hover micro)
 *  Image height in cards:  240px
 *  "current tier" box:     bottom 12px, left 14px, padding 5px 10px, font-sans 13px weight 500
 *  Section label underline: #d5d5d5
 *
 * ═══════════════════════════════════════════════════════════
 */

const benefits = [
  "AG Credit per serving",
  "$2 sign-up bonus",
  "Subscriber milestone rewards",
  "Exclusive merch access",
  "Birthday bonus",
  "Social engagement rewards",
  "Sweepstakes entry",
  "Weekly voting rewards",
  "Referral bonuses",
  "Early access to new products",
];

const benefitDescriptions: Record<string, string> = {
  "AG Credit per serving":
    "Earn AG Credit with every serving of AG1, automatically added to your balance.",
  "$2 sign-up bonus":
    "Get $2 AG Credit just for signing up for your subscription.",
  "Subscriber milestone rewards":
    "Unlock exclusive rewards at monthly milestones — from welcome kits to premium merch.",
  "Exclusive merch access":
    "Redeem AG Credit for exclusive AG1 merchandise not available anywhere else.",
  "Birthday bonus":
    "Receive $1 AG Credit during your birthday month as a thank you.",
  "Social engagement rewards":
    "Earn AG Credit by connecting social accounts and posting about your AG1 experience.",
  "Sweepstakes entry":
    "Enter weekly sweepstakes for a chance to win AG1 merch and exclusive prizes.",
  "Weekly voting rewards":
    "Earn $0.25 AG Credit each time you vote in the weekly community poll.",
  "Referral bonuses":
    "Give $15, get $15 — earn AG Credit for every friend who subscribes.",
  "Early access to new products":
    "Be the first to try new AG1 products and limited edition items.",
};

/* ─── Benefit icon (white icon — for dark bg) ─── */
function MemberBenefitIcon({ benefit, size = 20 }: { benefit: string; size?: number }) {
  const b = benefit.toLowerCase();
  if (b.includes("credit per serving") || b.includes("per serving"))
    return <DollarSignCircle size={size} color="#ffffff" />;
  if (b.includes("sign-up") || b.includes("bonus"))
    return <GiftBox size={size} color="#ffffff" />;
  if (b.includes("milestone"))
    return <Star size={size} color="#ffffff" />;
  if (b.includes("merch"))
    return <Gifts size={size} color="#ffffff" />;
  if (b.includes("birthday"))
    return <GiftBox size={size} color="#ffffff" />;
  if (b.includes("social"))
    return <User size={size} color="#ffffff" />;
  if (b.includes("sweepstakes"))
    return <Bolt size={size} color="#ffffff" />;
  if (b.includes("voting"))
    return <DiscountTag size={size} color="#ffffff" />;
  if (b.includes("referral"))
    return <User size={size} color="#ffffff" />;
  if (b.includes("early access"))
    return <Bolt size={size} color="#ffffff" />;
  // default
  return <DollarSignCircle size={size} color="#ffffff" />;
}

/* ─── Popup icon (white icon — for dark popup) ─── */
function PopupIcon({ benefit, size = 35 }: { benefit: string; size?: number }) {
  const b = benefit.toLowerCase();
  if (b.includes("credit per serving") || b.includes("per serving"))
    return <DollarSignCircle size={size} color="#ffffff" />;
  if (b.includes("sign-up") || b.includes("bonus"))
    return <GiftBox size={size} color="#ffffff" />;
  if (b.includes("milestone"))
    return <Star size={size} color="#ffffff" />;
  if (b.includes("merch"))
    return <Gifts size={size} color="#ffffff" />;
  if (b.includes("birthday"))
    return <GiftBox size={size} color="#ffffff" />;
  if (b.includes("social"))
    return <User size={size} color="#ffffff" />;
  if (b.includes("sweepstakes"))
    return <Bolt size={size} color="#ffffff" />;
  if (b.includes("voting"))
    return <DiscountTag size={size} color="#ffffff" />;
  if (b.includes("referral"))
    return <User size={size} color="#ffffff" />;
  if (b.includes("early access"))
    return <Bolt size={size} color="#ffffff" />;
  // default
  return <DollarSignCircle size={size} color="#ffffff" />;
}

/* ─── Benefit popup (dark theme) ─── */
function MemberBenefitPopup({
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
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        animation: "memberOverlayIn 0.25s ease",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#0d0d0d",
          padding: "40px 44px",
          maxWidth: "420px",
          width: "100%",
          position: "relative",
          animation: "memberPopupIn 0.3s ease",
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
            color: "rgba(255,255,255,0.4)",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        >
          <XmarkCircle size={17} color="currentColor" />
        </button>

        {/* Icon — strokes draw in */}
        <div
          className="member-popup-icon"
          style={{
            marginBottom: "20px",
          }}
        >
          <PopupIcon benefit={benefit} size={28} />
        </div>

        {/* Benefit name */}
        <h4
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "24px",
            fontWeight: 400,
            color: "#ffffff",
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
            color: "rgba(255,255,255,0.6)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>

      <style>{`
        @keyframes memberOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes memberPopupIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .member-popup-icon svg {
          opacity: 0;
          animation: memberIconReveal 0.3s ease 0.08s forwards;
        }
        @keyframes memberIconReveal {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─── Single benefit row ─── */
function MemberBenefitRow({
  text,
  isLast,
  dimmed,
  onHover,
  onLeave,
  onClick,
}: {
  text: string;
  isLast: boolean;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px 0",
        cursor: "pointer",
        position: "relative",
        opacity: dimmed ? 0.8 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0 }}>
        <MemberBenefitIcon benefit={text} size={24} />
      </div>
      {/* Text */}
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.5,
        }}
      >
        {text}
      </span>
      {/* Bottom divider */}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        />
      )}
    </div>
  );
}

export default function Membership() {
  const [version, setVersion] = useState(1);
  const [btnHovered, setBtnHovered] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [activeBenefit, setActiveBenefit] = useState<string | null>(null);
  const [sectionHovered, setSectionHovered] = useState(false);

  useEffect(() => {
    const versionHandler = (e: Event) => {
      const v = (e as CustomEvent).detail?.version;
      if (typeof v === "number" && v >= 1 && v <= 3) setVersion(v);
    };
    window.addEventListener("tiers-version", versionHandler);
    return () => window.removeEventListener("tiers-version", versionHandler);
  }, []);

  if (version === 2) return <MembershipV2 />;
  if (version === 3) return <MembershipV3 />;

  return (
    <section
      id="section-membership"
      onMouseEnter={() => setSectionHovered(true)}
      onMouseLeave={() => setSectionHovered(false)}
      style={{
        padding: "1px 48px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          minHeight: "520px",
          overflow: "hidden",
        }}
      >
        {/* Full-width background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/membership.mp4" type="video/mp4" />
        </video>

        {/* Black overlay — right half only, 85% default, 100% on hover */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "50%",
            backgroundColor: sectionHovered ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.75)",
            transition: "background-color 0.5s ease",
            zIndex: 1,
          }}
        />

        {/* Content — right half, on top of overlay */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginLeft: "50%",
            width: "50%",
            padding: "56px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "520px",
          }}
        >
          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "38px",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#ffffff",
              margin: "0 0 6px 0",
              letterSpacing: "-0.01em",
            }}
          >
            AG1 Subscriber Rewards
          </h2>

          {/* Price label */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 28px 0",
              lineHeight: 1.4,
            }}
          >
            Included with your subscription
          </p>

          {/* Join button — white pill, dot appears on hover */}
          <a
            href="#"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              alignSelf: "flex-start",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#000000",
              backgroundColor: btnHovered
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0.9)",
              height: "38px",
              padding: btnHovered ? "0 22px 0 20px" : "0 22px",
              borderRadius: "999px",
              textDecoration: "none",
              lineHeight: 1,
              marginBottom: "36px",
              transition: "background-color 0.2s ease, padding 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              overflow: "hidden",
            }}
          >
            {/* 6px black dot — bounces in from bottom on hover */}
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#000000",
                flexShrink: 0,
                marginRight: btnHovered ? "8px" : "0px",
                opacity: btnHovered ? 1 : 0,
                transform: btnHovered ? "translateY(0)" : "translateY(12px)",
                transition: "margin-right 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
            subscribe now →
          </a>

          {/* Top divider before benefits */}
          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />

          {/* Benefits — 2 columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "32px",
            }}
          >
            {/* Left column */}
            <div>
              {benefits.slice(0, 5).map((b, i) => (
                <MemberBenefitRow
                  key={i}
                  text={b}
                  isLast={i === 4}
                  dimmed={hoveredBenefit !== null && hoveredBenefit !== i}
                  onHover={() => setHoveredBenefit(i)}
                  onLeave={() => setHoveredBenefit(null)}
                  onClick={() => setActiveBenefit(b)}
                />
              ))}
            </div>
            {/* Right column */}
            <div>
              {benefits.slice(5).map((b, i) => (
                <MemberBenefitRow
                  key={i + 5}
                  text={b}
                  isLast={i === 4}
                  dimmed={hoveredBenefit !== null && hoveredBenefit !== i + 5}
                  onHover={() => setHoveredBenefit(i + 5)}
                  onLeave={() => setHoveredBenefit(null)}
                  onClick={() => setActiveBenefit(b)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefit popup */}
      {activeBenefit && (
        <MemberBenefitPopup
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
