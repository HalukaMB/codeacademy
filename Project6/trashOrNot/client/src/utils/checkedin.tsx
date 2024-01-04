import { useContext, useEffect } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext"


const checkedin=()=>{
    
  console.log("checkin")
  const { userChecked, setUserChecked } = useContext(AuthenticationContext)
  useEffect(() => {
    const localtoken = localStorage.getItem("token")
    if (localtoken){
      console.log("token found")
      const jwtinfo=(JSON.parse(atob(localtoken.split(".")[1])))
      const expdate=(jwtinfo["exp"]*1000);
      console.log(jwtinfo)
      if  (Date.now()<=expdate){

        setUserChecked({"name":jwtinfo["name"],"id":jwtinfo["sub"],"foundTrashPlaces":jwtinfo["reportedplaces"],"cleanedTrashPlaces":jwtinfo["cleanedplaces"]})
      }else{
        setUserChecked({"name":"", "id":"","foundTrashPlaces":null,"cleanedTrashPlaces":null})
      }
    }
  }, [])
}

export default checkedin