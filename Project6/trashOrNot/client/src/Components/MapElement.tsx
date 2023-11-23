import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import getTrashLocations from '../hooks/getTrashLocations';

const MapElement = () => {

    const [trashLocation, setTrashLocation] =  useState<[number, number]>([0,0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [previousPositions, setPreviousPositions] = useState<[number, number][]|null>(null);

    const getPreviousLocations=()=>{
    getTrashLocations().then(
    (previousPoints:[])=>{
        console.log(previousPoints)
        setPreviousPositions(previousPoints)
        })}

    
    useEffect(() => {
        getPreviousLocations()
      }, [])
   

    const NewMarker = () => {
        const map = useMapEvents({
            click(e) {     
                console.log(e)                           
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);                
            },            
        })
        console.log(selectedPosition)
        return (
            selectedPosition ? 
                <Marker           
                key={selectedPosition[0]}
                position={selectedPosition}
                interactive={false} 
                />
            : null
        )   
        
    }
    const PreviousMarkers = () => {
        return (
            previousPositions ? 
                <Marker           
                key={previousPositions[0]["lat"]}
                position={[previousPositions[0]["lat"],previousPositions[0]["long"]]}
                interactive={false} 
                />
            : null
        )
        
        
    }

    return (
    <div><div>Put the pin on where you found the trash. Please be as accurate as possible.</div>
        <div id="mapid">
        <MapContainer center={[52.52, 13.41]} zoom={10}scrollWheelZoom={false}>
        <NewMarker />
        <PreviousMarkers />


      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      
    </MapContainer>
        </div>

    </div>
  )
}

export default MapElement