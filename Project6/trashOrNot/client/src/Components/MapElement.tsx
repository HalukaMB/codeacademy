import * as L from 'leaflet';

import {  useContext, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import getTrashLocations from '../hooks/getTrashLocations';
import { LocationContext } from '../context/LocationContext';
import trashicon from "../assets/trash.svg";
import UpdateContext from '../context/UpdateContext';
import PreviousMarkers from './PreviousMarkers';
import NewMarker from './NewMarker';

type functionProps={
    foundCleaned:string
}
interface NewLocationDataType {
    _id: string | null;
    locationname: string | null;
    lat: string | null;
    long: string | null;
    category: string;
    likes: number;
  }
  export class TSMarker extends L.Marker {
    options: L.MarkerOptions

    constructor(latLng: L.LatLngExpression, options?: L.MarkerOptions) {
        super(latLng, options)
    }
}
  

const MapElement = ({ foundCleaned}:functionProps) => {
    const { newLocation, setNewLocation, defaultNewLocation } = useContext(LocationContext)
    const [previousPositions, setPreviousPositions] = useState<NewLocationDataType[] | null>(null);

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
    const clickToDelete = (e: L.LeafletMouseEvent) => {
        const target=e.target
        deleteRef.current = { "lat": target._latlng.lat, "long": target._latlng.lng,
         "_id": target.options.databaseid, "locationname": target.options.extrainfo, 
        "category":"","likes":0}
    }
    const clickToAddInfo = (e : L.LeafletMouseEvent) => {
        const target=e.target
        addRef.current.type ="existing"
        addRef.current.id = target.options.databaseid
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

                const reducedPositions = previousPositions.filter((element:NewLocationDataType) => {
                    return element["_id"] !== deleteRef.current["_id"];
                });
                setPreviousPositions(reducedPositions)
            }
        }

    }, [trigger])

    return (
        <div>

            <div id="mapid">
                <MapContainer center={[52.52, 13.41]} zoom={10} scrollWheelZoom={false}>
                    {previousPositions&&
                    <PreviousMarkers foundCleaned={foundCleaned} previousPositions={previousPositions}/>}
                    {(foundCleaned=="found")&&<NewMarker />}
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