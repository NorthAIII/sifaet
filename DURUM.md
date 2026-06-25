# Şifa et — Proje Durumu (Handoff)

Son güncelleme: 25 Haziran 2026

Bu dosya, projede nerede kaldığımızı ve sonra nasıl devam edeceğimizi özetler.

---

## 🔗 Bağlantılar

| | |
|---|---|
| **Canlı site** | https://sifaet.vercel.app |
| **GitHub repo** | https://github.com/NorthAIII/sifaet (public) |
| **Vercel proje** | north-ai/sifaet |
| **Yönetim paneli** | `/admin` (giriş: `/admin/giris`) |
| **Referans aldığımız site** | https://eatgreatmeat.co.uk/ |

## 🧱 Teknoloji
- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4**
- Başlık fontu: **Fraunces** (serif), gövde: Geist (sans)
- **Supabase** (sipariş veritabanı — opsiyonel, anahtar yokken site yine çalışır)
- **Vercel** (hosting), GitHub'a push → otomatik deploy
- Görseller şimdilik **profesyonel stok foto** (Unsplash), `public/` altında yerel

## ✅ Tamamlananlar
- **Katalog**: 5 kategori (Dana, Kuzu, Tavuk, Kıyma, Şarküteri) + örnek ürünler/fiyatlar
- **Ürün sayfası**: gerçek foto + ağırlık seçimi (ör. 500 gr / 1 kg) + adet + sepete ekle + benzer ürünler
- **Ürün kartı**: gerçek foto + hızlı "Sepete ekle" + birim fiyat ipucu
- **Sepet**: localStorage'da kalıcı, adet/silme
- **Checkout** (`/odeme`): ad+telefon, dükkandan teslim + tarih/saat, teslimde-öde / online (iyzico iskelet), delivery bir bayrakla kapalı
- **Sipariş API + onay sayfası**
- **Admin panel**: parola korumalı, sipariş listesi + durum akışı (Yeni→Hazırlanıyor→Hazır→Teslim→İptal) + müşteriye WhatsApp linki
- **Supabase entegrasyonu** + şema (`supabase/schema.sql`)
- **WhatsApp bildirimi** (CallMeBot, opsiyonel)
- **PWA**: manifest + ikonlar → telefona kısayol; "Ana ekrana ekle" ipucu
- **İletişim & Konum** sayfası (harita + WhatsApp + saatler)
- **Görsel tasarım**: EGM tarzı foto ağırlıklı arayüz, tam ekran hero, fotoğraflı kategori kartları, rafine serif tipografi
- **Marka**: temiz "ŞİFA ET" wordmark + "ŞE 1986" monogram ikon (eski boğa amblemi kaldırıldı)
- **Ana sayfa bölümleri**: hero, güven şeridi, kategoriler, Nasıl Çalışır, fırsatlar, marka hikâyesi, çok satanlar, CTA

## ⚠️ Senin yapman gerekenler (canlıda tam çalışması için)
Vercel → Project Settings → Environment Variables:
- `ADMIN_PASSWORD` — yönetim paneli parolası (zorunlu, /admin için)
- Supabase (sipariş kaydı için): yeni proje aç, `supabase/schema.sql`'i çalıştır, ekle:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- (Opsiyonel) WhatsApp bildirimi: `WHATSAPP_PHONE`, `CALLMEBOT_APIKEY`

Detaylar: [SETUP.md](SETUP.md)

## ⏭️ Sıradaki adımlar (devam edince)
1. **Gerçek ürünler + fiyatlar** → [src/lib/data.ts](src/lib/data.ts) `PRODUCTS`
2. **Gerçek adres/telefon/WhatsApp** → `src/lib/data.ts` `SHOP`
3. **Kendi ürün fotoğrafların** → `public/urunler/<slug>.jpg`, `public/kategori/<slug>.jpg`, `public/hero/hero.jpg` dosyalarını değiştir (isim aynı kalsın)
4. **Gerçek logo** (istenirse) → wordmark yerine logo görseli
5. **Delivery'i aç** → `src/lib/config.ts` `DELIVERY_ENABLED = true`
6. **iyzico online ödeme** → anahtarlar + `ONLINE_PAYMENT_LIVE = true`
7. (İleride) gerçek alan adı (domain) → Vercel'de bağlanır

## 💻 Yerelde çalıştırma
```bash
npm install
npm run dev      # http://localhost:3000
```

## 🗂️ Önemli dosyalar
- `src/lib/data.ts` — kategoriler, ürünler, dükkan bilgisi (DEĞİŞTİRİLECEK içerik burada)
- `src/lib/config.ts` — özellik bayrakları (delivery, online ödeme, teslim saatleri)
- `src/app/` — sayfalar (ana, kategori, ürün, sepet, ödeme, admin, iletişim)
- `public/urunler|kategori|hero` — görseller (stok → gerçekle değişecek)
- `supabase/schema.sql` — veritabanı şeması
- `SETUP.md` — kurulum/ortam değişkenleri

> Not: Tüm ürün görselleri şu an temsilî stok fotoğraf; et tipleriyle eşleştirildi ama dükkanın gerçek ürünleri değil.
