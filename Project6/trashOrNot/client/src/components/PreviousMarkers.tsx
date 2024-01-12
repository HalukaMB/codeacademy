import { useContext } from 'react'
import { LocationContext } from '../context/LocationContext'
import {  Popup } from 'react-leaflet'
import trashicon from "../assets/trash.svg";
import orange_trash_icon from "../assets/trash-orange.svg";
import red_trash_icon from "../assets/trash-red.svg";
import * as L from 'leaflet';

import {
  type EventedProps,
  createLayerComponent,
} from '@react-leaflet/core'

import {
  type LatLngExpression,
  Marker as LeafletMarker,
  type MarkerOptions,
} from 'leaflet'

import type { ReactNode } from 'react'
/* https://stackoverflow.com/questions/17423261/how-to-pass-data-with-marker-in-leaflet-js */
export class DataMarker extends L.Marker {
  databaseid: any;
  extrainfo: any;

  constructor(latLng: L.LatLngExpression, databaseid: string | null, extrainfo: string | null, options?: L.MarkerOptions) {
    super(latLng, options);
    this.setData(databaseid);
    this.setExtrainfo(extrainfo);
  }

  getData() {
    return this.databaseid;
  }

  setData(databaseid: any) {
    this.databaseid = databaseid;
  }
  getExtrainfo() {
    return this.extrainfo;
  }

  setExtrainfo(extrainfo: any) {
    this.extrainfo = extrainfo;
  }
}


export interface CustomMarkerProps extends MarkerOptions, EventedProps {
  children?: ReactNode;
  position: LatLngExpression;
  databaseid: string | null;
  extrainfo: string | null;

}

export const CustomMarker = createLayerComponent<LeafletMarker, CustomMarkerProps>(
  function createMarker({ databaseid, extrainfo, position, ...options }, ctx) {
    const instance = new DataMarker(position, databaseid, extrainfo, options);
    instance.databaseid = databaseid;
    instance.extrainfo = extrainfo;

    return { instance, context: { ...ctx, overlayContainer: instance } };
  },
 
);

interface NewLocationDataType {
  _id: string | null;
  locationname: string | null;
  lat: string | null;
  long: string | null;
  category: string;
  likes: number;
}
interface propType {
  foundCleaned: string
  previousPositions: NewLocationDataType[]
}

const PreviousMarkers = ({ foundCleaned, previousPositions }: propType) => {

  let { deleteRef } = useContext(LocationContext)
  let { addRef } = useContext(LocationContext)
  const { newPlace, setNewPlace } = useContext(LocationContext)

  let trash = L.icon({
    iconUrl: trashicon,
    iconRetinaUrl: trashicon,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  });

  let orange_trash = L.icon({
    iconUrl: orange_trash_icon,
    iconRetinaUrl: orange_trash_icon,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  })

  let red_trash = L.icon({
    iconUrl: red_trash_icon,
    iconRetinaUrl: red_trash_icon,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  })

  /*     let customMarker = L.Marker.extend({
          options: { 
             databaseid: 'Custom data!',
          }
       }); */
  /* https://stackoverflow.com/questions/17423261/how-to-pass-data-with-marker-in-leaflet-js */
  const clickToAddInfo = (e: L.LeafletMouseEvent) => {
    const target = e.target
    addRef.current.type = "existing"
    addRef.current.id = target.options.databaseid
    setNewPlace(false)
  }

  const clickToDelete = (e: L.LeafletMouseEvent) => {
    const target = e.target
    deleteRef.current = {
      "lat": target._latlng.lat, "long": target._latlng.lng,
      "_id": target.databaseid, "locationname": target.extrainfo,
      "category": "", "likes": 0
    }
  }

  if (previousPositions != null) {
    return (
      <>
        {(previousPositions != null) && previousPositions.map((element: NewLocationDataType) => {
          console.log(element["likes"]);
          const likes = element["likes"]
          let iconcolor = null
          if (likes >= 0) {
            iconcolor = orange_trash
          }
          if (likes > 1) {
            iconcolor = red_trash
          }
          return (
            <CustomMarker icon={iconcolor!} key={element["_id"]} databaseid={element["_id"]} extrainfo={element["locationname"]}
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
              }}>
              <Popup key={element["_id"] + "_popup"}>
                {element["locationname"]}
                <br></br>
                <br></br>
                and
                {" " + element["likes"] + " "}
                others were annoyed by the trash here
              </Popup>
            </CustomMarker>
          )
        }
        )
        }

      </>
    )
  }
}
export default PreviousMarkers