/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		// domains: ["hokei-backup.s3.amazonaws.com", 'hokei-vto.s3.amazonaws.com'],
		// unoptimized: false,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's3.amazonaws.com',
				port: '',
				pathname: '/hokei-backup/**',
			},
		]
	},
	// webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
	// 	config.experiments.asyncWebAssembly = true
	// 	if (!isServer) {
	// 		config.externals.push('fs');
	// 		// config.resolve.fallback = { fs: false };
	// 	}
	// 	// config.optimization.minimize = true;
	// 	return config;
	// },
};

export default nextConfig;