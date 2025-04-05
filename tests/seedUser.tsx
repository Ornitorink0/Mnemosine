// scripts/seedUser.ts

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "@/models/user";
import { connectToDB } from "@/lib/mongodb";
import dotenv from "dotenv"
dotenv.config()

console.log("URI LETTA:", process.env.MONGODB_URI)

async function seed() {
  await connectToDB();

  const username = "testuser";
  const rawPassword = "supersecret";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const exists = await User.findOne({ username });
  if (exists) {
    console.log("Utente già esistente");
    return;
  }

  await User.create({ username, password: hashedPassword });

  console.log("Utente creato con successo!");
  mongoose.disconnect();
}

seed().catch(console.error);
