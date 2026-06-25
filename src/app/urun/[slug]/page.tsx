import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory, getProduct, PRODUCTS } from "@/lib/data";
import ProductImage from "@/components/ProductImage";
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

      <div className="grid gap-8 md:grid-cols-2">
        <ProductImage
          name={product.name}
          categorySlug={product.categorySlug}
          className="h-72 w-full rounded-2xl border border-stone-200 md:h-96"
        />

        <div>
          <h1 className="text-3xl font-black text-brand-navy">{product.name}</h1>
          <p className="mt-3 text-stone-600">{product.description}</p>

          <div className="my-6 h-px bg-stone-200" />

          <AddToCart product={product} />

          <p className="mt-5 text-xs text-stone-500">
            Et günlük ve taze hazırlanır. Ağırlıklar yaklaşıktır; tartıdaki küçük
            farklar dükkanda dengelenir.
          </p>
        </div>
      </div>
    </div>
  );
}
