"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import type { OrderRecord } from "@/lib/orders";
import type { OrderStatus } from "@/lib/types";

const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Yeni",
  preparing: "Hazırlanıyor",
  ready: "Hazır",
  completed: "Teslim edildi",
  cancelled: "İptal",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  new: "bg-brand-red text-white",
  preparing: "bg-amber-500 text-white",
  ready: "bg-emerald-600 text-white",
  completed: "bg-stone-400 text-white",
  cancelled: "bg-stone-300 text-stone-700",
};

const FLOW: OrderStatus[] = [
  "new",
  "preparing",
  "ready",
  "completed",
  "cancelled",
];

function waLink(phone: string, text: string) {
  const clean = phone.replace(/\D/g, "").replace(/^0/, "90");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

export default function OrderList({ initial }: { initial: OrderRecord[] }) {
  const [orders, setOrders] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  async function setStatus(id: string, status: OrderStatus) {
    setBusy(id);
    const prev = orders;
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setOrders(prev); // geri al
      alert("Durum güncellenemedi");
    } finally {
      setBusy(null);
    }
  }

  if (orders.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
        Henüz sipariş yok.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div
          key={o.id}
          className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="font-black text-brand-navy">{o.code}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_COLOR[o.status]}`}
              >
                {STATUS_LABEL[o.status]}
              </span>
            </div>
            <span className="text-xs text-stone-500">
              {new Date(o.created_at).toLocaleString("tr-TR")}
            </span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="text-sm">
              <p className="font-semibold text-brand-ink">
                {o.customer_name} · {o.customer_phone}
              </p>
              <p className="text-stone-500">
                {o.method === "pickup" ? "🏪 Dükkandan teslim" : "🛵 Adrese teslimat"}
                {o.pickup_date ? ` · ${o.pickup_date} ${o.pickup_slot ?? ""}` : ""}
              </p>
              <p className="text-stone-500">
                {o.payment === "on_pickup" ? "Teslimde ödeme" : "Online ödeme"}
              </p>
              {o.address && (
                <p className="text-stone-500">Adres: {o.address}</p>
              )}
              {o.note && <p className="text-stone-500">Not: {o.note}</p>}
            </div>

            <ul className="text-sm text-stone-600">
              {o.items.map((it, i) => (
                <li key={i}>
                  • {it.name} ({it.weightLabel}) ×{it.quantity} —{" "}
                  {formatPrice(it.unitPrice * it.quantity)}
                </li>
              ))}
              <li className="mt-1 font-bold text-brand-navy">
                Toplam: {formatPrice(o.total)}
              </li>
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3">
            {FLOW.map((s) => (
              <button
                key={s}
                disabled={busy === o.id || o.status === s}
                onClick={() => setStatus(o.id, s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  o.status === s
                    ? STATUS_COLOR[s]
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                } disabled:opacity-60`}
              >
                {STATUS_LABEL[s]}
              </button>
            ))}
            <a
              href={waLink(
                o.customer_phone,
                `Merhaba ${o.customer_name}, Şifa et siparişiniz (${o.code}) hakkında bilgi veriyoruz.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              WhatsApp ile yaz
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
