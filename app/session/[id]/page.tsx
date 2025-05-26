// app/sessions/[id]/page.tsx
import { notFound } from "next/navigation";
import connectToDB from "@/lib/mongodb";
import SessionModel from "@/models/Session";
import { Types } from "mongoose";

type SessionPageProps = {
  params: {
    id: string;
  };
};

export default async function SessionPage({ params }: SessionPageProps) {
  await connectToDB();

  const sessionId = params.id;

  // Validazione: se non è un ObjectId valido, ritorna 404
  if (!Types.ObjectId.isValid(sessionId)) return notFound();

  const session = (await SessionModel.findById(sessionId).lean()) as {
    _id: Types.ObjectId;
    assignedOn: string | Date;
    exercises: {
      exerciseId: string;
      description: string;
      timeSpent: number;
      nErrors: number;
    }[];
    __v: number;
  } | null;

  if (!session) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Sessione {sessionId}</h1>
      <p>Data assegnazione: {new Date(session.assignedOn).toLocaleString()}</p>
      <ul className="mt-4 space-y-2">
        {session.exercises.map((exercise: any, index: number) => (
          <li key={index} className="border p-2 rounded">
            <p>
              <strong>ID:</strong> {exercise.exerciseId}
            </p>
            <p>
              <strong>Descrizione:</strong> {exercise.description}
            </p>
            <p>
              <strong>Tempo:</strong> {exercise.timeSpent}s
            </p>
            <p>
              <strong>Errori:</strong> {exercise.nErrors}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
