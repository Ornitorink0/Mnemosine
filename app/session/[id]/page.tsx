import { notFound } from 'next/navigation';
import connectToDB from '@/lib/mongodb';
import SessionModel from '@/models/Session';
import { Types } from 'mongoose';
import SessionStepperClient from '@/components/SessionStepper';
import type { ExerciseDifficulty } from '@/types';

type SessionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SessionPage({ params }: SessionPageProps) {
  await connectToDB();

  const { id: sessionId } = await params;

  if (!Types.ObjectId.isValid(sessionId)) return notFound();

  const session = await SessionModel.findById(sessionId).lean();

  if (!session) return notFound();

  type Exercise = {
    exerciseId?: string | null;
    difficulty?: ExerciseDifficulty | null;
    description?: string | null;
    timeSpent?: number | null;
    nErrors?: number | null;
  };

  const exercises =
    session.exercises?.map((ex: Exercise) => ({
      exerciseId: ex.exerciseId ?? '',
      difficulty: (ex.difficulty ?? 'easy') as ExerciseDifficulty,
      description: ex.description ?? '',
      timeSpent: ex.timeSpent ?? 0,
      nErrors: ex.nErrors ?? 0,
    })) ?? [];

  return <SessionStepperClient sessionId={sessionId} exercises={exercises} />;
}
