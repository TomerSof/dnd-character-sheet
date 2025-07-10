'use client';
import { useEffect, useState, useRef, createContext } from 'react';
import { UserProvider } from './userContext';
import HomePage from './homePage';

export default function PracticeComponent() {

  const [username, setUsername] = useState("Guest")
  return(
    <>
    <UserProvider >
      <HomePage/>
    </UserProvider>


    </>
  );
}

