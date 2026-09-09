import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://vipstoreios.github.io/silav-movie';

  return [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/browse`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/genres`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/watchlist`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${base}/request`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/profile`, changeFrequency: 'monthly', priority: 0.4 },
  ];
}
