"use client";

import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
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
          fontFamily: "var(--font-sans)",
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: "0.06em",
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

function HeroSectionV1({ bgMode }: { bgMode: "video" | "static" }) {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [userPoints, setUserPoints] = useState(5);
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
      if (detail?.points !== undefined) {
        setUserPoints(detail.points);
      }
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

      {/* Background */}
      {bgMode === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <source src="/membership.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/background-header.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      )}

      {/* 30% black overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 0,
        }}
      />

      {/* Content wrapper — left aligned */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "24px 16px 24px 16px" : "48px 0 40px 48px",
          width: "100%",
          maxWidth: isMobile ? "100%" : "540px",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? "13px" : "16px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "rgba(255, 255, 255, 0.85)",
            margin: "0 0 10px 0",
            lineHeight: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
          }}
        >
          AG1 rewards
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: isMobile ? "28px" : "38px",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#ffffff",
            margin: isMobile ? "0 0 24px 0" : "0 0 32px 0",
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
              padding: isMobile ? "24px 20px 28px" : "36px 40px 40px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <SectionLabel text="AG Credit balance" />

            {/* Dollar amount */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "32px",
                fontWeight: 400,
                lineHeight: 1,
                color: "#000000",
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em",
              }}
            >
              ${userPoints.toFixed(2)}
            </p>

            {/* Redemption note */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 400,
                color: "#000000",
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
                fontFamily: "var(--font-sans)",
                fontSize: "17px",
                fontWeight: 400,
                color: "#1a1a1a",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "0.5px",
              }}
            >
              View Account Activity
            </a>

          </div>

          {/* CARD 2: subscription status */}
          <div
            style={{
              backgroundColor: "#f5f3ef",
              padding: isMobile ? "24px 20px 24px" : "36px 40px 32px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <SectionLabel text="subscription status" />

            {isSubscribed ? (
              <>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "32px",
                    fontWeight: 400,
                    lineHeight: 1,
                    color: "#000000",
                    margin: "0 0 8px 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Subscribed
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#1a1a1a",
                    margin: "0",
                    lineHeight: 1.55,
                  }}
                >
                  Member since <span style={{ fontWeight: 600 }}>Feb 2026</span>
                </p>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "32px",
                    fontWeight: 400,
                    lineHeight: 1,
                    color: "#000000",
                    margin: "0 0 20px 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Non-member
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

/* ─── Version Switcher ─── */
export default function HeroSection() {
  const [version, setVersion] = useState(1);
  const [bgMode, setBgMode] = useState<"video" | "static">("video");

  useEffect(() => {
    function handleVersion(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.version) setVersion(detail.version);
    }
    function handleBgMode(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.mode) setBgMode(detail.mode);
    }
    window.addEventListener("hero-version", handleVersion);
    window.addEventListener("header-bg-mode", handleBgMode);
    return () => {
      window.removeEventListener("hero-version", handleVersion);
      window.removeEventListener("header-bg-mode", handleBgMode);
    };
  }, []);

  if (version === 2) return <HeroSectionV2 bgMode={bgMode} />;
  if (version === 3) return <HeroSectionV3 bgMode={bgMode} />;
  return <HeroSectionV1 bgMode={bgMode} />;
}
