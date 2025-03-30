import mongoose, { Document, Schema, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define a TypeScript interface for the document
export interface ISystemUser extends Document {
  _id: ObjectId;
  systemUserName: string;
  employerName: string;
  employerEmail: string;
  usertype: number;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the schema
const systemUserSchema = new Schema<ISystemUser>({
  systemUserName: { type: String, required: true, unique: true },
  employerName: { type: String, required: true },
  employerEmail: { type: String, required: true, unique: true },
  usertype: { type: Number, required: true },
  password: { type: String, required: true },
});

// Pre-save middleware for converting username to lowercase and hashing password
systemUserSchema.pre('save', async function (next) {
  // Convert username to lowercase before saving
  if (this.isModified('systemUserName') || this.isNew) {
    this.systemUserName = this.systemUserName.toLowerCase();
  }

  // Hash password before saving
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err: any) {
      return next(err);
    }
  }

  next();
});

// Method to compare passwords
systemUserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the model using the schema and interface
const SysUserModel = mongoose.model<ISystemUser>('SystemUsers', systemUserSchema);

export default SysUserModel;
