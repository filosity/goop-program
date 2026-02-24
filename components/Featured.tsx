"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight } from "@vectoricons/atlas-icons-react";

const FeaturedV2 = dynamic(() => import("./FeaturedV2"), { ssr: false });
const FeaturedV3 = dynamic(() => import("./FeaturedV3"), { ssr: false });

const allImages = ["/featured-puffer-jacket.jpg", "/milestone-sweatpants.jpg", "/featured-stanley.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg"];

const baseCards = [
  {
    title: "AG1 Puffer Jacket",
    subtitle: "$30 AG Credit",
    button: "REDEEM",
    likes: "+3.5K",
    redeemCode: null,
    scrollTarget: "section-ways-to-earn" as string | null,
    isLink: false,
  },
  {
    title: "AG1 Pajama Pants",
    subtitle: "$20 AG Credit",
    button: "REDEEM",
    likes: "+2.8K",
    redeemCode: null,
    scrollTarget: "section-ways-to-earn" as string | null,
    isLink: false,
  },
  {
    title: "AG1 Stanley Cup",
    subtitle: "$10 AG Credit",
    button: "REDEEM",
    likes: "+4.1K",
    redeemCode: null,
    scrollTarget: "section-ways-to-earn" as string | null,
    isLink: false,
  },
  {
    title: "Refer a friend and earn $15 AG Credit",
    subtitle: "+$15 AG Credit per referral",
    button: "REFER NOW",
    likes: "+890",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: true,
  },
  {
    title: "Post your AG1 on Instagram or TikTok",
    subtitle: "+$5 AG Credit",
    button: "SHARE",
    likes: "+1.8K",
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
    title: "Leave a product review",
    subtitle: "+$1 AG Credit",
    button: "REVIEW",
    likes: "+1.2K",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: true,
  },
  {
    title: "Keep up your daily streak",
    subtitle: "+$0.25 AG Credit per day",
    button: "START STREAK",
    likes: "+2.4K",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: true,
  },
  {
    title: "Sign up for SMS alerts",
    subtitle: "+$1 AG Credit",
    button: "SIGN UP",
    likes: "+1.5K",
    redeemCode: null,
    scrollTarget: null as string | null,
    isLink: true,
  },
];

const communityImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg"];

