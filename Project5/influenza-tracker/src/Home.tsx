import { useContext } from 'react'
import './App.css'
import CountryCardMain from './CountryCardMain';
import SelectMenu from './SelectMenu';
import { ReducedDataContext } from "./context/reducedDataContext";
import LoginFeature from './LoginFeature';
import { NavLink } from "react-router-dom";


function Home() {

  const {countryFilter, reducedData}= useContext(ReducedDataContext)
  return (
    <><NavLink
    to="/"
    className={({ isActive, isPending }) =>{console.log(isActive)}
    }
  >
    HOME
  </NavLink>;
  <NavLink
    to="/About"
    className={({ isActive, isPending }) =>{console.log("are we on about?",isActive)}
    }
  >
    HOME
  </NavLink>
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
