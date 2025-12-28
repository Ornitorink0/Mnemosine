// scripts/seedUser.ts

import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDB } from '@/lib/mongodb';
import dotenv from 'dotenv';
dotenv.config();

console.log('URI LETTA:', process.env.MONGODB_URI);

async function seed() {
  await connectToDB();

  const username = 'adtest';
  const rawPassword = 'adtest';
  const role = 'super';
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const exists = await User.findOne({ username });
  if (exists) {
    console.log('Utente già esistente');
    return;
  }

  await User.create({ username, password: hashedPassword, role });

  console.log('Utente creato con successo!');
  mongoose.disconnect();
}

seed().catch(console.error);
