"use client";

import { useState } from "react";

const tabs = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    id: "earn",
    label: "Earn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    id: "redeem",
    label: "Redeem",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M20 12v10H4V12" />
        <rect x="2" y="7" width="20" height="5" rx="1" />
        <path d="M12 22V7" />
        <path d="M12 7c-1.5-2-4-3-4-3s1.5-2 4 0c2.5-2 4 0 4 0s-2.5 1-4 3z" />
      </svg>
    ),
  },
  {
    id: "referrals",
    label: "Referrals",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
] as const;

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav
      className={[
        // Mobile: fixed bottom bar (hidden on desktop — TopNav handles that)
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "bg-white border-t border-cream-200 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]",
        // Safe area padding for notched phones
        "pb-[env(safe-area-inset-bottom)]",
      ].join(" ")}
    >
      <ul className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <li key={tab.id} className="flex-1">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "flex flex-col items-center justify-center w-full gap-0.5 py-2 px-1",
                  "transition-colors duration-200 ease-in-out",
                  isActive
                    ? "text-burgundy-800"
                    : "text-cream-600 hover:text-cream-800",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.icon}
                <span className="text-[10px] font-medium leading-tight">
                  {tab.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
