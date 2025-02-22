import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../../../lib/mongodb'; // Adjust path as necessary
import { NextRequest } from 'next/server';

// MongoDB connection
let client: MongoClient;

// Connect to the MongoDB client only once and reuse the connection
async function getClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect(); // Ensure it connects when needed
    console.log("MongoDB client connected successfully");
  }
  return client;
}

// DELETE a specific project by ID and by candidate ID
export async function DELETE(request: Request, context: { params: { id: string, projectId: string } }) {
  const { id, projectId } = await context.params;  // ✅ FIXED: Await params

  const client = await getClient();  // Get MongoDB client connection
  const db = client.db();  // Get database
  const profilesCollection = db.collection('profiles');  // Use 'profiles' collection (or your collection name)

  // Find the profile by ID and remove the project directly
  const profile = await profilesCollection.findOne({ _id: new ObjectId(id) });

  if (!profile) {
    return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
  }

  // Remove the project manually from the array
  const updatedProjects = profile.projects.filter((project: { _id: ObjectId }) => project._id.toString() !== projectId);

  const result = await profilesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { projects: updatedProjects } }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ message: 'Project not found or could not be removed' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Project deleted successfully', refresh: true }); // ✅ Send refresh flag
  
}

// PUT to update a specific project by ID and by candidate ID
export async function PUT(
  request: Request,
  context: { params: { id: string; projectId: string } }
) {
  const { id, projectId } = await context.params; // ✅ FIXED: Await params

  const client = await getClient(); // Corrected to use getClient() instead of dbConnect()
  const db = client.db(); // Get database
  const profilesCollection = db.collection('profiles'); // Make sure this is the correct collection

  const body = await request.json();
  const { name, description, dateCompleted, githubLink, liveLink } = body;

  const formattedDate = new Date(dateCompleted).toISOString().split("T")[0];

  const updatedProfile = await profilesCollection.findOneAndUpdate(
    { _id: new ObjectId(id), "projects._id": new ObjectId(projectId) },
    {
      $set: {
        "projects.$.name": name,
        "projects.$.description": description,
        "projects.$.dateCompleted": formattedDate,
        "projects.$.githubLink": githubLink,
        "projects.$.liveLink": liveLink,
      },
    },
    { returnDocument: 'after' }
  );

  if (!updatedProfile) {
    return NextResponse.json({ message: "Profile or project not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Project updated successfully" });
}

// GET a specific project by ID and by candidate ID
export async function GET(req: Request, { params }: { params: { id: string, projectId: string } }) {
  try {
    // Await params for safety in Next.js dynamic API routes
    const { id, projectId } = await Promise.resolve(params); // Ensure params are awaited

    const profileId = new ObjectId(id);
    const projectIdObj = new ObjectId(projectId);

    const client = await getClient();

    // Fetch the profile with the project matching projectId
    const profile = await client
      .db()
      .collection('profiles')
      .findOne({ _id: profileId, 'projects._id': projectIdObj });

    if (!profile) {
      console.log(`Profile or project not found: Profile ID ${profileId}, Project ID ${projectIdObj}`);
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Extract the specific project from the projects array
    const project = profile.projects.find((p: any) => p._id.toString() === projectIdObj.toString());
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

