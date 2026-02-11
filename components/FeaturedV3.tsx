"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "@vectoricons/atlas-icons-react";

const SPEND_CARD_THRESHOLD = 500;
const SPEND_CARD_INDEX = 1;

/* ─── Data ─── */

const tierImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg"];

const baseCards = [
  { title: "Spend $100 this month and redeem a beauty gift set", subtitle: "ready to redeem", button: "REDEEM", likes: "+1.2K", redeemCode: "GLOW2026", scrollTarget: null as string | null, isLink: false },
  { title: "Spend $500 and receive 1,000 points", subtitle: "$450 to go", button: "REDEEM", likes: "+3.5K", redeemCode: null, scrollTarget: null as string | null, isLink: false },
  { title: "Complete face mapping quiz", subtitle: "+100 Points", button: "TAKE THE QUIZ", likes: "+1K", redeemCode: null, scrollTarget: null as string | null, isLink: true },
  { title: "Double Points on all facial oils and serums", subtitle: "9 days remaining", button: "SHOP SERUMS", likes: "+2.2K", redeemCode: null, scrollTarget: null as string | null, isLink: true },
  { title: "Join the Sweepstakes", subtitle: "5 days remaining", button: "ENTER NOW", likes: "+2.7K", redeemCode: null, scrollTarget: "section-sweepstakes", isLink: false },
  { title: "Refer a friend and earn bonus points", subtitle: "+200 points per referral", button: "REFER NOW", likes: "+890", redeemCode: null, scrollTarget: null as string | null, isLink: true },
  { title: "Try the new Ceramide Barrier Cream", subtitle: "limited edition", button: "SHOP NOW", likes: "+3.1K", redeemCode: null, scrollTarget: null as string | null, isLink: true },
  { title: "Share your skincare routine on TikTok", subtitle: "+75 points", button: "SHARE", likes: "+1.8K", redeemCode: null, scrollTarget: null as string | null, isLink: true },
  { title: "Unlock Tier 3 for exclusive early access", subtitle: "450 points to go", button: "VIEW TIERS", likes: "+2.4K", redeemCode: null, scrollTarget: "section-tiers", isLink: false },
];

const communityImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg"];

