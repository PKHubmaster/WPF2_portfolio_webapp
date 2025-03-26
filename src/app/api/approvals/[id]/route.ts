import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../lib/mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

interface Params {
  id: string;
}

export async function PUT(req: Request, context: { params: Params }) {
  try {
    const { id: profileId } = context.params; // Destructure directly from context.params

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
