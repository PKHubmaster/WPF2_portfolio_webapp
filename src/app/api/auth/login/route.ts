import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../../../lib/mongodb';
import SystemUser from '../../../../../models/SystemUserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: Request) {
  try {
    const { systemUserName, password } = await request.json();

    // Connect to the database
    await connectToDatabase();

    // Find the user by username
    const user = await SystemUser.findOne({ systemUserName });

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Generate a new JWT token
    const token = jwt.sign(
      { systemUserId: user._id, systemUserName: user.systemUserName },
      JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // Store the token in the database
    user.token = token;
    await user.save();

    return NextResponse.json({ systemUserId: user._id.toString(), token });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
