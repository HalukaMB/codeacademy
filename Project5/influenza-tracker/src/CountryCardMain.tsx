import React from 'react'
import { ReactComponentElement as Arrow } from 'react'
import { findFlagUrlByIso3Code } from "country-flags-svg";

type CardProps = {
    countryName: string
    countryData: {}
}

function CountryCardMain({ countryName, countryData }: CardProps) {
    const arrayOfKeys = (Object.keys(countryData).sort())
    const weekToWeekDataAvailable = ((arrayOfKeys[arrayOfKeys.length - 1] - arrayOfKeys[arrayOfKeys.length - 2]) < 2)
    const dataLatestWeek = (countryData[arrayOfKeys[arrayOfKeys.length - 1]])
    const dataBeforeWeek = (countryData[arrayOfKeys[arrayOfKeys.length - 2]])
    const percentageLatestWeek = dataLatestWeek[2] / dataLatestWeek[3] * 100
    const percentageBeforeWeek = dataBeforeWeek[2] / dataBeforeWeek[3] * 100

    const trendForWeek = percentageLatestWeek - percentageBeforeWeek

    if ((weekToWeekDataAvailable) && (!isNaN(trendForWeek))) {
        return (
            <div className="countryCardMain">
                <div>{countryName}</div>
                <img src={findFlagUrlByIso3Code(countryName)} height="50px" />
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
                <img src={findFlagUrlByIso3Code(countryName)} height="50px" />
                <div>Not enough data</div>

            </div>)

    }

}

export default CountryCardMain