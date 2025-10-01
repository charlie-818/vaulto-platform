/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable static export for Netlify
  output: process.env.NETLIFY ? 'export' : undefined
}

module.exports = nextConfig
