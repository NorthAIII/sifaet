"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [optionIndex, setOptionIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const selected = product.weightOptions[optionIndex];

  function handleAdd(goToCart: boolean) {
    add({
      productSlug: product.slug,
      name: product.name,
      weightLabel: selected.label,
      grams: selected.grams,
      unitPrice: selected.price,
      quantity: qty,
    });
    if (goToCart) {
      router.push("/sepet");
      return;
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-5">
      {/* Ağırlık seçimi */}
      <div>
        <p className="mb-2 text-sm font-semibold text-brand-navy">Ağırlık seçin</p>
        <div className="flex flex-wrap gap-2">
          {product.weightOptions.map((opt, i) => {
            const active = i === optionIndex;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setOptionIndex(i)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-stone-300 bg-white text-brand-ink hover:border-brand-red"
                }`}
              >
                <span className="block">{opt.label}</span>
                <span
                  className={`block text-xs ${
                    active ? "text-white/90" : "text-stone-500"
                  }`}
                >
                  {formatPrice(opt.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Adet */}
      <div className="flex items-center gap-4">
        <p className="text-sm font-semibold text-brand-navy">Adet</p>
        <div className="inline-flex items-center rounded-xl border border-stone-300 bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-lg font-bold text-brand-navy hover:text-brand-red"
            aria-label="Azalt"
          >
            −
          </button>
          <span className="w-10 text-center font-semibold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-2 text-lg font-bold text-brand-navy hover:text-brand-red"
            aria-label="Arttır"
          >
            +
          </button>
        </div>
      </div>

      {/* Toplam + butonlar */}
      <div className="rounded-2xl bg-brand-cream p-4">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-sm text-stone-600">Ara toplam</span>
          <span className="text-2xl font-black text-brand-navy">
            {formatPrice(selected.price * qty)}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleAdd(false)}
            className="rounded-xl border-2 border-brand-red px-4 py-3 text-sm font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
          >
            {added ? "✓ Sepete eklendi" : "Sepete ekle"}
          </button>
          <button
            type="button"
            onClick={() => handleAdd(true)}
            className="rounded-xl bg-brand-red px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-red-dark"
          >
            Hemen sipariş ver
          </button>
        </div>
      </div>
    </div>
  );
}
