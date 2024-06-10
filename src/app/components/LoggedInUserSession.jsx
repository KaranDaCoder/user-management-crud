import React from 'react'

const LoggedInUserSession = ({session}) => {
 return (
    <div className='flex flex-col justify-center w-auto h-full px-4 border gap-7'>
      <p className='text-lg font-semibold text-slate-600'>Name :  <span className='font-light text-slate-800'>{session.name}</span></p>
      <p className='text-lg font-semibold text-slate-600'>Email :  <span className='font-light text-slate-800'>{session.email}</span></p>
      <p className='text-lg font-semibold text-slate-600'>Image_URL :  <span className='font-light text-slate-800'>{session.image}</span></p>
      <p className='text-lg font-semibold text-slate-600'>Username :  <span className='font-light text-slate-800'>{session.username}</span></p>
      <p className='text-lg font-semibold text-slate-600'>Is Admin :  <span className='font-light text-slate-800'>{session.isAdmin.toString()}</span></p>
      <p className='text-lg font-semibold text-slate-600'>Mongo User Id :  <span className='font-light text-slate-800'>{session._id.toString()}</span></p>

    </div>
  )
}

export default LoggedInUserSession