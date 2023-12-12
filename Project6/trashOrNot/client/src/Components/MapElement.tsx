import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import getTrashLocations from '../hooks/getTrashLocations';
import { LocationContext } from '../context/LocationContext';
import trashicon from "../assets/trash.svg";
import UpdateContext from '../context/UpdateContext';

const MapElement = ({ foundCleaned }) => {
    // const{setNewLocation, newLocation}=props
    const [previousPositions, setPreviousPositions] = useState<[number, number][] | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);


    const { newLocation, setNewLocation, defaultNewLocation } = useContext(LocationContext)
    let { deleteRef } = useContext(LocationContext)
    let { foundInfo, setFoundInfo } = useContext(LocationContext)
    const { trigger, setTrigger } = useContext(UpdateContext)
    let trash = L.icon({
        iconUrl: trashicon,
        iconRetinaUrl: trashicon,
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [25, 55],
    });
    const clickToDelete = (e) => {
        deleteRef.current = { "lat": e._latlng.lat, "long": e._latlng.lng, "id": e.options.databaseid, "locationname": e.options.extrainfo }
    }
    const clickToAddInfoExisting = (e) => {

        setFoundInfo((prev) => {
            return {type: "existing", id: e.options.databaseid}
        })
    
    }
    const clickToAddInfoNew = () =>{
        
        setFoundInfo((prev) => {
            return {type: "new", id: ""}
        })


    }
    console.log(foundInfo)

    const getPreviousLocations = () => {
        getTrashLocations().then(
            (previousPoints: []) => {
                setPreviousPositions(previousPoints)
            })
    }

    useEffect(() => {
        getPreviousLocations()

    }, [])

    useEffect(() => {
        if (previousPositions != null) {
            if (foundCleaned == "found") {
                if (newLocation.lat!=null){
                setPreviousPositions([...previousPositions, newLocation])
                setNewLocation(defaultNewLocation)
            }
            }
            if (foundCleaned == "cleaned") {
                console.log("CLEANER")

                const reducedPositions = previousPositions.filter(element => {
                    return element["_id"] !== deleteRef.current["id"];
                });
                setPreviousPositions(reducedPositions)
            }
        }

    }, [trigger])


    const PreviousMarkers = () => {
        console.log(previousPositions)
        if (previousPositions != null) {
            const map = useMapEvents({
                click(e) {
                    console.log(e)
                }
            })
            return (
                <>
                    {(previousPositions!=null)&&previousPositions.map((element) => (
                        
                        <Marker icon={trash} key={element["_id"]} databaseid={element["_id"]} extrainfo={element["locationname"]}
                            position={[element["lat"], element["long"]]}
                            eventHandlers={{
                                click: (e) => {
                                    if (foundCleaned == "cleaned") {
                                        clickToDelete
                                    }
                                    if (foundCleaned == "found") {
                                        clickToAddInfoExisting
                                    }
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
                            <Popup key={element["_id"] + "_popup"}>
                                {element["locationname"]}
                            </Popup>
                        </Marker>

                    ))
                    }

                </>
            )
        }
    }

    const NewMarker = () => {
        const map = useMapEvents({
            click(e) {
                if ((foundCleaned == "found")) {
                    setSelectedPosition([
                        e.latlng.lat,
                        e.latlng.lng
                    ])
                    clickToAddInfoNew
                    newLocation.lat = e.latlng.lat;
                    newLocation.long = e.latlng.lng;
                    setNewLocation((prev) => {
                        return { ...prev, lat: e.latlng.lat, long: e.latlng.lng }
                    })
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