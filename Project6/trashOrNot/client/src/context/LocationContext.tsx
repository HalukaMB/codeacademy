import { createContext, useState } from "react";


interface NewLocationDataType {
    locationname: string | null;
    lat: number | null;
    long: number | null;
    category: string}


export const LocationContext = createContext({});




export const LocationContextProvider = (props: Props) => {
const defaultNewLocation: NewLocationDataType = {
    locationname: "",
    lat: null,
    long: null,
    category: "trash"
}

    let [newLocation, setNewLocation] = useState(defaultNewLocation)
    let [deleteLocation, setDeleteLocation] = useState(defaultNewLocation)

    return (
        <LocationContext.Provider value={{ newLocation, setNewLocation, deleteLocation, setDeleteLocation}}>
            {props.children}
        </LocationContext.Provider>
    )
}
