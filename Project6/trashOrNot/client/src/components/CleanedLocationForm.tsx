import React, { useContext, useState } from 'react'
import MapElement from './MapElement'
import { LocationContext } from '../context/LocationContext'
import UpdateContext from '../context/UpdateContext'




export const CleanedLocationForm = () => {
    const { deleteLocation, setDeleteLocation } = useContext(LocationContext)
    const {   trigger, setTrigger } = useContext(UpdateContext)

    const [warnings, setWarnings] = useState([""])
    console.log(warnings)

    const baseUrl = (import.meta.env.VITE_BASE_URL_API)
    const radioChange=(event)=>{
        const locationCategory=(event.target.value)
        setDeleteLocation(prev=>({...prev,["category"]:locationCategory}))

    }
    const submitCleanedLocation = (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault()
        let warningsLocally=[]
        if((deleteLocation.id=="") || (deleteLocation.category=="")){
            warningsLocally.push("You have forgotten to say whethere you cleaned up the trash.")
        }
        if (!token){
            console.log("error")
        }
        else{

        const myHeaders = new Headers();
         myHeaders.append("Authorization", `Bearer ${token}`);
         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("locationname", deleteLocation.locationname);
        urlencoded.append("id", deleteLocation.id);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
        };
        const postUrl = baseUrl + "locations/delete"

        if (warningsLocally.length==0){
        setWarnings([])
        fetch(postUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log("result", result),
            )
            .catch((error) => console.log("error", error));
        }else{
            setWarnings(warningsLocally)
        }
        setTrigger((prev)=>{return(prev+1)})

    }
    };


    return (
        <div className="formPlusMap">

            <form>
            <fieldset>
            <div className="containerOptionsCleanedOrSeen" onChange={(event)=>radioChange(event)}>
                <div className="optionsCleanedOrSeen">
                    <input className="inputCleanedSeen" name="cleanedOrSeen" type="radio" id="cleanedOption" value="cleaned" />
                    <label htmlFor="cleanOption">cleaned it yourself.</label>
                </div>

                <div className="optionsCleanedOrSeen">
                    <input className="inputCleanedSeen" name="cleanedOrSeen" type="radio" id="seenOption" value="seen" />
                    <label htmlFor="seeOption">just noticed that it is clean now.</label>
                </div>
                </div>

                </fieldset>
                
{deleteLocation.id==""?
<div id="putPin">Click on the exact pin where the trash has been taken away.</div>
            :
            <div id="putPin">Is this the correct place?</div>
            }
                <MapElement foundCleaned="cleaned"></MapElement>
                {(deleteLocation.locationname!="")&&
        <div id="putPin">This is the extra info that users have provided: {deleteLocation.locationname}</div>
    
            }

            {warnings.length>0&&warnings.map((element:string, index:number)=>{return(<div key={index}>{element}</div>)}
            )}
            <input id="submitNewLocation" type="submit" onClick={e => submitCleanedLocation(e)}></input>

            </form>
        </div>
    )
}
