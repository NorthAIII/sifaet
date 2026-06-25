import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CATEGORIES,
  getCategory,
  productsByCategory,
} from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return { title: category?.name ?? "Kategori" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = productsByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
          Şifa et
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-navy">
          {category.name}
        </h1>
        <p className="mt-2 text-stone-500">{category.blurb}</p>
      </header>

      {products.length === 0 ? (
        <p className="text-stone-500">Bu kategoride henüz ürün yok.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
