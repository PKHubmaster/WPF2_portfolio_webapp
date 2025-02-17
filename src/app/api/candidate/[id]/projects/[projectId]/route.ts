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

// GET a specific project by ID
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

// DELETE a project by ID
export async function DELETE(req: Request, { params }: { params: { id: string, projectId: string } }) {
  try {
    // Await params for safety in Next.js dynamic API routes
    const { id, projectId } = await Promise.resolve(params); // Ensure params are awaited

    console.log(`Attempting to delete project ${projectId} from profile ${id}`);
    
    const profileId = new ObjectId(id);
    const projectIdObj = new ObjectId(projectId);

    const client = await getClient();

    // Remove the project from the profile's projects array
    const updatedProfile = await client
      .db()
      .collection('profiles')
      .findOneAndUpdate(
        { _id: profileId },
        { $pull: { projects: { _id: projectIdObj } } },
        { returnDocument: 'after' }
      );

    console.log('Updated profile after deletion:', updatedProfile.value);

    if (!updatedProfile.value) {
      console.log(`Profile or project not found: Profile ID ${id}, Project ID ${projectId}`);
      return NextResponse.json({ error: 'Profile or project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}


// PUT to update a project by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string; projectId: string } }) {
  try {
    // Await params for safety in Next.js dynamic API routes
    const { id, projectId } = await Promise.resolve(params); // Ensure params are awaited

    // Ensure params are properly destructured from request body
    const { name, description, dateCompleted, githubLink, liveLink } = await req.json();

    // Format the date to "YYYY-MM-DD"
    const formattedDate = new Date(dateCompleted).toISOString().split('T')[0];

    // Convert params to ObjectId
    const profileId = new ObjectId(id);
    const projectIdObj = new ObjectId(projectId);

    const client = await getClient();
    const db = client.db();
    const profilesCollection = db.collection('profiles');

    // Perform the update operation
    const result = await profilesCollection.findOneAndUpdate(
      { _id: profileId, 'projects._id': projectIdObj },
      {
        $set: {
          'projects.$.name': name,
          'projects.$.description': description,
          'projects.$.dateCompleted': formattedDate,  // Use the formatted date here
          'projects.$.githubLink': githubLink,
          'projects.$.liveLink': liveLink,
        },
      },
      { returnDocument: 'after' }
    );

    if (result.value) {
      return NextResponse.json({ message: 'Project updated successfully', updatedProfile: result.value });
    } else {
      return NextResponse.json({ error: 'Profile or project not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}
