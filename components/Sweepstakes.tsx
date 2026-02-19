"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@vectoricons/atlas-icons-react";

const steps = [
  {
    number: 1,
    title: "enter your handle",
    description:
      "Enter your Tik Tok or Instagram handle to join the contest.",
  },
  {
    number: 2,
    title: "comment on social",
    description:
      "Leave a comment on our Tik Tok or Instagram video.",
  },
  {
    number: 3,
    title: "share on social",
    description:
      "Repost our video with #goop26 on Tik Tok or Instagram, tag at least 1 friend.",
  },
  {
    number: 4,
    title: "winners announcement",
    description:
      "Winners will be contacted how to redeem your prize.",
  },
];

const pastWinners = [
  {
    product: "Jillian Dempsey Makeup Bag",
    winner: "casey r.",
    image: "/product-makeupbag.webp",
  },
  {
    product: "Bathorium Boreal Fog Bath Bomb",
    winner: "jake k.",
    image: "/product-bath-bomb.webp",
  },
  {
    product: "Corpus Body Wash",
    winner: "sam o.",
    image: "/product-corpus-bodywash.webp",
  },
  {
    product: "goop beauty Afterglow Body Oil",
    winner: "mia t.",
    image: "/product-afterglow-bodyoil.webp",
  },
  {
    product: "Surya Love Bath Heart-Opening Soak",
    winner: "alex d.",
    image: "/product-love-bath-soak.webp",
  },
  {
    product: "Kate McLeod Amber & Vanilla Pebble",
    winner: "riley p.",
    image: "/product-amber-pebble.webp",
  },
  {
    product: "Maison Louis Marie No.14 Icila Body Lotion",
    winner: "jordan w.",
    image: "/product-icila-bodylotion.webp",
  },
  {
    product: "Rahua Aloe Vera Shampoo & Conditioner Duo",
    winner: "taylor m.",
    image: "/product-aloe-vera-duo.webp",
  },
];

/* ─── Shared: scroll to Ways to Earn + trigger highlights ─── */
function scrollToEarn() {
  const el = document.getElementById("section-ways-to-earn");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 76 - 60;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => {
      window.dispatchEvent(new Event("activate-earn-tab"));
      window.dispatchEvent(new Event("highlight-earn-handles"));
    }, 800);
  }
}

