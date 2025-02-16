import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../../../lib/mongodb';
import SystemUser from '../../../../../models/SystemUserModel';

export async function POST(request: Request) {
  try {
    const { systemUserName, password } = await request.json();

    // Connect to the database
    await connectToDatabase();

    // Find the user in the systemusers collection
    const user = await SystemUser.findOne({ systemUserName });

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const systemUserId = user._id.toString();
      return NextResponse.json({ systemUserId });
    } else {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
