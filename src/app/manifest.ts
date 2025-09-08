import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "vilmbox",
		short_name: "vilmbox",
		theme_color: "#09090b",
		background_color: "#fafafa",
		display: "standalone",
		description: "Discover movies and TV show.",
		orientation: "natural",
		start_url: "/",
		categories: ["entertainment"],
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
			{
				src: "/icon1.svg",
				sizes: "any",
				type: "image/svg+xml",
			},
			{
				src: "/icon2.png",
				sizes: "96x96",
				type: "image/png",
			},
			{
				src: "/icon3.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/icon4.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
