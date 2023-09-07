interface UserContextProps {
    loggedInUser: User | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
    toggleView: boolean;
    setToggleView: React.Dispatch<React.SetStateAction<boolean>>
  }
  
  interface UserProviderProps {
    children: ReactNode
  }