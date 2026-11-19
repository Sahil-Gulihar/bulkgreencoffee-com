import Link from "@/lib/next-link-compat";

export default function Footer() {
  const mainLinks = [
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/indian-green-coffee-beans", label: "Indian Green Coffee Beans" },
    { href: "/bulk-green-coffee", label: "Bulk Green Coffee" },
    { href: "/1-container-green-coffee-beans", label: "Container Orders" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/refunds", label: "Refunds & Cancellations" },
  ];

  const socialLinks = [
    { href: "https://x.com/TheGrayCup", label: "Twitter" },
    { href: "https://github.com/Gray-Cup", label: "GitHub" },
    { href: "https://discord.gg/gpRxmW63JW", label: "Discord" },
    { href: "https://instagram.com/thegraycup", label: "Instagram" },
  ];

  const roastedLinks = [
    { href: "/roasted-coffee/mumbai", label: "Roasted Coffee Mumbai" },
    { href: "/roasted-coffee/pune", label: "Roasted Coffee Pune" },
    { href: "/roasted-coffee/bengaluru", label: "Roasted Coffee Bengaluru" },
    { href: "/roasted-coffee/delhi", label: "Roasted Coffee Delhi" },
    { href: "/bulk-roasted-coffee-cafes/mumbai", label: "Café Bulk Coffee Mumbai" },
    { href: "/bulk-roasted-coffee-cafes/pune", label: "Café Bulk Coffee Pune" },
    { href: "/bulk-roasted-coffee-cafes/bengaluru", label: "Café Bulk Coffee Bengaluru" },
  ];

  return (
    <footer className="bg-neutral-100 text-neutral-900 border-t border-neutral-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold text-teal-800">Bulk Green Coffee</p>
            <p className="mt-2 max-w-sm text-sm text-neutral-600">Indian green coffee, sourced at origin.</p>
          </div>

          <div>
            <p className="eyebrow text-neutral-500 mb-4">Explore</p>
            <nav className="flex flex-col gap-2.5 text-[0.95rem]">
              {mainLinks.map((link) => (
                <Link key={link.href} href={link.href} className="link-draw w-fit">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="eyebrow text-neutral-500 mb-4">Follow</p>
            <nav className="flex flex-col gap-2.5 text-[0.95rem]">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw w-fit"
                >
                  {link.label} ↗
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <nav className="mt-10 pt-6 border-t border-neutral-300/70 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-600">
          {roastedLinks.map((link) => (
            <Link key={link.href} href={link.href} className="link-draw">
              {link.label}
            </Link>
          ))}
          <Link href="/sitemap.xml" className="link-draw">
            More cities →
          </Link>
        </nav>
      </div>
    </footer>
  );
}
