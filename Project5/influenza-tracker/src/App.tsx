import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { readRemoteFile } from 'react-papaparse';

interface Idata {
  data: string[][];
  errors: any;
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
  };
}
function getData({setBaseData, setCountryFilter, setReducedData}) {
  const fluNetUrl: string = "https://frontdoor-l4uikgap6gz3m.azurefd.net/FLUMART/VIW_FNT?$format=csv_inline"
  const lastYear: number = new Date().getFullYear()-1
  const arrayOfCountries:string[]=[]
  const lastTwoYearsData={}
  /* https://blog.logrocket.com/working-csv-files-react-papaparse/#parsing-local-csv-files */
    readRemoteFile(fluNetUrl, {
    header: true,
    worker: true,
    download: true,
    complete: (results: Idata) => {
      setBaseData(results.data)
      results.data.map((element)=>{
        const year=parseInt(element["ISO_YEAR"])
        const week=parseInt(element["ISO_WEEK"])
/*         const yearweek=element["ISO_YEAR"]+element["ISO_WEEK"].padStart(2, '0')
 */        const influenzaCases=parseInt(element["INF_ALL"])
        const allSpecimen=parseInt(element["SPEC_PROCESSED_NB"])
        const sentinel=element["ORIGIN_SOURCE"]
        const country = element["COUNTRY_AREA_TERRITORY"]
        const dataarray=[year, week,influenzaCases,allSpecimen]
       /*  const innerobject={}
        innerobject[yearweek]=dataarray */

        if((year>=lastYear)&&(sentinel=="SENTINEL")&&(!arrayOfCountries.includes(country))){
          arrayOfCountries.push(country)
        }
        }
        
      )
      setCountryFilter(arrayOfCountries.sort())
      setReducedData(lastTwoYearsData)

    }
  }
  )

};

function App() {
  const [baseData, setBaseData] = useState(null)
  const [countryFilter, setCountryFilter] = useState([])
  const [reducedData, setReducedData] = useState(null)

  if (baseData){
    console.log(baseData)
    console.log(countryFilter)
  }
  useEffect(() => {
    getData({setBaseData,setCountryFilter,setReducedData})
  }, [])
  
  return (
    <>
     
     {countryFilter.length>0?
      <select>
        {countryFilter.map(element=>{
        return(<option>{element}</option>)}
          )}
      </select>
      :
      <h1>Loading...</h1>
      }
    </>
  )
}

export default App
