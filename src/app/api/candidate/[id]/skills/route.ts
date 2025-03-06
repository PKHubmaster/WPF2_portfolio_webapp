import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../../lib/mongodb'; // Adjust path as necessary

let client: MongoClient;

async function getClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect();
  }
  return client;
}

// Function to generate a random ObjectId for the skill
function generateSkillId() {
  return new ObjectId(); // This generates a valid Mongo ObjectId for each new skill
}

// POST request to add a new skill to a profile
export async function POST(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params; // Await params
    if (!id) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { name } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 });
    }

    const client = await getClient();
    const profileId = new ObjectId(id);

    const profile = await client.db().collection("profiles").findOne({ _id: profileId });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Generate unique skillId as a valid ObjectId
    const skillId = generateSkillId();

    // Create the new skill object with the generated ObjectId
    const newSkill = {
      _id: skillId,  // Now using Mongo ObjectId for the skill
      name,
    };

    // Add the new skill to the profile's skills array
    const result = await client.db().collection("profiles").updateOne(
      { _id: profileId },
      { $push: { skills: newSkill } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
    }

    // Return the updated profile with the new skill
    const updatedProfile = await client.db().collection("profiles").findOne({ _id: profileId });
    return NextResponse.json({
      ...updatedProfile,
      _id: updatedProfile._id.toString(),
      skills: updatedProfile.skills.map((skill: any) => ({
        _id: skill._id.toString(),
        name: skill.name,
      })),
    });
  } catch (error) {
    console.error("Error adding skill:", error);
    return NextResponse.json({ error: "Error adding skill" }, { status: 500 });
  }
}
