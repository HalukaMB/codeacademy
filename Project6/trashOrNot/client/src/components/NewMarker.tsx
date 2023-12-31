import { useContext } from "react"
import { Marker, useMapEvents } from "react-leaflet"
import { LocationContext } from "../context/LocationContext"
interface NewLocationDataType {
    _id: string | null;
    locationname: string | null;
    lat: string | null;
    long: string | null;
    category: string;
    likes: number;
  }
const NewMarker = () => {

    const { newLocation, setNewLocation } = useContext(LocationContext)
    let { addRef } = useContext(LocationContext)
    const {newPlace, setNewPlace} = useContext(LocationContext)

        const map = useMapEvents({
            click(e) {
                
                    addRef.current.type = "new"
                    const timeNow=Date.now()
                    setNewLocation((prev):NewLocationDataType => {
                        return { ...prev, lat: String(e.latlng.lat), long: String(e.latlng.lng), _id:String(timeNow) }
                    })
                    setNewPlace(true)

                    console.log(newLocation)
            },
        })
        return (
            newLocation ?
                <Marker
                    key={"New Pos"}
                    position={[Number(newLocation.lat),Number(newLocation.long)]}
                    interactive={false}
                />
                : null
        )
    }

    export default NewMarker