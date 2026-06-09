import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB();

    const products = await Product.find()
      .select('_id createdAt')
      .lean();

    const productUrls = products.map((p: any) => ({
      url: `https://ravo-self.vercel.app/product/${p._id}`,
      lastModified: p.createdAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [
      {
        url: 'https://ravo-self.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://ravo-self.vercel.app/products',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: 'https://ravo-self.vercel.app/categories',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://ravo-self.vercel.app/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      ...productUrls,
    ];
  } catch (error) {
    return [
      { url: 'https://ravo-self.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
      { url: 'https://ravo-self.vercel.app/products', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      { url: 'https://ravo-self.vercel.app/categories', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
      { url: 'https://ravo-self.vercel.app/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];
  }
}