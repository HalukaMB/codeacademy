import React, { useContext } from 'react'
import MapElement from './MapElement'
import { LocationContext } from '../context/LocationContext'




export const CleanedLocationForm = () => {
    const { deleteLocation, setDeleteLocation } = useContext(LocationContext)
    console.log(deleteLocation)
    const baseUrl = (import.meta.env.VITE_BASE_URL_API)
    const radioChange=(event)=>{
        const locationCategory=(event.target.value)
        setDeleteLocation(prev=>({...prev,["category"]:locationCategory}))

    }
    const submitNewLocation = (e) => {
        e.preventDefault()
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("locationname", deleteLocation.locationname);
        urlencoded.append("lat", deleteLocation.lat);
        urlencoded.append("long", deleteLocation.long);
        urlencoded.append("category", deleteLocation.category);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
        };
        const postUrl = baseUrl + "locations/post"
        console.log(postUrl)

        fetch(postUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log("result", result))
            .catch((error) => console.log("error", error));
    };


    return (
        <div className="formPlusMap">
            <form>
            <fieldset>
            <div className="containerOptionsCleanedOrSeen" onChange={(event)=>radioChange(event)}>
                <div className="optionsCleanedOrSeen">
                    <input className="inputCleanedSeen" name="cleanedOrSeen" type="radio" id="cleanedOption" value="cleaned" />
                    <label htmlFor="cleanOption">I cleaned it.</label>
                </div>

                <div className="optionsCleanedOrSeen">
                    <input className="inputCleanedSeen" name="cleanedOrSeen" type="radio" id="seenOption" value="seen" />
                    <label htmlFor="seeOption">I see that is clean now.</label>
                </div>
                </div>

                </fieldset>
                <MapElement foundCleaned="cleaned"></MapElement>
                <input id="submitNewLocation" type="submit" onClick={e => submitNewLocation(e)}></input>

            </form>
        </div>
    )
}
