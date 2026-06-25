"use client";

import Link from "next/link";
import Logo from "./Logo";
import { CATEGORIES } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Üst duyuru şeridi */}
      <div className="bg-brand-navy text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 py-2 px-4">
        Dükkandan teslim · Günlük taze kesim · 1986&apos;dan beri Tuzla&apos;da
      </div>

      <div className="border-b border-stone-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Logo />

          <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold uppercase tracking-wide text-stone-600">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/kategori/${c.slug}`}
                className="hover:text-brand-red transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/sepet"
            className="relative inline-flex items-center gap-2 rounded-full bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark transition-colors"
          >
            <span aria-hidden>🛒</span>
            <span className="hidden sm:inline">Sepet</span>
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-navy px-1 text-[11px] font-bold text-white ring-2 ring-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobil kategori şeridi */}
        <nav className="md:hidden flex gap-5 overflow-x-auto border-t border-stone-100 px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-stone-600">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/kategori/${c.slug}`}
              className="whitespace-nowrap hover:text-brand-red"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
