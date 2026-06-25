import Link from "next/link";

/**
 * Sade, yazı tabanlı wordmark logo (ŞİFA ET).
 * Boğa amblemi kaldırıldı; rafine serif tipografi.
 */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex flex-col leading-none">
      <span
        className={`font-display text-2xl font-black tracking-tight ${
          light ? "text-white" : "text-brand-navy"
        }`}
      >
        ŞİFA<span className="text-brand-red"> ET</span>
      </span>
      <span
        className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] ${
          light ? "text-white/70" : "text-stone-400"
        }`}
      >
        Tuzla · 1986
      </span>
    </Link>
  );
}
