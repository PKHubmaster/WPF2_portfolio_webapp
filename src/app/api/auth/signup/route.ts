import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import SystemUser from '../../../../../models/SystemUserModel';

export async function POST(request: Request) {
  try {
    const { systemUserName, employerName, employerEmail, password, usertype } = await request.json();

    // Check if the username or email already exists in the database
    const existingUser = await SystemUser.findOne({ $or: [{ systemUserName }, { employerEmail }] });

    if (existingUser) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Create and save the new user
    const newUser = new SystemUser({
      systemUserName,
      employerName,
      employerEmail,
      usertype,
      password // Store the password as plain text
    });

    await newUser.save();

    return NextResponse.json({ message: 'User successfully created', systemUserId: newUser._id.toString() }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
