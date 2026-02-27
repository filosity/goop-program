"use client";

import { useState, useEffect } from "react";

/* ─── Data ─── */
const allImages = ["/featured-puffer-jacket.jpg", "/milestone-sweatpants.jpg", "/featured-stanley.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg"];

const baseCards = [
  { title: "AG1 Puffer Jacket", subtitle: "$30 AG Credit", button: "REDEEM", likes: "+3.5K", redeemCode: null as string | null, scrollTarget: "section-ways-to-earn" as string | null, isLink: false },
  { title: "AG1 Pajama Pants", subtitle: "$20 AG Credit", button: "REDEEM", likes: "+2.8K", redeemCode: null as string | null, scrollTarget: "section-ways-to-earn" as string | null, isLink: false },
  { title: "AG1 Stanley Cup", subtitle: "$10 AG Credit", button: "REDEEM", likes: "+4.1K", redeemCode: null as string | null, scrollTarget: "section-ways-to-earn" as string | null, isLink: false },
  { title: "Refer a friend and earn $15 AG Credit", subtitle: "+$15 AG Credit per referral", button: "REFER NOW", likes: "+890", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
  { title: "Post your AG1 on Instagram or TikTok", subtitle: "+$5 AG Credit", button: "SHARE", likes: "+1.8K", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
  { title: "Join the Sweepstakes", subtitle: "5 days remaining", button: "ENTER NOW", likes: "+2.7K", redeemCode: null as string | null, scrollTarget: "section-sweepstakes", isLink: false },
  { title: "Leave a product review", subtitle: "+$1 AG Credit", button: "REVIEW", likes: "+1.2K", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
  { title: "Keep up your daily streak", subtitle: "+$0.25 AG Credit per day", button: "START STREAK", likes: "+2.4K", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
  { title: "Sign up for SMS alerts", subtitle: "+$1 AG Credit", button: "SIGN UP", likes: "+1.5K", redeemCode: null as string | null, scrollTarget: null as string | null, isLink: true },
];

const communityImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg"];

const communityItems = [
  { type: "review" as const, author: "Sarah M.", text: "AG1 Morning Routine Challenge completely changed my mornings. I feel so much more energized starting my day with AG1!", time: "2h ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Share Your AG1 Recipe! We want to see your favorite AG1 smoothie combos. Tag us for a chance to be featured!", time: "3h ago", stars: undefined as number | undefined, likes: "1.4K", hasImage: true },
  { type: "review" as const, author: "Emily R.", text: "Started the 30-day AG1 challenge and I already feel the difference. More energy, better digestion, and sleeping like a baby.", time: "4h ago", stars: 5, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "AG1 Travel Tips: How our community stays on track with their health routine while on the go. Swipe for all the tips!", time: "5h ago", stars: undefined as number | undefined, likes: "2.1K", hasImage: true },
  { type: "review" as const, author: "Jessica L.", text: "Community Wellness Goals have kept me accountable. Love seeing everyone's progress and sharing mine!", time: "6h ago", stars: 4, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "Your top 5 favorite AG1 recipes of 2025, as voted by you! Swipe to see the full list.", time: "8h ago", stars: undefined as number | undefined, likes: "3.8K", hasImage: true },
  { type: "review" as const, author: "Amanda K.", text: "The AG1 community is so supportive. Love connecting with others who prioritize their health and wellness every day!", time: "10h ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Meet our founder's go-to morning wellness stack. Link in bio for the full routine.", time: "12h ago", stars: undefined as number | undefined, likes: "987", hasImage: false },
  { type: "review" as const, author: "Priya D.", text: "AG1 has been a game changer for my gut health. Three months in and I feel incredible.", time: "14h ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "NEW: AG1 x Stanley collab is here. Limited edition cups for the AG1 community.", time: "16h ago", stars: undefined as number | undefined, likes: "4.2K", hasImage: true },
  { type: "review" as const, author: "Rachel W.", text: "Ordered my first subscription and I'm already hooked. The packaging is also so well designed.", time: "18h ago", stars: 4, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "Sunday reset rituals with AG1. What does your wellness routine look like?", time: "1d ago", stars: undefined as number | undefined, likes: "1.9K", hasImage: true },
  { type: "review" as const, author: "Megan T.", text: "Customer service helped me pick the perfect subscription plan. So helpful and responsive!", time: "1d ago", stars: 5, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "Wellness check! Our community members sharing their 30-day transformation results.", time: "1d ago", stars: undefined as number | undefined, likes: "5.1K", hasImage: true },
  { type: "review" as const, author: "Lauren B.", text: "The travel packs are so convenient. I never miss a day of AG1 even when I'm on the road.", time: "1d ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Packing orders with love today. Every order ships with a handwritten thank-you note.", time: "2d ago", stars: undefined as number | undefined, likes: "2.7K", hasImage: false },
  { type: "review" as const, author: "Nina C.", text: "Earned enough AG Credit for free merch. The rewards program is genuinely great.", time: "2d ago", stars: 5, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "Ingredient spotlight: Why we use 75 vitamins, minerals, and whole-food sourced nutrients in AG1.", time: "2d ago", stars: undefined as number | undefined, likes: "1.3K", hasImage: true },
  { type: "review" as const, author: "Olivia H.", text: "My energy levels are through the roof since starting AG1. No more afternoon crashes!", time: "2d ago", stars: 4, likes: undefined as string | undefined, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "We just hit 500K followers! Thank you for being part of this journey with us.", time: "3d ago", stars: undefined as number | undefined, likes: "8.4K", hasImage: true },
  { type: "review" as const, author: "Danielle F.", text: "The subscribe-and-save deal is amazing value. AG1 is now a non-negotiable part of my daily routine.", time: "3d ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Quick tutorial: The perfect AG1 morning smoothie recipe. Save this for later!", time: "3d ago", stars: undefined as number | undefined, likes: "3.3K", hasImage: false },
  { type: "review" as const, author: "Taylor S.", text: "Three months in and my digestion has improved significantly. Can't recommend AG1 enough.", time: "4d ago", stars: 5, likes: undefined as string | undefined, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Sustainability update: All our packaging is now 100% recyclable. Small steps, big impact.", time: "4d ago", stars: undefined as number | undefined, likes: "2.9K", hasImage: true },
  { type: "review" as const, author: "Aisha J.", text: "AG1 actually works. I have more energy and focus even on my worst sleep days.", time: "5d ago", stars: 4, likes: undefined as string | undefined, hasImage: false },
];

const eventImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg", "/earn1.jpg", "/earn2.jpg", "/earn3.jpg", "/earn5.jpg", "/earn7.jpg", "/earn8.jpg"];

const eventItems = [
  { type: "in-person" as const, title: "AG1 Wellness Summit 2026", description: "Join us for a full day of wellness talks, nutrition workshops, and live demos from top health experts. RSVP for a free AG1 welcome kit.", date: "Mar 15, 2026", location: "245 Spring St, New York", points: "+$2.50 AG Credit for attending" },
  { type: "digital" as const, title: "Masterclass: Optimizing Your Morning Routine", description: "Our nutrition team breaks down the perfect morning wellness stack. Learn how to pair AG1 with your daily habits and get your questions answered live.", date: "Mar 22, 2026", location: "Zoom — link sent after RSVP", points: "+$1 AG Credit" },
  { type: "in-person" as const, title: "AG1 Community Run", description: "A 5K community run followed by a post-run wellness brunch with AG1 smoothie stations. All fitness levels welcome. Open to all loyalty members.", date: "Apr 5, 2026", location: "Griffith Park, Los Angeles", points: "+$3 AG Credit for participating" },
  { type: "digital" as const, title: "Live Q&A with Our Founder", description: "Ask anything about our brand journey, ingredient sourcing, or upcoming launches. Candid conversation and surprise giveaways for attendees.", date: "Apr 12, 2026", location: "Instagram Live", points: "+$1 AG Credit" },
  { type: "in-person" as const, title: "AG1 Pop-up Experience", description: "An immersive wellness experience featuring personalized nutrition consultations, exclusive merch drops, and AG1 tastings. First 100 guests receive a limited edition shaker.", date: "Apr 19, 2026", location: "AG1 Studio, Santa Monica", points: "+$4 AG Credit" },
  { type: "digital" as const, title: "Nutrition Deep-Dive: Gut Health & Immunity", description: "Our nutrition science advisor explains the connection between gut health and immune function. Learn how AG1's ingredients support both.", date: "May 3, 2026", location: "YouTube Premiere", points: "+$1 AG Credit" },
  { type: "in-person" as const, title: "Summer Solstice Wellness Brunch", description: "Celebrate the longest day with a wellness-focused brunch, guided meditation, and exclusive product reveals. Open to all loyalty members.", date: "Jun 21, 2026", location: "The Line Hotel, Austin", points: "+$3 AG Credit" },
  { type: "digital" as const, title: "AG1 x Fitness: Morning Routines", description: "A joint session with a fitness trainer and our nutrition experts on how exercise and AG1 work together for optimal performance and recovery.", date: "May 17, 2026", location: "Zoom — free for all members", points: "+$1 AG Credit" },
  { type: "in-person" as const, title: "AG1 Pop-up Experience — London", description: "Be the first to experience our new London pop-up. Live music, complimentary wellness consultations, and 2x AG Credit on all purchases during opening weekend.", date: "Jun 7, 2026", location: "34 King's Road, London", points: "2x AG Credit all weekend" },
  { type: "digital" as const, title: "Community Awards: Vote for Your Favorites", description: "Cast your vote for the 2026 Community Choice Awards. Top voters win a curated wellness gift box. Results announced live with prizes and surprises.", date: "Jul 1, 2026", location: "ag1.com/awards", points: "+$1.50 AG Credit for voting" },
];

/* ─── Avatar helpers ─── */
const pastelColors = [
  "#0C3D3D", "#14504F", "#1a6b5a", "#0d8b87", "#2d8f6f",
  "#0a3030", "#276b5d", "#3da88a", "#1b5e5e", "#0f4a4a",
  "#347a6c", "#2a9d8f", "#1c7c6b", "#0e6363", "#3b8b7a",
  "#245c52", "#1a7a6a", "#0b5454", "#2e7d6d", "#3c9585",
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
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>
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
}: {
  card: (typeof baseCards)[0];
  image: string;
  cardIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (card.scrollTarget) {
      const el = document.getElementById(card.scrollTarget);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 76 - 60;
        window.scrollTo({ top, behavior: "smooth" });
      }
      if (card.scrollTarget === "section-ways-to-earn") {
        setTimeout(() => {
          window.dispatchEvent(new Event("activate-products-tab"));
        }, 600);
      }
      return;
    }
    if (card.isLink) return;
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
        border: "1px solid #d4e0df",
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
              fontFamily: "var(--font-sans)",
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
              fontSize: "16px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.75)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {card.subtitle}
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
                fontSize: "18px",
                fontWeight: 600,
                color: "#0C3D3D",
                backgroundColor: btnHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
                minHeight: "52px",
                padding: "0 32px",
                borderRadius: "999px",
                textDecoration: "none",
                lineHeight: 1,
                marginBottom: "16px",
                cursor: "pointer",
                transition: "background-color 0.2s ease, color 0.2s ease",
              }}
            >
              {card.button.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) + " \u2192"}
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
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#000000",
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "10px 22px",
                    minHeight: "52px",
                    cursor: "pointer",
                    lineHeight: 1,
                    transition: "background-color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: "rgba(255,255,255,0.6)", margin: "8px 0 0 0", lineHeight: 1.4 }}>
                copy this code at checkout to redeem your AG Credit with your next order
              </p>
            </div>
          )}

          {/* Social proof row */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <SocialDots cardIndex={cardIndex} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1 }}>
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
  const images = allImages;

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
        border: "1px solid #d4e0df",
        overflow: "hidden",
        opacity: 0,
        transform: hovered ? "translateY(-3px)" : "translateY(12px)",
        animation: `communityFadeIn 0.4s ease ${index * 0.06}s forwards`,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.08)" : "none",
        display: "flex",
        flexDirection: "column",
        borderLeft: isInstagram ? "3px solid #f0c4d0" : "1px solid #d4e0df",
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
                fontSize: "16px",
                fontWeight: 600,
                color: isInstagram ? "#c13584" : "#1a1a1a",
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
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#bbb", display: "flex", alignItems: "center", gap: "6px" }}>
            {item.time}
            {index === 0 && <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#e53935", flexShrink: 0 }} />}
          </span>
        </div>

        {/* Text */}
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 400, lineHeight: 1.5, color: "#1a1a1a", margin: 0, flex: 1 }}>
          {item.text}
        </p>

        {/* Author / likes */}
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "#999", margin: 0 }}>
          {item.type === "review" ? `\u2014 ${item.author}` : `${item.likes} likes`}
        </p>
      </div>
    </div>
  );
}

