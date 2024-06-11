import React from 'react';
import { cookies } from 'next/headers';

const ManageUsers = async () => {
  const fetchAllUsers = async () => {
    try {
      const request = await fetch(`${process.env.AUTH_URL}/api/users`, {
        method: 'GET',
        cache: 'no-store',
        redirect: 'follow',
        headers: {
          Cookie: cookies(),
        },
      });
      const resp = await request.json();
      if (request.ok) {
        console.log(resp);
        return resp;
      } else {
        console.log(resp);
        throw new Error(resp);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  await fetchAllUsers();
  return <div>ManageUsers</div>;
};

export default ManageUsers;
