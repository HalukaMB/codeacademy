import { useContext, useEffect } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext"


const checkedin=()=>{
    
  console.log("checkin")
  const { userChecked, setUserChecked } = useContext(AuthenticationContext)
  useEffect(() => {
    const localtoken = localStorage.getItem("token")
    if (localtoken){
      console.log("token found")
      const timeinfo=(JSON.parse(atob(localtoken.split(".")[1])))
      console.log(timeinfo)
      setUserChecked(true)
    }
  }, [])
}

export default checkedin