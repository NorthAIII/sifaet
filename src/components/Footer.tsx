import Link from "next/link";
import { CATEGORIES, SHOP } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-brand-navy text-stone-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-black text-white">ŞİFA ET</p>
          <p className="mt-1 text-sm text-stone-300">
            “{SHOP.slogan}” · {SHOP.since}
          </p>
          <p className="mt-3 text-sm text-stone-300">{SHOP.address}</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-stone-400">
            Kategoriler
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/kategori/${c.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-stone-400">
            İletişim
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>Telefon: {SHOP.phone}</li>
            <li>WhatsApp: {SHOP.whatsapp}</li>
            <li>
              <Link href="/iletisim" className="hover:text-white">
                İletişim & Konum
              </Link>
            </li>
            <li>
              <Link href="/sepet" className="hover:text-white">
                Sepetim
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-stone-400">
        © {SHOP.since}–2026 Şifa et · Tuzla
      </div>
    </footer>
  );
}
