'use client';
import { useEffect, useState, useRef, createContext, ChangeEvent } from 'react';
import { UserProvider } from './userContext';
import HomePage from './homePage';

export default function PracticeComponent() {

  const [username, setUsername] = useState("Guest");


  return(
    <UserProvider user={{username,setUsername}}>
      <h2>Parent = Practice Component</h2>
      
      <HomePage/>
    </UserProvider>
  );
}

