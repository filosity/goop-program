"use client";

import { useState } from "react";
import {
  DollarSignCircle,
  GiftBox,
  DiscountTag,
  Bolt,
  DeliveryTruck,
  Headphones,
  User,
  Star,
  PresentBox,
  Gifts,
  XmarkCircle,
} from "@vectoricons/atlas-icons-react";

/* ─── Benefits data ─── */
const benefits = [
  {
    title: "10% cashback on all purchases",
    description:
      "Earn 10% back on every purchase as store credit, automatically applied to your account.",
  },
  {
    title: "Priority Direct With Concierge",
    description:
      "Get priority access to our dedicated concierge team for personalised product recommendations and styling advice.",
  },
  {
    title: "Birthday gift",
    description:
      "Receive a complimentary gift from our curated collection delivered to you during your birthday month.",
  },
  {
    title: "Member-only sales access",
    description:
      "Get early and exclusive access to seasonal sales events reserved only for loyalty members.",
  },
  {
    title: "Early access to new products",
    description:
      "Be the first to shop new product launches before they become available to the public.",
  },
  {
    title: "Free expedited shipping",
    description:
      "Upgraded shipping at no cost — receive your orders faster with complimentary expedited delivery.",
  },
  {
    title: "Exclusive quarterly gift",
    description:
      "Four times a year, receive a surprise luxury gift hand-selected by our beauty editors.",
  },
  {
    title: "Annual beauty consultation",
    description:
      "A one-on-one virtual session with our beauty experts to create a personalised skincare and beauty routine.",
  },
  {
    title: "VIP event invitations",
    description:
      "Receive invitations to exclusive in-person and virtual events, product launches, and masterclasses.",
  },
  {
    title: "Premium curated boxes",
    description:
      "Receive specially curated boxes featuring full-size products from our most coveted collections.",
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
  if (b.includes("cashback") || b.includes("earn"))
    return <DollarSignCircle size={size} color={color} />;
  if (b.includes("concierge"))
    return <Headphones size={size} color={color} />;
  if (b.includes("birthday")) return <GiftBox size={size} color={color} />;
  if (b.includes("sales")) return <DiscountTag size={size} color={color} />;
  if (b.includes("early access")) return <Bolt size={size} color={color} />;
  if (b.includes("shipping"))
    return <DeliveryTruck size={size} color={color} />;
  if (b.includes("quarterly"))
    return <PresentBox size={size} color={color} />;
  if (b.includes("consultation")) return <User size={size} color={color} />;
  if (b.includes("vip") || b.includes("event"))
    return <Star size={size} color={color} />;
  if (b.includes("curated") || b.includes("premium"))
    return <Gifts size={size} color={color} />;
  return <DollarSignCircle size={size} color={color} />;
}

/* ─── Benefit popup (dark theme — matches V1) ─── */
function BenefitPopup({
  title,
  description,
  onClose,
}: {
  title: string;
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
        animation: "v2OverlayIn 0.25s ease",
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
          animation: "v2PopupIn 0.3s ease",
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
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
          }
        >
          <XmarkCircle size={17} color="currentColor" />
        </button>

        {/* Icon */}
        <div style={{ marginBottom: "20px" }}>
          <BenefitIcon title={title} size={28} color="#ffffff" />
        </div>

        {/* Title */}
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
          {title}
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
        @keyframes v2OverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes v2PopupIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Single benefit row — click opens popup ─── */
function BenefitRow({
  title,
  isLast,
  dimmed,
  onHover,
  onLeave,
  onClick,
}: {
  title: string;
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
        padding: "24px 0",
        cursor: "pointer",
        position: "relative",
        opacity: dimmed ? 0.5 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0 }}>
        <BenefitIcon title={title} size={24} color="#ffffff" />
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
        {title}
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

/* ─── Main component ─── */
export default function MembershipV2() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
  const [sectionHovered, setSectionHovered] = useState(false);

  return (
    <section
      id="section-membership"
      onMouseEnter={() => setSectionHovered(true)}
      onMouseLeave={() => setSectionHovered(false)}
      style={{
        padding: "20px 48px 0px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          minHeight: "560px",
          overflow: "hidden",
        }}
      >
        {/* Video background */}
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

        {/* Black overlay — full width over video, darkens on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: sectionHovered
              ? "rgba(0,0,0,0.85)"
              : "rgba(0,0,0,0.65)",
            transition: "background-color 0.5s ease",
            zIndex: 1,
          }}
        />

        {/* Content — two columns over the overlays */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            minHeight: "560px",
          }}
        >
          {/* Left column — title, price, button */}
          <div
            style={{
              width: "50%",
              padding: "56px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
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
              Membership
            </h2>

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
              $75 / month
            </p>

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
                borderRadius: "40px",
                textDecoration: "none",
                lineHeight: 1,
                transition:
                  "background-color 0.2s ease, padding 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                overflow: "hidden",
              }}
            >
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
                  transition:
                    "margin-right 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
              join membership
            </a>
          </div>

          {/* Right column — benefits grid */}
          <div
            style={{
              width: "50%",
              padding: "48px 56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Section label */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: sectionHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
                margin: "0 0 24px 0",
                lineHeight: 1,
                transition: "color 0.5s ease",
              }}
            >
              Our most exclusive benefits
            </p>

            {/* Top divider */}
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
                columnGap: "48px",
              }}
            >
              {/* Left column */}
              <div>
                {benefits.slice(0, 5).map((b, i) => (
                  <BenefitRow
                    key={i}
                    title={b.title}
                    isLast={i === 4}
                    dimmed={hoveredBenefit !== null && hoveredBenefit !== i}
                    onHover={() => setHoveredBenefit(i)}
                    onLeave={() => setHoveredBenefit(null)}
                    onClick={() => setActiveBenefit(i)}
                  />
                ))}
              </div>
              {/* Right column */}
              <div>
                {benefits.slice(5).map((b, i) => (
                  <BenefitRow
                    key={i + 5}
                    title={b.title}
                    isLast={i === 4}
                    dimmed={
                      hoveredBenefit !== null && hoveredBenefit !== i + 5
                    }
                    onHover={() => setHoveredBenefit(i + 5)}
                    onLeave={() => setHoveredBenefit(null)}
                    onClick={() => setActiveBenefit(i + 5)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefit popup */}
      {activeBenefit !== null && (
        <BenefitPopup
          title={benefits[activeBenefit].title}
          description={benefits[activeBenefit].description}
          onClose={() => setActiveBenefit(null)}
        />
      )}
    </section>
  );
}
