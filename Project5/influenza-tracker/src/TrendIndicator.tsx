import React from 'react'

 
type TrendProps = {
    trendForWeek:number
}
const TrendIndicator = ({trendForWeek}:TrendProps) => {
  return (
    <>
    {trendForWeek > 0 ?
        <div className="weekTrend Up">
            <img src='src/assets/arrowUp.svg' width="50px" height="50px"></img>
        </div>
        : trendForWeek < 0 ?
            <div className="weekTrend Down">
                <img src='src/assets/arrowDown.svg' width="50px" height="50px"></img>

            </div>
            :  trendForWeek ==0?
            <div className="weekTrend Zero">
                <img src='src/assets/arrowStraight.svg' width="70px" height="70px"></img>

            </div>
            :
            <div className="weekTrend NoData">No data on trend</div>

    }
    </>
  )
}

export default TrendIndicator