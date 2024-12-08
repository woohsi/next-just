/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["@react-pdf/renderer"],
  // },
};

module.exports = nextConfig
