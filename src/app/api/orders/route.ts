import { NextResponse } from "next/server";

/*
  Sipariş alma uç noktası.
  Faz 4'te: Supabase'e kayıt + WhatsApp bildirimi eklenecek.
  Şimdilik: sipariş kodu üretir, sunucu konsoluna yazar ve kodu döner.
*/

function generateCode(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 36 ** 2)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `SE-${stamp}${rand}`;
}

export async function POST(request: Request) {
  try {
    const order = await request.json();

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

    const code = generateCode();

    // TODO (Faz 4): Supabase'e yaz + WhatsApp bildirimi gönder
    console.log("[YENİ SİPARİŞ]", code, JSON.stringify(order));

    return NextResponse.json({ code });
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }
}
