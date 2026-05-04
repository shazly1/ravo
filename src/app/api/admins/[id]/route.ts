import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getRequestUser } from '@/lib/auth';
import mongoose from 'mongoose';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requester = await getRequestUser(req);
    if (!requester || requester.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!mongoose.isValidObjectId(params.id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // Cannot delete yourself
    if (requester.userId === params.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    await connectDB();
    const admin = await User.findOneAndDelete({ _id: params.id, role: 'admin' });
    if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
