"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "@vectoricons/atlas-icons-react";

/* ─── Step image component — rendered above interactive area ─── */
function StepImage({ src }: { src: string }) {
  return (
    <div
      style={{
        marginTop: "20px",
        overflow: "hidden",
        height: "160px",
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

/* ─── Step 1: Typing sign-up animation ─── */
function SignUpStep({ active, imageSrc }: { active: boolean; index: number; imageSrc: string }) {
  const [typed, setTyped] = useState("");
  const [showCheck, setShowCheck] = useState(false);
  const email = "your@email.com";

  useEffect(() => {
    if (!active) {
      setTyped("");
      setShowCheck(false);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(email.slice(0, i));
      if (i >= email.length) {
        clearInterval(interval);
        setTimeout(() => setShowCheck(true), 300);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div>
      <StepImage src={imageSrc} />
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          border: "1px solid #d4e0df",
          borderTop: "none",
          textAlign: "left",
          height: "110px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#999999",
            margin: "0 0 8px 0",
          }}
        >
          Email address
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 400,
              color: active ? "#000000" : "#cccccc",
              margin: 0,
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: "4px",
              flex: 1,
              minHeight: "22px",
              transition: "color 0.3s ease",
            }}
          >
            {typed}
            {active && !showCheck && (
              <span
                style={{
                  display: "inline-block",
                  width: "1px",
                  height: "14px",
                  backgroundColor: "#000000",
                  marginLeft: "1px",
                  verticalAlign: "middle",
                  animation: "blink 0.8s infinite",
                }}
              />
            )}
          </p>
          {showCheck && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="10" cy="10" r="10" fill="#000000" />
              <path
                d="M6 10.5L8.5 13L14 7"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 20,
                  strokeDashoffset: 0,
                  animation: "drawCheck 0.4s ease forwards",
                }}
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Animated coin counter ─── */
function EarnStep({ active, imageSrc }: { active: boolean; index: number; imageSrc: string }) {
  const [points, setPoints] = useState(0);
  const [coins, setCoins] = useState<{ id: number; x: number }[]>([]);
  const coinId = useRef(0);

  useEffect(() => {
    if (!active) {
      setPoints(0);
      setCoins([]);
      return;
    }
    const target = 7.5;
    let current = 0;
    const interval = setInterval(() => {
      current += 0.15;
      if (current > target) current = target;
      setPoints(Math.round(current * 100) / 100);
      if (Math.round(current * 100) % 75 === 0 && current < target) {
        coinId.current++;
        setCoins((prev) => [
          ...prev.slice(-5),
          { id: coinId.current, x: Math.random() * 60 + 20 },
        ]);
      }
      if (current >= target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div>
      <StepImage src={imageSrc} />
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          border: "1px solid #d4e0df",
          borderTop: "none",
          height: "110px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Floating coins */}
        {coins.map((coin) => (
          <div
            key={coin.id}
            style={{
              position: "absolute",
              left: `${coin.x}%`,
              bottom: "0",
              fontSize: "16px",
              animation: "floatUp 1s ease-out forwards",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            ✦
          </div>
        ))}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#999999",
            margin: "0 0 6px 0",
          }}
        >
          AG Credit earned
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "32px",
            fontWeight: 400,
            color: "#000000",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {active ? `$${points.toFixed(2)}` : "—"}
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 400,
            color: "#6b8a89",
            margin: "8px 0 0 0",
          }}
        >
          {active && points > 0 ? "AG Credit" : "10% cashback"}
        </p>
      </div>
    </div>
  );
}

/* ─── Step 3: Redeem button with animated states ─── */
function RedeemStep({ active, imageSrc }: { active: boolean; index: number; imageSrc: string }) {
  const [phase, setPhase] = useState<"idle" | "loading" | "check" | "done">("idle");
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      hasAutoPlayed.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    // Auto-play the redeem animation on activation
    if (!hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      setTimeout(() => {
        setPhase("loading");
        timerRef.current = setTimeout(() => {
          setPhase("check");
          timerRef.current = setTimeout(() => {
            setPhase("done");
            timerRef.current = setTimeout(() => {
              setPhase("idle");
            }, 400);
          }, 1000);
        }, 1200);
      }, 300);
    }
  }, [active]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!active || phase !== "idle") return;

    setPhase("loading");
    timerRef.current = setTimeout(() => {
      setPhase("check");
      timerRef.current = setTimeout(() => {
        setPhase("done");
        timerRef.current = setTimeout(() => {
          setPhase("idle");
        }, 400);
      }, 1000);
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const isCircle = phase === "loading" || phase === "check";
  const btnHeight = 52;

  return (
    <div>
      <StepImage src={imageSrc} />
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          border: "1px solid #d4e0df",
          borderTop: "none",
          height: "110px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <button
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "18px",
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: active
            ? hovered && phase === "idle"
              ? "#0E4747"
              : "#0C3D3D"
            : "#cccccc",
          width: isCircle ? `${btnHeight}px` : "160px",
          height: `${btnHeight}px`,
          borderRadius: isCircle ? `${btnHeight / 2}px` : "999px",
          border: "none",
          cursor: active && phase === "idle" ? "pointer" : "default",
          transition:
            "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease",
          lineHeight: 1,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: 0,
        }}
      >
        {/* Text — visible in idle/done */}
        <span
          style={{
            opacity: isCircle ? 0 : 1,
            transition: "opacity 0.15s ease",
            whiteSpace: "nowrap",
            position: "absolute",
          }}
        >
          Redeem →
        </span>

        {/* Spinner — visible in loading */}
        {phase === "loading" && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            style={{
              position: "absolute",
              animation: "redeemSpin 0.8s linear infinite",
            }}
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            <path
              d="M10 2A8 8 0 0 1 18 10"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* Checkmark — visible in check */}
        {phase === "check" && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{
              position: "absolute",
              animation: "redeemCheckPop 0.3s ease",
            }}
          >
            <path
              d="M5 10.5L8.5 14L15 6"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 24,
                strokeDashoffset: 0,
                animation: "redeemDrawCheck 0.4s ease forwards",
              }}
            />
          </svg>
        )}
      </button>
      </div>
    </div>
  );
}

