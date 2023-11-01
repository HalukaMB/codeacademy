import React from 'react'
import { useNavigate } from 'react-router';



const SelectMenu = ({countryFilter}) => {
    let navigate=useNavigate()
    countryFilter["* All Countries *"]="* All Countries *"
console.log(countryFilter)
const selectFunction=(event)=>{console.log("hey")
if((event.target.value)!=="* All Countries *"){
    let countryNameSelected=event.target.value
    let countryId=""
    console.log(countryNameSelected)
   Object.keys(countryFilter).map(key=>{
    const countryNameIterated=key
    if(countryNameSelected==countryNameIterated){
        countryId=countryFilter[key]
        console.log(countryId)
    }
}

   )
   navigate(`/${countryId}`)
}
else{
    navigate("/")
}
    }

return(
    (Object.keys(countryFilter).length > 0)?
    <>
    <select onChange={(event) => selectFunction(event)}>
        {Object.keys(countryFilter).sort().map((element,index)=> {
                return (<option key={index} id={countryFilter[element]}>{element}</option>)
              })}
    </select>
    </>
:    <div>WAIT</div>
)
}

export default SelectMenu