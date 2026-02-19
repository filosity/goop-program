"use client";

import { useState } from "react";

export default function Referrals() {
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

  const referralLink = "goop.com/ref/yourcode123";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      style={{
        padding: "0px 48px 120px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e2de",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "820px",
        }}
      >
        {/* ─── Left column: form ─── */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "56px 52px 52px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Label */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#888888",
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
              fontSize: "44px",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#000000",
              margin: "0 0 14px 0",
              letterSpacing: "-0.01em",
            }}
          >
            Give $10, Get $10
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.55,
              color: "#888888",
              margin: "0 0 32px 0",
              maxWidth: "320px",
            }}
          >
            Share the beauty. Your friend gets $10 off their first order, and you
            earn $10 in goop credit.
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
              color: "#000000",
              border: "none",
              borderBottom: emailFocused
                ? "1px solid #000000"
                : "1px solid #e5e2de",
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
              border: expanded ? "1px solid #000000" : "1px solid #e5e2de",
              backgroundColor: "transparent",
              marginTop: "20px",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                color: "#000000",
                background: "none",
                border: "none",
                padding: "16px 20px",
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
                  stroke="#000000"
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
                      color: "#000000",
                      border: "none",
                      borderBottom: yourNameFocused
                        ? "1px solid #000000"
                        : "1px solid #e5e2de",
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
                      color: "#000000",
                      border: "none",
                      borderBottom: friendNameFocused
                        ? "1px solid #000000"
                        : "1px solid #e5e2de",
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
                    color: "#000000",
                    border: "none",
                    borderBottom: messageFocused
                      ? "1px solid #000000"
                      : "1px solid #e5e2de",
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
              fontSize: "13px",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: sendHovered ? "#222222" : "#000000",
              border: "none",
              height: "38px",
              borderRadius: "40px",
              padding: "0 28px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              alignSelf: "flex-start",
              marginTop: "28px",
            }}
          >
            send invite
          </button>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#e5e2de",
              margin: "32px 0",
            }}
          />

          {/* Or share your link */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#aaaaaa",
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
              fontSize: "13px",
              fontWeight: 500,
              color: copied ? "#ffffff" : "#000000",
              backgroundColor: copied ? "#000000" : "transparent",
              border: copyHovered && !copied ? "1px solid #000000" : "1px solid #e5e2de",
              height: "38px",
              borderRadius: "40px",
              padding: "0 20px",
              cursor: "pointer",
              transition:
                "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              alignSelf: "flex-start",
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
            {copied ? "copied!" : referralLink}
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
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: fbHovered ? "1px solid #000000" : "1px solid #e5e2de",
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#000000">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </button>

            {/* X / Twitter */}
            <button
              onMouseEnter={() => setXHovered(true)}
              onMouseLeave={() => setXHovered(false)}
              aria-label="Share on X"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: xHovered ? "1px solid #000000" : "1px solid #e5e2de",
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s ease",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>

            {/* Email */}
            <button
              onMouseEnter={() => setEmailIconHovered(true)}
              onMouseLeave={() => setEmailIconHovered(false)}
              aria-label="Share via Email"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: emailIconHovered
                  ? "1px solid #000000"
                  : "1px solid #e5e2de",
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
                stroke="#000000"
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

        {/* ─── Right column: image ─── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="/background-header.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Subtle overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 30%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}
