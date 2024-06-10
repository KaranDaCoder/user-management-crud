import Link from 'next/link'
import React from 'react'
import { auth } from '@/auth';

import GoogleSignOut from './GoogleSignOut';

const Navbar = async () => {
 const session = await auth();
  return (
    <div className='flex items-center justify-between w-full h-12 mb-4 text-xl text-slate-600'>
      <Link href={'/'}>Home</Link>
      {session === null ? (
        <Link href={'/login'}>Login With Google</Link>
      ) : (
        <div className='flex items-center justify-between w-3/4 h-full px-4 text-lg border shadow-lg rounded-xl'>
         <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/"} className=''>Manage Profile</Link>
        {session?.user?.isAdmin && <p>Add User</p>}
        {session?.user?.isAdmin && <p>Delete User</p>}
        <GoogleSignOut/>
        </div>
      )}

    </div>
  );
}

export default Navbar