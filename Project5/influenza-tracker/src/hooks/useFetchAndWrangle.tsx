import React, { createContext, useCallback, useEffect, useState } from 'react'
import { readRemoteFile } from 'react-papaparse';
export const ReducedDataContext = createContext({});

/* Move the datawrangling to here */

interface Idata {
  data: entry[];
  errors: any;
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
  };
}

export interface entry {
  WHOREGION: string
  FLUSEASON: string
  HEMISPHERE: string
  ITZ: string
  COUNTRY_CODE: string
  COUNTRY_AREA_TERRITORY: string
  ISO_WEEKSTARTDATE: string
  ISO_YEAR: number|string
  ISO_WEEK: number
  MMWR_WEEKSTARTDATE: string
  MMWR_YEAR: number
  MMWR_WEEK: number
  ORIGIN_SOURCE: string
  SPEC_PROCESSED_NB: number
  SPEC_RECEIVED_NB: number | string
  INF_A: number | string
  INF_B: number | string
  INF_ALL: number | string
  INF_NEGATIVE: number
// Partial type
}

interface HookReturn {
  countryFilter: CountryFilterType;
  reducedData: object
}


interface InnerObject{
  info: {"longname":string, "code":string}
  data: Record<number|string, number[]>
  matrixDots: number[][]
  objectInfected: Record<number|string, number>
}


interface GetDataProps{
  // setBaseData: React.SetStateAction<entry[]|null>;
  updateBaseDataState: (results: entry[])=> void
  setCountryFilter: ({})=> void
  setReducedData: ({})=>void
}
/* why are the sets bits get underlined */
function getData({ updateBaseDataState, setCountryFilter, setReducedData }:GetDataProps) {
  const fluNetUrl: string = "https://frontdoor-l4uikgap6gz3m.azurefd.net/FLUMART/VIW_FNT?$format=csv_inline"
  const lastYear: number = new Date().getFullYear() - 1
  const objectOfCountries: Record<string, string> = {}
  const lastTwoYearsData: Record<string, InnerObject> = {}

  /* https://blog.logrocket.com/working-csv-files-react-papaparse/#parsing-local-csv-files */
  readRemoteFile(fluNetUrl, {
    header: true,
    worker: true,
    download: true,
    complete: (results: Idata) => {
      console.log(results.data)

      /* 
      !From here ownards setBaseData gets marked as well as element
      */
      updateBaseDataState(results.data)
      results.data.map((element:entry) => {
        let year = element["ISO_YEAR"]
        if (typeof year=== "string"){
          year = parseInt(year)
        }
        const sentinel = element["ORIGIN_SOURCE"]


        if ((year >= lastYear) && (sentinel == "SENTINEL")) {

           
          let week =element["ISO_WEEK"]
          const countryCode: string = element["COUNTRY_CODE"]
          const country: string = element["COUNTRY_AREA_TERRITORY"]

          let influenzaCases = element["INF_ALL"] ? element["INF_ALL"] : 0;
          let allSpecimen = element["SPEC_PROCESSED_NB"] ? element["SPEC_PROCESSED_NB"] : 0;
          if (typeof week=== "string"){
            week = parseInt(week)
          }
          if (typeof influenzaCases=== "string"){
            influenzaCases = parseInt(influenzaCases)
          }
          if (typeof allSpecimen=== "string"){
            allSpecimen = parseInt(allSpecimen)
          }


          const dataarray: number[] = [year, week, influenzaCases, allSpecimen]

          if (dataarray.every(e => typeof (e) === "number")) {
            if (!Object.keys(objectOfCountries).includes(country)) {
              objectOfCountries[(country)] = countryCode

              lastTwoYearsData[country] = { "info": {"longname":"","code":""}, "data": {}, "matrixDots":[], "objectInfected":{} }
              const yearkey: number = parseInt(year.toString() + week.toString().padStart(2, '0'))
              lastTwoYearsData[country]["info"]["longname"] = country
              lastTwoYearsData[country]["info"]["code"] = countryCode


              lastTwoYearsData[country]["data"][yearkey] = dataarray

            } if (Object.keys(objectOfCountries).includes(country)) {
              const yearkey: number = parseInt(year.toString() + week.toString().padStart(2, '0'))

              lastTwoYearsData[country]["data"][yearkey] = dataarray
            }
          }
        }
      })

      setCountryFilter((objectOfCountries))

      Object.keys(lastTwoYearsData).map(country=>{
        let matrixOfAllDots: number[][]=[]
        let objectOfInfectedDots:Record<number|string, number> ={}
        let showData=false
        if (lastTwoYearsData[country]["data"]!==undefined){

        const arrayOfKeys = (Object.keys(lastTwoYearsData[country]["data"]).sort())

        const dataLatestWeek = (lastTwoYearsData[country]["data"][arrayOfKeys[arrayOfKeys.length - 1]])
        const percentageLatestWeek = dataLatestWeek[2] / dataLatestWeek[3] * 100
        if (!isNaN(percentageLatestWeek)&&(percentageLatestWeek!==Infinity)){
            const numberOfDots: number = 49

            const infectedDots: number = Math.round(numberOfDots * (percentageLatestWeek / 100))
            const arrayOfInfectedDots = Array.from(new Array(infectedDots), () => "infected");
            const healthyDots = numberOfDots - infectedDots
            const arrayOfAllDots = Array.from(new Array(healthyDots), () => "healthy");
            arrayOfAllDots.push(...arrayOfInfectedDots)
            arrayOfAllDots.sort((a, b) => 0.5 - Math.random());
            showData=true
            let row:[number]|[]=[]

            arrayOfAllDots.map((dot: string, i: number)=>{
            row.push(dot)
            const remainderColumnIndex=i%7
            const rowIndex=Math.floor(i/7)
            if(dot=="infected"){
                objectOfInfectedDots[rowIndex]=remainderColumnIndex
            }

            if(((i+1)%7)==0){
                matrixOfAllDots.push(row)
                row=[]
            }
            })
          }
          lastTwoYearsData[country]["matrixDots"]=matrixOfAllDots

          lastTwoYearsData[country]["objectInfected"]=objectOfInfectedDots
        }
        })

      setReducedData(lastTwoYearsData)
    }
  }
  )
};




export const useFetchAndWrangle = (): HookReturn => {
  console.log("hook called")
  const [baseData, setBaseData] = useState<entry[] | null>(null)
  const [countryFilter, setCountryFilter] = useState<CountryFilterType>({})
  const [reducedData, setReducedData] = useState({})
  

  function updateBaseDataState(results: entry[]): void{
    setBaseData(results)
  }


  useEffect(() => {
    getData({ updateBaseDataState, setCountryFilter, setReducedData })
  }, [])


  return { reducedData, countryFilter };

}
