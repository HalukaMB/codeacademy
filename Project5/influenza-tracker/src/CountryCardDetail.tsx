import { useContext, useState } from "react";
import { useParams } from "react-router";
import { ReducedDataContext } from "./context/reducedDataContext";
import SelectMenu from "./SelectMenu";
import { findFlagUrlByIso3Code } from "country-flags-svg";
const extraFlags = {
    "X09": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/2560px-Flag_of_England.svg.png",
    "X10": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Flag_of_Wales.svg/2560px-Flag_of_Wales.svg.png",
    "X11": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Northern_Ireland_%281953%E2%80%931972%29.svg/2560px-Flag_of_Northern_Ireland_%281953%E2%80%931972%29.svg.png",
    "X12": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/2560px-Flag_of_Scotland.svg.png",
    "XKX": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_Kosovo.svg",
    "COD": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg"


}


const CountryCardDetail = () => {

    const { reducedData, countryFilter } = useContext(ReducedDataContext)
    const params = useParams();
    let flagUrl = findFlagUrlByIso3Code(params.countryid)
    if ((flagUrl === "") || (flagUrl === "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_the_Democratic_Republic_of_the_Congo_(3-2).svg")) {
        flagUrl = extraFlags[countryData["info"]["code"]]
    }

    const countryData = reducedData[params.countryid]

 

        const arrayOfKeys = (Object.keys(countryData["data"]).sort())
        const weekToWeekDataAvailable = ((arrayOfKeys[arrayOfKeys.length - 1] - arrayOfKeys[arrayOfKeys.length - 2]) < 2)
        const dataLatestWeek = (countryData["data"][arrayOfKeys[arrayOfKeys.length - 1]])
        const dataBeforeWeek = (countryData["data"][arrayOfKeys[arrayOfKeys.length - 2]])
        const percentageLatestWeek = dataLatestWeek[2] / dataLatestWeek[3] * 100
        const percentageBeforeWeek = dataBeforeWeek[2] / dataBeforeWeek[3] * 100

        const trendForWeek = percentageLatestWeek - percentageBeforeWeek

        const numberOfDots: number = 49
        const infectedDots: number = Math.round(numberOfDots * (percentageLatestWeek / 100))
        const arrayOfInfectedDots = Array.from(new Array(infectedDots), () => "infected");
        const healthyDots = numberOfDots - infectedDots
        const arrayOfAllDots = Array.from(new Array(healthyDots), () => "healthy");
        arrayOfAllDots.push(...arrayOfInfectedDots)
        arrayOfAllDots.sort((a, b) => 0.5 - Math.random());
    
    console.log(arrayOfAllDots)
    return (
        <>        <SelectMenu countryFilter={countryFilter} ></SelectMenu>
            <div className="item-container">
                <div className="item">
                    <img src={flagUrl} height="50px" />
                </div>
                {(arrayOfAllDots.length>0)
                ?
                    <div className="dotGrid">
                        {arrayOfAllDots.map((element, index) => {
                            if (element == "healthy") {
                                return (
                                    <div className="circle healthy" key={index} />
                                )
                            }
                            if (element == "infected") {
                                return (
                                    <div className="circle infected" key={index} />
                                )
                            }
                        })}
                    </div>
                :<div>BORING</div>
                }
            </div>

        </>

    );
};

export default CountryCardDetail;