"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const partners = [
  {
    name: "Clarins",
    offer: "20% off sitewide + Free Shipping",
    image: "/partner-clarins.jpg",
  },
  {
    name: "Kenneth Cole",
    offer: "Free Shipping with Orders Over $50",
    image: "/partner-kennethcole.jpg",
  },
  {
    name: "Spa of Wonders",
    offer: "20% off entry",
    image: "/partner-spa.jpg",
  },
  {
    name: "Walgreens",
    offer: "Extra 30% off $30+",
    image: "/partner-walgreens.jpg",
  },
  {
    name: "Jamba",
    offer: "Spend $12 or more and get a free loyalty loaded bowl",
    image: "/partner-jamba.jpg",
  },
  {
    name: "Crunch Fitness",
    offer: "$1 off Peak Results personal training enrollment fee",
    image: "/partner-crunch.jpg",
  },
  {
    name: "Orangetheory",
    offer: "Sign up for a Premier or Elite membership, get $10 off a month",
    image: "/partner-orangetheory.jpg",
  },
  {
    name: "Disney Cruise Line",
    offer: "Receive a $75 vacation package credit with your booking",
    image: "/partner-disney.jpg",
  },
];

/* ═══════════════════════════════════════════
   Shared section wrapper
   ═══════════════════════════════════════════ */
function SectionWrapper({
  children,
  isMobile,
  bg = "#ffffff",
  padding,
}: {
  children: React.ReactNode;
  isMobile: boolean;
  bg?: string;
  padding?: string;
}) {
  return (
    <section
      id="section-partners"
      style={{
        backgroundColor: bg,
        padding: padding ?? (isMobile ? "0px 16px 60px" : "0px 48px 100px"),
      }}
    >
      {children}
    </section>
  );
}

function SectionHeading({ isMobile, color = "#000000" }: { isMobile: boolean; color?: string }) {
  return (
    <div
      style={{
        maxWidth: "1280px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: isMobile ? "36px" : "56px",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: isMobile ? "32px" : "44px",
          fontWeight: 400,
          lineHeight: 1.1,
          color,
          textAlign: "left",
          margin: "0 0 12px 0",
          letterSpacing: "-0.01em",
        }}
      >
        Partners
      </h2>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: 1.55,
          color: color === "#ffffff" ? "rgba(255,255,255,0.6)" : "#666666",
          margin: 0,
          maxWidth: "520px",
        }}
      >
        As an AG1 subscriber, you get exclusive access to curated offers and
        savings from brands we trust.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   V1 — Classic grid cards (reference-faithful)
   ═══════════════════════════════════════════ */
function V1Card({ partner, isMobile }: { partner: (typeof partners)[0]; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setBtnHovered(false); }}
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          height: isMobile ? "120px" : "160px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={partner.image}
          alt={partner.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: isMobile ? "16px 14px 18px" : "20px 20px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: isMobile ? "14px" : "18px",
          borderLeft: "1px solid #eaeaea",
          borderRight: "1px solid #eaeaea",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "#444444", margin: 0, lineHeight: 1.5 }}>
          {partner.offer}
        </p>
        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 400,
            color: btnHovered ? "#ffffff" : "#0C3D3D",
            backgroundColor: btnHovered ? "#0C3D3D" : "transparent",
            border: "1.5px solid #0C3D3D",
            borderRadius: "999px",
            padding: "8px 18px",
            cursor: "pointer",
            transition: "background-color 0.2s ease, color 0.2s ease",
            alignSelf: "flex-start",
            whiteSpace: "nowrap",
          }}
        >
          Unlock offer
        </button>
      </div>
    </div>
  );
}

function PartnersV1({ isMobile }: { isMobile: boolean }) {
  return (
    <SectionWrapper isMobile={isMobile}>
      <SectionHeading isMobile={isMobile} />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "14px" : "20px", maxWidth: "1280px", margin: "0 auto" }}>
        {partners.map((p) => <V1Card key={p.name} partner={p} isMobile={isMobile} />)}
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   V2 — Full-bleed image cards with overlay text
   ═══════════════════════════════════════════ */
