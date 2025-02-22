import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import SysUserModel from '../../../../../models/SystemUserModel';

// Ensure Mongoose is connected
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;  // Connection already established
  await mongoose.connect('mongodb://localhost/portfolio');  // Replace with your MongoDB URI
};

// Handle signup logic
export async function POST(request: NextRequest) {
  const { systemUserName, employerName, employerEmail, password, usertype } = await request.json();

  // Validate the incoming data
  if (!systemUserName || !employerName || !employerEmail || !password || !usertype) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Connect to the database
  await connectToDatabase();

  try {
    // Check if the username or email already exists
    const existingUser = await SysUserModel.findOne({ $or: [{ systemUserName }, { employerEmail }] });

    if (existingUser) {
      return NextResponse.json({ error: 'Username or Email already exists.' }, { status: 409 });
    }

    // Create a new user document
    const newUser = new SysUserModel({
      systemUserName,
      employerName,
      employerEmail,
      usertype,
      password,  // The password will be hashed automatically due to the pre-save hook
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response
    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
  } catch (err) {
    console.error('Error creating user:', err);
    return NextResponse.json({ error: 'Server error, please try again later.' }, { status: 500 });
  }
}
