import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../lib/mongodb'; // Adjust path as necessary

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI || '');

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to MongoDB (Ensures connection)
    await connectToDatabase();

    // Extract the user ID from the request params
    const systemUserId = params.id;

    // Log for debugging purposes
    console.log('systemUserId:', systemUserId);

    // Query the user collection to fetch the user
    const user = await client.db()
      .collection('systemusers')
      .findOne({ _id: new ObjectId(systemUserId) }, { projection: { usertype: 1 } });

    // Check if user was found
    if (!user) {
      console.error('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User found:', user);

    // Return the usertype as the response
    return NextResponse.json({ usertype: user.usertype });
  } catch (error) {
    console.error('Error fetching user type:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
