"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { User, Instagram, Tiktok, Star, GiftBox, Phone, ShoppingBag, OpenBook, Headphones, ArrowLeft, ArrowRight, DiscountTag } from "@vectoricons/atlas-icons-react";

const earnCards = [
  {
    title: "Sign up for\na subscription",
    points: "+$2 AG Credit",
    icon: "user",
    action: null,
    image: "/earn10.jpg",
    input: null,
  },
  {
    title: "Be a Member\nfor 90 days",
    points: "+$5 AG Credit",
    icon: "star",
    action: null,
    image: "/earn1.jpg",
    input: null,
  },
  {
    title: "Be a Member\nfor 1 year",
    points: "+$10 AG Credit",
    icon: "star",
    action: null,
    image: "/earn2.jpg",
    input: null,
  },
  {
    title: "Connect\nInstagram",
    points: "+$1 AG Credit",
    icon: "instagram",
    action: "connect",
    image: "/earn3.jpg",
    input: "Your Instagram handle",
  },
  {
    title: "Connect\nTikTok",
    points: "+$1 AG Credit",
    icon: "tiktok",
    action: "connect",
    image: "/earn4.jpg",
    input: "Your TikTok handle",
  },
  {
    title: "Post IG/TikTok\nwith your AG1",
    points: "+$5 AG Credit",
    icon: "instagram",
    action: "connect",
    image: "/earn5.jpg",
    input: null,
  },
  {
    title: "Happy\nBirthday",
    points: "+$1 AG Credit",
    icon: "gift",
    action: "submit",
    image: "/earn6.jpg",
    input: "birthday",
  },
  {
    title: "Sign up\nfor SMS",
    points: "+$1 AG Credit",
    icon: "phone",
    action: "submit",
    image: "/earn7.jpg",
    input: "Your phone number",
  },
  {
    title: "Leave\na Review",
    points: "+$1 AG Credit",
    icon: "star",
    action: "review",
    image: "/earn8.jpg",
    input: null,
  },
];

function CardIcon({ type, size = 22 }: { type: string; size?: number }) {
  const s = size;
  switch (type) {
    case "user":
      return <User size={s} color="currentColor" />;
    case "instagram":
      return <Instagram size={s} color="currentColor" />;
    case "tiktok":
      return <Tiktok size={s} color="currentColor" />;
    case "star":
      return <Star size={s} color="currentColor" />;
    case "gift":
      return <GiftBox size={s} color="currentColor" />;
    case "phone":
      return <Phone size={s} color="currentColor" />;
    case "bag":
      return <ShoppingBag size={s} color="currentColor" />;
    case "book":
      return <OpenBook size={s} color="currentColor" />;
    case "headphones":
      return <Headphones size={s} color="currentColor" />;
    default:
      return null;
  }
}

