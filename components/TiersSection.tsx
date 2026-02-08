import { tiers, currentUser } from "@/lib/data";

export default function TiersSection() {
  return (
    <section className="bg-burgundy-950">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <h2 className="font-serif text-3xl text-white md:text-4xl text-center">
          Loyalty Tiers
        </h2>
        <p className="text-cream-400 text-center mt-2 text-sm">
          Unlock more perks as you earn points
        </p>

        {/* Horizontal tier cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiers.map((tier) => {
            const isActive = tier.name === currentUser.tier;

            return (
              <div
                key={tier.name}
                className={`rounded-xl border p-4 text-center transition-all ${
                  isActive
                    ? "border-gold-400/50 bg-white/10 ring-1 ring-gold-400/30"
                    : "border-white/5 bg-white/5"
                }`}
              >
                {isActive && (
                  <span className="inline-block mb-2 rounded-full bg-gold-400/20 px-2.5 py-0.5 text-[10px] font-semibold text-gold-400 uppercase tracking-wider">
                    Your tier
                  </span>
                )}
                <h3 className={`text-lg font-semibold ${tier.color}`}>
                  {tier.name}
                </h3>
                <p className="text-xs text-cream-500 mt-1">
                  {tier.minPoints}+ pts
                </p>
                <div className="mt-3 space-y-1">
                  {tier.perks.slice(0, 3).map((perk) => (
                    <p key={perk} className="text-xs text-cream-400">
                      {perk}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
