import { notFound } from "next/navigation";
import connectToDB from "@/lib/mongodb";
import SessionModel from "@/models/Session";
import { Types } from "mongoose";
import SessionStepperClient from "@/components/SessionStepper";

type SessionPageProps = {
  params: {
    id: string;
  };
};

/* -------------------------------------------------------------------------- */
/*               TODO: Implement loading of exercise components               */
/* -------------------------------------------------------------------------- */

export default async function SessionPage({ params }: SessionPageProps) {
  await connectToDB();

  const sessionId = params.id;

  if (!Types.ObjectId.isValid(sessionId)) return notFound();

  const session = await SessionModel.findById(sessionId).lean();

  if (!session) return notFound();

  type Exercise = {
    exerciseId?: string | null;
    description?: string | null;
    timeSpent?: number | null;
    nErrors?: number | null;
  };

  const exercises =
    session.exercises?.map((ex: Exercise) => ({
      exerciseId: ex.exerciseId ?? "",
      description: ex.description ?? "",
      timeSpent: ex.timeSpent ?? 0,
      nErrors: ex.nErrors ?? 0,
    })) ?? [];

  return <SessionStepperClient exercises={exercises} />;
}
