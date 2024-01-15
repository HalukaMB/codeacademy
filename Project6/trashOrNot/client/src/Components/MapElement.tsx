import * as L from 'leaflet';

import {  useContext, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import getTrashLocations from '../hooks/getTrashLocations';
import { LocationContext } from '../context/LocationContext';
import trashicon from "../assets/trash.svg";
import UpdateContext from '../context/UpdateContext';
import PreviousMarkers from './PreviousMarkers';
import NewMarker from './NewMarker';


interface NewLocationDataType {
    _id: string | null;
    locationname: string | null;
    lat: string | null;
    long: string | null;
    category: string;
    likes: number;
  }
  type functionProps={
    foundCleaned:string;
    pointsPassed:NewLocationDataType[]
    gpsPoint:L.LatLngExpression|null
}
  export class TSMarker extends L.Marker {

    constructor(latLng: L.LatLngExpression, options?: L.MarkerOptions) {
        super(latLng, options)
    }
}
  

const MapElement = ({ foundCleaned, gpsPoint,pointsPassed}:functionProps) => {

    
    const { newLocation, setNewLocation, defaultNewLocation } = useContext(LocationContext)
    const [previousPositions, setPreviousPositions] = useState<NewLocationDataType[] | null>(null);

    let { deleteRef } = useContext(LocationContext)
    let { addRef } = useContext(LocationContext)
    const { trigger, setTrigger } = useContext(UpdateContext)


    const [centerParameter, setCenterParameter] = useState<L.LatLngExpression>([52.52, 13.41])
    const [zoomdepth, setZoomdepth] = useState(10)

    
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


    
    useEffect(() => {
        if (pointsPassed.length!=0){
            setPreviousPositions(pointsPassed)

        }
    }, [pointsPassed])

    useEffect(() => {
        if (pointsPassed.length != 0) {
            if (foundCleaned == "found") {
                if (newLocation.lat!=null){
                setPreviousPositions([...pointsPassed, newLocation])
                setNewLocation(defaultNewLocation)
            }
            }
            if (foundCleaned == "cleaned") {
                console.log("CLEANER")
                
                const reducedPositions = pointsPassed.filter((element:NewLocationDataType) => {
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
                    {(previousPositions)&&
                    <PreviousMarkers foundCleaned={foundCleaned} previousPositions={previousPositions} gpsPoint={gpsPoint}/>}
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