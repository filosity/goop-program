"use client";

import { useState, useCallback, useEffect } from "react";
import { User, Instagram, Tiktok, Star, GiftBox, Phone, ShoppingBag, OpenBook, Headphones, DiscountTag } from "@vectoricons/atlas-icons-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const earnCards = [
  {
    title: "Create\nan Account",
    points: "+$2 Goop Credit",
    icon: "user",
    action: null,
    image: "/earn10.jpg",
    input: null,
    description: null,
  },
  {
    title: "Connect\nIG Handle",
    points: "+$0.50 Goop Credit",
    icon: "instagram",
    action: "Connect",
    image: "/earn3.jpg",
    input: "Your Instagram handle",
    description: null,
  },
  {
    title: "Connect\nTikTok Handle",
    points: "+$0.50 Goop Credit",
    icon: "tiktok",
    action: "Connect",
    image: "/earn4.jpg",
    input: "Your TikTok handle",
    description: null,
  },
  {
    title: "Mention on IG\nor TikTok",
    points: "+$2 Goop Credit",
    icon: "instagram",
    action: "Connect",
    image: "/earn5.jpg",
    input: null,
    description: null,
  },
  {
    title: "Follow\non IG",
    points: "+$0.50 Goop Credit",
    icon: "instagram",
    action: "Connect",
    image: "/earn1.jpg",
    input: null,
    description: null,
  },
  {
    title: "Follow\non TikTok",
    points: "+$0.50 Goop Credit",
    icon: "tiktok",
    action: "Connect",
    image: "/earn2.jpg",
    input: null,
    description: null,
  },
  {
    title: "Write\na Review",
    points: "+$2 Goop Credit",
    icon: "star",
    action: "Review",
    image: "/earn8.jpg",
    input: null,
    description: null,
  },
  {
    title: "Subscribe\nto Email",
    points: "TBD",
    icon: "book",
    action: "Submit",
    image: "/earn6.jpg",
    input: "Your email address",
    description: null,
  },
  {
    title: "Happy\nBirthday",
    points: "+$0.50 Goop Credit",
    icon: "gift",
    action: "Submit",
    image: "/earn7.jpg",
    input: "birthday",
    description: null,
  },
  {
    title: "SMS\nSign Up",
    points: "+$2 Goop Credit",
    icon: "phone",
    action: "Submit",
    image: "/earn10.jpg",
    input: "Your phone number",
    description: null,
  },
  {
    title: "Purchase\n3 Times",
    points: "+$10 Goop Credit",
    icon: "bag",
    action: null,
    image: "/earn1.jpg",
    input: null,
    description: null,
  },
  {
    title: "Download Apple\nWallet Pass",
    points: "+$3 Goop Credit",
    icon: "phone",
    action: "Download",
    image: "/earn2.jpg",
    input: null,
    description: null,
  },
  {
    title: "Attend One\nof Our Events",
    points: "TBD",
    icon: "star",
    action: null,
    image: "/earn5.jpg",
    input: null,
    description: null,
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
  subscriptionDays = 0,
  isMobile = false,
}: {
  card: (typeof earnCards)[0];
  index: number;
  completed: boolean;
  phase: "check" | "exit" | null;
  onComplete: () => void;
  highlighted: boolean;
  anyHighlighted: boolean;
  subscriptionDays?: number;
  isMobile?: boolean;
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
        opacity: isExiting ? 0 : dimmed ? 0.5 : 1,
        transform: isExiting ? "scale(0.92)" : "scale(1)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          height: isMobile ? "400px" : "480px",
          minWidth: isMobile ? "200px" : "260px",
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

        {/* 20% black overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
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
            backgroundColor: "#0C3D3D",
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
              fontFamily: "var(--font-sans)",
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
          {(index === 1 || index === 2) && subscriptionDays > 0 && (
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              margin: "6px 0 0 0",
              lineHeight: 1.3,
            }}>
              Currently subscribed for {subscriptionDays} days
            </p>
          )}
          {card.description && index !== 1 && index !== 2 && (
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              margin: "6px 0 0 0",
              lineHeight: 1.3,
            }}>
              {card.description}
            </p>
          )}

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
                fontSize: "18px",
                fontWeight: 600,
                color: "#0C3D3D",
                backgroundColor: "#ffffff",
                border: "none",
                minHeight: "52px",
                padding: "0 32px",
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

/* ─── Exclusive merch data ─── */
const freeProducts = [
  { name: "Product Name", points: 30, image: "/goop-face-oil-dropper.png", tierRequired: null, discount: null as string | null },
  { name: "Product Name", points: 20, image: "/goop-retinol-duo.png", tierRequired: null, discount: null as string | null },
  { name: "Product Name", points: 10, image: "/goop-martini-bath-soak.png", tierRequired: 3, discount: null },
];

/* ─── Free products tab content (carousel) ─── */
function FreeProductsContent({
  totalPoints,
  onPointsChange,
  currentTier,
  isMobile = false,
}: {
  totalPoints: number;
  onPointsChange: (newTotal: number) => void;
  currentTier: number;
  isMobile?: boolean;
}) {
  const [phases, setPhases] = useState<Record<number, "idle" | "loading" | "check" | "done">>(
    () => Object.fromEntries(freeProducts.map((_, i) => [i, "idle"]))
  );
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
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "16px",
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
                height: isMobile ? "400px" : "480px",
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
                      backgroundColor: "#0C3D3D",
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
                      backgroundColor: "#0C3D3D",
                      borderRadius: "999px",
                      padding: "10px 18px",
                      zIndex: 2,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#ffffff",
                        lineHeight: 1,
                      }}
                    >
                      limited time
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
                        fontFamily: "var(--font-sans)",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#ffffff",
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
                      fontFamily: "var(--font-sans)",
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
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "#000000",
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
                        fontSize: "18px",
                        fontWeight: 600,
                        lineHeight: 1,
                        minHeight: "52px",
                        borderRadius: isCircle ? "50%" : "999px",
                        width: isCircle ? "52px" : "auto",
                        padding: isCircle ? "0" : "0 32px",
                        border: canAfford || phase !== "idle" ? "1px solid #0C3D3D" : "1px solid #0C3D3D",
                        cursor: !canAfford || phase !== "idle" ? "default" : "pointer",
                        backgroundColor: canAfford || phase !== "idle" ? "#0C3D3D" : "transparent",
                        color: canAfford || phase !== "idle" ? "#ffffff" : "#0C3D3D",
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
                      {phase === "idle" && <span>Redeem →</span>}
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
                          backgroundColor: "#0C3D3D",
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

    </>
  );
}

