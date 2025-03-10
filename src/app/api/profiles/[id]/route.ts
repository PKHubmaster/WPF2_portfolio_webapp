import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../lib/mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id: systemUserId } = await context.params;

    const user = await client.db()
      .collection('systemusers')
      .findOne({ _id: new ObjectId(systemUserId) });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const systemUserObjectId = new ObjectId(systemUserId);

    if (user.usertype === 0) {
      // Admin logic (Code A)
      const profiles = await client.db()
        .collection('profiles')
        .find()
        .toArray();
      return NextResponse.json(profiles);
    } else if (user.usertype === 1) {
      // User logic (Code B)
      const profiles = await client.db()
        .collection('profiles')
        .aggregate([
          {
            $lookup: {
              from: 'userprofileaccess',
              localField: '_id',
              foreignField: 'profile',
              as: 'accessDetails'
            }
          },
          { $unwind: { path: '$accessDetails', preserveNullAndEmptyArrays: true } },
          { $match: { 'accessDetails.systemUser': systemUserObjectId } },
          {
            $project: {
              _id: 1,
              employeeFirstName: 1,
              employeeLastName: 1,
              accessStatus: { $ifNull: ['$accessDetails.accessStatus', 'Approved'] }
            }
          }
        ])
        .toArray();
      return NextResponse.json(profiles);
    }
    
    return NextResponse.json({ error: 'Invalid usertype' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching profiles' }, { status: 500 });
  }
}
