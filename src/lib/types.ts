// Şifa et — temel veri tipleri

export type WeightOption = {
  /** Müşteriye gösterilen etiket, ör. "500 gr" */
  label: string;
  /** Gram cinsinden ağırlık (sıralama/karşılaştırma için) */
  grams: number;
  /** Bu seçeneğin fiyatı (TL) */
  price: number;
};

export type Category = {
  slug: string;
  name: string;
  /** Kategori kartında gösterilecek kısa açıklama */
  blurb: string;
  /** Marka renk teması: kart arka planı için */
  accent: "red" | "navy";
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  description: string;
  weightOptions: WeightOption[];
  /** Öne çıkan / en çok satan */
  popular?: boolean;
  /** Kampanyalı ürün (indirimli) */
  onSale?: boolean;
  /** İndirimden önceki referans fiyat (üstü çizili gösterim) */
  oldPrice?: number;
};

export type DeliveryMethod = "pickup" | "delivery";
export type PaymentMethod = "on_pickup" | "online";

export type OrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type CartLine = {
  productSlug: string;
  name: string;
  weightLabel: string;
  grams: number;
  unitPrice: number;
  quantity: number;
};
