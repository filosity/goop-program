"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@vectoricons/atlas-icons-react";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ─── Achievement data ─── */
const achievements = [
  {
    id: "ag-sporting-event",
    title: "AG at a Sporting Event",
    description: "Share a photo of you with AG1 at a sporting event.",
    reward: "+$3 AG Credit",
    code: "SPORT3",
    codeHint: "apply this code to claim your $3 AG Credit",
    goal: 1,
    image: "/achievement_sportevent.avif",
  },
  {
    id: "agz-subscriber",
    title: "AG1 + AGZ Subscriber",
    description: "Subscribe to both AG1 and AG1 Zero (AGZ) to unlock this bonus.",
    reward: "+$5 AG Credit",
    code: "AGZDUO5",
    codeHint: "apply this code to claim your $5 AG Credit",
    goal: 1,
    image: "/earn2.jpg",
  },
  {
    id: "refer-review",
    title: "Refer & Review",
    description: "Refer a friend and leave a product review.",
    reward: "+$5 AG Credit",
    code: "REFREVIEW5",
    codeHint: "apply this code to claim your $5 AG Credit",
    goal: 2,
    image: "/earn3.jpg",
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
  isMobile,
}: {
  achievement: (typeof achievements)[number];
  progress: number;
  claimable: boolean;
  claimed: boolean;
  redeemed: boolean;
  celebrating: boolean;
  onClick: () => void;
  onClaim: () => void;
  isMobile: boolean;
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
        width: isMobile ? "100%" : "360px",
        minWidth: isMobile ? "100%" : "360px",
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
          height: "300px",
          overflow: "hidden",
          border: "1px solid #d4e0df",
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
            fontFamily: "var(--font-mono)",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1,
            padding: "6px 12px",
            borderRadius: "999px",
            backgroundColor: redeemed || claimed || claimClicked ? "#0C3D3D" : isComplete ? "#E8913A" : "rgba(255,255,255,0.92)",
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
                  fill="#0C3D3D"
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
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#0C3D3D",
                  backgroundColor: claimHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
                  border: "none",
                  minHeight: "52px",
                  padding: "0 36px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  lineHeight: 1,
                  transition: "background-color 0.2s ease, opacity 0.2s ease",
                  animation: "achieveClaimIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                }}
              >
                Claim →
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
              const colors = ["#0C3D3D", "#0d8b87", "#14504F", "#1a6b5a", "#2d8f6f", "#0a3030", "#3da88a", "#276b5d"];
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
          border: "1px solid #d4e0df",
          borderTop: "none",
          backgroundColor: "#ffffff",
          flex: 1,
        }}
      >
        {/* Title */}
        <h4
          style={{
            fontFamily: "var(--font-sans)",
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
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "#000000",
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
                  fontFamily: "var(--font-mono)",
                  fontSize: "16px",
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
                  fontSize: "17px",
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
                backgroundColor: "#d4e0df",
                overflow: "hidden",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  backgroundColor: "#0C3D3D",
                  transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>

            {/* Progress text */}
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 400,
                color: "#000000",
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
                fontFamily: "var(--font-mono)",
                fontSize: "16px",
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
                fontSize: "17px",
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
                  backgroundColor: "#f0f5f5",
                  marginBottom: "8px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#6b8a89" />
                  <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#000000",
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
                      backgroundColor: "#f5f8f8",
                      border: "1px solid #d4e0df",
                      borderRight: "none",
                      padding: "10px 14px",
                      minHeight: "52px",
                      display: "flex",
                      alignItems: "center",
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
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#ffffff",
                      backgroundColor: "#0C3D3D",
                      border: "1px solid #0C3D3D",
                      minHeight: "52px",
                      padding: "10px 24px",
                      cursor: "pointer",
                      lineHeight: 1,
                      transition: "background-color 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                {/* Tooltip — above copy button */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    right: 0,
                    transform: `translateY(${copied ? "0px" : "4px"})`,
                    backgroundColor: "#eaf2f2",
                    color: "#000000",
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
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
                  <div style={{ position: "absolute", top: "100%", right: "16px", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #eaf2f2" }} />
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
function AchievementsContent({ onClaimedCountChange, onHasClaimableChange, isMobile }: { onClaimedCountChange: (count: number) => void; onHasClaimableChange: (has: boolean) => void; isMobile: boolean }) {
  const [progress, setProgress] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    achievements.forEach((a) => { init[a.id] = 0; });
    return init;
  });
  const [claimable, setClaimable] = useState<Record<string, boolean>>({});
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});
  const [redeemed] = useState<Set<string>>(new Set());
  const [celebratingId, setCelebratingId] = useState<string | null>(null);

  const currentPointsRef = useRef(5);

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
    // Add AG Credit from reward if applicable
    const achievement = achievements.find(a => a.id === id);
    if (achievement) {
      const match = achievement.reward.match(/\+\$(\d+(?:\.\d+)?)\s*AG Credit/i);
      if (match) {
        const dollars = parseFloat(match[1]);
        const newTotal = Math.round((currentPointsRef.current + dollars) * 100) / 100;
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
          flexDirection: isMobile ? "column" as const : "row" as const,
          gap: "16px",
          overflowX: isMobile ? "visible" as const : "auto" as const,
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: isMobile ? "default" : "grab",
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
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Arrow nav — only show if cards overflow (more than 3) */}
      {achievements.length > 3 && (
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
              border: leftArrowHovered ? "1px solid #000000" : "1px solid #d4e0df",
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
              border: rightArrowHovered ? "1px solid #000000" : "1px solid #d4e0df",
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
      )}

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
    question: "Which AG1 merch would you want most?",
    options: ["Puffer Jacket", "Stanley Cup", "Tote Bag", "Pajamas"],
    images: ["/featured-puffer-jacket.jpg", "/featured-stanley.jpg", "/milestone-tote.jpg", "/milestone-sweatpants.jpg"],
  },
  {
    question: "Which AG1 supplement interests you?",
    options: ["D3+K2", "Omega-3", "Travel Packs", "AG1 Original"],
    images: ["/product-d3k2.jpg", "/product-omega3.jpg", "/product-travelpacks-original.jpg", "/featured1.jpg"],
  },
  {
    question: "When do you take your AG1?",
    options: ["Morning", "Afternoon", "Evening", "Multiple times"],
  },
  {
    question: "How do you mix your AG1?",
    options: ["Water", "Smoothie", "Juice", "Other"],
  },
  {
    question: "Pick your ideal AG1 moment",
    options: ["Morning routine", "Post-workout", "On the go", "Outdoors"],
    images: ["/earn3.jpg", "/earn5.jpg", "/product-travelpacks-original.jpg", "/earn7.jpg"],
  },
  {
    question: "Do you travel with AG1?",
    options: ["Always", "Sometimes", "Never", "Didn\u2019t know I could"],
  },
  {
    question: "Tried AG1 Zero yet?",
    options: ["Love it", "Not yet", "Prefer original", "Didn\u2019t know about it"],
  },
  {
    question: "What\u2019s your go-to AG1 gear?",
    options: ["Shaker Bottle", "Travel Packs", "Hat", "Duffel Bag"],
    images: ["/featured-stanley.jpg", "/earn1.jpg", "/milestone-hat.jpg", "/milestone-duffel-bag.jpg"],
  },
];

