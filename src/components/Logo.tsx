import Link from "next/link";
import Image from "next/image";

/**
 * Geçici amblem (boğa) — gerçek logodan yüksek çözünürlüklü versiyonla
 * değiştirilecek. Kaynak: public/icon.svg
 */
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <Image
        src="/icon.svg"
        alt="Şifa et"
        width={40}
        height={40}
        className="h-10 w-10 rounded-lg shadow-sm"
        priority
      />
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
