import { useContext, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import getTrashLocations from '../hooks/getTrashLocations';
import { LocationContext } from '../context/LocationContext';
import trashicon from "../assets/trash.svg";
import UpdateContext from '../context/UpdateContext';

type functionProps={
    foundCleaned:string
}

const MapElement = ({ foundCleaned}:functionProps) => {
    const [previousPositions, setPreviousPositions] = useState<[number, number][] | null>(null);
    const { newLocation, setNewLocation, defaultNewLocation } = useContext(LocationContext)

    let { deleteRef } = useContext(LocationContext)
    let { addRef } = useContext(LocationContext)

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
    const clickToAddInfo = (e) => {
        console.log(e.options.databaseid)
        addRef.current.type ="existing"
        addRef.current.id = e.options.databaseid
    }

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
                                        clickToDelete(e.target)
                                    }
                                    if (foundCleaned == "found") {
                                        clickToAddInfo(e.target)
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
                                <br></br>
                                <br></br>
                                and
                                {" "+element["likes"]+" "}
                                others were annoyed by the trash here
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
                    addRef.current.type = "new"
                    setNewLocation((prev) => {
                        return { ...prev, lat: e.latlng.lat, long: e.latlng.lng }
                    })
                    console.log(newLocation)

                }
            },
        })
        return (
            newLocation ?
                <Marker
                    key={"New Pos"}
                    position={[newLocation.lat,newLocation.long]}
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