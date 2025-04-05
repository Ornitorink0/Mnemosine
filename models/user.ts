import mongoose, { Document, Schema, Model } from "mongoose";

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
