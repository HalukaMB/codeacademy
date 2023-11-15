import React from 'react'
import { useNavigate } from 'react-router';



const SelectMenu = ({countryFilter}:{[key:string]:string}) => {
    let navigate=useNavigate()
    countryFilter["* All Countries *"]="* All Countries *"
const selectFunction=(event: HTMLElementEvent)=>{
if((event.target.value)!=="* All Countries *"){
    let countryNameSelected=event.target.value
    let countryId=""
   Object.keys(countryFilter).map(key=>{
    const countryNameIterated=key
    if(countryNameSelected==countryNameIterated){
        countryId=countryFilter[key as keyof typeof countryFilter]
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