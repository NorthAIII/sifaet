import type { OrderInput } from "./orders";
import { formatPrice } from "./format";

/*
  Yeni sipariş bildirimini dükkan sahibine WhatsApp ile gönderir.
  Ücretsiz CallMeBot servisi kullanır (kurulum: SETUP.md).
  Env yoksa sessizce atlar; bildirim hatası siparişi ASLA bozmaz.
*/

export async function notifyNewOrder(
  code: string,
  order: OrderInput,
): Promise<void> {
  const phone = process.env.WHATSAPP_PHONE; // ör. 905xxxxxxxxx (ülke kodu, + yok)
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;

  const teslim =
    order.method === "pickup"
      ? `Dükkandan teslim · ${order.date} ${order.slot}`
      : `Adrese teslimat · ${order.date} ${order.slot}`;
  const odeme =
    order.payment === "on_pickup" ? "Teslimde ödeme" : "Online ödeme";

  const items = order.lines
    .map((l) => `• ${l.name} (${l.weightLabel}) x${l.quantity}`)
    .join("\n");

  const text = [
    `🥩 YENİ SİPARİŞ ${code}`,
    `${order.customer.name} · ${order.customer.phone}`,
    teslim,
    odeme,
    order.address ? `Adres: ${order.address}` : "",
    "",
    items,
    "",
    `Toplam: ${formatPrice(order.total)}`,
    order.note ? `Not: ${order.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;

  try {
    await fetch(url, { method: "GET" });
  } catch (e) {
    console.error("[WhatsApp bildirim hatası]", e);
  }
}
