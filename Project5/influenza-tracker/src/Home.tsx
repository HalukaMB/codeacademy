import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { readRemoteFile } from 'react-papaparse';
import CountryCardMain from './CountryCardMain';
import { useNavigate } from 'react-router';
import SelectMenu from './SelectMenu';
import { ReducedDataContext } from "./context/reducedDataContext";
import { AuthenticationContext } from './context/AuthenticationContext';
import LoginFeature from './LoginFeature';



function Home() {

  const {countryFilter, reducedData}= useContext(ReducedDataContext)
  return (
    <>
      <SelectMenu countryFilter={countryFilter}></SelectMenu>
      <LoginFeature></LoginFeature>
      <div className='countrygrid'>

        {reducedData ? Object.keys(reducedData).sort().map((country,index) => {
          const datapackage = reducedData[country]
          return (

            <CountryCardMain countryData={datapackage} key={index}></CountryCardMain>
          )
        }) :
          <h1>Nothing</h1>
        }
      </div>
    </>
  )
}

export default Home
