import { findFlagUrlByIso3Code } from "country-flags-svg";
import { useNavigate } from 'react-router';
import TrendIndicator from "./TrendIndicator";


const extraFlags:Record<string, string> = {
    "X09": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/2560px-Flag_of_England.svg.png",
    "X10": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Flag_of_Wales.svg/2560px-Flag_of_Wales.svg.png",
    "X11": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Northern_Ireland_%281953%E2%80%931972%29.svg/2560px-Flag_of_Northern_Ireland_%281953%E2%80%931972%29.svg.png",
    "X12": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/2560px-Flag_of_Scotland.svg.png",
    "XKX": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_Kosovo.svg",
    "COD": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg"
}

interface InnerObject{
  info: {"longname":string, "code":string}
  data: Record<number|string, number[]>
  matrixDots: string[][]
  objectInfected: Record<number|string, number>
  latestRatio: number
  weekBeforeRatio: number

}

type CardProps = {
    countryData:InnerObject
}

function CountryCardMain({countryData }: CardProps) {
    const percentageBeforeWeek = countryData["weekBeforeRatio"]
    const percentageLatestWeek = countryData["latestRatio"]
    const trendForWeek: number = percentageLatestWeek - percentageBeforeWeek

    let navigate = useNavigate();

    let flagUrl=findFlagUrlByIso3Code(countryData["info"]["code"])
    if((flagUrl==="")||(flagUrl==="https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_the_Democratic_Republic_of_the_Congo_(3-2).svg")){
        let keyForFlag=countryData["info"]["code"]
        flagUrl = extraFlags[keyForFlag] 
    }
        return (
            <div id={countryData["info"]["code"]} className="countryCardMain" onClick={()=>{
            navigate(`/${(countryData["info"]["code"])}`)
            }}>
                <div className="countryName">{countryData["info"]["longname"].replace(/\(.+?\)/, "").replace(/\)/, "")}</div>
                <img src={flagUrl} height="50px" />

                {!isNaN(percentageLatestWeek)?<div>{(Math.round(percentageLatestWeek*10))/10}% of tested people had influenza</div>:<div className="LatestWeek">No Data on latest week</div>}

                <TrendIndicator trendForWeek={trendForWeek}></TrendIndicator>
            </div>
        )
       
    

}

export default CountryCardMain