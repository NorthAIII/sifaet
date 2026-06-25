import Image from "next/image";
import Link from "next/link";
import { SHOP } from "@/lib/data";

export default function BrandStory() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="/hero/hero-alt.jpg"
            alt="Şifa et kasap"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            {SHOP.since}&apos;den beri
          </p>
          <h2 className="mt-2 font-display text-3xl font-black leading-tight text-brand-navy">
            Tuzla&apos;nın komşu kasabı
          </h2>
          <p className="mt-4 text-stone-600">
            {SHOP.since} yılından bu yana Tuzla&apos;da aynı titizlikle hizmet
            veriyoruz. Etlerimiz günlük, taze ve usulüne uygun hazırlanır;
            müşterilerimizi komşumuz biliriz.
          </p>
          <p className="mt-3 text-stone-600">
            Artık aynı güveni online&apos;a taşıdık: ürünü seç, sipariş ver,
            dükkandan teslim al. Kalite aynı kalite. “{SHOP.slogan}”
          </p>
          <Link
            href="/iletisim"
            className="mt-6 inline-block rounded-md border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
          >
            Bizi ziyaret et
          </Link>
        </div>
      </div>
    </section>
  );
}
