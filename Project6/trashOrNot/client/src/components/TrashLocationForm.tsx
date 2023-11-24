import React, { useContext } from 'react'
import MapElement from './MapElement'
import { NewLocationContext } from '../context/NewLocationContext'


 

export const TrashLocationForm = () => {
    const { newLocation, changeNewLocationData } = useContext(NewLocationContext)

    console.log(newLocation)
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
