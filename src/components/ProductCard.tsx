import Link from "next/link";
import type { Product } from "@/lib/types";
import { startingPrice } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/urun/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative">
        <ProductImage
          name={product.name}
          categorySlug={product.categorySlug}
          className="h-40 w-full"
        />
        {product.onSale && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-red px-2.5 py-1 text-[11px] font-bold text-white">
            İNDİRİM
          </span>
        )}
        {product.popular && !product.onSale && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-navy px-2.5 py-1 text-[11px] font-bold text-white">
            ÇOK SATAN
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-semibold text-brand-ink group-hover:text-brand-red transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-stone-500">
          {product.description}
        </p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="text-[11px] text-stone-400">başlayan</span>
            <div className="flex items-baseline gap-1.5">
              {product.oldPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-lg font-black text-brand-navy">
                {formatPrice(startingPrice(product))}
              </span>
            </div>
          </div>
          <span className="rounded-full bg-brand-red px-3 py-1.5 text-xs font-semibold text-white group-hover:bg-brand-red-dark transition-colors">
            Seç
          </span>
        </div>
      </div>
    </Link>
  );
}
