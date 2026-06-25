import { NextResponse } from "next/server";
import { createOrder, type OrderInput } from "@/lib/orders";
import { notifyNewOrder } from "@/lib/notify";

export async function POST(request: Request) {
  try {
    const order = (await request.json()) as OrderInput;

    // Basit doğrulama
    if (!order?.customer?.name || !order?.customer?.phone) {
      return NextResponse.json(
        { error: "Eksik müşteri bilgisi" },
        { status: 400 },
      );
    }
    if (!Array.isArray(order.lines) || order.lines.length === 0) {
      return NextResponse.json({ error: "Sepet boş" }, { status: 400 });
    }

    const { code } = await createOrder(order);

    // Bildirim (varsa) — siparişi bekletmeden, hatası yutulur
    await notifyNewOrder(code, order);

    return NextResponse.json({ code });
  } catch {
    return NextResponse.json(
      { error: "Sipariş kaydedilemedi" },
      { status: 500 },
    );
  }
}
