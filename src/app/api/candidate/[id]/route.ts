import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../lib/mongodb'; // Adjust path as necessary

// MongoDB connection
let client: MongoClient;

// Connect to the MongoDB client only once and reuse the connection
async function getClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect(); // Ensure it connects when needed
  }
  return client;
}

// GET profile by ID
export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params; // Extract id properly
    if (!id) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });
    }

    const client = await getClient();
    const profileId = new ObjectId(id);

    // Fetch profile from MongoDB
    const profile = await client.db().collection("profiles").findOne({ _id: profileId });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Format the response correctly
    return NextResponse.json({
      ...profile,
      _id: profile._id.toString(), // Convert ObjectId to string
      projects: profile.projects.map((project: any) => ({
        _id: project._id.toString(),
        name: project.name,
        description: project.description,
        dateCompleted: project.dateCompleted,
        githubLink: project.githubLink,
        liveLink: project.liveLink,
      })),
      skills: profile.skills.map((skill: any) => ({
        _id: skill._id.toString(),
        name: skill.name,
      })),
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Error fetching profile" }, { status: 500 });
  }
}
