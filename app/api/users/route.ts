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
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));

  return NextResponse.json(formatted);
}
