import React from 'react'
import GoogleSignIn from '../components/GoogleSignIn';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Login = async () => {
  const session = await auth();
  if(session) redirect("/dashboard")
  return (
    <div>
      <p>This is a login page</p>
      <GoogleSignIn/>
    </div>
  );
}

export default Login