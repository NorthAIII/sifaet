"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { startingPrice } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const first = product.weightOptions[0];

  function quickAdd() {
    add({
      productSlug: product.slug,
      name: product.name,
      weightLabel: first.label,
      grams: first.grams,
      unitPrice: first.price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-all hover:border-stone-300 hover:shadow-lg">
      <Link href={`/urun/${product.slug}`} className="relative block">
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
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/urun/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold leading-snug text-brand-ink transition-colors group-hover:text-brand-red">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-stone-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            {product.oldPrice && (
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="font-display text-xl font-bold text-brand-navy">
              {formatPrice(startingPrice(product))}
            </span>
            <span className="text-xs text-stone-400">/ {first.label}</span>
          </div>
        </div>

        <button
          onClick={quickAdd}
          className={`mt-3 w-full rounded-md py-2.5 text-sm font-semibold transition-colors ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-brand-cream text-brand-navy hover:bg-brand-red hover:text-white"
          }`}
        >
          {added ? "✓ Sepete eklendi" : "Sepete ekle"}
        </button>
      </div>
    </div>
  );
}
