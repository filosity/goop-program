"use client";

import { useState } from "react";

interface StoryItem {
  id: string;
  emoji: string;
  label: string;
  description: string;
  points: number;
  cta: string;
  detail: {
    title: string;
    description: string;
    cta: string;
  };
}

const stories: StoryItem[] = [
  {
    id: "new-challenge",
    emoji: "\u{1F3AF}",
    label: "Weekly Challenge",
    description: "Complete your skincare routine for 7 days straight",
    points: 200,
    cta: "Start Challenge",
    detail: {
      title: "Weekly Skincare Challenge",
      description: "Complete your morning and evening skincare routine for 7 days straight. Log each session in the app to earn bonus points and unlock an exclusive badge.",
      cta: "Start Challenge",
    },
  },
  {
    id: "2x-points",
    emoji: "\u2728",
    label: "2x Points",
    description: "Earn double points on every purchase this weekend",
    points: 0,
    cta: "Shop Now",
    detail: {
      title: "Double Points Weekend",
      description: "Earn 2x points on every purchase this weekend only. Stock up on your favorite serums, moisturizers, and masks while the bonus lasts.",
      cta: "Shop Now",
    },
  },
  {
    id: "free-sample",
    emoji: "\u{1F381}",
    label: "Free Sample",
    description: "Claim a free deluxe sample of our vitamin C serum",
    points: 0,
    cta: "Claim Now",
    detail: {
      title: "Complimentary Deluxe Sample",
      description: "You have earned a free deluxe sample of our bestselling vitamin C serum. Add it to your next order at checkout — no minimum spend required.",
      cta: "Claim Sample",
    },
  },
  {
    id: "refer-earn",
    emoji: "\u{1F48C}",
    label: "Refer & Earn",
    description: "Invite a friend and you both get bonus points",
    points: 500,
    cta: "Invite Friends",
    detail: {
      title: "Share the Glow",
      description: "Invite a friend and you both get 500 bonus points when they make their first purchase. Share your unique referral link to get started.",
      cta: "Invite Friends",
    },
  },
  {
    id: "flash-sale",
    emoji: "\u26A1",
    label: "Flash Sale",
    description: "30% off all sheet masks — ends tonight!",
    points: 0,
    cta: "View Deals",
    detail: {
      title: "Flash Sale — 4 Hours Left",
      description: "Get 30% off all sheet masks and overnight treatments. Use your loyalty points for an extra discount at checkout. Hurry, this deal ends tonight!",
      cta: "View Deals",
    },
  },
  {
    id: "birthday-gift",
    emoji: "\u{1F382}",
    label: "Birthday Gift",
    description: "A curated gift set worth $25 is waiting for you",
    points: 100,
    cta: "Unwrap Gift",
    detail: {
      title: "Happy Birthday to You!",
      description: "Celebrate your special day with a curated birthday gift set worth $25. Redeem it in-store or online anytime this month.",
      cta: "Unwrap Gift",
    },
  },
];

export default function StoriesBar() {
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  return (
    <>
      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-5">
        Things you can do today to earn points
      </h2>

      {/* Swipeable cards */}
      <div
        className="scroll-snap-x flex gap-4 pb-2"
      >
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="snap-card w-[85vw] md:w-[calc(25%-12px)] bg-white rounded-2xl shadow-md p-5 text-left hover-lift cursor-pointer"
          >
            <span className="text-4xl block mb-3">{story.emoji}</span>
            <h3 className="text-base font-semibold text-foreground leading-tight">
              {story.label}
            </h3>
            <p className="text-sm text-cream-700 mt-1.5 line-clamp-2">
              {story.description}
            </p>
            {story.points > 0 && (
              <span className="inline-block mt-3 bg-gold-100 text-gold-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                +{story.points} pts
              </span>
            )}
            <span className="block mt-3 text-sm font-semibold text-burgundy-600">
              {story.cta} &rarr;
            </span>
          </button>
        ))}
      </div>

      {/* Modal overlay */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fadeIn_200ms_ease-out]"
          onClick={() => setActiveStory(null)}
        >
          <div className="absolute inset-0 bg-burgundy-950/60" />

          <div
            className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-cream-50 shadow-2xl animate-[slideUp_250ms_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveStory(null)}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-burgundy-950/30 text-cream-50 transition-colors hover:bg-burgundy-950/50"
              aria-label="Close story"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-burgundy-100 via-cream-200 to-gold-100">
              <span className="text-6xl">{activeStory.emoji}</span>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-burgundy-800">
                {activeStory.detail.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-800">
                {activeStory.detail.description}
              </p>
              {activeStory.points > 0 && (
                <span className="inline-block mt-3 bg-gold-100 text-gold-700 text-sm font-semibold px-3 py-1 rounded-full">
                  +{activeStory.points} pts
                </span>
              )}
              <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-burgundy-600 to-burgundy-500 px-4 py-3 text-sm font-semibold text-cream-50 transition-opacity hover:opacity-90 active:opacity-80">
                {activeStory.detail.cta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
