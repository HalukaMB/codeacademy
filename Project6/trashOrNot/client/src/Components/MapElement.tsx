import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import getTrashLocations from '../hooks/getTrashLocations';
import { LocationContext } from '../context/LocationContext';
import trashicon from "../assets/trash.svg";

const MapElement = ({foundCleaned}) => {
    // const{setNewLocation, newLocation}=props
    const [previousPositions, setPreviousPositions] = useState<[number, number][] | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);


  const { newLocation, setNewLocation } = useContext(LocationContext)
  const {  deleteLocation, setDeleteLocation } = useContext(LocationContext)

 
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

    const handleClick = event => {
        const { lat, lng } = event.latlng
        console.log(`Clicked at ${lat}, ${lng}`)
      }

    const PreviousMarkers = () => {
        if (previousPositions!=null){
            const map = useMapEvents({
                click(e) {
                    console.log(e)
                }})
        return (
            <>
            {previousPositions.map((element) => (
                <Marker icon={trash} key={element["_id"]} databaseid={element["_id"]}
                position={[element["lat"],element["long"]]}
                eventHandlers={{
                    click: (e) => {
                        console.log(e.target);
                        console.log(e.target.options);

                      console.log(e.target._latlng);  // will print 'FooBar' in console
                    },
                  }}
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
                    {(foundCleaned=="found")&&                   <NewMarker />}



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