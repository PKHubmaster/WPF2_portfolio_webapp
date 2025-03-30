import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../../../lib/mongodb';
import SysUserModel, { ISystemUser } from '../../../../../models/SystemUserModel';
import { generateToken } from '../../../../../lib/jwt';

export async function POST(request: Request) {
  try {
    const { systemUserName, password } = await request.json();

    // Ensure username is always lowercase for consistent lookup
    const normalizedUsername = systemUserName.toLowerCase();

    // Connect to the database
    await connectToDatabase();

    // Find the user in the systemusers collection
    const user = await SysUserModel.findOne({ systemUserName: normalizedUsername }) as ISystemUser | null;

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Generate JWT token with user data
      const token = generateToken({ userId: user._id.toString(), username: user.systemUserName });

      // Return the JWT token along with the systemUserId
      return NextResponse.json({ token, systemUserId: user._id.toString() });
    } else {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
