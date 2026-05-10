import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import { getRequestUser } from '@/lib/auth';
import { sanitizeString } from '@/lib/validation';

function slugify(str: string): string {
  return str
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '')
    .toLowerCase() || Date.now().toString();
}

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 }).lean();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Categories GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const name = sanitizeString(body.name);
    const icon = sanitizeString(body.icon || '🏷️').slice(0, 10);

    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const slug = slugify(name);
    await connectDB();

    const existing = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existing) return NextResponse.json({ error: 'Category already exists' }, { status: 409 });

    const category = await Category.create({ name, slug, icon });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error('Categories POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
