"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SPEND_CARD_THRESHOLD = 500;

/* ─── Data ─── */
const allImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg"];

const baseCards = [
  { title: "Spend $100 this month and redeem a beauty gift set", subtitle: "ready to redeem", button: "REDEEM", likes: "+1.2K", redeemCode: "GLOW2026" as string | null, scrollTarget: null as string | null, isLink: false },
  { title: "Spend $500 and receive 1,000 points", subtitle: "$450 to go", button: "REDEEM", likes: "+3.5K", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: false },
  { title: "Complete face mapping quiz", subtitle: "+100 Points", button: "TAKE THE QUIZ", likes: "+1K", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
  { title: "Double Points on all facial oils and serums", subtitle: "9 days remaining", button: "SHOP SERUMS", likes: "+2.2K", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
  { title: "Join the Sweepstakes", subtitle: "5 days remaining", button: "ENTER NOW", likes: "+2.7K", redeemCode: null as string | null, scrollTarget: "section-sweepstakes", isLink: false },
  { title: "Refer a friend and earn bonus points", subtitle: "+200 points per referral", button: "REFER NOW", likes: "+890", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
  { title: "Try the new Ceramide Barrier Cream", subtitle: "limited edition", button: "SHOP NOW", likes: "+3.1K", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
  { title: "Share your skincare routine on TikTok", subtitle: "+75 points", button: "SHARE", likes: "+1.8K", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
  { title: "Unlock Tier 3 for exclusive early access", subtitle: "450 points to go", button: "VIEW TIERS", likes: "+2.4K", redeemCode: null as string | null, scrollTarget: "section-tiers", isLink: false },
];

const communityImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg"];

const communityItems = [
  { type: "review" as const, author: "Sarah M.", text: "The Rosehip Radiance oil completely transformed my skin. After just two weeks, my complexion is glowing!", time: "2h ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Morning routine with our best-selling Vitamin C serum. Tag us in your selfies!", time: "3h ago", stars: undefined as number | undefined, likes: "1.4K", hasImage: true },
  { type: "review" as const, author: "Emily R.", text: "I\u2019m obsessed with the Hydra-Glow moisturizer. Lightweight but so hydrating.", time: "4h ago", stars: 5, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Behind the scenes at our new product photoshoot. Something exciting is coming soon...", time: "5h ago", stars: undefined as number | undefined, likes: "2.1K", hasImage: true },
  { type: "review" as const, author: "Jessica L.", text: "The retinol night cream is gentle but effective. Finally a retinol that doesn\u2019t irritate.", time: "6h ago", stars: 4, likes: undefined as string | undefined, hasImage: false },
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
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, color: "#1a2a3a", lineHeight: 1 }}>
            {a.letter}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Masonry Grid Card (Featured tab) ─── */
function GridCard({
  card,
  image,
  cardIndex,
  isSpendCard,
}: {
  card: (typeof baseCards)[0];
  image: string;
  cardIndex: number;
  isSpendCard?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [spendRemaining, setSpendRemaining] = useState(SPEND_CARD_THRESHOLD - 50);
  const [spendReady, setSpendReady] = useState(false);

  useEffect(() => {
    if (!isSpendCard) return;
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
  }, [isSpendCard]);

  const handleClick = () => {
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
    if (completed || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCompleted(true);
      setAnimating(false);
    }, 700);
  };

  const handleCopy = () => {
    if (card.redeemCode) {
      navigator.clipboard.writeText(card.redeemCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const overlayOpacity = completed
    ? hovered ? 0.65 : 0.8
    : hovered ? 0.55 : 0.35;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: "240px",
        overflow: "hidden",
        cursor: "default",
        border: "1px solid #e5e2de",
        borderRadius: "0px",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.10)" : "none",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        opacity: 0,
        animation: `communityFadeIn 0.5s ease ${cardIndex * 0.07}s forwards`,
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.6s ease",
        }}
      />

      {/* Dark overlay — lighter for editorial feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
          transition: "background-color 0.4s ease",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px 28px 24px",
        }}
      >
        {/* Top — title & subtitle */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              fontWeight: 400,
              color: "#ffffff",
              margin: "0 0 10px 0",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            {card.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.75)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {isSpendCard ? (spendReady ? "ready to redeem" : `$${spendRemaining} to go`) : card.subtitle}
          </p>
        </div>

        {/* Bottom */}
        <div>
          {/* Button — white pill */}
          {!completed && !animating && (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleClick(); }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 600,
                color: isSpendCard && !spendReady ? "rgba(255,255,255,0.4)" : "#000000",
                backgroundColor: isSpendCard && !spendReady
                  ? "rgba(255,255,255,0.2)"
                  : btnHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
                height: "38px",
                padding: "0 22px",
                borderRadius: "40px",
                textDecoration: "none",
                lineHeight: 1,
                marginBottom: "16px",
                cursor: isSpendCard && !spendReady ? "default" : "pointer",
                transition: "background-color 0.2s ease, color 0.2s ease",
              }}
            >
              {card.button.toLowerCase()}
            </a>
          )}

          {/* Animating checkmark */}
          {animating && (
            <div style={{ marginBottom: "16px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
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

          {/* Completed checkmark (static) */}
          {completed && !animating && (
            <div style={{ marginBottom: card.redeemCode ? "10px" : "16px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#34c759" />
                <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Redeem code box — only after pressing redeem */}
          {completed && card.redeemCode && (
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRight: "none",
                    padding: "10px 16px",
                    lineHeight: 1,
                  }}
                >
                  {card.redeemCode}
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCopy(); }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#000000",
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "10px 14px",
                    cursor: "pointer",
                    lineHeight: 1,
                    transition: "background-color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {copied ? "copied!" : "copy"}
                </button>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.6)", margin: "8px 0 0 0", lineHeight: 1.4 }}>
                copy this code in your cart and redeem a beauty gift set with your next order
              </p>
            </div>
          )}

          {/* Social proof row */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <SocialDots cardIndex={cardIndex} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1 }}>
              {card.likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Featured Masonry Grid ─── */
function FeaturedGrid() {
  const [images, setImages] = useState(allImages);
  const hasShuffled = useRef(false);

  useEffect(() => {
    if (!hasShuffled.current) {
      hasShuffled.current = true;
      setImages([...allImages].sort(() => 0.5 - Math.random()));
    }
  }, []);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        {baseCards.map((card, i) => (
          <GridCard
            key={i}
            card={card}
            image={images[i % images.length]}
            cardIndex={i}
            isSpendCard={i === 1}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Community card (2-column grid) ─── */
function CommunityCardV2({
  item,
  image,
  index,
}: {
  item: (typeof communityItems)[0];
  image: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const isInstagram = item.type === "instagram";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "0px",
        border: "1px solid #e5e2de",
        overflow: "hidden",
        opacity: 0,
        transform: hovered ? "translateY(-3px)" : "translateY(12px)",
        animation: `communityFadeIn 0.4s ease ${index * 0.06}s forwards`,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.08)" : "none",
        display: "flex",
        flexDirection: "column",
        borderLeft: isInstagram ? "3px solid #f0c4d0" : "1px solid #e5e2de",
      }}
    >
      {item.hasImage && (
        <div style={{ width: "100%", height: "160px", overflow: "hidden", flexShrink: 0 }}>
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
        </div>
      )}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        {/* Top row: type label + time */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: isInstagram ? "#c13584" : "#1a1a1a",
                textTransform: "uppercase",
              }}
            >
              {isInstagram ? "instagram" : "review"}
            </span>
            {/* Stars inline with author for reviews */}
            {item.type === "review" && item.stars && (
              <div style={{ display: "flex", gap: "1px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ fontSize: "11px", color: i < item.stars! ? "#1a1a1a" : "#ddd" }}>{"\u2605"}</span>
                ))}
              </div>
            )}
          </div>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#bbb", display: "flex", alignItems: "center", gap: "6px" }}>
            {item.time}
            {index === 0 && <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#e53935", flexShrink: 0 }} />}
          </span>
        </div>

        {/* Text */}
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "15px", fontWeight: 400, lineHeight: 1.5, color: "#1a1a1a", margin: 0, flex: 1 }}>
          {item.text}
        </p>

        {/* Author / likes */}
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 500, color: "#999", margin: 0 }}>
          {item.type === "review" ? `\u2014 ${item.author}` : `${item.likes} likes`}
        </p>
      </div>
    </div>
  );
}

/* ─── Community feed (2-column cards, paginated) ─── */
function CommunityFeedV2() {
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
  const hasMore = visibleCount < shuffled.length;

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        {shown.map((item, i) => (
          <CommunityCardV2
            key={`${item.author}-${item.time}-${i}`}
            item={item}
            image={shuffledImages[i % shuffledImages.length]}
            index={i}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px" }}>
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + 6, shuffled.length))}
            style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", color: "#1a1a1a", backgroundColor: "transparent", border: "1px solid #1a1a1a", padding: "10px 28px", cursor: "pointer", textTransform: "uppercase", transition: "background-color 0.2s ease, color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a1a1a"; }}
          >
            show more
          </button>
        )}
        {visibleCount > 4 && (
          <button
            onClick={() => setVisibleCount(4)}
            style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", color: "#888", backgroundColor: "transparent", border: "1px solid #d5d5d5", padding: "10px 28px", cursor: "pointer", textTransform: "uppercase", transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease" }}
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

/* ─── Timeline event card (vertical line on left, cards branch right) ─── */
function TimelineEventCard({
  event,
  image,
  index,
}: {
  event: (typeof eventItems)[0];
  image: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0px",
        position: "relative",
        opacity: 0,
        transform: "translateY(16px)",
        animation: `communityFadeIn 0.5s ease ${index * 0.1}s forwards`,
      }}
    >
      {/* Timeline column: dot + date badge */}
      <div
        style={{
          width: "48px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          paddingTop: "20px",
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: index === 0 ? "#1a1a1a" : "#e5e2de",
            border: "2px solid #ffffff",
            boxShadow: "0 0 0 2px #e5e2de",
            zIndex: 2,
            position: "relative",
          }}
        />
        {/* Date badge below dot */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.03em",
            color: event.type === "in-person" ? "#ffffff" : "#1a1a1a",
            backgroundColor: event.type === "in-person" ? "#1a1a1a" : "#f0eeeb",
            padding: "4px 6px",
            lineHeight: 1,
            marginTop: "8px",
            textAlign: "center",
            whiteSpace: "nowrap",
            borderRadius: "2px",
          }}
        >
          {event.date.split(",")[0]}
        </div>
      </div>

      {/* Card content */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          border: "1px solid #e5e2de",
          overflow: "hidden",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.03)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          marginLeft: "16px",
        }}
      >
        {/* Image */}
        <div style={{ width: "100%", height: "160px", overflow: "hidden", position: "relative" }}>
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
          {/* Type badge on image */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: event.type === "digital" ? "#8b6e5a" : "#ffffff",
              backgroundColor: event.type === "digital" ? "#f5ece3" : "#1a1a1a",
              padding: "5px 10px",
              lineHeight: 1,
            }}
          >
            {event.type === "digital" ? "digital" : "in-person"}
          </div>
          {/* Points pill */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: "6px 14px",
              borderRadius: "40px",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {event.points}
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {/* Date + location */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#1a1a1a" }}>
              {event.date}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#999" }}>
              {event.location}
            </span>
          </div>

          {/* Title */}
          <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, lineHeight: 1.3, color: "#1a1a1a", margin: "0 0 6px 0", letterSpacing: "-0.01em" }}>
            {event.title}
          </h4>

          {/* Description */}
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, lineHeight: 1.55, color: "#777", margin: "0 0 6px 0" }}>
            {event.description}
          </p>

          {/* Bottom: button */}
          <div style={{ marginTop: "12px" }}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: btnHovered ? "#333333" : "#000000",
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
    </div>
  );
}

