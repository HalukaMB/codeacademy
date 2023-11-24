import { createContext, useState } from "react";


interface NewLocationDataType {
    data:{
    context: string | null;
    lat: number | null;
    long: number | null;
    category: string};
    changeNewLocationData: ()=>void;
}


export const NewLocationContext = createContext({});
const defaultNewLocation: NewLocationDataType = {
    data:{
    context: "",
    lat: null,
    long: null,
    category: ""},
    changeNewLocationData: ()=>{}
}



export const NewLocationContextProvider = (props: Props) => {



    let [newLocation, setNewLocation] = useState(defaultNewLocation)

    return (
        <NewLocationContext.Provider value={{ newLocation, setNewLocation}}>
            {props.children}
        </NewLocationContext.Provider>
    )
}
