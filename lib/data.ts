// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UserProfile {
  name: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  points: number;
  nextRewardAt: number;
  avatarUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  pointsValue: number;
  imageUrl: string;
  category: string;
}

export interface ExchangeProduct {
  id: string;
  name: string;
  pointsCost: number;
  imageUrl: string;
}

export interface Tier {
  name: string;
  minPoints: number;
  perks: string[];
  color: string;
}

export interface EarnMethod {
  id: string;
  title: string;
  description: string;
  points: number;
  emoji: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
  category: string;
}

export interface EarnAction {
  id: string;
  title: string;
  description: string;
  pointsValue: number;
  imageUrl: string;
  type: "purchase" | "review" | "referral" | "social" | "birthday";
}

export interface SweepstakesData {
  title: string;
  description: string;
  prize: string;
  endsAt: string;
  imageUrl: string;
}

export interface MembershipBenefit {
  icon: string;
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Current user
// ---------------------------------------------------------------------------

export const currentUser: UserProfile = {
  name: "Bella",
  tier: "Gold",
  points: 340,
  nextRewardAt: 500,
};

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const products: Product[] = [
  {
    id: "p1",
    name: "Radiance Serum",
    price: 48,
    pointsValue: 96,
    imageUrl: "https://picsum.photos/seed/radiance-serum/400/400",
    category: "Skincare",
  },
  {
    id: "p2",
    name: "Hydra Moisturizer",
    price: 36,
    pointsValue: 72,
    imageUrl: "https://picsum.photos/seed/hydra-moisturizer/400/400",
    category: "Skincare",
  },
  {
    id: "p3",
    name: "Rose Lip Balm",
    price: 18,
    pointsValue: 36,
    imageUrl: "https://picsum.photos/seed/rose-lip-balm/400/400",
    category: "Lips",
  },
  {
    id: "p4",
    name: "Glow Oil",
    price: 42,
    pointsValue: 84,
    imageUrl: "https://picsum.photos/seed/glow-oil/400/400",
    category: "Body",
  },
  {
    id: "p5",
    name: "Night Repair Cream",
    price: 54,
    pointsValue: 108,
    imageUrl: "https://picsum.photos/seed/night-cream/400/400",
    category: "Skincare",
  },
  {
    id: "p6",
    name: "Vitamin C Drops",
    price: 38,
    pointsValue: 76,
    imageUrl: "https://picsum.photos/seed/vitamin-c/400/400",
    category: "Skincare",
  },
  {
    id: "p7",
    name: "Clay Mask",
    price: 28,
    pointsValue: 56,
    imageUrl: "https://picsum.photos/seed/clay-mask/400/400",
    category: "Masks",
  },
  {
    id: "p8",
    name: "Body Butter",
    price: 32,
    pointsValue: 64,
    imageUrl: "https://picsum.photos/seed/body-butter/400/400",
    category: "Body",
  },
];

// ---------------------------------------------------------------------------
// Exchange / Redemption Products
// ---------------------------------------------------------------------------

export const exchangeProducts: ExchangeProduct[] = [
  {
    id: "ex1",
    name: "Mini Serum Set",
    pointsCost: 200,
    imageUrl: "https://picsum.photos/seed/mini-serum/400/400",
  },
  {
    id: "ex2",
    name: "Sheet Mask Bundle",
    pointsCost: 150,
    imageUrl: "https://picsum.photos/seed/sheet-mask/400/400",
  },
  {
    id: "ex3",
    name: "Lip Care Duo",
    pointsCost: 180,
    imageUrl: "https://picsum.photos/seed/lip-care/400/400",
  },
  {
    id: "ex4",
    name: "Eye Cream Deluxe",
    pointsCost: 300,
    imageUrl: "https://picsum.photos/seed/eye-cream/400/400",
  },
  {
    id: "ex5",
    name: "Travel Skincare Kit",
    pointsCost: 450,
    imageUrl: "https://picsum.photos/seed/travel-kit/400/400",
  },
  {
    id: "ex6",
    name: "Hair Oil Sample",
    pointsCost: 100,
    imageUrl: "https://picsum.photos/seed/hair-oil/400/400",
  },
  {
    id: "ex7",
    name: "Candle & Mist Set",
    pointsCost: 350,
    imageUrl: "https://picsum.photos/seed/candle-mist/400/400",
  },
  {
    id: "ex8",
    name: "Cleanser Refill",
    pointsCost: 120,
    imageUrl: "https://picsum.photos/seed/cleanser-refill/400/400",
  },
];

// ---------------------------------------------------------------------------
// New / Seasonal Products
// ---------------------------------------------------------------------------

export const newProducts: Product[] = [
  {
    id: "np1",
    name: "Botanical Essence",
    price: 62,
    pointsValue: 124,
    imageUrl: "https://picsum.photos/seed/botanical-essence/400/530",
    category: "Skincare",
  },
  {
    id: "np2",
    name: "Silk Body Lotion",
    price: 44,
    pointsValue: 88,
    imageUrl: "https://picsum.photos/seed/silk-lotion/400/530",
    category: "Body",
  },
  {
    id: "np3",
    name: "Tinted Sunscreen",
    price: 34,
    pointsValue: 68,
    imageUrl: "https://picsum.photos/seed/tinted-sunscreen/400/530",
    category: "Skincare",
  },
];

// ---------------------------------------------------------------------------
// Tiers
// ---------------------------------------------------------------------------

export const tiers: Tier[] = [
  {
    name: "Bronze",
    minPoints: 0,
    perks: ["Earn 1 point per $1", "Birthday gift", "Member-only offers"],
    color: "text-orange-400",
  },
  {
    name: "Silver",
    minPoints: 200,
    perks: [
      "Earn 1.5x points",
      "Free shipping over $35",
      "Early access to sales",
    ],
    color: "text-cream-300",
  },
  {
    name: "Gold",
    minPoints: 500,
    perks: [
      "Earn 2x points",
      "Free shipping on all orders",
      "Exclusive product previews",
      "Free samples with orders",
    ],
    color: "text-gold-400",
  },
  {
    name: "Platinum",
    minPoints: 1000,
    perks: [
      "Earn 3x points",
      "Free express shipping",
      "VIP events access",
      "Personal beauty advisor",
      "Annual luxury gift",
    ],
    color: "text-cream-100",
  },
];

// ---------------------------------------------------------------------------
// Earn Methods
// ---------------------------------------------------------------------------

export const earnMethods: EarnMethod[] = [
  {
    id: "em1",
    title: "Make a Purchase",
    description: "Earn points on every dollar spent in store or online",
    points: 1,
    emoji: "\uD83D\uDED2",
  },
  {
    id: "em2",
    title: "Write a Review",
    description: "Share your experience and help others find their favorites",
    points: 50,
    emoji: "\u270D\uFE0F",
  },
  {
    id: "em3",
    title: "Refer a Friend",
    description: "Invite friends and earn when they make their first purchase",
    points: 500,
    emoji: "\uD83D\uDC8C",
  },
  {
    id: "em4",
    title: "Share on Social",
    description: "Post a photo with #SKINBeauty and tag us for points",
    points: 75,
    emoji: "\uD83D\uDCF8",
  },
  {
    id: "em5",
    title: "Birthday Bonus",
    description: "Celebrate your special day with bonus birthday points",
    points: 100,
    emoji: "\uD83C\uDF82",
  },
  {
    id: "em6",
    title: "Download the App",
    description: "Get the SKIN app and earn points just for signing in",
    points: 150,
    emoji: "\uD83D\uDCF1",
  },
  {
    id: "em7",
    title: "Join Newsletter",
    description: "Subscribe to our newsletter for points and exclusive offers",
    points: 25,
    emoji: "\u2709\uFE0F",
  },
  {
    id: "em8",
    title: "Complete a Quiz",
    description: "Take our skincare quiz and get personalized recommendations",
    points: 30,
    emoji: "\uD83E\uDDE0",
  },
];

// ---------------------------------------------------------------------------
// Footer Links
// ---------------------------------------------------------------------------

export const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "Skincare", href: "#" },
      { label: "Body", href: "#" },
      { label: "Sets", href: "#" },
      { label: "New", href: "#" },
      { label: "Bestsellers", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Ingredients", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sweepstakes
// ---------------------------------------------------------------------------

export const sweepstakes: SweepstakesData = {
  title: "Spring Glow Giveaway",
  description: "Enter for a chance to win our ultimate skincare collection valued at $500. Includes our bestselling serums, moisturizers, and exclusive products.",
  prize: "$500 Skincare Collection",
  endsAt: "March 31, 2026",
  imageUrl: "https://picsum.photos/seed/sweepstakes-glow/600/400",
};

// ---------------------------------------------------------------------------
// Membership Benefits
// ---------------------------------------------------------------------------

export const membershipBenefits: MembershipBenefit[] = [
  {
    icon: "\u2728",
    title: "2x Points",
    description: "Earn double points on every purchase",
  },
  {
    icon: "\uD83D\uDE9A",
    title: "Free Shipping",
    description: "On all orders, no minimum",
  },
  {
    icon: "\uD83C\uDF81",
    title: "Free Samples",
    description: "Deluxe samples with every order",
  },
  {
    icon: "\uD83D\uDC41\uFE0F",
    title: "Early Access",
    description: "Shop new drops before anyone",
  },
];
