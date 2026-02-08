import React from "react";

const features = [
  {
    title: "Clean Beauty",
    description:
      "Formulated with natural, clean ingredients for radiant skin",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.33.26 2.61.74 3.77C4.53 13.27 7.96 11 12 11s7.47 2.27 9.26 4.77c.48-1.16.74-2.44.74-3.77 0-5.52-4.48-10-10-10Z" />
        <path d="M12 11c0-3 1.5-5.5 4-7.5" />
        <path d="M12 11c0-3-1.5-5.5-4-7.5" />
        <path d="M12 11v11" />
        <path d="M8 18c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      </svg>
    ),
  },
  {
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $50",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 4v5h-7V8Z" />
        <circle cx={5.5} cy={18.5} r={2.5} />
        <circle cx={18.5} cy={18.5} r={2.5} />
      </svg>
    ),
  },
  {
    title: "Earn Rewards",
    description:
      "Earn points with every purchase and unlock exclusive perks",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l2.09 6.26L20.18 9l-5.09 4.09L16.18 20 12 16.54 7.82 20l1.09-6.91L3.82 9l6.09-.74L12 2Z" />
      </svg>
    ),
  },
];

export default function FeaturesRow() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.title} className="hover-lift rounded-xl p-6">
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-burgundy-50 text-burgundy-600">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mt-4">{feature.title}</h3>
              <p className="text-sm text-cream-700 mt-2 max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
