import Link from "next/link";
import type { Product } from "@/lib/types";
import { startingPrice } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/urun/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-all hover:border-stone-300 hover:shadow-lg"
    >
      <div className="relative">
        <ProductImage
          slug={product.slug}
          name={product.name}
          className="aspect-square w-full"
        />
        {product.onSale && (
          <span className="absolute left-3 top-3 rounded-sm bg-brand-red px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            İndirim
          </span>
        )}
        {product.popular && !product.onSale && (
          <span className="absolute left-3 top-3 rounded-sm bg-brand-navy px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Çok Satan
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-brand-ink group-hover:text-brand-red transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-stone-500">
          {product.description}
        </p>
        <div className="mt-4 flex items-end justify-between border-t border-stone-100 pt-3">
          <div className="flex items-baseline gap-2">
            {product.oldPrice && (
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="font-display text-xl font-bold text-brand-navy">
              {formatPrice(startingPrice(product))}
            </span>
          </div>
          <span className="text-sm font-semibold text-brand-red group-hover:underline">
            İncele →
          </span>
        </div>
      </div>
    </Link>
  );
}
