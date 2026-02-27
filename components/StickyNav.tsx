"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const sections = [
  { id: "section-milestones", label: "Subscriber Milestones" },
  { id: "section-tiers", label: "Tiers" },
  { id: "section-sweepstakes", label: "Sweepstakes" },
  { id: "section-ways-to-earn", label: "AG Credit" },
  { id: "section-activities", label: "Activities" },
  { id: "section-partners", label: "Partners" },
  { id: "section-referrals", label: "Referrals" },
  { id: "section-faq", label: "FAQ" },
];

const HEADER_HEIGHT = 76;

/* ═══════════════════════════════════════════
   V1 — Original: white card, left-side panel
   ═══════════════════════════════════════════ */
function NavV1({
  scrollTo,
  activeSectionRef,
  userPoints,
  hasClaimable,
}: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [arrowHovered, setArrowHovered] = useState(false);
  const [peekHovered, setPeekHovered] = useState(false);
  const [showPeek, setShowPeek] = useState(false);
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
      if (btn) btn.style.opacity = i === newIndex ? "1" : "0.35";
    });
    if (newIndex >= 0) updateLine(newIndex);
    else {
      const line = lineRef.current;
      if (line) line.style.opacity = "0";
    }
  }, [updateLine, activeSectionRef]);

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
          if (rect.top <= detectPoint) current = section.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActive, collapsed]);

  const handleScrollTo = useCallback((id: string) => {
    isScrollingToRef.current = true;
    setActive(id);
    scrollTo(id);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToRef.current = false;
    }, 800);
  }, [setActive, scrollTo]);

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
          padding: "20px 30px",
          gap: "0px",
          boxShadow: "none",
          border: "1px solid #d4e0df",
        }}
      >
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
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: "rotate(180deg)" }}>
            <path d="M3.5 1.5L7 5L3.5 8.5" stroke={arrowHovered ? "#000000" : "#999999"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s ease" }} />
          </svg>
        </button>

        {sections.map((section, i) => (
          <button
            key={section.id}
            ref={(el) => { btnRefs.current[i] = el; }}
            onClick={() => handleScrollTo(section.id)}
            onMouseEnter={(e) => {
              if (sections[i].id !== activeSectionRef.current) e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              if (sections[i].id !== activeSectionRef.current) e.currentTarget.style.opacity = "0.35";
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
              <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#E8913A", marginLeft: "6px", flexShrink: 0, verticalAlign: "middle" }} />
            )}
          </button>
        ))}
        <div ref={lineRef} style={{ position: "absolute", top: 0, left: 0, height: "1.5px", backgroundColor: "#1a1a1a", opacity: 0, pointerEvents: "none" }} />

        <div style={{ marginTop: "16px", borderTop: "1px solid #d4e0df", paddingTop: "20px" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#1a1a1a", margin: 0, lineHeight: 1, whiteSpace: "nowrap" }}>
            Rewards Available
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "28px", fontWeight: 400, lineHeight: 1, color: "#000000", margin: "10px 0 4px 0", letterSpacing: "-0.02em" }}>
            ${userPoints.toFixed(2)}
          </p>
        </div>
      </div>

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
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3.5 1.5L7 5L3.5 8.5" stroke={peekHovered ? "#000000" : "#999999"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s ease" }} />
          </svg>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   V2 — Dark glass: frosted dark panel
   ═══════════════════════════════════════════ */
function NavV2({ scrollTo, activeSectionRef, userPoints }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState("");
  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      const howItWorks = document.getElementById("section-how-it-works");
      if (howItWorks) {
        const rect = howItWorks.getBoundingClientRect();
        const shouldShow = rect.top <= HEADER_HEIGHT + 100;
        nav.style.opacity = shouldShow ? "1" : "0";
        nav.style.pointerEvents = shouldShow ? "auto" : "none";
      }
      if (isScrollingToRef.current) return;
      const detectPoint = HEADER_HEIGHT + 80;
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= detectPoint) current = section.id;
      }
      setActiveId(current);
      activeSectionRef.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSectionRef]);

  const handleClick = useCallback((id: string) => {
    isScrollingToRef.current = true;
    setActiveId(id);
    activeSectionRef.current = id;
    scrollTo(id);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => { isScrollingToRef.current = false; }, 800);
  }, [scrollTo, activeSectionRef]);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "28px",
        transform: "translateY(-50%)",
        zIndex: 110,
        opacity: 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(12,61,61,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 0",
                lineHeight: 1,
                whiteSpace: "nowrap",
                textAlign: "left",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              {section.label}
            </button>
          );
        })}
        <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "16px" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1 }}>
            Rewards
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "24px", fontWeight: 400, color: "#ffffff", margin: "8px 0 0 0", letterSpacing: "-0.02em", lineHeight: 1 }}>
            ${userPoints.toFixed(2)}
          </p>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   V3 — Minimal dots: vertical dot indicator
   ═══════════════════════════════════════════ */
