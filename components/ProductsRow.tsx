"use client";

import { useRef } from "react";
import Image from "next/image";
import { products } from "@/lib/data";

export default function ProductsRow() {
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
          <h2 className="font-serif text-3xl md:text-4xl">Popular products</h2>

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
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-card w-[200px] md:w-[calc(25%-12px)] hover-lift"
            >
              <div className="relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="rounded-xl object-cover aspect-square w-full"
                />
                <span className="absolute top-2 right-2 bg-gold-400 text-burgundy-950 text-xs font-bold px-2 py-1 rounded-full">
                  +{product.pointsValue} pts
                </span>
              </div>
              <p className="text-sm font-medium mt-3 text-foreground">
                {product.name}
              </p>
              <p className="text-sm text-cream-700">${product.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-burgundy-700 hover:text-burgundy-900 transition-colors"
          >
            Shop All
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
