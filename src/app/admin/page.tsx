import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { adminConfigured, isAdmin } from "@/lib/admin";
import { isSupabaseConfigured } from "@/lib/supabase";
import { listOrders } from "@/lib/orders";
import OrderList from "@/components/admin/OrderList";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = { title: "Yönetim" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-black text-brand-navy">Yönetim Paneli</h1>
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Admin parolası ayarlı değil. Sunucu ortam değişkenlerine{" "}
          <code className="font-mono">ADMIN_PASSWORD</code> ekleyin
          (bkz. SETUP.md).
        </div>
      </div>
    );
  }

  if (!(await isAdmin())) {
    redirect("/admin/giris");
  }

  const orders = await listOrders();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-brand-navy">Siparişler</h1>
          <p className="text-sm text-stone-500">Şifa et yönetim paneli</p>
        </div>
        <LogoutButton />
      </div>

      {!isSupabaseConfigured() && (
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Veritabanı (Supabase) bağlı değil. Siparişler kaydedilmiyor ve burada
          görünmez. Bağlamak için SETUP.md adımlarını izleyin.
        </div>
      )}

      <div className="mt-6">
        <OrderList initial={orders} />
      </div>
    </div>
  );
}
