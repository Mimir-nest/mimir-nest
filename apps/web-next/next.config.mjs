import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  // Ensure Next infers the monorepo workspace root correctly for tracing
  outputFileTracingRoot: path.resolve(__dirname, "..", ".."),
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "recharts",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-slot",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-popover",
      "@radix-ui/react-accordion",
      "sonner",
    ],
  },
  // Proxy /api/* to an external API only when `NEXT_PUBLIC_API_BASE_URL` is set.
  async rewrites() {
    const external = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (external) {
      return [
        {
          source: "/api/:path*",
          destination: `${external}/api/:path*`,
        },
      ];
    }
    // Otherwise handle /api locally so server-side routes can read the JSON files
    return [];
  },
  webpack(config) {
    // Resolve @shared to the monorepo shared package
    config.resolve.alias = {
      ...config.resolve.alias,
      "@shared": path.resolve(__dirname, "../../packages/shared/src"),
    };
    return config;
  },
  // Allow images from all origins for company logos
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