function NavV3({ scrollTo, activeSectionRef, userPoints }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      const howItWorks = document.getElementById("section-how-it-works");
      if (howItWorks) {
        const rect = howItWorks.getBoundingClientRect();
        const shouldShow = rect.top <= HEADER_HEIGHT + 100;
        nav.style.opacity = shouldShow ? "1" : "0";
        nav.style.pointerEvents = shouldShow ? "auto" : "none";
      }
      if (isScrollingToRef.current) return;
      const detectPoint = HEADER_HEIGHT + 80;
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= detectPoint) current = section.id;
      }
      setActiveId(current);
      activeSectionRef.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSectionRef]);

  const handleClick = useCallback((id: string) => {
    isScrollingToRef.current = true;
    setActiveId(id);
    activeSectionRef.current = id;
    scrollTo(id);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => { isScrollingToRef.current = false; }, 800);
  }, [scrollTo, activeSectionRef]);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "28px",
        transform: "translateY(-50%)",
        zIndex: 110,
        opacity: 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        {sections.map((section) => {
          const isActive = activeId === section.id;
          const isHovered = hoveredId === section.id;
          return (
            <div key={section.id} style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <button
                onClick={() => handleClick(section.id)}
                onMouseEnter={() => setHoveredId(section.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={section.label}
                style={{
                  width: isActive ? "10px" : "6px",
                  height: isActive ? "10px" : "6px",
                  borderRadius: "50%",
                  backgroundColor: isActive ? "#0C3D3D" : isHovered ? "#999999" : "#cccccc",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.25s ease",
                }}
              />
              {/* Tooltip */}
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    left: "22px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 500,
                    padding: "6px 12px",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  {section.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   V4 — Top bar: horizontal sticky bar below header
   ═══════════════════════════════════════════ */
function NavV4({ scrollTo, activeSectionRef, userPoints }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState("");
  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      const howItWorks = document.getElementById("section-how-it-works");
      if (howItWorks) {
        const rect = howItWorks.getBoundingClientRect();
        const shouldShow = rect.top <= HEADER_HEIGHT + 100;
        nav.style.transform = shouldShow ? "translateY(0)" : "translateY(-100%)";
        nav.style.pointerEvents = shouldShow ? "auto" : "none";
      }
      if (isScrollingToRef.current) return;
      const detectPoint = HEADER_HEIGHT + 80;
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= detectPoint) current = section.id;
      }
      setActiveId(current);
      activeSectionRef.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSectionRef]);

  const handleClick = useCallback((id: string) => {
    isScrollingToRef.current = true;
    setActiveId(id);
    activeSectionRef.current = id;
    scrollTo(id);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => { isScrollingToRef.current = false; }, 800);
  }, [scrollTo, activeSectionRef]);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: "90px",
        left: 0,
        right: 0,
        zIndex: 109,
        transform: "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: "none",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "48px",
          gap: "4px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: isActive ? "#0C3D3D" : "#666666",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "14px 16px",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  borderBottom: isActive ? "2px solid #0C3D3D" : "2px solid transparent",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                  marginBottom: "-1px",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#1a1a1a"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#666666"; }}
              >
                {section.label}
              </button>
            );
          })}
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#0C3D3D", margin: 0, whiteSpace: "nowrap" }}>
          ${userPoints.toFixed(2)} available
        </p>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   V5 — Vertical line: left rail with active marker
   ═══════════════════════════════════════════ */
function NavV5({ scrollTo, activeSectionRef, userPoints }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState("");
  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      const howItWorks = document.getElementById("section-how-it-works");
      if (howItWorks) {
        const rect = howItWorks.getBoundingClientRect();
        const shouldShow = rect.top <= HEADER_HEIGHT + 100;
        nav.style.opacity = shouldShow ? "1" : "0";
        nav.style.pointerEvents = shouldShow ? "auto" : "none";
      }
      if (isScrollingToRef.current) return;
      const detectPoint = HEADER_HEIGHT + 80;
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= detectPoint) current = section.id;
      }
      setActiveId(current);
      activeSectionRef.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSectionRef]);

  const handleClick = useCallback((id: string) => {
    isScrollingToRef.current = true;
    setActiveId(id);
    activeSectionRef.current = id;
    scrollTo(id);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => { isScrollingToRef.current = false; }, 800);
  }, [scrollTo, activeSectionRef]);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "32px",
        transform: "translateY(-50%)",
        zIndex: 110,
        opacity: 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", gap: "0" }}>
        {/* Vertical rail line */}
        <div style={{ width: "2px", backgroundColor: "#e5e5e5", position: "relative", flexShrink: 0 }}>
          {/* Active indicator */}
          {sections.map((section, i) => {
            const isActive = activeId === section.id;
            return (
              <div
                key={section.id}
                style={{
                  position: "absolute",
                  top: `${i * (100 / sections.length)}%`,
                  left: 0,
                  width: "2px",
                  height: `${100 / sections.length}%`,
                  backgroundColor: isActive ? "#0C3D3D" : "transparent",
                  transition: "background-color 0.3s ease",
                }}
              />
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", paddingLeft: "16px" }}>
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#0C3D3D" : "#999999",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "7px 0",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  textAlign: "left",
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#666666"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#999999"; }}
              >
                {section.label}
              </button>
            );
          })}
          <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #e5e5e5" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "#999999", margin: 0, lineHeight: 1 }}>Rewards</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 400, color: "#0C3D3D", margin: "8px 0 0 0", letterSpacing: "-0.02em", lineHeight: 1 }}>${userPoints.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   V6 — Floating pill: compact floating capsule
   ═══════════════════════════════════════════ */
