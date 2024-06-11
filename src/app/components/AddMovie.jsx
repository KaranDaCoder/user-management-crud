'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AddMovie = ({ owner_id }) => {
  const router = useRouter();
  const [name, setName] = useState({ movie_name: '', owner_id: owner_id });

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const create_new_movie = {
      movie_name: name,
      owner_id,
    };
    try {
      const request = await fetch(`/api/movies`, {
        method: 'POST',
        cache: 'no-store',
        redirect: 'follow',
        body: JSON.stringify(create_new_movie),
      });
      console.log(create_new_movie)
      const resp = await request.json();
      if (request.ok) {
        console.log(resp);
        router.refresh("/");
        return resp;
      } else {
        console.log(resp);
        throw new Error(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex items-center justify-center'>
      <form
        onSubmit={handleFormSubmission}
        className='flex flex-col w-full h-full'
      >
        <input
          type='text'
          name='name'
          id=''
          placeholder='Movie Name'
          className='w-full h-12 px-2 font-semibold border outline-none text-slate-600'
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type='reset'
          className={`w-1/2 px-6 py-2 mt-2 text-white bg-red-700 border`}
          onClick={() => setName('')}
        >
          Reset
        </button>
        {name.length > 0 ? (
          <button
            type='submit'
            className='w-1/2 px-6 py-2 mt-2 text-white bg-green-700 border'
          >
            Add
          </button>
        ) : (
          <button
            type='submit'
            className='w-1/2 px-6 py-2 mt-2 text-white transition-all duration-200 border cursor-not-allowed bg-slate-300'
            disabled
          >
            Add
          </button>
        )}
      </form>
    </div>
  );
};

export default AddMovie;
