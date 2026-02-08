import Image from "next/image";
import { newProducts } from "@/lib/data";

export default function NewProducts() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20">
        <h2 className="font-serif text-3xl md:text-4xl">Shop the products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {newProducts.map((product) => (
            <div key={product.id} className="hover-lift">
              <div className="relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={530}
                  className="rounded-xl object-cover aspect-[3/4] w-full"
                />
                <span className="absolute top-3 right-3 bg-gold-400 text-burgundy-950 text-xs font-bold px-2.5 py-1 rounded-full">
                  +{product.pointsValue} pts
                </span>
              </div>
              <p className="text-sm font-medium mt-3">{product.name}</p>
              <p className="text-sm text-cream-700">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
