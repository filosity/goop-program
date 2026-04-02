"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight } from "@vectoricons/atlas-icons-react";

const TIER3_THRESHOLD = 500;

const FeaturedV2 = dynamic(() => import("./FeaturedV2"), { ssr: false });
const FeaturedV3 = dynamic(() => import("./FeaturedV3"), { ssr: false });

const allImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg"];

const baseCards = [
  {
    title: "Spend $100 this month and redeem a beauty gift set",
    subtitle: "ready to redeem",
    button: "REDEEM",
    likes: "+1.2K",
    redeemCode: "GLOW2026",
    scrollTarget: null as string | null,
    isLink: false,
  },
  {
    title: "Spend $500 and receive 1,000 goop credit",
    subtitle: "$450 to go",
    button: "REDEEM",
    likes: "+3.5K",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: false,
  },
  {
    title: "Complete face mapping quiz",
    subtitle: "+100 goop credit",
    button: "TAKE THE QUIZ",
    likes: "+1K",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: true,
  },
  {
    title: "Double goop credit on all facial oils and serums",
    subtitle: "9 days remaining",
    button: "SHOP SERUMS",
    likes: "+2.2K",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: true,
  },
  {
    title: "Join the Sweepstakes",
    subtitle: "5 days remaining",
    button: "ENTER NOW",
    likes: "+2.7K",
    redeemCode: null,
    scrollTarget: "section-sweepstakes",
    isLink: false,
  },
  {
    title: "Refer a friend and earn bonus goop credit",
    subtitle: "+200 goop credit per referral",
    button: "REFER NOW",
    likes: "+890",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: true,
  },
  {
    title: "Try the new Ceramide Barrier Cream",
    subtitle: "limited edition",
    button: "SHOP NOW",
    likes: "+3.1K",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: true,
  },
  {
    title: "Share your skincare routine on TikTok",
    subtitle: "+75 goop credit",
    button: "SHARE",
    likes: "+1.8K",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: true,
  },
  {
    title: "Unlock Tier 3 for exclusive early access",
    subtitle: "450 goop credit to go",
    button: "VIEW TIERS",
    likes: "+2.4K",
    redeemCode: null,
    scrollTarget: "section-tiers",
    isLink: false,
  },
];

const communityImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg"];

