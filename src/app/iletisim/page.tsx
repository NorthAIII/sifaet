import type { Metadata } from "next";
import { SHOP } from "@/lib/data";

export const metadata: Metadata = {
  title: "İletişim & Konum",
  description: "Şifa et Tuzla — adres, telefon ve dükkandan teslim bilgileri.",
};

export default function ContactPage() {
  const waNumber = SHOP.whatsapp.replace(/\D/g, "").replace(/^0/, "90");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-black text-brand-navy">İletişim & Konum</h1>
      <p className="mt-2 text-stone-500">
        Siparişinizi dükkanımızdan teslim alabilirsiniz. “{SHOP.slogan}”
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-red">
              Adres
            </h2>
            <p className="mt-1 text-stone-700">{SHOP.address}</p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-red">
              Telefon
            </h2>
            <p className="mt-1 text-stone-700">{SHOP.phone}</p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-red">
              Çalışma Saatleri
            </h2>
            <p className="mt-1 text-stone-700">
              Pazartesi – Cumartesi · 09:00 – 19:00
            </p>
          </div>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700"
          >
            WhatsApp ile yaz
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200">
          <iframe
            title="Şifa et konum"
            src="https://maps.google.com/maps?q=%C5%9Eifa%20Et%20Tuzla&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="h-72 w-full md:h-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
