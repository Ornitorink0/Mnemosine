/**
 * @file        app/session/[id]/page.tsx
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-05-26
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Pagina per creare e gestire sessioni
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/app/session/%5Bid%5D/page.tsx
 */

import { notFound } from 'next/navigation';
import connectToDB from '@/lib/mongodb';
import SessionModel from '@/models/Session';
import { Types } from 'mongoose';
import SessionStepperClient from '@/components/SessionStepper';

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectToDB();

  if (!Types.ObjectId.isValid(id)) return notFound();

  const session = await SessionModel.findById(id).lean();

  if (!session) return notFound();

  type Exercise = {
    exerciseId?: string | null;
    description?: string | null;
    timeSpent?: number | null;
    nErrors?: number | null;
  };

  const exercises =
    session.exercises?.map((ex: Exercise) => ({
      exerciseId: ex.exerciseId ?? '',
      description: ex.description ?? '',
      timeSpent: ex.timeSpent ?? 0,
      nErrors: ex.nErrors ?? 0,
    })) ?? [];

  return <SessionStepperClient exercises={exercises} />;
}
