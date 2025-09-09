import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				pathname: "/t/p/**",
			},
		],
		deviceSizes: [342, 500, 780, 1280],
		imageSizes: [185, 300, 500, 780],
	},
	devIndicators: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		useCache: true,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
