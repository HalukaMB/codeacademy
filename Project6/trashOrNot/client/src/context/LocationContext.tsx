import { createContext, useState } from "react";


interface NewLocationDataType {
    id: string | null;
    locationname: string | null;
    lat: number | null;
    long: number | null;
    category: string}


export const LocationContext = createContext({});




export const LocationContextProvider = (props: Props) => {
const defaultNewLocation: NewLocationDataType = {
    id:"",
    locationname: "",
    lat: null,
    long: null,
    category: ""
}

    let [newLocation, setNewLocation] = useState(defaultNewLocation)
    let [deleteLocation, setDeleteLocation] = useState(defaultNewLocation)

    return (
        <LocationContext.Provider value={{ newLocation, setNewLocation, deleteLocation, setDeleteLocation, defaultNewLocation}}>
            {props.children}
        </LocationContext.Provider>
    )
}
