import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { readRemoteFile } from 'react-papaparse';
import CountryCardMain from './CountryCardMain';
import { useNavigate } from 'react-router';
import SelectMenu from './SelectMenu';



function Home({ countryFilter, reducedData }) {

  return (
    <>
      <SelectMenu countryFilter={countryFilter} reducedData={reducedData}></SelectMenu>

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
