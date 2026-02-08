export default function TopNav() {
  return (
    <header className="hidden md:block sticky top-0 z-40 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Left: Logo */}
        <a
          href="#"
          className="font-serif text-xl font-bold tracking-widest text-foreground"
        >
          SKIN
        </a>

        {/* Center: Nav links with animated underline */}
        <nav className="flex items-center gap-8">
          {["New", "Bestsellers", "Skincare", "Body", "Sets"].map((link) => (
            <a
              key={link}
              href="#"
              className="relative text-sm font-medium text-cream-800 hover:text-burgundy-700 transition-colors group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-burgundy-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Icons with hover scale */}
        <div className="flex items-center gap-5">
          {/* Search icon */}
          <button
            aria-label="Search"
            className="text-cream-800 hover:text-burgundy-700 hover:scale-110 transition-all duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="M12.5 12.5L17 17" strokeLinecap="round" />
            </svg>
          </button>

          {/* Account icon */}
          <button
            aria-label="Account"
            className="text-cream-800 hover:text-burgundy-700 hover:scale-110 transition-all duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="10" cy="7" r="3.5" />
              <path
                d="M3 17.5c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Bag icon */}
          <button
            aria-label="Bag"
            className="text-cream-800 hover:text-burgundy-700 hover:scale-110 transition-all duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="7" width="14" height="11" rx="1.5" />
              <path
                d="M7 7V5a3 3 0 0 1 6 0v2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
