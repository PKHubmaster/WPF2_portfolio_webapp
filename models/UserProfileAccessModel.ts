import mongoose, { Schema, Document } from 'mongoose';

interface UserProfileAccess extends Document {
  systemUser: mongoose.Types.ObjectId;
  profile: mongoose.Types.ObjectId;
  requestDate: Date;
  accessStatus: 'Pending' | 'Approved' | 'Rejected';
}

const userProfileAccessSchema: Schema = new Schema(
  {
    systemUser: { type: Schema.Types.ObjectId, ref: 'SystemUser', required: true },
    profile: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    requestDate: { type: Date, default: Date.now },
    accessStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
  },
  { timestamps: true }
);

const UserProfileAccess = mongoose.model<UserProfileAccess>('UserProfileAccess', userProfileAccessSchema);

export default UserProfileAccess;
