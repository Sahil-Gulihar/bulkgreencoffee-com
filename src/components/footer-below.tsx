import Link from "@/lib/next-link-compat";

export default function FooterBelow() {
  const mainLinks = [
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://x.com/TheGrayCup", label: "Twitter" },
    { href: "https://github.com/Gray-Cup", label: "GitHub" },
    { href: "https://discord.gg/gpRxmW63JW", label: "Discord" },
    { href: "https://instagram.com/thegraycup", label: "Instagram" },
  ];

  const policyLinks = [
    { href: "/contact", label: "Contact Us" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/refunds", label: "Refunds & Cancellations" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  const resourceLinks = [
    { href: "https://graycup.org", label: "Company Site" },
    { href: "https://bulkgreencoffee.com/", label: "B2B Store" },
    { href: "https://graycup.in/", label: "Consumer Store" },
    { href: "https://status.graycup.org/", label: "Status" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ];

  return (
    <footer className="bg-teal-900 text-neutral-100 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 lg:px-8 pb-8">

        {/* Giant wordmark */}
        <p
          aria-hidden
          className="font-heading select-none whitespace-nowrap pt-10 text-center font-light leading-[0.9] tracking-[-0.03em] text-white/[0.07] text-[15vw] lg:text-[11rem]"
        >
          Bulk Green Coffee
        </p>

        {/* Policy links */}
        <div className="pt-8 flex flex-wrap gap-x-8 gap-y-2">
          {policyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="eyebrow link-draw text-white/75 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/80 border-t border-white/15 mt-6">
          <p>
            © {new Date().getFullYear()} Gray Cup Enterprises Pvt. Ltd. All
            rights reserved.
          </p>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-md">
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="link-draw hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
