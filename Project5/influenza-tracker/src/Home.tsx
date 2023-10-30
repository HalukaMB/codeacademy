import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { readRemoteFile } from 'react-papaparse';
import CountryCardMain from './CountryCardMain';



function Home({countryFilter, reducedData}) {
 
    return (
        <>
          {countryFilter.length > 0 ?
            <select>
              {countryFilter.map(element => {
                return (<option>{element}</option>)
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
              <CountryCardMain countryName={country} countryData={datapackage}></CountryCardMain>
            )
          }) :
            <h1>Nothing</h1>
          }
        </div>
        </>
      )
}

export default Home
