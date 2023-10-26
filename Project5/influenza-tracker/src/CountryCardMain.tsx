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
    const trendForWeek = (dataLatestWeek[2] / dataLatestWeek[3] - dataBeforeWeek[2] / dataBeforeWeek[3]) * 100

    if ((weekToWeekDataAvailable) && (!isNaN(trendForWeek))) {
        return (
            <div className="countryCardMain">
                <div>{countryName}</div>
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