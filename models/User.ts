import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
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
