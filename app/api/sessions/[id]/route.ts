import connectToDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import SessionModel from '@/models/Session';
import mongoose from 'mongoose';

/**
 * API per ottenere i dettagli di una singola sessione
 * Automaticamente aggiorna lo status a "in-progress" se è "pending"
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID sessione non valido' },
        { status: 400 }
      );
    }

    await connectToDB();

    const session = await SessionModel.findById(id);

    if (!session) {
      return NextResponse.json(
        { error: 'Sessione non trovata' },
        { status: 404 }
      );
    }

    // Se la sessione è pending e viene aperta, impostala come in-progress
    if (session.status === 'pending') {
      session.status = 'in-progress';
      session.startedOn = new Date();
      await session.save();
    }

    return NextResponse.json({
      _id: session._id.toString(),
      patientId: session.patientId.toString(),
      status: session.status,
      exercises: session.exercises,
      assignedOn: session.assignedOn,
      startedOn: session.startedOn,
      completedOn: session.completedOn,
      totalErrors: session.totalErrors,
      totalDuration: session.totalDuration,
      notes: session.notes,
    });
  } catch (error) {
    console.error('Errore nel recupero della sessione:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
