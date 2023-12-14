import { useContext } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext"


const checkedin=()=>{
    
    console.log("checkin")
    const { userChecked, setUserChecked } = useContext(AuthenticationContext)

const localtoken = localStorage.getItem("token")
    if (localtoken){
      console.log("token found")
      setUserChecked(true)
    }
}

export default checkedin