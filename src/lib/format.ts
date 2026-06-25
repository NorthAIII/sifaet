// TL para birimi biçimlendirme

const tl = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return tl.format(value);
}
