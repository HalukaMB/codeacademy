import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import getTrashLocations from '../hooks/getTrashLocations';
import { NewLocationContext } from '../context/NewLocationContext';
import trashicon from "../assets/trash.svg";

const MapElement = () => {
    // const{setNewLocation, newLocation}=props
    const [previousPositions, setPreviousPositions] = useState<[number, number][] | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

  const { newLocation, setNewLocation } = useContext(NewLocationContext)
  let locallocation = {}

  let trash = L.icon({
    iconUrl: trashicon,
    iconRetinaUrl: trashicon,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  });
  



    const getPreviousLocations = () => {
        getTrashLocations().then(
            (previousPoints: []) => {
                setPreviousPositions(previousPoints)
            })
    }

    useEffect(() => {
        getPreviousLocations()
    }, [])

    const PreviousMarkers = () => {
        if (previousPositions!=null){
        return (
            <>
            {previousPositions.map((element) => (
                <Marker icon={trash} key={element["lat"]}
                position={[element["lat"],element["long"]]}
                >
                    <Popup>
                        {element["locationname"]}
                    </Popup>
                </Marker>
            
              ))
            }
            </>
        )}
    }

    const NewMarker = () => {
        const map = useMapEvents({
            click(e) {
                console.log(e)
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ])
                newLocation.lat=e.latlng.lat;
                newLocation.long=e.latlng.lng;

                setNewLocation((prev) => {
                  return {...prev,lat:e.latlng.lat,long:e.latlng.lng }})

                console.log(newLocation)

                
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
        <div><div>Put the pin on where you found the trash. Please be as accurate as possible.</div>
            <div id="mapid">
                <MapContainer center={[52.52, 13.41]} zoom={10} scrollWheelZoom={false}>
                    <PreviousMarkers />
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