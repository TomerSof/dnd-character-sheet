import React, {createContext,useState, ReactNode, useContext} from 'react'

type UserContextType = {
  username: string;
  setUsername: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children, user} : {children:ReactNode, user: UserContextType}) =>{

  return (
    <UserContext.Provider value = {user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a userProvider');
  return context;
}
