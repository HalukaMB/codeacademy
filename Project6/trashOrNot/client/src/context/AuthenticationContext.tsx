import React, { createContext, useState } from 'react'

type Props = {
    children: ReactNode;
  };

interface AuthenticationContextType {
    user: User | null;
    signup: (email: string, password: string) => void;
    logout: () => void; 
    login: (email: string, password: string) => void;  
  }

const defaultValue:AuthenticationContextType = {
    user: null,
  signup: () => {
    throw Error("No provider");
  },
  login: () => {
    throw Error("No provider");
  },
  logout: () => {
    throw Error("No provider");
  } // By default, the user is set to indicate no provider is present.

}

export const AuthenticationContext = createContext({})
export const AuthenticationContextProvider= (props: Props)=> {
    const [userChecked, setUserChecked] = useState<boolean>(false);

    return(
        <AuthenticationContext.Provider value={{ userChecked, setUserChecked}}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}