/* ─── Step column with hover ─── */
function StepColumn({
  step,
  index,
  isActive,
  autoPlaying,
  onActivate,
}: {
  step: { number: string; title: string; description: string; imageSrc: string; component: React.ComponentType<{ active: boolean; index: number; imageSrc: string }> };
  index: number;
  isActive: boolean;
  autoPlaying: boolean;
  onActivate: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const StepComponent = step.component;
  const circleVisible = isActive || hovered;

  return (
    <div
      onClick={onActivate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        textAlign: "center",
        padding: "0 48px",
        cursor: autoPlaying ? "default" : "pointer",
        transition: "transform 0.2s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Vertical divider — 50% height */}
      {index > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "25%",
            height: "50%",
            width: "1px",
            backgroundColor: "#d8d5d0",
          }}
        />
      )}
      {/* Number circle */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "transparent",
          border: circleVisible ? "1.5px solid rgba(0,0,0,1)" : "1.5px solid rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 14px",
          transition: "all 0.3s ease",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 400,
            color: "#000000",
            margin: 0,
            lineHeight: 1,
            transition: "color 0.3s ease",
          }}
        >
          {step.number}
        </p>
      </div>

      {/* Title */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "19px",
          fontWeight: 700,
          color: "#000000",
          margin: "0 0 8px 0",
          lineHeight: 1.3,
        }}
      >
        {step.title}
      </p>

      {/* Description — fixed height so interactive boxes align */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "17px",
          fontWeight: 400,
          color: "#444444",
          margin: 0,
          lineHeight: 1.55,
          minHeight: "48px",
        }}
      >
        {step.description}
      </p>

      {/* Interactive area */}
      <StepComponent active={isActive} index={index} imageSrc={step.imageSrc} />
    </div>
  );
}

