/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**', // This allows any path under the hostname
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port : '',
                pathname: '/**'
            }
        ],
    },
    reactStrictMode: true
};

export default nextConfig;
