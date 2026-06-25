import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { updateOrderStatus } from "@/lib/orders";
import type { OrderStatus } from "@/lib/types";

const VALID: OrderStatus[] = [
  "new",
  "preparing",
  "ready",
  "completed",
  "cancelled",
];

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { id, status } = await request
    .json()
    .catch(() => ({ id: "", status: "" }));

  if (!id || !VALID.includes(status)) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  try {
    await updateOrderStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Hata";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