export default function WaysToEarn() {
  const isMobile = useIsMobile();
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set([0]));
  const [animPhase, setAnimPhase] = useState<{ index: number; phase: "check" | "exit" } | null>(null);
  const [highlightedCards, setHighlightedCards] = useState<Set<number>>(new Set());
  const [totalPoints, setTotalPoints] = useState(5);
  const [currentTier, setCurrentTier] = useState(0);
  const [subscriptionDays, setSubscriptionDays] = useState(0);

  useEffect(() => {
    const handler = () => {
      setHighlightedCards(new Set([1, 2]));
      setTimeout(() => setHighlightedCards(new Set()), 2000);
    };
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
    const subHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.subscribed && detail?.days !== undefined) {
        setSubscriptionDays(detail.days);
      }
    };
    window.addEventListener("highlight-earn-handles", handler);
    window.addEventListener("points-updated", pointsHandler);
    window.addEventListener("tier-updated", tierHandler);
    window.addEventListener("spend-updated", spendHandler);
    window.addEventListener("subscription-updated", subHandler);
    return () => {
      window.removeEventListener("highlight-earn-handles", handler);
      window.removeEventListener("points-updated", pointsHandler);
      window.removeEventListener("tier-updated", tierHandler);
      window.removeEventListener("spend-updated", spendHandler);
      window.removeEventListener("subscription-updated", subHandler);
    };
  }, []);

  /* Auto-complete membership cards based on subscription days */
  useEffect(() => {
    if (subscriptionDays <= 0) return;
    const autoComplete = (index: number) => {
      if (completedCards.has(index)) return;
      const next = new Set(completedCards);
      next.add(index);
      setCompletedCards(next);
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
    };
    // Index 0: Sign up for a subscription — immediately on subscribe
    if (subscriptionDays > 0) autoComplete(0);
    // Index 1: Be a Member for 90 days
    if (subscriptionDays >= 90) autoComplete(1);
    // Index 2: Be a Member for 1 year (month 12 = 345 days in milestone system)
    if (subscriptionDays >= 345) autoComplete(2);
  }, [subscriptionDays, completedCards]);

  const handlePointsChange = useCallback((newTotal: number) => {
    setTotalPoints(newTotal);
    // Only update AG Credit balance — tier is based on spend, not AG Credit balance
    window.dispatchEvent(new CustomEvent("points-updated", { detail: { points: newTotal } }));
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

  return (
    <section
      id="section-ways-to-earn"
      style={{
        padding: isMobile ? "0px 16px 60px" : "0px 48px 100px",
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
          maxWidth: "1280px",
          margin: "0 auto 12px",
          letterSpacing: "-0.01em",
        }}
      >
        Ways to Earn Credit
      </h2>

      {/* Subtext */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "16px",
          fontWeight: 400,
          color: "#000000",
          textAlign: "left",
          maxWidth: "1280px",
          margin: "0 auto 40px",
          lineHeight: 1.4,
        }}
      >
        Earn Goop Credit through everyday actions. Credit expires after 1 year of inactivity.
      </p>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* ═══ EARN CARDS GRID ═══ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "16px",
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
                subscriptionDays={subscriptionDays}
                isMobile={isMobile}
              />
            ))}
        </div>

        <style>{`
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

        {/* ═══ FREE PRODUCTS HEADING ═══ */}
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? "28px" : "44px",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#000000",
            textAlign: "left",
            margin: isMobile ? "48px 0 12px" : "72px 0 12px",
            letterSpacing: "-0.01em",
          }}
        >
          Free Products
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            fontWeight: 400,
            color: "#000000",
            textAlign: "left",
            margin: "0 0 40px",
            lineHeight: 1.4,
          }}
        >
          Redeem your Goop Credit for complimentary products.
        </p>

        {/* ═══ FREE PRODUCTS GRID ═══ */}
        <FreeProductsContent totalPoints={totalPoints} onPointsChange={handlePointsChange} currentTier={currentTier} isMobile={isMobile} />
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