/* ─── Single earn card (full-image style) ─── */
function EarnCard({
  card,
  index,
  completed,
  phase,
  onComplete,
  highlighted,
  anyHighlighted,
}: {
  card: (typeof earnCards)[0];
  index: number;
  completed: boolean;
  phase: "check" | "exit" | null;
  onComplete: () => void;
  highlighted: boolean;
  anyHighlighted: boolean;
}) {
  const isDone = completed;
  const isChecking = phase === "check";
  const isExiting = phase === "exit";
  const showOverlay = isDone || isChecking;
  const showInteraction = card.action && !isDone && !isChecking && !isExiting;
  const dimmed = anyHighlighted && !highlighted;

  return (
    <div
      data-earn-index={index}
      style={{
        minWidth: isExiting ? "0px" : "calc(25% - 12px)",
        maxWidth: isExiting ? "0px" : "calc(25% - 12px)",
        marginRight: isExiting ? "0px" : "16px",
        opacity: isExiting ? 0 : dimmed ? 0.5 : 1,
        transform: isExiting ? "scale(0.92)" : "scale(1)",
        transition: "min-width 0.45s cubic-bezier(0.4,0,0.2,1), max-width 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, transform 0.3s ease, margin-right 0.45s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          height: "480px",
          minWidth: "260px",
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        {/* Full bleed image */}
        <img
          src={card.image}
          alt={card.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            pointerEvents: "none",
          }}
        />

        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "65%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Pill — top left */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#0f2e2f",
            borderRadius: "999px",
            padding: "8px 16px",
            zIndex: 2,
          }}
        >
          <div style={{ color: "#ffffff", display: "flex", alignItems: "center" }}>
            <CardIcon type={card.icon} size={18} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            {isDone ? "completed" : (card.points || "required")}
          </span>
        </div>

        {/* Bottom content — over gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 18px 20px",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Title */}
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "24px",
              fontWeight: 400,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              whiteSpace: "pre-line",
            }}
          >
            {card.title}
          </p>

          {/* Input field */}
          {card.input && card.input !== "birthday" && showInteraction && (
            <input
              type="text"
              placeholder={card.input}
              className="earn-dark-input"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                padding: "8px 0",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.45)",
                backgroundColor: "transparent",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                outline: "none",
                transition: "border-color 0.3s ease, color 0.3s ease",
                marginBottom: "4px",
              }}
            />
          )}

          {/* Birthday MM/DD input */}
          {card.input === "birthday" && showInteraction && (
            <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
              <input
                type="text"
                placeholder="MM"
                className="earn-dark-input"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "48px",
                  padding: "8px 0",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.45)",
                  backgroundColor: "transparent",
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  textAlign: "center",
                  outline: "none",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}
              />
              <input
                type="text"
                placeholder="DD"
                className="earn-dark-input"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "48px",
                  padding: "8px 0",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.45)",
                  backgroundColor: "transparent",
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  textAlign: "center",
                  outline: "none",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}
              />
            </div>
          )}

          {/* Action button */}
          {showInteraction && (
            <button
              onClick={(e) => { e.stopPropagation(); onComplete(); }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.85)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#000000",
                backgroundColor: "#ffffff",
                border: "none",
                height: "38px",
                padding: "0 22px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                lineHeight: 1,
                alignSelf: "flex-start",
              }}
            >
              {card.action} →
            </button>
          )}
        </div>

        {/* Completion overlay — green checkmark like featured */}
        {showOverlay && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
              animation: isChecking ? "earnOverlayIn 0.3s ease forwards" : undefined,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12" cy="12" r="11"
                fill="#34c759"
                style={isChecking ? {
                  transformOrigin: "center",
                  transform: "scale(0)",
                  animation: "earnCircleScale 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                } : { transformOrigin: "center" }}
              />
              <path
                d="M7.5 12.5L10.5 15.5L16.5 9.5"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={isChecking ? {
                  strokeDasharray: 18,
                  strokeDashoffset: 18,
                  animation: "earnDrawCheck 0.35s ease 0.3s forwards",
                } : {}}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Redeem tab content ─── */
function RedeemContent({
  totalPoints,
  onPointsChange,
}: {
  totalPoints: number;
  onPointsChange: (newTotal: number) => void;
}) {
  const [sliderValue, setSliderValue] = useState(0);
  const [redeemHovered, setRedeemHovered] = useState(false);
  const [applyHovered, setApplyHovered] = useState(false);
  const [popup, setPopup] = useState<{
    phase: "in" | "counting" | "done" | "out";
    points: number;
    credit: string;
    displayPoints: number;
  } | null>(null);
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleRedeem = useCallback(() => {
    if (sliderValue <= 0 || popup) return;
    const redeemed = sliderValue;
    const credit = redeemed.toFixed(2);
    const newTotal = Math.round((totalPoints - redeemed) * 100) / 100;

    setPopup({ phase: "in", points: redeemed, credit, displayPoints: 0 });
    setSliderValue(0);
    onPointsChange(newTotal);

    // Phase: in → counting (after overlay fades in)
    setTimeout(() => {
      setPopup((p) => p ? { ...p, phase: "counting" } : null);

      // Animate the points counting up
      const steps = 30;
      const stepTime = 40;
      let step = 0;
      countRef.current = setInterval(() => {
        step++;
        const progress = step / steps;
        // Ease-out curve
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * redeemed * 100) / 100;
        setPopup((p) => p ? { ...p, displayPoints: current } : null);

        if (step >= steps) {
          if (countRef.current) clearInterval(countRef.current);
          setPopup((p) => p ? { ...p, displayPoints: redeemed, phase: "done" } : null);

          // Auto-close after pause
          setTimeout(() => {
            setPopup((p) => p ? { ...p, phase: "out" } : null);
            setTimeout(() => setPopup(null), 500);
          }, 2200);
        }
      }, stepTime);
    }, 400);
  }, [sliderValue, totalPoints, onPointsChange, popup]);

  const maxPoints = totalPoints;
  const dollarValue = sliderValue.toFixed(2);
  const fillPercent = maxPoints > 0 ? (sliderValue / maxPoints) * 100 : 0;

  return (
    <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "520px",
        width: "100%",
      }}
    >
      {/* Left column — white */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d4e0df",
          padding: "72px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#6b8a89",
            margin: "0 0 24px 0",
            lineHeight: 1,
          }}
        >
          exchange
        </span>

        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "32px",
            fontWeight: 400,
            color: "#000000",
            margin: "0 0 14px 0",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          Your AG Credit for a discount
        </p>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 400,
            color: "#6b8a89",
            margin: "0 0 36px 0",
            lineHeight: 1.6,
          }}
        >
          Use the slider to choose how many AG Credit to convert.
        </p>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "#d4e0df", margin: "0 0 28px 0" }} />

        {/* Available balance */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "0 0 28px 0" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#6b8a89",
              lineHeight: 1,
            }}
          >
            available
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "28px",
              fontWeight: 400,
              color: "#000000",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            ${totalPoints.toFixed(2)}
          </span>
        </div>

      </div>

      {/* Right column — beige */}
      <div
        style={{
          backgroundColor: "#f5f8f8",
          padding: "72px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          border: "1px solid #d4e0df",
          borderLeft: "none",
        }}
      >
        {/* Hero dollar value */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#6b8a89",
            margin: "0 0 16px 0",
            lineHeight: 1,
          }}
        >
          you receive
        </p>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "64px",
            fontWeight: 400,
            color: "#000000",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            transition: "opacity 0.2s ease",
            opacity: sliderValue > 0 ? 1 : 0.15,
          }}
        >
          ${dollarValue}
        </p>

        {/* Slider area */}
        <div
          style={{
            position: "relative",
            width: "100%",
            padding: "28px 0 0",
            marginTop: "40px",
          }}
        >
          {/* Floating pill */}
          <div
            style={{
              position: "absolute",
              top: "-2px",
              left: `calc(${fillPercent}% + ${9 - fillPercent * 0.18}px)`,
              transform: "translateX(-50%)",
              pointerEvents: "none",
              opacity: sliderValue > 0 ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          >
            <div
              style={{
                backgroundColor: "#0f2e2f",
                color: "#ffffff",
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: "999px",
                whiteSpace: "nowrap",
                lineHeight: 1,
                letterSpacing: "0.01em",
              }}
            >
              ${sliderValue.toFixed(2)}
            </div>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: "4px solid #000000",
                margin: "0 auto",
              }}
            />
          </div>

          <input
            type="range"
            min={0}
            max={maxPoints}
            step={0.01}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="redeem-slider"
            style={{ width: "100%", cursor: "pointer" }}
          />

          {/* Min/max */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "#b0ada8" }}>$0</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "#b0ada8" }}>${maxPoints.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "36px" }}>
          <button
            onClick={handleRedeem}
            onMouseEnter={() => setRedeemHovered(true)}
            onMouseLeave={() => setRedeemHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: redeemHovered ? "#1a4a4b" : "#0f2e2f",
              border: "none",
              height: "42px",
              padding: "0 28px",
              borderRadius: "999px",
              cursor: sliderValue > 0 ? "pointer" : "default",
              lineHeight: 1,
              transition: "background-color 0.2s ease, opacity 0.2s ease",
              opacity: sliderValue > 0 ? 1 : 0.35,
            }}
          >
            redeem →
          </button>

          <button
            onMouseEnter={() => setApplyHovered(true)}
            onMouseLeave={() => setApplyHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#000000",
              backgroundColor: applyHovered ? "rgba(0,0,0,0.04)" : "transparent",
              border: "1px solid #000000",
              height: "42px",
              padding: "0 28px",
              borderRadius: "999px",
              cursor: "pointer",
              lineHeight: 1,
              transition: "background-color 0.2s ease",
            }}
          >
            apply to subscription →
          </button>
        </div>

      </div>
    </div>

    {/* ─── Redeem success overlay ─── */}
    {popup && (
      <div
        onClick={() => {
          if (popup.phase !== "in") {
            setPopup({ ...popup, phase: "out" });
            setTimeout(() => setPopup(null), 500);
          }
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: popup.phase === "out" ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.6)",
          transition: "background-color 0.5s ease",
          animation: popup.phase === "in" ? "redeemOverlayIn 0.4s ease forwards" : undefined,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            backgroundColor: "#ffffff",
            padding: "64px 72px",
            minWidth: "440px",
            maxWidth: "480px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: popup.phase === "out" ? 0 : 1,
            transform: popup.phase === "out"
              ? "scale(0.97) translateY(10px)"
              : popup.phase === "in"
                ? undefined
                : "scale(1) translateY(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            animation: popup.phase === "in" ? "redeemCardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards" : undefined,
          }}
        >
          {/* Close button */}
          <button
            onClick={() => {
              setPopup({ ...popup, phase: "out" });
              setTimeout(() => setPopup(null), 500);
            }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.3,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.3"; }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Checkmark circle */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "#0f2e2f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "32px",
              animation: popup.phase !== "out" ? "redeemCirclePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both" : undefined,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path
                d="M8 15.5L13 20.5L22 11.5"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 28,
                  strokeDashoffset: 28,
                  animation: popup.phase !== "out" ? "redeemCheckDraw 0.4s ease 0.55s forwards" : undefined,
                }}
              />
            </svg>
          </div>

          {/* Title */}
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "32px",
              fontWeight: 400,
              color: "#000000",
              margin: "0 0 10px 0",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              animation: popup.phase !== "out" ? "redeemTextUp 0.4s ease 0.3s both" : undefined,
            }}
          >
            AG Credit redeemed
          </p>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 400,
              color: "#6b8a89",
              margin: "0 0 40px 0",
              lineHeight: 1.5,
              animation: popup.phase !== "out" ? "redeemTextUp 0.4s ease 0.4s both" : undefined,
            }}
          >
            Your AG Credit has been applied.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              width: "100%",
              padding: "28px 0",
              marginBottom: "32px",
              animation: popup.phase !== "out" ? "redeemTextUp 0.4s ease 0.5s both" : undefined,
            }}
          >
            {/* Points */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#aaaaaa",
                  margin: "0 0 10px 0",
                  lineHeight: 1,
                }}
              >
                AG Credit
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "40px",
                  fontWeight: 400,
                  color: "#000000",
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                ${popup.displayPoints.toFixed(2)}
              </p>
            </div>

            {/* Arrow */}
            <svg
              width="32"
              height="12"
              viewBox="0 0 32 12"
              fill="none"
              style={{ opacity: 0.25, flexShrink: 0 }}
            >
              <line x1="0" y1="6" x2="26" y2="6" stroke="#000000" strokeWidth="1" />
              <polyline points="24,2 28,6 24,10" stroke="#000000" strokeWidth="1" fill="none" />
            </svg>

            {/* Credit */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#aaaaaa",
                  margin: "0 0 10px 0",
                  lineHeight: 1,
                }}
              >
                redeemed
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "40px",
                  fontWeight: 400,
                  color: "#000000",
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                ${popup.credit}
              </p>
            </div>
          </div>

          {/* New balance */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              width: "100%",
              animation: popup.phase !== "out" ? "redeemTextUp 0.4s ease 0.6s both" : undefined,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#aaaaaa",
                lineHeight: 1,
              }}
            >
              new balance
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "24px",
                fontWeight: 400,
                color: "#000000",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              ${totalPoints.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    )}

    <style>{`
      .redeem-slider {
        -webkit-appearance: none;
        appearance: none;
        height: 2px;
        background: linear-gradient(
          to right,
          #000000 0%,
          #000000 ${fillPercent}%,
          #dddad6 ${fillPercent}%,
          #dddad6 100%
        );
        outline: none;
        border: none;
        border-radius: 1px;
      }
      .redeem-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #000000;
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
      }
      .redeem-slider::-webkit-slider-thumb:hover {
        transform: scale(1.3);
        box-shadow: 0 3px 12px rgba(0,0,0,0.25);
      }
      .redeem-slider::-webkit-slider-thumb:active {
        transform: scale(1.15);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      }
      .redeem-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #000000;
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
      .redeem-slider::-moz-range-track {
        height: 2px;
        background: #dddad6;
        border: none;
        border-radius: 1px;
      }
      .redeem-slider::-moz-range-progress {
        height: 2px;
        background: #000000;
        border: none;
      }
      @keyframes redeemOverlayIn {
        from { background-color: rgba(0,0,0,0); }
        to { background-color: rgba(0,0,0,0.6); }
      }
      @keyframes redeemCardIn {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes redeemCirclePop {
        0% { transform: scale(0); opacity: 0; }
        70% { transform: scale(1.08); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes redeemCheckDraw {
        to { stroke-dashoffset: 0; }
      }
      @keyframes redeemTextUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
    </>
  );
}

/* ─── Free products data ─── */
const freeProducts = [
  { name: "AG1 Puffer Jacket", points: 30, image: "/featured1.jpg", tierRequired: null, discount: null as string | null },
  { name: "AG1 Pajamas", points: 20, image: "/featured2.jpg", tierRequired: null, discount: null as string | null },
  { name: "AG1 Stanley Cup", points: 10, image: "/featured3.jpg", tierRequired: null, discount: null },
  { name: "AG1 Travel Packs (30ct)", points: 15, image: "/product-travelpacks-original.jpg", tierRequired: null, discount: null },
  { name: "AG1 Travel Packs Chocolate", points: 15, image: "/product-travelpacks-chocolate.jpg", tierRequired: null, discount: null },
  { name: "AG1 Shaker Bottle", points: 8, image: "/featured4.jpg", tierRequired: null, discount: null },
  { name: "AG1 Duffel Bag", points: 12, image: "/earn3.jpg", tierRequired: null, discount: null },
  { name: "AG1 Sweatshirt", points: 18, image: "/earn5.jpg", tierRequired: null, discount: null },
  { name: "AG1 Hat", points: 10, image: "/earn7.jpg", tierRequired: null, discount: null },
  { name: "AG1 D3+K2", points: 12, image: "/product-d3k2.jpg", tierRequired: null, discount: null },
  { name: "AG1 Omega-3", points: 14, image: "/product-omega3.jpg", tierRequired: null, discount: null },
];

/* ─── Free products tab content (carousel) ─── */
function FreeProductsContent({
  totalPoints,
  onPointsChange,
  currentTier,
}: {
  totalPoints: number;
  onPointsChange: (newTotal: number) => void;
  currentTier: number;
}) {
  const [phases, setPhases] = useState<Record<number, "idle" | "loading" | "check" | "done">>(
    () => Object.fromEntries(freeProducts.map((_, i) => [i, "idle"]))
  );
  const [leftArrowHovered, setLeftArrowHovered] = useState(false);
  const [rightArrowHovered, setRightArrowHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = carouselRef.current;
    if (!el) return;
    e.preventDefault();
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.scrollBehavior = "auto";
    el.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = carouselRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    el.scrollLeft = dragScrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    const el = carouselRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
      el.style.cursor = "grab";
    }
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
  };

  const handleRedeem = (index: number, cost: number) => {
    if (totalPoints < cost) return;
    if (phases[index] !== "idle") return;

    setPhases((p) => ({ ...p, [index]: "loading" }));
    onPointsChange(totalPoints - cost);

    setTimeout(() => {
      setPhases((p) => ({ ...p, [index]: "check" }));
      setTimeout(() => {
        setPhases((p) => ({ ...p, [index]: "idle" }));
      }, 1000);
    }, 1200);
  };

  return (
    <>
      <div
        ref={carouselRef}
        data-products-carousel=""
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
          userSelect: "none",
          paddingBottom: "4px",
        }}
      >
        {freeProducts.map((product, i) => {
          const isLocked = product.tierRequired !== null && currentTier < product.tierRequired - 1;
          const canAfford = totalPoints >= product.points;
          const phase = phases[i];
          const isCircle = phase === "loading" || phase === "check";

          return (
            <div
              key={i}
              style={{
                position: "relative",
                minWidth: "calc(34% - 10px)",
                maxWidth: "calc(34% - 10px)",
                height: "480px",
                flexShrink: 0,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #d4e0df",
                transition: "box-shadow 0.3s ease",
              }}
            >
              {/* Product image — top */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  overflow: "hidden",
                  backgroundColor: "#f0f5f5",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
                {/* Discount badge */}
                {product.discount && !isLocked && (
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      backgroundColor: "#0f2e2f",
                      borderRadius: "999px",
                      padding: "10px 18px",
                      zIndex: 2,
                    }}
                  >
                    <DiscountTag size={18} color="#ffffff" />
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#ffffff",
                        lineHeight: 1,
                      }}
                    >
                      {product.discount}
                    </span>
                  </div>
                )}
                {/* Free product badge */}
                {!product.discount && !isLocked && (
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      backgroundColor: "#0f2e2f",
                      borderRadius: "999px",
                      padding: "10px 18px",
                      zIndex: 2,
                    }}
                  >
                    <GiftBox size={18} color="#ffffff" />
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#ffffff",
                        lineHeight: 1,
                      }}
                    >
                      free product
                    </span>
                  </div>
                )}
                {/* Lock overlay */}
                {isLocked && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Tier {product.tierRequired} required
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom row — title/points left, redeem right */}
              <div
                style={{
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  borderTop: "1px solid #f0eeeb",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "19px",
                      fontWeight: 400,
                      color: "#000000",
                      margin: 0,
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {product.discount ? `${product.discount} ${product.name}` : product.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#6b8a89",
                      margin: "6px 0 0 0",
                      lineHeight: 1,
                    }}
                  >
                    ${product.points} AG Credit
                  </p>
                </div>

                {/* Redeem button */}
                {!isLocked && (
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <button
                      onClick={() => canAfford && phase === "idle" && handleRedeem(i, product.points)}
                      onMouseEnter={(e) => {
                        if (!canAfford && phase === "idle") {
                          const tip = e.currentTarget.parentElement?.querySelector("[data-tooltip]") as HTMLElement;
                          if (tip) { tip.style.opacity = "1"; tip.style.transform = "translateX(-50%) translateY(0)"; }
                        }
                      }}
                      onMouseLeave={(e) => {
                        const tip = e.currentTarget.parentElement?.querySelector("[data-tooltip]") as HTMLElement;
                        if (tip) { tip.style.opacity = "0"; tip.style.transform = "translateX(-50%) translateY(4px)"; }
                      }}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 600,
                        lineHeight: 1,
                        height: "38px",
                        borderRadius: isCircle ? "50%" : "999px",
                        width: isCircle ? "38px" : "auto",
                        padding: isCircle ? "0" : "0 22px",
                        border: canAfford || phase !== "idle" ? "1px solid #000000" : "1px solid #d5d2ce",
                        cursor: !canAfford || phase !== "idle" ? "default" : "pointer",
                        backgroundColor: canAfford || phase !== "idle" ? "#0f2e2f" : "transparent",
                        color: canAfford || phase !== "idle" ? "#ffffff" : "#000000",
                        opacity: !canAfford && phase === "idle" ? 0.3 : 1,
                        transition: "border-radius 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, background-color 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {phase === "idle" && <span>redeem →</span>}
                      {phase === "loading" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: "redeemSpin 0.8s linear infinite" }}>
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      )}
                      {phase === "check" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: "redeemCheckPop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
                          <path
                            d="M6 12.5l4 4 8-9"
                            stroke="#ffffff"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              strokeDasharray: 24,
                              strokeDashoffset: 24,
                              animation: "redeemDrawCheck 0.4s ease 0.1s forwards",
                            }}
                          />
                        </svg>
                      )}
                    </button>
                    {/* Tooltip for insufficient points */}
                    {!canAfford && phase === "idle" && (
                      <div
                        data-tooltip=""
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%) translateY(4px)",
                          backgroundColor: "#0f2e2f",
                          color: "#ffffff",
                          fontFamily: "var(--font-sans)",
                          fontSize: "11px",
                          fontWeight: 500,
                          padding: "6px 12px",
                          borderRadius: "6px",
                          whiteSpace: "nowrap",
                          lineHeight: 1,
                          opacity: 0,
                          pointerEvents: "none",
                          transition: "opacity 0.2s ease, transform 0.2s ease",
                        }}
                      >
                        need ${(product.points - totalPoints).toFixed(2)} more AG Credit
                        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #000000" }} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel arrows */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
        <button
          onClick={() => { if (carouselRef.current) carouselRef.current.scrollBy({ left: -500, behavior: "smooth" }); }}
          onMouseEnter={() => setLeftArrowHovered(true)}
          onMouseLeave={() => setLeftArrowHovered(false)}
          aria-label="Previous"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: leftArrowHovered ? "1px solid #000000" : "1px solid #d8d5d0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s ease",
          }}
        >
          <ArrowLeft size={12} color="#000000" />
        </button>
        <button
          onClick={() => { if (carouselRef.current) carouselRef.current.scrollBy({ left: 500, behavior: "smooth" }); }}
          onMouseEnter={() => setRightArrowHovered(true)}
          onMouseLeave={() => setRightArrowHovered(false)}
          aria-label="Next"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: rightArrowHovered ? "1px solid #000000" : "1px solid #d8d5d0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s ease",
          }}
        >
          <ArrowRight size={12} color="#000000" />
        </button>
      </div>

      <style>{`
        [data-products-carousel]::-webkit-scrollbar { display: none; }
        [data-products-carousel] * { -webkit-user-drag: none; user-drag: none; }
        [data-products-carousel] img { pointer-events: none; }
      `}</style>
    </>
  );
}

/* ─── Upload Receipt tab content ─── */
type UploadPhase = "idle" | "selected" | "uploading" | "success";

function UploadReceiptContent() {
  const [phase, setPhase] = useState<UploadPhase>("idle");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dropHovered, setDropHovered] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [removeHovered, setRemoveHovered] = useState(false);
  const [newUploadHovered, setNewUploadHovered] = useState(false);
  const [historyHovered, setHistoryHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = useCallback((file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/heic", "application/pdf"];
    const maxSize = 10 * 1024 * 1024;
    if (!validTypes.includes(file.type) && !file.name.endsWith(".heic")) return;
    if (file.size > maxSize) return;
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
    setPhase("selected");
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    e.target.value = "";
  }, [handleFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleSubmit = useCallback(() => {
    if (phase !== "selected") return;
    setPhase("uploading");
    setUploadProgress(0);
    let progress = 0;
    progressRef.current = setInterval(() => {
      const increment = progress < 30 ? 4 : progress < 70 ? 1.5 : progress < 90 ? 3 : 5;
      progress = Math.min(progress + increment + Math.random() * 2, 100);
      setUploadProgress(progress);
      if (progress >= 100) {
        if (progressRef.current) clearInterval(progressRef.current);
        setTimeout(() => setPhase("success"), 400);
      }
    }, 80);
  }, [phase]);

  const handleReset = useCallback(() => {
    setPhase("idle");
    setFileName("");
    setFileSize("");
    setUploadProgress(0);
  }, []);

  return (
    <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "480px",
        width: "100%",
      }}
    >
      {/* Left — content */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d4e0df",
          padding: "64px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {phase === "idle" && (
          <>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#6b8a89",
                margin: "0 0 20px 0",
                lineHeight: 1,
              }}
            >
              earn AG Credit
            </span>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "32px",
                fontWeight: 400,
                color: "#000000",
                margin: "0 0 14px 0",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Upload your receipt
            </p>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6b8a89",
                margin: "0 0 32px 0",
                lineHeight: 1.6,
              }}
            >
              Make a photo or scan of your receipt and upload.
              <br />
              10% cashback on all purchases.
            </p>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={() => setDropHovered(true)}
              onMouseLeave={() => setDropHovered(false)}
              style={{
                border: `1.5px dashed ${dragOver ? "#000000" : "#d5d2ce"}`,
                borderRadius: 0,
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: dragOver ? "rgba(0,0,0,0.02)" : dropHovered ? "#faf9f7" : "transparent",
                transition: "border-color 0.25s ease, background-color 0.25s ease",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#0f2e2f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  transition: "transform 0.25s ease",
                  transform: dragOver ? "scale(1.08)" : "scale(1)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 14V3M10 3L6 7M10 3L14 7" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 13V15C3 16.1046 3.89543 17 5 17H15C16.1046 17 17 16.1046 17 15V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "#000000", margin: "0 0 6px 0", lineHeight: 1 }}>
                Drop your receipt here or{" "}
                <span style={{ textDecoration: "underline", textUnderlineOffset: "2px" }}>browse</span>
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400, color: "#aaaaaa", margin: 0, lineHeight: 1 }}>
                JPG, PNG, HEIC, PDF &middot; Max 10MB
              </p>
            </div>

            <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.heic,.pdf" onChange={handleInputChange} style={{ display: "none" }} />
          </>
        )}

        {phase === "selected" && (
          <>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b8a89", margin: "0 0 20px 0", lineHeight: 1 }}>
              review &amp; submit
            </span>

            <p style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 400, color: "#000000", margin: "0 0 14px 0", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              Upload your receipt
            </p>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "#6b8a89", margin: "0 0 32px 0", lineHeight: 1.6 }}>
              Make a photo or scan of your receipt and upload.
            </p>

            {/* File chip */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", border: "1px solid #d4e0df", borderRadius: "10px", marginBottom: "12px", backgroundColor: "#faf9f7" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#0f2e2f", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M9 1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 1V5H13" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "#000000", margin: 0, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fileName}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400, color: "#aaaaaa", margin: "3px 0 0 0", lineHeight: 1 }}>{fileSize}</p>
              </div>
              <button
                onClick={handleReset}
                onMouseEnter={() => setRemoveHovered(true)}
                onMouseLeave={() => setRemoveHovered(false)}
                aria-label="Remove file"
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center", opacity: removeHovered ? 1 : 0.4, transition: "opacity 0.2s ease" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M12 4L4 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400, color: "#bbbbbb", margin: "0 0 28px 0", lineHeight: 1 }}>
              Accepted: JPG, PNG, HEIC, PDF &middot; Max 10MB
            </p>

            <button
              onClick={handleSubmit}
              onMouseEnter={() => setSubmitHovered(true)}
              onMouseLeave={() => setSubmitHovered(false)}
              style={{ alignSelf: "flex-start", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#ffffff", backgroundColor: submitHovered ? "#1a4a4b" : "#0f2e2f", border: "none", height: "42px", padding: "0 32px", borderRadius: "999px", cursor: "pointer", lineHeight: 1, transition: "background-color 0.2s ease" }}
            >
              submit receipt →
            </button>
          </>
        )}

        {phase === "uploading" && (
          <>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b8a89", margin: "0 0 20px 0", lineHeight: 1 }}>
              uploading
            </span>

            <p style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 400, color: "#000000", margin: "0 0 14px 0", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              Processing your receipt
            </p>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "#6b8a89", margin: "0 0 36px 0", lineHeight: 1.6 }}>
              Please wait while we verify your receipt.
            </p>

            <div style={{ padding: "14px 18px", border: "1px solid #d4e0df", borderRadius: "10px", marginBottom: "20px", backgroundColor: "#faf9f7", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#0f2e2f", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M9 1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 1V5H13" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "#000000", margin: 0, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fileName}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400, color: "#aaaaaa", margin: "3px 0 0 0", lineHeight: 1 }}>{fileSize}</p>
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#000000", flexShrink: 0 }}>
                  {Math.round(uploadProgress)}%
                </span>
              </div>
              <div style={{ height: "2px", backgroundColor: "#d4e0df", borderRadius: "1px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${uploadProgress}%`, backgroundColor: "#0f2e2f", borderRadius: "1px", transition: "width 0.15s ease-out" }} />
              </div>
            </div>
          </>
        )}

        {phase === "success" && (
          <>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b8a89", margin: "0 0 20px 0", lineHeight: 1 }}>
              complete
            </span>

            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "#0f2e2f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                animation: "receiptCheckScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 12.5L10 16.5L18 8.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 24, strokeDashoffset: 24, animation: "receiptDrawCheck 0.4s ease 0.3s forwards" }} />
              </svg>
            </div>

            <p style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 400, color: "#000000", margin: "0 0 14px 0", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              Thank you
            </p>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "#6b8a89", margin: "0 0 32px 0", lineHeight: 1.6 }}>
              Once the verification process is finished your AG Credit will be added to your account. You can follow the status in your Rewards History.
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleReset}
                onMouseEnter={() => setNewUploadHovered(true)}
                onMouseLeave={() => setNewUploadHovered(false)}
                style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#ffffff", backgroundColor: newUploadHovered ? "#1a4a4b" : "#0f2e2f", border: "none", height: "42px", padding: "0 28px", borderRadius: "999px", cursor: "pointer", lineHeight: 1, transition: "background-color 0.2s ease" }}
              >
                upload another →
              </button>
              <button
                onMouseEnter={() => setHistoryHovered(true)}
                onMouseLeave={() => setHistoryHovered(false)}
                style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#000000", backgroundColor: historyHovered ? "rgba(0,0,0,0.04)" : "transparent", border: "1px solid #000000", height: "42px", padding: "0 28px", borderRadius: "999px", cursor: "pointer", lineHeight: 1, transition: "background-color 0.2s ease" }}
              >
                view history →
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right — product image */}
      <div style={{ position: "relative", overflow: "hidden", border: "1px solid #d4e0df", borderLeft: "none" }}>
        <img src="/featured2.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.03) 0%, transparent 60%)" }} />
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#000000",
            color: "#ffffff",
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            padding: "10px 18px",
            borderRadius: "999px",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L8.8 4.6L12.8 5.2L9.9 8L10.6 12L7 10.1L3.4 12L4.1 8L1.2 5.2L5.2 4.6L7 1Z" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          10% cashback on all purchases
        </div>
      </div>
    </div>

    <style>{`
      @keyframes receiptCheckScale {
        0% { transform: scale(0); opacity: 0; }
        60% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes receiptDrawCheck {
        to { stroke-dashoffset: 0; }
      }
    `}</style>
    </>
  );
}

