"use client";

import { useState, useEffect, useRef } from "react";

export default function HeroSectionV3() {
  const [userPoints, setUserPoints] = useState(50);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const dollarValue = (userPoints * 0.05).toFixed(2);

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
    window.addEventListener("points-updated", onPoints);
    return () => {
      window.removeEventListener("points-updated", onPoints);
    };
  }, []);

  return (
    <section
      id="section-hero"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "45vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <style>{`
        @keyframes heroV3SlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroV3Tooltip {
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

      {/* Single white card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          margin: "0 0 0 48px",
          backgroundColor: "#f5f3ef",
          padding: "36px 44px 32px",
          maxWidth: "560px",
          width: "100%",
          opacity: visible ? 1 : 0,
          animation: visible ? "heroV3SlideUp 0.5s ease 0.35s both" : "none",
        }}
      >
        {/* Top row: greeting + dollar value */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "28px",
                fontWeight: 400,
                color: "#000000",
                margin: "0 0 6px 0",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Welcome back, Bethany
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                fontWeight: 400,
                color: "#6b8a89",
                margin: "0 0 6px 0",
                lineHeight: 1.4,
              }}
            >
              Member since Jan 2026
            </p>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                fontWeight: 500,
                color: "#6b8a89",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "0.5px",
              }}
            >
              View activity
            </a>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "38px",
                fontWeight: 400,
                color: "#000000",
                margin: "0 0 4px 0",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              ${dollarValue}
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 600,
                color: "#6b8a89",
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
                fontFamily: "var(--font-serif)",
                fontSize: "13px",
                fontWeight: 400,
                color: "#6b8a89",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Redeemable for exclusive merch after 90 days
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#d4e0df",
            margin: "18px 0 20px",
          }}
        />

        {/* Bottom section: subscription status */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "24px",
            fontWeight: 400,
            color: "#000000",
            margin: "0 0 6px 0",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          Active subscriber
        </p>

        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "15px",
            fontWeight: 400,
            color: "#6b8a89",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Member since Jan 2026
        </p>
      </div>
    </section>
  );
}
