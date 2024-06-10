'use client';
import { signIn } from 'next-auth/react';

const GoogleSignIn = () => {
  return (
    <button
      className='text-sm font-semibold tracking-wider capitalize text-slate-700 hover:text-slate-900'
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
    >
      Login/Sign-Up with google
    </button>
  );
};

export default GoogleSignIn;
