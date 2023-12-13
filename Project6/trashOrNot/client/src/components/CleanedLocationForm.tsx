import React, { useContext, useRef, useState } from 'react'
import MapElement from './MapElement'
import { LocationContext } from '../context/LocationContext'
import UpdateContext from '../context/UpdateContext'




export const CleanedLocationForm = () => {
    let { deleteRef } = useContext(LocationContext)
    const {   trigger, setTrigger } = useContext(UpdateContext)
    let locationCategory = useRef<string>("")

    const [warnings, setWarnings] = useState([""])
    console.log(warnings)

    const baseUrl = (import.meta.env.VITE_BASE_URL_API)
    const radioChange=(event:React.FormEvent<HTMLDivElement>)=>{
        locationCategory.current=(event.target as HTMLInputElement).value
    }
    const submitCleanedLocation = (e:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const token = localStorage.getItem("token")
        e.preventDefault()
        console.log(deleteRef)
        console.log(locationCategory)

        let warningsLocally=[]
        if((deleteRef.current._id=="") || (locationCategory.current=="")){
            warningsLocally.push("You have forgotten to say whethere you cleaned up the trash.")
        }
        if (!token){
            console.log("error")
        }
        else{
        console.log(deleteRef)

        console.log(deleteRef.current)
        const myHeaders = new Headers();
         myHeaders.append("Authorization", `Bearer ${token}`);
         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("locationname", deleteRef.current.locationname!);
        urlencoded.append("id", deleteRef.current._id!);
        urlencoded.append("category", locationCategory.current);

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
                
{deleteRef.current._id==""?
<div id="putPin">Click on the exact pin where the trash has been taken away.</div>
            :
            <div id="putPin">Is this the correct place?</div>
            }
                <MapElement foundCleaned="cleaned"></MapElement>


            {warnings.length>0&&warnings.map((element:string, index:number)=>{return(<div key={index}>{element}</div>)}
            )}
            <input id="submitNewLocation" type="submit" onClick={e => submitCleanedLocation(e)} value="Delete" ></input>

            </form>
        </div>
    )
}
