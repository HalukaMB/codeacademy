import { useContext } from 'react'
import './App.css'
import CountryCardMain from './CountryCardMain';
import SelectMenu from './SelectMenu';
import { ReducedDataContext } from "./context/reducedDataContext";
import Navbar from './Navbar';
import StillLoading from './StillLoading';


function Home() {

  const { countryFilter, reducedData } = useContext(ReducedDataContext)
  return (
    <><Navbar></Navbar>
    <div className="explainerBlock">See whether influenza activity is rising or falling in your country/countries of interest</div>
      <SelectMenu countryFilter={countryFilter}></SelectMenu>
      <div className='countrygrid'>

        {Object.keys(reducedData).length>0 ? Object.keys(reducedData).sort().map((country, index) => {
          const datapackage = reducedData[country]
          return (

            <CountryCardMain countryData={datapackage} key={index}></CountryCardMain>
          )
        }) :
        <StillLoading></StillLoading>
        }
      </div>
    </>
  )
}

export default Home
