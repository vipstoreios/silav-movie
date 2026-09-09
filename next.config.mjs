const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGitHubPages ? '/silav-movie' : '',
  assetPrefix: isGitHubPages ? '/silav-movie/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
