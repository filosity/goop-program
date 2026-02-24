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
        fontSize: "16px",
        fontWeight: 600,
        color: "#ffffff",
        backgroundColor: hovered ? "#1a4a4b" : "#0f2e2f",
        minHeight: "52px",
        padding: "12px 36px",
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "999px",
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
        backgroundColor: "#f0f5f5",
        padding: "28px 48px",
        display: "flex",
        gap: "12px",
        justifyContent: "center",
      }}
    >
      <PillButton label="Shop Now →" />
      <PillButton label="Rewards History →" />
    </div>
  );
}