const communityItems = [
  { type: "review" as const, author: "Sarah M.", text: "The Rosehip Radiance oil completely transformed my skin. After just two weeks, my complexion is glowing!", time: "2h ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Morning routine with our best-selling Vitamin C serum. Tag us in your selfies!", time: "3h ago", stars: undefined as number | undefined, likes: "1.4K", hasImage: true },
  { type: "review" as const, author: "Emily R.", text: "I'm obsessed with the Hydra-Glow moisturizer. Lightweight but so hydrating.", time: "4h ago", stars: 5, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Behind the scenes at our new product photoshoot. Something exciting is coming soon...", time: "5h ago", stars: undefined as number | undefined, likes: "2.1K", hasImage: true },
  { type: "review" as const, author: "Jessica L.", text: "The retinol night cream is gentle but effective. Finally a retinol that doesn't irritate.", time: "6h ago", stars: 4, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Your top 5 favorite products of 2025, as voted by you! Swipe to see the full list.", time: "8h ago", stars: undefined as number | undefined, likes: "3.8K", hasImage: true },
  { type: "review" as const, author: "Amanda K.", text: "Tier 3 member here \u2014 the exclusive early access to new drops is worth it alone!", time: "10h ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Meet our founder\u2019s go-to nighttime skincare stack. Link in bio for the full routine.", time: "12h ago", stars: undefined as number | undefined, likes: "987", hasImage: false },
  { type: "review" as const, author: "Priya D.", text: "The clay mask is incredible for my oily skin. Pores look visibly smaller after every use.", time: "14h ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "NEW DROP: The Ceramide Barrier Cream is here. Clinically tested, dermatologist approved.", time: "16h ago", stars: undefined as number | undefined, likes: "4.2K", hasImage: true },
  { type: "review" as const, author: "Rachel W.", text: "Ordered the starter kit and I\u2019m already hooked. The packaging is also so beautiful.", time: "18h ago", stars: 4, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Self-care Sunday rituals with our calming lavender face mist. What\u2019s in your routine?", time: "1d ago", stars: undefined as number | undefined, likes: "1.9K", hasImage: true },
  { type: "review" as const, author: "Megan T.", text: "Customer service helped me pick the perfect regimen for my combination skin. So helpful!", time: "1d ago", stars: 5, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Glow check! Our community members sharing their 30-day transformation results.", time: "1d ago", stars: undefined as number | undefined, likes: "5.1K", hasImage: true },
  { type: "review" as const, author: "Lauren B.", text: "The SPF 50 daily moisturizer doesn\u2019t leave a white cast at all. My new holy grail.", time: "1d ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Packing orders with love today. Every order ships with a handwritten thank-you note.", time: "2d ago", stars: undefined as number | undefined, likes: "2.7K", hasImage: false },
  { type: "review" as const, author: "Nina C.", text: "Earned enough points for a free full-size serum. The rewards program is genuinely great.", time: "2d ago", stars: 5, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Ingredient spotlight: Why bakuchiol is the gentle alternative to retinol your skin needs.", time: "2d ago", stars: undefined as number | undefined, likes: "1.3K", hasImage: true },
  { type: "review" as const, author: "Olivia H.", text: "The exfoliating toner is so gentle. No stinging, just smooth, bright skin every morning.", time: "2d ago", stars: 4, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "We just hit 500K followers! Thank you for being part of this journey with us.", time: "3d ago", stars: undefined as number | undefined, likes: "8.4K", hasImage: true },
  { type: "review" as const, author: "Danielle F.", text: "Bought the bundle deal during the sale \u2014 amazing value. Everything smells so luxurious.", time: "3d ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Quick tutorial: How to layer your serums for maximum absorption. Save this for later!", time: "3d ago", stars: undefined as number | undefined, likes: "3.3K", hasImage: false },
  { type: "review" as const, author: "Taylor S.", text: "Three months in and my dark spots have faded significantly. Can\u2019t recommend enough.", time: "4d ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Sustainability update: All our packaging is now 100% recyclable. Small steps, big impact.", time: "4d ago", stars: undefined as number | undefined, likes: "2.9K", hasImage: true },
  { type: "review" as const, author: "Aisha J.", text: "The under-eye cream actually works. I look more rested even on my worst sleep days.", time: "5d ago", stars: 4, likes: undefined as string | undefined, hasImage: false },
];

const eventImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg", "/earn1.jpg", "/earn2.jpg", "/earn3.jpg", "/earn5.jpg", "/earn9.jpg", "/earn11.jpg"];

const eventItems = [
  { type: "in-person" as const, title: "Spring Glow Pop-Up Shop", description: "Join us at our exclusive pop-up in SoHo, NYC for live skin consultations, complimentary mini facials, and first access to our spring collection. RSVP for a free welcome gift bag.", date: "Mar 15, 2026", location: "245 Spring St, New York", points: "+50 points for attending" },
  { type: "digital" as const, title: "Masterclass: Building Your Night Routine", description: "Our lead aesthetician breaks down the perfect evening skincare stack. Learn layering techniques, ingredient pairing, and get your questions answered live.", date: "Mar 22, 2026", location: "Zoom \u2014 link sent after RSVP", points: "+25 points" },
  { type: "in-person" as const, title: "VIP Tier 3 Dinner & Preview", description: "An intimate evening for our top-tier members. Preview the summer collection, enjoy a curated dinner, and receive an exclusive gift. Tier 3 members only.", date: "Apr 5, 2026", location: "The Standard, Los Angeles", points: "Tier 3 exclusive" },
  { type: "digital" as const, title: "Live Q&A with Our Founder", description: "Ask anything about our brand journey, ingredient sourcing, or upcoming launches. Candid conversation and surprise giveaways for attendees.", date: "Apr 12, 2026", location: "Instagram Live", points: "+15 points" },
  { type: "in-person" as const, title: "Clean Beauty Workshop", description: "Hands-on workshop where you\u2019ll create your own custom serum blend. Take home your creation plus a full-size product of your choice.", date: "Apr 19, 2026", location: "Goop Lab, Santa Monica", points: "+75 points" },
  { type: "digital" as const, title: "Ingredient Deep-Dive: Retinol vs Bakuchiol", description: "Our dermatologist advisor explains the science behind these powerhouse ingredients. Find out which one is right for your skin type and concerns.", date: "May 3, 2026", location: "YouTube Premiere", points: "+20 points" },
  { type: "in-person" as const, title: "Summer Solstice Wellness Brunch", description: "Celebrate the longest day with a wellness-focused brunch, guided meditation, and exclusive product reveals. Open to all loyalty members.", date: "Jun 21, 2026", location: "The Line Hotel, Austin", points: "+60 points" },
  { type: "digital" as const, title: "Skincare x Fitness: Morning Routines", description: "A joint session with a fitness trainer and our skin experts on how exercise impacts your skin, plus the best pre and post-workout products.", date: "May 17, 2026", location: "Zoom \u2014 free for all members", points: "+20 points" },
  { type: "in-person" as const, title: "Flagship Store Grand Opening \u2014 London", description: "Be the first to experience our new London flagship. Live music, complimentary treatments, and 2x points on all purchases during opening weekend.", date: "Jun 7, 2026", location: "34 King\u2019s Road, London", points: "2x points all weekend" },
  { type: "digital" as const, title: "Community Awards: Vote for Your Favorites", description: "Cast your vote for the 2026 Community Choice Awards. Top voters win a curated gift box. Results announced live with prizes and surprises.", date: "Jul 1, 2026", location: "goopbeauty.com/awards", points: "+30 points for voting" },
];

/* ─── Avatar helpers ─── */

const pastelColors = [
  "#b8d8e8", "#7bb8d0", "#b5e2d5", "#f0c4d0", "#d4b8e8",
  "#f5d6a8", "#a8d8c0", "#c4d4f0", "#e8c8b8", "#b0d4b8",
  "#d0b8e0", "#a8c8e8", "#e0d4a8", "#c0e0d0", "#f0b8c4",
  "#b8c8f0", "#d8e0a8", "#e8b8d0", "#a8e0d8", "#c8b8e8",
];
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 11) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateAvatars(cardIndex: number) {
  const rng = seededRandom(cardIndex * 31 + 7);
  const result: { letter: string; bg: string }[] = [];
  const usedLetters = new Set<string>();
  for (let i = 0; i < 3; i++) {
    let l: string;
    do { l = letters[Math.floor(rng() * letters.length)]; } while (usedLetters.has(l));
    usedLetters.add(l);
    const bg = pastelColors[Math.floor(rng() * pastelColors.length)];
    result.push({ letter: l, bg });
  }
  return result;
}

function SocialDots({ cardIndex }: { cardIndex: number }) {
  const avatars = generateAvatars(cardIndex);
  return (
    <div style={{ display: "flex", marginRight: "8px" }}>
      {avatars.map((a, i) => (
        <div
          key={i}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: a.bg,
            border: "2px solid #ffffff",
            marginLeft: i > 0 ? "-7px" : "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 3 - i,
            boxShadow: i === 0 ? "0 1px 4px rgba(0,0,0,0.25)" : "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "9px",
              fontWeight: 700,
              color: "#1a2a3a",
              lineHeight: 1,
            }}
          >
            {a.letter}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FEATURED TAB — Full-width one-at-a-time showcase
   ═══════════════════════════════════════════════════ */

function ImmersiveShowcase() {
  const [current, setCurrent] = useState(0);
  const [tierAssignments, setTierAssignments] = useState<number[]>([]);
  const hasShuffled = useRef(false);
  const [leftArrowHov, setLeftArrowHov] = useState(false);
  const [rightArrowHov, setRightArrowHov] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  /* Per-card persistent state */
  const [completedSet, setCompletedSet] = useState<Set<number>>(new Set());
  const [animatingIdx, setAnimatingIdx] = useState<number | null>(null);
  const [btnHov, setBtnHov] = useState(false);
  const [copied, setCopied] = useState(false);
  const [spendRemaining, setSpendRemaining] = useState(SPEND_CARD_THRESHOLD - 50);
  const [spendReady, setSpendReady] = useState(false);

  useEffect(() => {
    if (!hasShuffled.current) {
      hasShuffled.current = true;
      const assignments = baseCards.map(() => Math.floor(Math.random() * tierImages.length));
      setTierAssignments(assignments);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const spend = (e as CustomEvent).detail?.spend;
      if (typeof spend === "number") {
        const remaining = Math.max(0, SPEND_CARD_THRESHOLD - spend);
        setSpendRemaining(remaining);
        if (remaining <= 0) setSpendReady(true);
      }
    };
    window.addEventListener("spend-updated", handler);
    return () => window.removeEventListener("spend-updated", handler);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx === current) return;
    setCurrent(idx);
    setBtnHov(false);
    setCopied(false);
  }, [current]);

  const isFirst = current === 0;
  const isLast = current === baseCards.length - 1;

  const goPrev = useCallback(() => {
    if (current === 0) return;
    setDirection("back");
    goTo(current - 1);
  }, [current, goTo]);

  const goNext = useCallback(() => {
    if (current === baseCards.length - 1) return;
    setDirection("forward");
    goTo(current + 1);
  }, [current, goTo]);

  const card = baseCards[current];
  const isCompleted = completedSet.has(current);
  const isAnimating = animatingIdx === current;

  const isSpendCard = current === SPEND_CARD_INDEX;

  const handleAction = () => {
    if (card.scrollTarget) {
      const el = document.getElementById(card.scrollTarget);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 76 - 60;
        window.scrollTo({ top, behavior: "smooth" });
      }
      return;
    }
    if (card.isLink) return;
    if (isSpendCard && !spendReady) return;
    if (isCompleted || isAnimating) return;
    setAnimatingIdx(current);
    const idx = current;
    setTimeout(() => {
      setCompletedSet((prev) => new Set(prev).add(idx));
      setAnimatingIdx(null);
    }, 700);
  };

  const handleCopy = () => {
    if (card.redeemCode) {
      navigator.clipboard.writeText(card.redeemCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      {/* Hero card container */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          width: "100%",
          height: "520px",
          overflow: "hidden",
          backgroundColor: "#1a1a1a",
        }}
      >
        {/* Background image — crossfade */}
        <div
          key={`bg-${current}`}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${tierImages[tierAssignments[current] ?? 0]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: `${direction === "back" ? "featuredSlideInFromLeft" : "featuredSlideIn"} 0.5s ease forwards`,
          }}
        />

        {/* Dark overlay — light tint + bottom gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Inner white stroke */}
        <div style={{ position: "absolute", inset: "10px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)", zIndex: 3, pointerEvents: "none" }} />

        {/* Content at bottom-left */}
        <div
          key={`content-${current}`}
          style={{
            position: "relative",
            zIndex: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "48px 56px",
            animation: `${direction === "back" ? "featuredSlideInFromLeft" : "featuredSlideIn"} 0.5s ease forwards`,
          }}
        >
          {/* Card counter */}
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            {String(current + 1).padStart(2, "0")} / {String(baseCards.length).padStart(2, "0")}
          </span>

          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "36px",
              fontWeight: 400,
              color: "#ffffff",
              margin: "0 0 10px 0",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              maxWidth: "640px",
            }}
          >
            {card.title}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 24px 0",
              lineHeight: 1.4,
            }}
          >
            {isSpendCard ? (spendReady ? "ready to redeem" : `$${spendRemaining} to go`) : card.subtitle}
          </p>

          {/* Action button */}
          {!isCompleted && !isAnimating && (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleAction(); }}
              onMouseEnter={() => setBtnHov(true)}
              onMouseLeave={() => setBtnHov(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                alignSelf: "flex-start",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 600,
                color: isSpendCard && !spendReady ? "rgba(255,255,255,0.4)" : "#000000",
                backgroundColor: isSpendCard && !spendReady
                  ? "rgba(255,255,255,0.2)"
                  : btnHov ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
                height: "38px",
                padding: "0 22px",
                borderRadius: "40px",
                textDecoration: "none",
                lineHeight: 1,
                cursor: isSpendCard && !spendReady ? "default" : "pointer",
                transition: "background-color 0.2s ease, color 0.2s ease",
                marginBottom: "20px",
              }}
            >
              {card.button.toLowerCase()}
            </a>
          )}

          {/* Animating checkmark */}
          {isAnimating && (
            <div style={{ marginBottom: "20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12" cy="12" r="11" fill="#34c759"
                  style={{
                    transformOrigin: "center",
                    transform: "scale(0)",
                    animation: "featuredCircleScale 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                  }}
                />
                <path
                  d="M7.5 12.5L10.5 15.5L16.5 9.5"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 18,
                    strokeDashoffset: 18,
                    animation: "featuredDrawCheck 0.35s ease 0.3s forwards",
                  }}
                />
              </svg>
            </div>
          )}

          {/* Completed static checkmark */}
          {isCompleted && !isAnimating && (
            <div style={{ marginBottom: card.redeemCode ? "12px" : "20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#34c759" />
                <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Redeem code box */}
          {isCompleted && card.redeemCode && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRight: "none",
                    padding: "11px 18px",
                    lineHeight: 1,
                  }}
                >
                  {card.redeemCode}
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCopy(); }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#000000",
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "11px 16px",
                    cursor: "pointer",
                    lineHeight: 1,
                    transition: "background-color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {copied ? "copied!" : "copy"}
                </button>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.55)",
                  margin: "8px 0 0 0",
                  lineHeight: 1.4,
                }}
              >
                copy this code in your cart and redeem a beauty gift set with your next order
              </p>
            </div>
          )}

          {/* Social proof row */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <SocialDots cardIndex={current} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1,
              }}
            >
              {card.likes}
            </span>
          </div>
        </div>

      </div>

      {/* Arrow buttons below card */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
        <button
          onClick={isFirst ? undefined : goPrev}
          onMouseEnter={isFirst ? undefined : () => setLeftArrowHov(true)}
          onMouseLeave={isFirst ? undefined : () => setLeftArrowHov(false)}
          aria-label="Previous"
          aria-disabled={isFirst}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: !isFirst && leftArrowHov ? "1px solid #000000" : "1px solid #d8d5d0",
            cursor: isFirst ? "default" : "pointer",
            opacity: isFirst ? 0.3 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s ease, opacity 0.2s ease",
            padding: 0,
          }}
        >
          <ArrowLeft size={14} color="#000000" />
        </button>
        <button
          onClick={isLast ? undefined : goNext}
          onMouseEnter={isLast ? undefined : () => setRightArrowHov(true)}
          onMouseLeave={isLast ? undefined : () => setRightArrowHov(false)}
          aria-label="Next"
          aria-disabled={isLast}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: !isLast && rightArrowHov ? "1px solid #000000" : "1px solid #d8d5d0",
            cursor: isLast ? "default" : "pointer",
            opacity: isLast ? 0.3 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s ease, opacity 0.2s ease",
            padding: 0,
          }}
        >
          <ArrowRight size={14} color="#000000" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   COMMUNITY TAB — Editorial magazine feed
   ═══════════════════════════════════════════════════ */

