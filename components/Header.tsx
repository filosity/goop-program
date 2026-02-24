"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────────────────────────────
   Program dropdown (hidden behind logo click)
   — keeps version-switching for demo purposes
   ─────────────────────────────────────────── */

function DropdownItem({
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
        e.currentTarget.style.backgroundColor = "#f5f5f3";
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
        fontSize: "13px",
        fontWeight: 400,
        color: "#1a1a1a",
        padding: "10px 16px",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span>{children}</span>
      {hasArrow && (
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
          <path d="M3.5 1.5L7 5L3.5 8.5" stroke="#999" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function SubMenu({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "100%",
        top: 0,
        minWidth: "150px",
        backgroundColor: "#ffffff",
        border: "1px solid #e8e5e1",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        zIndex: 201,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function ProgramDropdown({
  open,
  totalSpend,
  currentPoints,
  setTotalSpend,
  setCurrentPoints,
  closeAll,
  openSub,
  setOpenSub,
  activeFeatured,
  setActiveFeatured,
  activeMembership,
  setActiveMembership,
  activeSweepstakes,
  setActiveSweepstakes,
  activeHeader,
  setActiveHeader,
}: {
  open: boolean;
  totalSpend: number;
  currentPoints: number;
  setTotalSpend: (n: number) => void;
  setCurrentPoints: (n: number) => void;
  closeAll: () => void;
  openSub: string | null;
  setOpenSub: (s: string | null) => void;
  activeFeatured: number;
  setActiveFeatured: (n: number) => void;
  activeMembership: number;
  setActiveMembership: (n: number) => void;
  activeSweepstakes: number;
  setActiveSweepstakes: (n: number) => void;
  activeHeader: number;
  setActiveHeader: (n: number) => void;
}) {
  const handleSimulateSpend = useCallback(
    (amount: number) => {
      const newSpend = totalSpend + amount;
      const earned = Math.round(amount * 0.1 * 100) / 100;
      const newPoints = Math.round((currentPoints + earned) * 100) / 100;
      setTotalSpend(newSpend);
      setCurrentPoints(newPoints);
      window.dispatchEvent(new CustomEvent("spend-updated", { detail: { spend: newSpend } }));
      window.dispatchEvent(new CustomEvent("points-updated", { detail: { points: newPoints } }));
      closeAll();
    },
    [totalSpend, currentPoints, setTotalSpend, setCurrentPoints, closeAll]
  );

  if (!open) return null;

  const versionMenu = (
    label: string,
    subKey: string,
    event: string,
    active: number,
    setActive: (n: number) => void
  ) => (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpenSub(subKey)}
      onMouseLeave={() => setOpenSub(null)}
    >
      <DropdownItem hasArrow>{label}</DropdownItem>
      {openSub === subKey && (
        <SubMenu>
          {[1, 2, 3].map((v) => (
            <DropdownItem
              key={v}
              onClick={() => {
                setActive(v);
                window.dispatchEvent(new CustomEvent(event, { detail: { version: v } }));
                closeAll();
              }}
              onMouseEnter={() => setOpenSub(subKey)}
            >
              <span style={{ fontWeight: active === v ? 700 : 400 }}>version {v}</span>
            </DropdownItem>
          ))}
        </SubMenu>
      )}
    </div>
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        marginTop: "4px",
        minWidth: "170px",
        backgroundColor: "#ffffff",
        border: "1px solid #e8e5e1",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        zIndex: 200,
        overflow: "hidden",
        paddingTop: "4px",
        paddingBottom: "4px",
      }}
    >
      {/* Spend */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setOpenSub("spend")}
        onMouseLeave={() => setOpenSub(null)}
      >
        <DropdownItem hasArrow>spend</DropdownItem>
        {openSub === "spend" && (
          <SubMenu>
            {[50, 100, 500].map((amt) => (
              <DropdownItem key={amt} onClick={() => handleSimulateSpend(amt)} onMouseEnter={() => setOpenSub("spend")}>
                simulate ${amt}
              </DropdownItem>
            ))}
          </SubMenu>
        )}
      </div>
      {versionMenu("header", "header", "hero-version", activeHeader, setActiveHeader)}
      {versionMenu("featured", "featured", "featured-version", activeFeatured, setActiveFeatured)}
      {versionMenu("membership", "tiers", "tiers-version", activeMembership, setActiveMembership)}
      {versionMenu("sweepstakes", "sweepstakes", "sweepstakes-version", activeSweepstakes, setActiveSweepstakes)}
    </div>
  );
}

/* ───────────────────────────────────────────
   Header
   ─────────────────────────────────────────── */

export default function Header() {
  const [currentPoints, setCurrentPoints] = useState(5);
  const [totalSpend, setTotalSpend] = useState(50);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [activeFeatured, setActiveFeatured] = useState(1);
  const [activeMembership, setActiveMembership] = useState(1);
  const [activeSweepstakes, setActiveSweepstakes] = useState(1);
  const [activeHeader, setActiveHeader] = useState(1);
  const [shopHov, setShopHov] = useState(false);

  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (logoRef.current && !logoRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setOpenSub(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  useEffect(() => {
    const h = (e: Event) => {
      const d = (e as CustomEvent).detail;
      if (d?.points !== undefined) setCurrentPoints(d.points);
    };
    window.addEventListener("points-updated", h);
    return () => window.removeEventListener("points-updated", h);
  }, []);

  useEffect(() => {
    const h = (e: Event) => {
      const d = (e as CustomEvent).detail;
      if (d?.spend !== undefined) setTotalSpend(d.spend);
    };
    window.addEventListener("spend-updated", h);
    return () => window.removeEventListener("spend-updated", h);
  }, []);

  const closeAll = useCallback(() => {
    setDropdownOpen(false);
    setOpenSub(null);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "90px",
          padding: "0 40px",
        }}
      >
        {/* ── Left: AG1 Logo ── */}
        <div ref={logoRef} style={{ position: "relative", flexShrink: 0 }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen((p) => !p);
            }}
            style={{ display: "block", lineHeight: 0 }}
          >
            <svg viewBox="0 0 123 55" fill="none" style={{ width: "68px", height: "30px" }}>
              <path fill="#0F2E2F" d="M38.598 36.4008L46.0412 53.8289C46.0742 53.9279 46.1733 53.994 46.2723 53.994H51.9331C52.1147 53.994 52.2467 53.7959 52.1642 53.6308L29.9995 1.7427C29.9665 1.64367 29.8675 1.5777 29.7685 1.5777H23.4144C23.3154 1.5777 23.2164 1.64367 23.1834 1.7427L1.01877 53.6308C0.952759 53.7959 1.06821 53.994 1.24975 53.994H6.91056C7.00958 53.994 7.10863 53.9279 7.14164 53.8289L14.3703 36.9289L13.2316 37.3911H40.2979L38.598 36.4008ZM37.6903 31.6807H15.7896L16.2683 32.4399L26.4677 8.52576H26.6988L37.0466 32.7534L37.6903 31.6807Z" />
              <path fill="#0F2E2F" d="M98.5895 25.9703H93.1267H69.8562C69.7077 25.9703 69.5922 26.0859 69.5922 26.2345V31.4166C69.5922 31.5651 69.7077 31.6807 69.8562 31.6807H93.5557L93.1927 31.2021C93.1927 35.5426 88.9346 49.0263 73.5531 49.0263C60.7461 49.0263 53.0553 39.1239 53.0553 27.5052C53.0553 16.2331 61.1422 6.66081 73.8172 6.66081C82.4652 6.66081 87.994 10.5392 90.8161 16.1836C90.8656 16.2661 90.9482 16.3321 91.0472 16.3321H96.873C97.0546 16.3321 97.1701 16.1506 97.1206 15.9855C94.7441 8.98789 87.6143 1 73.6521 1C57.9899 1 47.2295 12.7838 47.2295 27.5878C47.2295 42.4248 57.1647 54.7036 73.5531 54.7036C88.2085 54.7036 99.0846 44.1576 99.0846 27.8518C99.0846 27.3897 99.0845 26.8121 99.0185 26.4325C98.969 26.1849 98.8865 25.9703 98.5895 25.9703Z" />
              <path fill="#0F2E2F" d="M114.433 1.56118H109.482C109.333 1.56118 109.235 1.67666 109.218 1.8252C108.805 8.03065 104.168 10.4897 100.306 10.4897C100.157 10.4897 100.042 10.6053 100.042 10.7538V15.9525C100.042 16.101 100.157 16.2166 100.306 16.2166C103.821 16.1671 108.03 14.5167 109.581 12.4867L108.954 11.8761V53.7464C108.954 53.8949 109.069 54.0104 109.218 54.0104H114.417C114.565 54.0104 114.681 53.8949 114.681 53.7464V1.85824C114.697 1.6767 114.582 1.56118 114.433 1.56118Z" />
              <path fill="#023D3D" d="M119.848 4.56394C120.113 4.49273 120.343 4.27232 120.343 3.90271C120.343 3.48563 120.017 3.19062 119.444 3.19062H118.479V5.68633H118.948V4.7267H119.26C119.569 4.7267 119.681 4.88608 119.766 5.11666C119.841 5.3235 119.899 5.54391 119.98 5.68972H120.459V5.66938C120.371 5.50661 120.316 5.3235 120.245 5.09631C120.16 4.82504 120.079 4.63176 119.848 4.56394ZM119.417 4.35031H118.948V3.57379H119.406C119.732 3.57379 119.878 3.73317 119.878 3.9468C119.878 4.19094 119.708 4.35031 119.417 4.35031Z" />
              <path fill="#023D3D" d="M119.372 1.62059C117.787 1.62059 116.5 2.90574 116.5 4.4893C116.5 6.07285 117.787 7.35801 119.372 7.35801C120.958 7.35801 122.245 6.07285 122.245 4.4893C122.245 2.90574 120.958 1.62059 119.372 1.62059ZM119.372 6.87311C118.055 6.87311 116.982 5.80158 116.982 4.48591C116.982 3.17023 118.055 2.09871 119.372 2.09871C120.69 2.09871 121.763 3.17023 121.763 4.48591C121.763 5.80158 120.69 6.87311 119.372 6.87311Z" />
            </svg>
          </a>

          <ProgramDropdown
            open={dropdownOpen}
            totalSpend={totalSpend}
            currentPoints={currentPoints}
            setTotalSpend={setTotalSpend}
            setCurrentPoints={setCurrentPoints}
            closeAll={closeAll}
            openSub={openSub}
            setOpenSub={setOpenSub}
            activeFeatured={activeFeatured}
            setActiveFeatured={setActiveFeatured}
            activeMembership={activeMembership}
            setActiveMembership={setActiveMembership}
            activeSweepstakes={activeSweepstakes}
            setActiveSweepstakes={setActiveSweepstakes}
            activeHeader={activeHeader}
            setActiveHeader={setActiveHeader}
          />
        </div>

        {/* ── Right: Nav links + Shop All + icons ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {/* AG1 for Daily Health */}
          <a href="#" style={navLink}>
            AG1 for Daily Health
          </a>

          {/* AGZ for Sleep + NEW badge */}
          <a href="#" style={{ ...navLink, display: "inline-flex", alignItems: "center", gap: "8px" }}>
            AGZ for Sleep
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                color: "#ffffff",
                backgroundColor: "#1a1a1a",
                borderRadius: "3px",
                padding: "3px 5px",
                lineHeight: 1,
              }}
            >
              NEW
            </span>
          </a>

          {/* Learn More */}
          <a href="#" style={navLink}>
            Learn More
          </a>

          {/* Shop All — green pill */}
          <a
            href="#"
            onMouseEnter={() => setShopHov(true)}
            onMouseLeave={() => setShopHov(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 600,
              color: "#000000",
              textDecoration: "none",
              backgroundColor: shopHov ? "#3fcb3f" : "#46DE46",
              borderRadius: "999px",
              height: "54px",
              padding: "0 28px",
              lineHeight: "54px",
              whiteSpace: "nowrap" as const,
              transition: "background-color 0.15s ease",
              display: "inline-block",
            }}
          >
            Shop All
          </a>

          {/* Cart icon */}
          <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path d="M0.75 0.75H1.93213C2.15479 0.75 2.26612 0.75 2.35571 0.79072C2.43466 0.8266 2.50157 0.8843 2.54846 0.95695C2.60166 1.03939 2.6174 1.14899 2.64889 1.36818L3.07725 4.35M3.07725 4.35L4.02926 11.3083C4.15007 12.1913 4.21048 12.6328 4.42276 12.9651C4.60981 13.258 4.87798 13.4908 5.19499 13.6356C5.55475 13.8 6.00282 13.8 6.89896 13.8H14.6442C15.4973 13.8 15.9238 13.8 16.2724 13.6474C16.5797 13.5128 16.8433 13.2959 17.0338 13.0208C17.2498 12.7089 17.3296 12.2922 17.4892 11.4589L18.6872 5.20472C18.7433 4.91143 18.7714 4.76478 18.7307 4.65015C18.695 4.54959 18.6245 4.46492 18.5319 4.41122C18.4263 4.35 18.2761 4.35 17.9759 4.35H3.07725ZM7.9903 17.85C7.9903 18.3471 7.58515 18.75 7.0853 18.75C6.58546 18.75 6.18026 18.3471 6.18026 17.85C6.18026 17.3529 6.58546 16.95 7.0853 16.95C7.58515 16.95 7.9903 17.3529 7.9903 17.85ZM15.2307 17.85C15.2307 18.3471 14.8255 18.75 14.3257 18.75C13.8258 18.75 13.4206 18.3471 13.4206 17.85C13.4206 17.3529 13.8258 16.95 14.3257 16.95C14.8255 16.95 15.2307 17.3529 15.2307 17.85Z" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Account icon */}
          <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ── Shared nav link style ── */
const navLink: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "15.1px",
  fontWeight: 400,
  color: "#1a1a1a",
  textDecoration: "none",
  lineHeight: 1,
  whiteSpace: "nowrap",
};