export default function Sweepstakes() {
  const [activeTab, setActiveTab] = useState<"join" | "past">("join");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredWinner, setHoveredWinner] = useState<number | null>(null);
  const [leftArrowHovered, setLeftArrowHovered] = useState(false);
  const [rightArrowHovered, setRightArrowHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const allWinners = [...pastWinners, ...pastWinners, ...pastWinners];

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = carouselRef.current;
    if (!el) return;
    e.preventDefault();
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.scrollBehavior = "auto";
    el.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = carouselRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    el.scrollLeft = dragScrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    const el = carouselRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
      el.style.cursor = "grab";
    }
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
  };

  const [joinHovered, setJoinHovered] = useState(false);
  const [pastHovered, setPastHovered] = useState(false);
  const [termsHovered, setTermsHovered] = useState(false);
  const [titleHovered, setTitleHovered] = useState(false);
  const [handlesConnected, setHandlesConnected] = useState(false);
  const [earnLinkHovered, setEarnLinkHovered] = useState(false);
  const [version, setVersion] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const handler = () => setHandlesConnected(true);
    window.addEventListener("handles-connected", handler);
    return () => window.removeEventListener("handles-connected", handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.version === 1 || detail?.version === 2 || detail?.version === 3) {
        setVersion(detail.version);
      }
    };
    window.addEventListener("sweepstakes-version", handler);
    return () => window.removeEventListener("sweepstakes-version", handler);
  }, []);

  return (
    <section
      id="section-sweepstakes"
      style={{
        backgroundColor: "#ffffff",
        padding: "40px 48px 90px",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "44px",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "#000000",
          textAlign: "center",
          margin: "0 0 56px 0",
          letterSpacing: "-0.01em",
        }}
      >
        Sweepstakes
      </h2>

      {/* Beige container */}
      <div
        style={{
          backgroundColor: "#f9f7f5",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "32px 0 48px",
        }}
      >
        {/* Tab buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          <button
            onClick={() => setActiveTab("join")}
            onMouseEnter={() => setJoinHovered(true)}
            onMouseLeave={() => setJoinHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "40px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease",
              backgroundColor:
                activeTab === "join"
                  ? "#000000"
                  : joinHovered
                    ? "rgba(0,0,0,0.08)"
                    : "transparent",
              color: activeTab === "join" ? "#ffffff" : "#000000",
              border: "1px solid #000000",
            }}
          >
            join the sweepstakes
          </button>
          <button
            onClick={() => setActiveTab("past")}
            onMouseEnter={() => setPastHovered(true)}
            onMouseLeave={() => setPastHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "40px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease",
              backgroundColor:
                activeTab === "past"
                  ? "#000000"
                  : pastHovered
                    ? "rgba(0,0,0,0.08)"
                    : "transparent",
              color: activeTab === "past" ? "#ffffff" : "#000000",
              border: "1px solid #000000",
            }}
          >
            past winners
          </button>
        </div>

        {/* ═══ JOIN TAB — new version (editorial split) ═══ */}
        {activeTab === "join" && version === 1 && (
          <div style={{ padding: "0 48px" }}>
            <div
              style={{
                display: "flex",
                backgroundColor: "#ffffff",
                overflow: "hidden",
                minHeight: "520px",
              }}
            >
              {/* Left — hero image */}
              <div
                style={{
                  width: "45%",
                  flexShrink: 0,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src="/sweepstakes_hero.jpg"
                  alt="Sweepstakes prize"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Right — content */}
              <div
                style={{
                  flex: 1,
                  padding: "48px 52px 44px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Top label */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#888888",
                    margin: "0 0 16px 0",
                    lineHeight: 1,
                  }}
                >
                  march sweepstake
                </p>

                {/* Title */}
                <h2
                  onMouseEnter={() => setTitleHovered(true)}
                  onMouseLeave={() => setTitleHovered(false)}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "36px",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: titleHovered ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.85)",
                    margin: "0 0 24px 0",
                    letterSpacing: "-0.01em",
                    transition: "color 0.25s ease",
                    cursor: "pointer",
                  }}
                >
                  Microderm Instant Glow
                  <br />
                  Body Polish
                </h2>

                {/* Separator */}
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#e5e2de",
                    margin: "0 0 28px 0",
                  }}
                />

                {/* Steps timeline */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  {steps.map((step, idx) => (
                    <div
                      key={step.number}
                      onMouseEnter={() => setHoveredStep(step.number)}
                      onMouseLeave={() => setHoveredStep(null)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        opacity:
                          hoveredStep !== null && hoveredStep !== step.number
                            ? 0.55
                            : 1,
                        transition: "opacity 0.3s ease",
                        position: "relative",
                      }}
                    >
                      {/* Timeline column */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginRight: "18px",
                          flexShrink: 0,
                          alignSelf: "stretch",
                        }}
                      >
                        {/* Circle */}
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            border:
                              handlesConnected && step.number === 1
                                ? "1px solid #000000"
                                : "1px solid #b8b4ae",
                            backgroundColor:
                              handlesConnected && step.number === 1
                                ? "#000000"
                                : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {handlesConnected && step.number === 1 ? (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : (
                            <span
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "#888888",
                                lineHeight: 1,
                              }}
                            >
                              {step.number}
                            </span>
                          )}
                        </div>

                        {/* Connecting line (touches circle) */}
                        {idx < steps.length - 1 && (
                          <div
                            style={{
                              width: "1px",
                              flex: 1,
                              minHeight: "12px",
                              backgroundColor: "#b8b4ae",
                            }}
                          />
                        )}
                      </div>

                      {/* Step text */}
                      <div
                        style={{
                          paddingBottom: idx < steps.length - 1 ? "28px" : "0",
                          paddingTop: "3px",
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "17px",
                            fontWeight: 400,
                            color: "#000000",
                            margin: "0 0 4px 0",
                            lineHeight: 1.3,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {step.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "12.5px",
                            fontWeight: 400,
                            color: "#888888",
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom section */}
                <div style={{ marginTop: "24px" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "#e5e2de",
                      margin: "0 0 20px 0",
                    }}
                  />

                  {/* Conditional text */}
                  {handlesConnected ? (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#1a1a1a",
                        margin: "0 0 24px 0",
                        lineHeight: 1.6,
                      }}
                    >
                      All set, follow the steps above to complete your
                      participation.
                    </p>
                  ) : (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#888888",
                        margin: "0 0 24px 0",
                        lineHeight: 1.6,
                      }}
                    >
                      Tell us your Tik Tok or Instagram handle in{" "}
                      <a
                        href="#section-ways-to-earn"
                        onMouseEnter={() => setEarnLinkHovered(true)}
                        onMouseLeave={() => setEarnLinkHovered(false)}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToEarn();
                        }}
                        style={{
                          color: "#000000",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          fontWeight: 500,
                          opacity: earnLinkHovered ? 0.6 : 1,
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        Ways to Earn goop credit
                      </a>{" "}
                      to enter the campaign.
                    </p>
                  )}

                  {/* Terms and date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "36px",
                    }}
                  >
                    <a
                      href="#"
                      onMouseEnter={() => setTermsHovered(true)}
                      onMouseLeave={() => setTermsHovered(false)}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#000000",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        opacity: termsHovered ? 0.6 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      See terms and conditions
                    </a>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#888888",
                        margin: 0,
                        lineHeight: 1,
                      }}
                    >
                      this month&apos;s sweepstake ends on: 06/01/2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ JOIN TAB — alternative version (card grid) ═══ */}
        {activeTab === "join" && version === 2 && (
          <div style={{ padding: "0 48px" }}>
            {/* Hero image — narrower */}
            <div
              style={{
                width: "60%",
                height: "280px",
                overflow: "hidden",
                marginBottom: "40px",
                margin: "0 auto 40px",
              }}
            >
              <img
                src="/sweepstakes_hero.jpg"
                alt="Sweepstakes prize"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Product title */}
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "32px",
                fontWeight: 400,
                color: "#000000",
                textAlign: "center",
                margin: "0 0 8px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Microderm Instant Glow Body Polish
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 400,
                color: "#888888",
                textAlign: "center",
                margin: "0 0 40px 0",
                lineHeight: 1.4,
              }}
            >
              this month&apos;s sweepstake ends on: 06/01/2026
            </p>

            {/* Steps grid with half-height dividers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0",
                maxWidth: "960px",
                margin: "0 auto 40px",
              }}
            >
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  onMouseEnter={() => setHoveredStep(step.number)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    padding: "28px 24px",
                    position: "relative",
                    opacity:
                      hoveredStep !== null && hoveredStep !== step.number
                        ? 0.55
                        : 1,
                    transition: "opacity 0.3s ease",
                    textAlign: "center",
                  }}
                >
                  {/* Half-height right divider */}
                  {idx < steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "25%",
                        height: "50%",
                        width: "1px",
                        backgroundColor: "#e5e2de",
                      }}
                    />
                  )}
                  {/* Number circle */}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border:
                        handlesConnected && step.number === 1
                          ? "1.5px solid #000000"
                          : "1.5px solid #d8d5d0",
                      backgroundColor:
                        handlesConnected && step.number === 1
                          ? "#000000"
                          : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {handlesConnected && step.number === 1 ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#888888",
                          lineHeight: 1,
                        }}
                      >
                        {step.number}
                      </span>
                    )}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "17px",
                      fontWeight: 400,
                      color: "#000000",
                      margin: "0 0 6px 0",
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#888888",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "960px",
                margin: "0 auto",
                borderTop: "1px solid #e5e2de",
                paddingTop: "20px",
              }}
            >
              {handlesConnected ? (
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#1a1a1a",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  All set, follow the steps above to complete your participation.
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#888888",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  Tell us your Tik Tok or Instagram handle in{" "}
                  <a
                    href="#section-ways-to-earn"
                    onMouseEnter={() => setEarnLinkHovered(true)}
                    onMouseLeave={() => setEarnLinkHovered(false)}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToEarn();
                    }}
                    style={{
                      color: "#000000",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      fontWeight: 500,
                      opacity: earnLinkHovered ? 0.6 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    Ways to Earn goop credit
                  </a>{" "}
                  to enter.
                </p>
              )}
              <a
                href="#"
                onMouseEnter={() => setTermsHovered(true)}
                onMouseLeave={() => setTermsHovered(false)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#000000",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  opacity: termsHovered ? 0.6 : 1,
                  transition: "opacity 0.2s ease",
                  flexShrink: 0,
                }}
              >
                See terms and conditions
              </a>
            </div>
          </div>
        )}

        {/* ═══ JOIN TAB — old version (centered card + grid) ═══ */}
        {activeTab === "join" && version === 3 && (
          <>
            <div style={{ padding: "0 48px" }}>
              {/* White card — hero image + text */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "0 0 28px 0",
                  maxWidth: "450px",
                  margin: "0 auto",
                }}
              >
                {/* Hero image */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    marginBottom: "32px",
                  }}
                >
                  <img
                    src="/sweepstakes_hero.jpg"
                    alt="Sweepstakes prize"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Text content */}
                <div style={{ padding: "0 28px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      color: "#1a1a1a",
                      margin: "0 0 8px 0",
                      lineHeight: 1,
                    }}
                  >
                    march sweepstake
                  </p>
                  <h2
                    onMouseEnter={() => setTitleHovered(true)}
                    onMouseLeave={() => setTitleHovered(false)}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "38px",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      color: titleHovered ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.85)",
                      margin: "0",
                      letterSpacing: "-0.01em",
                      transition: "color 0.25s ease",
                      cursor: "pointer",
                    }}
                  >
                    microderm instant glow
                    <br />
                    body polish
                  </h2>
                </div>
              </div>

              {/* Description */}
              <div>
                {handlesConnected ? (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1a1a1a",
                      margin: "24px 0 6px 0",
                      lineHeight: 1.6,
                      textAlign: "center",
                    }}
                  >
                    All set, follow the steps below to complete your participation.
                  </p>
                ) : (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#666666",
                      margin: "24px 0 6px 0",
                      lineHeight: 1.6,
                      textAlign: "center",
                    }}
                  >
                    Tell us your Tik Tok or Instagram handle in{" "}
                    <a
                      href="#section-ways-to-earn"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToEarn();
                      }}
                      style={{
                        color: "#666666",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 400,
                      }}
                    >
                      Ways to Earn goop credit
                    </a>{" "}
                    to enter the campaign.
                  </p>
                )}

                {/* Terms link */}
                <div style={{ textAlign: "center" }}>
                  <a
                    href="#"
                    onMouseEnter={() => setTermsHovered(true)}
                    onMouseLeave={() => setTermsHovered(false)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#000000",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      opacity: termsHovered ? 0.6 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    See terms and conditions
                  </a>
                </div>
              </div>
            </div>

            {/* Steps row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1px",
                margin: "40px 48px 0",
                backgroundColor: "#e5e2de",
              }}
            >
              {steps.map((step) => (
                <div
                  key={step.number}
                  onMouseEnter={() => setHoveredStep(step.number)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "32px 28px",
                    opacity:
                      hoveredStep !== null && hoveredStep !== step.number
                        ? 0.75
                        : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      margin: "0 0 14px 0",
                      lineHeight: 1,
                      height: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {handlesConnected && step.number === 1 ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#888888",
                          margin: 0,
                          lineHeight: 1,
                        }}
                      >
                        {step.number}
                      </p>
                    )}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "20px",
                      fontWeight: 400,
                      color: "#000000",
                      margin: "0 0 10px 0",
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#888888",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 400,
                color: "#888888",
                textAlign: "center",
                margin: "32px 0 0 0",
                lineHeight: 1,
              }}
            >
              this month&apos;s sweepstake ends on: 06/01/2026
            </p>
          </>
        )}

        {/* ═══ PAST WINNERS TAB ═══ */}
        {activeTab === "past" && (
          <div style={{ padding: "0 48px" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "44px",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "#000000",
                textAlign: "center",
                margin: "0 0 12px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Community leaderboard
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 400,
                color: "#888888",
                textAlign: "center",
                margin: "0 0 48px 0",
                lineHeight: 1.4,
              }}
            >
              Our previous sweepstake winners.
            </p>

            {/* Scrollable row */}
            <div
              ref={carouselRef}
              data-carousel=""
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                display: "flex",
                gap: "20px",
                overflowX: "auto",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                cursor: "grab",
                userSelect: "none",
              }}
            >
              {allWinners.map((w, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredWinner(i)}
                  onMouseLeave={() => setHoveredWinner(null)}
                  style={{
                    backgroundColor: "#ffffff",
                    minWidth: "280px",
                    maxWidth: "280px",
                    flexShrink: 0,
                    opacity: hoveredWinner !== null && hoveredWinner !== i ? 0.75 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={w.image}
                      alt={w.product}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px 24px 24px" }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "22px",
                        fontWeight: 400,
                        color: "#000000",
                        margin: "0 0 8px 0",
                        lineHeight: 1.25,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {w.product}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#000000",
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      won by: {w.winner}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow buttons — centered below cards */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "24px",
              }}
            >
              <button
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
                  }
                }}
                onMouseEnter={() => setLeftArrowHovered(true)}
                onMouseLeave={() => setLeftArrowHovered(false)}
                aria-label="Previous"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  border: leftArrowHovered ? "1px solid #000000" : "1px solid #d8d5d0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s ease",
                }}
              >
                <ArrowLeft size={12} color="#000000" />
              </button>
              <button
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
                  }
                }}
                onMouseEnter={() => setRightArrowHovered(true)}
                onMouseLeave={() => setRightArrowHovered(false)}
                aria-label="Next"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  border: rightArrowHovered ? "1px solid #000000" : "1px solid #d8d5d0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s ease",
                }}
              >
                <ArrowRight size={12} color="#000000" />
              </button>
            </div>

            <style>{`
              div::-webkit-scrollbar { display: none; }
              [data-carousel] * { -webkit-user-drag: none; user-drag: none; }
              [data-carousel] img { pointer-events: none; }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
}
