import React, { createContext, useState } from 'react'

type User = boolean;

type Props = {
    children: ReactNode;
  };

interface AuthenticationContextType {
    user: User | "No provider";
    login: () => void;
    logout: () => void;  }

const defaultValue:AuthenticationContextType = {
    user: "No provider",
  login: () => {
    throw Error("No provider");
  },
  logout: () => {
    throw Error("No provider");
  }, // By default, the user is set to indicate no provider is present.
  };

export const AuthenticationContext = createContext(defaultValue);


export const AuthenticationContextProvider = (props: Props) => {
    const [user, setUser] = useState<User>(false);
    const login = () => {
        setUser(true);
      };
    
      const logout = () => {
        setUser(false);
      };

    return(
        <AuthenticationContext.Provider value={{user, login, logout}}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

