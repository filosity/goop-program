import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Milestones from "@/components/Milestones";
import Membership from "@/components/Membership";
import Featured from "@/components/Featured";
import Sweepstakes from "@/components/Sweepstakes";
import WaysToEarn from "@/components/WaysToEarn";
import Activities from "@/components/Activities";
import Referrals from "@/components/Referrals";
import FAQ from "@/components/FAQ";
import StickyNav from "@/components/StickyNav";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <StickyNav />
      <HowItWorks />
      <Featured />
      <Milestones />
      <Membership />
      <Sweepstakes />
      <WaysToEarn />
      <Activities />
      <Referrals />
      <FAQ />
    </>
  );
}
