import { useContext, useEffect } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext"


const checkedin=()=>{
    
  const { userChecked, setUserChecked } = useContext(AuthenticationContext)
  useEffect(() => {
    const localtoken = localStorage.getItem("token")
    if (localtoken){
      const jwtinfo=(JSON.parse(atob(localtoken.split(".")[1])))
      const expdate=(jwtinfo["exp"]*1000);
      if  (Date.now()<=expdate){

        setUserChecked({...userChecked,"name":jwtinfo["name"],"id":jwtinfo["sub"]})
      }else{
        setUserChecked({"name":"", "id":"","foundTrashPlaces":null,"cleanedTrashPlaces":null})
      }
    }
    
  }, [])
}

export default checkedin