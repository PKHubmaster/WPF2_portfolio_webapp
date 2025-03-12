import mongoose, { Document, Schema, ObjectId } from 'mongoose';  // Import ObjectId from mongoose
import bcrypt from 'bcryptjs';

// Define a TypeScript interface for the document
export interface ISystemUser extends Document {
  _id: ObjectId;  // Ensure _id is of type ObjectId
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
  password: { type: String, required: true },  // Password field
});

// Hash the password before saving the user
systemUserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err: any) {
      next(err);  // Pass the error to the next middleware
    }
  } else {
    return next();
  }
});

// Method to compare passwords
systemUserSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the model using the schema and interface
const SysUserModel = mongoose.model<ISystemUser>('SystemUsers', systemUserSchema);

export default SysUserModel;
