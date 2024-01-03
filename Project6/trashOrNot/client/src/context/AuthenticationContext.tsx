import React, { ReactNode, createContext, useState } from 'react'

type Props = {
    children: ReactNode;
  };

interface AuthenticationContextType {
    signup: (email: string, password: string) => void;
    logout: () => void; 
    login: (email: string, password: string) => void;  
  }

const defaultValue:AuthenticationContextType = {
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

interface userCheckContextType{
  userChecked:boolean
  setUserChecked:React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthenticationContext = createContext<userCheckContextType>(null as unknown as userCheckContextType);
export const AuthenticationContextProvider= (props: Props)=> {
    const [userChecked, setUserChecked] = useState<boolean>(false);

    


    return(
        <AuthenticationContext.Provider value={{ userChecked, setUserChecked}}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}
