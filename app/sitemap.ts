import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://silav-movie.vercel.app';
  return [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/browse`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/genres`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/watchlist`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${base}/request`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/profile`, changeFrequency: 'monthly', priority: 0.4 },
  ];
}
