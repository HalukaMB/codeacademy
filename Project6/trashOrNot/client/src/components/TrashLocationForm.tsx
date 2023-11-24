import React, { useContext } from 'react'
import MapElement from './MapElement'
import { NewLocationContext } from '../context/NewLocationContext'


 

export const TrashLocationForm = () => {
    const { NewLocation, setNewLocation } = useContext(NewLocationContext)

    console.log(NewLocation)
    return (
        <div>
            <form>
                <input className="inputLocationName" type="text" placeholder='How would you describe the place?'></input>
                <MapElement></MapElement>
                <input type="submit"></input>
            </form>
        </div>
    )
}
