/**
 * Geçici ürün görseli. Gerçek fotoğraflar eklenince (public/urunler/*)
 * bu komponent <Image /> ile değiştirilecek.
 * Şimdilik marka renklerinde, ürün baş harfli bir placeholder gösterir.
 */
const EMOJI: Record<string, string> = {
  dana: "🥩",
  kuzu: "🍖",
  tavuk: "🍗",
  kiyma: "🥩",
  sarkuteri: "🌭",
};

export default function ProductImage({
  name,
  categorySlug,
  className = "",
}: {
  name: string;
  categorySlug: string;
  className?: string;
}) {
  const emoji = EMOJI[categorySlug] ?? "🥩";
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-cream to-stone-200 ${className}`}
      aria-label={name}
    >
      <span className="text-5xl opacity-90 select-none" aria-hidden>
        {emoji}
      </span>
    </div>
  );
}
