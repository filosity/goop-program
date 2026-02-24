"use client";

import { useState, useEffect, useRef } from "react";
import HeroSectionV2 from "./HeroSectionV2";
import HeroSectionV3 from "./HeroSectionV3";

/* ─── Pill Button ─── */
function PillButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "18px",
        fontWeight: 600,
        color: hovered ? "#ffffff" : "#0C3D3D",
        backgroundColor: hovered ? "#0C3D3D" : "#ffffff",
        border: "1px solid #0C3D3D",
        padding: "12px 34px",
        borderRadius: "999px",
        textDecoration: "none",
        lineHeight: 1,
        minHeight: "52px",
        display: "inline-flex",
        alignItems: "center",
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      {label} →
    </a>
  );
}

/* ─── Section Label with underline matching text width ─── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "inline-block", marginBottom: "20px" }}>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#1a1a1a",
          margin: "0 0 10px 0",
          lineHeight: 1,
        }}
      >
        {text}
      </p>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#d5d5d5",
        }}
      />
    </div>
  );
}

function HeroSectionV1() {
  const [visible, setVisible] = useState(false);
  const [userPoints, setUserPoints] = useState(5);
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
      if (detail?.points !== undefined) {
        setUserPoints(detail.points);
      }
    };
    window.addEventListener("points-updated", pointsHandler);
    return () => {
      window.removeEventListener("points-updated", pointsHandler);
    };
  }, []);

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
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroCardSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Content wrapper — left aligned */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "48px 0 40px 48px",
          width: "100%",
          maxWidth: "540px",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "17px",
            fontWeight: 500,
            letterSpacing: "0.03em",
            color: "rgba(255, 255, 255, 0.85)",
            margin: "0 0 10px 0",
            lineHeight: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
          }}
        >
          AG Credit rewards
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "38px",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#ffffff",
            margin: "0 0 32px 0",
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
          {/* CARD 1: AG Credit balance */}
          <div
            style={{
              backgroundColor: "#f5f3ef",
              padding: "36px 40px 40px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <SectionLabel text="AG Credit balance" />

            {/* Dollar amount */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "44px",
                fontWeight: 400,
                lineHeight: 1,
                color: "#000000",
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em",
              }}
            >
              ${userPoints.toFixed(2)}
            </p>

            {/* AG Credit info */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "17px",
                fontWeight: 400,
                color: "#1a1a1a",
                margin: "0 0 6px 0",
                lineHeight: 1.55,
              }}
            >
              AG Credit
            </p>

            {/* Redemption note */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6b8a89",
                margin: "0 0 12px 0",
                lineHeight: 1.4,
              }}
            >
              Redeemable for exclusive merch after 90 days
            </p>

            {/* Activity link */}
            <a
              href="#"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "17px",
                fontWeight: 400,
                color: "#1a1a1a",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "0.5px",
              }}
            >
              View account activity
            </a>

          </div>

          {/* CARD 2: subscription status */}
          <div
            style={{
              backgroundColor: "#f5f3ef",
              padding: "36px 40px 32px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <SectionLabel text="subscription status" />

            {/* Status */}
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "48px",
                fontWeight: 400,
                lineHeight: 1,
                color: "#000000",
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em",
              }}
            >
              Active subscriber
            </h2>

            {/* Member since */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "17px",
                fontWeight: 400,
                color: "#1a1a1a",
                margin: "0",
                lineHeight: 1.55,
              }}
            >
              Member since <span style={{ fontWeight: 600 }}>Jan 2026</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Version Switcher ─── */
export default function HeroSection() {
  const [version, setVersion] = useState(1);

  useEffect(() => {
    function handleVersion(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.version) setVersion(detail.version);
    }
    window.addEventListener("hero-version", handleVersion);
    return () => window.removeEventListener("hero-version", handleVersion);
  }, []);

  if (version === 2) return <HeroSectionV2 />;
  if (version === 3) return <HeroSectionV3 />;
  return <HeroSectionV1 />;
}
