export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { connectDb } from '@/lib/dbConnect';
import Movie from '@/models/Movie';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  const session = await auth();
  if (!session)
    return new NextResponse(JSON.stringify({ error: 'No session found.' }), {
      status: 500,
    });
  try {
    await connectDb();
    const {
      user: { _id },
    } = session;
    console.log(_id);
    const memberType = await User.findById(_id);
    if (memberType.isAdmin) {
      const user_movies_get = await Movie.find({}).populate('owner_id');
      return new NextResponse(
        JSON.stringify({
          result: user_movies_get,
          total: user_movies_get.length,
        }),
        { status: 200 }
      );
    } else {
      const user_movies_get = await Movie.find({ owner_id: _id }).populate(
        'owner_id'
      );
      return new NextResponse(
        JSON.stringify({
          result: user_movies_get,
          total: user_movies_get.length,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify('Error'), { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  const session = await auth();
  if (!session)
    return new NextResponse(JSON.stringify({ error: 'No session found.' }), {
      status: 500,
    });
  try {
    await connectDb();
    const { movie_name, owner_id } = await request.json();
    if (!owner_id || !movie_name)
      return new NextResponse(
        JSON.stringify({ error: 'Incorrect information entered' }),
        { status: 403 }
      );
    const create_movie = { movie_name, owner_id };
    console.log(create_movie);
    const new_movie = await Movie.create(create_movie);
    await new_movie.save();
    return new NextResponse(JSON.stringify(new_movie), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
