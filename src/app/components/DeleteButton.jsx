'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteButton = ({owner_id, movie_id}) => {
 const router = useRouter();
 const handleDelete = async () => {
  try {
   const request = await fetch(
     `/api/movies/${movie_id}`,
     { method: 'DELETE', cache: 'no-store' }
   );
   const resp = await request.json();
   // console.log(resp)
   if(request.ok) {
    router.refresh();
    return resp;
   }
  } catch (error) {
   console.log(error)
  }
 }
  return (
    <div>
     <button onClick={handleDelete}>Delete Movie</button>
    </div>
  )
}

export default DeleteButton