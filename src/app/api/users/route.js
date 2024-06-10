import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDb } from "@/lib/dbConnect";
import User from "@/models/User";

// Get all users - for admin only!
export const GET = async(request, {params}) => {
 await connectDb();
 const session = await auth();
 try {
  if(!session) return new NextResponse(JSON.stringify({error: `Session Not Found!`}), {status:500});
  const {user:{_id, isAdmin}} = await auth();
  const isUserAdmin = await User.findById(_id);
  if(!isUserAdmin.isAdmin) return new NextResponse(JSON.stringify({message: `Only admin can view all members`}, {status:401}))
  const all_users = await User.find({}).sort({createdAt: 1});
  return new NextResponse(JSON.stringify(all_users), {status:200})
  } catch (error) {
   console.log(error)
  return new NextResponse(JSON.stringify(error), {status:500})
  
 }
}