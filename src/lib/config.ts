/*
  Özellik bayrakları — site davranışını tek yerden kontrol eder.
*/

/** Teslimat (delivery) açık mı? Başlangıçta kapalı: sadece dükkandan teslim.
 *  İleride true yapınca checkout'ta teslimat seçeneği belirir. */
export const DELIVERY_ENABLED = false;

/** Online ödeme (iyzico) canlı mı? Anahtarlar gelince true yapılacak.
 *  false iken müşteri "online öde" seçse de sipariş "ödeme bekliyor" olarak
 *  alınır; şimdilik teslimde ödeme önerilir. */
export const ONLINE_PAYMENT_LIVE = false;

/** Dükkandan teslim için sunulan saat aralıkları */
export const PICKUP_SLOTS = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];
