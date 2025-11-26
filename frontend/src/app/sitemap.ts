import { MetadataRoute } from 'next';
import { api } from '@/lib/api';
import { Product } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'http://localhost:3000';
  let products: Product[] = [];

  try {
    products = await api.getProducts();
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
  }

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
  ];
}