const VOTING_DISPLAY_COUNT = 8;

/* ─── Fallback images for voting version 1 ─── */
const votingImages: string[] = [
  "/featured1.jpg",
  "/featured2.jpg",
  "/featured3.jpg",
  "/featured4.jpg",
  "/tier1.jpg",
  "/tier2.jpg",
  "/tier3.jpg",
  "/tier4.jpg",
  "/earn1.jpg",
  "/earn2.jpg",
  "/earn3.jpg",
  "/earn4.jpg",
  "/earn5.jpg",
  "/earn6.jpg",
  "/earn7.jpg",
  "/earn8.jpg",
  "/earn10.jpg",
  "/product-d3k2.jpg",
  "/product-omega3.jpg",
  "/product-travelpacks-original.jpg",
];

/* ─── Shared AG Credit earned animation (black circle, white checkmark) ─── */
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
          fill="#0C3D3D"
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
          fontSize: "16px",
          fontWeight: 600,
          color: "#000000",
          textAlign: "center",
        }}
      >
        +$0.25 AG Credit earned
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
          fontFamily: "var(--font-sans)",
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
          fontSize: "16px",
          fontWeight: 400,
          color: "#000000",
          textAlign: "center",
          margin: "0 0 24px 0",
        }}
      >
        Check back tomorrow!
      </p>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "18px",
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "#0C3D3D",
          padding: "0 32px",
          minHeight: "52px",
          borderRadius: "999px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        +${totalEarned.toFixed(2)} AG Credit earned today
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
              fontFamily: "var(--font-sans)",
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
              width: "100%",
              maxWidth: "1100px",
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
                    flex: "1 1 0",
                    minWidth: 0,
                    maxWidth: "220px",
                  }}
                >
                  <div
                    onClick={() => onOptionClick(option)}
                    onMouseEnter={() => onHoverOption(option)}
                    onMouseLeave={() => onHoverOption(null)}
                    style={{
                      width: "100%",
                      aspectRatio: "3 / 3.5",
                      cursor: selectedOption ? "default" : "pointer",
                      boxShadow: isSelected ? "inset 0 0 0 1px #0C3D3D" : isHovered ? "inset 0 0 0 1px #0C3D3D" : "inset 0 0 0 1px #d4e0df",
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
                      fontSize: "18px",
                      fontWeight: 600,
                      color: isSelected ? "#ffffff" : "#0C3D3D",
                      backgroundColor: isSelected ? "#0C3D3D" : "transparent",
                      border: isSelected ? "1px solid #0C3D3D" : isHovered ? "1px solid #0C3D3D" : "1px solid #0C3D3D",
                      minHeight: "52px",
                      padding: "0 32px",
                      borderRadius: "999px",
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
              fontFamily: "var(--font-sans)",
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
                    fontSize: "18px",
                    fontWeight: 500,
                    color: isSelected ? "#ffffff" : "#0C3D3D",
                    backgroundColor: isSelected ? "#0C3D3D" : "#ffffff",
                    border: isSelected ? "1px solid #0C3D3D" : isHovered ? "1px solid #0C3D3D" : "1px solid #0C3D3D",
                    padding: "24px 30px",
                    minHeight: "52px",
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
              fontFamily: "var(--font-sans)",
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
                borderBottom: focused ? "1px solid #000000" : "1px solid #d4e0df",
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
                fontSize: "18px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: submitHovered ? "#155050" : "#0C3D3D",
                border: "1px solid #0C3D3D",
                minHeight: "52px",
                borderRadius: "999px",
                padding: "0 32px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            >
              Submit →
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
  const currentPointsRef = useRef(5);
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
    const pts = 0.25;
    totalEarned.current = Math.round((totalEarned.current + pts) * 100) / 100;
    const newTotal = Math.round((currentPointsRef.current + pts) * 100) / 100;
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

/* ─── Streak reward milestones ─── */
const streakRewards = [
  { name: "AG1 Shaker Bottle", image: "/featured-stanley.jpg", code: "SHAKER7" },
  { name: "Travel Packs", image: "/earn1.jpg", code: "TRAVEL14" },
  { name: "$2 AG Credit", image: "/featured1.jpg", code: "STREAK2" },
  { name: "AG1 Hat", image: "/milestone-hat.jpg", code: "HAT28" },
  { name: "Free Shipping", image: "/earn2.jpg", code: "FREESHIP" },
  { name: "$1 AG Credit", image: "/featured2.jpg", code: "STREAK1" },
  { name: "AG1 Tote", image: "/milestone-tote.jpg", code: "TOTE42" },
];

/* ─── Daily Check-in Content ─── */
function DailyStreakContent({ onStreakChange, isMobile }: { onStreakChange: (streak: number) => void; isMobile: boolean }) {
  const [checkedCount, setCheckedCount] = useState(0);
  const [checkInHovered, setCheckInHovered] = useState(false);
  const [animatingDay, setAnimatingDay] = useState<number | null>(null);
  const [claimedRewards, setClaimedRewards] = useState<Set<number>>(new Set());
  const [claimingReward, setClaimingReward] = useState<number | null>(null);
  const [celebratingReward, setCelebratingReward] = useState<number | null>(null);
  const [copiedRewardDay, setCopiedRewardDay] = useState<number | null>(null);
  const [hasCheckedOnce, setHasCheckedOnce] = useState(false);
  const [showCheckedMessage, setShowCheckedMessage] = useState(false);
  const [earnedDay, setEarnedDay] = useState<number | null>(null);

  const currentDay = 1 + checkedCount;
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const checkinPointsRef = useRef(5);

  // Sync points from other components
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) checkinPointsRef.current = detail.points;
    };
    window.addEventListener("points-updated", handler);
    return () => window.removeEventListener("points-updated", handler);
  }, []);

  useEffect(() => { onStreakChange(checkedCount); }, [checkedCount, onStreakChange]);

  // Get reward for a given day (every 7th day)
  const getReward = useCallback((dayNum: number): typeof streakRewards[0] | null => {
    if (dayNum > 0 && dayNum % 7 === 0) {
      const idx = (dayNum / 7 - 1) % streakRewards.length;
      return streakRewards[idx];
    }
    return null;
  }, []);

  const handleDayClick = useCallback((dayNum: number) => {
    if (hasDragged.current) return;
    if (dayNum !== currentDay) return;
    if (showCheckedMessage) return;
    setAnimatingDay(dayNum);
    setCheckedCount((c) => c + 1);
    setTimeout(() => setAnimatingDay(null), 700);
    if (!hasCheckedOnce) {
      setShowCheckedMessage(true);
      setHasCheckedOnce(true);
      setTimeout(() => setShowCheckedMessage(false), 2800);
    }
    // Award $0.25 AG Credit for each check-in
    const newTotal = Math.round((checkinPointsRef.current + 0.25) * 100) / 100;
    checkinPointsRef.current = newTotal;
    window.dispatchEvent(new CustomEvent("points-updated", { detail: { points: newTotal } }));
    setEarnedDay(dayNum);
    setTimeout(() => setEarnedDay(null), 1800);
    // Auto-claim reward if checking in on a reward day
    const reward = getReward(dayNum);
    if (reward && !claimedRewards.has(dayNum)) {
      setCelebratingReward(dayNum);
      setTimeout(() => setCelebratingReward(null), 2400);
      setTimeout(() => {
        setClaimedRewards((prev) => { const next = new Set(prev); next.add(dayNum); return next; });
      }, 900);
    }
  }, [currentDay, hasCheckedOnce, showCheckedMessage, getReward, claimedRewards]);

  const handleClaimReward = useCallback((dayNum: number) => {
    if (hasDragged.current) return;
    if (claimedRewards.has(dayNum) || claimingReward !== null) return;
    setClaimingReward(dayNum);
    setCelebratingReward(dayNum);
    setTimeout(() => {
      setClaimedRewards((prev) => { const next = new Set(prev); next.add(dayNum); return next; });
      setClaimingReward(null);
    }, 1000);
    setTimeout(() => setCelebratingReward(null), 2400);
  }, [claimedRewards, claimingReward]);

  const handleCopyCode = useCallback((code: string, dayNum: number) => {
    navigator.clipboard.writeText(code);
    setCopiedRewardDay(dayNum);
    setTimeout(() => setCopiedRewardDay(null), 2000);
  }, []);

  // Drag scroll handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.scrollBehavior = "auto";
    el.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    el.scrollLeft = dragScrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
      el.style.cursor = "grab";
    }
    // Reset hasDragged after a tick so click handlers still see it during the same event loop
    requestAnimationFrame(() => { hasDragged.current = false; });
  }, []);

  const handleShowHistory = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: 0, behavior: "smooth" });
  }, []);

  // Find next reward from current position
  const nextReward = (() => {
    for (let d = currentDay; d <= currentDay + 30; d++) {
      const r = getReward(d);
      if (r && !claimedRewards.has(d)) {
        return { reward: r, dayNum: d, daysAway: d - currentDay };
      }
    }
    return null;
  })();

  // Build all visible days: 1 to currentDay + 30
  const totalDays = currentDay + 30;
  const days = Array.from({ length: totalDays }, (_, i) => {
    const dayNum = i + 1;
    const isChecked = dayNum < currentDay;
    const isToday = dayNum === currentDay;
    const isAnimating = dayNum === animatingDay;
    const reward = getReward(dayNum);
    const isRewardEarned = isChecked && reward !== null;
    const isRewardClaimed = claimedRewards.has(dayNum);
    const isRewardClaiming = claimingReward === dayNum;
    const isCelebrating = celebratingReward === dayNum;
    return { dayNum, isChecked, isToday, isAnimating, reward, isRewardEarned, isRewardClaimed, isRewardClaiming, isCelebrating };
  });

  // Calculate progress width for timeline bar
  const REGULAR_WIDTH = 100;
  const REWARD_WIDTH = 140;
  const progressWidth = (() => {
    if (checkedCount === 0) return 0;
    const lastCheckedIndex = currentDay - 2; // 0-indexed, last checked day
    if (lastCheckedIndex < 0) return 0;
    let w = 0;
    for (let i = 0; i <= lastCheckedIndex; i++) {
      const dayWidth = days[i].reward ? REWARD_WIDTH : REGULAR_WIDTH;
      if (i < lastCheckedIndex) {
        w += dayWidth;
      } else {
        w += dayWidth / 2;
      }
    }
    return w;
  })();

  return (
    <div
      style={{
        border: "1px solid #d4e0df",
        backgroundColor: "#ffffff",
        padding: isMobile ? "24px 16px" : "48px",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "32px", fontWeight: 400, color: "#000000", margin: "0 0 6px 0", letterSpacing: "-0.01em" }}>
            Daily Check-in
          </h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 400, color: "#000000", margin: 0, lineHeight: 1.5 }}>
            Check in daily and unlock milestone rewards.
          </p>
          {checkedCount > 0 && (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleShowHistory(); }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#000000",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "0.5px",
                marginTop: "8px",
                marginBottom: "16px",
                display: "inline-block",
              }}
            >
              Rewards History
            </a>
          )}
        </div>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "36px", fontWeight: 400, color: "#000000", letterSpacing: "-0.02em", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            {checkedCount}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#E8913A" style={{ flexShrink: 0 }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 600, color: "#000000", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1, marginTop: "6px", display: "block" }}>
            Days streak
          </span>
        </div>
      </div>

      {/* Next reward preview — text left, image right (fixed height) */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" as const : "row" as const,
          marginBottom: "32px",
          border: "1px solid #d4e0df",
          overflow: "hidden",
          height: isMobile ? "auto" : "260px",
        }}
      >
        {nextReward ? (
          <>
            <div
              style={{
                flex: 1,
                backgroundColor: "#ffffff",
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "18px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#000000",
                  margin: "0 0 12px 0",
                  lineHeight: 1,
                }}
              >
                {nextReward.daysAway === 0 ? "Today\u2019s reward" : `Unlocks in ${nextReward.daysAway} day${nextReward.daysAway === 1 ? "" : "s"}`}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "#000000",
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {nextReward.reward.name}
              </p>
            </div>
            <div style={{ width: isMobile ? "100%" : "510px", maxWidth: isMobile ? "100%" : "510px", height: isMobile ? "200px" : "auto", flexShrink: 0 }}>
              <img
                src={nextReward.reward.image}
                alt={nextReward.reward.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              padding: "36px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#000000",
                margin: 0,
                lineHeight: 1,
              }}
            >
              All rewards claimed
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "28px",
                fontWeight: 400,
                color: "#000000",
                margin: "12px 0 0 0",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Keep your streak going!
            </p>
          </div>
        )}
      </div>

      {/* Timeline — drag to scroll */}
      <div
        ref={scrollRef}
        data-streak-scroll=""
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
          userSelect: "none",
          marginBottom: "36px",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          minWidth: "fit-content",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}>
          {/* Background line */}
          <div style={{
            position: "absolute",
            top: `${8 + 47}px`,
            left: 0,
            right: 0,
            height: "3px",
            backgroundColor: "#d4e0df",
            zIndex: 0,
          }} />

          {/* Progress fill */}
          <div style={{
            position: "absolute",
            top: `${8 + 47}px`,
            left: 0,
            height: "3px",
            backgroundColor: "#0C3D3D",
            zIndex: 1,
            transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            width: `${progressWidth}px`,
          }} />

          {days.map((day) => {
            const hasReward = day.reward !== null;
            const isClickable = day.isToday;

            return (
              <div
                key={day.dayNum}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: hasReward ? `${REWARD_WIDTH}px` : `${REGULAR_WIDTH}px`,
                  minWidth: hasReward ? `${REWARD_WIDTH}px` : `${REGULAR_WIDTH}px`,
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Circle row — fixed height for line alignment */}
                <div style={{ height: "96px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {hasReward ? (
                    /* Reward day — larger circle with image */
                    <div
                      onClick={() => {
                        if (isClickable) handleDayClick(day.dayNum);
                        else if (day.isRewardEarned && !day.isRewardClaimed && !day.isRewardClaiming) handleClaimReward(day.dayNum);
                      }}
                      style={{
                        width: "96px",
                        height: "96px",
                        borderRadius: "50%",
                        overflow: day.isCelebrating ? "visible" : "hidden",
                        position: "relative",
                        cursor: isClickable || (day.isRewardEarned && !day.isRewardClaimed) ? "pointer" : "default",
                        border: day.isToday
                          ? "3px solid #0C3D3D"
                          : day.isRewardEarned && !day.isRewardClaimed
                            ? "3px solid #E8913A"
                            : day.isChecked
                              ? "3px solid #0C3D3D"
                              : "3px solid #d4e0df",
                        backgroundColor: "#ffffff",
                        boxShadow: day.isToday
                          ? "0 0 0 3px rgba(12,61,61,0.2)"
                          : day.isRewardEarned && !day.isRewardClaimed
                            ? "0 0 0 3px rgba(232,145,58,0.2)"
                            : "none",
                        transition: "border-color 0.5s ease, box-shadow 0.5s ease",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={day.reward!.image}
                        alt={day.reward!.name}
                        draggable={false}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                          display: "block",
                          filter: day.isChecked ? "none" : "grayscale(0.6)",
                          opacity: day.isChecked ? 1 : 0.4,
                          transition: "filter 0.6s ease, opacity 0.6s ease",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Checked overlay (non-reward-earned) */}
                      {(day.isChecked || day.isAnimating) && !day.isRewardEarned && (
                        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                            <circle cx="14" cy="14" r="13" fill="#0C3D3D" style={{ transformOrigin: "14px 14px", animation: day.isAnimating ? "streakCirclePop 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none" }} />
                            <path d="M8 14.5L12 18.5L20 9.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 24, strokeDashoffset: day.isAnimating ? 24 : 0, animation: day.isAnimating ? "streakDrawCheck 0.4s ease 0.25s forwards" : "none" }} />
                          </svg>
                        </div>
                      )}

                      {/* Claimable overlay */}
                      {day.isRewardEarned && !day.isRewardClaimed && !day.isRewardClaiming && (
                        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", animation: "streakOverlayIn 0.3s ease forwards" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12l5 5L19 7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}

                      {/* Claiming animation */}
                      {day.isRewardClaiming && (
                        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
                          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ overflow: "visible" }}>
                            <circle cx="14" cy="14" r="13" fill="#0C3D3D" style={{ transformOrigin: "14px 14px", animation: "streakCirclePop 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }} />
                            <path d="M8 14.5L12 18.5L20 9.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 24, strokeDashoffset: 24, animation: "streakDrawCheck 0.4s ease 0.25s forwards" }} />
                          </svg>
                        </div>
                      )}

                      {/* Claimed badge */}
                      {day.isRewardClaimed && (
                        <div style={{ position: "absolute", bottom: "-2px", right: "-2px", zIndex: 4 }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#0C3D3D" />
                            <path d="M4.5 8.5L7 11L11.5 5.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}

                      {/* Confetti */}
                      {day.isCelebrating && (
                        <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", overflow: "visible" }}>
                          {Array.from({ length: 30 }).map((_, i) => {
                            const w = 5 + Math.random() * 6;
                            const h = i % 4 === 0 ? w : (3 + Math.random() * 5);
                            const angle = Math.random() * Math.PI * 2;
                            const dist = 40 + Math.random() * 110;
                            const dx = Math.cos(angle) * dist;
                            const dy = Math.sin(angle) * dist;
                            const spin = 180 + Math.random() * 540;
                            const colors = ["#0C3D3D", "#0d8b87", "#14504F", "#1a6b5a", "#2d8f6f", "#3da88a"];
                            return (
                              <div
                                key={i}
                                style={{
                                  position: "absolute", left: "50%", top: "50%",
                                  width: `${w}px`, height: `${h}px`,
                                  marginLeft: `${-w / 2}px`, marginTop: `${-h / 2}px`,
                                  borderRadius: i % 4 === 0 ? "50%" : "1px",
                                  backgroundColor: colors[i % colors.length],
                                  opacity: 0,
                                  animation: `streakConfetti ${1.8 + Math.random() * 0.6}s cubic-bezier(0.08, 0.82, 0.17, 1) ${i * 0.012}s forwards`,
                                  ["--dx" as string]: `${dx.toFixed(1)}px`,
                                  ["--dy" as string]: `${dy.toFixed(1)}px`,
                                  ["--spin" as string]: `${spin}deg`,
                                }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Regular day — small circle */
                    <div
                      onClick={() => isClickable && handleDayClick(day.dayNum)}
                      style={{
                        width: day.isToday ? "22px" : day.isChecked || day.isAnimating ? "16px" : "14px",
                        height: day.isToday ? "22px" : day.isChecked || day.isAnimating ? "16px" : "14px",
                        borderRadius: "50%",
                        backgroundColor: day.isChecked || day.isAnimating ? "#0C3D3D" : day.isToday ? "#ffffff" : "#d4e0df",
                        border: day.isToday ? "3px solid #0C3D3D" : "none",
                        boxShadow: day.isToday ? "0 0 0 3px rgba(12,61,61,0.2)" : "none",
                        cursor: isClickable ? "pointer" : "default",
                        transition: "background-color 0.5s ease, box-shadow 0.5s ease, width 0.5s ease, height 0.5s ease",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>

                {/* Day label */}
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: day.isToday ? 700 : 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#000000",
                  lineHeight: 1,
                  marginTop: "10px",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}>
                  Day {day.dayNum}
                </span>

                {/* $0.25 AG Credit for normal checked days */}
                {!hasReward && (day.isChecked || earnedDay === day.dayNum) && (
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#000000",
                    lineHeight: 1,
                    marginTop: "8px",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    opacity: earnedDay === day.dayNum ? 0 : 1,
                    transform: earnedDay === day.dayNum ? "translateY(4px)" : "translateY(0)",
                    animation: earnedDay === day.dayNum ? "streakCreditPop 0.5s ease 0.3s forwards" : "none",
                  }}>
                    +$0.25
                  </span>
                )}

                {/* Reward info below */}
                {hasReward ? (
                  day.isRewardClaimed ? (
                    <div style={{ width: "100%", marginTop: "8px" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#000000", textAlign: "center", lineHeight: 1.2, display: "block", marginBottom: "6px" }}>
                        {day.reward!.name}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <div style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          color: "#000000",
                          backgroundColor: "#f5f8f8",
                          border: "1px solid #d4e0df",
                          borderRight: "none",
                          padding: "8px 10px",
                          lineHeight: 1,
                          flex: 1,
                          minWidth: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          {day.reward!.code}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCopyCode(day.reward!.code, day.dayNum); }}
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#ffffff",
                            backgroundColor: "#0C3D3D",
                            border: "1px solid #0C3D3D",
                            padding: "8px 12px",
                            lineHeight: 1,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {copiedRewardDay === day.dayNum ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: day.isChecked ? "#000000" : "#999",
                      textAlign: "center",
                      lineHeight: 1.2,
                      marginTop: "8px",
                      maxWidth: "120px",
                      transition: "color 0.3s ease",
                    }}>
                      {day.reward!.name}
                    </span>
                  )
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Check-in button / confirmation */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minHeight: "80px", justifyContent: "center" }}>
        {showCheckedMessage ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", animation: "streakCheckedIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ overflow: "visible" }}>
              <circle cx="20" cy="20" r="19" fill="#0C3D3D" style={{ transformOrigin: "20px 20px", animation: "streakCirclePop 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }} />
              <path d="M12 21L17.5 26.5L28 14" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 28, strokeDashoffset: 28, animation: "streakDrawCheck 0.4s ease 0.25s forwards" }} />
            </svg>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 600, color: "#000000", margin: 0, lineHeight: 1, animation: "streakTextFade 0.4s ease 0.3s both" }}>
              {"Checked in!"}
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "#000000", margin: 0, lineHeight: 1, animation: "streakTextFade 0.4s ease 0.5s both" }}>
              Check in again tomorrow
            </p>
          </div>
        ) : (
          <button
            onClick={() => handleDayClick(currentDay)}
            onMouseEnter={() => setCheckInHovered(true)}
            onMouseLeave={() => setCheckInHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: checkInHovered ? "#155050" : "#0C3D3D",
              border: "none",
              minHeight: "52px",
              padding: "0 40px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              lineHeight: 1,
            }}
          >
            {"Check In Today →"}
          </button>
        )}
      </div>

      <style>{`
        [data-streak-scroll]::-webkit-scrollbar { display: none; }
        [data-streak-scroll] img { -webkit-user-drag: none; user-select: none; pointer-events: none; }
        @keyframes streakCirclePop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes streakDrawCheck {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes streakOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes streakCheckedIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes streakTextFade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes streakCreditPop {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes streakConfetti {
          0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
          70% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--spin)) scale(0); }
        }
        @keyframes streakSheen {
          0% { transform: rotate(25deg) translateX(0); }
          100% { transform: rotate(25deg) translateX(400%); }
        }
      `}</style>
    </div>
  );
}

/* ─── Activities Section ─── */
export default function Activities() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<"streak" | "achievements" | "voting">("streak");
  const [streakTabHovered, setStreakTabHovered] = useState(false);
  const [achievementsTabHovered, setAchievementsTabHovered] = useState(false);
  const [votingTabHovered, setVotingTabHovered] = useState(false);
  const [claimedCount, setClaimedCount] = useState(0);
  const [votingAnsweredCount, setVotingAnsweredCount] = useState(0);
  const [streakStreak, setStreakStreak] = useState(0);
  const [hasClaimable, setHasClaimable] = useState(false);

  // Dispatch event for StickyNav red dot
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("activities-claimable", { detail: { hasClaimable } }));
  }, [hasClaimable]);

  // Listen for tab switch from Featured section
  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent).detail?.tab;
      if (tab === "streak" || tab === "achievements" || tab === "voting") {
        setActiveTab(tab);
      }
    };
    window.addEventListener("activities-tab-switch", handler);
    return () => window.removeEventListener("activities-tab-switch", handler);
  }, []);

  const switchTab = useCallback((tab: "streak" | "achievements" | "voting") => {
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
        padding: isMobile ? "0px 16px 40px" : "0px 48px 100px",
        marginTop: "-30px",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: isMobile ? "28px" : "44px",
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
        Activities
      </h2>

      {/* Subtext */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "16px",
          fontWeight: 400,
          color: "#000000",
          textAlign: "left",
          margin: "0 0 36px 0",
          lineHeight: 1.4,
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {activeTab === "streak" && "Keep up your daily streak and unlock milestone rewards."}
        {activeTab === "achievements" && "Unlock achievements by engaging with AG1."}
        {activeTab === "voting" && "Have a say in what happens next and earn +$0.25 AG Credit."}
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
            flexWrap: isMobile ? "wrap" as const : "nowrap" as const,
            scrollbarWidth: "none" as const,
            msOverflowStyle: "none" as const,
          }}
        >
          {/* Daily Check-in tab (first) */}
          <button
            onClick={() => switchTab("streak")}
            onMouseEnter={() => setStreakTabHovered(true)}
            onMouseLeave={() => setStreakTabHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: isMobile ? "15px" : "18px",
              fontWeight: 600,
              padding: isMobile ? "0 20px" : "0 32px",
              minHeight: "52px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "streak" ? "#0C3D3D" : streakTabHovered ? "rgba(12,61,61,0.06)" : "transparent",
              color: activeTab === "streak" ? "#ffffff" : "#0C3D3D",
              border: "1px solid #0C3D3D",
              display: "inline-flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              gap: "6px",
            }}
          >
            Daily Check-in
            <span style={{ fontWeight: 400, color: activeTab === "streak" ? "#ffffff" : "#0C3D3D", display: "inline-flex", alignItems: "center" }}>
              (<span style={{ fontWeight: 600, color: activeTab === "streak" ? "#ffffff" : "#0C3D3D" }}>{streakStreak}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill={activeTab === "streak" ? "#ffffff" : "#0C3D3D"} style={{ marginLeft: "2px" }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>)
            </span>
          </button>
          {/* Achievements tab */}
          <button
            onClick={() => switchTab("achievements")}
            onMouseEnter={() => setAchievementsTabHovered(true)}
            onMouseLeave={() => setAchievementsTabHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: isMobile ? "15px" : "18px",
              fontWeight: 600,
              padding: isMobile ? "0 20px" : "0 32px",
              minHeight: "52px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "achievements" ? "#0C3D3D" : achievementsTabHovered ? "rgba(12,61,61,0.06)" : "transparent",
              color: activeTab === "achievements" ? "#ffffff" : "#0C3D3D",
              border: "1px solid #0C3D3D",
            }}
          >
            Achievements{" "}
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
          {/* Voting tab */}
          <button
            onClick={() => switchTab("voting")}
            onMouseEnter={() => setVotingTabHovered(true)}
            onMouseLeave={() => setVotingTabHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: isMobile ? "15px" : "18px",
              fontWeight: 600,
              padding: isMobile ? "0 20px" : "0 32px",
              minHeight: "52px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "voting" ? "#0C3D3D" : votingTabHovered ? "rgba(12,61,61,0.06)" : "transparent",
              color: activeTab === "voting" ? "#ffffff" : "#0C3D3D",
              border: "1px solid #0C3D3D",
            }}
          >
            Voting{" "}
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
        </div>

        {/* Tab content */}
        <div style={{ display: activeTab === "streak" ? "block" : "none" }}>
          <DailyStreakContent onStreakChange={setStreakStreak} isMobile={isMobile} />
        </div>
        {activeTab === "achievements" && <AchievementsContent onClaimedCountChange={setClaimedCount} onHasClaimableChange={setHasClaimable} isMobile={isMobile} />}
        {activeTab === "voting" && (
          <div
            style={{
              border: "1px solid #d4e0df",
              backgroundColor: "#ffffff",
            }}
          >
            <VotingContent onAnsweredCountChange={setVotingAnsweredCount} />
          </div>
        )}
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
