"use client";

import { useRef } from "react";
import Image from "next/image";
import { exchangeProducts } from "@/lib/data";

export default function ExchangePoints() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl">Exchange points</h2>

          {/* Desktop arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-cream-300 flex items-center justify-center hover:bg-cream-100 transition-colors"
              aria-label="Scroll left"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-cream-300 flex items-center justify-center hover:bg-cream-100 transition-colors"
              aria-label="Scroll right"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scroll-snap-x flex gap-4"
        >
          {exchangeProducts.map((product) => (
            <div
              key={product.id}
              className="snap-card w-[200px] md:w-[calc(25%-12px)] hover-lift"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-xl object-cover aspect-square w-full"
              />
              <p className="text-sm font-medium mt-3">{product.name}</p>
              <p className="text-gold-600 font-semibold text-sm mt-0.5">
                {product.pointsCost} pts
              </p>
              <button className="mt-3 rounded-full border border-burgundy-600 text-burgundy-600 px-4 py-1.5 text-sm font-medium hover:bg-burgundy-50 transition-colors">
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