const communityItems = [
  { type: "review" as const, author: "Sarah M.", text: "The Rosehip Radiance oil completely transformed my skin. After just two weeks, my complexion is glowing!", time: "2h ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Morning routine with our best-selling Vitamin C serum. Tag us in your selfies!", time: "3h ago", likes: "1.4K", hasImage: true },
  { type: "review" as const, author: "Emily R.", text: "I'm obsessed with the Hydra-Glow moisturizer. Lightweight but so hydrating.", time: "4h ago", stars: 5, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Behind the scenes at our new product photoshoot. Something exciting is coming soon...", time: "5h ago", likes: "2.1K", hasImage: true },
  { type: "review" as const, author: "Jessica L.", text: "The retinol night cream is gentle but effective. Finally a retinol that doesn't irritate.", time: "6h ago", stars: 4, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Your top 5 favorite products of 2025, as voted by you! Swipe to see the full list.", time: "8h ago", likes: "3.8K", hasImage: true },
  { type: "review" as const, author: "Amanda K.", text: "Tier 3 member here — the exclusive early access to new drops is worth it alone!", time: "10h ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Meet our founder's go-to nighttime skincare stack. Link in bio for the full routine.", time: "12h ago", likes: "987", hasImage: false },
  { type: "review" as const, author: "Priya D.", text: "The clay mask is incredible for my oily skin. Pores look visibly smaller after every use.", time: "14h ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "NEW DROP: The Ceramide Barrier Cream is here. Clinically tested, dermatologist approved.", time: "16h ago", likes: "4.2K", hasImage: true },
  { type: "review" as const, author: "Rachel W.", text: "Ordered the starter kit and I'm already hooked. The packaging is also so beautiful.", time: "18h ago", stars: 4, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Self-care Sunday rituals with our calming lavender face mist. What's in your routine?", time: "1d ago", likes: "1.9K", hasImage: true },
  { type: "review" as const, author: "Megan T.", text: "Customer service helped me pick the perfect regimen for my combination skin. So helpful!", time: "1d ago", stars: 5, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Glow check! Our community members sharing their 30-day transformation results.", time: "1d ago", likes: "5.1K", hasImage: true },
  { type: "review" as const, author: "Lauren B.", text: "The SPF 50 daily moisturizer doesn't leave a white cast at all. My new holy grail.", time: "1d ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Packing orders with love today. Every order ships with a handwritten thank-you note.", time: "2d ago", likes: "2.7K", hasImage: false },
  { type: "review" as const, author: "Nina C.", text: "Earned enough goop credit for a free full-size serum. The rewards program is genuinely great.", time: "2d ago", stars: 5, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "Ingredient spotlight: Why bakuchiol is the gentle alternative to retinol your skin needs.", time: "2d ago", likes: "1.3K", hasImage: true },
  { type: "review" as const, author: "Olivia H.", text: "The exfoliating toner is so gentle. No stinging, just smooth, bright skin every morning.", time: "2d ago", stars: 4, hasImage: false },
  { type: "instagram" as const, author: "@glowright", text: "We just hit 500K followers! Thank you for being part of this journey with us.", time: "3d ago", likes: "8.4K", hasImage: true },
  { type: "review" as const, author: "Danielle F.", text: "Bought the bundle deal during the sale — amazing value. Everything smells so luxurious.", time: "3d ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Quick tutorial: How to layer your serums for maximum absorption. Save this for later!", time: "3d ago", likes: "3.3K", hasImage: false },
  { type: "review" as const, author: "Taylor S.", text: "Three months in and my dark spots have faded significantly. Can't recommend enough.", time: "4d ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@glowright", text: "Sustainability update: All our packaging is now 100% recyclable. Small steps, big impact.", time: "4d ago", likes: "2.9K", hasImage: true },
  { type: "review" as const, author: "Aisha J.", text: "The under-eye cream actually works. I look more rested even on my worst sleep days.", time: "5d ago", stars: 4, hasImage: false },
];

const eventImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg", "/earn1.jpg", "/earn2.jpg", "/earn3.jpg", "/earn5.jpg", "/earn9.jpg", "/earn11.jpg"];

const eventItems = [
  {
    type: "in-person" as const,
    title: "Spring Glow Pop-Up Shop",
    description: "Join us at our exclusive pop-up in SoHo, NYC for live skin consultations, complimentary mini facials, and first access to our spring collection. RSVP for a free welcome gift bag.",
    date: "Mar 15, 2026",
    location: "245 Spring St, New York",
    points: "+50 goop credit for attending",
  },
  {
    type: "digital" as const,
    title: "Masterclass: Building Your Night Routine",
    description: "Our lead aesthetician breaks down the perfect evening skincare stack. Learn layering techniques, ingredient pairing, and get your questions answered live.",
    date: "Mar 22, 2026",
    location: "Zoom — link sent after RSVP",
    points: "+25 goop credit",
  },
  {
    type: "in-person" as const,
    title: "VIP Tier 3 Dinner & Preview",
    description: "An intimate evening for our top-tier members. Preview the summer collection, enjoy a curated dinner, and receive an exclusive gift. Tier 3 members only.",
    date: "Apr 5, 2026",
    location: "The Standard, Los Angeles",
    points: "Tier 3 exclusive",
  },
  {
    type: "digital" as const,
    title: "Live Q&A with Our Founder",
    description: "Ask anything about our brand journey, ingredient sourcing, or upcoming launches. Candid conversation and surprise giveaways for attendees.",
    date: "Apr 12, 2026",
    location: "Instagram Live",
    points: "+15 goop credit",
  },
  {
    type: "in-person" as const,
    title: "Clean Beauty Workshop",
    description: "Hands-on workshop where you'll create your own custom serum blend. Take home your creation plus a full-size product of your choice.",
    date: "Apr 19, 2026",
    location: "Goop Lab, Santa Monica",
    points: "+75 goop credit",
  },
  {
    type: "digital" as const,
    title: "Ingredient Deep-Dive: Retinol vs Bakuchiol",
    description: "Our dermatologist advisor explains the science behind these powerhouse ingredients. Find out which one is right for your skin type and concerns.",
    date: "May 3, 2026",
    location: "YouTube Premiere",
    points: "+20 goop credit",
  },
  {
    type: "in-person" as const,
    title: "Summer Solstice Wellness Brunch",
    description: "Celebrate the longest day with a wellness-focused brunch, guided meditation, and exclusive product reveals. Open to all loyalty members.",
    date: "Jun 21, 2026",
    location: "The Line Hotel, Austin",
    points: "+60 goop credit",
  },
  {
    type: "digital" as const,
    title: "Skincare x Fitness: Morning Routines",
    description: "A joint session with a fitness trainer and our skin experts on how exercise impacts your skin, plus the best pre and post-workout products.",
    date: "May 17, 2026",
    location: "Zoom — free for all members",
    points: "+20 goop credit",
  },
  {
    type: "in-person" as const,
    title: "Flagship Store Grand Opening — London",
    description: "Be the first to experience our new London flagship. Live music, complimentary treatments, and 2x goop credit on all purchases during opening weekend.",
    date: "Jun 7, 2026",
    location: "34 King's Road, London",
    points: "2x goop credit all weekend",
  },
  {
    type: "digital" as const,
    title: "Community Awards: Vote for Your Favorites",
    description: "Cast your vote for the 2026 Community Choice Awards. Top voters win a curated gift box. Results announced live with prizes and surprises.",
    date: "Jul 1, 2026",
    location: "goopbeauty.com/awards",
    points: "+30 goop credit for voting",
  },
];

/* ─── Community hero post (full-width with image + overlay) ─── */
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
            color: "rgba(255,255,255,0.8)",
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

/* ─── Small community grid card ─── */
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
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%)",
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: hasImg ? "rgba(255,255,255,0.8)" : "#888888",
              textTransform: "uppercase",
            }}
          >
            {item.type === "instagram" ? "instagram" : "review"}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: hasImg ? "rgba(255,255,255,0.5)" : "#bbb" }}>
            {item.time}
          </span>
        </div>

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

        {isReview && item.stars && (
          <div style={{ display: "flex", gap: "1px", marginTop: "-4px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ fontSize: "11px", color: i < item.stars! ? "#1a1a1a" : "#ddd" }}>{"\u2605"}</span>
            ))}
          </div>
        )}

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