export default function WaysToEarn() {
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set([0]));
  const [animPhase, setAnimPhase] = useState<{ index: number; phase: "check" | "exit" } | null>(null);
  const [highlightedCards, setHighlightedCards] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<"earn" | "exchange" | "products" | "upload">("earn");
  const [earnTabHovered, setEarnTabHovered] = useState(false);
  const [exchangeTabHovered, setExchangeTabHovered] = useState(false);
  const [productsTabHovered, setProductsTabHovered] = useState(false);
  const [uploadTabHovered, setUploadTabHovered] = useState(false);
  const [earnLeftHovered, setEarnLeftHovered] = useState(false);
  const [earnRightHovered, setEarnRightHovered] = useState(false);
  const earnCarouselRef = useRef<HTMLDivElement>(null);
  const earnDragging = useRef(false);
  const earnDragStartX = useRef(0);
  const earnDragScrollLeft = useRef(0);
  const earnHasDragged = useRef(false);

  const earnMouseDown = useCallback((e: React.MouseEvent) => {
    const el = earnCarouselRef.current;
    if (!el) return;
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") return;
    e.preventDefault();
    earnDragging.current = true;
    earnHasDragged.current = false;
    earnDragStartX.current = e.pageX - el.offsetLeft;
    earnDragScrollLeft.current = el.scrollLeft;
    el.style.scrollBehavior = "auto";
    el.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
  }, []);

  const earnMouseMove = useCallback((e: React.MouseEvent) => {
    if (!earnDragging.current) return;
    e.preventDefault();
    const el = earnCarouselRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - earnDragStartX.current) * 1.5;
    if (Math.abs(walk) > 5) earnHasDragged.current = true;
    el.scrollLeft = earnDragScrollLeft.current - walk;
  }, []);

  const earnMouseUp = useCallback(() => {
    earnDragging.current = false;
    const el = earnCarouselRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
      el.style.cursor = "grab";
    }
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
  }, []);
  const [totalPoints, setTotalPoints] = useState(5);
  const [currentTier, setCurrentTier] = useState(0);

  useEffect(() => {
    const handler = () => {
      setHighlightedCards(new Set([3, 4]));
      setTimeout(() => setHighlightedCards(new Set()), 2000);
      // Scroll carousel so both handle cards (index 3 & 4) are visible
      setTimeout(() => {
        const carousel = document.querySelector('[data-earn-carousel]') as HTMLElement;
        if (carousel) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        }
      }, 500);
    };
    const activateEarn = () => setActiveTab("earn");
    const pointsHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) setTotalPoints(detail.points);
    };
    const tierHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.tier !== undefined) setCurrentTier(detail.tier);
    };
    const spendHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.spend !== undefined) {
        const newTier = detail.spend >= 500 ? 3 : detail.spend >= 300 ? 2 : detail.spend >= 100 ? 1 : 0;
        setCurrentTier(newTier);
      }
    };
    window.addEventListener("highlight-earn-handles", handler);
    window.addEventListener("activate-earn-tab", activateEarn);
    window.addEventListener("points-updated", pointsHandler);
    window.addEventListener("tier-updated", tierHandler);
    window.addEventListener("spend-updated", spendHandler);
    return () => {
      window.removeEventListener("highlight-earn-handles", handler);
      window.removeEventListener("activate-earn-tab", activateEarn);
      window.removeEventListener("points-updated", pointsHandler);
      window.removeEventListener("tier-updated", tierHandler);
      window.removeEventListener("spend-updated", spendHandler);
    };
  }, []);

  const handlePointsChange = useCallback((newTotal: number) => {
    setTotalPoints(newTotal);
    // Only update AG Credit balance — tier is based on spend, not AG Credit balance
    window.dispatchEvent(new CustomEvent("points-updated", { detail: { points: newTotal } }));
  }, []);

  const switchTab = useCallback((tab: "earn" | "exchange" | "products" | "upload") => {
    setActiveTab(tab);
    const el = document.getElementById("section-ways-to-earn");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 76 - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleComplete = useCallback((index: number) => {
    if (completedCards.has(index) || animPhase !== null) return;
    setAnimPhase({ index, phase: "check" });
    setTimeout(() => {
      setAnimPhase({ index, phase: "exit" });
      setTimeout(() => {
        setAnimPhase(null);
        const next = new Set(completedCards).add(index);
        setCompletedCards(next);
        // Add AG Credit from this card
        const card = earnCards[index];
        if (card?.points) {
          const match = card.points.match(/\+\$(\d+(?:\.\d+)?)/);
          if (match) {
            const dollars = parseFloat(match[1]);
            setTotalPoints(prev => {
              const newTotal = Math.round((prev + dollars) * 100) / 100;
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent("points-updated", { detail: { points: newTotal } }));
              }, 0);
              return newTotal;
            });
          }
        }
        // Notify Sweepstakes when both handles (index 3 & 4) are connected
        if (next.has(3) && next.has(4)) {
          window.dispatchEvent(new Event("handles-connected"));
        }
      }, 500);
    }, 900);
  }, [completedCards, animPhase]);

  // Progress: total cards and completed count
  const earnableCards = earnCards.length;
  const earnedCount = completedCards.size;

  return (
    <section
      id="section-ways-to-earn"
      style={{
        padding: "0px 48px 100px",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "44px",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "#000000",
          textAlign: "center",
          margin: "0 0 12px 0",
          letterSpacing: "-0.01em",
        }}
      >
        AG Credit
      </h2>

      {/* Subtext */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 400,
          color: "#6b8a89",
          textAlign: "center",
          margin: "0 0 40px 0",
          lineHeight: 1.4,
        }}
      >
        {activeTab === "earn" && "Follow us on social media, sign up for SMS and more."}
        {activeTab === "exchange" && "Exchange your AG Credit for a discount."}
        {activeTab === "products" && "Redeem your AG Credit for free products."}
        {activeTab === "upload" && "Upload your receipt and earn AG Credit for every dollar spent."}
      </p>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Tab buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "32px",
          }}
        >
          <button
            onClick={() => switchTab("earn")}
            onMouseEnter={() => setEarnTabHovered(true)}
            onMouseLeave={() => setEarnTabHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "earn" ? "#0f2e2f" : "transparent",
              color: activeTab === "earn" ? "#ffffff" : "#000000",
              border: activeTab === "earn" ? "1px solid #000000" : earnTabHovered ? "1px solid #000000" : "1px solid #d5d5d5",
            }}
          >
            ways to earn{" "}
            <span
              style={{
                fontWeight: 400,
                color: activeTab === "earn" ? "rgba(255,255,255,0.45)" : "#aaaaaa",
                marginLeft: "6px",
              }}
            >
              (<span style={{ fontWeight: 600, color: activeTab === "earn" ? "rgba(255,255,255,0.45)" : "#aaaaaa" }}>{earnedCount}</span>/{earnableCards})
            </span>
          </button>

          <button
            onClick={() => switchTab("exchange")}
            onMouseEnter={() => setExchangeTabHovered(true)}
            onMouseLeave={() => setExchangeTabHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "exchange" ? "#0f2e2f" : "transparent",
              color: activeTab === "exchange" ? "#ffffff" : "#000000",
              border: activeTab === "exchange" ? "1px solid #000000" : exchangeTabHovered ? "1px solid #000000" : "1px solid #d5d5d5",
            }}
          >
            exchange AG Credit
          </button>

          <button
            onClick={() => switchTab("products")}
            onMouseEnter={() => setProductsTabHovered(true)}
            onMouseLeave={() => setProductsTabHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "products" ? "#0f2e2f" : "transparent",
              color: activeTab === "products" ? "#ffffff" : "#000000",
              border: activeTab === "products" ? "1px solid #000000" : productsTabHovered ? "1px solid #000000" : "1px solid #d5d5d5",
            }}
          >
            free products
          </button>

          <button
            onClick={() => switchTab("upload")}
            onMouseEnter={() => setUploadTabHovered(true)}
            onMouseLeave={() => setUploadTabHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "upload" ? "#0f2e2f" : "transparent",
              color: activeTab === "upload" ? "#ffffff" : "#000000",
              border: activeTab === "upload" ? "1px solid #000000" : uploadTabHovered ? "1px solid #000000" : "1px solid #d5d5d5",
            }}
          >
            upload receipt
          </button>
        </div>

        {/* ═══ EARN TAB ═══ */}
        {activeTab === "earn" && (
          <>
            <div
              ref={earnCarouselRef}
              data-earn-carousel=""
              onMouseDown={earnMouseDown}
              onMouseMove={earnMouseMove}
              onMouseUp={earnMouseUp}
              onMouseLeave={earnMouseUp}
              style={{
                display: "flex",
                overflowX: "auto",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                cursor: "grab",
                userSelect: "none",
                paddingBottom: "4px",
              }}
            >
              {[...earnCards.map((card, i) => ({ card, i }))].sort((a, b) => {
                const aDone = completedCards.has(a.i) && animPhase?.index !== a.i;
                const bDone = completedCards.has(b.i) && animPhase?.index !== b.i;
                if (aDone === bDone) return 0;
                return aDone ? 1 : -1;
              }).map(({ card, i }) => (
                  <EarnCard
                    key={i}
                    card={card}
                    index={i}
                    completed={completedCards.has(i)}
                    phase={animPhase?.index === i ? animPhase.phase : null}
                    onComplete={() => handleComplete(i)}
                    highlighted={highlightedCards.has(i)}
                    anyHighlighted={highlightedCards.size > 0}
                  />
                ))}
            </div>

            {/* Carousel arrows */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
              <button
                onClick={() => { if (earnCarouselRef.current) earnCarouselRef.current.scrollBy({ left: -400, behavior: "smooth" }); }}
                onMouseEnter={() => setEarnLeftHovered(true)}
                onMouseLeave={() => setEarnLeftHovered(false)}
                aria-label="Previous"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  border: earnLeftHovered ? "1px solid #000000" : "1px solid #d8d5d0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s ease",
                }}
              >
                <ArrowLeft size={12} color="#000000" />
              </button>
              <button
                onClick={() => { if (earnCarouselRef.current) earnCarouselRef.current.scrollBy({ left: 400, behavior: "smooth" }); }}
                onMouseEnter={() => setEarnRightHovered(true)}
                onMouseLeave={() => setEarnRightHovered(false)}
                aria-label="Next"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  border: earnRightHovered ? "1px solid #000000" : "1px solid #d8d5d0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s ease",
                }}
              >
                <ArrowRight size={12} color="#000000" />
              </button>
            </div>

            <style>{`
              [data-earn-carousel]::-webkit-scrollbar { display: none; }
              [data-earn-carousel] * { -webkit-user-drag: none; user-drag: none; }
              [data-earn-carousel] img { pointer-events: none; }
              .earn-dark-input::placeholder {
                color: rgba(255,255,255,0.5);
                transition: color 0.3s ease;
              }
              .earn-dark-input:focus {
                border-bottom-color: #ffffff !important;
                color: #ffffff !important;
              }
              .earn-dark-input:focus::placeholder {
                color: rgba(255,255,255,0.5);
              }
            `}</style>
          </>
        )}

        {/* ═══ EXCHANGE TAB ═══ */}
        {activeTab === "exchange" && <RedeemContent totalPoints={totalPoints} onPointsChange={handlePointsChange} />}

        {/* ═══ FREE PRODUCTS TAB ═══ */}
        {activeTab === "products" && <FreeProductsContent totalPoints={totalPoints} onPointsChange={handlePointsChange} currentTier={currentTier} />}

        {/* ═══ UPLOAD RECEIPT TAB ═══ */}
        {activeTab === "upload" && <UploadReceiptContent />}
      </div>

      <style>{`
        @keyframes earnOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes earnCircleScale {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes earnDrawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes redeemSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes redeemCheckPop {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes redeemDrawCheck {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
