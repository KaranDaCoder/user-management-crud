export const dynamic = 'force-dynamic';
import { connectDb } from '@/lib/dbConnect';
import { auth } from '../../../auth';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
 const session = await auth();
  try {
    await connectDb();
    console.log(`SESSION IN API : ${JSON.stringify(session)}`);
    const all_users = await User.find({});
    return new NextResponse(JSON.stringify(all_users), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 200 });
  }
};

// export const GET = auth(async function GET(request, {params}) {
//  try {
//   await connectDb();
//   const session = await auth();
//   console.log(`SESSION IN API : ${JSON.stringify(session)}`)
//   const all_users = await User.find({});
//   return new NextResponse(JSON.stringify(all_users), {status:200})
//   } catch (error) {
//    console.log(error)
//    return new NextResponse(JSON.stringify(error), {status:200})
//   }
// })
