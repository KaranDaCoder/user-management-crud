import React from 'react'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import LoggedInUserSession from '../components/LoggedInUserSession';


const Dashboard = async () => {
 const session = await auth();
 if(!session?.user) redirect("/login")
  return (
    <div className='w-full h-[calc(100vh-4rem)] border'>
      <h2 className='text-lg font-semibold text-center underline text-slate-600'>
        Dashboard - Only Logged In Member Can See this!
      </h2>
      <div className='flex items-center justify-center w-full h-3/4'>
      <LoggedInUserSession session={session?.user} />
      </div>
    </div>
  );
}

export default Dashboard