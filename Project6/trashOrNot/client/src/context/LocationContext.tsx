import { createContext, useRef, useState } from "react";

interface NewLocationDataType {
  id: string | null;
  locationname: string | null;
  lat: number | null;
  long: number | null;
  category: string;
  likes: number;
}

type StateContextType = {
    newLocation: NewLocationDataType;
    setNewLocation: React.Dispatch<React.SetStateAction<NewLocationDataType>>;
    addRef:React.MutableRefObject< Record<string,string>| null>
    deleteRef:React.MutableRefObject<NewLocationDataType>;
    defaultNewLocation:NewLocationDataType,
  };


export const LocationContext = createContext<StateContextType>( null as unknown as StateContextType);

type ContextProviderProps = {
    children: React.ReactNode;
  };

export const LocationContextProvider = (props: ContextProviderProps) => {
    const defaultNewLocation: NewLocationDataType = {
        id: "",
        locationname: "",
        lat: null,
        long: null,
        category: "",
        likes: 1,
      };
  let [newLocation, setNewLocation] = useState<NewLocationDataType>(defaultNewLocation);
  let addRef = useRef({});
  let deleteRef = useRef(defaultNewLocation);

  return (
    <LocationContext.Provider
      value={{
        newLocation,
        setNewLocation,
        addRef,
        deleteRef,
        defaultNewLocation,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
