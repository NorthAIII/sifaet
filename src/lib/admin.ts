import { cookies } from "next/headers";

/*
  Basit admin kimlik doğrulama: ADMIN_PASSWORD env'i ile.
  Giriş başarılıysa httpOnly çerez (sifaet_admin) set edilir.
*/

export const ADMIN_COOKIE = "sifaet_admin";

export function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}

export function adminConfigured(): boolean {
  return Boolean(getAdminPassword());
}

export async function isAdmin(): Promise<boolean> {
  const pw = getAdminPassword();
  if (!pw) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === pw;
}
