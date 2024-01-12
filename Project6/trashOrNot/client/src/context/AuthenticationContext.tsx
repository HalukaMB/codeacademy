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
interface NewLocationDataType {
  _id: string | null;
  locationname: string | null;
  lat: string | null;
  long: string | null;
  category: string;
  likes: number;
}


interface userCheckedType {
  name:string,
  id:string,
  foundTrashPlaces:NewLocationDataType[]|null,
  cleanedTrashPlaces:NewLocationDataType[]|null
}
type MyType = {
  id: number;
  name: string;
}
type MyGroupType = {
  [key:string]: MyType;
}

interface userCheckContextType{
  userChecked:userCheckedType
  setUserChecked:React.Dispatch<React.SetStateAction<userCheckedType>>
}

export const AuthenticationContext = createContext<userCheckContextType>(null as unknown as userCheckContextType);
export const AuthenticationContextProvider= (props: Props)=> {
    const [userChecked, setUserChecked] = useState<userCheckedType>({"name":"", "id":"","foundTrashPlaces":null,"cleanedTrashPlaces":null});

    


    return(
        <AuthenticationContext.Provider value={{ userChecked, setUserChecked}}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}
