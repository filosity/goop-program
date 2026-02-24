"use client";

import { useState } from "react";
import {
  DollarSignCircle,
  GiftBox,
  DiscountTag,
  Bolt,
  User,
  Star,
  Gifts,
} from "@vectoricons/atlas-icons-react";

/* ─── Benefits data ─── */
const benefits = [
  {
    title: "AG Credit per serving",
    description:
      "Earn AG Credit with every serving of AG1, automatically added to your balance.",
  },
  {
    title: "$2 sign-up bonus",
    description:
      "Get $2 AG Credit just for signing up for your subscription.",
  },
  {
    title: "Subscriber milestone rewards",
    description:
      "Unlock exclusive rewards at monthly milestones — from welcome kits to premium merch.",
  },
  {
    title: "Exclusive merch access",
    description:
      "Redeem AG Credit for exclusive AG1 merchandise not available anywhere else.",
  },
  {
    title: "Birthday bonus",
    description:
      "Receive $1 AG Credit during your birthday month as a thank you.",
  },
  {
    title: "Social engagement rewards",
    description:
      "Earn AG Credit by connecting social accounts and posting about your AG1 experience.",
  },
  {
    title: "Sweepstakes entry",
    description:
      "Enter weekly sweepstakes for a chance to win AG1 merch and exclusive prizes.",
  },
  {
    title: "Weekly voting rewards",
    description:
      "Earn $0.25 AG Credit each time you vote in the weekly community poll.",
  },
  {
    title: "Referral bonuses",
    description:
      "Give $15, get $15 — earn AG Credit for every friend who subscribes.",
  },
  {
    title: "Early access to new products",
    description:
      "Be the first to try new AG1 products and limited edition items.",
  },
];

/* ─── Benefit icon ─── */
function BenefitIcon({
  title,
  size = 22,
  color = "#ffffff",
}: {
  title: string;
  size?: number;
  color?: string;
}) {
  const b = title.toLowerCase();
  if (b.includes("credit per serving") || b.includes("per serving"))
    return <DollarSignCircle size={size} color={color} />;
  if (b.includes("sign-up") || b.includes("bonus"))
    return <GiftBox size={size} color={color} />;
  if (b.includes("milestone"))
    return <Star size={size} color={color} />;
  if (b.includes("merch"))
    return <Gifts size={size} color={color} />;
  if (b.includes("birthday"))
    return <GiftBox size={size} color={color} />;
  if (b.includes("social"))
    return <User size={size} color={color} />;
  if (b.includes("sweepstakes"))
    return <Bolt size={size} color={color} />;
  if (b.includes("voting"))
    return <DiscountTag size={size} color={color} />;
  if (b.includes("referral"))
    return <User size={size} color={color} />;
  if (b.includes("early access"))
    return <Bolt size={size} color={color} />;
  return <DollarSignCircle size={size} color={color} />;
}

/* ─── Background images for benefit hover ─── */
const benefitImages = [
  "/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg",
  "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg",
  "/earn1.jpg",
];

/* ─── Single benefit cell ─── */
function BenefitCell({
  title,
  description,
  isLastRow,
  imageIndex,
}: {
  title: string;
  description: string;
  isLastRow: boolean;
  imageIndex: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px",
        borderBottom: isLastRow ? "none" : "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Hover background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${benefitImages[imageIndex % benefitImages.length]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div style={{ marginBottom: "14px" }}>
          <BenefitIcon title={title} size={26} color="#ffffff" />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "18px",
            fontWeight: 400,
            color: "#ffffff",
            margin: "0 0 8px 0",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "15px",
            fontWeight: 400,
            color: hovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)",
            margin: 0,
            lineHeight: 1.6,
            transition: "color 0.3s ease",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function MembershipV3() {
  const [btnHovered, setBtnHovered] = useState(false);

  // Split benefits into two columns: 5 left, 5 right
  const leftColumn = benefits.slice(0, 5);
  const rightColumn = benefits.slice(5);

  return (
    <section
      id="section-membership"
      style={{
        padding: "20px 48px 0px",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", backgroundColor: "#0d0d0d", padding: "80px 48px 80px" }}>
      {/* Heading area */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "44px",
            fontWeight: 400,
            color: "#ffffff",
            margin: "0",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          AG1 Subscriber Rewards
        </h2>

        {/* Price */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "17px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.45)",
            margin: "8px 0 28px",
            lineHeight: 1.4,
          }}
        >
          Included with your subscription
        </p>

        {/* Join button — V1 style with dot */}
        <a
          href="#"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 600,
            color: "#0C3D3D",
            backgroundColor: btnHovered
              ? "rgba(255,255,255,0.85)"
              : "#ffffff",
            height: "38px",
            padding: btnHovered ? "0 22px 0 20px" : "0 22px",
            borderRadius: "999px",
            textDecoration: "none",
            lineHeight: 1,
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
              backgroundColor: "#0C3D3D",
              flexShrink: 0,
              marginRight: btnHovered ? "8px" : "0px",
              opacity: btnHovered ? 1 : 0,
              transform: btnHovered ? "translateY(0)" : "translateY(12px)",
              transition: "margin-right 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
          subscribe now →
        </a>
      </div>

      {/* 2-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "32px",
          rowGap: "0px",
          maxWidth: "960px",
          margin: "44px auto 0",
        }}
      >
        {/* Left column */}
        <div>
          {leftColumn.map((benefit, i) => (
            <BenefitCell
              key={i}
              title={benefit.title}
              description={benefit.description}
              isLastRow={i === leftColumn.length - 1}
              imageIndex={i}
            />
          ))}
        </div>

        {/* Right column */}
        <div>
          {rightColumn.map((benefit, i) => (
            <BenefitCell
              key={i}
              title={benefit.title}
              description={benefit.description}
              isLastRow={i === rightColumn.length - 1}
              imageIndex={i + 5}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
