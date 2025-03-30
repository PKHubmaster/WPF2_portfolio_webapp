import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../../../lib/mongodb';
import SysUserModel, { ISystemUser } from '../../../../../models/SystemUserModel';
import { generateToken } from '../../../../../lib/jwt';

export async function POST(request: Request) {
  try {
    const { systemUserName, password } = await request.json();

    const normalizedUsername = systemUserName.toLowerCase();

    await connectToDatabase();

    const user = await SysUserModel.findOne({ systemUserName: normalizedUsername }) as ISystemUser | null;

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = generateToken({
        userId: user._id.toString(),
        username: user.systemUserName,
        userType: user.usertype, // Include userType here
      });

      return NextResponse.json({
        token,
        systemUserId: user._id.toString(),
        userType: user.usertype, // Include userType in the response
      });
    } else {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
