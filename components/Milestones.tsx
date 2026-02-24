"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "@vectoricons/atlas-icons-react";

const milestones = [
  { month: 1, reward: "Welcome Kit + Original Sampler" },
  { month: 2, reward: "AG1 Duffel Bag" },
  { month: 3, reward: "AG1 Sweatshirt" },
  { month: 4, reward: "AG1 Hat, 2x Referral Bonus" },
  { month: 5, reward: "Access to Limited Edition Merch Store" },
  { month: 6, reward: "AG1 Tote, Limited Edition Merch Access" },
  { month: 8, reward: "10% more AG Credit per Serving" },
  { month: 9, reward: "AG1 Tote" },
  { month: 11, reward: "15% more AG Credit per Serving" },
  { month: 12, reward: "AG1 Sweatpants" },
];

const CURRENT_MONTH = 3;
const TOTAL_MONTHS = 12;

/* Build a lookup for quick access */
const milestoneByMonth: Record<number, string> = {};
for (const m of milestones) {
  milestoneByMonth[m.month] = m.reward;
}

export default function Milestones() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return (
    <section
      id="section-milestones"
      style={{
        backgroundColor: "#ffffff",
        padding: "80px 48px 120px",
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
          margin: "0 0 12px 0",
          letterSpacing: "-0.01em",
        }}
      >
        Subscriber Milestones
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "16px",
          fontWeight: 400,
          color: "#6b8a89",
          textAlign: "center",
          margin: "0 0 56px 0",
          lineHeight: 1.5,
        }}
      >
        Unlock exclusive rewards the longer you stay subscribed.
      </p>

      {/* Container */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Arrow buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => scroll("left")}
            onMouseEnter={() => setLeftHovered(true)}
            onMouseLeave={() => setLeftHovered(false)}
            aria-label="Scroll left"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: leftHovered ? "1px solid #000000" : "1px solid #d4e0df",
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
            onClick={() => scroll("right")}
            onMouseEnter={() => setRightHovered(true)}
            onMouseLeave={() => setRightHovered(false)}
            aria-label="Scroll right"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: rightHovered ? "1px solid #000000" : "1px solid #d4e0df",
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

        {/* Scrollable timeline area */}
        <div
          ref={scrollRef}
          style={{
            overflowX: "auto",
            overflowY: "visible",
            scrollbarWidth: "none",
            paddingBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              minWidth: `${TOTAL_MONTHS * 120}px`,
              position: "relative",
              paddingTop: "200px",
            }}
          >
            {/* Progress line background */}
            <div
              style={{
                position: "absolute",
                top: "200px",
                left: "0",
                right: "0",
                height: "3px",
                backgroundColor: "#d4e0df",
                zIndex: 1,
              }}
            />

            {/* Progress line fill */}
            <div
              style={{
                position: "absolute",
                top: "200px",
                left: "0",
                width: `${((CURRENT_MONTH - 0.5) / TOTAL_MONTHS) * 100}%`,
                height: "3px",
                backgroundColor: "#0d8b87",
                zIndex: 2,
                transition: "width 0.6s ease",
              }}
            />

            {/* Month markers and cards */}
            {Array.from({ length: TOTAL_MONTHS }, (_, i) => {
              const month = i + 1;
              const reward = milestoneByMonth[month];
              const isEarned = month <= CURRENT_MONTH;
              const isCurrent = month === CURRENT_MONTH;
              const isFuture = month > CURRENT_MONTH;

              return (
                <div
                  key={month}
                  style={{
                    flex: "1 0 0",
                    minWidth: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {/* Milestone card (positioned above the line) */}
                  {reward && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "calc(100% - 188px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "140px",
                        backgroundColor: "#ffffff",
                        border: isCurrent ? "1.5px solid #0d8b87" : "1px solid #d4e0df",
                        padding: "16px 16px",
                        opacity: isFuture ? 0.5 : 1,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      {/* Month label */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "8px",
                        }}
                      >
                        {isEarned && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="7" fill="#0d8b87" />
                            <path
                              d="M4 7.2L6 9.2L10 5"
                              stroke="#ffffff"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {!isEarned && (
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#d4e0df",
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: isCurrent ? "#0d8b87" : "#6b8a89",
                          }}
                        >
                          Month {month}
                        </span>
                      </div>

                      {/* Reward text */}
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#1a1a1a",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {reward}
                      </p>
                    </div>
                  )}

                  {/* Dot on the line */}
                  <div
                    style={{
                      width: isCurrent ? "14px" : "10px",
                      height: isCurrent ? "14px" : "10px",
                      borderRadius: "50%",
                      backgroundColor: isEarned ? "#0d8b87" : "#d4e0df",
                      border: isCurrent ? "3px solid #ffffff" : "none",
                      boxShadow: isCurrent ? "0 0 0 2px #0d8b87" : "none",
                      zIndex: 3,
                      position: "relative",
                      transition: "all 0.3s ease",
                    }}
                  />

                  {/* Month number below the line */}
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "14px",
                      fontWeight: isCurrent ? 700 : 400,
                      color: isEarned ? "#0d8b87" : "#999999",
                      margin: "10px 0 0 0",
                      textAlign: "center",
                    }}
                  >
                    {month}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
