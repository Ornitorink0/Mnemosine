/**
 * @file        app/api/users/route.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-05-22
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Funzioni server-side per aggiungere un utente
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/app/api/users/route.ts
 */

import connectToDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import UserModel from '@/models/User';

export async function GET() {
  await connectToDB();
  const users = await UserModel.find().lean();

  const formatted = users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));

  return NextResponse.json(formatted);
}
