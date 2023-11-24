import { createContext, useState } from "react";


interface NewLocationDataType {
    locationname: string | null;
    lat: number | null;
    long: number | null;
    category: string}


export const NewLocationContext = createContext({});
const defaultNewLocation: NewLocationDataType = {
    locationname: "",
    lat: null,
    long: null,
    category: "trash"
}



export const NewLocationContextProvider = (props: Props) => {



    let [newLocation, setNewLocation] = useState(defaultNewLocation)

    return (
        <NewLocationContext.Provider value={{ newLocation, setNewLocation}}>
            {props.children}
        </NewLocationContext.Provider>
    )
}
