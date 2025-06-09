/**
 * @file        models/User.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-05-22
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Schema utente (DB)
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/models/User.ts
 */

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['super', 'admin', 'patient'], required: true },
    sessionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
    notes: { type: String, default: '' },
  },
  { _id: true, timestamps: true }
);

UserSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

// export default mongoose.models.User || mongoose.model("User", UserSchema);
export default mongoose.model('User', UserSchema);
