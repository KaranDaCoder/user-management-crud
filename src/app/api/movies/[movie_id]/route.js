export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { connectDb } from '@/lib/dbConnect';
import Movie from '@/models/Movie';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const DELETE = async (request, { params }) => {
  const { movie_id } = params;
  console.log(`MOVIE ID FETCHED ${movie_id}`);
  await connectDb();
  const session = await auth();
  if (!session)
    return new NextResponse(JSON.stringify('error'), { status: 403 });

  try {
    const {
      user: { _id },
    } = session;

    const memberType = await User.findById(_id);
    const movie = await Movie.findById({ _id: movie_id }).populate('owner_id');
    if (!movie) {
      return new NextResponse(JSON.stringify({ error: `Movie not found` }), {
        status: 404,
      });
    }
    if (memberType.isAdmin) {
      const adminSession = await Movie.findByIdAndDelete({ _id: movie_id });
      return new NextResponse(JSON.stringify(adminSession), { status: 200 });
    }

    if (movie && movie.owner_id._id.toString() === _id) {
      const deleteMovie = await Movie.findByIdAndDelete({ _id: movie_id });
      return new NextResponse(JSON.stringify({ message: 'success' }), {
        status: 203,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized to delete the movie' }),
        { status: 403 }
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify('error'), { status: 500 });
  }
};
