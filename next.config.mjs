/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },

    basePath: process.env.GITHUB_ACTIONS ? '/HouseReady' : '',
    assetPrefix: process.env.GITHUB_ACTIONS ? '/HouseReady/' : '',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
