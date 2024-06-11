import React from 'react';
import DeleteButton from './DeleteButton';
import { cookies } from 'next/headers';

const GetMoviesList = async ({ owner_id }) => {
  const getAllMovies = async () => {
    try {
      const request = await fetch(`${process.env.AUTH_URL}/api/movies`, {
        method: 'GET',
        cache: 'no-store',
        redirect: 'follow',
        headers: { Cookie: cookies() },
      });
      const resp = await request.json();
      const {result, total} = resp;
      return {result, total};
    } catch (error) {}
  };
  const {result, total} = await getAllMovies();
  return (
    <div className='flex flex-col justify-between w-full gap-2'>
      <span className='font-semibold text-center uppercase text-slate-600'>
        Total Movies to manage: {total}
      </span>
     {result?.map(movie => (
      <div className='flex justify-between w-full' key={movie._id}>
       <p>{movie.movie_name}</p>
       <p>{movie.owner_id._id}</p>
       <p>{movie._id}</p>
       <DeleteButton owner_id={owner_id} movie_id={movie._id}/>
      </div>
     ))}
    </div>
  );
};

export default GetMoviesList;
