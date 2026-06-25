import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Şifa et · Tuzla",
    short_name: "Şifa et",
    description:
      "Tuzla Şifa et — taze et siparişi, dükkandan teslim. Şifa Olsun.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#15366b",
    lang: "tr",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
