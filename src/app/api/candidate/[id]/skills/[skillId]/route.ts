import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../../../lib/mongodb'; // Adjust path if necessary

let client: MongoClient;

async function getClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect(); // Ensure it connects when needed
    console.log("MongoDB client connected successfully");
  }
  return client;
}

// DELETE a specific skill by ID and by candidate ID
export async function DELETE(request: Request, context: { params: { id: string, skillId: string } }) {
  const { id, skillId } = await context.params;  // ✅ FIXED: Await params

  const client = await getClient();  // Get MongoDB client connection
  const db = client.db();  // Get database
  const profilesCollection = db.collection('profiles');  // Use 'profiles' collection (or your collection name)

  // Find the profile by ID and remove the skill directly
  const profile = await profilesCollection.findOne({ _id: new ObjectId(id) });

  if (!profile) {
    return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
  }

  // Remove the skill manually from the array
  const updatedSkills = profile.skills.filter((skill: { _id: ObjectId }) => skill._id.toString() !== skillId);

  const result = await profilesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { skills: updatedSkills } }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ message: 'Skill not found or could not be removed' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Skill deleted successfully', refresh: true }); // ✅ Send refresh flag
}

// PUT to update a specific skill by ID and by candidate ID
export async function PUT(
  request: Request,
  context: { params: { id: string; skillId: string } }
) {
  const { id, skillId } = await context.params; // ✅ FIXED: Await params

  const client = await getClient(); // Corrected to use getClient() instead of dbConnect()
  const db = client.db(); // Get database
  const profilesCollection = db.collection('profiles'); // Ensure this is the correct collection

  const body = await request.json();
  const { name } = body;

  const updatedProfile = await profilesCollection.findOneAndUpdate(
    { _id: new ObjectId(id), "skills._id": new ObjectId(skillId) },
    {
      $set: {
        "skills.$.name": name,
      },
    },
    { returnDocument: 'after' }
  );

  if (!updatedProfile) {
    return NextResponse.json({ message: "Profile or skill not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Skill updated successfully" });
}

// GET a specific skill by ID and by candidate ID
export async function GET(req: Request, { params }: { params: { id: string, skillId: string } }) {
  try {
    // Await params for safety in Next.js dynamic API routes
    const { id, skillId } = await Promise.resolve(params); // Ensure params are awaited

    const profileId = new ObjectId(id);
    const skillIdObj = new ObjectId(skillId);

    const client = await getClient();

    // Fetch the profile with the skill matching skillId
    const profile = await client
      .db()
      .collection('profiles')
      .findOne({ _id: profileId, 'skills._id': skillIdObj });

    if (!profile) {
      console.log(`Profile or skill not found: Profile ID ${profileId}, Skill ID ${skillIdObj}`);
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    // Extract the specific skill from the skills array
    const skill = profile.skills.find((s: any) => s._id.toString() === skillIdObj.toString());
    return NextResponse.json(skill, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch skill:', error);
    return NextResponse.json({ error: 'Failed to fetch skill' }, { status: 500 });
  }
}
