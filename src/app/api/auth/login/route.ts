import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../../../lib/mongodb';
import SysUserModel, { ISystemUser } from '../../../../../models/SystemUserModel'; // Import the model and interface
import { generateToken } from '../../../../../lib/jwt'; // Import the generateToken function

export async function POST(request: Request) {
  try {
    const { systemUserName, password } = await request.json();

    // Connect to the database
    await connectToDatabase();

    // Find the user in the systemusers collection and explicitly type the result as ISystemUser
    const user = await SysUserModel.findOne({ systemUserName }) as ISystemUser | null;

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Handle _id as ObjectId explicitly
      const userId = user._id.toString(); // user._id is now of type ObjectId, so toString() should work.
      const username = user.systemUserName; // systemUserName should be a string.

      // Generate JWT token with user data (userId and username)
      const token = generateToken({ userId, username });

      // Return the JWT token along with the systemUserId
      return NextResponse.json({ token, systemUserId: userId });
    } else {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
