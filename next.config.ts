import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/d",
				destination: "/dashboard",
			},
			{
				source: "/d/workspaces",
				destination: "/dashboard/workspaces",
			},
		];
	},
};

export default nextConfig;
