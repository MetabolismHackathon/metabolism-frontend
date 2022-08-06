import React, { createContext, useContext, useState } from 'react';

interface AuthContextI {
  currentUser: string | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<string | null>> | null;
}

const authContextInitialValue = {
  currentUser: null,
  setCurrentUser: null,
};

export const AuthContext = createContext<AuthContextI>(authContextInitialValue);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  

  const value = {
    currentUser,
    setCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
