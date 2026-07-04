import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Page routes are statically generated at build time.
    // API routes (e.g. /api/contact) remain as serverless functions.
    // Do NOT use output:"export" — it would remove API route support.
};

export default nextConfig;
