-- Şifa et — Supabase şeması
-- Supabase projesi oluşturduktan sonra SQL Editor'da bu dosyayı çalıştırın.

create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  created_at    timestamptz not null default now(),
  customer_name text not null,
  customer_phone text not null,
  method        text not null check (method in ('pickup', 'delivery')),
  pickup_date   date,
  pickup_slot   text,
  address       text,
  payment       text not null check (payment in ('on_pickup', 'online')),
  note          text,
  items         jsonb not null,
  total         numeric(10,2) not null,
  status        text not null default 'new'
                check (status in ('new','preparing','ready','completed','cancelled'))
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

-- RLS açık: yalnızca service_role (sunucu) erişir. Anon erişim yok.
alter table public.orders enable row level security;
