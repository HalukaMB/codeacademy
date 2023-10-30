import React from 'react'
import { useNavigate } from 'react-router';



const SelectMenu = ({countryFilter,reducedData}) => {
    let navigate=useNavigate()

const selectFunction=(event)=>{console.log("hey")
const countryCodeSelected=(reducedData[event.target.value].info.code)
        navigate(`/${(countryCodeSelected)}`)}

return(
    (Object.keys(countryFilter).length > 0)?
    <select onChange={(event) => selectFunction(event)}>
        {Object.keys(countryFilter).sort().map(element=> {
                return (<option id={countryFilter[element]}>{element}</option>)
              })}
    </select>
:    <div>WAIT</div>
)
}

export default SelectMenu