import React from 'react'
import MapElement from './MapElement'

export const TrashLocationForm = () => {
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
