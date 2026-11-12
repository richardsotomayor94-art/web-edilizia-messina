import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: lavori in casa a ${site.city}`,
    short_name: site.name,
    description: site.description,
    lang: "it",
    start_url: "/",
    display: "browser",
    background_color: "#f4efe6",
    theme_color: "#1c1b19",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