/* ─── Events timeline (vertical line on left, paginated) ─── */
function EventsTimelineV2() {
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
      {/* Timeline container */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "24px", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "0px" }}>
        {/* Vertical line on the left */}
        <div
          style={{
            position: "absolute",
            left: "23px",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "#e5e2de",
          }}
        />

        {shown.map((event, i) => (
          <TimelineEventCard
            key={`${event.title}-${i}`}
            event={event}
            image={shuffledImages[i % shuffledImages.length]}
            index={i}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px" }}>
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + 4, eventItems.length))}
            style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", color: "#1a1a1a", backgroundColor: "transparent", border: "1px solid #1a1a1a", padding: "10px 28px", cursor: "pointer", textTransform: "uppercase", transition: "background-color 0.2s ease, color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a1a1a"; }}
          >
            show more
          </button>
        )}
        {visibleCount > 4 && (
          <button
            onClick={() => setVisibleCount(4)}
            style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", color: "#888", backgroundColor: "transparent", border: "1px solid #d5d5d5", padding: "10px 28px", cursor: "pointer", textTransform: "uppercase", transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease" }}
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

/* ─── Main component ─── */
export default function FeaturedV2() {
  const [activeTab, setActiveTab] = useState<"activity" | "community" | "events">("activity");
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
            onClick={() => setActiveTab("activity")}
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
              backgroundColor: activeTab === "activity" ? "#000000" : "transparent",
              color: activeTab === "activity" ? "#ffffff" : "#000000",
              border: activeTab === "activity" ? "1px solid #000000" : featuredHovered ? "1px solid #000000" : "1px solid #d5d5d5",
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

      {activeTab === "activity" && <FeaturedGrid />}
      {activeTab === "community" && <CommunityFeedV2 />}
      {activeTab === "events" && <EventsTimelineV2 />}

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
      `}</style>
    </section>
  );
}
