"use client";

import { useEffect, useState } from "react";
import Link from "@/lib/next-link-compat";
import { useLocation } from "react-router";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { motion } from "framer-motion";
import { CurrencySelector } from "@/components/currency-selector";
import { useCart } from "@/context/cart-context";

const NAV_LINKS: [string, string][] = [
  ["Products", "/products"],
  ["Buy Green Coffee Beans", "/buy-green-coffee-beans"],
  ["Product Request", "/new-product-request"],
  ["White Label", "/white-label"],
];

const MOBILE_LINKS: [string, string][] = [
  ["Products", "/products"],
  ["Buy Green Coffee Beans", "/buy-green-coffee-beans"],
  ["Cart", "/cart"],
  ["Product Request", "/new-product-request"],
  ["White Label", "/white-label"],
];

const TICKER = [
  "Wholesale Indian green coffee",
  "Specialty & commercial grades",
  "Koraput · Assam · South India",
  "Export-ready with full traceability",
  "Peaberry available",
  "Minimum orders from 10 kg",
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  // Over the hero (home, not yet scrolled) the bar is transparent with light text.
  const dark = isHome && !scrolled;
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className={`${isHome ? "fixed inset-x-0 top-0 anim-navfade" : "sticky top-0"} z-50 ${dark ? "on-dark" : ""}`}>
        {/* Announcement ticker — collapses once you scroll */}
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${
            scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="marquee overflow-hidden bg-teal-800 text-neutral-50">
              <div className="marquee-track">
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                    {TICKER.map((t) => (
                      <span key={t} className="eyebrow flex items-center whitespace-nowrap py-2 text-[0.625rem]">
                        <span className="px-8">{t}</span>
                        <span className="text-teal-300">✦</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <header
          className={`w-full border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ${
            scrolled
              ? "bg-paper/80 backdrop-blur-xl border-neutral-300/60 shadow-[0_10px_30px_-20px_rgba(34,48,27,0.35)]"
              : isHome
                ? "bg-transparent border-white/15"
                : "bg-paper border-transparent"
          }`}
        >
          <div
            className={`mx-auto flex max-w-[1480px] items-center justify-between gap-6 px-4 lg:px-8 transition-[height] duration-500 ease-[var(--ease-out-expo)] ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* LEFT: wordmark */}
            <Link href="/" className="group flex items-center gap-3 shrink-0" aria-label="Bulk Green Coffee — home">
              <span className={`relative grid h-9 w-9 place-items-center rounded-full overflow-hidden ${dark ? "bg-neutral-50 text-teal-900" : "bg-teal-800 text-neutral-50"} transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[360deg]`}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <ellipse cx="12" cy="12" rx="6.2" ry="8.6" transform="rotate(28 12 12)" />
                  <path d="M8.6 17.2c2.8-1.4 3.2-3.4 2.2-5.4-1-2 .1-3.9 2.6-5" />
                </svg>
              </span>
              <span className={`font-heading text-[1.3rem] sm:text-[1.55rem] font-medium leading-none tracking-[0.01em] text-nowrap transition-colors duration-500 ${dark ? "text-neutral-50" : "text-neutral-900"}`}>
                Bulk Green <em className={`font-normal ${dark ? "text-teal-200" : "text-teal-700"}`}>Coffee</em>
              </span>
            </Link>

            {/* CENTER-RIGHT: links with a gliding highlight */}
            <nav
              className="hidden min-[1200px]:flex items-center gap-1 whitespace-nowrap"
              onMouseLeave={() => setHovered(null)}
            >
              {NAV_LINKS.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onMouseEnter={() => setHovered(href)}
                  onFocus={() => setHovered(href)}
                  onBlur={() => setHovered(null)}
                  className={`eyebrow relative px-4 py-2.5 transition-colors duration-300 ${dark ? "text-neutral-50" : "text-neutral-900"}`}
                >
                  {hovered === href && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 -z-0 rounded-full ${dark ? "bg-white/15 backdrop-blur-sm" : "bg-sand"}`}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              ))}
            </nav>

            {/* RIGHT */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
              <CurrencySelector />
              <a
                id="store-link"
                href="https://graycup.org/"
                target="_blank"
                rel="noopener"
                className={`eyebrow link-draw hidden 2xl:inline-flex whitespace-nowrap items-center gap-1 ${dark ? "text-neutral-50" : "text-neutral-900"}`}
              >
                Visit Gray Cup <ArrowUpRight className="h-3 w-3" />
              </a>
              <Link
                href="/contact"
                className={`btn-sweep hidden min-[1200px]:inline-flex h-11 items-center px-6 border ${dark ? "bg-neutral-50 text-teal-900 border-neutral-50 hover:text-neutral-50 [--sweep:#22301b]" : "bg-teal-800 text-neutral-50 border-teal-800 hover:text-teal-800 [--sweep:#faf7f2]"}`}
              >
                Contact
              </Link>
              <Link
                href="/cart"
                className={`relative grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 hover:bg-teal-800 hover:text-neutral-50 hover:border-teal-800 ${dark ? "border-white/50 text-neutral-50" : "border-neutral-300 text-neutral-900"}`}
                aria-label="Cart"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-neutral-900 text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
                    {count}
                  </span>
                )}
              </Link>
              <button
                className={`min-[1200px]:hidden grid h-11 w-11 place-items-center rounded-full border transition-colors hover:bg-sand hover:text-neutral-900 ${dark ? "border-white/50 text-neutral-50" : "border-neutral-300 text-neutral-900"}`}
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* ================= FULL-SCREEN MENU ================= */}
      <div
        className={`fixed inset-0 z-[60] transition-[visibility] duration-700 ${
          menuOpen ? "visible" : "invisible delay-700"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-teal-900 text-neutral-50 transition-[clip-path] duration-[900ms] ease-[var(--ease-out-expo)] ${
            menuOpen ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
          }`}
        >
          <div className="mx-auto flex h-full max-w-[1480px] flex-col px-6 lg:px-10 py-6">
            <div className="flex items-center justify-between">
              <span className="font-heading text-2xl tracking-[0.04em]">Bulk Green Coffee</span>
              <button
                className="inline-flex items-center gap-2 p-2 -mr-2"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="eyebrow">Close</span>
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mt-10 flex flex-col">
              {MOBILE_LINKS.map(([label, href], i) => (
                <div key={href} className="overflow-hidden border-b border-white/10">
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline justify-between py-4 font-heading text-4xl sm:text-6xl font-light transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out-expo)]"
                    style={{
                      transform: menuOpen ? "translateY(0)" : "translateY(110%)",
                      transitionDelay: menuOpen ? `${250 + i * 70}ms` : "0ms",
                    }}
                  >
                    <span className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:italic">
                      {label}
                    </span>
                    <ArrowUpRight className="h-6 w-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100" strokeWidth={1.25} />
                  </Link>
                </div>
              ))}
            </nav>

            <div
              className="mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-8 transition-opacity duration-700 delay-500"
              style={{ opacity: menuOpen ? 1 : 0 }}
            >
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="eyebrow link-draw">
                Contact
              </Link>
              <Link
                href="https://graycup.org/"
                target="_blank"
                rel="noopener"
                onClick={() => setMenuOpen(false)}
                className="eyebrow link-draw"
              >
                Visit Gray Cup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
