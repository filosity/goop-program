import { footerColumns } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <span className="font-serif text-xl font-bold tracking-widest text-white">
              SKIN
            </span>
            <p className="mt-3 max-w-xs text-sm text-cream-500">
              Premium skincare that nurtures your natural beauty.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-cream-500 transition-colors hover:text-cream-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h3>
            <div className="mt-4 flex gap-4">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="text-cream-500 transition hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="#"
                aria-label="TikTok"
                className="text-cream-500 transition hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.76a8.26 8.26 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.17z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="text-cream-500 transition hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="#"
                aria-label="Pinterest"
                className="text-cream-500 transition hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.37-.73-.37-1.81c0-1.7.98-2.96 2.2-2.96 1.04 0 1.54.78 1.54 1.71 0 1.04-.66 2.6-1 4.04-.29 1.2.6 2.18 1.78 2.18 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.2 0 1.03.4 2.13.89 2.73a.36.36 0 0 1 .08.34l-.33 1.36c-.05.22-.18.27-.41.16-1.55-.72-2.52-2.99-2.52-4.81 0-3.92 2.85-7.52 8.21-7.52 4.31 0 7.66 3.07 7.66 7.17 0 4.28-2.7 7.73-6.46 7.73-1.26 0-2.45-.66-2.86-1.43l-.78 2.96c-.28 1.08-1.04 2.44-1.55 3.27A12 12 0 1 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-cream-600">
            &copy; 2025 SKIN Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
