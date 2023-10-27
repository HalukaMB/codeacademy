import React from 'react'
import { ReactComponentElement as Arrow } from 'react'
/* https://github.com/ronatskiy/country-flags-svg#findflagurlbyiso3codeiso3code */
import { findFlagUrlByIso3Code } from "country-flags-svg";


const extraFlags={
    "X09":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/2560px-Flag_of_England.svg.png",
    "X10":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Flag_of_Wales.svg/2560px-Flag_of_Wales.svg.png",
    "X11":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Northern_Ireland_%281953%E2%80%931972%29.svg/2560px-Flag_of_Northern_Ireland_%281953%E2%80%931972%29.svg.png",
    "X12":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/2560px-Flag_of_Scotland.svg.png",
    "XKX":"https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_Kosovo.svg",
    "COD":"https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg"


}

type CardProps = {
    countryName: string
    countryData: {}
    countryObject:{}
}

function CountryCardMain({ countryName, countryData, countryObject }: CardProps) {
    const arrayOfKeys = (Object.keys(countryData).sort())
    const weekToWeekDataAvailable = ((arrayOfKeys[arrayOfKeys.length - 1] - arrayOfKeys[arrayOfKeys.length - 2]) < 2)
    const dataLatestWeek = (countryData[arrayOfKeys[arrayOfKeys.length - 1]])
    const dataBeforeWeek = (countryData[arrayOfKeys[arrayOfKeys.length - 2]])
    const percentageLatestWeek = dataLatestWeek[2] / dataLatestWeek[3] * 100
    const percentageBeforeWeek = dataBeforeWeek[2] / dataBeforeWeek[3] * 100

    const trendForWeek = percentageLatestWeek - percentageBeforeWeek

    let flagUrl=findFlagUrlByIso3Code(countryObject[countryName])
    if((flagUrl==="")||(flagUrl==="https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_the_Democratic_Republic_of_the_Congo_(3-2).svg")){
        flagUrl=extraFlags[countryObject[countryName]]
    }


    if ((weekToWeekDataAvailable) && (!isNaN(trendForWeek))) {
        return (
            <div className="countryCardMain">
                <div>{countryName}</div>
                <img src={flagUrl} height="50px" />
                {trendForWeek > 0 ?
                    <div className="weekTrend Up">
                        <img src='src/assets/arrowUp.svg' width="50px" height="50px"></img>
                    </div>
                    : trendForWeek < 0 ?
                        <div className="weekTrend Down">
                            <img src='src/assets/arrowDown.svg' width="50px" height="50px"></img>

                        </div>
                        :
                        <div className="weekTrend Zero">
                            <img src='src/assets/arrowStraight.svg' width="70px" height="70px"></img>

                        </div>
                }

            </div>
        )
    } else {
        return (
            <div className="countryCardMain">
                <div>{countryName}</div>
                <img src={flagUrl} height="50px" />
                <div>Not enough data</div>

            </div>)

    }

}

export default CountryCardMain