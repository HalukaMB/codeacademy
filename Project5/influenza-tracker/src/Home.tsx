import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { readRemoteFile } from 'react-papaparse';
import CountryCardMain from './CountryCardMain';
import { useNavigate } from 'react-router';



function Home({countryFilter, reducedData}) {
    let navigate=useNavigate()
    return (
        <>
          {Object.keys(countryFilter).length > 0 ?
            <select
            onChange={(event) => {console.log("hey");
            const countryCodeSelected=(reducedData[event.target.value].info.code)
            navigate(`/${(countryCodeSelected)}`)

            }}>

              {Object.keys(countryFilter).sort().map(element => {
                return (<option id={countryFilter[element]} onClick={()=>console.log("hey")}>{element}</option>)
              }
              )}
            </select>
            :
            <h1>Loading...</h1>
          }
                  <div className='countrygrid'>

          {reducedData ? Object.keys(reducedData).sort().map(country => {
            const datapackage = reducedData[country]
            return (
              
              <CountryCardMain countryData={datapackage}></CountryCardMain>
            )
          }) :
            <h1>Nothing</h1>
          }
        </div>
        </>
      )
}

export default Home
