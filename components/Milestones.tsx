"use client";

import { useState, useEffect, useCallback } from "react";

const milestones = [
  { month: 1, reward: "Welcome Kit + Original Sampler", image: "/milestone-welcome-kit.jpg", code: "WELCOME-AG1-KIT" },
  { month: 2, reward: "AG1 Duffel Bag", image: "/milestone-duffel-bag.jpg", code: "DUFFEL-M2-AG1" },
  { month: 3, reward: "AG1 Sweatshirt", image: "/milestone-sweatshirt.jpg", code: "SWEAT-M3-AG1" },
  { month: 4, reward: "AG1 Hat, 2x Referral Bonus", image: "/milestone-hat.jpg", code: "HAT2X-M4-AG1" },
  { month: 5, reward: "Access to Limited Edition Merch Store", image: "/milestone-merch-store.jpg", code: "MERCH-M5-AG1" },
  { month: 6, reward: "AG1 Tote, Limited Edition Merch Access", image: "/milestone-tote-limited.jpg", code: "TOTE-M6-AG1" },
  { month: 8, reward: "10% more AG Credit per Serving", image: "/milestone-10-credit.jpg", code: "CREDIT10-M8" },
  { month: 9, reward: "AG1 Tote", image: "/milestone-tote.jpg", code: "TOTE-M9-AG1" },
  { month: 11, reward: "15% more AG Credit per Serving", image: "/milestone-15-credit.jpg", code: "CREDIT15-M11" },
  { month: 12, reward: "AG1 Sweatpants", image: "/milestone-sweatpants.jpg", code: "PANTS-M12-AG1" },
];

const TOTAL_MONTHS = 12;

