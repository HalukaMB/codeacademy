import { useContext } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext"


const checkedinhook=()=>{
    
    console.log("checkin")
    const { userChecked, setUserChecked } = useContext(AuthenticationContext)

const localtoken = localStorage.getItem("token")
    if (localtoken){
      console.log("token found")
      const timeinfo=(JSON.parse(atob(localtoken.split(".")[1])))
      console.log(timeinfo)
      setUserChecked(true)
    }
}

export default checkedinhook