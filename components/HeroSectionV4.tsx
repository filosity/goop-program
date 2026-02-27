"use client";

import { useState, useEffect, useRef } from "react";
import { DollarSignCircle, GiftBox, DiscountTag, Bolt, User, Star, Gifts, XmarkCircle } from "@vectoricons/atlas-icons-react";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ─── Tier popup data ─── */
const TIER_NAMES: Record<number, string> = { 0: "Tier 1", 1: "Tier 2", 2: "Tier 3", 3: "Tier 4" };

const heroTierData = [
  {
    name: "Tier 2",
    spend: "1–3 months subscribed",
    image: "/ag1-tier2.avif",
    benefits: [
      "Spend $150, Get $10",
      "Access to Exclusive Merch Store",
      "Access to Partner Offers",
      "$10 Birthday Reward",
    ],
  },
  {
    name: "Tier 3",
    spend: "4–11 months subscribed",
    image: "/ag1-tier3.avif",
    benefits: [
      "Spend $150, Get $15",
      "Access to Exclusive Merch Store",
      "Access to Partner Offers",
      "2X Referral Multiplier",
      "$15 Birthday Reward",
    ],
  },
  {
    name: "Tier 4",
    spend: "12+ months subscribed",
    image: "/ag1-tier4.avif",
    benefits: [
      "Spend $150, Get $20",
      "Access to Exclusive Merch Store",
      "Access to Premium Partner Offers",
      "3X Referral Multiplier",
      "$20 Birthday Reward",
      "Access to Focus Group",
      "Priority Customer Support",
      "Access to Exclusive Events",
    ],
  },
];

/* ─── Benefit icon for popup ─── */
function PopupBenefitIcon({ benefit }: { benefit: string }) {
  const s = 22;
  const b = benefit.toLowerCase();
  if (b.includes("spend") && b.includes("get"))
    return <DollarSignCircle size={s} color="currentColor" />;
  if (b.includes("birthday"))
    return <GiftBox size={s} color="currentColor" />;
  if (b.includes("merch"))
    return <Gifts size={s} color="currentColor" />;
  if (b.includes("partner"))
    return <DiscountTag size={s} color="currentColor" />;
  if (b.includes("referral"))
    return <User size={s} color="currentColor" />;
  if (b.includes("focus group"))
    return <User size={s} color="currentColor" />;
  if (b.includes("support"))
    return <Bolt size={s} color="currentColor" />;
  if (b.includes("event"))
    return <Star size={s} color="currentColor" />;
  return <DollarSignCircle size={s} color="currentColor" />;
}

