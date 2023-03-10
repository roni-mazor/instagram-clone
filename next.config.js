/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
        port: '',
        pathname: '/content/v1/51648a31e4b0ce43232f830a/1524765150768-KHJD7DRJ85PM163163P2/instagram+logo.png',
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
        port: '',
        pathname: '/png-vector/20221018/ourmid/pngtree-instagram-icon-png-image_6315974.png',
      },
    ],
  },
}

module.exports = nextConfig
