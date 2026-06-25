import Link from "next/link";

/**
 * Geçici metin tabanlı logo. Gerçek logodan (kırmızı boynuzlu boğa,
 * "Şifa Olsun", est. 1986) yüksek çözünürlüklü SVG ile değiştirilecek (Faz 5).
 */
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span
        aria-hidden
        className="grid h-10 w-10 place-items-center rounded-full bg-brand-red text-white font-black text-lg shadow-sm ring-2 ring-white/70 group-hover:bg-brand-red-dark transition-colors"
      >
        Şe
      </span>
      <span className="leading-none">
        <span className="block font-black tracking-tight text-brand-navy text-lg">
          ŞİFA ET
        </span>
        {!compact && (
          <span className="block text-[11px] font-medium text-brand-red">
            Şifa Olsun · 1986
          </span>
        )}
      </span>
    </Link>
  );
}
