import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../settings/firebaseConfig';
import { setUserId } from 'firebase/analytics';
import { Navigate } from 'react-router';


type Props = {
    children: ReactNode;
  };

interface AuthenticationContextType {
    user: User | null;
    signup: (email: string, password: string) => void;
    logout: () => void; 
    login: (email: string, password: string) => void;  
    favorites:string[]
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
  }, // By default, the user is set to indicate no provider is present.
  };



export const AuthenticationContext = createContext(defaultValue);


export const AuthenticationContextProvider = (props: Props) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [userChecked, setUserChecked] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([])

  const changeFavorites = (newValue:string[]) => {
    setFavorites(newValue);
  };
  console.log(favorites)

    const getActiveUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("active user", user);
          setUser(user);
        } else {
          console.log("no active user");
        }
      });
      setUserChecked(true);
    };
  
    useEffect(() => {
      setUserChecked(false);
      getActiveUser();
    }, []);

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
    console.log("error>>", errorCode, ":", errorMessage)
  });

      // After successful signin, logic that handles our return goes here
    };
  

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
  
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        Navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return(
        <AuthenticationContext.Provider value={{ user, login, signup, logout, favorites, changeFavorites }}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