/* ─── Main component ─── */
export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(-1);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Auto-play sequence on first view */
  const sectionRef = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const playSequence = () => {
      setAutoPlaying(true);
      setActiveStep(0);
      timeoutRef.current = setTimeout(() => {
        setActiveStep(1);
        timeoutRef.current = setTimeout(() => {
          setActiveStep(2);
          timeoutRef.current = setTimeout(() => {
            setAutoPlaying(false);
          }, 2500);
        }, 2500);
      }, 2500);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          playSequence();
          intervalRef.current = setInterval(() => {
            if (isVisibleRef.current) {
              setActiveStep(-1);
              setTimeout(() => playSequence(), 200);
            }
          }, 10000);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const steps = [
    {
      number: "1",
      title: "Subscribe",
      description: "Sign up for an AG1 subscription to start earning.",
      component: SignUpStep,
      imageSrc: "/howitworks-subscribe.png",
    },
    {
      number: "2",
      title: "Earn AG Credit",
      description: "Earn AG Credit per serving and through activities.",
      component: EarnStep,
      imageSrc: "/tier2.jpg",
    },
    {
      number: "3",
      title: "Redeem",
      description: "Use your AG Credit for exclusive merch after 90 days.",
      component: RedeemStep,
      imageSrc: "/milestone-merch-store.jpg",
    },
  ];

  return (
    <section
      id="section-how-it-works"
      ref={sectionRef}
      style={{
        backgroundColor: "#f0f5f5",
        padding: collapsed ? "16px 48px 16px" : "36px 48px 80px",
      }}
    >
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes drawCheck {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes floatUp {
          0% { opacity: 0.8; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-60px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
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

      {/* Heading with toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          margin: collapsed ? "0" : "0 0 56px 0",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: collapsed ? "13px" : "36px",
            fontWeight: collapsed ? 600 : 400,
            fontStyle: "normal",
            lineHeight: 1.1,
            color: "#000000",
            textAlign: "center",
            margin: 0,
            letterSpacing: collapsed ? "0.02em" : "-0.01em",
          }}
        >
          How it works
        </h2>
        <button
          onClick={() => {
            if (collapsed) {
              // Reopening — replay the auto-play sequence
              setCollapsed(false);
              setActiveStep(-1);
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setAutoPlaying(true);
              setTimeout(() => {
                setActiveStep(0);
                timeoutRef.current = setTimeout(() => {
                  setActiveStep(1);
                  timeoutRef.current = setTimeout(() => {
                    setActiveStep(2);
                    timeoutRef.current = setTimeout(() => {
                      setAutoPlaying(false);
                    }, 2500);
                  }, 2500);
                }, 2500);
              }, 350);
            } else {
              // Collapsing — stop and reset
              setCollapsed(true);
              setActiveStep(-1);
              setAutoPlaying(false);
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }
          }}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          aria-label={collapsed ? "Show section" : "Hide section"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            color: btnHovered ? "#000000" : "#aaaaaa",
            transition: "color 0.2s ease",
            transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ArrowDown size={13} color="#999" />
        </button>
      </div>

      {/* Steps — collapsible */}
      <div
        style={{
          maxHeight: collapsed ? "0px" : "900px",
          opacity: collapsed ? 0 : 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: "1040px",
            margin: "0 auto",
            alignItems: "flex-start",
          }}
        >
          {steps.map((step, i) => (
            <StepColumn
              key={step.number}
              step={step}
              index={i}
              isActive={activeStep === i}
              autoPlaying={autoPlaying}
              onActivate={() => {
                if (!autoPlaying) {
                  setActiveStep(activeStep === i ? -1 : i);
                }
              }}
            />
          ))}
        </div>
        <div style={{ height: "44px" }} />
      </div>
    </section>
  );
}
