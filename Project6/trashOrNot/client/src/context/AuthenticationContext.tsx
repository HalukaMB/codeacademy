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


export const AuthenticationContext= (props: Props)=> {
    const [user, setUser] = useState<User | null>(null);
    const [userChecked, setUserChecked] = useState<boolean>(false);



    
  
      const signup = (email: string, password: string) => {
        // signup logic goes here
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      ;
    };
    



    return(
        <AuthenticationContext.Provider value={{ user, login, signup, logout}}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}
