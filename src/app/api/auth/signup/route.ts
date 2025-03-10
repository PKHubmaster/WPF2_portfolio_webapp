import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../../../lib/mongodb';
import SystemUser from '../../../../../models/SystemUserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: Request) {
  try {
    const { systemUserName, employerName, employerEmail, password, usertype } = await request.json();

    // Connect to the database
    await connectToDatabase();

    // Check if the username or email already exists
    const existingUser = await SystemUser.findOne({ $or: [{ systemUserName }, { employerEmail }] });

    if (existingUser) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a JWT token
    const token = jwt.sign({ systemUserName, employerEmail }, JWT_SECRET, { expiresIn: '7d' });

    // Create and save the new user
    const newUser = new SystemUser({
      systemUserName,
      employerName,
      employerEmail,
      usertype,
      password: hashedPassword, // Store the hashed password
      token, // Store the JWT token
    });

    await newUser.save();

    return NextResponse.json({ 
      message: 'User successfully created', 
      systemUserId: newUser._id.toString(), 
      token 
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
