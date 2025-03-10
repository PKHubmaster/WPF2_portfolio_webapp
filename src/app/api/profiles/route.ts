import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received data:", data); // Log for debugging

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    const profileData = {
      employeeFirstName: data.candidateFirstName, // Correct field name mapping
      employeeLastName: data.candidateLastName,   // Correct field name mapping
      employeeEmail: data.candidateEmail,         // Correct field name mapping
      address: data.address,
      phoneNumber: data.phoneNumber,
      linkedInUrl: data.linkedInUrl || "",        // Default to empty string if not provided
      projects: [],
      skills: [],
    };

    const result = await db.collection("profiles").insertOne(profileData);

    return NextResponse.json({
      message: "Profile created successfully",
      profileId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.error();
  }
}
