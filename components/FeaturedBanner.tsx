import Image from "next/image";

export default function FeaturedBanner() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20">
        <div className="md:grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="https://picsum.photos/seed/featured-model/600/700"
              alt="Featured skincare collection"
              width={600}
              height={700}
              className="rounded-xl object-cover w-full"
            />
          </div>

          <div className="md:pl-8 mt-8 md:mt-0">
            <p className="text-xs uppercase tracking-widest text-burgundy-600 font-semibold">
              FEATURED
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-3 leading-tight">
              Discover your perfect skin routine
            </h2>
            <p className="text-cream-700 mt-4 text-lg leading-relaxed">
              Explore our curated collection of clean, effective skincare
              essentials designed to bring out your natural glow.
            </p>
            <button className="mt-6 bg-burgundy-800 text-white rounded-full px-8 py-3 font-semibold hover:bg-burgundy-700 hover:scale-105 transition-all duration-200">
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
