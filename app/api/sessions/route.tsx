import connectToDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import SessionModel from "@/models/Session";
import mongoose from "mongoose";

export async function GET() {
  await connectToDB();
  const sessions = await SessionModel.find().lean();

  const formatted = sessions.map((session) => ({
    _id: session._id.toString(),
    assignedOn: session.assignedOn?.toISOString(),
    completedOn: session.completedOn?.toISOString(),
    exercises:
      session.exercises?.map((ex) => ({
        exerciseId: ex.id.toString(),
        description: ex.description,
        timeSpent: ex.timeSpent,
        nErrors: ex.nErrors,
      })) || [],
  }));

  return NextResponse.json(formatted);
}

export async function POST(request: Request) {
  console.log("POST /api/sessions called");
  try {
    const body = await request.json();
    console.log("Request body:", body);
    const { patientId, exercises } = body;

    if (!patientId || !Array.isArray(exercises)) {
      console.warn("Missing required fields:", { patientId, exercises });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();
    console.log("Connected to DB");

    // 1. Crea una nuova sessione
    const newSession = new SessionModel({
      exercises,
      assignedOn: new Date(),
    });

    await newSession.save();
    console.log("New session saved:", newSession);

    // 2. Aggiungi l'ID della sessione salvata all'utente
    const updatedUser = await mongoose.model("User").findByIdAndUpdate(
      patientId,
      {
        $push: { sessionIds: newSession._id },
      },
      { new: true }
    );
    console.log("User updated with new session:", updatedUser);

    return NextResponse.json({
      sessionId: newSession._id.toString(),
      assignedOn: newSession.assignedOn?.toISOString(),
    });
  } catch (error) {
    console.error("Errore nella POST /api/sessions:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}

// export async function DELETE(request: Request) {
//   const { sessionId } = await request.json();
//   if (!sessionId) {
//     return NextResponse.json(
//       { error: "Session ID is required" },
//       { status: 400 }
//     );
//   }

//   await connectToDB();
//   const deletedSession = await SessionModel.findByIdAndDelete(sessionId);

//   if (!deletedSession) {
//     return NextResponse.json({ error: "Session not found" }, { status: 404 });
//   }

//   return NextResponse.json({
//     message: "Session deleted successfully",
//     sessionId: deletedSession._id.toString(),
//   });
// }

// export async function PUT(request: Request) {
//   const { sessionId, userId } = await request.json();
//   if (!sessionId || !userId) {
//     return NextResponse.json(
//       { error: "Session ID and User ID are required" },
//       { status: 400 }
//     );
//   }

//   await connectToDB();
//   const updatedSession = await SessionModel.findByIdAndUpdate(
//     sessionId,
//     { userId },
//     { new: true }
//   );

//   if (!updatedSession) {
//     return NextResponse.json({ error: "Session not found" }, { status: 404 });
//   }

//   return NextResponse.json({
//     _id: updatedSession._id.toString(),
//     userId: updatedSession.userId.toString(),
//     createdAt: updatedSession.createdAt.toISOString(),
//     updatedAt: updatedSession.updatedAt.toISOString(),
//   });
// }
