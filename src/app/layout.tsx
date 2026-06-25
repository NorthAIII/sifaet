import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Şifa et · Tuzla — Online Et Siparişi",
    template: "%s · Şifa et",
  },
  description:
    "Tuzla Şifa et — taze dana, kuzu, tavuk, kıyma ve şarküteri ürünlerini online seçin, dükkandan teslim alın. Şifa Olsun.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Şifa et",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
