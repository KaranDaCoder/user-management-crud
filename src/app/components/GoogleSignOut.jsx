'use client'
import { signOut } from 'next-auth/react';

const GoogleSignOut = () => {
  return (
    <button
      className='flex items-center justify-center w-auto gap-4'
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      <span className='text-base font-semibold capitalize text-slate-600'>
        Logout
      </span>
    </button>
  );
};

export default GoogleSignOut;
