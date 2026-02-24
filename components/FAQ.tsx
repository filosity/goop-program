"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is AG Credit?",
    answer:
      "AG Credit is the rewards currency you earn as an AG1 subscriber. You earn credit per serving, through activities like referrals and social posts, and by hitting subscriber milestones. AG Credit can be redeemed for exclusive merch after 90 days of membership.",
  },
  {
    question: "How do I earn AG Credit?",
    answer:
      "You earn AG Credit automatically with every serving of AG1. You can also earn bonus credit by referring friends, connecting your social accounts, posting about AG1, leaving reviews, signing up for SMS, and celebrating your birthday as a member.",
  },
  {
    question: "When can I start redeeming rewards?",
    answer:
      "You can start redeeming AG Credit for exclusive merch after 90 days of active subscription. This ensures you're getting the full benefit of AG1 before unlocking the rewards experience.",
  },
  {
    question: "What can I redeem AG Credit for?",
    answer:
      "AG Credit can be redeemed for exclusive AG1 merch that isn't available anywhere else — including the AG1 Puffer Jacket, Pajamas, Stanley Cup, and more. You can also apply credit toward your subscription.",
  },
  {
    question: "How does the referral program work?",
    answer:
      "When you refer a friend, they get $15 off their first AG1 subscription order. Once they subscribe, you earn $15 in AG Credit. You can share your unique referral link via email, social media, or direct message.",
  },
  {
    question: "What are Subscriber Milestones?",
    answer:
      "Subscriber Milestones reward your loyalty over time. The longer you stay subscribed, the more you unlock — from welcome kits and apparel to bonus AG Credit multipliers and access to the limited edition merch store.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: "100px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* ─── Left: Heading ─── */}
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "44px",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#000000",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Have questions? We have the answers.
        </h2>

        {/* ─── Right: Accordion ─── */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid #d4e0df",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "24px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#000000",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.question}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{
                      flexShrink: 0,
                      transition: "transform 0.25s ease",
                      transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
                    }}
                  >
                    {isOpen ? (
                      <path
                        d="M1 7h12"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    ) : (
                      <>
                        <path
                          d="M7 1v12"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1 7h12"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </>
                    )}
                  </svg>
                </button>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    overflow: "hidden",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#555555",
                      lineHeight: 1.6,
                      margin: "0 0 24px 0",
                      maxWidth: "560px",
                    }}
                  >
                    {faq.answer}
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
