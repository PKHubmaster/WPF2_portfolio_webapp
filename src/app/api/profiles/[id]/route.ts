import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../lib/mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const { id: systemUserId } = await context.params;

    console.log('systemUserId:', systemUserId);

    const user = await client.db()
      .collection('systemusers')
      .findOne({ _id: new ObjectId(systemUserId) });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.usertype === 0) {
      const profiles = await client.db()
        .collection('profiles')
        .find()
        .toArray();
      return NextResponse.json(profiles);
    }

    const userAccessProfiles = await client.db()
      .collection('userprofileaccess')
      .find({ systemUser: new ObjectId(systemUserId) })
      .toArray();

    const profileIds = userAccessProfiles.map((profile) => profile.profile);

    const profiles = await client.db()
      .collection('profiles')
      .find({ _id: { $in: profileIds } })
      .toArray();

    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching profiles' }, { status: 500 });
  }
}
