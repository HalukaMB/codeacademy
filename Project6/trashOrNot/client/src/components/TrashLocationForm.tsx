import React, { useContext } from 'react'
import MapElement from './MapElement'
import { LocationContext } from '../context/LocationContext'
import UpdateContext from '../context/UpdateContext'


 

export const TrashLocationForm = () => {
    const { newLocation, setNewLocation } = useContext(LocationContext)
    const {   trigger, setTrigger } = useContext(UpdateContext)

    const baseUrl=(import.meta.env.VITE_BASE_URL_API)
    const descriptionTracker=(e)=>{
        newLocation.locationname=e.target.value
        newLocation.category="trash"

        setNewLocation(newLocation)
    }

    const submitNewLocation=(e)=>{
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!token){
            console.log("error")
        }
        else{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("locationname", newLocation.locationname);
        urlencoded.append("lat", newLocation.lat);
        urlencoded.append("long", newLocation.long);
        urlencoded.append("category", newLocation.category);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
          };
          const postUrl=baseUrl+"locations/post"
          console.log(postUrl)

          fetch(postUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log("result", result))
            .catch((error) => console.log("error", error));

            setTrigger((prev)=>{return(prev+1)})

        };}
    

    return (
        <div className="formPlusMap">

            <form>
            <input className="inputLocationName" type="text" onChange={e=>descriptionTracker(e)} placeholder='How would you describe the place?'></input>
                <MapElement foundCleaned="found" newLocation={newLocation} setNewLocation={setNewLocation}></MapElement>
                <input id="submitNewLocation"type="submit" onClick={e=>submitNewLocation(e)}></input>
            </form>
        </div>
    )
}
