import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../../../lib/mongodb'; // Adjust path as necessary

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


// PUT (update) a project by ID
export async function PUT(req: Request, { params }: { params: { id: string, projectId: string } }) {
  try {
    const { name, description, dateCompleted, githubLink, liveLink } = await req.json();
    const profileId = new ObjectId(params.id);
    const projectId = new ObjectId(params.projectId);

    const client = await getClient();

    // Update the specific project in the profile's projects array
    const updatedProfile = await client
      .db()
      .collection('profiles')
      .findOneAndUpdate(
        { _id: profileId, 'projects._id': projectId },
        {
          $set: {
            'projects.$.name': name,
            'projects.$.description': description,
            'projects.$.dateCompleted': new Date(dateCompleted),
            'projects.$.githubLink': githubLink,
            'projects.$.liveLink': liveLink,
          },
        },
        { returnDocument: 'after' }
      );

    if (!updatedProfile.value) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project updated successfully', updatedProfile: updatedProfile.value }, { status: 200 });
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE a project by ID
export async function DELETE(req: Request, { params }: { params: { id: string, projectId: string } }) {
  try {
    const profileId = new ObjectId(params.id);
    const projectId = new ObjectId(params.projectId);

    const client = await getClient();

    // Remove the project from the profile's projects array
    const updatedProfile = await client
      .db()
      .collection('profiles')
      .findOneAndUpdate(
        { _id: profileId },
        { $pull: { projects: { _id: projectId } } },
        { returnDocument: 'after' } // Return the updated document
      );

    if (!updatedProfile.value) {
      return NextResponse.json({ error: 'Profile or project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