/* ─── Single milestone card ─── */
function MilestoneCard({
  milestone,
  isEarned,
  isCurrent,
  isLocked,
  isClaimed,
  onClaim,
}: {
  milestone: typeof milestones[0];
  isEarned: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  isClaimed: boolean;
  onClaim: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [claimAnim, setClaimAnim] = useState(false);

  const handleClaim = useCallback(() => {
    setClaimAnim(true);
    setTimeout(() => {
      onClaim();
      setClaimAnim(false);
    }, 600);
  }, [onClaim]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(milestone.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [milestone.code]);

  const showClaimOverlay = isEarned && !isClaimed && !isLocked;
  const showCode = isClaimed;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        border: isCurrent ? "1.5px solid #0d8b87" : "1px solid #d4e0df",
        overflow: "hidden",
        opacity: isLocked ? 0.45 : 1,
        transition: "opacity 0.5s ease, border-color 0.4s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image — with claim overlay */}
      <div
        style={{
          width: "100%",
          height: "220px",
          backgroundColor: "#f0f0ef",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={milestone.image}
          alt={milestone.reward}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: isLocked ? "grayscale(0.5)" : "none",
            transition: "filter 0.5s ease",
          }}
        />

        {/* Claim overlay */}
        {showClaimOverlay && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: hovered ? "rgba(12,61,61,0.85)" : "rgba(12,61,61,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s ease",
            }}
          >
            {claimAnim ? (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="#ffffff" strokeWidth="2" opacity="0.3" />
                <circle cx="16" cy="16" r="15" stroke="#ffffff" strokeWidth="2" strokeDasharray="94" strokeDashoffset="24" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.6s" repeatCount="1" />
                </circle>
              </svg>
            ) : (
              <button
                onClick={handleClaim}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#0C3D3D",
                  backgroundColor: "#ffffff",
                  border: "none",
                  minHeight: "44px",
                  padding: "0 28px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
              >
                Claim →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content — flex-grow to fill equal height */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Month label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "8px",
          }}
        >
          {isClaimed ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#0d8b87" />
              <path d="M4 7.2L6 9.2L10 5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : isEarned ? (
            <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#E8913A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#ffffff", fontSize: "10px", fontWeight: 700, lineHeight: 1 }}>!</span>
            </div>
          ) : (
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#d4e0df", flexShrink: 0 }} />
          )}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: isCurrent ? "#0d8b87" : "#6b8a89",
            }}
          >
            Month {milestone.month}
          </span>
        </div>

        {/* Reward text */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            fontWeight: 500,
            color: "#1a1a1a",
            margin: 0,
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {milestone.reward}
        </p>

        {/* Code section — always takes up space for equal height */}
        <div style={{ marginTop: "12px", minHeight: "44px" }}>
          {showCode ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "#000000",
                  backgroundColor: "#f5f8f8",
                  border: "1px solid #d4e0df",
                  borderRight: "none",
                  padding: "0 12px",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  lineHeight: 1,
                }}
              >
                {milestone.code}
              </div>
              <button
                onClick={handleCopy}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: "#0C3D3D",
                  border: "1px solid #0C3D3D",
                  minHeight: "44px",
                  padding: "0 16px",
                  cursor: "pointer",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  transition: "background-color 0.2s ease",
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          ) : (
            /* Invisible placeholder — keeps card height consistent */
            <div style={{ visibility: "hidden", height: "44px" }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Milestones() {
  const [subscribed, setSubscribed] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [btnHovered, setBtnHovered] = useState(false);
  const [claimedMonths, setClaimedMonths] = useState<Set<number>>(new Set());

  /* Animate progress bar when currentMonth changes */
  useEffect(() => {
    if (currentMonth === 0) {
      setAnimatedWidth(0);
      return;
    }
    const timeout = setTimeout(() => {
      setAnimatedWidth(((currentMonth - 1) / (TOTAL_MONTHS - 1)) * 100);
    }, 50);
    return () => clearTimeout(timeout);
  }, [currentMonth]);

  const handleSubscribe = useCallback(() => {
    setSubscribed(true);
    setCurrentMonth(1);
  }, []);

  const handleCircleClick = useCallback((month: number) => {
    if (!subscribed) return;
    if (month <= currentMonth) return;
    setCurrentMonth(month);
  }, [subscribed, currentMonth]);

  const handleClaim = useCallback((month: number) => {
    setClaimedMonths((prev) => {
      const next = new Set(prev);
      next.add(month);
      return next;
    });
  }, []);

  return (
    <section
      id="section-milestones"
      style={{
        backgroundColor: "#ffffff",
        padding: "80px 48px 120px",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "44px",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "#000000",
          textAlign: "center",
          margin: "0 0 12px 0",
          letterSpacing: "-0.01em",
        }}
      >
        Subscriber Milestones
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "16px",
          fontWeight: 400,
          color: "#6b8a89",
          textAlign: "center",
          margin: "0 0 20px 0",
          lineHeight: 1.5,
        }}
      >
        Unlock exclusive rewards the longer you stay subscribed.
      </p>

      {/* Subscribe button or status */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        {!subscribed ? (
          <button
            onClick={handleSubscribe}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              fontWeight: 600,
              color: btnHovered ? "#000000" : "#ffffff",
              backgroundColor: btnHovered ? "#46DE46" : "#0C3D3D",
              border: "none",
              minHeight: "52px",
              padding: "0 36px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease",
            }}
          >
            Subscribe →
          </button>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#0d8b87",
              margin: 0,
            }}
          >
            Subscribed — Month {currentMonth} of {TOTAL_MONTHS}
          </p>
        )}
      </div>

      {/* Container */}
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* ── Timeline ── */}
        <div style={{ position: "relative", padding: "0 0 48px 0" }}>
          <div style={{ position: "absolute", top: "5px", left: "0", right: "0", height: "3px", backgroundColor: "#d4e0df", zIndex: 1 }} />
          <div style={{ position: "absolute", top: "5px", left: "0", width: `${animatedWidth}%`, height: "3px", backgroundColor: "#0d8b87", zIndex: 2, transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 3 }}>
            {Array.from({ length: TOTAL_MONTHS }, (_, i) => {
              const month = i + 1;
              const isEarned = subscribed && month <= currentMonth;
              const isCurrent = subscribed && month === currentMonth;
              const isClickable = subscribed && month > currentMonth;
              return (
                <div
                  key={month}
                  onClick={() => isClickable && handleCircleClick(month)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "0px", cursor: isClickable ? "pointer" : "default" }}
                >
                  <div
                    style={{
                      width: isCurrent ? "14px" : "10px",
                      height: isCurrent ? "14px" : "10px",
                      borderRadius: "50%",
                      backgroundColor: isEarned ? "#0d8b87" : "#d4e0df",
                      border: isCurrent ? "3px solid #ffffff" : "none",
                      boxShadow: isCurrent ? "0 0 0 2px #0d8b87" : "none",
                      flexShrink: 0,
                      marginTop: isCurrent ? "-1.5px" : "0.5px",
                      transition: "background-color 0.4s ease, box-shadow 0.4s ease",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      fontWeight: isCurrent ? 700 : 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: isEarned ? "#0d8b87" : "#999999",
                      margin: "8px 0 0 0",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      transition: "color 0.4s ease",
                    }}
                  >
                    Month {month}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Benefits Grid — 4 columns ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginTop: "16px" }}>
          {milestones.map((m) => {
            const isEarned = subscribed && m.month <= currentMonth;
            const isCurrent = subscribed && m.month === currentMonth;
            const isLocked = !subscribed || m.month > currentMonth;
            const isClaimed = claimedMonths.has(m.month);
            return (
              <MilestoneCard
                key={m.month}
                milestone={m}
                isEarned={isEarned}
                isCurrent={isCurrent}
                isLocked={isLocked}
                isClaimed={isClaimed}
                onClaim={() => handleClaim(m.month)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
