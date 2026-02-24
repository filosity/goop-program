"use client";

import { useState, useEffect, useRef } from "react";

export default function HeroSectionV2() {
  const [userPoints, setUserPoints] = useState(50);
  const [visible, setVisible] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subDays, setSubDays] = useState(0);
  const [subBtnHovered, setSubBtnHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pointsHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) setUserPoints(detail.points);
    };
    const subHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.subscribed) {
        setIsSubscribed(true);
        if (detail.days !== undefined) setSubDays(detail.days);
      }
    };
    window.addEventListener("points-updated", pointsHandler);
    window.addEventListener("subscription-updated", subHandler);
    return () => {
      window.removeEventListener("points-updated", pointsHandler);
      window.removeEventListener("subscription-updated", subHandler);
    };
  }, []);

  const handleHeroSubscribe = () => {
    setIsSubscribed(true);
    setSubDays(15);
    window.dispatchEvent(new CustomEvent("subscription-updated", { detail: { subscribed: true, days: 15, month: 1, source: "hero" } }));
  };

  return (
    <section
      id="section-hero"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "50vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes heroV2CardSlide {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroV2TooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/background-header.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Bottom-center frosted card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px 48px 32px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            backgroundColor: "rgba(245,243,239,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "40px 56px 40px 48px",
            display: "flex",
            alignItems: "stretch",
            gap: "0",
            opacity: visible ? 1 : 0,
            animation: visible ? "heroV2CardSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none",
          }}
        >
          {/* Column 1: Welcome */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingRight: "40px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#6b8a89",
                margin: "0 0 10px 0",
                lineHeight: 1,
              }}
            >
              AG1 rewards
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "30px",
                fontWeight: 400,
                color: "#000000",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Welcome back, Bethany
            </p>
          </div>

          {/* Divider 1 */}
          <div
            style={{
              width: "1px",
              backgroundColor: "#d4e0df",
              alignSelf: "stretch",
            }}
          />

          {/* Column 2: AG Credit balance */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 40px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "32px",
                fontWeight: 400,
                color: "#000000",
                margin: "0 0 4px 0",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              ${(userPoints * 0.05).toFixed(2)}
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 600,
                color: "#1a1a1a",
                margin: "0 0 4px 0",
                lineHeight: 1.4,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {userPoints.toLocaleString()} AG Credit balance
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 400,
                color: "#6b8a89",
                margin: "0 0 8px 0",
                lineHeight: 1.4,
              }}
            >
              Redeemable for exclusive merch after 90 days
            </p>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                color: "#6b8a89",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "0.5px",
                letterSpacing: "0.02em",
              }}
            >
              View Activity
            </a>
          </div>

          {/* Divider 2 */}
          <div
            style={{
              width: "1px",
              backgroundColor: "#d4e0df",
              alignSelf: "stretch",
            }}
          />

          {/* Column 3: Subscription status */}
          <div
            style={{
              flex: 1.4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "40px",
            }}
          >
            {isSubscribed ? (
              <>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "32px",
                    fontWeight: 400,
                    color: "#000000",
                    margin: "0 0 4px 0",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Active subscriber
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#1a1a1a",
                    margin: "0",
                    lineHeight: 1.4,
                  }}
                >
                  Member since Jan 2026
                </p>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "32px",
                    fontWeight: 400,
                    color: "#000000",
                    margin: "0 0 12px 0",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Not subscribed
                </p>
                <button
                  onClick={handleHeroSubscribe}
                  onMouseEnter={() => setSubBtnHovered(true)}
                  onMouseLeave={() => setSubBtnHovered(false)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: subBtnHovered ? "#000000" : "#ffffff",
                    backgroundColor: subBtnHovered ? "#46DE46" : "#0C3D3D",
                    border: "none",
                    minHeight: "44px",
                    padding: "0 28px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    alignSelf: "flex-start",
                  }}
                >
                  Subscribe →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
