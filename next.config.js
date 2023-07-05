/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
}

// module.exports = nextConfig

module.exports = {
    ...nextConfig,
    devIndicators: {
        autoPrerender: false,
    },
    env: {
        NEXT_PUBLIC_VERCEL_LOGGING: '1',
    },
}
// TODO: revert