/* Featured hero post (full-width with image + overlay) */
function CommunityHero({
  item,
  image,
}: {
  item: (typeof communityItems)[0];
  image: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
        opacity: 0,
        transform: "translateY(16px)",
        animation: "communityFadeIn 0.5s ease forwards",
        cursor: "default",
        marginBottom: "1px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.6s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "40px 44px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: item.type === "instagram" ? "#e1306c" : "rgba(255,255,255,0.8)",
            marginBottom: "8px",
          }}
        >
          {item.type === "instagram" ? "instagram" : "review"}
        </span>
        {item.type === "review" && item.stars && (
          <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ fontSize: "14px", color: i < item.stars! ? "#ffffff" : "rgba(255,255,255,0.3)" }}>{"\u2605"}</span>
            ))}
          </div>
        )}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: 1.4,
            color: "#ffffff",
            margin: "0 0 10px 0",
            maxWidth: "640px",
          }}
        >
          {item.text}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
            {item.type === "review" ? `\u2014 ${item.author}` : `${item.likes} likes`}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
            {item.time}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Small community grid card */
function CommunityGridCard({
  item,
  image,
  index,
}: {
  item: (typeof communityItems)[0];
  image: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isReview = item.type === "review";
  const hasImg = !isReview && item.hasImage;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hasImg ? "#000000" : "#ffffff",
        overflow: "hidden",
        opacity: 0,
        transform: "translateY(16px)",
        animation: `communityFadeIn 0.5s ease ${index * 0.07}s forwards`,
        transition: "box-shadow 0.3s ease",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minHeight: hasImg ? "280px" : "auto",
      }}
    >
      {/* Full background image for instagram cards with images */}
      {hasImg && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <div
        style={{
          padding: isReview ? "28px 24px" : hasImg ? "24px 24px" : "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: 1,
          position: "relative",
          zIndex: 2,
          justifyContent: hasImg ? "flex-end" : "flex-start",
        }}
      >
        {/* Type label + time */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: hasImg ? "rgba(255,255,255,0.8)" : item.type === "instagram" ? "#c13584" : "#888888",
              textTransform: "uppercase",
            }}
          >
            {item.type === "instagram" ? "instagram" : "review"}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: hasImg ? "rgba(255,255,255,0.5)" : "#bbb" }}>
            {item.time}
          </span>
        </div>

        {/* Large quote marks for reviews */}
        {isReview && (
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "48px",
              lineHeight: "0.8",
              color: "#e5e2de",
              userSelect: "none",
            }}
          >
            {"\u201C"}
          </span>
        )}

        {/* Stars for reviews */}
        {isReview && item.stars && (
          <div style={{ display: "flex", gap: "1px", marginTop: "-4px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ fontSize: "11px", color: i < item.stars! ? "#1a1a1a" : "#ddd" }}>{"\u2605"}</span>
            ))}
          </div>
        )}

        {/* Text */}
        <p
          style={{
            fontFamily: isReview ? "var(--font-serif)" : "var(--font-sans)",
            fontSize: isReview ? "15px" : "14px",
            fontWeight: 400,
            lineHeight: 1.55,
            color: hasImg ? "#ffffff" : "#1a1a1a",
            margin: 0,
          }}
        >
          {item.text}
        </p>

        {/* Author / likes */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 500,
            color: hasImg ? "rgba(255,255,255,0.6)" : "#999",
            margin: "auto 0 0 0",
            paddingTop: "8px",
          }}
        >
          {item.type === "review" ? `\u2014 ${item.author}` : `${item.likes} likes`}
        </p>
      </div>
    </div>
  );
}

