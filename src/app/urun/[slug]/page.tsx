import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategory,
  getProduct,
  PRODUCTS,
  productsByCategory,
} from "@/lib/data";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product?.name ?? "Ürün",
    description: product?.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = productsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-stone-500">
        <Link href="/" className="hover:text-brand-red">
          Anasayfa
        </Link>
        {category && (
          <>
            {" / "}
            <Link
              href={`/kategori/${category.slug}`}
              className="hover:text-brand-red"
            >
              {category.name}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-brand-navy">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductImage
          slug={product.slug}
          name={product.name}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="aspect-square w-full rounded-lg border border-stone-200"
        />

        <div>
          <h1 className="font-display text-4xl font-black text-brand-navy">
            {product.name}
          </h1>
          <p className="mt-3 text-stone-600">{product.description}</p>

          <div className="my-6 h-px bg-stone-200" />

          <AddToCart product={product} />

          {/* Teslim / güven bilgisi */}
          <ul className="mt-6 space-y-2 rounded-lg border border-stone-200 bg-brand-cream p-4 text-sm text-stone-600">
            <li className="flex items-center gap-2">
              <span aria-hidden>🏪</span> Dükkandan ücretsiz teslim alma
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>🔪</span> Günlük taze kesim, sipariş üzerine hazırlanır
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>💳</span> Teslimde nakit/kart veya online ödeme
            </li>
          </ul>

          <p className="mt-4 text-xs text-stone-500">
            Ağırlıklar yaklaşıktır; tartıdaki küçük farklar dükkanda dengelenir.
          </p>
        </div>
      </div>

      {/* Benzer ürünler */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-stone-200 pt-10">
          <h2 className="font-display text-2xl font-black text-brand-navy">
            Bunları da beğenebilirsiniz
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
