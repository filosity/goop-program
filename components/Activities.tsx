"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, DollarSignCircle, GiftBox, DiscountTag, Bolt, DeliveryTruck, Headphones, Star } from "@vectoricons/atlas-icons-react";

/* ─── Achievement data ─── */
const achievements = [
  {
    id: "first-purchase",
    title: "First Purchase",
    description: "Complete your very first purchase to kickstart your beauty journey.",
    reward: "+25 goop credit",
    code: "FIRST25",
    codeHint: "apply this code at checkout to claim your bonus goop credit",
    goal: 1,
    image: "/tier1.jpg",
  },
  {
    id: "skincare-devotee",
    title: "Skincare Devotee",
    description: "Order 5 products from the skincare collection.",
    reward: "15% off next order",
    code: "SKIN15",
    codeHint: "use this code at checkout for 15% off your next skincare order",
    goal: 5,
    image: "/tier2.jpg",
  },
  {
    id: "beauty-explorer",
    title: "Beauty Explorer",
    description: "Try products from 3 different categories to discover your favorites.",
    reward: "+75 goop credit",
    code: "EXPLORE75",
    codeHint: "apply this code at checkout to claim your bonus goop credit",
    goal: 3,
    image: "/tier3.jpg",
  },
  {
    id: "loyal-customer",
    title: "Loyal Customer",
    description: "Make 10 purchases and unlock a permanent loyalty reward.",
    reward: "Free shipping forever",
    code: "LOYAL-SHIP",
    codeHint: "add this code to your account to unlock permanent free shipping",
    goal: 10,
    image: "/tier4.jpg",
  },
  {
    id: "review-maven",
    title: "Review Maven",
    description: "Write 5 thoughtful product reviews to help the community.",
    reward: "+100 goop credit",
    code: "REVIEW100",
    codeHint: "apply this code at checkout to claim your bonus goop credit",
    goal: 5,
    image: "/tier1.jpg",
  },
  {
    id: "social-butterfly",
    title: "Social Butterfly",
    description: "Connect your Instagram, TikTok, and subscribe to our SMS list.",
    reward: "Early access to drops",
    code: "EARLYACCESS",
    codeHint: "your early access has been activated for all upcoming product drops",
    goal: 3,
    image: "/tier2.jpg",
  },
  {
    id: "seasonal-collector",
    title: "Seasonal Collector",
    description: "Purchase from 4 seasonal collections throughout the year.",
    reward: "Curated gift box",
    code: "GIFTBOX26",
    codeHint: "use this code at checkout to receive your curated gift box",
    goal: 4,
    image: "/tier3.jpg",
  },
  {
    id: "brand-ambassador",
    title: "Brand Ambassador",
    description: "Refer 3 friends who each make their first purchase.",
    reward: "$50 store credit",
    code: "AMBASS50",
    codeHint: "apply this code at checkout to redeem your $50 store credit",
    goal: 3,
    image: "/tier4.jpg",
  },
];

