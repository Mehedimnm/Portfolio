import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server's resources (HMR, chunks) to be loaded from these
  // hosts on the local network — needed to preview on a phone via the PC's IP.
  allowedDevOrigins: ["192.168.0.101", "localhost"],
  images: {
    // Allow our own trusted SVG project thumbnails to be served by next/image.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
