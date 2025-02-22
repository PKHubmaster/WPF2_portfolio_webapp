import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    // Fetch candidates from the 'profiles' collection
    const candidates = await db.collection("profiles")
      .find({}, { projection: { _id: 1, employeeFirstName: 1, employeeLastName: 1 } })
      .toArray();

    // Fetch employers from the 'systemusers' collection where usertype = 1
    const employers = await db.collection("systemusers")
      .find({ usertype: 1 }, { projection: { _id: 1, employerName: 1, employerEmail: 1 } })
      .toArray();

    return NextResponse.json({ candidates, employers });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    // Convert systemUser and profile to ObjectId properly
    const requestData = {
      systemUser: new ObjectId(data.systemUser), // Convert employerId to ObjectId
      profile: new ObjectId(data.profile),       // Convert selectedCandidate to ObjectId
      requestDate: new Date(data.requestDate).toISOString(), // Convert Date to ISO string
      accessStatus: data.accessStatus,           // Keep accessStatus as-is
    };

    // Insert new record into 'userprofileaccess' collection
    const result = await db.collection("userprofileaccess").insertOne(requestData);

    return NextResponse.json({ message: "Request submitted successfully", result });
  } catch (error) {
    console.error("Error creating profile access request:", error);
    return NextResponse.error();
  }
}
