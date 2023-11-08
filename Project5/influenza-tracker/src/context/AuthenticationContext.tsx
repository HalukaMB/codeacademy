import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useState } from 'react'
import { auth } from '../settings/firebaseConfig';
import { Navigate } from 'react-router';


type Props = {
    children: ReactNode;
  };

interface AuthenticationContextType {
    user: User | "No provider";
    signup: (email: string, password: string) => void;
    logout: () => void; 
    login: (email: string, password: string) => void;  }

const defaultValue:AuthenticationContextType = {
    user: "No provider",
  signup: () => {
    throw Error("No provider");
  },
  login: () => {
    throw Error("No provider");
  },
  logout: () => {
    throw Error("No provider");
  }, // By default, the user is set to indicate no provider is present.
  };

export const AuthenticationContext = createContext(defaultValue);


export const AuthenticationContextProvider = (props: Props) => {
    const [user, setUser] = useState<User|null>(null);

    const login = (email: string, password: string) => {
      // signin logic goes here
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Logged in 
    console.log("userCredential :>> ", userCredential);

    const user = userCredential.user;
    console.log("user :>> ", user);
    setUser(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

      console.log("Signin called with:", email, password);
      // After successful signin, logic that handles our return goes here
    };
  

    const signup = (email: string, password: string) => {
      // signup logic goes here
      createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("user :>> ", user);
      setUser(user);
      // ...
    })
    ;
      console.log("Signup called with:", email, password);
  };
  
    const logout = () => {
      // logout logic here
      // refactor when we are dealing with a real authentication provider
      setUser(null);
    };

    return(
        <AuthenticationContext.Provider value={{ user, login, signup, logout }}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

