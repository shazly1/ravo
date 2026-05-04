import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { sanitizeString, sanitizeEmail, isValidEmail, isStrongPassword } from '@/lib/validation';

// GET all admins (super admin only — enforced in middleware)
export async function GET() {
  try {
    await connectDB();
    const admins = await User.find({ role: 'admin' }).lean();
    return NextResponse.json({ admins });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create admin (super admin only)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = sanitizeString(body.name);
    const email = sanitizeEmail(body.email);
    const password = typeof body.password === 'string' ? body.password : '';

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const admin = await User.create({ name, email, password, role: 'admin' });

    return NextResponse.json(
      { admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin create error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
