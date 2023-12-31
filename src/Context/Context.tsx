import React, { ReactNode } from "react";
import { useState, createContext } from "react";






const UserContext = React.createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [toggleView, setToggleView] = useState<boolean>(false)



  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, toggleView, setToggleView }}>
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