function V2Card({ partner, isMobile }: { partner: (typeof partners)[0]; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: isMobile ? "200px" : "280px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <img
        src={partner.image}
        alt={partner.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.4s ease",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "16px" : "24px",
        }}
      >
        <p style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? "12px" : "13px", fontWeight: 400, color: "rgba(255,255,255,0.75)", margin: "0 0 6px 0", lineHeight: 1.4 }}>
          {partner.offer}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? "14px" : "16px", fontWeight: 600, color: "#ffffff" }}>
            {partner.name}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: "999px",
              padding: "6px 14px",
              lineHeight: 1,
              opacity: hovered ? 1 : 0.8,
              transition: "opacity 0.2s ease",
            }}
          >
            Unlock
          </span>
        </div>
      </div>
    </div>
  );
}

function PartnersV2({ isMobile }: { isMobile: boolean }) {
  return (
    <SectionWrapper isMobile={isMobile}>
      <SectionHeading isMobile={isMobile} />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "8px" : "12px", maxWidth: "1280px", margin: "0 auto" }}>
        {partners.map((p) => <V2Card key={p.name} partner={p} isMobile={isMobile} />)}
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   V3 — Horizontal list rows (editorial style)
   ═══════════════════════════════════════════ */
function V3Row({ partner, isMobile, isLast }: { partner: (typeof partners)[0]; isMobile: boolean; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? "16px" : "28px",
        padding: isMobile ? "16px 0" : "24px 0",
        borderBottom: isLast ? "none" : "1px solid #e5e5e5",
        cursor: "pointer",
        opacity: hovered ? 1 : 0.85,
        transition: "opacity 0.2s ease",
      }}
    >
      <div style={{ width: isMobile ? "64px" : "80px", height: isMobile ? "64px" : "80px", flexShrink: 0, overflow: "hidden" }}>
        <img src={partner.image} alt={partner.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? "15px" : "16px", fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px 0", lineHeight: 1.2 }}>
          {partner.name}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "#666666", margin: 0, lineHeight: 1.4 }}>
          {partner.offer}
        </p>
      </div>
      <button
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          fontWeight: 400,
          color: hovered ? "#ffffff" : "#0C3D3D",
          backgroundColor: hovered ? "#0C3D3D" : "transparent",
          border: "1.5px solid #0C3D3D",
          borderRadius: "999px",
          padding: "8px 18px",
          cursor: "pointer",
          transition: "background-color 0.2s ease, color 0.2s ease",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Unlock offer
      </button>
    </div>
  );
}

function PartnersV3({ isMobile }: { isMobile: boolean }) {
  return (
    <SectionWrapper isMobile={isMobile}>
      <SectionHeading isMobile={isMobile} />
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {partners.map((p, i) => <V3Row key={p.name} partner={p} isMobile={isMobile} isLast={i === partners.length - 1} />)}
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   V4 — Dark theme with frosted cards
   ═══════════════════════════════════════════ */
function V4Card({ partner, isMobile }: { partner: (typeof partners)[0]; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setBtnHovered(false); }}
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "background-color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div style={{ height: isMobile ? "120px" : "160px", overflow: "hidden", position: "relative" }}>
        <img
          src={partner.image}
          alt={partner.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>
      <div
        style={{
          padding: isMobile ? "16px 14px 18px" : "20px 20px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: isMobile ? "14px" : "18px",
        }}
      >
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.5 }}>
          {partner.offer}
        </p>
        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 400,
            color: btnHovered ? "#0C3D3D" : "#ffffff",
            backgroundColor: btnHovered ? "#ffffff" : "transparent",
            border: "1.5px solid rgba(255,255,255,0.4)",
            borderRadius: "999px",
            padding: "8px 18px",
            cursor: "pointer",
            transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            alignSelf: "flex-start",
            whiteSpace: "nowrap",
          }}
        >
          Unlock offer
        </button>
      </div>
    </div>
  );
}

function PartnersV4({ isMobile }: { isMobile: boolean }) {
  return (
    <SectionWrapper isMobile={isMobile} bg="#0C3D3D" padding={isMobile ? "60px 16px" : "100px 48px"}>
      <SectionHeading isMobile={isMobile} color="#ffffff" />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "12px" : "16px", maxWidth: "1280px", margin: "0 auto" }}>
        {partners.map((p) => <V4Card key={p.name} partner={p} isMobile={isMobile} />)}
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   V5 — Carousel-style horizontal scroll with large cards
   ═══════════════════════════════════════════ */
