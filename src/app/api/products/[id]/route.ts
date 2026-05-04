import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { getRequestUser } from '@/lib/auth';
import { sanitizeString, isValidUrl } from '@/lib/validation';
import mongoose from 'mongoose';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!mongoose.isValidObjectId(params.id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    await connectDB();
    const product = await Product.findById(params.id)
      .populate('category', 'name slug icon')
      .populate('createdBy', 'name')
      .lean();

    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Product GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!mongoose.isValidObjectId(params.id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const body = await req.json();
    const updates: Record<string, unknown> = {};

    if (body.title !== undefined) updates.title = sanitizeString(body.title);
    if (body.description !== undefined) updates.description = sanitizeString(body.description);
    if (body.category !== undefined) updates.category = sanitizeString(body.category);
    if (body.affiliateStore !== undefined) updates.affiliateStore = body.affiliateStore;
    if (body.featured !== undefined) updates.featured = Boolean(body.featured);
    if (body.currency !== undefined) updates.currency = sanitizeString(body.currency).slice(0, 10);
    if (body.price !== undefined) updates.price = body.price ? parseFloat(body.price) : undefined;

    if (body.affiliateLink !== undefined) {
      const link = sanitizeString(body.affiliateLink);
      if (!isValidUrl(link)) return NextResponse.json({ error: 'Invalid affiliate link' }, { status: 400 });
      updates.affiliateLink = link;
    }
    if (body.image !== undefined) {
      const img = sanitizeString(body.image);
      if (!isValidUrl(img)) return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
      updates.image = img;
    }

    await connectDB();
    const product = await Product.findByIdAndUpdate(params.id, updates, { new: true });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Product PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!mongoose.isValidObjectId(params.id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    await connectDB();
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Product DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
