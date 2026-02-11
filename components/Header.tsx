"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MagnifyingGlass, User, Bag, XmarkCircle } from "@vectoricons/atlas-icons-react";

/* ─── Announcement Bar ─── */
function AnnouncementBar({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: "28px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "9.5px",
          lineHeight: 1,
          fontWeight: 400,
          letterSpacing: "0.04em",
          textAlign: "center",
          color: "#ffffff",
          margin: 0,
        }}
      >
        Free UPS Worldwide Express with any purchase —{" "}
        <a
          href="#"
          style={{
            color: "#ffffff",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          EXPLORE HOLIDAY COLLECTION
        </a>
      </p>
      <button
        onClick={onClose}
        aria-label="Close announcement"
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#ffffff",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.6,
        }}
      >
        <XmarkCircle size={16} color="currentColor" />
      </button>
    </div>
  );
}

/* ─── Tier Thresholds (matching Tiers.tsx) ─── */
const TIER_THRESHOLDS = [0, 100, 300, 500];
const TIER_NAMES: Record<number, string> = {
  0: "Tier 1",
  1: "Tier 2",
  2: "Tier 3",
  3: "The Collective",
};

function getTierFromSpend(spend: number): number {
  if (spend >= 500) return 3;
  if (spend >= 300) return 2;
  if (spend >= 100) return 1;
  return 0;
}

/* ─── Submenu arrow icon ─── */
function SubArrow() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M3.5 1.5L7 5L3.5 8.5"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Dropdown menu item ─── */
function MenuItem({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  hasArrow,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  hasArrow?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f9f7f5";
        onMouseEnter?.();
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        onMouseLeave?.();
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: hasArrow ? "space-between" : "flex-start",
        width: "100%",
        fontFamily: "var(--font-sans)",
        fontSize: "12px",
        fontWeight: 400,
        color: "#000000",
        padding: "12px 20px",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span>{children}</span>
      {hasArrow && <SubArrow />}
    </button>
  );
}

