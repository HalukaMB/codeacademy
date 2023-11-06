import { useContext, useState } from "react";
import { useParams } from "react-router";
import { ReducedDataContext } from "./context/reducedDataContext";
import SelectMenu from "./SelectMenu";
import { findFlagUrlByIso3Code } from "country-flags-svg";
import Navbar from "./Navbar";
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
    let countryNameToSet=""
    Object.keys(countryFilter).map(countryName=>{
        if (params.countryid===countryFilter[countryName]){
            countryNameToSet=countryName
        }
    })

    const countryData = reducedData[countryNameToSet]


    if ((flagUrl === "") || (flagUrl === "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_the_Democratic_Republic_of_the_Congo_(3-2).svg")) {
        flagUrl = extraFlags[countryData["info"]["code"]]
    }

        let arrayOfAllDots=[]
        let matrixOfAllDots=[]
        let objectOfInfectedDots={}
        let showData=false
        if (countryData!==undefined){
            const arrayOfKeys = (Object.keys(countryData["data"]).sort())
            const dataLatestWeek = (countryData["data"][arrayOfKeys[arrayOfKeys.length - 1]])
            const percentageLatestWeek = dataLatestWeek[2] / dataLatestWeek[3] * 100
            if (!isNaN(percentageLatestWeek)){
                const numberOfDots: number = 49
                const infectedDots: number = Math.round(numberOfDots * (percentageLatestWeek / 100))
                const arrayOfInfectedDots = Array.from(new Array(infectedDots), () => "infected");
                const healthyDots = numberOfDots - infectedDots
                arrayOfAllDots = Array.from(new Array(healthyDots), () => "healthy");
                arrayOfAllDots.push(...arrayOfInfectedDots)
                arrayOfAllDots.sort((a, b) => 0.5 - Math.random());
                showData=true
                let row:[string]=[]

                arrayOfAllDots.map((dot: string, i: number)=>{
                row.push(dot)
                console.log(i)
                const remainderColumnIndex=i%7
                const rowIndex=Math.floor(i/7)
                if(dot=="infected"){
                    objectOfInfectedDots[rowIndex]=remainderColumnIndex
                }

                if(((i+1)%7)==0){
                    matrixOfAllDots.push(row)
                    row=[]
                }

                console.log(dot)
                console.log(matrixOfAllDots)
                console.log(objectOfInfectedDots)

            }

                )
                
            }
        }
       
        

    
    return (
        <>
        <Navbar></Navbar>
        <SelectMenu countryFilter={countryFilter} ></SelectMenu>
            <div className="detailed-card-container">
                <h1>{countryNameToSet.replace(/\(.+?\)/, "").replace(/\)/, "")}</h1>
                <div className="item">
                    <img src={flagUrl} height="50px" />
                </div>
                {(showData==true)
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
                : <div className="weekTrend NoData" height="70px">Not enough data</div>
                }
            </div>

        </>

    );
};

export default CountryCardDetail;