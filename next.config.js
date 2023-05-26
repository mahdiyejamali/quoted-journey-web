/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      }
    ],
  },
}

module.exports = withPWA({
	pwa: {
		dest: "public",
		register: true,
    disable: process.env.NODE_ENV === 'development',
		skipWaiting: true,
	},
});

module.exports = nextConfig;
