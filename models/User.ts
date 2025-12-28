import mongoose, { Document, Model, Types } from 'mongoose';
import type { UserRole } from '@/types';

export interface IUserDocument extends Document {
  username: string;
  password: string;
  role: UserRole;
  sessionIds: Types.ObjectId[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['super', 'admin', 'patient'] as UserRole[],
      required: true,
    },
    sessionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
    notes: { type: String, default: '' },
  },
  {
    _id: true,
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        if (ret._id) ret._id = String(ret._id);
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const UserModel: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
