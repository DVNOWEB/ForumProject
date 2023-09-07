import React, { ReactNode } from "react";
import { useState, createContext } from "react";



interface UserContextProps {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: ReactNode
}


const UserContext = React.createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);


  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  )
}


export const useUserContext = () => {
  const userContext = React.useContext(UserContext);
  if (userContext === undefined) {
    throw new Error('useUserContext must be inside a provider')
  }
  return userContext;
}