import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/products";

type LazyProductRowProps = {
  title: string;
  products: Product[];
  showActions?: boolean;
};

export function LazyProductRow({ title, products, showActions = true }: LazyProductRowProps) {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold text-neutral-900">{title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} showActions={showActions} />
        ))}
      </div>
    </div>
  );
}
