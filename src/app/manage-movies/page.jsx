import React from 'react'
import AddMovie from '../components/AddMovie'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import GetMoviesList from '../components/GetMoviesList';

const ManageMovies = async () => {
  const session = await auth();
  if(!session) redirect("/dashboard")
  return (
    <div className='w-full h-full p-4'>
      <div className='p-4 border'>
        <AddMovie owner_id={session?.user?._id} />
      </div>
      <div className='w-full h-screen mt-5 border'>
        <GetMoviesList owner_id={session?.user?._id} />
      </div>
    </div>
  );
}

export default ManageMovies