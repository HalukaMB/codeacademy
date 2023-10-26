import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { readRemoteFile } from 'react-papaparse';
import CountryCardMain from './CountryCardMain';

interface Idata {
  data: string[][];
  errors: any;
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
  };
}
function getData({ setBaseData, setCountryFilter, setReducedData }) {
  const fluNetUrl: string = "https://frontdoor-l4uikgap6gz3m.azurefd.net/FLUMART/VIW_FNT?$format=csv_inline"
  const lastYear: number = new Date().getFullYear() - 1
  const arrayOfCountries: string[] = []
  const lastTwoYearsData = {}
  /* https://blog.logrocket.com/working-csv-files-react-papaparse/#parsing-local-csv-files */
  readRemoteFile(fluNetUrl, {
    header: true,
    worker: true,
    download: true,
    complete: (results: Idata) => {
      setBaseData(results.data)
      results.data.map((element) => {
        const year = parseInt(element["ISO_YEAR"])


        const sentinel = element["ORIGIN_SOURCE"]
        /*  const innerobject={}
         innerobject[yearweek]=dataarray */

        if ((year >= lastYear) && (sentinel == "SENTINEL")) {
          const week = parseInt(element["ISO_WEEK"])

          const country = element["COUNTRY_AREA_TERRITORY"]

          let influenzaCases = element["INF_ALL"] ? element["INF_ALL"] : 0;
          let allSpecimen = element["SPEC_PROCESSED_NB"] ? element["SPEC_PROCESSED_NB"] : 0;

          influenzaCases = parseInt(influenzaCases)
          allSpecimen = parseInt(allSpecimen)

          const dataarray = [year, week, influenzaCases, allSpecimen]

          if (dataarray.every(e => typeof (e) === "number")) {
            if (!arrayOfCountries.includes(country)) {
              arrayOfCountries.push(country)
              lastTwoYearsData[country] = {}
              lastTwoYearsData[country][parseInt(year.toString() + week.toString().padStart(2, '0'))] = dataarray

            } if (arrayOfCountries.includes(country)) {
              lastTwoYearsData[country][parseInt(year.toString() + week.toString().padStart(2, '0'))] = dataarray
            }
          }
        }
      }
      )
      setCountryFilter(arrayOfCountries.sort())
      setReducedData(lastTwoYearsData)
    }
  }
  )

};

function Home() {
  const [baseData, setBaseData] = useState(null)
  const [countryFilter, setCountryFilter] = useState([])
  const [reducedData, setReducedData] = useState({})

  useEffect(() => {
    getData({ setBaseData, setCountryFilter, setReducedData })
  }, [])

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
      {reducedData ? Object.keys(reducedData).sort().map(country => {
        const datapackage = reducedData[country]
        return (
          <CountryCardMain countryName={country} countryData={datapackage}></CountryCardMain>
        )
      }) :
        <h1>Nothing</h1>
      }
    </>
  )
}

export default Home
