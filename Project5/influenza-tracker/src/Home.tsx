import { useContext } from 'react'
import './App.css'
import CountryCardMain from './CountryCardMain';
import SelectMenu from './SelectMenu';
import { ReducedDataContext } from "./context/reducedDataContext";
import LoginFeature from './LoginFeature';
import { NavLink } from "react-router-dom";
import Navbar from './Navbar';


function Home() {

  const { countryFilter, reducedData } = useContext(ReducedDataContext)
  return (
    <><Navbar></Navbar>
      <SelectMenu countryFilter={countryFilter}></SelectMenu>
      <div className='countrygrid'>

        {reducedData ? Object.keys(reducedData).sort().map((country, index) => {
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