function V5Card({ partner, isMobile }: { partner: (typeof partners)[0]; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: isMobile ? "260px" : "300px",
        flexShrink: 0,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid #eaeaea",
        transition: "box-shadow 0.25s ease",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.10)" : "none",
      }}
    >
      <div style={{ height: isMobile ? "140px" : "180px", overflow: "hidden", position: "relative" }}>
        <img
          src={partner.image}
          alt={partner.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>
      <div style={{ padding: "20px", backgroundColor: "#ffffff", flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 600, color: "#1a1a1a", margin: 0, lineHeight: 1.2 }}>
          {partner.name}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "#666666", margin: 0, lineHeight: 1.5, flex: 1 }}>
          {partner.offer}
        </p>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 400,
            color: "#0C3D3D",
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Unlock offer
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#0C3D3D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function PartnersV5({ isMobile }: { isMobile: boolean }) {
  return (
    <SectionWrapper isMobile={isMobile}>
      <SectionHeading isMobile={isMobile} />
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          overflowX: "auto",
          display: "flex",
          gap: isMobile ? "14px" : "20px",
          paddingBottom: "8px",
          scrollbarWidth: "none",
        }}
      >
        {partners.map((p) => <V5Card key={p.name} partner={p} isMobile={isMobile} />)}
      </div>
      <style>{`#section-partners div::-webkit-scrollbar { display: none; }`}</style>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   V6 — Beige bg, equal 4-col grid, no hover animations
   ═══════════════════════════════════════════ */
function V6Card({ partner, isMobile, isSubscribed }: { partner: (typeof partners)[0]; isMobile: boolean; isSubscribed: boolean }) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ height: isMobile ? "120px" : "160px", overflow: "hidden" }}>
        <img
          src={partner.image}
          alt={partner.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div style={{ padding: isMobile ? "16px 14px 18px" : "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: isMobile ? "14px" : "16px" }}>
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, color: "#1a1a1a", margin: "0 0 6px 0", lineHeight: 1.2 }}>
            {partner.name}
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "#666666", margin: 0, lineHeight: 1.5 }}>
            {partner.offer}
          </p>
        </div>
        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 400,
            color: btnHovered ? "#ffffff" : "#0C3D3D",
            backgroundColor: btnHovered ? "#0C3D3D" : "transparent",
            border: "1.5px solid #0C3D3D",
            borderRadius: "999px",
            padding: "8px 18px",
            cursor: "pointer",
            transition: "background-color 0.2s ease, color 0.2s ease",
            alignSelf: "flex-start",
            whiteSpace: "nowrap",
          }}
        >
          Unlock offer
        </button>
      </div>
    </div>
  );
}

function PartnersV6({ isMobile, isSubscribed }: { isMobile: boolean; isSubscribed: boolean }) {
  return (
    <SectionWrapper isMobile={isMobile} bg="#F6F5F1" padding={isMobile ? "40px 16px" : "60px 48px"}>
      <SectionHeading isMobile={isMobile} />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "14px" : "20px", maxWidth: "1280px", margin: "0 auto" }}>
        {partners.map((p) => <V6Card key={p.name} partner={p} isMobile={isMobile} isSubscribed={isSubscribed} />)}
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   Root component with version switching
   ═══════════════════════════════════════════ */
export default function Partners() {
  const isMobile = useIsMobile();
  const [version, setVersion] = useState(6);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const v = (e as CustomEvent).detail?.version;
      if (typeof v === "number" && v >= 1 && v <= 6) setVersion(v);
    };
    const subHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.subscribed !== undefined) setIsSubscribed(detail.subscribed);
    };
    window.addEventListener("partners-version", handler);
    window.addEventListener("subscription-updated", subHandler);
    return () => {
      window.removeEventListener("partners-version", handler);
      window.removeEventListener("subscription-updated", subHandler);
    };
  }, []);

  switch (version) {
    case 2: return <PartnersV2 isMobile={isMobile} />;
    case 3: return <PartnersV3 isMobile={isMobile} />;
    case 4: return <PartnersV4 isMobile={isMobile} />;
    case 5: return <PartnersV5 isMobile={isMobile} />;
    case 6: return <PartnersV6 isMobile={isMobile} isSubscribed={isSubscribed} />;
    default: return <PartnersV1 isMobile={isMobile} />;
  }
}
