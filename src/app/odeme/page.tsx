"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import {
  DELIVERY_ENABLED,
  ONLINE_PAYMENT_LIVE,
  PICKUP_SLOTS,
} from "@/lib/config";
import type { DeliveryMethod, PaymentMethod } from "@/lib/types";

function todayISO() {
  // Yerel tarih (YYYY-MM-DD) — tarayıcıda çalışır
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export default function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<DeliveryMethod>("pickup");
  const [date, setDate] = useState(todayISO());
  const [slot, setSlot] = useState(PICKUP_SLOTS[0]);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("on_pickup");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-brand-navy">Sepetiniz boş</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-red-dark"
        >
          Alışverişe başla
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || phone.trim().length < 10) {
      setError("Lütfen adınızı ve geçerli bir telefon numarası girin.");
      return;
    }
    if (method === "delivery" && address.trim().length < 10) {
      setError("Teslimat için lütfen açık adres girin.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: name.trim(), phone: phone.trim() },
          method,
          date,
          slot,
          address: method === "delivery" ? address.trim() : null,
          payment,
          note: note.trim(),
          lines,
          total,
        }),
      });
      if (!res.ok) throw new Error("Sipariş alınamadı");
      const data = await res.json();
      clear();
      router.push(`/siparis/${data.code}`);
    } catch {
      setError("Sipariş gönderilemedi. Lütfen tekrar deneyin.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black text-brand-navy">Siparişi Tamamla</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* İletişim */}
        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="mb-4 font-bold text-brand-navy">İletişim Bilgileri</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-stone-600">
                Ad Soyad
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-brand-red"
                placeholder="Adınız Soyadınız"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-stone-600">Telefon</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-brand-red"
                placeholder="05xx xxx xx xx"
              />
            </label>
          </div>
        </section>

        {/* Teslim şekli */}
        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="mb-4 font-bold text-brand-navy">Teslim Şekli</h2>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setMethod("pickup")}
              className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                method === "pickup"
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-stone-300 bg-white text-brand-ink"
              }`}
            >
              🏪 Dükkandan Teslim
            </button>
            {DELIVERY_ENABLED ? (
              <button
                type="button"
                onClick={() => setMethod("delivery")}
                className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                  method === "delivery"
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-stone-300 bg-white text-brand-ink"
                }`}
              >
                🛵 Adrese Teslimat
              </button>
            ) : (
              <span className="rounded-xl border border-dashed border-stone-300 px-5 py-3 text-sm text-stone-400">
                🛵 Adrese teslimat yakında
              </span>
            )}
          </div>

          {/* Tarih + saat */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-stone-600">
                {method === "pickup" ? "Teslim alma günü" : "Teslimat günü"}
              </span>
              <input
                type="date"
                value={date}
                min={todayISO()}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-brand-red"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-stone-600">
                Saat aralığı
              </span>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 outline-none focus:border-brand-red"
              >
                {PICKUP_SLOTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {method === "delivery" && (
            <label className="mt-4 block">
              <span className="text-sm font-medium text-stone-600">
                Açık adres
              </span>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-brand-red"
                placeholder="Mahalle, sokak, bina/daire no, tarif"
              />
            </label>
          )}
        </section>

        {/* Ödeme */}
        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="mb-4 font-bold text-brand-navy">Ödeme</h2>
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 p-3">
              <input
                type="radio"
                name="payment"
                checked={payment === "on_pickup"}
                onChange={() => setPayment("on_pickup")}
                className="accent-brand-red"
              />
              <span className="text-sm">
                <span className="font-semibold">Teslimde öde</span> — nakit veya kart
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 p-3">
              <input
                type="radio"
                name="payment"
                checked={payment === "online"}
                onChange={() => setPayment("online")}
                className="accent-brand-red"
              />
              <span className="text-sm">
                <span className="font-semibold">Online öde (kart)</span>{" "}
                {!ONLINE_PAYMENT_LIVE && (
                  <span className="text-stone-400">
                    — yakında (sipariş alınır, ödeme dükkanda)
                  </span>
                )}
              </span>
            </label>
          </div>
        </section>

        {/* Not + özet */}
        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <label className="block">
            <span className="text-sm font-medium text-stone-600">
              Sipariş notu (isteğe bağlı)
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-brand-red"
              placeholder="Ör. kıyma az yağlı çekilsin"
            />
          </label>

          <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-4">
            <span className="font-semibold text-stone-700">Toplam</span>
            <span className="text-2xl font-black text-brand-navy">
              {formatPrice(total)}
            </span>
          </div>
        </section>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-brand-red">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-brand-red px-6 py-4 text-center font-bold text-white hover:bg-brand-red-dark disabled:opacity-60"
        >
          {submitting ? "Gönderiliyor…" : "Siparişi onayla"}
        </button>
      </form>
    </div>
  );
}
