/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "drive.google.com",
      "drive.usercontent.google.com",
      "lh3.googleusercontent.com",
      "*.googleusercontent.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.usercontent.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