/* Community feed with hero + 3-col grid, paginated */
function CommunityMagazine() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [shuffled, setShuffled] = useState(communityItems);
  const [shuffledImages, setShuffledImages] = useState(communityImages);
  const hasShuffled = useRef(false);

  useEffect(() => {
    if (!hasShuffled.current) {
      hasShuffled.current = true;
      const indices = communityItems.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffled(indices.map(i => communityItems[i]));
      setShuffledImages([...communityImages].sort(() => 0.5 - Math.random()));
    }
  }, []);

  const shown = shuffled.slice(0, visibleCount);
  const hero = shown[0];
  const gridItems = shown.slice(1);
  const hasMore = visibleCount < shuffled.length;

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      {/* Bordered content area */}
      <div style={{ border: "1px solid #e5e2de" }}>
        {/* Featured hero post at top */}
        {hero && (
          <CommunityHero
            item={hero}
            image={shuffledImages[0 % shuffledImages.length]}
          />
        )}

        {/* 3-column grid below */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "#e5e2de",
          }}
        >
          {gridItems.map((item, i) => (
            <CommunityGridCard
              key={`${item.author}-${item.time}-${i}`}
              item={item}
              image={shuffledImages[(i + 1) % shuffledImages.length]}
              index={i + 1}
            />
          ))}
        </div>
      </div>

      {/* Load more / collapse */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px" }}>
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + 6, shuffled.length))}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "#1a1a1a",
              backgroundColor: "transparent",
              border: "1px solid #1a1a1a",
              padding: "10px 28px",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "background-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a1a1a"; }}
          >
            show more
          </button>
        )}
        {visibleCount > 4 && (
          <button
            onClick={() => setVisibleCount(4)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "#888",
              backgroundColor: "transparent",
              border: "1px solid #d5d5d5",
              padding: "10px 28px",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a1a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#d5d5d5"; }}
          >
            collapse
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   EVENTS TAB — Calendar-style 2-column grid
   ═══════════════════════════════════════════════════ */

function EventCalendarCard({
  event,
  image,
  index,
}: {
  event: (typeof eventItems)[0];
  image: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  /* Parse date parts for the badge */
  const dateParts = event.date.split(" ");
  const monthAbbr = dateParts[0];
  const dayNum = dateParts[1]?.replace(",", "") || "";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e2de",
        overflow: "hidden",
        opacity: 0,
        transform: "translateY(12px)",
        animation: `communityFadeIn 0.4s ease ${index * 0.06}s forwards`,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image with date badge */}
      <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
        <img
          src={image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        {/* Dark date badge at top-left */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            backgroundColor: "rgba(0,0,0,0.82)",
            padding: "8px 14px",
            paddingBottom: "6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#ffffff",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {monthAbbr}
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            {dayNum}
          </span>
        </div>

        {/* Reward pill at top-right */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: "40px",
            padding: "6px 14px",
            fontSize: "11px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {event.points}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "24px 24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: 1,
        }}
      >
        {/* Event type badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              lineHeight: 1,
              padding: "5px 10px",
              borderRadius: "3px",
              flexShrink: 0,
              backgroundColor: event.type === "in-person" ? "#000000" : "#f5ece3",
              color: event.type === "in-person" ? "#ffffff" : "#8b6e5a",
            }}
          >
            {event.type === "in-person" ? "in-person" : "digital"}
          </span>
        </div>

        {/* Title */}
        <h4
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#1a1a1a",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {event.title}
        </h4>

        {/* Location */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 500,
            color: "#999",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {event.location}
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.55,
            color: "#777",
            margin: "4px 0 0 0",
          }}
        >
          {event.description}
        </p>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: "12px",
          }}
        >
          {/* Read more pill button */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            onMouseEnter={() => setBtnHov(true)}
            onMouseLeave={() => setBtnHov(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: btnHov ? "#333333" : "#000000",
              padding: "0 22px",
              height: "38px",
              borderRadius: "40px",
              textDecoration: "none",
              lineHeight: "38px",
              transition: "background-color 0.2s ease",
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            read more
          </a>
        </div>
      </div>
    </div>
  );
}

/* Events feed — 2-column paginated grid */
function EventsCalendar() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [shuffledImages, setShuffledImages] = useState(eventImages);
  const hasShuffled = useRef(false);

  useEffect(() => {
    if (!hasShuffled.current) {
      hasShuffled.current = true;
      setShuffledImages([...eventImages].sort(() => 0.5 - Math.random()));
    }
  }, []);

  const shown = eventItems.slice(0, visibleCount);
  const hasMore = visibleCount < eventItems.length;

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      {/* 2-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {shown.map((event, i) => (
          <EventCalendarCard
            key={`${event.title}-${i}`}
            event={event}
            image={shuffledImages[i % shuffledImages.length]}
            index={i}
          />
        ))}
      </div>

      {/* Load more / collapse */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px" }}>
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + 4, eventItems.length))}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "#1a1a1a",
              backgroundColor: "transparent",
              border: "1px solid #1a1a1a",
              padding: "10px 28px",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "background-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a1a1a"; }}
          >
            show more
          </button>
        )}
        {visibleCount > 4 && (
          <button
            onClick={() => setVisibleCount(4)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "#888",
              backgroundColor: "transparent",
              border: "1px solid #d5d5d5",
              padding: "10px 28px",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a1a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#d5d5d5"; }}
          >
            collapse
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */

export default function FeaturedV3() {
  const [activeTab, setActiveTab] = useState<"featured" | "community" | "events">("featured");
  const [showDot, setShowDot] = useState(true);
  const [showEventsDot, setShowEventsDot] = useState(true);
  const [featuredHovered, setFeaturedHovered] = useState(false);
  const [communityHovered, setCommunityHovered] = useState(false);
  const [eventsHovered, setEventsHovered] = useState(false);

  return (
    <section
      id="section-featured"
      style={{
        backgroundColor: "#ffffff",
        padding: "48px 48px 40px",
      }}
    >
      {/* Tab pills */}
      <div style={{ maxWidth: "1280px", margin: "0 auto 24px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Featured tab */}
          <button
            onClick={() => setActiveTab("featured")}
            onMouseEnter={() => setFeaturedHovered(true)}
            onMouseLeave={() => setFeaturedHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "40px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "featured" ? "#000000" : "transparent",
              color: activeTab === "featured" ? "#ffffff" : "#000000",
              border: activeTab === "featured" ? "1px solid #000000" : featuredHovered ? "1px solid #000000" : "1px solid #d5d5d5",
            }}
          >
            featured
          </button>

          {/* Community tab */}
          <button
            onClick={() => { setActiveTab("community"); setShowDot(false); }}
            onMouseEnter={() => setCommunityHovered(true)}
            onMouseLeave={() => setCommunityHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "40px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "community" ? "#000000" : "transparent",
              color: activeTab === "community" ? "#ffffff" : "#000000",
              border: activeTab === "community" ? "1px solid #000000" : communityHovered ? "1px solid #000000" : "1px solid #d5d5d5",
            }}
          >
            community
            {showDot && (
              <div style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: activeTab === "community" ? "#ffffff" : "#e53935", marginLeft: "6px", flexShrink: 0 }} />
            )}
          </button>

          {/* Events tab */}
          <button
            onClick={() => { setActiveTab("events"); setShowEventsDot(false); }}
            onMouseEnter={() => setEventsHovered(true)}
            onMouseLeave={() => setEventsHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "0 22px",
              height: "38px",
              borderRadius: "40px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "events" ? "#000000" : "transparent",
              color: activeTab === "events" ? "#ffffff" : "#000000",
              border: activeTab === "events" ? "1px solid #000000" : eventsHovered ? "1px solid #000000" : "1px solid #d5d5d5",
            }}
          >
            events
            {showEventsDot && (
              <div style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: activeTab === "events" ? "#ffffff" : "#2196f3", marginLeft: "6px", flexShrink: 0 }} />
            )}
          </button>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "featured" && <ImmersiveShowcase />}
      {activeTab === "community" && <CommunityMagazine />}
      {activeTab === "events" && <EventsCalendar />}

      {/* CSS Animations */}
      <style>{`
        @keyframes communityFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes featuredCircleScale {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes featuredDrawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes featuredSlideIn {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes featuredSlideInFromLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
