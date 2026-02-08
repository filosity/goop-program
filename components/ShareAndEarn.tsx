"use client";

import { useState } from "react";
import Image from "next/image";

export default function ShareAndEarn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("BELLA500");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSendInvite(e: React.FormEvent) {
    e.preventDefault();
    if (name && email) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setName("");
        setEmail("");
      }, 3000);
    }
  }

  return (
    <section className="bg-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <h2 className="font-serif text-3xl text-white md:text-4xl">
          Share &amp; earn
        </h2>

        <div className="mt-8 items-center gap-12 md:grid md:grid-cols-2">
          {/* Left column */}
          <div>
            <p className="mt-4 text-lg leading-relaxed text-cream-400">
              Share with friends and earn 500 bonus points for every successful
              referral. Your friends get 200 points too.
            </p>

            {/* Invite form */}
            <form onSubmit={handleSendInvite} className="mt-6 space-y-3">
              <input
                type="text"
                placeholder="Friend's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/10 text-white placeholder-cream-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50 transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Friend's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/10 text-white placeholder-cream-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full rounded-full bg-gold-400 text-burgundy-950 px-6 py-3 text-sm font-semibold transition hover:bg-gold-300"
              >
                {sent ? "Invite Sent!" : "Send Invite"}
              </button>
            </form>

            {/* Referral code */}
            <div className="mt-6 rounded-xl bg-white/10 p-5 backdrop-blur">
              <span className="text-sm text-cream-500">Your referral code</span>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-2xl font-bold tracking-widest text-white">
                  BELLA500
                </p>
                <button
                  onClick={handleCopy}
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#1A1A1A] transition hover:bg-cream-100"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="mt-8 md:mt-0">
            <Image
              src="https://picsum.photos/seed/share-beauty/500/400"
              width={500}
              height={400}
              className="w-full rounded-xl object-cover"
              alt="Share and earn rewards"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
