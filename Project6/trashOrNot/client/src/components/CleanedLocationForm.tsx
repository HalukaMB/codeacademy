import React, { useContext, useEffect, useRef, useState } from 'react'
import MapElement from './MapElement'
import { LocationContext } from '../context/LocationContext'
import UpdateContext from '../context/UpdateContext'




export const CleanedLocationForm = () => {
    let { deleteRef } = useContext(LocationContext)
    const { trigger, setTrigger } = useContext(UpdateContext)



    let deleteCategory = useRef<string>("")
    const [warnings, setWarnings] = useState<string[]>([])

    const baseUrl = (import.meta.env.VITE_BASE_URL_API)

    useEffect(() => {
        deleteRef.current._id = ""
    }, [])

    const radioChange = (event: React.FormEvent<HTMLDivElement>) => {
        deleteCategory.current = (event.target as HTMLInputElement).value
    }

    const submitCleanedLocation = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const token = localStorage.getItem("token")
        e.preventDefault()

        let warningsLocally = []
        console.log(deleteRef)
        if (!token) {
            warningsLocally.push("You have to log in to declare a place as cleaned.")
        }
        if ((deleteCategory.current == "")) {
            warningsLocally.push("You have not selected whether you have cleaned up the trash or you just noticed that it is cleaned up now.")
        }
        if ((deleteRef.current._id == "")) {
            warningsLocally.push("You have forgotten to click on the pin where you cleaned up the trash.")
        }
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("locationname", deleteRef.current.locationname!);
        urlencoded.append("id", deleteRef.current._id!);
        urlencoded.append("category", deleteCategory.current);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
        };
        const postUrl = baseUrl + "locations/delete"

        if (warningsLocally.length == 0) {
            setWarnings([])
            fetch(postUrl, requestOptions)
                .then((response) => response.json())
                .then((result) => {console.log("result", result);
                deleteRef.current._id=""
            },
                )
                .catch((error) => console.log("error", error));
        } else {
            setWarnings(warningsLocally)
        }
        setTrigger((prev) => { return (prev + 1) })

    };


    return (
        <div className="formPlusMap">

            <form>
                <fieldset>
                    <div className="containerOptionsCleanedOrSeen" onChange={(event) => radioChange(event)}>
                        <div className="optionsCleanedOrSeen">
                            <input className="inputCleanedSeen" name="cleanedOrSeen" type="radio" id="cleanedOption" value="cleaned" />
                            <label htmlFor="cleanOption">Cleaned it yourself.</label>
                        </div>

                        <div className="optionsCleanedOrSeen">
                            <input className="inputCleanedSeen" name="cleanedOrSeen" type="radio" id="seenOption" value="seen" />
                            <label htmlFor="seeOption">Someone else has cleaned up at one spot and you noticed it.</label>
                        </div>
                    </div>
                </fieldset>
                <div id="putPin">Click on the exact pin where the trash has been taken away.</div>
                <MapElement foundCleaned="cleaned"></MapElement>

                {(warnings.length > 0) && warnings.map((element: string, index: number) => { return (<div className="warnings" key={index}>{element}</div>) }
                )}
                <input id="submitNewLocation" type="submit" onClick={e => submitCleanedLocation(e)} value="Delete" ></input>

            </form>
        </div>
    )
}
