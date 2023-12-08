import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import getTrashLocations from '../hooks/getTrashLocations';
import { LocationContext } from '../context/LocationContext';
import trashicon from "../assets/trash.svg";
import UpdateContext from '../context/UpdateContext';

const MapElement = ({foundCleaned}) => {
    // const{setNewLocation, newLocation}=props
    const [previousPositions, setPreviousPositions] = useState<[number, number][] | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);


  const { newLocation, setNewLocation } = useContext(LocationContext)
  const {  deleteLocation, setDeleteLocation } = useContext(LocationContext)
  const {   trigger, setTrigger } = useContext(UpdateContext)
  let trash = L.icon({
    iconUrl: trashicon,
    iconRetinaUrl: trashicon,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  });
const clickToDelete=(e)=>{console.log(e.options)
/   setDeleteLocation((prev)=>{return {...prev,["lat"]:e._latlng.lat,["long"]:e._latlng.lng,["id"]:e.options.databaseid,["locationname"]:e.options.extrainfo}})
 

}

    const getPreviousLocations = () => {
        getTrashLocations().then(
            (previousPoints: []) => {
                console.log("previous positions")
                setPreviousPositions(previousPoints)
            })
    }

    useEffect(() => {
        getPreviousLocations()
        console.log("use effect runs")
        if (previousPositions!=null){
        console.log(previousPositions)
        if (foundCleaned=="found"){
            setPreviousPositions([...previousPositions,newLocation])
        }
        if (foundCleaned=="cleaned"){
            console.log("CLEANER")

            const reducedPositions = previousPositions.filter(element=> {
                return element["_id"] !== deleteLocation["id"];
              });
              console.log(reducedPositions)
              setPreviousPositions(reducedPositions)
            }
              

        }

        console.log(newLocation)
        console.log(deleteLocation)
        console.log(previousPositions)

    }, [trigger])

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
                <Marker icon={trash} key={element["_id"]} databaseid={element["_id"]} extrainfo={element["locationname"] }
                position={[element["lat"],element["long"]]} 
                eventHandlers={{
                    click: (e) => {
                        clickToDelete(e.target)
                        map.setView(
                            [
                              e.target._latlng.lat,
                              e.target._latlng.lng
                            ],
                            13
                          );


                    },
                  }}
                >
                    <Popup>
                        {element["locationname"]}
                    </Popup>
                </Marker>
            
              ))
            }
            {previousPositions.map(element=>{console.log(element)})}

            </>
        )}
    }

    const NewMarker = () => {
        const map = useMapEvents({
            click(e) {
                if((foundCleaned=="found")){

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

            }
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
        <div>
   
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