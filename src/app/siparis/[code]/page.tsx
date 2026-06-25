import Link from "next/link";
import { SHOP } from "@/lib/data";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <p className="text-5xl" aria-hidden>
        ✅
      </p>
      <h1 className="mt-4 text-3xl font-black text-brand-navy">
        Siparişiniz alındı!
      </h1>
      <p className="mt-2 text-stone-600">
        Teşekkürler. Siparişinizi hazırlamaya başlıyoruz.
      </p>

      <div className="mx-auto mt-6 inline-block rounded-2xl border border-stone-200 bg-white px-8 py-5">
        <p className="text-sm text-stone-500">Sipariş numaranız</p>
        <p className="text-2xl font-black tracking-wider text-brand-red">
          {code}
        </p>
      </div>

      <p className="mt-6 text-sm text-stone-600">
        Sipariş hazır olduğunda sizi telefonla bilgilendireceğiz. Teslim alırken
        bu numarayı belirtmeniz yeterli. “{SHOP.slogan}”
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-red-dark"
        >
          Anasayfaya dön
        </Link>
      </div>
    </div>
  );
}
