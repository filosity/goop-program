"use client";

import { useState, useEffect } from "react";

export default function FloatingPoints() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [arrowHovered, setArrowHovered] = useState(false);
  const [peekHovered, setPeekHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.6;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "0px",
        zIndex: 90,
        transform: visible
          ? collapsed
            ? "translateX(-100%)"
            : "translateX(0)"
          : "translateX(calc(-100% - 24px))",
        pointerEvents: visible ? "auto" : "none",
        transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Main panel */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e2de",
          width: "260px",
          padding: "16px 20px 20px 24px",
          position: "relative",
        }}
      >
        {/* Arrow toggle — top right of the panel */}
        <button
          onClick={() => setCollapsed(true)}
          onMouseEnter={() => setArrowHovered(true)}
          onMouseLeave={() => setArrowHovered(false)}
          aria-label="Close rewards panel"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.2s ease",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: "rotate(180deg)",
            }}
          >
            <path
              d="M3.5 1.5L7 5L3.5 8.5"
              stroke={arrowHovered ? "#000000" : "#999999"}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.2s ease" }}
            />
          </svg>
        </button>

        {/* Label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            margin: 0,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          rewards available to spend
        </p>

        {/* Amount */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: 1,
            color: "#000000",
            margin: "10px 0 4px 0",
            letterSpacing: "-0.02em",
          }}
        >
          $50.00
        </p>

        {/* AG Credit */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 400,
            color: "#000000",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          1,000 AG Credit
        </p>
      </div>

      {/* Peek tab — visible when collapsed, sticks out from left edge */}
      {collapsed && (
        <div
          onClick={() => setCollapsed(false)}
          onMouseEnter={() => setPeekHovered(true)}
          onMouseLeave={() => setPeekHovered(false)}
          style={{
            position: "absolute",
            top: "50%",
            right: "-32px",
            transform: "translateY(-50%)",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e2de",
            borderLeft: "none",
            width: "32px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 1.5L7 5L3.5 8.5"
              stroke={peekHovered ? "#000000" : "#999999"}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.2s ease" }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
