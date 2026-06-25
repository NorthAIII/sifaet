# Şifa et — Kurulum

Tuzla Şifa et online sipariş sitesi. Next.js + Tailwind, Vercel'de yayınlanır.

## Yerel geliştirme

```bash
npm install
cp .env.example .env.local   # değerleri doldurun
npm run dev                  # http://localhost:3000
```

Site, hiçbir ortam değişkeni olmadan da çalışır (ürünler görüntülenir, sepet ve
checkout çalışır). Ancak **siparişlerin kaydedilmesi** ve **admin paneli** için
aşağıdaki ayarlar gerekir.

## 1) Admin paneli

- `ADMIN_PASSWORD` ortam değişkenini güçlü bir parola ile ayarlayın.
- Panel: `/admin` (giriş: `/admin/giris`).

## 2) Supabase (sipariş kaydı)

1. https://supabase.com → **New Project**.
2. **SQL Editor**'da `supabase/schema.sql` dosyasını çalıştırın (orders tablosu).
3. **Settings → API**'den şu değerleri alın ve ortam değişkenlerine ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (gizli; yalnızca sunucuda kullanılır)

Bağlı değilken site çalışır ama siparişler kaydedilmez (admin'de uyarı görünür).

## 3) WhatsApp bildirimi (opsiyonel)

Yeni sipariş gelince dükkana WhatsApp mesajı için ücretsiz **CallMeBot**:

1. https://www.callmebot.com/blog/free-api-whatsapp-messages/ adımlarını izleyin.
2. Aldığınız API anahtarını ve telefonu ekleyin:
   - `WHATSAPP_PHONE` (ör. `905xxxxxxxxx`, ülke kodlu, `+` yok)
   - `CALLMEBOT_APIKEY`

Ayarlı değilse bildirim atlanır; sipariş yine alınır. Admin panelinde her siparişte
müşteriye **WhatsApp ile yaz** butonu da vardır.

## 4) Özellik bayrakları

`src/lib/config.ts`:

- `DELIVERY_ENABLED` — adrese teslimatı açar (varsayılan kapalı).
- `ONLINE_PAYMENT_LIVE` — iyzico canlı ödeme (varsayılan kapalı; anahtarlar gelince).

## Vercel'e yayınlama

1. GitHub'a push edin.
2. Vercel'de **New Project** → repoyu seçin.
3. Yukarıdaki ortam değişkenlerini **Environment Variables**'a ekleyin.
4. Deploy.
