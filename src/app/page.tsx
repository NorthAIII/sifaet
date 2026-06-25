import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, popularProducts, saleProducts, SHOP } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import HowItWorks from "@/components/home/HowItWorks";
import BrandStory from "@/components/home/BrandStory";
import CtaBand from "@/components/home/CtaBand";

export default function HomePage() {
  const popular = popularProducts();
  const sale = saleProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate">
        <Image
          src="/hero/hero.jpg"
          alt="Şifa et — taze et"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="-z-10 absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="mx-auto flex max-w-6xl flex-col justify-center px-4 py-24 sm:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            {SHOP.city} · {SHOP.since}&apos;den beri
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-black leading-[1.05] text-white sm:text-6xl">
            Güvendiğin kasabın
            <br />
            <span className="italic text-brand-red-light">taze eti</span>, artık
            online.
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/85">
            Dana, kuzu, tavuk ve şarküteri ürünlerini seçin, dükkanımızdan teslim
            alın. “{SHOP.slogan}”
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kategori/dana"
              className="rounded-md bg-brand-red px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-red-dark"
            >
              Sipariş ver
            </Link>
            <Link
              href="#kategoriler"
              className="rounded-md border border-white/40 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Ürünlere göz at
            </Link>
          </div>
        </div>
      </section>

      {/* Güven şeridi */}
      <section className="border-b border-stone-200 bg-brand-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-stone-200 px-4 py-7 text-center sm:grid-cols-4">
          {[
            { t: "Günlük Taze", s: "Her gün taze kesim" },
            { t: "Dükkandan Teslim", s: "Sıra beklemeden al" },
            { t: "1986'dan Beri", s: "Komşu kasap güveni" },
            { t: "Teslimde Ödeme", s: "Nakit veya kart" },
          ].map((f) => (
            <div key={f.t} className="px-2">
              <p className="font-display font-bold text-brand-navy">{f.t}</p>
              <p className="mt-0.5 text-xs text-stone-500">{f.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kategoriler */}
      <section id="kategoriler" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Reyonlarımız
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-brand-navy">
            Ne arıyorsunuz?
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/kategori/${c.slug}`}
              className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg"
            >
              <Image
                src={`/kategori/${c.slug}.jpg`}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="-z-10 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="-z-10 absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="p-4">
                <span className="font-display text-lg font-bold text-white">
                  {c.name}
                </span>
                <span className="mt-1 block text-[11px] text-white/80">
                  {c.blurb}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Nasıl çalışır */}
      <HowItWorks />

      {/* Kampanyalar */}
      {sale.length > 0 && (
        <section className="bg-brand-cream py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
                  Fırsatlar
                </p>
                <h2 className="mt-2 font-display text-3xl font-black text-brand-navy">
                  Bu Haftanın Fırsatları
                </h2>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {sale.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Marka hikâyesi */}
      <BrandStory />

      {/* Çok satanlar */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
              Favoriler
            </p>
            <h2 className="mt-2 font-display text-3xl font-black text-brand-navy">
              Çok Satanlar
            </h2>
          </div>
          <Link
            href="/kategori/dana"
            className="hidden text-sm font-semibold text-brand-red hover:underline sm:block"
          >
            Tümünü gör →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {popular.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Kapanış CTA */}
      <CtaBand />
    </div>
  );
}
