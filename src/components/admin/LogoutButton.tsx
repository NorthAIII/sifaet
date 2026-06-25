"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/giris");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-semibold text-stone-600 hover:border-brand-red hover:text-brand-red"
    >
      Çıkış
    </button>
  );
}
