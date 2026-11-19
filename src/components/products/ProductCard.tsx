"use client";

import { useRef } from "react";
import { Image } from "@/components/Image";
import Link from "@/lib/next-link-compat";
import { useRouter } from "@/lib/next-nav-compat";
import { ArrowRight, Check, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCurrency } from "@/components/currency-provider";
import { CURRENCIES } from "@/lib/currency";
import { useCart } from "@/context/cart-context";

type ProductCardProps = {
  product: Product;
  showPrice?: boolean;
  showActions?: boolean;
};

/**
 * Product card with a layered hover:
 *  - the photo tilts in 3D toward the cursor and drifts (parallax) the other way
 *  - a warm light follows the pointer
 *  - a second photo (estate shot) wipes in from the right when one exists
 *  - a frame draws itself inside the image
 *  - a details panel rises with staggered children, the arrow badge rotates
 *  - the title underlines itself
 */
export function ProductCard({ product, showPrice = true, showActions = true }: ProductCardProps) {
  const { currency, convert } = useCurrency();
  const config = CURRENCIES[currency];
  const minPriceConverted = convert(product.priceRange.min, currency);
  const { toggle, add, isInCart } = useCart();
  const router = useRouter();
  const inCart = isInCart(product.slug);
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const altImage = product.estateImages?.[0];
  const href = `/products/${product.slug}`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
      el.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
      el.style.setProperty("--px", `${(0.5 - x) * 22}px`);
      el.style.setProperty("--py", `${(0.5 - y) * 22}px`);
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    ["--rx", "--ry", "--px", "--py"].forEach((v) => el.style.setProperty(v, "0"));
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  };

  const highlights = (product.details ?? []).slice(0, 3);

  return (
    <article className="pcard group" onPointerMove={onMove} onPointerLeave={onLeave} ref={ref}>
      <div className="pcard-media">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          draggable={false}
          className="pcard-img"
          style={{ inset: "-4%", width: "108%", height: "108%" }}
        />
        {altImage && (
          <Image
            src={altImage}
            alt=""
            aria-hidden
            fill
            draggable={false}
            className="pcard-img pcard-img--alt"
            style={{ inset: "-4%", width: "108%", height: "108%" }}
          />
        )}

        <div className="pcard-shade" />
        <div className="pcard-glow" />
        <div className="pcard-frame" />

        {/* Whole-image link (sits under the interactive controls) */}
        <Link href={href} className="absolute inset-0 z-10" aria-label={product.name} />

        {/* Tags */}
        <div className="absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5 pointer-events-none">
          {product.scaScore != null && product.scaScore > 81 && <span className="pcard-tag">Specialty</span>}
          {product.categoryTwo && <span className="pcard-tag">{product.categoryTwo}</span>}
        </div>

        {/* Select toggle */}
        {showActions && (
          <button
            type="button"
            onClick={() => toggle(product.slug)}
            aria-pressed={inCart}
            className={`absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 ease-[var(--ease-out-expo)] ${
              inCart
                ? "bg-teal-800 text-neutral-50"
                : "bg-neutral-50/92 text-teal-800 hover:bg-teal-800 hover:text-neutral-50"
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-3 h-3" /> Selected
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" /> Select
              </>
            )}
          </button>
        )}

        {/* Rising details panel */}
        <div className="pcard-panel z-20 pointer-events-none">
          <ul className="mb-4 space-y-1.5 text-[0.8rem] leading-snug text-neutral-50/90" style={{ ["--i" as string]: 0 }}>
            {highlights.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-[0.55em] h-px w-3 shrink-0 bg-neutral-50/70" />
                <span className="line-clamp-1">{d}</span>
              </li>
            ))}
          </ul>

          {showActions ? (
            <div className="pointer-events-auto flex gap-2" style={{ ["--i" as string]: 1 }}>
              <button
                type="button"
                onClick={() => {
                  add(product.slug);
                  router.push("/cart");
                }}
                className="flex-1 h-10 bg-neutral-50 text-teal-900 text-[0.65rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 hover:bg-teal-300"
              >
                Add to Cart
              </button>
              <Link
                href={`/buy-green-coffee-beans/${product.slug}`}
                className="flex-1 h-10 border border-neutral-50/70 text-neutral-50 text-[0.65rem] font-medium uppercase tracking-[0.18em] flex items-center justify-center transition-colors duration-500 hover:bg-neutral-50 hover:text-teal-900"
              >
                Buy Now
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between" style={{ ["--i" as string]: 1 }}>
              <span className="eyebrow text-neutral-50">View details</span>
              <span className="pcard-arrow">
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="pt-4">
        <Link href={href} className="block">
          <h3 className="pcard-title inline font-heading text-[1.3rem] leading-[1.15] font-medium text-neutral-900">
            {product.name}
          </h3>
        </Link>

        {showPrice && (
          <div className="mt-2 flex items-center justify-between gap-3 text-[0.78rem] text-neutral-600">
            <span dir="ltr" className="tabular-nums">
              From {config.symbol}
              {currency === "INR" ? minPriceConverted : minPriceConverted.toFixed(2)}
              {product.minimumOrder.unit ? `/${product.minimumOrder.unit}` : ""}
            </span>
            <span className="eyebrow text-[0.6rem] text-neutral-500">
              MOQ {product.minimumOrder.quantity} {product.minimumOrder.unit}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
