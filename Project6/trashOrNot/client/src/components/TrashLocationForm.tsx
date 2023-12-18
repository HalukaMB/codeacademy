import { useContext, useEffect, useState } from 'react'
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
    const { newPlace, setNewPlace } = useContext(LocationContext)
    const [warnings, setWarnings] = useState<string[]>([])

    useEffect(() => {
        setNewPlace(true)
    

    }, [])
    

    console.log("addRef state", addRef.current)
    const baseUrl = (import.meta.env.VITE_BASE_URL_API)

    const descriptionTracker = (e: React.ChangeEvent<HTMLInputElement>) => {
        newLocation.locationname = e.target.value
        newLocation.category = "trash"
        setNewLocation(newLocation)
    }

    const submitNewLocation = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        let warningsLocally: string[] = []
        const token = localStorage.getItem("token")
        if (!token) {
            warningsLocally.push("You need to log in.")
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        let suffix = ""
        if (addRef.current.type == "new") {
            if (newLocation.lat == "") {
                warningsLocally.push("You need to select a place where you found trash.")
            }
            if (newLocation.category == "") {
                warningsLocally.push("You need to add information about the place.")
            }
            else {
                urlencoded.append("locationname", newLocation.locationname!);
                urlencoded.append("lat", newLocation.lat!);
                urlencoded.append("long", newLocation.long!);
                urlencoded.append("category", newLocation.category);
                suffix = "post"
            }
        };

        if (addRef.current.type == "existing") {
            if (addRef.current.id == "") {
                warningsLocally.push("You need to select an existing place on the map.")
            }
            else {
                urlencoded.append("id", addRef.current.id);
                suffix = "modify"
            }
        }
        if (warningsLocally.length == 0) {
            setWarnings([])
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
            };
            const postUrl = baseUrl + "locations/" + suffix
            console.log(postUrl)
            fetch(postUrl, requestOptions)
                .then((response) => response.json()  )
                .then((result) => console.log("result", result))
                .catch((error) => console.log("error", error));
            setTrigger((prev) => { return (prev + 1) })
        } else {
            setWarnings(warningsLocally)


        }


    }

    return (
        <div className="formPlusMap">

            <form>
                <MapElement foundCleaned="found"></MapElement>

                {newPlace ?
                    <><input className="inputLocationName" type="text" onChange={e => descriptionTracker(e)} placeholder='How would you describe the place?'></input>
                        {(warnings.length > 0) && warnings.map((element: string, index: number) => { return (<div className="warnings" key={index}>{element}</div>) }
                        )}
                        <input id="submitNewLocation" type="submit" value="New Location" onClick={e => submitNewLocation(e)}></input></> : <>
                        {(warnings.length > 0) && warnings.map((element: string, index: number) => { return (<div className="warnings" key={index}>{element}</div>) }
                        )}
                        <input id="submitNewLocation" type="submit" value="Increase Urgency" onClick={e => submitNewLocation(e)}></input>
                        </>}
                    
            </form>
        </div>
    )
}