/* ─── Tier benefits popup ─── */
function TierPopup({
  tier,
  onClose,
}: {
  tier: (typeof heroTierData)[0];
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
        animation: "v4PopupOverlay 0.25s ease",
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
          animation: "v4PopupCard 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
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
        <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
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
          <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
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
        <div style={{ padding: "20px 32px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {tier.benefits.map((benefit, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 0",
                  borderTop: i > 0 ? "1px solid #e5e2de" : "none",
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes v4PopupOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes v4PopupCard {
          from { opacity: 0; transform: scale(0.9) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Progress bar helpers ─── */
function getBarWidth(months: number): number {
  if (months >= 12) return 100;
  if (months >= 4) return 40 + ((months - 4) / 8) * 60;
  if (months >= 1) return 10 + ((months - 1) / 3) * 30;
  return months * 10;
}

function TierMilestone({
  label,
  position,
  tooltip,
  reached,
  align = "center",
  tierIndex,
  onOpenPopup,
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
  onHover: () => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => { setHovered(true); onHover(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
      onClick={(e) => { e.stopPropagation(); onOpenPopup(tierIndex); }}
      style={{
        position: "absolute",
        left: position,
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: reached ? "20px" : "12px",
          height: reached ? "20px" : "12px",
          borderRadius: "50%",
          backgroundColor: reached ? "#0C3D3D" : "#ffffff",
          border: reached || hovered ? "2px solid #0C3D3D" : "2px solid #cccccc",
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
      <span
        style={{
          position: "absolute",
          top: reached ? "24px" : "18px",
          ...(align === "right"
            ? { right: 0 }
            : { left: "50%", transform: "translateX(-50%)" }),
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          fontWeight: reached ? 600 : 400,
          color: "#000000",
          whiteSpace: "nowrap",
          transition: "opacity 0.2s ease, top 0.3s ease",
        }}
      >
        {label}
      </span>
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: reached ? "26px" : "22px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#0C3D3D",
            color: "#ffffff",
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 500,
            padding: "7px 12px 9px",
            whiteSpace: "nowrap",
            animation: "v4TooltipIn 0.2s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {reached ? (
            <span><span style={{ fontWeight: 700 }}>{label}</span> unlocked</span>
          ) : (
            <span>Subscribe <span style={{ fontWeight: 700 }}>{tooltip}</span> more to unlock</span>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── V4: V3 status card + V1 tier progress ─── */
export default function HeroSectionV4({ bgMode = "video" }: { bgMode?: "video" | "static" }) {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [userPoints, setUserPoints] = useState(5);
  const [totalMonths, setTotalMonths] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subBtnHovered, setSubBtnHovered] = useState(false);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const [openTier, setOpenTier] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const userTier = totalMonths >= 12 ? 3 : totalMonths >= 4 ? 2 : totalMonths >= 1 ? 1 : 0;
  const dollarValue = userPoints.toFixed(2);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            setTimeout(() => setBarWidth(getBarWidth(totalMonths)), 500);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onPoints = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) setUserPoints(detail.points);
    };
    const onSub = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.subscribed) setIsSubscribed(true);
      if (detail?.month !== undefined) {
        setTotalMonths(detail.month);
        setBarWidth(getBarWidth(detail.month));
      }
    };
    const onTier = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.tier !== undefined) {
        const newMonths = detail.tier >= 3 ? 12 : detail.tier >= 2 ? 4 : detail.tier >= 1 ? 1 : detail.months || 0;
        setTotalMonths(detail.months || newMonths);
        setBarWidth(getBarWidth(detail.months || newMonths));
      }
    };
    window.addEventListener("points-updated", onPoints);
    window.addEventListener("subscription-updated", onSub);
    window.addEventListener("tier-updated", onTier);
    return () => {
      window.removeEventListener("points-updated", onPoints);
      window.removeEventListener("subscription-updated", onSub);
      window.removeEventListener("tier-updated", onTier);
    };
  }, []);

  const handleHeroSubscribe = () => {
    setIsSubscribed(true);
    window.dispatchEvent(new CustomEvent("subscription-updated", { detail: { subscribed: true, days: 15, month: 1, source: "hero" } }));
  };

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
        @keyframes v4TooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Background */}
      {bgMode === "video" ? (
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
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <source src="/membership.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/background-header.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      )}

      {/* 30% black overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 0,
        }}
      />

      {/* Content wrapper — left aligned */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "24px 16px 24px 16px" : "48px 0 40px 48px",
          width: "100%",
          maxWidth: isMobile ? "100%" : "540px",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? "13px" : "16px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            color: "rgba(255, 255, 255, 0.85)",
            margin: "0 0 10px 0",
            lineHeight: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
          }}
        >
          AG1 rewards
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: isMobile ? "28px" : "38px",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#ffffff",
            margin: isMobile ? "0 0 24px 0" : "0 0 32px 0",
            letterSpacing: "-0.01em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s",
          }}
        >
          Welcome back, Bethany
        </h1>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* CARD 1: AG Credit Balance */}
          <div
            style={{
              backgroundColor: "#f5f3ef",
              padding: isMobile ? "24px 20px 24px" : "36px 40px 28px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {/* Section label */}
            <div style={{ display: "inline-block", marginBottom: "20px" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  margin: "0 0 10px 0",
                  lineHeight: 1,
                }}
              >
                AG Credit Balance
              </p>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#d5d5d5",
                }}
              />
            </div>

            {/* Dollar amount */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "32px",
                fontWeight: 400,
                lineHeight: 1,
                color: "#000000",
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em",
              }}
            >
              ${dollarValue}
            </p>

            {/* Redemption note — hidden after 90 days (3 months) */}
            {totalMonths < 3 && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#000000",
                  margin: "0 0 12px 0",
                  lineHeight: 1.4,
                }}
              >
                Redeemable for exclusive merch after 90 days
              </p>
            )}

            {/* Activity link */}
            <a
              href="#"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 400,
                color: "#1a1a1a",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "0.5px",
              }}
            >
              View Account Activity
            </a>

            {/* Divider + Subscribe / Subscribed */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#d4e0df",
                margin: "28px 0 16px",
              }}
            />
            {isSubscribed ? (
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#000000",
                    margin: "0 0 4px 0",
                    lineHeight: 1.4,
                  }}
                >
                  Member
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#000000",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Member since Feb 2026
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: isMobile ? "wrap" as const : "nowrap" as const, gap: isMobile ? "12px" : "0" }}>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#000000",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Non-member
                </p>
                <button
                  onClick={handleHeroSubscribe}
                  onMouseEnter={() => setSubBtnHovered(true)}
                  onMouseLeave={() => setSubBtnHovered(false)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: subBtnHovered ? "#000000" : "#ffffff",
                    backgroundColor: subBtnHovered ? "#46DE46" : "#0C3D3D",
                    border: "none",
                    minHeight: "40px",
                    padding: "0 24px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  Subscribe →
                </button>
              </div>
            )}
          </div>

          {/* CARD 2: Current Tier */}
          <div
            style={{
              backgroundColor: "#f5f3ef",
              padding: isMobile ? "24px 20px 32px" : "36px 40px 32px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {/* Section label */}
            <div style={{ display: "inline-block", marginBottom: "20px" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  margin: "0 0 10px 0",
                  lineHeight: 1,
                }}
              >
                Current Tier
              </p>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#d5d5d5",
                }}
              />
            </div>

            {/* Large tier name */}
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "32px",
                fontWeight: 400,
                lineHeight: 1,
                color: "#000000",
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em",
              }}
            >
              {TIER_NAMES[userTier]}
            </h2>

            {/* Member since */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 400,
                color: "#000000",
                margin: "0 0 36px 0",
                lineHeight: 1.4,
              }}
            >
              Member since <span style={{ fontWeight: 600 }}>Feb 2026</span>
            </p>

            {/* Progress bar with tier milestones */}
            <div
              style={{
                position: "relative",
                width: "94%",
                height: "3px",
                backgroundColor: "#e5e5e5",
                marginBottom: "28px",
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  backgroundColor: "#0C3D3D",
                  borderRadius: "2px",
                  transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />

              <TierMilestone
                label="Tier 2"
                position="10%"
                tooltip={`${Math.max(1 - totalMonths, 0)} months`}
                reached={userTier >= 1}
                tierIndex={0}
                onOpenPopup={setOpenTier}
                onHover={() => setHoveredMilestone(0)}
                onLeave={() => setHoveredMilestone(null)}
              />
              <TierMilestone
                label="Tier 3"
                position="40%"
                tooltip={`${Math.max(4 - totalMonths, 0)} months`}
                reached={userTier >= 2}
                tierIndex={1}
                onOpenPopup={setOpenTier}
                onHover={() => setHoveredMilestone(1)}
                onLeave={() => setHoveredMilestone(null)}
              />
              <TierMilestone
                label="Tier 4"
                position="100%"
                tooltip={`${Math.max(12 - totalMonths, 0)} months`}
                reached={userTier >= 3}
                align="right"
                tierIndex={2}
                onOpenPopup={setOpenTier}
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
          tier={heroTierData[openTier]}
          onClose={() => setOpenTier(null)}
        />
      )}
    </section>
  );
}