/* ─── Community feed (2-column cards, paginated) ─── */
function CommunityFeedV2() {
  const [visibleCount, setVisibleCount] = useState(4);

  const shown = communityItems.slice(0, visibleCount);
  const hasMore = visibleCount < communityItems.length;

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
            image={communityImages[i % communityImages.length]}
            index={i}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px" }}>
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + 6, communityItems.length))}
            style={{ fontFamily: "var(--font-sans)", fontSize: "21px", fontWeight: 400, color: "#0C3D3D", backgroundColor: "transparent", border: "1px solid #0C3D3D", borderRadius: "999px", padding: "10px 36px", minHeight: "52px", cursor: "pointer", transition: "background-color 0.2s ease, color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#46DE46"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#46DE46"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0C3D3D"; e.currentTarget.style.borderColor = "#0C3D3D"; }}
          >
            Show More
          </button>
        )}
        {visibleCount > 4 && (
          <button
            onClick={() => setVisibleCount(4)}
            style={{ fontFamily: "var(--font-sans)", fontSize: "21px", fontWeight: 400, color: "#0C3D3D", backgroundColor: "transparent", border: "1px solid #0C3D3D", borderRadius: "999px", padding: "10px 36px", minHeight: "52px", cursor: "pointer", transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#46DE46"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#46DE46"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0C3D3D"; e.currentTarget.style.borderColor = "#0C3D3D"; }}
          >
            Collapse
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
            backgroundColor: index === 0 ? "#1a1a1a" : "#d4e0df",
            border: "2px solid #ffffff",
            boxShadow: "0 0 0 2px #d4e0df",
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
          border: "1px solid #d4e0df",
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
              fontSize: "16px",
              fontWeight: 600,
              color: event.type === "digital" ? "#8b6e5a" : "#ffffff",
              backgroundColor: event.type === "digital" ? "#f5ece3" : "#1a1a1a",
              padding: "5px 10px",
              lineHeight: 1,
            }}
          >
            {event.type === "digital" ? "digital" : "in-person"}
          </div>
          {/* AG Credit pill */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "#0C3D3D",
              padding: "6px 14px",
              borderRadius: "999px",
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
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#999" }}>
              {event.location}
            </span>
          </div>

          {/* Title */}
          <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 400, lineHeight: 1.3, color: "#1a1a1a", margin: "0 0 6px 0", letterSpacing: "-0.01em" }}>
            {event.title}
          </h4>

          {/* Description */}
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 400, lineHeight: 1.55, color: "#777", margin: "0 0 6px 0" }}>
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
                fontSize: "18px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: btnHovered ? "#14504F" : "#0C3D3D",
                padding: "0 32px",
                minHeight: "52px",
                borderRadius: "999px",
                textDecoration: "none",
                lineHeight: "52px",
                transition: "background-color 0.2s ease",
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              {"Read More \u2192"}
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
            backgroundColor: "#d4e0df",
          }}
        />

        {shown.map((event, i) => (
          <TimelineEventCard
            key={`${event.title}-${i}`}
            event={event}
            image={eventImages[i % eventImages.length]}
            index={i}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px" }}>
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + 4, eventItems.length))}
            style={{ fontFamily: "var(--font-sans)", fontSize: "21px", fontWeight: 400, color: "#0C3D3D", backgroundColor: "transparent", border: "1px solid #0C3D3D", borderRadius: "999px", padding: "10px 36px", minHeight: "52px", cursor: "pointer", transition: "background-color 0.2s ease, color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#46DE46"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#46DE46"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0C3D3D"; e.currentTarget.style.borderColor = "#0C3D3D"; }}
          >
            Show More
          </button>
        )}
        {visibleCount > 4 && (
          <button
            onClick={() => setVisibleCount(4)}
            style={{ fontFamily: "var(--font-sans)", fontSize: "21px", fontWeight: 400, color: "#0C3D3D", backgroundColor: "transparent", border: "1px solid #0C3D3D", borderRadius: "999px", padding: "10px 36px", minHeight: "52px", cursor: "pointer", transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#46DE46"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#46DE46"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0C3D3D"; e.currentTarget.style.borderColor = "#0C3D3D"; }}
          >
            Collapse
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function FeaturedV2() {
  const [activeTab, setActiveTab] = useState<"activity" | "community" | "events">("activity");
  const [showFeaturedBtn, setShowFeaturedBtn] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [showEventsDot, setShowEventsDot] = useState(true);
  const [featuredHovered, setFeaturedHovered] = useState(false);
  const [communityHovered, setCommunityHovered] = useState(false);
  const [eventsHovered, setEventsHovered] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    const handleCommunity = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.visible !== undefined) setShowCommunity(detail.visible);
    };
    const handleEvents = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.visible !== undefined) setShowEvents(detail.visible);
    };
    const handleFeaturedBtn = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.visible !== undefined) setShowFeaturedBtn(detail.visible);
    };
    window.addEventListener("toggle-community", handleCommunity);
    window.addEventListener("toggle-events", handleEvents);
    window.addEventListener("toggle-featured-btn", handleFeaturedBtn);
    return () => {
      window.removeEventListener("toggle-community", handleCommunity);
      window.removeEventListener("toggle-events", handleEvents);
      window.removeEventListener("toggle-featured-btn", handleFeaturedBtn);
    };
  }, []);

  useEffect(() => {
    if (activeTab === "community" && !showCommunity) setActiveTab("activity");
    if (activeTab === "events" && !showEvents) setActiveTab("activity");
  }, [showCommunity, showEvents, activeTab]);

  return (
    <section
      id="section-featured"
      style={{
        backgroundColor: "#ffffff",
        padding: "48px 48px 40px",
      }}
    >
      {/* Section heading */}
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "44px",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "#000000",
          textAlign: "center",
          margin: "0 0 32px 0",
          letterSpacing: "-0.01em",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Featured
      </h2>

      {/* Tab pills */}
      <div style={{ maxWidth: "1280px", margin: "0 auto 24px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Featured tab */}
          {showFeaturedBtn && (
          <button
            onClick={() => setActiveTab("activity")}
            onMouseEnter={() => setFeaturedHovered(true)}
            onMouseLeave={() => setFeaturedHovered(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              fontWeight: 400,
              padding: "0 32px",
              minHeight: "52px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "activity" ? "#0C3D3D" : featuredHovered ? "#46DE46" : "transparent",
              color: activeTab === "activity" ? "#ffffff" : featuredHovered ? "#000000" : "#0C3D3D",
              border: activeTab === "activity" ? "1px solid #0C3D3D" : featuredHovered ? "1px solid #46DE46" : "1px solid #d5d5d5",
            }}
          >
            Featured
          </button>
          )}

          {/* Community tab */}
          {showCommunity && (
          <button
            onClick={() => { setActiveTab("community"); setShowDot(false); }}
            onMouseEnter={() => setCommunityHovered(true)}
            onMouseLeave={() => setCommunityHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              fontWeight: 400,
              padding: "0 32px",
              minHeight: "52px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "community" ? "#0C3D3D" : communityHovered ? "#46DE46" : "transparent",
              color: activeTab === "community" ? "#ffffff" : communityHovered ? "#000000" : "#0C3D3D",
              border: activeTab === "community" ? "1px solid #0C3D3D" : communityHovered ? "1px solid #46DE46" : "1px solid #d5d5d5",
            }}
          >
            Community
            {showDot && (
              <div style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: activeTab === "community" ? "#ffffff" : "#e53935", marginLeft: "6px", flexShrink: 0 }} />
            )}
          </button>
          )}

          {/* Events tab */}
          {showEvents && (
          <button
            onClick={() => { setActiveTab("events"); setShowEventsDot(false); }}
            onMouseEnter={() => setEventsHovered(true)}
            onMouseLeave={() => setEventsHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              fontWeight: 400,
              padding: "0 32px",
              minHeight: "52px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "events" ? "#0C3D3D" : eventsHovered ? "#46DE46" : "transparent",
              color: activeTab === "events" ? "#ffffff" : eventsHovered ? "#000000" : "#0C3D3D",
              border: activeTab === "events" ? "1px solid #0C3D3D" : eventsHovered ? "1px solid #46DE46" : "1px solid #d5d5d5",
            }}
          >
            Events
            {showEventsDot && (
              <div style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: activeTab === "events" ? "#ffffff" : "#2196f3", marginLeft: "6px", flexShrink: 0 }} />
            )}
          </button>
          )}
        </div>
      </div>

      {activeTab === "activity" && <FeaturedGrid />}
      {activeTab === "community" && showCommunity && <CommunityFeedV2 />}
      {activeTab === "events" && showEvents && <EventsTimelineV2 />}

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
