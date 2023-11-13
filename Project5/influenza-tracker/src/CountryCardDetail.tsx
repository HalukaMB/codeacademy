import { useContext, useState } from "react";
import { useParams } from "react-router";
import { ReducedDataContext } from "./context/reducedDataContext";
import SelectMenu from "./SelectMenu";
import { findFlagUrlByIso3Code } from "country-flags-svg";
import Navbar from "./Navbar";
import { AuthenticationContext } from "./context/AuthenticationContext";
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
  }

  interface OuterObject{[key:string]:InnerObject}

const CountryCardDetail = () => {

    const { reducedData } = useContext(ReducedDataContext) as Record<string, OuterObject>
    const { countryFilter } = useContext(ReducedDataContext) as Record<string, string>
    const { favorites } = useContext(AuthenticationContext)
    console.log(favorites)
    console.log(reducedData)
    const params = useParams();
    let flagUrl = findFlagUrlByIso3Code(params.countryid as string)
    let countryNameToSet=""
    Object.keys(countryFilter).map(countryName=>{
        if (params.countryid===countryFilter[countryName]){
            countryNameToSet=countryName
        }
    })
    const countryData = reducedData[countryNameToSet]
    const addToFavourites = ()=>{
        const countryCode:string=countryData["info"]["code"]
        if (!favorites.includes(countryCode)){
            console.log("running to add")

            favorites.push(countryCode)
            console.log(favorites)
        }

    }


    if ((flagUrl === "") || (flagUrl === "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_the_Democratic_Republic_of_the_Congo_(3-2).svg")) {
        let keyForFlag=countryData["info"]["code"]
        flagUrl = extraFlags[keyForFlag] 
    }
   
        

    if (countryData){
    return (
        <>
        <Navbar></Navbar>
        <SelectMenu countryFilter={countryFilter} ></SelectMenu>
            <div className="detailed-card-container">
                <h1>{countryNameToSet.replace(/\(.+?\)/, "").replace(/\)/, "")}</h1>
                <div className="item">
                    <img src={flagUrl} height="50px" />
                </div>
                {(countryData.matrixDots.length>0)
                ?
                    <div className="dotGrid">
                        {countryData.matrixDots.flat().map((element, index) => {
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
                : <div className="weekTrend NoData">Not enough data</div>
                }
            <button onClick={addToFavourites}>Add to Favs</button>
            </div>

        </>

    );
}
};

export default CountryCardDetail;