import { currentUser, tiers, membershipBenefits } from "@/lib/data";

export default function MembershipBlock() {
  const currentTier = tiers.find((t) => t.name === currentUser.tier);
  const nextTier = tiers.find(
    (t) => t.minPoints > (currentTier?.minPoints ?? 0)
  );

  const progress = nextTier
    ? Math.min((currentUser.points / nextTier.minPoints) * 100, 100)
    : 100;

  return (
    <section className="bg-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <div className="md:grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Membership status */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Your Membership
            </p>
            <h2 className="font-serif text-3xl text-white mt-2 md:text-4xl">
              {currentUser.tier} Member
            </h2>
            <p className="text-cream-400 mt-3 text-lg">
              {currentUser.points} points earned
            </p>

            {/* Progress to next tier */}
            {nextTier && (
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-cream-500">
                    {currentUser.tier}
                  </span>
                  <span className="text-cream-500">{nextTier.name}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-400 to-gold-300 rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-cream-500 mt-2">
                  {nextTier.minPoints - currentUser.points} points to{" "}
                  {nextTier.name}
                </p>
              </div>
            )}

            <button className="mt-6 rounded-full bg-white text-[#1A1A1A] px-8 py-3 font-semibold hover:bg-cream-100 transition-colors">
              View Benefits
            </button>
          </div>

          {/* Right: Benefits grid */}
          <div className="mt-8 md:mt-0">
            <div className="grid grid-cols-2 gap-4">
              {membershipBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-xl bg-white/5 border border-white/10 p-5"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <h3 className="mt-3 text-sm font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-xs text-cream-500">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
