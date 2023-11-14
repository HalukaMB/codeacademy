import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import { auth } from '../settings/firebaseConfig';
import { db } from "../settings/firebaseConfig";
import { doc, setDoc, getDoc } from 'firebase/firestore';

type Props = {
    children: ReactNode;
  };

interface AuthenticationContextType {
    user: User | null;
    signup: (email: string, password: string) => void;
    logout: () => void; 
    login: (email: string, password: string) => void;  
    updateFavoritesChangeTime: ()=>void;
    favorites: string[];
    changeFavorites: (favorites:string[])=> void;
  }

const defaultValue:AuthenticationContextType = {
    user: null,
    favorites: [],
  signup: () => {
    throw Error("No provider");
  },
  login: () => {
    throw Error("No provider");
  },
  logout: () => {
    throw Error("No provider");
  }, // By default, the user is set to indicate no provider is present.
  updateFavoritesChangeTime: () => {
    throw Error("No provider");
  }, 
  changeFavorites: () => {
    throw Error("No provider");
  }, 
  };



export const AuthenticationContext = createContext(defaultValue);


export const AuthenticationContextProvider = (props: Props) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [userChecked, setUserChecked] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([])
  const [lastFavoritesChange, setLastFavoritesChange] = useState<Date|null>(null)
  const changeFavorites = (newValue:string[]) => {
    setFavorites(newValue);
    updateUserPref(newValue)
  };

  const getUserPref = async(user:any)=>{
    if(user?.email && db){
    const userId: string=user.email
    const docRef =  doc(
      db, // db is the Firestore instance
      "users", // 'users' is the collection name
      userId // 'userId' is the doc ID
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFavorites(docSnap.data().favorites)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("Have no data from previous sessions");
    }
    }
  }

  const updateUserPref= async(newValue:string[])=>{
    if(user?.email && db){
    let userObject={
      user: user.email,
      favorites: newValue,
      lastUpdate: lastFavoritesChange
    }
    const userId: string=user.email
    try {
      const preferencesDocRef = doc(
        db, // db is the Firestore instance
        "users", // 'users' is the collection name
        userId // 'userId' is the doc ID
      );
      await setDoc(preferencesDocRef, userObject);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  }

  const updateFavoritesChangeTime=()=>{
    const currentTime=Date.now()
    const lastFavoritesChange=new Date(currentTime)
    setLastFavoritesChange(lastFavoritesChange)

  }


    const getActiveUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          getUserPref(user)

        } else {
          console.log("no active user");
        }
      })
      
      setUserChecked(true);

    };
  
    useEffect(()=>{
      getActiveUser()

  },[]);
  
  
  


    const login = (email: string, password: string) => {
      // signin logic goes here
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Logged in 
    const user = userCredential.user;
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return(
        <AuthenticationContext.Provider value={{ user, login, signup, logout, favorites, changeFavorites, updateFavoritesChangeTime}}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

