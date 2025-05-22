import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  exerciseId: String,
  description: String,
  timeSpent: Number,
  nErrors: Number,
});

const SessionSchema = new mongoose.Schema({
  sessionId: Number,
  exercises: [ExerciseSchema],
  assignedOn: Date,
  completedOn: Date,
  totalErrors: Number,
  duration: Number,
});

export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);
