"use client";

import { useState, useEffect, useRef } from "react";

export default function HeroSectionV3({ bgMode = "video" }: { bgMode?: "video" | "static" }) {
  const [userPoints, setUserPoints] = useState(50);
  const [visible, setVisible] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subBtnHovered, setSubBtnHovered] = useState(false);
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
    const onSub = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.subscribed) setIsSubscribed(true);
    };
    window.addEventListener("points-updated", onPoints);
    window.addEventListener("subscription-updated", onSub);
    return () => {
      window.removeEventListener("points-updated", onPoints);
      window.removeEventListener("subscription-updated", onSub);
    };
  }, []);

  const handleHeroSubscribe = () => {
    setIsSubscribed(true);
    window.dispatchEvent(new CustomEvent("subscription-updated", { detail: { subscribed: true, days: 15, month: 1, source: "hero" } }));
  };

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
            transition: "opacity 0.6s ease",
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
            transition: "opacity 0.6s ease",
          }}
        />
      )}

      {/* 30% black overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 1,
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
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 400,
                color: "#6b8a89",
                margin: "0 0 6px 0",
                lineHeight: 1.4,
              }}
            >
              {isSubscribed ? "Member since Feb 2026" : "Non-member"}
            </p>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 500,
                color: "#6b8a89",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "0.5px",
              }}
            >
              View Activity
            </a>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "30px",
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
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
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
        {isSubscribed ? (
          <>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "22px",
                fontWeight: 400,
                color: "#000000",
                margin: "0 0 6px 0",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              Subscribed
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 400,
                color: "#6b8a89",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Member since Feb 2026
            </p>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "22px",
                fontWeight: 400,
                color: "#000000",
                margin: 0,
                lineHeight: 1,
                letterSpacing: "-0.01em",
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
                fontSize: "14px",
                fontWeight: 600,
                color: subBtnHovered ? "#000000" : "#ffffff",
                backgroundColor: subBtnHovered ? "#46DE46" : "#0C3D3D",
                border: "none",
                minHeight: "40px",
                padding: "0 24px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "background-color 0.2s ease, color 0.2s ease",
              }}
            >
              Subscribe →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
