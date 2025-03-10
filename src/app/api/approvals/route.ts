import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../lib/mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Perform the aggregation to join userprofileaccess, profiles, and systemusers collections
    const result = await client.db().collection('userprofileaccess').aggregate([
      {
        $match: { accessStatus: 'Pending' }, // Filter by Pending accessStatus
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'profile',
          foreignField: '_id',
          as: 'profileDetails',
        },
      },
      {
        $unwind: '$profileDetails', // Unwind the profiles to access the individual fields
      },
      {
        $lookup: {
          from: 'systemusers',
          localField: 'systemUser',
          foreignField: '_id',
          as: 'systemUserDetails',
        },
      },
      {
        $unwind: '$systemUserDetails', // Unwind the system users to access the individual fields
      },
      {
        $project: {
          accessStatus: 1,
          'profileDetails.employeeFirstName': 1,
          'profileDetails.employeeLastName': 1,
          'systemUserDetails.systemUserName': 1,
        },
      },
    ]).toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching pending profiles' }, { status: 500 });
  }
}

