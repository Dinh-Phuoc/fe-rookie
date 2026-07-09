import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    compiler: {
        styledComponents: true,
    },
    // Allow build to continue even if API is unavailable
    staticPageGenerationTimeout: 10,
};

export default nextConfig;
