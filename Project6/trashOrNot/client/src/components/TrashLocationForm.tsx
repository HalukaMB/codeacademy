import { useContext, useState } from 'react'
import MapElement from './MapElement'
import { LocationContext } from '../context/LocationContext'
import UpdateContext from '../context/UpdateContext'

interface NewLocationDataType {
    id: string | null;
    locationname: string | null;
    lat: number | null;
    long: number | null;
    category: string;
    likes: number;
  }

export const TrashLocationForm = () => {
    const { newLocation, setNewLocation } = useContext(LocationContext)
    const { trigger, setTrigger } = useContext(UpdateContext)
    let { addRef } = useContext(LocationContext)
    console.log("addRef state",addRef.current)
    const baseUrl = (import.meta.env.VITE_BASE_URL_API)

    const descriptionTracker = (e:React.ChangeEvent<HTMLInputElement>) => {
        newLocation.locationname = e.target.value
        newLocation.category = "trash"
        setNewLocation(newLocation)
    }

    const submitNewLocation = (e:React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(addRef)
        let localwarnings:string[]=[]
        const token = localStorage.getItem("token")
        if (!token) {
            localwarnings.push("You need to log in.")
        }
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        let suffix=""
        if (addRef.current.type == "new") {
            if (newLocation.lat == "") {
                localwarnings.push("You need to select a place where you found trash.")
            }
            if (newLocation.category == "") {
                localwarnings.push("You need to add information about the place.")
            }
            else {
                if(localwarnings.length==0){
                urlencoded.append("locationname", newLocation.locationname!);
                urlencoded.append("lat", newLocation.lat!);
                urlencoded.append("long", newLocation.long!);
                urlencoded.append("category", newLocation.category);
                suffix="post"
            }
            }
        };
        if (addRef.current.type == "existing") {            
                urlencoded.append("id", addRef.current.id);
                suffix="modify"
            }
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
            };
            const postUrl = baseUrl + "locations/"+suffix
            console.log(postUrl)
            fetch(postUrl, requestOptions)
                .then((response) => response.json())
                .then((result) => console.log("result", result))
                .catch((error) => console.log("error", error));
            setTrigger((prev) => { return (prev + 1) })

       
    }

    return (
        <div className="formPlusMap">

            <form>
                <input className="inputLocationName" type="text" onChange={e => descriptionTracker(e)} placeholder='How would you describe the place?'></input>
                <MapElement foundCleaned="found"></MapElement>
                <input id="submitNewLocation" type="submit" onClick={e => submitNewLocation(e)}></input>
            </form>
        </div>
    )
}