/* ─── Single Achievement Card ─── */
function AchievementCard({
  achievement,
  progress,
  claimable,
  claimed,
  redeemed,
  celebrating,
  onClick,
  onClaim,
}: {
  achievement: (typeof achievements)[number];
  progress: number;
  claimable: boolean;
  claimed: boolean;
  redeemed: boolean;
  celebrating: boolean;
  onClick: () => void;
  onClaim: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [claimHovered, setClaimHovered] = useState(false);
  const [claimClicked, setClaimClicked] = useState(false);
  const isComplete = progress >= achievement.goal;
  const pct = Math.min((progress / achievement.goal) * 100, 100);
  const showOverlay = claimable || claimed;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(achievement.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [achievement.code]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        width: "300px",
        minWidth: "300px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        cursor: isComplete ? "default" : "pointer",
      }}
    >
      {/* Image area */}
      <div
        style={{
          position: "relative",
          height: "260px",
          overflow: "hidden",
          border: "1px solid #e5e2de",
          borderBottom: "none",
        }}
      >
        <img
          src={achievement.image}
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered && !isComplete ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            pointerEvents: "none",
          }}
        />

        {/* Status badge top-right */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1,
            padding: "6px 12px",
            borderRadius: "40px",
            backgroundColor: redeemed || claimed || claimClicked ? "#000000" : isComplete ? "#E8913A" : "rgba(255,255,255,0.92)",
            color: redeemed || claimed || claimClicked ? "#ffffff" : isComplete ? "#ffffff" : "#1a1a1a",
            backdropFilter: isComplete || redeemed || claimed || claimClicked ? "none" : "blur(8px)",
            transition: "all 0.4s ease",
            zIndex: 4,
          }}
        >
          {redeemed || claimed || claimClicked ? "unlocked" : isComplete ? "unlock" : `${progress}/${achievement.goal}`}
        </div>

        {/* Completion overlay on image — contains checkmark + claim button */}
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
              animation: "achieveOverlayIn 0.3s ease forwards",
              transition: "background-color 0.8s ease 0.3s",
            }}
          >
            {/* Animated circle + checkmark — after claimed */}
            {claimed && (
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ overflow: "visible" }}>
                <circle
                  cx="18"
                  cy="18"
                  r="17"
                  fill="#000000"
                  style={{
                    transformOrigin: "18px 18px",
                    animation: "achieveCirclePop 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
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
                    animation: "achieveDrawCheck 0.4s ease 0.25s forwards",
                  }}
                />
              </svg>
            )}

            {/* Claim button — lives on the overlay, disappears immediately on click */}
            {claimable && !claimed && !claimClicked && (
              <button
                onClick={(e) => { e.stopPropagation(); setClaimClicked(true); onClaim(); }}
                onMouseEnter={() => setClaimHovered(true)}
                onMouseLeave={() => setClaimHovered(false)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#000000",
                  backgroundColor: claimHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
                  border: "none",
                  height: "38px",
                  padding: "0 28px",
                  borderRadius: "40px",
                  cursor: "pointer",
                  lineHeight: 1,
                  transition: "background-color 0.2s ease, opacity 0.2s ease",
                  animation: "achieveClaimIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                }}
              >
                claim
              </button>
            )}
          </div>
        )}

        {/* Golden confetti — bursts from center of image */}
        {celebrating && (
          <div style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none", overflow: "visible" }}>
            {Array.from({ length: 45 }).map((_, i) => {
              const w = 4 + Math.random() * 7;
              const h = i % 5 === 0 ? w : (2 + Math.random() * 5);
              const angle = Math.random() * Math.PI * 2;
              const dist = 60 + Math.random() * 160;
              const dx = Math.cos(angle) * dist;
              const dy = Math.sin(angle) * dist;
              const spin = 180 + Math.random() * 540;
              const colors = ["#D4AF37", "#FFBF00", "#F7E7CE", "#DAA520", "#E8D5A3", "#C5961A", "#FFD700", "#B8860B"];
              const delay = i * 0.004;
              const dur = 1.8 + Math.random() * 0.6;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${w}px`,
                    height: `${h}px`,
                    marginLeft: `${-w / 2}px`,
                    marginTop: `${-h / 2}px`,
                    borderRadius: i % 4 === 0 ? "50%" : "1px",
                    backgroundColor: colors[i % colors.length],
                    opacity: 0,
                    animation: `achieveConfetti ${dur}s cubic-bezier(0.12, 0.8, 0.2, 1) ${delay}s forwards`,
                    ["--dx" as string]: `${dx.toFixed(1)}px`,
                    ["--dy" as string]: `${dy.toFixed(1)}px`,
                    ["--spin" as string]: `${spin}deg`,
                  }}
                />
              );
            })}
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
                animation: "achieveSheen 1.8s ease 0.05s forwards",
              }}
            />
          </div>
        )}
      </div>

      {/* Info area */}
      <div
        style={{
          padding: "28px 24px 26px",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #e5e2de",
          borderTop: "none",
          backgroundColor: "#ffffff",
          flex: 1,
        }}
      >
        {/* Title */}
        <h4
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "22px",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "#000000",
            margin: "0 0 8px 0",
            letterSpacing: "-0.01em",
          }}
        >
          {achievement.title}
        </h4>

        {!claimed ? (
          <>
            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "#888888",
                margin: 0,
              }}
            >
              {achievement.description}
            </p>

            {/* Spacer — pushes reward to bottom */}
            <div style={{ flex: 1, minHeight: "18px" }} />

            {/* Reward block — stacked vertically */}
            <div style={{ marginBottom: "14px" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#aaaaaa",
                  lineHeight: 1,
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                reward
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#000000",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {achievement.reward}
                {claimable && !claimed && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#E8913A",
                      flexShrink: 0,
                    }}
                  />
                )}
              </span>
            </div>

            {/* 1px progress bar */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#e5e2de",
                overflow: "hidden",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  backgroundColor: "#000000",
                  transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>

            {/* Progress text */}
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 400,
                color: "#aaaaaa",
                lineHeight: 1,
              }}
            >
              {progress} of {achievement.goal} completed
            </span>
          </>
        ) : (
          <>
            {/* Spacer — pushes completed content to bottom */}
            <div style={{ flex: 1, minHeight: "6px" }} />

            {/* Reward label + name */}
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#aaaaaa",
                lineHeight: 1,
                display: "block",
                marginBottom: "8px",
              }}
            >
              reward
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 600,
                color: "#000000",
                lineHeight: 1,
                marginBottom: "16px",
                display: "block",
              }}
            >
              {achievement.reward}
            </span>

            {/* Code box or redeemed state */}
            {redeemed ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  backgroundColor: "#f4f2ef",
                  marginBottom: "8px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#888888" />
                  <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#888888",
                    lineHeight: 1,
                  }}
                >
                  already redeemed
                </span>
              </div>
            ) : (
              <div
                style={{
                  position: "relative",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#000000",
                      backgroundColor: "#f9f7f5",
                      border: "1px solid #e5e2de",
                      borderRight: "none",
                      padding: "10px 14px",
                      lineHeight: 1,
                      flex: 1,
                    }}
                  >
                    {achievement.code}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#ffffff",
                      backgroundColor: "#000000",
                      border: "1px solid #000000",
                      padding: "10px 14px",
                      cursor: "pointer",
                      lineHeight: 1,
                      transition: "background-color 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {copied ? "copied!" : "copy"}
                  </button>
                </div>
                {/* Tooltip — above copy button */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    right: 0,
                    transform: `translateY(${copied ? "0px" : "4px"})`,
                    backgroundColor: "#f0eeeb",
                    color: "#000000",
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "6px 12px",
                    borderRadius: "6px",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    opacity: copied ? 1 : 0,
                    pointerEvents: "none",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                >
                  add the code to your cart
                  <div style={{ position: "absolute", top: "100%", right: "16px", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #f0eeeb" }} />
                </div>
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
}

/* ─── Achievements Content (carousel) ─── */
function AchievementsContent({ onClaimedCountChange, onHasClaimableChange }: { onClaimedCountChange: (count: number) => void; onHasClaimableChange: (has: boolean) => void }) {
  const [progress, setProgress] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    achievements.forEach((a) => { init[a.id] = 0; });
    init["first-purchase"] = 1;
    init["skincare-devotee"] = 5;
    init["beauty-explorer"] = 3;
    return init;
  });
  const [claimable, setClaimable] = useState<Record<string, boolean>>({
    "first-purchase": false,
    "skincare-devotee": false,
    "beauty-explorer": true,
  });
  const [claimed, setClaimed] = useState<Record<string, boolean>>({
    "first-purchase": true,
    "skincare-devotee": true,
  });
  const [redeemed] = useState<Set<string>>(new Set(["first-purchase"]));
  const [celebratingId, setCelebratingId] = useState<string | null>(null);

  const currentPointsRef = useRef(50);

  // Sync claimed count and claimable state to parent
  useEffect(() => {
    const count = achievements.filter((a) => claimed[a.id]).length;
    onClaimedCountChange(count);
  }, [claimed, onClaimedCountChange]);

  useEffect(() => {
    const hasAny = achievements.some((a) => claimable[a.id] && !claimed[a.id]);
    onHasClaimableChange(hasAny);
  }, [claimable, claimed, onHasClaimableChange]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) currentPointsRef.current = detail.points;
    };
    window.addEventListener("points-updated", handler);
    return () => window.removeEventListener("points-updated", handler);
  }, []);

  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const [leftArrowHovered, setLeftArrowHovered] = useState(false);
  const [rightArrowHovered, setRightArrowHovered] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
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
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = carouselRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    el.scrollLeft = dragScrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = carouselRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
      el.style.cursor = "grab";
    }
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
  }, []);

  const handleCardClick = useCallback((id: string, goal: number) => {
    if (hasDragged.current) return;
    if (claimed[id] || claimable[id]) return;

    setProgress((prev) => {
      const current = prev[id] || 0;
      if (current >= goal) return prev;
      const next = current + 1;

      if (next >= goal) {
        setTimeout(() => {
          setClaimable((c) => ({ ...c, [id]: true }));
        }, 300);
      }

      return { ...prev, [id]: next };
    });
  }, [claimed, claimable]);

  const handleClaim = useCallback((id: string) => {
    // Add goop credit from reward if applicable
    const achievement = achievements.find(a => a.id === id);
    if (achievement) {
      const match = achievement.reward.match(/\+(\d+)\s*goop credit/i);
      if (match) {
        const pts = parseInt(match[1], 10);
        const newTotal = currentPointsRef.current + pts;
        currentPointsRef.current = newTotal;
        window.dispatchEvent(new CustomEvent("points-updated", { detail: { points: newTotal } }));
      }
    }

    setCelebratingId(id);
    // Set claimed after confetti plays
    setTimeout(() => {
      setClaimable((c) => ({ ...c, [id]: false }));
      setClaimed((prev) => ({ ...prev, [id]: true }));
      setCelebratingId(null);
    }, 1400);
  }, []);

  return (
    <div>
      {/* Carousel */}
      <div
        ref={carouselRef}
        data-carousel=""
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
        {achievements.map((a) => (
          <AchievementCard
            key={a.id}
            achievement={a}
            progress={progress[a.id] || 0}
            claimable={!!claimable[a.id]}
            claimed={!!claimed[a.id]}
            redeemed={redeemed.has(a.id)}
            celebrating={celebratingId === a.id}
            onClick={() => handleCardClick(a.id, a.goal)}
            onClaim={() => handleClaim(a.id)}
          />
        ))}
      </div>

      {/* Arrow nav — centered below */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <button
          onClick={() => carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
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
          onClick={() => carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
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
        @keyframes achieveOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes achieveClaimIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes achieveCirclePop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes achieveDrawCheck {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes achieveConfetti {
          0% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx), var(--dy)) rotate(var(--spin)) scale(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ─── Voting data ─── */
const allVotingQuestions: { question: string; options: string[]; images?: string[] }[] = [
  {
    question: "Which bath ritual is your go-to?",
    options: ["Boreal Fog Bath Bomb", "Love Bath Heart-Opening Soak", "Pomelo Grove Bath Bomb"],
    images: ["/product-bath-bomb.webp", "/product-love-bath-soak.webp", "/product-pomelo-bath-bomb.webp"],
  },
  {
    question: "Which body care product would you like to try?",
    options: ["Afterglow Body Oil", "Corpus Body Wash", "No.14 Icila Body Lotion"],
    images: ["/product-afterglow-bodyoil.webp", "/product-corpus-bodywash.webp", "/product-icila-bodylotion.webp"],
  },
  {
    question: "What should we feature as product of the month?",
    options: ["Instant Glow Body Polish", "Jillian Dempsey Makeup Bag", "Aloe Vera Shampoo Duo"],
    images: ["/product-glow-body-polish.webp", "/product-makeupbag.webp", "/product-aloe-vera-duo.webp"],
  },
  {
    question: "Which product would you gift a friend?",
    options: ["Amber & Vanilla Pebble", "Cooling Massage Body Oil", "Afterglow Body Oil"],
    images: ["/product-amber-pebble.webp", "/product-cooling-body-oil.webp", "/product-afterglow-bodyoil.webp"],
  },
  {
    question: "What type of event would you attend?",
    options: ["In-store Workshop", "Virtual Masterclass", "Pop-up Experience"],
  },
  {
    question: "What\u2019s your ideal self-care ritual?",
    options: ["Morning Skincare Routine", "Evening Bath Soak", "Weekend Spa Day"],
  },
  {
    question: "Which beauty trend excites you most?",
    options: ["Clean Beauty", "Glass Skin", "Ayurvedic Wellness"],
  },
  {
    question: "What packaging style do you prefer?",
    options: ["Minimalist Glass", "Recycled Kraft", "Matte Black"],
  },
];

const VOTING_DISPLAY_COUNT = 8;

/* ─── Fallback images for voting version 1 ─── */
const votingImages = ["/product-bath-bomb.webp", "/product-afterglow-bodyoil.webp", "/product-corpus-bodywash.webp", "/product-icila-bodylotion.webp", "/product-glow-body-polish.webp", "/product-makeupbag.webp", "/product-amber-pebble.webp", "/product-cooling-body-oil.webp"];

/* ─── Shared goop credit earned animation (black circle, white checkmark) ─── */
function VotingPointsEarned() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        animation: "votingPointsIn 0.35s ease forwards",
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        style={{ marginBottom: "10px" }}
      >
        <circle
          cx="14"
          cy="14"
          r="14"
          fill="#000000"
          style={{
            transformOrigin: "14px 14px",
            animation: "achieveCirclePop 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
          }}
        />
        <path
          d="M8 14.5L11.5 18L20 9"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 20,
            strokeDashoffset: 20,
            animation: "votingDrawCheck 0.4s ease 0.25s forwards",
          }}
        />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 600,
          color: "#000000",
          textAlign: "center",
        }}
      >
        +5 goop credit earned
      </span>
    </div>
  );
}

/* ─── Shared completion screen ─── */
function VotingComplete({ totalEarned, questionVisible }: { totalEarned: number; questionVisible: boolean }) {
  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        opacity: questionVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "22px",
          fontWeight: 400,
          color: "#000000",
          textAlign: "center",
          margin: "0 0 10px 0",
        }}
      >
        No more voting for today.
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 400,
          color: "#888888",
          textAlign: "center",
          margin: "0 0 24px 0",
        }}
      >
        Check back tomorrow!
      </p>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "#000000",
          padding: "0 22px",
          height: "38px",
          borderRadius: "40px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        +{totalEarned} goop credit earned today
      </span>
    </div>
  );
}

/* ─── Version 1: Voting + Images ─── */
function VotingVersion1({
  questionData,
  selectedOption,
  showPoints,
  questionVisible,
  hoveredOption,
  onOptionClick,
  onHoverOption,
  imageMap,
}: {
  questionData: { question: string; options: string[] };
  selectedOption: string | null;
  showPoints: boolean;
  questionVisible: boolean;
  hoveredOption: string | null;
  onOptionClick: (option: string) => void;
  onHoverOption: (option: string | null) => void;
  imageMap: Record<string, string>;
}) {
  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: questionVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!showPoints ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", padding: "20px" }}>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              fontWeight: 400,
              color: "#000000",
              textAlign: "center",
              margin: "0 0 36px 0",
            }}
          >
            {questionData.question}
          </h3>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
              maxWidth: "820px",
            }}
          >
            {questionData.options.map((option) => {
              const isSelected = selectedOption === option;
              const isHovered = hoveredOption === option;
              return (
                <div
                  key={option}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                    width: "240px",
                  }}
                >
                  <div
                    onClick={() => onOptionClick(option)}
                    onMouseEnter={() => onHoverOption(option)}
                    onMouseLeave={() => onHoverOption(null)}
                    style={{
                      width: "240px",
                      height: "280px",
                      cursor: selectedOption ? "default" : "pointer",
                      boxShadow: isSelected ? "inset 0 0 0 1px #000000" : isHovered ? "inset 0 0 0 1px #000000" : "inset 0 0 0 1px #e5e2de",
                      overflow: "hidden",
                      transition: "box-shadow 0.2s ease",
                      position: "relative",
                    }}
                  >
                    <img
                      src={imageMap[option]}
                      alt=""
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  <button
                    onClick={() => onOptionClick(option)}
                    onMouseEnter={() => onHoverOption(option)}
                    onMouseLeave={() => onHoverOption(null)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: isSelected ? "#ffffff" : "#000000",
                      backgroundColor: isSelected ? "#000000" : "transparent",
                      border: isSelected ? "1px solid #000000" : isHovered ? "1px solid #000000" : "1px solid #d5d5d5",
                      height: "38px",
                      padding: "0 22px",
                      borderRadius: "40px",
                      cursor: selectedOption ? "default" : "pointer",
                      transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {option}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <VotingPointsEarned />
        </div>
      )}
    </div>
  );
}

/* ─── Version 2: Voting Buttons (original) ─── */
function VotingVersion2({
  questionData,
  selectedOption,
  showPoints,
  questionVisible,
  hoveredOption,
  onOptionClick,
  onHoverOption,
}: {
  questionData: { question: string; options: string[] };
  selectedOption: string | null;
  showPoints: boolean;
  questionVisible: boolean;
  hoveredOption: string | null;
  onOptionClick: (option: string) => void;
  onHoverOption: (option: string | null) => void;
}) {
  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: questionVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!showPoints ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", padding: "20px" }}>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              fontWeight: 400,
              color: "#000000",
              textAlign: "center",
              margin: "0 0 36px 0",
            }}
          >
            {questionData.question}
          </h3>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              maxWidth: "680px",
            }}
          >
            {questionData.options.map((option) => {
              const isSelected = selectedOption === option;
              const isHovered = hoveredOption === option;
              return (
                <button
                  key={option}
                  onClick={() => onOptionClick(option)}
                  onMouseEnter={() => onHoverOption(option)}
                  onMouseLeave={() => onHoverOption(null)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isSelected ? "#ffffff" : "#000000",
                    backgroundColor: isSelected ? "#000000" : "#ffffff",
                    border: isSelected ? "1px solid #000000" : isHovered ? "1px solid #000000" : "1px solid #e5e2de",
                    padding: "24px 20px",
                    cursor: selectedOption ? "default" : "pointer",
                    textAlign: "center",
                    minWidth: "180px",
                    flex: "1 1 180px",
                    maxWidth: "220px",
                    transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                    lineHeight: 1.3,
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <VotingPointsEarned />
        </div>
      )}
    </div>
  );
}

/* ─── Version 3: Voting Form Field ─── */
function VotingVersion3({
  questionData,
  showPoints,
  questionVisible,
  onSubmit,
}: {
  questionData: { question: string; options: string[] };
  showPoints: boolean;
  questionVisible: boolean;
  onSubmit: (answer: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim()) return;
    onSubmit(inputValue.trim());
    setInputValue("");
  }, [inputValue, onSubmit]);

  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: questionVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!showPoints ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", padding: "20px" }}>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              fontWeight: 400,
              color: "#000000",
              textAlign: "center",
              margin: "0 0 36px 0",
            }}
          >
            {questionData.question}
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "480px",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
              placeholder="Type your answer..."
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 400,
                border: "none",
                borderBottom: focused ? "1px solid #000000" : "1px solid #e5e2de",
                padding: "12px 0",
                backgroundColor: "transparent",
                width: "100%",
                maxWidth: "480px",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
            />
            <button
              onClick={handleSubmit}
              onMouseEnter={() => setSubmitHovered(true)}
              onMouseLeave={() => setSubmitHovered(false)}
              style={{
                marginTop: "24px",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: submitHovered ? "#222222" : "#000000",
                border: "none",
                height: "38px",
                borderRadius: "40px",
                padding: "0 22px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            >
              submit
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <VotingPointsEarned />
        </div>
      )}
    </div>
  );
}

/* ─── Voting Content ─── */
function VotingContent({ onAnsweredCountChange }: { onAnsweredCountChange: (count: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showPoints, setShowPoints] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(true);
  const currentPointsRef = useRef(50);
  const totalEarned = useRef(0);

  /* Shuffle all questions, pick 8, assign random variation (1/2/3) per question — once per mount */
  const selectedQuestionsRef = useRef<{ question: string; options: string[]; images?: string[]; variation: number }[]>([]);
  if (selectedQuestionsRef.current.length === 0) {
    const shuffled = [...allVotingQuestions].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, VOTING_DISPLAY_COUNT);
    selectedQuestionsRef.current = picked.map((q) => ({
      ...q,
      variation: Math.floor(Math.random() * 3) + 1,
    }));
  }

  const votingQuestions = selectedQuestionsRef.current;

  /* Stable random image map for variation 1 — assigned once per mount */
  const imageMapRef = useRef<Record<string, string>>({});
  if (Object.keys(imageMapRef.current).length === 0) {
    const shuffled = [...votingImages].sort(() => Math.random() - 0.5);
    let idx = 0;
    votingQuestions.forEach((q) => {
      q.options.forEach((opt, optIdx) => {
        if (q.images && q.images[optIdx]) {
          imageMapRef.current[opt] = q.images[optIdx];
        } else {
          imageMapRef.current[opt] = shuffled[idx % shuffled.length];
          idx++;
        }
      });
    });
  }

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) currentPointsRef.current = detail.points;
    };
    window.addEventListener("points-updated", handler);
    return () => window.removeEventListener("points-updated", handler);
  }, []);

  useEffect(() => {
    onAnsweredCountChange(answeredCount);
  }, [answeredCount, onAnsweredCountChange]);

  const advanceAfterPoints = useCallback((newCount: number) => {
    setTimeout(() => {
      if (newCount >= VOTING_DISPLAY_COUNT) {
        setTransitioning(true);
        setQuestionVisible(false);
        setTimeout(() => {
          setAllDone(true);
          setQuestionVisible(true);
        }, 300);
      } else {
        setTransitioning(true);
        setQuestionVisible(false);
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedOption(null);
          setShowPoints(false);
          setTransitioning(false);
          setQuestionVisible(true);
        }, 300);
      }
    }, 1200);
  }, []);

  const awardPoints = useCallback(() => {
    setShowPoints(true);
    const pts = 5;
    totalEarned.current += pts;
    const newTotal = currentPointsRef.current + pts;
    currentPointsRef.current = newTotal;
    window.dispatchEvent(new CustomEvent("points-updated", { detail: { points: newTotal } }));

    const newCount = answeredCount + 1;
    setAnsweredCount(newCount);
    return newCount;
  }, [answeredCount]);

  const handleOptionClick = useCallback((option: string) => {
    if (selectedOption || transitioning) return;
    setSelectedOption(option);

    setTimeout(() => {
      const newCount = awardPoints();
      advanceAfterPoints(newCount);
    }, 600);
  }, [selectedOption, transitioning, awardPoints, advanceAfterPoints]);

  const handleFormSubmit = useCallback((answer: string) => {
    if (transitioning) return;
    setSelectedOption(answer);

    setTimeout(() => {
      const newCount = awardPoints();
      advanceAfterPoints(newCount);
    }, 600);
  }, [transitioning, awardPoints, advanceAfterPoints]);

  if (allDone) {
    return (
      <>
        <VotingComplete totalEarned={totalEarned.current} questionVisible={questionVisible} />
        <style>{`
          @keyframes votingPointsIn {
            0% { opacity: 0; transform: translateY(8px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes votingOverlayIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </>
    );
  }

  const currentQ = votingQuestions[currentQuestion];
  const variation = currentQ?.variation ?? 2;

  return (
    <>
      {variation === 1 && (
        <VotingVersion1
          questionData={currentQ}
          selectedOption={selectedOption}
          showPoints={showPoints}
          questionVisible={questionVisible}
          hoveredOption={hoveredOption}
          onOptionClick={handleOptionClick}
          onHoverOption={setHoveredOption}
          imageMap={imageMapRef.current}
        />
      )}
      {variation === 2 && (
        <VotingVersion2
          questionData={currentQ}
          selectedOption={selectedOption}
          showPoints={showPoints}
          questionVisible={questionVisible}
          hoveredOption={hoveredOption}
          onOptionClick={handleOptionClick}
          onHoverOption={setHoveredOption}
        />
      )}
      {variation === 3 && (
        <VotingVersion3
          questionData={currentQ}
          showPoints={showPoints}
          questionVisible={questionVisible}
          onSubmit={handleFormSubmit}
        />
      )}

      <style>{`
        @keyframes votingPointsIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes votingOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

/* ─── Check-in data ─── */
const checkinRewardCycles = [
  ["+5 goop credit", "+10 goop credit", "Free sample", "+15 goop credit", "2x goop credit today", "+25 goop credit", "Mystery gift"],
  ["+10 goop credit", "Free mini", "+20 goop credit", "Early access", "+15 goop credit", "Beauty tool", "+50 goop credit"],
  ["+5 goop credit", "+15 goop credit", "Lip balm", "+10 goop credit", "Free shipping", "+30 goop credit", "Deluxe sample"],
];

const checkinDayIcons = [DollarSignCircle, Star, GiftBox, Bolt, DiscountTag, DeliveryTruck, Headphones];
const checkinTierImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg"];

/* ─── Check-in Card ─── */
function CheckInCard({
  dayNum, isChecked, isCurrent, isFuture, isFlipping: isFlippingThis,
  IconComponent, bgImage, reward,
}: {
  dayNum: number; isChecked: boolean; isCurrent: boolean; isFuture: boolean;
  isFlipping: boolean; IconComponent: React.ComponentType<{ size: number; color: string }>;
  bgImage: string; reward: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        minWidth: "calc((100% - 72px) / 4)",
        width: "calc((100% - 72px) / 4)",
        flexShrink: 0,
        perspective: "800px",
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          height: "380px",
          transformStyle: "preserve-3d",
          transition: isFlippingThis ? "none" : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isFlippingThis
            ? undefined
            : hovered && !isFuture
              ? "rotateY(180deg)"
              : "rotateY(0deg)",
          animation: isFlippingThis ? "checkinFlip 0.7s ease forwards" : "none",
        }}
      >
        {/* ── Front face ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            overflow: "hidden",
            opacity: isFuture ? 0.4 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, backgroundColor: isChecked ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.50)" }} />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 16px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: isChecked ? "#ffffff" : "#1a1a1a",
                backgroundColor: isChecked ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.92)",
                padding: "6px 14px",
                borderRadius: "40px",
                lineHeight: 1,
              }}
            >
              Day {dayNum}
            </span>

            {isChecked ? (
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 12.5L10 16.5L18 8.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : (
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconComponent size={22} color="#ffffff" />
              </div>
            )}

            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#ffffff",
                textAlign: "center",
                lineHeight: 1.4,
                opacity: isChecked ? 0.55 : 1,
              }}
            >
              {reward}
            </span>
          </div>
        </div>

        {/* ── Back face ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            overflow: "hidden",
            opacity: isFuture ? 0.4 : 1,
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.80)" }} />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              padding: "24px 16px",
            }}
          >
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>
              Day {dayNum}
            </span>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconComponent size={22} color="#ffffff" />
            </div>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "#ffffff", textAlign: "center", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              {reward}
            </span>
            {isChecked && (
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.45)" }}>
                Claimed
              </span>
            )}
            {isCurrent && (
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
                Available today
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Check-in Content ─── */
function CheckInContent({ onCheckedDaysChange, onStreakChange }: { onCheckedDaysChange: (days: number) => void; onStreakChange: (streak: number) => void }) {
  const [checkedDays, setCheckedDays] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [justCheckedIn, setJustCheckedIn] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [checkInHovered, setCheckInHovered] = useState(false);
  const currentPointsRef = useRef(50);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const cardImagesRef = useRef<string[]>([]);
  if (cardImagesRef.current.length === 0) {
    cardImagesRef.current = Array.from({ length: 7 }, () =>
      checkinTierImages[Math.floor(Math.random() * checkinTierImages.length)]
    );
  }

  useEffect(() => { onCheckedDaysChange(checkedDays); }, [checkedDays, onCheckedDaysChange]);
  useEffect(() => { onStreakChange(streakCount); }, [streakCount, onStreakChange]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) currentPointsRef.current = detail.points;
    };
    window.addEventListener("points-updated", handler);
    return () => window.removeEventListener("points-updated", handler);
  }, []);

  // Center current day on mount and change
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const idx = checkedDays < 7 ? checkedDays : 6;
    const card = carousel.children[idx] as HTMLElement;
    if (card) {
      const target = card.offsetLeft - carousel.offsetWidth / 2 + card.offsetWidth / 2;
      carousel.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    }
  }, [checkedDays]);

  const rewards = checkinRewardCycles[currentCycle % 3];

  const handleCheckIn = useCallback(() => {
    if (isFlipping || checkedDays >= 7) return;
    setIsFlipping(true);
    setJustCheckedIn(false);

    setTimeout(() => {
      const newChecked = checkedDays + 1;
      setCheckedDays(newChecked);
      setStreakCount((s) => s + 1);
      setJustCheckedIn(true);

      const reward = rewards[checkedDays];
      const match = reward.match(/\+(\d+)\s*goop credit/i);
      if (match) {
        const pts = parseInt(match[1], 10);
        const newTotal = currentPointsRef.current + pts;
        currentPointsRef.current = newTotal;
        window.dispatchEvent(new CustomEvent("points-updated", { detail: { points: newTotal } }));
      }

      if (newChecked === 7) {
        setTimeout(() => {
          setCheckedDays(0);
          setCurrentCycle((prev) => (prev + 1) % 3);
          setJustCheckedIn(false);
          cardImagesRef.current = Array.from({ length: 7 }, () =>
            checkinTierImages[Math.floor(Math.random() * checkinTierImages.length)]
          );
        }, 1500);
      }
    }, 350);

    setTimeout(() => { setIsFlipping(false); }, 700);
  }, [isFlipping, checkedDays, rewards]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
    dragScrollLeft.current = carouselRef.current?.scrollLeft || 0;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    carouselRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current);
  };
  const handleMouseUp = () => { isDragging.current = false; };

  return (
    <div style={{ padding: "48px 48px 44px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "8px" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 400, color: "#000000", margin: "0 0 6px 0", letterSpacing: "-0.01em" }}>
            Daily Check-in
          </h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "#888888", margin: 0, lineHeight: 1.5 }}>
            Build your streak and unlock daily rewards.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 8.5 7 8.5 11C8.5 13 9.5 14.5 11 15.5C10 14 10.5 12 12 10.5C13.5 12 14 14 13 15.5C14.5 14.5 15.5 13 15.5 11C15.5 7 12 2 12 2Z" fill="#E8913A" />
            <path d="M12 22C8.13 22 5 18.87 5 15C5 11.5 8 7.5 12 2C16 7.5 19 11.5 19 15C19 18.87 15.87 22 12 22Z" stroke="#E8913A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 400, color: "#000000", letterSpacing: "-0.01em", lineHeight: 1 }}>
            {streakCount}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "#888888" }}>
            Days<br />Streak
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "#e5e2de", margin: "20px 0 32px" }} />

      {/* Day cards — draggable, today centered */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          display: "flex",
          gap: "24px",
          marginBottom: "36px",
          overflowX: "auto",
          scrollbarWidth: "none",
          padding: "20px 0",
          msOverflowStyle: "none",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <CheckInCard
            key={i}
            dayNum={i + 1}
            isChecked={i < checkedDays}
            isCurrent={i === checkedDays && checkedDays < 7}
            isFuture={i > checkedDays}
            isFlipping={isFlipping && i === checkedDays}
            IconComponent={checkinDayIcons[i]}
            bgImage={cardImagesRef.current[i]}
            reward={rewards[i]}
          />
        ))}
      </div>

      {/* Action area */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
        {justCheckedIn && checkedDays < 7 ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 12.5L10 16.5L18 8.5" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 600, color: "#000000" }}>
                Checked in.
              </span>
            </div>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "#888888" }}>
              See you tomorrow!
            </span>
          </>
        ) : (
          <button
            onClick={handleCheckIn}
            onMouseEnter={() => setCheckInHovered(true)}
            onMouseLeave={() => setCheckInHovered(false)}
            disabled={isFlipping}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: isFlipping ? "#444444" : checkInHovered ? "#222222" : "#000000",
              border: "none",
              height: "38px",
              padding: "0 32px",
              borderRadius: "40px",
              cursor: isFlipping ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease",
              lineHeight: 1,
            }}
          >
            Check in today
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: "480px", margin: "0 auto 10px", height: "3px", backgroundColor: "#e5e2de", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(checkedDays / 7) * 100}%`, backgroundColor: "#000000", borderRadius: "2px", transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }} />
      </div>

      {/* Progress text */}
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "#888888", textAlign: "center", margin: 0 }}>
        <span style={{ fontWeight: 600, color: "#000000" }}>{checkedDays}</span> of 7 days completed
      </p>

      <style>{`
        @keyframes checkinFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── Activities Section ─── */
export default function Activities() {
  const [activeTab, setActiveTab] = useState<"achievements" | "voting" | "check-in">("achievements");
  const [achievementsTabHovered, setAchievementsTabHovered] = useState(false);
  const [votingTabHovered, setVotingTabHovered] = useState(false);
  const [checkinTabHovered, setCheckinTabHovered] = useState(false);
  const [claimedCount, setClaimedCount] = useState(2);
  const [votingAnsweredCount, setVotingAnsweredCount] = useState(0);
  const [checkinCheckedDays, setCheckinCheckedDays] = useState(0);
  const [checkinStreak, setCheckinStreak] = useState(0);
  const [hasClaimable, setHasClaimable] = useState(true);

  // Dispatch event for StickyNav red dot
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("activities-claimable", { detail: { hasClaimable } }));
  }, [hasClaimable]);

  const switchTab = useCallback((tab: "achievements" | "voting" | "check-in") => {
    setActiveTab(tab);
    const el = document.getElementById("section-activities");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 76 - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="section-activities"
      style={{
        padding: "0px 48px 100px",
        marginTop: "-80px",
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
        activities
      </h2>

      {/* Subtext */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 400,
          color: "#888888",
          textAlign: "center",
          margin: "0 0 36px 0",
          lineHeight: 1.4,
        }}
      >
        {activeTab === "achievements" && "Unlock achievements by shopping and engaging with the brand."}
        {activeTab === "voting" && "Have a say in what happens next and earn +5 goop credit."}
        {activeTab === "check-in" && "Check in daily to earn rewards and build your streak."}
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
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => switchTab("achievements")}
            onMouseEnter={() => setAchievementsTabHovered(true)}
            onMouseLeave={() => setAchievementsTabHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "40px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "achievements" ? "#000000" : "transparent",
              color: activeTab === "achievements" ? "#ffffff" : "#000000",
              border: activeTab === "achievements" ? "1px solid #000000" : achievementsTabHovered ? "1px solid #000000" : "1px solid #d5d5d5",
            }}
          >
            achievements{" "}
            <span
              style={{
                fontWeight: 400,
                color: activeTab === "achievements" ? "rgba(255,255,255,0.45)" : "#aaaaaa",
                marginLeft: "6px",
              }}
            >
              (<span style={{ fontWeight: 600, color: activeTab === "achievements" ? "rgba(255,255,255,0.45)" : "#aaaaaa" }}>{claimedCount}</span>/{achievements.length})
            </span>
          </button>
          <button
            onClick={() => switchTab("voting")}
            onMouseEnter={() => setVotingTabHovered(true)}
            onMouseLeave={() => setVotingTabHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "40px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "voting" ? "#000000" : "transparent",
              color: activeTab === "voting" ? "#ffffff" : "#000000",
              border: activeTab === "voting" ? "1px solid #000000" : votingTabHovered ? "1px solid #000000" : "1px solid #d5d5d5",
            }}
          >
            voting{" "}
            <span
              style={{
                fontWeight: 400,
                color: activeTab === "voting" ? "rgba(255,255,255,0.45)" : "#aaaaaa",
                marginLeft: "6px",
              }}
            >
              (<span style={{ fontWeight: 600, color: activeTab === "voting" ? "rgba(255,255,255,0.45)" : "#aaaaaa" }}>{votingAnsweredCount}</span>/{VOTING_DISPLAY_COUNT})
            </span>
          </button>
          {/* check-in tab hidden for now */}
        </div>

        {/* Tab content */}
        {activeTab === "achievements" && <AchievementsContent onClaimedCountChange={setClaimedCount} onHasClaimableChange={setHasClaimable} />}
        {activeTab === "voting" && (
          <div
            style={{
              border: "1px solid #e5e2de",
              backgroundColor: "#ffffff",
            }}
          >
            <VotingContent onAnsweredCountChange={setVotingAnsweredCount} />
          </div>
        )}
        {/* check-in content hidden for now */}
      </div>

      <style>{`
        [data-carousel]::-webkit-scrollbar { display: none; }
        @keyframes votingDrawCheck {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes achieveSheen {
          0% { transform: rotate(25deg) translateX(0); }
          100% { transform: rotate(25deg) translateX(500px); }
        }
      `}</style>
    </section>
  );
}