/* ─── SubMenu panel ─── */
function SubMenu({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "100%",
        top: 0,
        minWidth: "160px",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e2de",
        zIndex: 201,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Navigation Bar ─── */
function NavBar() {
  const [currentPoints, setCurrentPoints] = useState(50);
  const [totalSpend, setTotalSpend] = useState(50);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSub, setOpenSub] = useState<"spend" | "tiers" | "sweepstakes" | "featured" | "header" | null>(null);
  const [activeFeatured, setActiveFeatured] = useState(1);
  const [activeMembership, setActiveMembership] = useState(1);
  const [activeSweepstakes, setActiveSweepstakes] = useState(1);
  const [activeHeader, setActiveHeader] = useState(1);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTier = getTierFromSpend(totalSpend);

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
        setOpenSub(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  /* Listen for external points-updated events (from earn cards, achievements, redeem) */
  useEffect(() => {
    function handlePointsUpdated(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.points === "number") {
        setCurrentPoints(detail.points);
      }
    }
    window.addEventListener("points-updated", handlePointsUpdated);
    return () =>
      window.removeEventListener("points-updated", handlePointsUpdated);
  }, []);

  /* Listen for external spend-updated events */
  useEffect(() => {
    function handleSpendUpdated(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.spend === "number") {
        setTotalSpend(detail.spend);
      }
    }
    window.addEventListener("spend-updated", handleSpendUpdated);
    return () =>
      window.removeEventListener("spend-updated", handleSpendUpdated);
  }, []);

  const closeAll = useCallback(() => {
    setDropdownOpen(false);
    setOpenSub(null);
  }, []);

  const handleSimulateSpend = useCallback((amount: number) => {
    const newSpend = totalSpend + amount;
    const newPoints = currentPoints + amount;
    const newTier = getTierFromSpend(newSpend);

    setTotalSpend(newSpend);
    setCurrentPoints(newPoints);

    window.dispatchEvent(new CustomEvent("spend-updated", { detail: { spend: newSpend } }));
    window.dispatchEvent(new CustomEvent("points-updated", { detail: { points: newPoints } }));
    window.dispatchEvent(new CustomEvent("tier-updated", { detail: { tier: newTier } }));

    closeAll();
  }, [totalSpend, currentPoints, closeAll]);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        height: "44px",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      {/* Left — Nav Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* Program dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen((prev) => !prev);
            }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11.5px",
              fontWeight: 400,
              letterSpacing: "0.01em",
              color: "#000000",
              textDecoration: "none",
              lineHeight: 1,
            }}
          >
            program
          </a>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "8px",
                minWidth: "180px",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e2de",
                zIndex: 200,
              }}
            >
              {/* ─── Spend submenu ─── */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setOpenSub("spend")}
                onMouseLeave={() => setOpenSub(null)}
              >
                <MenuItem hasArrow>spend</MenuItem>
                {openSub === "spend" && (
                  <SubMenu>
                    {[50, 100, 500].map((amount) => (
                      <MenuItem
                        key={amount}
                        onClick={() => handleSimulateSpend(amount)}
                        onMouseEnter={() => setOpenSub("spend")}
                      >
                        simulate ${amount}
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}
              </div>

              {/* ─── Header submenu ─── */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setOpenSub("header")}
                onMouseLeave={() => setOpenSub(null)}
              >
                <MenuItem hasArrow>header</MenuItem>
                {openSub === "header" && (
                  <SubMenu>
                    {([1, 2, 3] as const).map((v) => (
                      <MenuItem
                        key={v}
                        onClick={() => {
                          setActiveHeader(v);
                          window.dispatchEvent(
                            new CustomEvent("hero-version", {
                              detail: { version: v },
                            })
                          );
                          closeAll();
                        }}
                        onMouseEnter={() => setOpenSub("header")}
                      >
                        <span style={{ fontWeight: activeHeader === v ? 700 : 400 }}>version {v}</span>
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}
              </div>

              {/* ─── Featured submenu ─── */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setOpenSub("featured")}
                onMouseLeave={() => setOpenSub(null)}
              >
                <MenuItem hasArrow>featured</MenuItem>
                {openSub === "featured" && (
                  <SubMenu>
                    {([1, 2, 3] as const).map((v) => (
                      <MenuItem
                        key={v}
                        onClick={() => {
                          setActiveFeatured(v);
                          window.dispatchEvent(
                            new CustomEvent("featured-version", {
                              detail: { version: v },
                            })
                          );
                          closeAll();
                        }}
                        onMouseEnter={() => setOpenSub("featured")}
                      >
                        <span style={{ fontWeight: activeFeatured === v ? 700 : 400 }}>version {v}</span>
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}
              </div>

              {/* ─── Membership submenu ─── */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setOpenSub("tiers")}
                onMouseLeave={() => setOpenSub(null)}
              >
                <MenuItem hasArrow>membership</MenuItem>
                {openSub === "tiers" && (
                  <SubMenu>
                    {([1, 2, 3] as const).map((v) => (
                      <MenuItem
                        key={v}
                        onClick={() => {
                          setActiveMembership(v);
                          window.dispatchEvent(
                            new CustomEvent("tiers-version", {
                              detail: { version: v },
                            })
                          );
                          closeAll();
                        }}
                        onMouseEnter={() => setOpenSub("tiers")}
                      >
                        <span style={{ fontWeight: activeMembership === v ? 700 : 400 }}>version {v}</span>
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}
              </div>

              {/* ─── Sweepstakes submenu ─── */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setOpenSub("sweepstakes")}
                onMouseLeave={() => setOpenSub(null)}
              >
                <MenuItem hasArrow>sweepstakes</MenuItem>
                {openSub === "sweepstakes" && (
                  <SubMenu>
                    {([1, 2, 3] as const).map((v) => (
                      <MenuItem
                        key={v}
                        onClick={() => {
                          setActiveSweepstakes(v);
                          window.dispatchEvent(
                            new CustomEvent("sweepstakes-version", {
                              detail: { version: v },
                            })
                          );
                          closeAll();
                        }}
                        onMouseEnter={() => setOpenSub("sweepstakes")}
                      >
                        <span style={{ fontWeight: activeSweepstakes === v ? 700 : 400 }}>version {v}</span>
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}
              </div>


            </div>
          )}
        </div>
      </div>

      {/* Center — Logo */}
      <a
        href="#"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-serif)",
          fontSize: "15px",
          fontWeight: 400,
          letterSpacing: "0.015em",
          color: "#000000",
          textDecoration: "none",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        goop<span style={{ fontStyle: "italic" }}>beauty</span>
      </a>

      {/* Right — Tier indicator + Icon Buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Tier & points indicator */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "3px",
            marginRight: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#000000",
                lineHeight: 1,
              }}
            >
              {TIER_NAMES[currentTier]}
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 400,
                color: "#888888",
                lineHeight: 1,
              }}
            >
              {currentPoints.toLocaleString()} pts
            </span>
          </div>
        </div>

        <button
          aria-label="Search"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#000000",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <MagnifyingGlass size={17} color="currentColor" />
        </button>
        <button
          aria-label="Account"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#000000",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <User size={17} color="currentColor" />
        </button>
        <button
          aria-label="Bag"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#000000",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Bag size={17} color="currentColor" />
        </button>
      </div>
    </nav>
  );
}

/* ─── Header ─── */
export default function Header() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100 }}>
      {showAnnouncement && (
        <AnnouncementBar onClose={() => setShowAnnouncement(false)} />
      )}
      <NavBar />
    </header>
  );
}
