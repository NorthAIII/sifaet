import Link from "next/link";
import { CATEGORIES, popularProducts, saleProducts, SHOP } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const popular = popularProducts();
  const sale = saleProducts();

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-cream/80">
            {SHOP.city} · {SHOP.since}&apos;den beri
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
            Taze eti seç, <span className="text-brand-red">dükkandan</span> teslim al.
          </h1>
          <p className="mt-4 max-w-xl text-stone-300">
            Şifa et&apos;in günlük taze dana, kuzu, tavuk ve şarküteri ürünlerini
            online sipariş edin; siz uğraşmadan hazırlayalım. “{SHOP.slogan}”
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/kategori/dana"
              className="rounded-xl bg-brand-red px-6 py-3 font-bold text-white transition-colors hover:bg-brand-red-dark"
            >
              Sipariş ver
            </Link>
            <a
              href="#kategoriler"
              className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"
            >
              Ürünlere göz at
            </a>
          </div>
        </div>
      </section>

      {/* Güven şeridi */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 text-center sm:grid-cols-4">
          {[
            { t: "Günlük Taze", s: "Her gün taze kesim" },
            { t: "Dükkandan Teslim", s: "Sıra beklemeden al" },
            { t: "1986'dan Beri", s: "Komşu kasap güveni" },
            { t: "Teslimde Ödeme", s: "Nakit veya kart" },
          ].map((f) => (
            <div key={f.t}>
              <p className="font-bold text-brand-navy">{f.t}</p>
              <p className="text-xs text-stone-500">{f.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kategoriler */}
      <section id="kategoriler" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-black text-brand-navy">Kategoriler</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/kategori/${c.slug}`}
              className={`group flex flex-col justify-between rounded-2xl p-5 text-white shadow-sm transition-transform hover:-translate-y-0.5 ${
                c.accent === "red" ? "bg-brand-red" : "bg-brand-navy"
              }`}
            >
              <span className="text-lg font-black">{c.name}</span>
              <span className="mt-6 text-xs text-white/80">{c.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Kampanyalar */}
      {sale.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-4">
          <h2 className="text-2xl font-black text-brand-red">
            Bu Haftanın Fırsatları
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sale.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Çok satanlar */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-black text-brand-navy">Çok Satanlar</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {popular.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
