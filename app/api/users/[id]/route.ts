/**
 * @file        app/api/users/[id]/route.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-05-22
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Funzioni server-side per gestire un utente
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/app/api/users/%5Bid%5D/route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();
    const updated = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updated) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error('Errore nella PUT:', err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();
    const deleted = await UserModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Errore nella DELETE:', err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
