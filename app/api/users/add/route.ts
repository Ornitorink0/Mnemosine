/**
 * @file        lib/auth.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-06-08
 * @updated     2025-06-08
 * @license     MIT
 * @version     version (see package.json)
 * @brief       Brief description of the file
 *
 * @description Detailed description of the file
 *
 * @remarks
 * Additional notes or technical details
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/lib/auth.ts
 */

import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  console.log('POST /api/users/add');
  try {
    console.log('Connessione al database...');
    await connectToDB();
    console.log('Connesso!');

    const body = await req.json();
    console.log('Body:', body);

    console.log("Controllo se l'username esiste...");
    const existingUser = await User.findOne({ name: body.name });
    if (existingUser) {
      console.log('Username già in uso!');
      return NextResponse.json(
        { error: 'Username già in uso' },
        { status: 400 }
      );
    }

    console.log('Hash della password...');
    const hashedPassword = await bcrypt.hash(body.password, 10);
    console.log('Hashata!');
    body.password = hashedPassword;

    console.log('Creazione nuovo utente...');
    const newUser = new User(body);
    await newUser.save();
    console.log('Creato!');

    return NextResponse.json(
      { message: 'Utente creato', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Errore nella creazione utente:', error);
    return NextResponse.json({ error: 'Errore server' }, { status: 500 });
  }
}
