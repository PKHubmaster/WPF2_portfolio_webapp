import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../lib/mongodb';

let client: MongoClient;

async function getClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect();
  }
  return client;
}

// Function to generate a random ObjectId for the project
function generateProjectId() {
  return new ObjectId(); // This generates a valid Mongo ObjectId
}

// GET profile by ID
export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params; // Await params
    if (!id) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });
    }

    const client = await getClient();
    const profileId = new ObjectId(id);

    const profile = await client.db().collection("profiles").findOne({ _id: profileId });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...profile,
      _id: profile._id.toString(),
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

// POST request to add a new project to a profile
export async function POST(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params; // Await params
    if (!id) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { name, description, dateCompleted, githubLink, liveLink } = body;

    // Validate required fields
    if (!name || !description || !dateCompleted) {
      return NextResponse.json({ error: "Name, description, and dateCompleted are required" }, { status: 400 });
    }

    const client = await getClient();
    const profileId = new ObjectId(id);

    const profile = await client.db().collection("profiles").findOne({ _id: profileId });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Generate unique projectId as a valid ObjectId
    const projectId = generateProjectId();

    // Create the new project object with the generated ObjectId
    const newProject = {
      _id: projectId,  // Now using Mongo ObjectId for consistency
      name,
      description,
      dateCompleted,
      githubLink,
      liveLink,
    };

    // Add the new project to the profile's projects array
    const result = await client.db().collection("profiles").updateOne(
      { _id: profileId },
      { $push: { projects: newProject } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
    }

    // Return the updated profile with the new project
    const updatedProfile = await client.db().collection("profiles").findOne({ _id: profileId });
    return NextResponse.json({
      ...updatedProfile,
      _id: updatedProfile._id.toString(),
      projects: updatedProfile.projects.map((project: any) => ({
        _id: project._id.toString(),
        name: project.name,
        description: project.description,
        dateCompleted: project.dateCompleted,
        githubLink: project.githubLink,
        liveLink: project.liveLink,
      })),
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json({ error: "Error adding project" }, { status: 500 });
  }
}
