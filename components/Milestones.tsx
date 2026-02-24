"use client";

const milestones = [
  { month: 1, reward: "Welcome Kit + Original Sampler", image: "/featured1.jpg" },
  { month: 2, reward: "AG1 Duffel Bag", image: "/featured2.jpg" },
  { month: 3, reward: "AG1 Sweatshirt", image: "/featured3.jpg" },
  { month: 4, reward: "AG1 Hat, 2x Referral Bonus", image: "/featured4.jpg" },
  { month: 5, reward: "Access to Limited Edition Merch Store", image: "/tier1.jpg" },
  { month: 6, reward: "AG1 Tote, Limited Edition Merch Access", image: "/tier2.jpg" },
  { month: 8, reward: "10% more AG Credit per Serving", image: "/tier3.jpg" },
  { month: 9, reward: "AG1 Tote", image: "/tier4.jpg" },
  { month: 11, reward: "15% more AG Credit per Serving", image: "/product-d3k2.jpg" },
  { month: 12, reward: "AG1 Sweatpants", image: "/product-omega3.jpg" },
];

const CURRENT_MONTH = 3;
const TOTAL_MONTHS = 12;

export default function Milestones() {
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
          fontFamily: "var(--font-sans)",
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
          fontFamily: "var(--font-sans)",
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
        }}
      >
        {/* ── Timeline ── */}
        <div
          style={{
            position: "relative",
            padding: "0 0 48px 0",
          }}
        >
          {/* Progress bar background */}
          <div
            style={{
              position: "absolute",
              top: "5px",
              left: "0",
              right: "0",
              height: "3px",
              backgroundColor: "#d4e0df",
              zIndex: 1,
            }}
          />

          {/* Progress bar fill */}
          <div
            style={{
              position: "absolute",
              top: "5px",
              left: "0",
              width: `${((CURRENT_MONTH - 1) / (TOTAL_MONTHS - 1)) * 100}%`,
              height: "3px",
              backgroundColor: "#0d8b87",
              zIndex: 2,
              transition: "width 0.6s ease",
            }}
          />

          {/* Month dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 3,
            }}
          >
            {Array.from({ length: TOTAL_MONTHS }, (_, i) => {
              const month = i + 1;
              const isEarned = month <= CURRENT_MONTH;
              const isCurrent = month === CURRENT_MONTH;

              return (
                <div
                  key={month}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "0px",
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: isCurrent ? "14px" : "10px",
                      height: isCurrent ? "14px" : "10px",
                      borderRadius: "50%",
                      backgroundColor: isEarned ? "#0d8b87" : "#d4e0df",
                      border: isCurrent ? "3px solid #ffffff" : "none",
                      boxShadow: isCurrent ? "0 0 0 2px #0d8b87" : "none",
                      flexShrink: 0,
                      marginTop: isCurrent ? "-1.5px" : "0.5px",
                    }}
                  />

                  {/* Month number */}
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: isCurrent ? 700 : 400,
                      color: isEarned ? "#0d8b87" : "#999999",
                      margin: "8px 0 0 0",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {month}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Benefits Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "20px",
            marginTop: "16px",
          }}
        >
          {milestones.map((m) => {
            const isEarned = m.month <= CURRENT_MONTH;
            const isCurrent = m.month === CURRENT_MONTH;

            return (
              <div
                key={m.month}
                style={{
                  backgroundColor: "#ffffff",
                  border: isCurrent ? "1.5px solid #0d8b87" : "1px solid #d4e0df",
                  overflow: "hidden",
                  opacity: !isEarned && !isCurrent ? 0.55 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "160px",
                    backgroundColor: "#f0f0ef",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={m.image}
                    alt={m.reward}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "16px" }}>
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
                      Month {m.month}
                    </span>
                  </div>

                  {/* Reward text */}
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#1a1a1a",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {m.reward}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
