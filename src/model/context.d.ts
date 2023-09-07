interface UserContextProps {
    loggedInUser: User | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
  }
  
  interface UserProviderProps {
    children: ReactNode
  }