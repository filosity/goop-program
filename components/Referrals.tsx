"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Referrals() {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState("");
  const [yourName, setYourName] = useState("");
  const [friendName, setFriendName] = useState("");
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sendHovered, setSendHovered] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);
  const [fbHovered, setFbHovered] = useState(false);
  const [xHovered, setXHovered] = useState(false);
  const [emailIconHovered, setEmailIconHovered] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [yourNameFocused, setYourNameFocused] = useState(false);
  const [friendNameFocused, setFriendNameFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  const referralLink = "referfrnd.io/goop/384928";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="section-referrals"
      style={{
        backgroundColor: "#0C3D3D",
        padding: "0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          height: isMobile ? "auto" : "920px",
          position: "relative",
        }}
      >
        {/* ─── Left column: form ─── */}
        <div
          style={{
            backgroundColor: "transparent",
            padding: isMobile ? "32px 20px" : "56px 52px 52px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            zIndex: 2,
            order: isMobile ? 2 : 1,
          }}
        >
          {/* Label */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ffffff",
              margin: "0 0 16px 0",
              lineHeight: 1,
            }}
          >
            REFER A FRIEND
          </p>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: isMobile ? "32px" : "44px",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#ffffff",
              margin: "0 0 14px 0",
              letterSpacing: "-0.01em",
            }}
          >
            Refer a Friend
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.55,
              color: "#ffffff",
              margin: "0 0 24px 0",
              maxWidth: "400px",
            }}
          >
            Both you and your friend receive a discount. Tiered rewards based on
            purchase amount.
          </p>

          {/* Tiered referral table */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              marginBottom: "8px",
              maxWidth: "400px",
            }}
          >
            {[
              { min: "$200", reward: "$50 off each" },
              { min: "$500", reward: "$100 off each" },
              { min: "$1,000", reward: "$200 off each" },
            ].map((tier, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom:
                    i < 2
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#ffffff",
                  }}
                >
                  Min. {tier.min}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  {tier.reward}
                </span>
              </div>
            ))}
          </div>

          {/* Referral note */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 28px 0",
              maxWidth: "400px",
            }}
          >
            No stacking against other offers. The referrer receives an equivalent
            discount.
          </p>

          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="Your friend's email"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 400,
              color: "#ffffff",
              border: "none",
              borderBottom: emailFocused
                ? "1px solid #ffffff"
                : "1px solid rgba(255,255,255,0.3)",
              padding: "12px 0",
              backgroundColor: "transparent",
              width: "100%",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
          />

          {/* ─── Personalize your invite (collapsible accordion) ─── */}
          <div
            style={{
              border: expanded ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "transparent",
              marginTop: "20px",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 400,
                color: "#ffffff",
                background: "none",
                border: "none",
                padding: "16px 20px",
                minHeight: "52px",
                width: "100%",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "opacity 0.2s ease",
              }}
            >
              Personalize your invite
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                  flexShrink: 0,
                }}
              >
                <path
                  d="M1 3L5 7L9 3"
                  stroke="#ffffff"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Collapsible content */}
            <div
              style={{
                maxHeight: expanded ? "300px" : "0px",
                overflow: "hidden",
                opacity: expanded ? 1 : 0,
                transition:
                  "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
              }}
            >
              <div style={{ padding: "0 20px 20px" }}>
                {/* Name fields side by side */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "0",
                  }}
                >
                  <input
                    type="text"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    onFocus={() => setYourNameFocused(true)}
                    onBlur={() => setYourNameFocused(false)}
                    placeholder="Your name"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#ffffff",
                      border: "none",
                      borderBottom: yourNameFocused
                        ? "1px solid #ffffff"
                        : "1px solid rgba(255,255,255,0.3)",
                      padding: "12px 0",
                      backgroundColor: "transparent",
                      width: "100%",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                  />
                  <input
                    type="text"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    onFocus={() => setFriendNameFocused(true)}
                    onBlur={() => setFriendNameFocused(false)}
                    placeholder="Your friend's name"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#ffffff",
                      border: "none",
                      borderBottom: friendNameFocused
                        ? "1px solid #ffffff"
                        : "1px solid rgba(255,255,255,0.3)",
                      padding: "12px 0",
                      backgroundColor: "transparent",
                      width: "100%",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                  />
                </div>

                {/* Message textarea */}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setMessageFocused(true)}
                  onBlur={() => setMessageFocused(false)}
                  placeholder="Add a personal message..."
                  rows={3}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#ffffff",
                    border: "none",
                    borderBottom: messageFocused
                      ? "1px solid #ffffff"
                      : "1px solid rgba(255,255,255,0.3)",
                    padding: "14px 0",
                    backgroundColor: "transparent",
                    width: "100%",
                    outline: "none",
                    resize: "none",
                    transition: "border-color 0.2s ease",
                    marginTop: "4px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            onMouseEnter={() => setSendHovered(true)}
            onMouseLeave={() => setSendHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "17px",
              fontWeight: 400,
              color: sendHovered ? "#0C3D3D" : "#ffffff",
              backgroundColor: sendHovered ? "#ffffff" : "transparent",
              border: "1px solid #ffffff",
              minHeight: "52px",
              borderRadius: "999px",
              padding: "0 36px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease",
              alignSelf: isMobile ? "stretch" : "flex-start",
              marginTop: "28px",
            }}
          >
            Send Invite →
          </button>

          {/* Or share your link */}
          <div style={{ marginTop: "32px" }} />
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ffffff",
              margin: "0 0 16px 0",
              lineHeight: 1,
            }}
          >
            Or share your link
          </p>

          {/* Copy link button */}
          <button
            onClick={handleCopyLink}
            onMouseEnter={() => setCopyHovered(true)}
            onMouseLeave={() => setCopyHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "17px",
              fontWeight: 400,
              color: "#ffffff",
              backgroundColor: copied ? "rgba(255,255,255,0.15)" : "transparent",
              border: "1px solid rgba(255,255,255,0.4)",
              minHeight: "52px",
              borderRadius: "999px",
              padding: "0 28px",
              cursor: "pointer",
              transition:
                "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              alignSelf: isMobile ? "stretch" : "flex-start",
              justifyContent: isMobile ? "center" : undefined,
            }}
          >
            {/* Copy icon */}
            {!copied && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="1" />
                <path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" />
              </svg>
            )}
            {copied ? "Copied!" : referralLink}
          </button>

          {/* Social icons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {/* Facebook */}
            <button
              onMouseEnter={() => setFbHovered(true)}
              onMouseLeave={() => setFbHovered(false)}
              aria-label="Share on Facebook"
              style={{
                width: "52px",
                minHeight: "52px",
                borderRadius: "50%",
                border: fbHovered ? "1px solid #ffffff" : "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </button>

            {/* X / Twitter */}
            <button
              onMouseEnter={() => setXHovered(true)}
              onMouseLeave={() => setXHovered(false)}
              aria-label="Share on X"
              style={{
                width: "52px",
                minHeight: "52px",
                borderRadius: "50%",
                border: xHovered ? "1px solid #ffffff" : "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s ease",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>

            {/* Email */}
            <button
              onMouseEnter={() => setEmailIconHovered(true)}
              onMouseLeave={() => setEmailIconHovered(false)}
              aria-label="Share via Email"
              style={{
                width: "52px",
                minHeight: "52px",
                borderRadius: "50%",
                border: emailIconHovered
                  ? "1px solid #ffffff"
                  : "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s ease",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4l-10 8L2 4" />
              </svg>
            </button>
          </div>
        </div>

        {/* ─── Right column: image (extends full width to the right edge) ─── */}
        <div
          style={{
            position: "relative",
            overflow: "visible",
            height: isMobile ? "250px" : undefined,
            order: isMobile ? 1 : 2,
          }}
        >
          <div
            style={{
              position: isMobile ? "relative" : "absolute",
              top: 0,
              left: 0,
              right: isMobile ? 0 : "calc(-1 * (50vw - 640px))",
              bottom: 0,
              overflow: "hidden",
              height: isMobile ? "250px" : undefined,
            }}
          >
            <img
              src="/background-header.jpg"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                display: "block",
              }}
            />
            {/* Subtle overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(12,61,61,0.15) 0%, rgba(0,0,0,0) 30%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