function NavV6({ scrollTo, activeSectionRef, userPoints }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState("");
  const [expanded, setExpanded] = useState(false);
  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      const howItWorks = document.getElementById("section-how-it-works");
      if (howItWorks) {
        const rect = howItWorks.getBoundingClientRect();
        const shouldShow = rect.top <= HEADER_HEIGHT + 100;
        nav.style.opacity = shouldShow ? "1" : "0";
        nav.style.pointerEvents = shouldShow ? "auto" : "none";
      }
      if (isScrollingToRef.current) return;
      const detectPoint = HEADER_HEIGHT + 80;
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= detectPoint) current = section.id;
      }
      setActiveId(current);
      activeSectionRef.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSectionRef]);

  const handleClick = useCallback((id: string) => {
    isScrollingToRef.current = true;
    setActiveId(id);
    activeSectionRef.current = id;
    scrollTo(id);
    setExpanded(false);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => { isScrollingToRef.current = false; }, 800);
  }, [scrollTo, activeSectionRef]);

  const activeLabel = sections.find((s) => s.id === activeId)?.label || "Navigate";

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 110,
        opacity: 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }}
    >
      {/* Expanded menu */}
      {expanded && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#ffffff",
            border: "1px solid #eaeaea",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            padding: "8px 0",
            minWidth: "200px",
          }}
        >
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#0C3D3D" : "#1a1a1a",
                  background: isActive ? "#f0f5f5" : "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px 20px",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  textAlign: "left",
                  width: "100%",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "#f9f9f9"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Pill button */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "#0C3D3D",
          border: "none",
          borderRadius: "999px",
          padding: "0 24px",
          height: "48px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(12,61,61,0.25)",
          transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0a3333"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#0C3D3D"; }}
      >
        <span>{activeLabel}</span>
        <span style={{ fontSize: "13px", fontWeight: 500, opacity: 0.7 }}>|</span>
        <span style={{ fontSize: "13px", fontWeight: 500 }}>${userPoints.toFixed(2)}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
          <path d="M1 6.5L5 2.5L9 6.5" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   Shared types & wrapper
   ═══════════════════════════════════════════ */
interface NavProps {
  scrollTo: (id: string) => void;
  activeSectionRef: React.RefObject<string>;
  userPoints: number;
  hasClaimable: boolean;
}

export default function StickyNav() {
  const isMobile = useIsMobile();
  const [version, setVersion] = useState(1);
  const [userPoints, setUserPoints] = useState(5);
  const [hasClaimable, setHasClaimable] = useState(true);
  const activeSectionRef = useRef("");

  useEffect(() => {
    const pointsHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.points !== undefined) setUserPoints(detail.points);
    };
    const claimableHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.hasClaimable !== undefined) setHasClaimable(detail.hasClaimable);
    };
    const versionHandler = (e: Event) => {
      const v = (e as CustomEvent).detail?.version;
      if (typeof v === "number" && v >= 1 && v <= 6) setVersion(v);
    };
    window.addEventListener("points-updated", pointsHandler);
    window.addEventListener("activities-claimable", claimableHandler);
    window.addEventListener("nav-version", versionHandler);
    return () => {
      window.removeEventListener("points-updated", pointsHandler);
      window.removeEventListener("activities-claimable", claimableHandler);
      window.removeEventListener("nav-version", versionHandler);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  if (isMobile) return null;

  const props: NavProps = { scrollTo, activeSectionRef: activeSectionRef as React.RefObject<string>, userPoints, hasClaimable };

  switch (version) {
    case 2: return <NavV2 {...props} />;
    case 3: return <NavV3 {...props} />;
    case 4: return <NavV4 {...props} />;
    case 5: return <NavV5 {...props} />;
    case 6: return <NavV6 {...props} />;
    default: return <NavV1 {...props} />;
  }
}
