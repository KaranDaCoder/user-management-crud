export const dynamic = 'force-dynamic';
import { connectDb } from '@/lib/dbConnect';
import { auth } from '../../../auth';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
 const session = await auth();
 if(!session) return new NextResponse(JSON.stringify({error: 'No session found.'}), {status:500})
  try {
    await connectDb();
    if(!session?.user?.isAdmin) return new NextResponse(JSON.stringify(`Unauthorized! to Access This Page!`), {status:401});
    const all_users = await User.find({});
    return new NextResponse(JSON.stringify(all_users), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
