const STEPS = [
  {
    n: "1",
    t: "Ürünleri seç",
    s: "Dana, kuzu, tavuk, şarküteri… İstediğin ağırlığı seç, sepete ekle.",
  },
  {
    n: "2",
    t: "Sipariş ver",
    s: "Teslim alma gününü ve saatini seç. Dilersen teslimde, dilersen online öde.",
  },
  {
    n: "3",
    t: "Dükkandan teslim al",
    s: "Siparişin taze hazırlanır; sıra beklemeden gel, al. “Şifa Olsun.”",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Kolayca
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-brand-navy">
            Nasıl Çalışır?
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n} className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-red font-display text-2xl font-black text-white">
                {step.n}
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">
                {step.t}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-stone-500">
                {step.s}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
