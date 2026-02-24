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
  const [claimClicked, setClaimClicked] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const handleClaim = useCallback(() => {
    setClaimClicked(true);
    onClaim();
    setCelebrating(true);
    setTimeout(() => setCelebrating(false), 1400);
  }, [onClaim]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(milestone.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [milestone.code]);

  const showOverlay = (isEarned && !isClaimed && !isLocked) || claimClicked;
  const showCode = isClaimed;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        border: isCurrent ? "1.5px solid #0d8b87" : "1px solid #d4e0df",
        overflow: celebrating ? "visible" : "hidden",
        opacity: isLocked ? 0.45 : 1,
        transition: "opacity 0.5s ease, border-color 0.4s ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
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

        {/* Claim overlay — matches achievement pattern */}
        {showOverlay && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: claimClicked ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              zIndex: 3,
              animation: "milestoneOverlayIn 0.3s ease forwards",
              transition: "background-color 0.8s ease 0.3s",
            }}
          >
            {/* Animated circle + checkmark — after claimed */}
            {claimClicked && (
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ overflow: "visible" }}>
                <circle
                  cx="18"
                  cy="18"
                  r="17"
                  fill="#0C3D3D"
                  style={{
                    transformOrigin: "18px 18px",
                    animation: "milestoneCirclePop 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                  }}
                />
                <path
                  d="M11 18.5L15.5 23L25 13"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 24,
                    strokeDashoffset: 24,
                    animation: "milestoneDrawCheck 0.4s ease 0.25s forwards",
                  }}
                />
              </svg>
            )}

            {/* Claim button — disappears on click */}
            {!claimClicked && (
              <button
                onClick={handleClaim}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#0C3D3D",
                  backgroundColor: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
                  border: "none",
                  minHeight: "52px",
                  padding: "0 36px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  lineHeight: 1,
                  transition: "background-color 0.2s ease, opacity 0.2s ease",
                  animation: "milestoneClaimIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                }}
              >
                Claim →
              </button>
            )}
          </div>
        )}

        {/* White gradient sheen on claim */}
        {claimClicked && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 7,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-100%",
                left: "-100%",
                width: "80%",
                height: "300%",
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                transform: "rotate(25deg)",
                animation: "milestoneSheen 1.8s ease 0.05s forwards",
              }}
            />
          </div>
        )}
      </div>

      {/* Confetti — bursts from center of image area */}
      {celebrating && (
        <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", overflow: "visible" }}>
          {Array.from({ length: 45 }).map((_, i) => {
            const w = 4 + Math.random() * 7;
            const h = i % 5 === 0 ? w : (2 + Math.random() * 5);
            const angle = Math.random() * Math.PI * 2;
            const dist = 60 + Math.random() * 160;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;
            const spin = 180 + Math.random() * 540;
            const colors = ["#0C3D3D", "#0d8b87", "#14504F", "#1a6b5a", "#2d8f6f", "#0a3030", "#3da88a", "#276b5d"];
            const delay = i * 0.004;
            const dur = 1.8 + Math.random() * 0.6;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "30%",
                  width: `${w}px`,
                  height: `${h}px`,
                  marginLeft: `${-w / 2}px`,
                  marginTop: `${-h / 2}px`,
                  borderRadius: i % 4 === 0 ? "50%" : "1px",
                  backgroundColor: colors[i % colors.length],
                  opacity: 0,
                  animation: `milestoneConfetti ${dur}s cubic-bezier(0.12, 0.8, 0.2, 1) ${delay}s forwards`,
                  ["--dx" as string]: `${dx.toFixed(1)}px`,
                  ["--dy" as string]: `${dy.toFixed(1)}px`,
                  ["--spin" as string]: `${spin}deg`,
                }}
              />
            );
          })}
        </div>
      )}

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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#E8913A" />
              <path d="M4 7.2L6 9.2L10 5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#d4e0df", flexShrink: 0 }} />
          )}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "16px",
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
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  /* Animate progress bar when currentMonth changes */
  useEffect(() => {
    if (currentMonth === 0) {
      setAnimatedWidth(0);
      return;
    }
    const timeout = setTimeout(() => {
      setAnimatedWidth(((currentMonth - 1 + 0.5) / (TOTAL_MONTHS - 1)) * 100);
    }, 50);
    return () => clearTimeout(timeout);
  }, [currentMonth]);

  /* Dispatch subscription update whenever state changes */
  useEffect(() => {
    if (!subscribed) return;
    const days = (currentMonth - 1) * 30 + 15;
    window.dispatchEvent(new CustomEvent("subscription-updated", { detail: { subscribed: true, days, month: currentMonth } }));
  }, [subscribed, currentMonth]);

  /* Listen for subscribe from hero */
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.source === "hero" && !subscribed) {
        setSubscribed(true);
        setCurrentMonth(1);
      }
    };
    window.addEventListener("subscription-updated", handler);
    return () => window.removeEventListener("subscription-updated", handler);
  }, [subscribed]);

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
        padding: "40px 48px 120px",
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
          textAlign: "left",
          margin: "0 0 12px 0",
          letterSpacing: "-0.01em",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Subscriber Milestones
      </h2>

      {/* Subtitle */}
      <div style={{ maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            fontWeight: 400,
            color: "#000000",
            textAlign: "left",
            margin: subscribed ? "0 0 48px 0" : "0 0 20px 0",
            lineHeight: 1.5,
            maxWidth: "480px",
          }}
        >
          Unlock exclusive rewards the longer you stay subscribed.
        </p>
      </div>

      {/* Subscribe banner */}
      {!subscribed && (
        <div style={{ maxWidth: "1280px", marginLeft: "auto", marginRight: "auto", marginBottom: "48px" }}>
          <div
            style={{
              display: "flex",
              border: "1px solid #d4e0df",
              overflow: "hidden",
              height: "260px",
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "#F6F5F1",
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#6b8a89",
                  margin: "0 0 12px 0",
                  lineHeight: 1,
                }}
              >
                Subscribe to unlock
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "#000000",
                  margin: "0 0 8px 0",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Subscribe to AG1
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#6b8a89",
                  margin: "0 0 24px 0",
                  lineHeight: 1.5,
                  maxWidth: "380px",
                }}
              >
                Start your subscription to earn AG Credit, unlock exclusive merch rewards, and access all subscriber milestones below.
              </p>
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
                  alignSelf: "flex-start",
                }}
              >
                Subscribe →
              </button>
            </div>
            <div style={{ width: "480px", maxWidth: "480px", flexShrink: 0 }}>
              <img
                src="/milestone-welcome-kit.jpg"
                alt="Welcome Kit"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      )}

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
              const isFuture = subscribed && month > currentMonth;
              const isPast = subscribed && month < currentMonth;
              const daysToUnlock = isFuture ? (month - 1) * 30 - 15 : 0;
              return (
                <div
                  key={month}
                  onClick={() => isClickable && handleCircleClick(month)}
                  onMouseEnter={() => subscribed && setHoveredMonth(month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "0px", cursor: isClickable ? "pointer" : "default", position: "relative" }}
                >
                  {/* Tooltip */}
                  {subscribed && hoveredMonth === month && !isCurrent && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 6px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#0C3D3D",
                        color: "#ffffff",
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontWeight: 500,
                        padding: "6px 12px",
                        borderRadius: "6px",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    >
                      {isPast ? "Unlocked" : `${daysToUnlock} days to unlock`}
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 0,
                          height: 0,
                          borderLeft: "4px solid transparent",
                          borderRight: "4px solid transparent",
                          borderTop: "4px solid #0C3D3D",
                        }}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      width: isCurrent ? "14px" : "10px",
                      height: isCurrent ? "14px" : "10px",
                      borderRadius: "50%",
                      backgroundColor: isEarned ? "#0d8b87" : "#d4e0df",
                      border: isCurrent ? "3px solid #ffffff" : "none",
                      boxShadow: isCurrent ? "0 0 0 2px #0d8b87" : "none",
                      flexShrink: 0,
                      marginTop: isCurrent ? "-0.5px" : "1.5px",
                      transition: "background-color 0.4s ease, box-shadow 0.4s ease",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
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

      {/* Keyframes — matches achievement animations */}
      <style>{`
        @keyframes milestoneOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes milestoneClaimIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes milestoneCirclePop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes milestoneDrawCheck {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes milestoneConfetti {
          0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
          70% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--spin)) scale(0); }
        }
        @keyframes milestoneSheen {
          0% { transform: rotate(25deg) translateX(0); }
          100% { transform: rotate(25deg) translateX(400%); }
        }
      `}</style>
    </section>
  );
}
