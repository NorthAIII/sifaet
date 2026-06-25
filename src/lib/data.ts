import type { Category, Product } from "./types";

/*
  ÖRNEK VERİ — gerçek ürün ve fiyatlarla değiştirilecek.
  Fiyatlar TL cinsinden, temsilîdir (2026 örnek).
  İleride bu veri Supabase'ten gelecek (Faz 4).
*/

export const SHOP = {
  name: "Şifa et",
  city: "Tuzla",
  slogan: "Şifa Olsun",
  since: 1986,
  phone: "+90 000 000 00 00",
  whatsapp: "+90 000 000 00 00",
  address: "Tuzla, İstanbul",
};

export const CATEGORIES: Category[] = [
  {
    slug: "dana",
    name: "Dana Eti",
    blurb: "Kuşbaşı, biftek, antrikot ve daha fazlası",
    accent: "red",
  },
  {
    slug: "kuzu",
    name: "Kuzu Eti",
    blurb: "Pirzola, kuzu kol, but ve çeşitleri",
    accent: "navy",
  },
  {
    slug: "tavuk",
    name: "Tavuk",
    blurb: "But, göğüs, kanat ve bütün tavuk",
    accent: "red",
  },
  {
    slug: "kiyma",
    name: "Kıyma",
    blurb: "Dana, karışık ve özel çekim kıymalar",
    accent: "navy",
  },
  {
    slug: "sarkuteri",
    name: "Şarküteri",
    blurb: "Sucuk, pastırma, kavurma ve sosis",
    accent: "red",
  },
];

export const PRODUCTS: Product[] = [
  // —— DANA ——
  {
    slug: "dana-kusbasi",
    name: "Dana Kuşbaşı",
    categorySlug: "dana",
    description:
      "Güveç, sote ve şişlik için ideal, sinirinden arındırılmış taze dana kuşbaşı.",
    popular: true,
    weightOptions: [
      { label: "500 gr", grams: 500, price: 285 },
      { label: "1 kg", grams: 1000, price: 560 },
    ],
  },
  {
    slug: "dana-antrikot",
    name: "Dana Antrikot",
    categorySlug: "dana",
    description: "Mangal ve ızgara için olgunlaştırılmış, mermerli dana antrikot.",
    popular: true,
    weightOptions: [
      { label: "300 gr", grams: 300, price: 240 },
      { label: "500 gr", grams: 500, price: 390 },
      { label: "1 kg", grams: 1000, price: 760 },
    ],
  },
  {
    slug: "dana-biftek",
    name: "Dana Biftek",
    categorySlug: "dana",
    description: "Yağsız, lokum kıvamında dana biftek dilimleri.",
    weightOptions: [
      { label: "500 gr", grams: 500, price: 410 },
      { label: "1 kg", grams: 1000, price: 800 },
    ],
  },
  {
    slug: "dana-kemikli-but",
    name: "Dana Kemikli But",
    categorySlug: "dana",
    description: "Haşlama ve kemikli yemekler için dana but.",
    weightOptions: [
      { label: "1 kg", grams: 1000, price: 330 },
      { label: "2 kg", grams: 2000, price: 650 },
    ],
  },

  // —— KUZU ——
  {
    slug: "kuzu-pirzola",
    name: "Kuzu Pirzola",
    categorySlug: "kuzu",
    description: "İnce kesim, mangalın yıldızı taze kuzu pirzola.",
    popular: true,
    weightOptions: [
      { label: "500 gr", grams: 500, price: 520 },
      { label: "1 kg", grams: 1000, price: 1020 },
    ],
  },
  {
    slug: "kuzu-kol",
    name: "Kuzu Kol",
    categorySlug: "kuzu",
    description: "Fırın ve güveç için sulu, lezzetli kuzu kol.",
    weightOptions: [
      { label: "1 kg", grams: 1000, price: 540 },
      { label: "1.5 kg", grams: 1500, price: 800 },
    ],
  },
  {
    slug: "kuzu-incik",
    name: "Kuzu İncik",
    categorySlug: "kuzu",
    description: "Ağır ateşte eriyen, fırın incik için bütün kuzu incik.",
    weightOptions: [
      { label: "1 adet (~400 gr)", grams: 400, price: 260 },
      { label: "2 adet", grams: 800, price: 500 },
    ],
  },

  // —— TAVUK ——
  {
    slug: "tavuk-but",
    name: "Tavuk But",
    categorySlug: "tavuk",
    description: "Kemikli, derili taze tavuk but.",
    weightOptions: [
      { label: "1 kg", grams: 1000, price: 130 },
      { label: "2 kg", grams: 2000, price: 250 },
    ],
  },
  {
    slug: "tavuk-gogus",
    name: "Tavuk Göğüs (Fileto)",
    categorySlug: "tavuk",
    description: "Kemiksiz, derisiz tavuk göğüs fileto.",
    popular: true,
    weightOptions: [
      { label: "500 gr", grams: 500, price: 110 },
      { label: "1 kg", grams: 1000, price: 210 },
    ],
  },
  {
    slug: "tavuk-kanat",
    name: "Tavuk Kanat",
    categorySlug: "tavuk",
    description: "Mangal ve fırın için taze tavuk kanat.",
    weightOptions: [
      { label: "1 kg", grams: 1000, price: 120 },
    ],
  },

  // —— KIYMA ——
  {
    slug: "dana-kiyma",
    name: "Dana Kıyma",
    categorySlug: "kiyma",
    description: "Günlük çekim, köfte ve yemeklik dana kıyma.",
    popular: true,
    weightOptions: [
      { label: "500 gr", grams: 500, price: 250 },
      { label: "1 kg", grams: 1000, price: 490 },
    ],
  },
  {
    slug: "karisik-kiyma",
    name: "Karışık Kıyma",
    categorySlug: "kiyma",
    description: "Dana-kuzu karışımı, sulu köfteler için ideal kıyma.",
    onSale: true,
    oldPrice: 470,
    weightOptions: [
      { label: "500 gr", grams: 500, price: 220 },
      { label: "1 kg", grams: 1000, price: 430 },
    ],
  },

  // —— ŞARKÜTERİ ——
  {
    slug: "dana-sucuk",
    name: "Dana Sucuk (Fermente)",
    categorySlug: "sarkuteri",
    description: "Baharatlı, geleneksel fermente dana sucuk.",
    popular: true,
    weightOptions: [
      { label: "500 gr", grams: 500, price: 300 },
      { label: "1 kg", grams: 1000, price: 590 },
    ],
  },
  {
    slug: "pastirma",
    name: "Pastırma (Çemenli)",
    categorySlug: "sarkuteri",
    description: "İnce dilim, çemenli kuru pastırma.",
    weightOptions: [
      { label: "250 gr", grams: 250, price: 340 },
      { label: "500 gr", grams: 500, price: 660 },
    ],
  },
  {
    slug: "kavurma",
    name: "Dana Kavurma",
    categorySlug: "sarkuteri",
    description: "Kendi yağında pişmiş, hazır dana kavurma.",
    onSale: true,
    oldPrice: 420,
    weightOptions: [
      { label: "400 gr (kavanoz)", grams: 400, price: 360 },
    ],
  },
];

// —— Yardımcı seçiciler ——

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function popularProducts(): Product[] {
  return PRODUCTS.filter((p) => p.popular);
}

export function saleProducts(): Product[] {
  return PRODUCTS.filter((p) => p.onSale);
}

/** Bir ürünün en düşük fiyatı (kartta "₺X'den başlayan" için) */
export function startingPrice(p: Product): number {
  return Math.min(...p.weightOptions.map((w) => w.price));
}
