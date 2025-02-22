import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";

// Create User (POST)
export async function POST(req: Request) {
  try {
    await connectToDB();
    const { name, email, password } = await req.json();

    // Validate request data
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Get Users (GET)
export async function GET() {
  try {
    await connectToDB();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// Update User (PUT)
export async function PUT(req: Request) {
  try {
    await connectToDB();
    const { id, name, email } = await req.json();

    // Validate request data
    if (!id || !name || !email) {
      return NextResponse.json({ error: "ID, name, and email are required" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// Delete User (DELETE)
export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const { id } = await req.json();

    // Validate request data
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
