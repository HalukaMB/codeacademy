import { createContext, useEffect, useState } from 'react'
import { readRemoteFile } from 'react-papaparse';
export const ReducedDataContext = createContext({});

/* This is a custom hook that turns a csv into a reduced object of objects  */
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
  COUNTRY_CODE: string
  COUNTRY_AREA_TERRITORY: string
  ISO_WEEKSTARTDATE: string
  ISO_YEAR: number|string
  ISO_WEEK: number
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
  countryFilter: Record<string, string>;
  reducedData: Record<string, InnerObject>;
}

interface InnerObject{
  info: {"longname":string, "code":string}
  data: Record<number|string, number[]>
  matrixDots: string[][]
  objectInfected: Record<number|string, number>
  latestRatio: number|null
  weekBeforeRatio: number|null

}

interface GetDataProps{
  updateBaseDataState: (results: entry[])=> void
  setCountryFilter: (array: Record<string, string>)=> void
  setReducedData: (array: Record<string, InnerObject>)=>void
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
      updateBaseDataState(results.data)
      results.data.map((element:entry) => {
        const sentinel = element["ORIGIN_SOURCE"]
        let year = element["ISO_YEAR"]
        if (typeof year=== "string"){
          year = parseInt(year)
        }
        /* If the data is from this or last year and from a sentinel hub, we use it */
        if ((year >= lastYear) && (sentinel == "SENTINEL")) {
           
          const countryCode: string = element["COUNTRY_CODE"]
          const country: string = element["COUNTRY_AREA_TERRITORY"]

          let week =element["ISO_WEEK"]
          let influenzaCases = element["INF_ALL"] ? element["INF_ALL"] : 0;
          let allSpecimen = element["SPEC_PROCESSED_NB"] ? element["SPEC_PROCESSED_NB"] : 0;

          /* We turn all data regarding week and cases into numbers */
          if (typeof week=== "string"){
            week = parseInt(week)
          }
          if (typeof influenzaCases=== "string"){
            influenzaCases = parseInt(influenzaCases)
          }
          if (typeof allSpecimen=== "string"){
            allSpecimen = parseInt(allSpecimen)
          }

        /* And build them into an array for each country by year and week */
          const dataarray: number[] = [year, week, influenzaCases, allSpecimen]

          if (dataarray.every(e => typeof (e) === "number")) {
            if (!Object.keys(objectOfCountries).includes(country)) {
              objectOfCountries[(country)] = countryCode
              lastTwoYearsData[country] = { "info": {"longname":"","code":""}, "data": {}, "matrixDots":[], 
              "objectInfected":{}, "latestRatio": null,  "weekBeforeRatio": null
            }

              lastTwoYearsData[country]["info"]["longname"] = country
              lastTwoYearsData[country]["info"]["code"] = countryCode

              const yearkey: number = parseInt(year.toString() + week.toString().padStart(2, '0'))
              lastTwoYearsData[country]["data"][yearkey] = dataarray

            } if (Object.keys(objectOfCountries).includes(country)) {
              const yearkey: number = parseInt(year.toString() + week.toString().padStart(2, '0'))
              lastTwoYearsData[country]["data"][yearkey] = dataarray
            }
          }
        }
      })

      /* Then we also turn the latest ratio of influenza cases into a matrix of dots*/
      Object.keys(lastTwoYearsData).map(country=>{
        let matrixOfAllDots: string[][]=[]
        let objectOfInfectedDots:Record<number|string, number> ={}

        if (lastTwoYearsData[country]["data"]!==undefined){
        const arrayOfKeys = (Object.keys(lastTwoYearsData[country]["data"]).sort())
        const dataLatestWeek = (lastTwoYearsData[country]["data"][arrayOfKeys[arrayOfKeys.length - 1]])
        const percentageLatestWeek = dataLatestWeek[2] / dataLatestWeek[3] * 100
        const dataWeekBefore = (lastTwoYearsData[country]["data"][arrayOfKeys[arrayOfKeys.length - 2]])
        const percentageWeekBefore = dataWeekBefore[2] / dataWeekBefore[3] * 100
        if (!isNaN(percentageLatestWeek)&&(percentageLatestWeek!==Infinity)){
            const numberOfDots: number = 49
            let infectedDots: number = Math.round(numberOfDots * (percentageLatestWeek / 100))
            if (infectedDots==0){
              infectedDots=1
            }
            const arrayOfInfectedDots = Array.from(new Array(infectedDots), () => "infected");
            const healthyDots = numberOfDots - infectedDots
            const arrayOfAllDots = Array.from(new Array(healthyDots), () => "healthy");
            arrayOfAllDots.push(...arrayOfInfectedDots)
            arrayOfAllDots.sort((a, b) => 0.5 - Math.random());

            let row:string[]=[]
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
          /* We write out the matrix, a object that tracks the infected dots and a number
          for the latest ratio */
          lastTwoYearsData[country]["matrixDots"]=matrixOfAllDots
          lastTwoYearsData[country]["objectInfected"]=objectOfInfectedDots
          lastTwoYearsData[country]["latestRatio"]=percentageLatestWeek
          lastTwoYearsData[country]["weekBeforeRatio"]=percentageWeekBefore


        }
        })
      setCountryFilter((objectOfCountries))
      setReducedData(lastTwoYearsData)
    }
  }
  )
};

/* here we call the  */
export const useFetchAndWrangle = (): HookReturn => {
  const [baseData, setBaseData] = useState<entry[] | null>(null)
  const [countryFilter, setCountryFilter] = useState<Record<string, string>>({})
  const [reducedData, setReducedData] = useState({})
  

  function updateBaseDataState(results: entry[]): void{
    setBaseData(results)
  }


  useEffect(() => {
    getData({ updateBaseDataState, setCountryFilter, setReducedData })
  }, [])


  return { reducedData, countryFilter };

}
