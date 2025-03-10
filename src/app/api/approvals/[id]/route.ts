import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../lib/mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    // Fix: Await context.params before accessing its properties
    const { id: profileId } = await context.params; // Fixed: Ensure `params` are awaited before usage

    await connectToDatabase();

    const { accessStatus } = await req.json();

    if (!['Approved', 'Rejected'].includes(accessStatus)) {
      return NextResponse.json({ error: 'Invalid accessStatus' }, { status: 400 });
    }

    const result = await client.db().collection('userprofileaccess').updateOne(
      { _id: new ObjectId(profileId) },
      { $set: { accessStatus: accessStatus } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Profile not found or access not associated' }, { status: 404 });
    }

    return NextResponse.json({ message: `Profile access status updated to ${accessStatus}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating access status' }, { status: 500 });
  }
}
