import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../lib/mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const params = await Promise.resolve(context.params);
    const systemUserId = params.id;

    if (!systemUserId) {
      return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
    }

    const user = await client.db()
      .collection('systemusers')
      .findOne({ _id: new ObjectId(systemUserId) }, { projection: { usertype: 1 } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ usertype: user.usertype });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