const communityItems = [
  { type: "review" as const, author: "Sarah M.", text: "AG1 Morning Routine Challenge completely changed my mornings. I feel so much more energized starting my day with AG1!", time: "2h ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Share Your AG1 Recipe! We want to see your favorite AG1 smoothie combos. Tag us for a chance to be featured!", time: "3h ago", likes: "1.4K", hasImage: true },
  { type: "review" as const, author: "Emily R.", text: "Started the 30-day AG1 challenge and I already feel the difference. More energy, better digestion, and sleeping like a baby.", time: "4h ago", stars: 5, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "AG1 Travel Tips: How our community stays on track with their health routine while on the go. Swipe for all the tips!", time: "5h ago", likes: "2.1K", hasImage: true },
  { type: "review" as const, author: "Jessica L.", text: "Community Wellness Goals have kept me accountable. Love seeing everyone's progress and sharing mine!", time: "6h ago", stars: 4, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "Your top 5 favorite AG1 recipes of 2025, as voted by you! Swipe to see the full list.", time: "8h ago", likes: "3.8K", hasImage: true },
  { type: "review" as const, author: "Amanda K.", text: "The AG1 community is so supportive. Love connecting with others who prioritize their health and wellness every day!", time: "10h ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Meet our founder's go-to morning wellness stack. Link in bio for the full routine.", time: "12h ago", likes: "987", hasImage: false },
  { type: "review" as const, author: "Priya D.", text: "AG1 has been a game changer for my gut health. Three months in and I feel incredible.", time: "14h ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "NEW: AG1 x Stanley collab is here. Limited edition cups for the AG1 community.", time: "16h ago", likes: "4.2K", hasImage: true },
  { type: "review" as const, author: "Rachel W.", text: "Ordered my first subscription and I'm already hooked. The packaging is also so well designed.", time: "18h ago", stars: 4, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "Sunday reset rituals with AG1. What does your wellness routine look like?", time: "1d ago", likes: "1.9K", hasImage: true },
  { type: "review" as const, author: "Megan T.", text: "Customer service helped me pick the perfect subscription plan. So helpful and responsive!", time: "1d ago", stars: 5, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "Wellness check! Our community members sharing their 30-day transformation results.", time: "1d ago", likes: "5.1K", hasImage: true },
  { type: "review" as const, author: "Lauren B.", text: "The travel packs are so convenient. I never miss a day of AG1 even when I'm on the road.", time: "1d ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Packing orders with love today. Every order ships with a handwritten thank-you note.", time: "2d ago", likes: "2.7K", hasImage: false },
  { type: "review" as const, author: "Nina C.", text: "Earned enough AG Credit for free merch. The rewards program is genuinely great.", time: "2d ago", stars: 5, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "Ingredient spotlight: Why we use 75 vitamins, minerals, and whole-food sourced nutrients in AG1.", time: "2d ago", likes: "1.3K", hasImage: true },
  { type: "review" as const, author: "Olivia H.", text: "My energy levels are through the roof since starting AG1. No more afternoon crashes!", time: "2d ago", stars: 4, hasImage: false },
  { type: "instagram" as const, author: "@drinkag1", text: "We just hit 500K followers! Thank you for being part of this journey with us.", time: "3d ago", likes: "8.4K", hasImage: true },
  { type: "review" as const, author: "Danielle F.", text: "The subscribe-and-save deal is amazing value. AG1 is now a non-negotiable part of my daily routine.", time: "3d ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Quick tutorial: The perfect AG1 morning smoothie recipe. Save this for later!", time: "3d ago", likes: "3.3K", hasImage: false },
  { type: "review" as const, author: "Taylor S.", text: "Three months in and my digestion has improved significantly. Can't recommend AG1 enough.", time: "4d ago", stars: 5, hasImage: true },
  { type: "instagram" as const, author: "@drinkag1", text: "Sustainability update: All our packaging is now 100% recyclable. Small steps, big impact.", time: "4d ago", likes: "2.9K", hasImage: true },
  { type: "review" as const, author: "Aisha J.", text: "AG1 actually works. I have more energy and focus even on my worst sleep days.", time: "5d ago", stars: 4, hasImage: false },
];

const eventImages = ["/tier1.jpg", "/tier2.jpg", "/tier3.jpg", "/tier4.jpg", "/featured1.jpg", "/featured2.jpg", "/featured3.jpg", "/featured4.jpg", "/earn1.jpg", "/earn2.jpg", "/earn3.jpg", "/earn5.jpg", "/earn7.jpg", "/earn8.jpg"];

const eventItems = [
  {
    type: "in-person" as const,
    title: "AG1 Wellness Summit 2026",
    description: "Join us for a full day of wellness talks, nutrition workshops, and live demos from top health experts. RSVP for a free AG1 welcome kit.",
    date: "Mar 15, 2026",
    location: "245 Spring St, New York",
    points: "+$2.50 AG Credit for attending",
  },
  {
    type: "digital" as const,
    title: "Masterclass: Optimizing Your Morning Routine",
    description: "Our nutrition team breaks down the perfect morning wellness stack. Learn how to pair AG1 with your daily habits and get your questions answered live.",
    date: "Mar 22, 2026",
    location: "Zoom — link sent after RSVP",
    points: "+$1 AG Credit",
  },
  {
    type: "in-person" as const,
    title: "AG1 Community Run",
    description: "A 5K community run followed by a post-run wellness brunch with AG1 smoothie stations. All fitness levels welcome. Open to all loyalty members.",
    date: "Apr 5, 2026",
    location: "Griffith Park, Los Angeles",
    points: "+$3 AG Credit for participating",
  },
  {
    type: "digital" as const,
    title: "Live Q&A with Our Founder",
    description: "Ask anything about our brand journey, ingredient sourcing, or upcoming launches. Candid conversation and surprise giveaways for attendees.",
    date: "Apr 12, 2026",
    location: "Instagram Live",
    points: "+$1 AG Credit",
  },
  {
    type: "in-person" as const,
    title: "AG1 Pop-up Experience",
    description: "An immersive wellness experience featuring personalized nutrition consultations, exclusive merch drops, and AG1 tastings. First 100 guests receive a limited edition shaker.",
    date: "Apr 19, 2026",
    location: "AG1 Studio, Santa Monica",
    points: "+$4 AG Credit",
  },
  {
    type: "digital" as const,
    title: "Nutrition Deep-Dive: Gut Health & Immunity",
    description: "Our nutrition science advisor explains the connection between gut health and immune function. Learn how AG1's ingredients support both.",
    date: "May 3, 2026",
    location: "YouTube Premiere",
    points: "+$1 AG Credit",
  },
  {
    type: "in-person" as const,
    title: "Summer Solstice Wellness Brunch",
    description: "Celebrate the longest day with a wellness-focused brunch, guided meditation, and exclusive product reveals. Open to all loyalty members.",
    date: "Jun 21, 2026",
    location: "The Line Hotel, Austin",
    points: "+$3 AG Credit",
  },
  {
    type: "digital" as const,
    title: "AG1 x Fitness: Morning Routines",
    description: "A joint session with a fitness trainer and our nutrition experts on how exercise and AG1 work together for optimal performance and recovery.",
    date: "May 17, 2026",
    location: "Zoom — free for all members",
    points: "+$1 AG Credit",
  },
  {
    type: "in-person" as const,
    title: "AG1 Pop-up Experience — London",
    description: "Be the first to experience our new London pop-up. Live music, complimentary wellness consultations, and 2x AG Credit on all purchases during opening weekend.",
    date: "Jun 7, 2026",
    location: "34 King's Road, London",
    points: "2x AG Credit all weekend",
  },
  {
    type: "digital" as const,
    title: "Community Awards: Vote for Your Favorites",
    description: "Cast your vote for the 2026 Community Choice Awards. Top voters win a curated wellness gift box. Results announced live with prizes and surprises.",
    date: "Jul 1, 2026",
    location: "ag1.com/awards",
    points: "+$1.50 AG Credit for voting",
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
            fontFamily: "var(--font-mono)",
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
            fontFamily: "var(--font-sans)",
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
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
            {item.type === "review" ? `\u2014 ${item.author}` : `${item.likes} likes`}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>
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
        backgroundColor: hasImg ? "#0f2e2f" : "#ffffff",
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
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: hasImg ? "rgba(255,255,255,0.8)" : "#6b8a89",
              textTransform: "uppercase",
            }}
          >
            {item.type === "instagram" ? "instagram" : "review"}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: hasImg ? "rgba(255,255,255,0.5)" : "#bbb" }}>
            {item.time}
          </span>
        </div>

        {isReview && (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "48px",
              lineHeight: "0.8",
              color: "#d4e0df",
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
            fontFamily: isReview ? "var(--font-sans)" : "var(--font-sans)",
            fontSize: isReview ? "17px" : "16px",
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
            fontSize: "14px",
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

  const shown = communityItems.slice(0, visibleCount);
  const hero = shown[0];
  const gridItems = shown.slice(1);
  const hasMore = visibleCount < communityItems.length;

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      <div style={{ border: "1px solid #d4e0df" }}>
        {hero && (
          <CommunityHero
            item={hero}
            image={communityImages[0 % communityImages.length]}
          />
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "#d4e0df",
          }}
        >
          {gridItems.map((item, i) => (
            <CommunityGridCard
              key={`${item.author}-${item.time}-${i}`}
              item={item}
              image={communityImages[(i + 1) % communityImages.length]}
              index={i + 1}
            />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px" }}>
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + 6, communityItems.length))}
            style={{ fontFamily: "var(--font-mono)", fontSize: "17px", fontWeight: 600, letterSpacing: "0.04em", color: "#0C3D3D", backgroundColor: "transparent", border: "1px solid #0C3D3D", borderRadius: "999px", padding: "10px 36px", minHeight: "52px", cursor: "pointer", textTransform: "uppercase", transition: "background-color 0.2s ease, color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0C3D3D"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0C3D3D"; }}
          >
            Show More
          </button>
        )}
        {visibleCount > 4 && (
          <button
            onClick={() => setVisibleCount(4)}
            style={{ fontFamily: "var(--font-mono)", fontSize: "17px", fontWeight: 600, letterSpacing: "0.04em", color: "#0C3D3D", backgroundColor: "transparent", border: "1px solid #0C3D3D", borderRadius: "999px", padding: "10px 36px", minHeight: "52px", cursor: "pointer", textTransform: "uppercase", transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0C3D3D"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0C3D3D"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0C3D3D"; e.currentTarget.style.borderColor = "#0C3D3D"; }}
          >
            Collapse
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
        border: "1px solid #d4e0df",
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
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: "#ffffff", textTransform: "uppercase", lineHeight: 1 }}>
            {monthAbbr}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 400, color: "#ffffff", lineHeight: 1.1 }}>
            {dayNum}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            backgroundColor: "#0C3D3D",
            color: "#ffffff",
            borderRadius: "999px",
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
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              lineHeight: 1,
              padding: "5px 10px",
              borderRadius: "3px",
              flexShrink: 0,
              backgroundColor: event.type === "in-person" ? "#0C3D3D" : "#f5ece3",
              color: event.type === "in-person" ? "#ffffff" : "#8b6e5a",
            }}
          >
            {event.type === "in-person" ? "in-person" : "digital"}
          </span>
        </div>
        <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 400, lineHeight: 1.3, color: "#1a1a1a", margin: 0, letterSpacing: "-0.01em" }}>
          {event.title}
        </h4>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "#999", margin: 0, lineHeight: 1.3 }}>
          {event.location}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 400, lineHeight: 1.55, color: "#777", margin: "4px 0 0 0" }}>
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
              fontSize: "18px",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: btnHov ? "#14504F" : "#0C3D3D",
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
  );
}

