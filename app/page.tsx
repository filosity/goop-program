import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import StoriesBar from "@/components/StoriesBar";
import FeaturesRow from "@/components/FeaturesRow";
import ProductsRow from "@/components/ProductsRow";
import ShareAndEarn from "@/components/ShareAndEarn";
import TiersSection from "@/components/TiersSection";
import MembershipBlock from "@/components/MembershipBlock";
import FeaturedBanner from "@/components/FeaturedBanner";
import WaysToEarn from "@/components/WaysToEarn";
import Sweepstakes from "@/components/Sweepstakes";
import ExchangePoints from "@/components/ExchangePoints";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      {/* Desktop navigation */}
      <TopNav />

      {/* Hero with points & welcome */}
      <Hero />

      {/* Stories bar — swipeable cards */}
      <div className="bg-cream-50 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <StoriesBar />
        </div>
      </div>

      {/* Features strip */}
      <FeaturesRow />

      {/* Popular products */}
      <ProductsRow />

      {/* Share & earn referral section */}
      <ShareAndEarn />

      {/* Tier progression */}
      <TiersSection />

      {/* Membership status & benefits */}
      <MembershipBlock />

      {/* Featured banner */}
      <FeaturedBanner />

      {/* Ways to earn points */}
      <WaysToEarn />

      {/* Sweepstakes */}
      <Sweepstakes />

      {/* Exchange points for rewards */}
      <ExchangePoints />

      {/* New seasonal products */}
      <NewProducts />

      {/* Footer */}
      <Footer />

      {/* Mobile bottom navigation */}
      <BottomNav />
    </main>
  );
}
