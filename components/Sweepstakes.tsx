import Image from "next/image";
import { sweepstakes } from "@/lib/data";

export default function Sweepstakes() {
  return (
    <section className="bg-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <div className="rounded-2xl bg-white shadow-lg overflow-hidden md:grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 md:h-auto">
            <Image
              src={sweepstakes.imageUrl}
              alt={sweepstakes.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-burgundy-600 font-semibold">
              Sweepstakes
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mt-2 leading-tight">
              {sweepstakes.title}
            </h2>
            <p className="text-cream-700 mt-3 leading-relaxed">
              {sweepstakes.description}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-gold-100 text-gold-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                {sweepstakes.prize}
              </span>
            </div>

            <p className="text-sm text-cream-600 mt-3">
              Ends {sweepstakes.endsAt}
            </p>

            <button className="mt-6 self-start rounded-full bg-burgundy-800 text-white px-8 py-3 font-semibold hover:bg-burgundy-700 transition-colors">
              Enter Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
