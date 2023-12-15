import { createContext, useRef, useState } from "react";

interface NewLocationDataType {
  _id: string | null;
  locationname: string | null;
  lat: string | null;
  long: string | null;
  category: string;
  likes: number;
}

type StateContextType = {
    newLocation: NewLocationDataType;
    setNewLocation: React.Dispatch<React.SetStateAction<NewLocationDataType>>;
    addRef:React.MutableRefObject< Record<string,string>>
    deleteRef:React.MutableRefObject<NewLocationDataType>;
    defaultNewLocation:NewLocationDataType,
    newPlace:boolean,
    setNewPlace: React.Dispatch<React.SetStateAction<boolean>>;
  };


export const LocationContext = createContext<StateContextType>( null as unknown as StateContextType);

type ContextProviderProps = {
    children: React.ReactNode;
  };

export const LocationContextProvider = (props: ContextProviderProps) => {
    const defaultNewLocation: NewLocationDataType = {
        _id: "",
        locationname: "",
        lat: "",
        long: "",
        category: "",
        likes: 1,
      };
  let [newLocation, setNewLocation] = useState<NewLocationDataType>(defaultNewLocation);
  let addRef = useRef({});
  let deleteRef = useRef(defaultNewLocation);
  const[newPlace,setNewPlace] = useState(true)

  return (
    <LocationContext.Provider
      value={{
        newLocation,
        setNewLocation,
        addRef,
        deleteRef,
        defaultNewLocation,
        newPlace,
        setNewPlace
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
