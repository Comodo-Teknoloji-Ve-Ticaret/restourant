/** @type {import('next').NextConfig} */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const pagesBasePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

const nextConfig = {
  output: "export",
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
