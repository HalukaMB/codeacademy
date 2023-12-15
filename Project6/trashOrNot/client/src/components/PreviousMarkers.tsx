import React, { useContext, useEffect, useState } from 'react'
import { LocationContext } from '../context/LocationContext'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import trashicon from "../assets/trash.svg";
import UpdateContext from '../context/UpdateContext';
import * as L from 'leaflet';
import getTrashLocations from '../hooks/getTrashLocations';

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
interface propType{
    foundCleaned:string
    previousPositions:NewLocationDataType[]
}

const PreviousMarkers = ({foundCleaned,previousPositions}:propType) => {

    const [foo, setFoo] = useState(null)
    let { deleteRef } = useContext(LocationContext)
    let { addRef } = useContext(LocationContext)
    const {newPlace, setNewPlace} = useContext(LocationContext)

    let trash = L.icon({
        iconUrl: trashicon,
        iconRetinaUrl: trashicon,
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [25, 55],
    });
    
    const clickToAddInfo = (e : L.LeafletMouseEvent) => {
        const target=e.target
        addRef.current.type ="existing"
        addRef.current.id = target.options.databaseid
        setNewPlace(false)
    }
   
    const clickToDelete = (e: L.LeafletMouseEvent) => {
        const target=e.target
        deleteRef.current = { "lat": target._latlng.lat, "long": target._latlng.lng,
         "_id": target.options.databaseid, "locationname": target.options.extrainfo, 
        "category":"","likes":0}
    }
    
    if (previousPositions != null) {
        const map = useMapEvents({
            click(e) {
                console.log(e)
            }
        })
        return (
            <>
                {(previousPositions!=null)&&previousPositions.map((element:NewLocationDataType) => (
                    
                    <Marker icon={trash} key={element["_id"]} databaseid={element["_id"]} extrainfo={element["locationname"]}
                        position={[Number(element["lat"]), Number(element["long"])]}
                        eventHandlers={{
                            click: (e) => {
                                if (foundCleaned == "found") {
                                    clickToAddInfo(e)
                                }
                                if (foundCleaned == "cleaned") {
                                    clickToDelete(e)
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
export default PreviousMarkers