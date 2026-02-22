/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  serverActions: {
    bodySizeLimit: '50mb', // Increase limit for image uploads
  },
  // Mark server-only packages
  serverComponentsExternalPackages: ['sanitize-html'],
  // Optimize webpack configuration to prevent chunk loading issues
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Prevent server-only packages from being bundled on client
      config.resolve.alias = {
        ...config.resolve.alias,
        'sanitize-html': false,
      }

      // Improve chunk splitting for better loading
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 244000, // 244KB max chunk size
          },
        },
      }
    }
    return config
  },
  // Experimental features for better stability
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

export default nextConfig
