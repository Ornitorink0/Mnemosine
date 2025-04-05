import mongoose, { Document, Schema, Model } from "mongoose";

const exerciseSchema = new Schema({
  id: { type: String, required: true },
  description: String,
  timeSpent: { type: Number, default: 0 }, // Tempo impiegato per l'esercizio (in secondi, per esempio)
  usererrors: { type: Number, default: 0 }, // Numero di errori commessi
}, { _id: false });

interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  role: string;
  // createdAt: Date;
  // updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  // id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  // role: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema)
