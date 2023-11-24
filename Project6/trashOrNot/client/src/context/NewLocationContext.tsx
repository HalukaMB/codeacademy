import { createContext, useState } from "react";


interface NewLocationDataType {
    locationname: string | null;
    lat: number | null;
    long: number | null;
    category: string}


export const NewLocationContext = createContext({});




export const NewLocationContextProvider = (props: Props) => {
const defaultNewLocation: NewLocationDataType = {
    locationname: "",
    lat: null,
    long: null,
    category: "trash"
}
console.log("context")

    let [newLocation, setNewLocation] = useState(defaultNewLocation)

    return (
        <NewLocationContext.Provider value={{ newLocation, setNewLocation}}>
            {props.children}
        </NewLocationContext.Provider>
    )
}
