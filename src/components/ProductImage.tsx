import Image from "next/image";

/**
 * Ürün fotoğrafı. Görseller public/urunler/<slug>.jpg altında.
 * (Şimdilik profesyonel stok foto; sonra dükkanın kendi fotoğraflarıyla değişecek.)
 */
export default function ProductImage({
  slug,
  name,
  className = "",
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority = false,
}: {
  slug: string;
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      <Image
        src={`/urunler/${slug}.jpg`}
        alt={name}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
