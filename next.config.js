/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },]
  },
  typescript: {
    // TODO: Remove it for later
    ignoreBuildErrors: true,
  },
  eslint: {
    // TODO: Remove it for later
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
