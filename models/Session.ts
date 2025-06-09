/**
 * @file        models/Session.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-05-22
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Schema sessione (DB)
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/models/Session.ts
 */

import mongoose from 'mongoose';

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

export default mongoose.model('Session', SessionSchema);