/* ─── Community feed with hero + 3-col grid, paginated ─── */
function CommunityFeed() {
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
      <div style={{ border: "1px solid #e5e2de" }}>
        {hero && (
          <CommunityHero
            item={hero}
            image={shuffledImages[0 % shuffledImages.length]}
          />
        )}
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
      <style>{`
        @keyframes communityFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Event calendar card ─── */
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
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: "#ffffff", textTransform: "uppercase", lineHeight: 1 }}>
            {monthAbbr}
          </span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "#ffffff", lineHeight: 1.1 }}>
            {dayNum}
          </span>
        </div>
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
      <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
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
        <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, lineHeight: 1.3, color: "#1a1a1a", margin: 0, letterSpacing: "-0.01em" }}>
          {event.title}
        </h4>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 500, color: "#999", margin: 0, lineHeight: 1.3 }}>
          {event.location}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, lineHeight: 1.55, color: "#777", margin: "4px 0 0 0" }}>
          {event.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", marginTop: "auto", paddingTop: "12px" }}>
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

/* ─── Events feed — 2-column paginated grid ─── */
function EventsFeed() {
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

/* ─── Avatar initials (social proof) ─── */
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

/* ─── Single featured card ─── */
const SPEND_CARD_THRESHOLD = 500;
const SPEND_CARD_POINTS = 1000;

function FeaturedCard({
  card,
  image,
  isFirst,
  cardIndex,
  isTier3Card,
  isSpendCard,
}: {
  card: (typeof baseCards)[0];
  image: string;
  isFirst?: boolean;
  cardIndex: number;
  isTier3Card?: boolean;
  isSpendCard?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tier3Remaining, setTier3Remaining] = useState(TIER3_THRESHOLD - 50);
  const [spendRemaining, setSpendRemaining] = useState(SPEND_CARD_THRESHOLD - 50);
  const [spendReady, setSpendReady] = useState(false);

  // Listen for spend updates to track tier 3 progress
  useEffect(() => {
    if (!isTier3Card) return;
    const handler = (e: Event) => {
      const spend = (e as CustomEvent).detail?.spend;
      if (typeof spend === "number") {
        const remaining = Math.max(0, TIER3_THRESHOLD - spend);
        setTier3Remaining(remaining);
        if (remaining <= 0 && !completed && !animating) {
          setAnimating(true);
          setTimeout(() => {
            setCompleted(true);
            setAnimating(false);
          }, 700);
        }
      }
    };
    window.addEventListener("spend-updated", handler);
    return () => window.removeEventListener("spend-updated", handler);
  }, [isTier3Card, completed, animating]);

  // Listen for spend updates for spend card
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
    ? hovered ? 0.72 : 0.87
    : hovered ? 0.38 : 0.57;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        minWidth: isFirst ? "450px" : "320px",
        maxWidth: isFirst ? "450px" : "320px",
        height: "500px",
        overflow: "hidden",
        cursor: "default",
        flexShrink: 0,
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
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
          transition: "background-color 0.4s ease",
        }}
      />

      {/* Inner white stroke */}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)", zIndex: 2, pointerEvents: "none" }} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px 32px 28px",
        }}
      >
        {/* Top — title & subtitle */}
        <div>
          <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "24px", fontWeight: 600, color: "#ffffff", margin: "0 0 10px 0", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
            {card.title}
          </h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.4 }}>
            {isTier3Card ? (tier3Remaining > 0 ? `$${tier3Remaining} to go` : "Tier 3 unlocked") : isSpendCard ? (spendReady ? "ready to redeem" : `$${spendRemaining} to go`) : card.subtitle}
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
                marginBottom: "20px",
                cursor: isSpendCard && !spendReady ? "default" : "pointer",
                transition: "background-color 0.2s ease, color 0.2s ease",
              }}
            >
              {card.button.toLowerCase()}
            </a>
          )}

          {/* Animating checkmark */}
          {animating && (
            <div style={{ marginBottom: "20px" }}>
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
            <div style={{ marginBottom: card.redeemCode ? "12px" : "20px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#34c759" />
                <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Redeem code box — only after pressing redeem */}
          {completed && card.redeemCode && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
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
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.6)",
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
            <SocialDots cardIndex={cardIndex} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1 }}>
              {card.likes}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes featuredCircleScale {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes featuredDrawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Featured() {
  const [version, setVersion] = useState(1);
  const [images, setImages] = useState(allImages);
  const [activeTab, setActiveTab] = useState<"activity" | "community" | "events">("activity");
  const [showDot, setShowDot] = useState(true);
  const [showEventsDot, setShowEventsDot] = useState(true);
  const [featuredHovered, setFeaturedHovered] = useState(false);
  const [communityHovered, setCommunityHovered] = useState(false);
  const [eventsHovered, setEventsHovered] = useState(false);
  const [leftArrowHovered, setLeftArrowHovered] = useState(false);
  const [rightArrowHovered, setRightArrowHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const hasShuffled = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = carouselRef.current;
    if (!el) return;
    e.preventDefault();
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.scrollBehavior = "auto";
    el.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = carouselRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    el.scrollLeft = dragScrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    const el = carouselRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
      el.style.cursor = "grab";
    }
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
  };

  useEffect(() => {
    if (!hasShuffled.current) {
      hasShuffled.current = true;
      setImages([...allImages].sort(() => 0.5 - Math.random()));
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const v = (e as CustomEvent).detail?.version;
      if (typeof v === "number" && v >= 1 && v <= 3) setVersion(v);
    };
    window.addEventListener("featured-version", handler);
    return () => window.removeEventListener("featured-version", handler);
  }, []);

  if (version === 2) return <FeaturedV2 />;
  if (version === 3) return <FeaturedV3 />;

  return (
    <section
      id="section-featured"
      style={{
        backgroundColor: "#ffffff",
        padding: "48px 48px 40px",
      }}
    >
      {/* Section label + arrows */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 24px",
        }}
      >
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

      {activeTab === "activity" && (
        <>
          <div
            ref={carouselRef}
            data-carousel=""
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              display: "flex",
              gap: "1px",
              maxWidth: "1280px",
              margin: "0 auto",
              overflowX: "auto",
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: "grab",
              userSelect: "none",
            }}
          >
            {baseCards.map((card, i) => (
              <FeaturedCard key={i} card={card} image={images[i % images.length]} isFirst={i === 0} cardIndex={i} isTier3Card={i === baseCards.length - 1} isSpendCard={i === 1} />
            ))}
          </div>

          {/* Carousel arrows — centered below items */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px", maxWidth: "1280px", margin: "24px auto 0" }}>
            <button
              onClick={() => { if (carouselRef.current) carouselRef.current.scrollBy({ left: -340, behavior: "smooth" }); }}
              onMouseEnter={() => setLeftArrowHovered(true)}
              onMouseLeave={() => setLeftArrowHovered(false)}
              aria-label="Previous"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: leftArrowHovered ? "1px solid #000000" : "1px solid #d8d5d0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s ease",
              }}
            >
              <ArrowLeft size={12} color="#000000" />
            </button>
            <button
              onClick={() => { if (carouselRef.current) carouselRef.current.scrollBy({ left: 340, behavior: "smooth" }); }}
              onMouseEnter={() => setRightArrowHovered(true)}
              onMouseLeave={() => setRightArrowHovered(false)}
              aria-label="Next"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: rightArrowHovered ? "1px solid #000000" : "1px solid #d8d5d0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s ease",
              }}
            >
              <ArrowRight size={12} color="#000000" />
            </button>
          </div>
        </>
      )}
      {activeTab === "community" && <CommunityFeed />}
      {activeTab === "events" && <EventsFeed />}

      <style>{`
        div::-webkit-scrollbar { display: none; }
        [data-carousel] * { -webkit-user-drag: none; user-drag: none; }
        [data-carousel] img { pointer-events: none; }
        @keyframes communityFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
