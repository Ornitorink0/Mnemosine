import mongoose, { Document, Model, Types } from 'mongoose';
import type { SessionStatus, ExerciseDifficulty } from '@/types';

export interface IExerciseResultDocument {
  exerciseId: string;
  difficulty: ExerciseDifficulty;
  description?: string;
  timeSpent: number;
  nErrors: number;
  score?: number;
  completedAt?: Date;
  // Metadata estesi per raccolta dati clinici intensiva
  metadata?: {
    completedTimestamp?: string;
    accuracyRate?: number;
    errorRate?: number;
    timeSpentSeconds?: number;
    timeSpentMinutes?: string;
    userAgent?: string;
    difficulty?: string;
    exerciseId?: string;
    // Altri metadata specifici per tipo di esercizio
    [key: string]: unknown;
  };
}

export interface ISessionDocument extends Document {
  patientId: Types.ObjectId;
  assignedBy?: Types.ObjectId;
  status: SessionStatus;
  exercises: IExerciseResultDocument[];
  assignedOn: Date;
  startedOn?: Date;
  completedOn?: Date;
  totalErrors: number;
  totalDuration: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseResultSchema = new mongoose.Schema<IExerciseResultDocument>(
  {
    exerciseId: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'] as ExerciseDifficulty[],
      required: true,
    },
    description: String,
    timeSpent: { type: Number, default: 0 },
    nErrors: { type: Number, default: 0 },
    score: Number,
    completedAt: Date,
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const SessionSchema = new mongoose.Schema<ISessionDocument>(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: [
        'pending',
        'in-progress',
        'completed',
        'cancelled',
      ] as SessionStatus[],
      default: 'pending',
    },
    exercises: [ExerciseResultSchema],
    assignedOn: { type: Date, default: Date.now },
    startedOn: Date,
    completedOn: Date,
    totalErrors: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
    notes: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        if (ret._id) ret._id = String(ret._id);
        if (ret.patientId) ret.patientId = String(ret.patientId);
        if (ret.assignedBy) ret.assignedBy = String(ret.assignedBy);
        delete ret.__v;
        return ret;
      },
    },
  }
);

const SessionModel: Model<ISessionDocument> =
  mongoose.models.Session ||
  mongoose.model<ISessionDocument>('Session', SessionSchema);

export default SessionModel;
