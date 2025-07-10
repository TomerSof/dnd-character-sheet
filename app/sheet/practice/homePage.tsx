import React, { ChangeEvent } from 'react'
import { useUser } from './userContext';

export default function HomePage() {

  const {username,setUsername} = useUser();

  return (
    <div className='flex flex-col items-center border-2 py-5 border-red-500'>
      <p>Hello, {username}</p>
      <input type="text" className='input' placeholder="Enter username"
       onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
    </div>
  );
}
