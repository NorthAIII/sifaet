import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="bg-brand-navy">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center">
        <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
          Bugünün siparişini şimdi ver
        </h2>
        <p className="max-w-xl text-white/80">
          Taze ürünleri seç, teslim alma saatini belirle. Telefonuna kısayol
          ekleyip her seferinde tek dokunuşla sipariş ver.
        </p>
        <Link
          href="/kategori/dana"
          className="rounded-md bg-brand-red px-8 py-3.5 font-semibold text-white transition-colors hover:bg-brand-red-dark"
        >
          Alışverişe başla
        </Link>
      </div>
    </section>
  );
}
