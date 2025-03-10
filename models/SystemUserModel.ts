import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Define a TypeScript interface for the document
interface ISystemUser extends Document {
  systemUserName: string;
  employerName: string;
  employerEmail: string;
  usertype: number;
  password: string;
  token?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

// Define the schema
const systemUserSchema = new Schema<ISystemUser>({
  systemUserName: { type: String, required: true, unique: true },
  employerName: { type: String, required: true },
  employerEmail: { type: String, required: true, unique: true },
  usertype: { type: Number, required: true },
  password: { type: String, required: true },
  token: { type: String }, // Field to store JWT token
});

// Hash the password before saving the user
systemUserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err: any) {
      next(err);
    }
  } else {
    next();
  }
});

// Method to compare passwords
systemUserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate a JWT token
systemUserSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign(
    { id: this._id, systemUserName: this.systemUserName, employerEmail: this.employerEmail, usertype: this.usertype },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  this.token = token; // Store token in database
  return token;
};

// Create the model using the schema and interface
const SysUserModel = mongoose.models.SystemUsers || mongoose.model<ISystemUser>('SystemUsers', systemUserSchema);

export default SysUserModel;
