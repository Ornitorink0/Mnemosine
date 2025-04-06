import mongoose, { Document, Schema, Model } from "mongoose";

interface IExercise extends Document {
  id: string;
  description: string;
  timeSpent: number;
  usererrors: number;
}

interface ISession extends Document {
  exercises: IExercise[];
  date: Date;
  duration: number;
}

interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  sessions: ISession[];
  notes: string[];
}

const exerciseSchema = new Schema<IExercise>(
  {
    id: { type: String, required: true },
    description: String,
    timeSpent: { type: Number, default: 0 },
    usererrors: { type: Number, default: 0 },
  },
  { _id: false }
);

const sessionSchema = new Schema<ISession>(
  {
    exercises: [exerciseSchema],
    date: { type: Date, default: Date.now },
    duration: { type: Number, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>({
  id: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  sessions: [sessionSchema],
  notes: [String],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
