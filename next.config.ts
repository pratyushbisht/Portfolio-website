import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Hide the floating "N" dev-tools badge. It only ever shows under `npm run dev`
  // (never in production), but it was being mistaken for page content.
  devIndicators: false,
  // 75 for photos, 90 for screenshots and UI (text edges smear at 75).
  images: { qualities: [75, 90] },
};

export default nextConfig;
