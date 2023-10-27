import React from 'react'

type CardProps = {
    countryName: string
    countryData: {}
}

function CountryCardMain({ countryName, countryData }: CardProps) {
    const arrayOfKeys = (Object.keys(countryData).sort())
    const weekToWeekDataAvailable = ((arrayOfKeys[arrayOfKeys.length - 1] - arrayOfKeys[arrayOfKeys.length - 2]) < 2)
    const dataLatestWeek = (countryData[arrayOfKeys[arrayOfKeys.length - 1]])
    const dataBeforeWeek = (countryData[arrayOfKeys[arrayOfKeys.length - 2]])
    const percentageLatestWeek=dataLatestWeek[2] / dataLatestWeek[3]*100
    const percentageBeforeWeek=dataBeforeWeek[2] / dataBeforeWeek[3]*100

    const trendForWeek = percentageLatestWeek-percentageBeforeWeek

    if ((weekToWeekDataAvailable) && (!isNaN(trendForWeek))) {
        return (
            <div className="countryCardMain">
                <div>{countryName}</div>
                {trendForWeek>0?
                <div className="weekTrendUp">UP</div>
                :trendForWeek<0?
                <div className="weekTrendDown">DOWN</div>
                :
                <div className="weekTrendZero">ZERO</div>
                }
                <div>{trendForWeek}</div>

            </div>
        )
    } else {
        return (
            <div className="countryCardMain">
                <div>{countryName}</div>
                <div>Not enough data</div>

            </div>)

    }

}

export default CountryCardMain