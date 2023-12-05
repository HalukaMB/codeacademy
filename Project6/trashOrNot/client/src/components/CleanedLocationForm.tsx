import React, { useContext } from 'react'
import MapElement from './MapElement'




export const CleanedLocationForm = () => {

    const baseUrl = (import.meta.env.VITE_BASE_URL_API)
    console.log(baseUrl)

    const submitNewLocation = (e) => {
        e.preventDefault()
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
            <div className="containerOptionsCleanedOrSeen">
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
                <MapElement></MapElement>
                <input id="submitNewLocation" type="submit" onClick={e => submitNewLocation(e)}></input>

            </form>
        </div>
    )
}
