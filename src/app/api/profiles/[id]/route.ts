import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../lib/mongodb'; // Adjust path as necessary

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI || '');

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Extract the systemUserId from the params
    const systemUserId = params.id;

    // Log for debugging purposes
    console.log('systemUserId:', systemUserId);

    // Check if the user is an admin (usertype = 0)
    const user = await client.db()
      .collection('systemusers')
      .findOne({ _id: new ObjectId(systemUserId) });

    if (!user) {
      console.error('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User found:', user);

    // If the user is an admin, return all profiles
    if (user.usertype === 0) {
      console.log('Admin user detected, returning all profiles');
      const profiles = await client.db()
        .collection('profiles')
        .find()
        .toArray();

      console.log('All profiles:', profiles);
      return NextResponse.json(profiles);
    }

    // If not an admin, continue with the existing logic for fetching profiles based on user access
    const userAccessProfiles = await client.db()
      .collection('userprofileaccess')
      .find({ systemUser: new ObjectId(systemUserId) })
      .toArray();

    console.log('userAccessProfiles:', userAccessProfiles);

    // Extract the profile IDs from the userAccessProfiles
    const profileIds = userAccessProfiles.map((profile) => profile.profile);

    console.log('profileIds:', profileIds);

    // Query the profiles collection for the matching profile IDs
    const profiles = await client.db()
      .collection('profiles')
      .find({ _id: { $in: profileIds } })
      .toArray();

    console.log('profiles:', profiles);

    // Return the profiles as a JSON response
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Error fetching profiles' }, { status: 500 });
  }
}
