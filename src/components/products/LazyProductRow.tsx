import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/reveal";
import type { Product } from "@/data/products";

type LazyProductRowProps = {
  title: string;
  products: Product[];
  showActions?: boolean;
};

export function LazyProductRow({ title, products, showActions = true }: LazyProductRowProps) {
  return (
    <div className="mb-20">
      <Reveal className="mb-8 flex items-end justify-between gap-6 border-b border-neutral-300/70 pb-4">
        <h2 className="font-heading text-4xl md:text-5xl font-light text-neutral-900">{title}</h2>
        <span className="eyebrow text-neutral-500 pb-2">{String(products.length).padStart(2, "0")} lots</span>
      </Reveal>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={(i % 4) * 90}>
            <ProductCard product={product} showActions={showActions} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
