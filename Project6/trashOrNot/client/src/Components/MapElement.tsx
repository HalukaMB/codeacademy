import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const MapElement = () => {

    const [trashLocation, setTrashLocation] = useState([])
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

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

    return (
    <div><div>MAP ELEMENT</div>
        <div id="mapid">
        <MapContainer center={[52.52, 13.41]} zoom={10}scrollWheelZoom={false}>
        <NewMarker />

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