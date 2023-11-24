import React, { useContext } from 'react'
import MapElement from './MapElement'
import { NewLocationContext } from '../context/NewLocationContext'


 

export const TrashLocationForm = () => {
    const { newLocation, setNewLocation } = useContext(NewLocationContext)
    console.log(newLocation)
    const baseUrl=(import.meta.env.VITE_BASE_URL_API)
    console.log(baseUrl)
    const descriptionTracker=(e)=>{
        newLocation.locationname=e.target.value
        setNewLocation(newLocation)
    }

    const submitNewLocation=(e)=>{
        e.preventDefault()
        console.log(newLocation)
        const myHeaders = new Headers();
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
        };
    

    return (
        <div>
            <form>
                <input className="inputLocationName" type="text" onChange={e=>descriptionTracker(e)} placeholder='How would you describe the place?'></input>
                <MapElement></MapElement>
                <input type="submit" onClick={e=>submitNewLocation(e)}></input>
            </form>
        </div>
    )
}