/* ─── Events feed — 2-column paginated grid ─── */
function EventsFeed() {
  const [visibleCount, setVisibleCount] = useState(4);

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
            image={eventImages[i % eventImages.length]}
            index={i}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px" }}>
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + 4, eventItems.length))}
            style={{ fontFamily: "var(--font-mono)", fontSize: "17px", fontWeight: 600, letterSpacing: "0.04em", color: "#0C3D3D", backgroundColor: "transparent", border: "1px solid #0C3D3D", borderRadius: "999px", padding: "10px 36px", minHeight: "52px", cursor: "pointer", textTransform: "uppercase", transition: "background-color 0.2s ease, color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0C3D3D"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0C3D3D"; }}
          >
            Show More
          </button>
        )}
        {visibleCount > 4 && (
          <button
            onClick={() => setVisibleCount(4)}
            style={{ fontFamily: "var(--font-mono)", fontSize: "17px", fontWeight: 600, letterSpacing: "0.04em", color: "#0C3D3D", backgroundColor: "transparent", border: "1px solid #0C3D3D", borderRadius: "999px", padding: "10px 36px", minHeight: "52px", cursor: "pointer", textTransform: "uppercase", transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0C3D3D"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0C3D3D"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0C3D3D"; e.currentTarget.style.borderColor = "#0C3D3D"; }}
          >
            Collapse
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

function FeaturedCard({
  card,
  image,
  isFirst,
  cardIndex,
}: {
  card: (typeof baseCards)[0];
  image: string;
  isFirst?: boolean;
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
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 500, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.4 }}>
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
                marginBottom: "20px",
                cursor: "pointer",
                transition: "background-color 0.2s ease, color 0.2s ease",
              }}
            >
              {card.button.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) + " \u2192"}
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
                    fontSize: "13px",
                    fontWeight: 600,
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
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.6)",
                  margin: "8px 0 0 0",
                  lineHeight: 1.4,
                }}
              >
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
  const images = allImages;
  const [activeTab, setActiveTab] = useState<"activity" | "community" | "events">("activity");
  const [showCommunity, setShowCommunity] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showFeaturedBtn, setShowFeaturedBtn] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [showEventsDot, setShowEventsDot] = useState(true);
  const [featuredHovered, setFeaturedHovered] = useState(false);
  const [communityHovered, setCommunityHovered] = useState(false);
  const [eventsHovered, setEventsHovered] = useState(false);
  const [leftArrowHovered, setLeftArrowHovered] = useState(false);
  const [rightArrowHovered, setRightArrowHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
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
    const handler = (e: Event) => {
      const v = (e as CustomEvent).detail?.version;
      if (typeof v === "number" && v >= 1 && v <= 3) setVersion(v);
    };
    window.addEventListener("featured-version", handler);
    return () => window.removeEventListener("featured-version", handler);
  }, []);

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
      {/* Section heading */}
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "44px",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "#000000",
          textAlign: "left",
          margin: "0 0 32px 0",
          letterSpacing: "-0.01em",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Featured
      </h2>

      {/* Section label + arrows */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 24px",
        }}
      >
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
              fontWeight: 600,
              padding: "0 32px",
              minHeight: "52px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "activity" ? "#0C3D3D" : "transparent",
              color: activeTab === "activity" ? "#ffffff" : "#0C3D3D",
              border: activeTab === "activity" ? "1px solid #0C3D3D" : featuredHovered ? "1px solid #0C3D3D" : "1px solid #d5d5d5",
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
              fontWeight: 600,
              padding: "0 32px",
              minHeight: "52px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "community" ? "#0C3D3D" : "transparent",
              color: activeTab === "community" ? "#ffffff" : "#0C3D3D",
              border: activeTab === "community" ? "1px solid #0C3D3D" : communityHovered ? "1px solid #0C3D3D" : "1px solid #d5d5d5",
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
              fontWeight: 600,
              padding: "0 32px",
              minHeight: "52px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              backgroundColor: activeTab === "events" ? "#0C3D3D" : "transparent",
              color: activeTab === "events" ? "#ffffff" : "#0C3D3D",
              border: activeTab === "events" ? "1px solid #0C3D3D" : eventsHovered ? "1px solid #0C3D3D" : "1px solid #d5d5d5",
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
              <FeaturedCard key={i} card={card} image={images[i % images.length]} isFirst={i === 0} cardIndex={i} />
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
      {activeTab === "community" && showCommunity && <CommunityFeed />}
      {activeTab === "events" && showEvents && <EventsFeed />}

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
