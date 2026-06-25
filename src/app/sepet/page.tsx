"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { lines, total, setQty, remove, clear } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-5xl" aria-hidden>
          🛒
        </p>
        <h1 className="mt-4 text-2xl font-black text-brand-navy">
          Sepetiniz boş
        </h1>
        <p className="mt-2 text-stone-500">
          Taze ürünlerimize göz atıp sepetinizi doldurun.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-red-dark"
        >
          Alışverişe başla
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-brand-navy">Sepetim</h1>
        <button
          onClick={clear}
          className="text-sm text-stone-500 underline hover:text-brand-red"
        >
          Sepeti boşalt
        </button>
      </div>

      <ul className="mt-6 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
        {lines.map((l) => (
          <li
            key={`${l.productSlug}-${l.weightLabel}`}
            className="flex items-center gap-4 p-4"
          >
            <div className="flex-1">
              <Link
                href={`/urun/${l.productSlug}`}
                className="font-semibold text-brand-ink hover:text-brand-red"
              >
                {l.name}
              </Link>
              <p className="text-xs text-stone-500">
                {l.weightLabel} · {formatPrice(l.unitPrice)}
              </p>
            </div>

            <div className="inline-flex items-center rounded-lg border border-stone-300">
              <button
                onClick={() =>
                  setQty(l.productSlug, l.weightLabel, l.quantity - 1)
                }
                className="px-2.5 py-1 font-bold text-brand-navy hover:text-brand-red"
                aria-label="Azalt"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold">
                {l.quantity}
              </span>
              <button
                onClick={() =>
                  setQty(l.productSlug, l.weightLabel, l.quantity + 1)
                }
                className="px-2.5 py-1 font-bold text-brand-navy hover:text-brand-red"
                aria-label="Arttır"
              >
                +
              </button>
            </div>

            <div className="w-24 text-right font-bold text-brand-navy">
              {formatPrice(l.unitPrice * l.quantity)}
            </div>

            <button
              onClick={() => remove(l.productSlug, l.weightLabel)}
              className="text-stone-400 hover:text-brand-red"
              aria-label="Kaldır"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-brand-cream p-5">
        <span className="text-lg font-semibold text-stone-700">Toplam</span>
        <span className="text-2xl font-black text-brand-navy">
          {formatPrice(total)}
        </span>
      </div>

      <Link
        href="/odeme"
        className="mt-4 block rounded-xl bg-brand-red px-6 py-4 text-center font-bold text-white hover:bg-brand-red-dark"
      >
        Siparişi tamamla
      </Link>
      <p className="mt-3 text-center text-xs text-stone-500">
        Bir sonraki adımda teslim alma zamanını seçeceksiniz.
      </p>
    </div>
  );
}
