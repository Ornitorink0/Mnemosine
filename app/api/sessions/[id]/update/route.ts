import connectToDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import SessionModel from '@/models/Session';
import mongoose from 'mongoose';

/**
 * API per aggiornare il progresso di una sessione in tempo reale
 * Raccoglie dati intensivi per scopi clinici
 */
export async function PATCH(
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

    const body = await request.json();
    const { exerciseIndex, result, status } = body;

    const session = await SessionModel.findById(id);

    if (!session) {
      return NextResponse.json(
        { error: 'Sessione non trovata' },
        { status: 404 }
      );
    }

    // Aggiorna lo status della sessione se fornito
    if (status) {
      session.status = status;

      if (status === 'in-progress' && !session.startedOn) {
        session.startedOn = new Date();
      }

      if (status === 'completed' && !session.completedOn) {
        session.completedOn = new Date();
      }
    }

    // Aggiorna i dati dell'esercizio specifico
    if (exerciseIndex !== undefined && result) {
      const exercise = session.exercises[exerciseIndex];

      if (exercise) {
        // Salva tutti i dati clinici dell'esercizio
        exercise.timeSpent = result.timeSpent || 0;
        exercise.nErrors = result.errors || 0;
        exercise.score = result.score || 0;
        exercise.completedAt = new Date();

        // Metadata intensivi per analisi clinica
        exercise.metadata = {
          ...result.metadata,
          // Timestamp di completamento preciso
          completedTimestamp: new Date().toISOString(),
          // Dati di performance
          accuracyRate: result.score ? result.score / 100 : 0,
          errorRate: result.errors || 0,
          // Dati temporali
          timeSpentSeconds: result.timeSpent || 0,
          timeSpentMinutes: ((result.timeSpent || 0) / 60).toFixed(2),
          // Browser info per contestualizzazione
          userAgent: request.headers.get('user-agent') || 'unknown',
          // Indicatori di difficoltà
          difficulty: exercise.difficulty,
          exerciseId: exercise.exerciseId,
        };

        // Aggiorna i totali della sessione
        session.totalDuration += result.timeSpent || 0;
        session.totalErrors += result.errors || 0;
      }
    }

    await session.save();

    return NextResponse.json({
      success: true,
      session: {
        _id: session._id.toString(),
        status: session.status,
        totalDuration: session.totalDuration,
        totalErrors: session.totalErrors,
        exercises: session.exercises.map((ex) => ({
          exerciseId: ex.exerciseId,
          difficulty: ex.difficulty,
          timeSpent: ex.timeSpent,
          nErrors: ex.nErrors,
          score: ex.score,
          completedAt: ex.completedAt,
        })),
      },
    });
  } catch (error) {
    console.error("Errore nell'aggiornamento della sessione:", error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
