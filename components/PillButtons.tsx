"use client";

import { useState } from "react";

function PillButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "13px",
        fontWeight: 600,
        color: "#ffffff",
        backgroundColor: hovered ? "#333333" : "#000000",
        padding: "12px 28px",
        borderRadius: "40px",
        textDecoration: "none",
        lineHeight: 1,
        transition: "background-color 0.2s ease",
      }}
    >
      {label}
    </a>
  );
}

export default function PillButtons() {
  return (
    <div
      style={{
        backgroundColor: "#f5f3f0",
        padding: "28px 48px",
        display: "flex",
        gap: "12px",
        justifyContent: "center",
      }}
    >
      <PillButton label="shop now" />
      <PillButton label="rewards history" />
    </div>
  );
}
