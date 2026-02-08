"use client";

import { useState } from "react";
import { earnMethods } from "@/lib/data";

export default function WaysToEarn() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail("");
      }, 3000);
    }
  }

  function handleCopyReferral() {
    navigator.clipboard.writeText("https://skin.com/ref/BELLA500");
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  }

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <h2 className="font-serif text-3xl text-foreground md:text-4xl">
          Ways to earn points
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {earnMethods.map((method) => {
            // Newsletter card
            if (method.id === "em7") {
              return (
                <div
                  key={method.id}
                  className="rounded-2xl bg-[#1A1A1A] p-6 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <span className="text-3xl">{method.emoji}</span>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {method.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gold-400">
                    +{method.points} pts
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="mt-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full rounded-lg bg-white/10 border border-white/10 text-white placeholder-cream-600 px-3 py-2 text-sm focus:outline-none focus:border-gold-400/50"
                      required
                    />
                    <button
                      type="submit"
                      className="mt-2 w-full rounded-lg bg-burgundy-600 text-white py-2 text-sm font-semibold hover:bg-burgundy-500 transition-colors"
                    >
                      {newsletterSubmitted ? "Subscribed!" : "Subscribe"}
                    </button>
                  </form>
                </div>
              );
            }

            // Quiz card
            if (method.id === "em8") {
              return (
                <div
                  key={method.id}
                  className="rounded-2xl bg-[#1A1A1A] p-6 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <span className="text-3xl">{method.emoji}</span>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {method.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gold-400">
                    +{method.points} pts
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cream-500">
                    {method.description}
                  </p>
                  <button
                    onClick={() => setQuizStarted(!quizStarted)}
                    className="mt-3 w-full rounded-lg bg-burgundy-600 text-white py-2 text-sm font-semibold hover:bg-burgundy-500 transition-colors"
                  >
                    {quizStarted ? "Quiz in Progress..." : "Start Quiz"}
                  </button>
                </div>
              );
            }

            // Referral card
            if (method.id === "em3") {
              return (
                <div
                  key={method.id}
                  className="rounded-2xl bg-[#1A1A1A] p-6 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <span className="text-3xl">{method.emoji}</span>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {method.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gold-400">
                    +{method.points} pts
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs text-cream-400 truncate">
                      skin.com/ref/BELLA500
                    </div>
                    <button
                      onClick={handleCopyReferral}
                      className="rounded-lg bg-burgundy-600 text-white px-3 py-2 text-xs font-semibold hover:bg-burgundy-500 transition-colors"
                    >
                      {referralCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              );
            }

            // Default card
            return (
              <div
                key={method.id}
                className="rounded-2xl bg-[#1A1A1A] p-6 transition-transform duration-200 hover:scale-[1.02]"
              >
                <span className="text-3xl">{method.emoji}</span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {method.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-gold-400">
                  {method.id === "em1"
                    ? "1 pt per $1"
                    : `+${method.points} pts`}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream-500">
                  {method.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
