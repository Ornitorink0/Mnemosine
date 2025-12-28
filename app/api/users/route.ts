import connectToDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import UserModel from '@/models/User';

export async function GET() {
  await connectToDB();
  const users = await UserModel.find().lean();

  const formatted = users.map((user) => ({
    _id: user._id.toString(),
    username: user.username,
    role: user.role,
    sessionIds: user.sessionIds?.map((id) => id.toString()) || [],
    notes: user.notes || '',
    createdAt:
      user.createdAt instanceof Date
        ? user.createdAt.toISOString()
        : user.createdAt,
    updatedAt:
      user.updatedAt instanceof Date
        ? user.updatedAt.toISOString()
        : user.updatedAt,
  }));

  return NextResponse.json(formatted);
}
