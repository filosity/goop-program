"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const sections = [
  { id: "section-milestones", label: "subscriber milestones" },
  { id: "section-sweepstakes", label: "sweepstakes" },
  { id: "section-ways-to-earn", label: "AG Credit" },
  { id: "section-activities", label: "activities" },
  { id: "section-referrals", label: "referrals" },
  { id: "section-faq", label: "FAQ" },
];

const HEADER_HEIGHT = 76;

export default function StickyNav() {
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [arrowHovered, setArrowHovered] = useState(false);
  const [peekHovered, setPeekHovered] = useState(false);
  const [showPeek, setShowPeek] = useState(false);
  const [userPoints, setUserPoints] = useState(5);
  const [hasClaimable, setHasClaimable] = useState(true);

  useEffect(() => {
    const pointsHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) setUserPoints(detail.points);
    };
    const claimableHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.hasClaimable !== undefined) setHasClaimable(detail.hasClaimable);
    };
    window.addEventListener("points-updated", pointsHandler);
    window.addEventListener("activities-claimable", claimableHandler);
    return () => {
      window.removeEventListener("points-updated", pointsHandler);
      window.removeEventListener("activities-claimable", claimableHandler);
    };
  }, []);
  const activeSectionRef = useRef("");
  const activeIndexRef = useRef(-1);
  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showRef = useRef(false);

  const updateLine = useCallback((index: number) => {
    const line = lineRef.current;
    const textEl = textRefs.current[index];
    const container = containerRef.current;
    if (!line || !textEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const textRect = textEl.getBoundingClientRect();

    const left = textRect.left - containerRect.left;
    const top = textRect.bottom - containerRect.top + 2;

    line.style.transition = "none";
    line.style.transform = `translate(${left}px, ${top}px)`;
    line.style.width = "0px";
    line.style.opacity = "1";

    void line.offsetWidth;

    line.style.transition = "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    line.style.width = `${textRect.width}px`;
  }, []);

  const setActive = useCallback((sectionId: string) => {
    if (sectionId === activeSectionRef.current) return;
    activeSectionRef.current = sectionId;

    const newIndex = sections.findIndex((s) => s.id === sectionId);
    activeIndexRef.current = newIndex;

    btnRefs.current.forEach((btn, i) => {
      if (btn) {
        btn.style.opacity = i === newIndex ? "1" : "0.35";
      }
    });

    if (newIndex >= 0) {
      updateLine(newIndex);
    } else {
      const line = lineRef.current;
      if (line) line.style.opacity = "0";
    }
  }, [updateLine]);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      const howItWorks = document.getElementById("section-how-it-works");
      if (howItWorks) {
        const rect = howItWorks.getBoundingClientRect();
        const shouldShow = rect.top <= HEADER_HEIGHT + 100;
        showRef.current = shouldShow;
        setShowPeek(shouldShow);

        if (collapsed) {
          // When collapsed, completely hide the main panel off-screen
          nav.style.transform = shouldShow
            ? "translate(calc(-100% - 32px), -50%)"
            : "translate(calc(-100% - 40px), -50%)";
        } else {
          nav.style.transform = shouldShow
            ? "translate(0, -50%)"
            : "translate(calc(-100% - 40px), -50%)";
        }
        nav.style.pointerEvents = shouldShow ? "auto" : "none";
      }

      if (isScrollingToRef.current) return;

      const detectPoint = HEADER_HEIGHT + 80;
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= detectPoint) {
            current = section.id;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActive, collapsed]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isScrollingToRef.current = true;
      setActive(id);

      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 60;
      window.scrollTo({ top, behavior: "smooth" });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingToRef.current = false;
      }, 800);
    }
  }, [setActive]);

  if (isMobile) return null;

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "32px",
        zIndex: 110,
        display: "flex",
        justifyContent: "flex-start",
        transform: "translate(calc(-100% - 40px), -50%)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: "none",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "#ffffff",
          padding: "20px 24px",
          gap: "0px",
          boxShadow: "none",
          border: "1px solid #d4e0df",
        }}
      >
        {/* Arrow toggle — top right */}
        <button
          onClick={() => setCollapsed(true)}
          onMouseEnter={() => setArrowHovered(true)}
          onMouseLeave={() => setArrowHovered(false)}
          aria-label="Close navigation"
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(180deg)" }}
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

        {sections.map((section, i) => (
          <button
            key={section.id}
            ref={(el) => { btnRefs.current[i] = el; }}
            onClick={() => scrollTo(section.id)}
            onMouseEnter={(e) => {
              if (sections[i].id !== activeSectionRef.current) {
                e.currentTarget.style.opacity = "0.7";
              }
            }}
            onMouseLeave={(e) => {
              if (sections[i].id !== activeSectionRef.current) {
                e.currentTarget.style.opacity = "0.35";
              }
            }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 600,
              color: "#1a1a1a",
              opacity: 0.35,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "7px 0",
              lineHeight: 1,
              whiteSpace: "nowrap",
              transition: "opacity 0.35s ease",
              position: "relative",
            }}
          >
            <span ref={(el) => { textRefs.current[i] = el; }}>{section.label}</span>
            {section.label === "activities" && hasClaimable && (
              <span
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#E8913A",
                  marginLeft: "6px",
                  flexShrink: 0,
                  verticalAlign: "middle",
                }}
              />
            )}
          </button>
        ))}
        {/* Animated underline */}
        <div
          ref={lineRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "1.5px",
            backgroundColor: "#1a1a1a",
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        {/* Rewards box */}
        <div
          style={{
            marginTop: "16px",
            borderTop: "1px solid #d4e0df",
            paddingTop: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#1a1a1a",
              margin: 0,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            rewards available
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "28px",
              fontWeight: 400,
              lineHeight: 1,
              color: "#000000",
              margin: "10px 0 4px 0",
              letterSpacing: "-0.02em",
            }}
          >
            ${userPoints.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Peek tab — visible when collapsed, sticks out from right edge */}
      {collapsed && showPeek && (
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
            border: "1px solid #d4e0df",
            borderLeft: "none",
            width: "32px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
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
    </nav>
  );
}
