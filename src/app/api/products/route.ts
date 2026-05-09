import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import User from '@/models/User';
import Category from '@/models/Category';
import { getRequestUser } from '@/lib/auth';
import { sanitizeString, isValidUrl } from '@/lib/validation';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(99999, Math.max(1, parseInt(searchParams.get('limit') || '12')));
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    const query: Record<string, unknown> = {};

    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }
    if (search) {
      const sanitized = sanitizeString(search).slice(0, 100);
      query.$or = [
        { title: { $regex: sanitized, $options: 'i' } },
        { description: { $regex: sanitized, $options: 'i' } },
      ];
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug icon')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      products,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    const title = sanitizeString(body.title);
    const description = sanitizeString(body.description);
    const image = sanitizeString(body.image);
    const affiliateLink = sanitizeString(body.affiliateLink);
    const category = sanitizeString(body.category);
    const affiliateStore = body.affiliateStore || 'other';
    const featured = Boolean(body.featured);
    const price = body.price ? parseFloat(body.price) : undefined;
    const currency = sanitizeString(body.currency || 'USD').slice(0, 10);

    if (!title || !description || !image || !affiliateLink || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isValidUrl(affiliateLink)) {
      return NextResponse.json({ error: 'Invalid affiliate link URL' }, { status: 400 });
    }

    if (image && !isValidUrl(image)) {
      return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
    }

    await connectDB();

    const product = await Product.create({
      title,
      description,
      image,
      price,
      currency,
      category,
      affiliateLink,
      affiliateStore,
      featured,
      createdBy: user.userId,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
