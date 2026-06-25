import { getSupabase } from "./supabase";
import type { CartLine, OrderStatus } from "./types";

export type OrderInput = {
  customer: { name: string; phone: string };
  method: "pickup" | "delivery";
  date: string;
  slot: string;
  address: string | null;
  payment: "on_pickup" | "online";
  note: string;
  lines: CartLine[];
  total: number;
};

export type OrderRecord = {
  id: string;
  code: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  method: "pickup" | "delivery";
  pickup_date: string | null;
  pickup_slot: string | null;
  address: string | null;
  payment: "on_pickup" | "online";
  note: string | null;
  items: CartLine[];
  total: number;
  status: OrderStatus;
};

export function generateCode(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 36 ** 2)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `SE-${stamp}${rand}`;
}

/** Siparişi kaydeder. Supabase yoksa yalnızca kod üretir (kalıcı değil). */
export async function createOrder(
  input: OrderInput,
): Promise<{ code: string; persisted: boolean }> {
  const code = generateCode();
  const supabase = getSupabase();

  if (!supabase) {
    console.log("[SİPARİŞ — DB yok]", code, JSON.stringify(input));
    return { code, persisted: false };
  }

  const { error } = await supabase.from("orders").insert({
    code,
    customer_name: input.customer.name,
    customer_phone: input.customer.phone,
    method: input.method,
    pickup_date: input.date || null,
    pickup_slot: input.slot || null,
    address: input.address,
    payment: input.payment,
    note: input.note || null,
    items: input.lines,
    total: input.total,
  });

  if (error) {
    console.error("[SİPARİŞ HATASI]", error.message);
    throw new Error(error.message);
  }
  return { code, persisted: true };
}

export async function listOrders(): Promise<OrderRecord[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("[SİPARİŞ LİSTE HATASI]", error.message);
    return [];
  }
  return (data ?? []) as OrderRecord[];
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Veritabanı bağlı değil");
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
