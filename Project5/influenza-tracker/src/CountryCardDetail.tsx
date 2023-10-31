import { useContext, useState } from "react";
import { useParams } from "react-router";
import { ReducedDataContext } from "./context/reducedDataContext";

const CountryCardDetail = () => {

   const {reducedData}= useContext(ReducedDataContext)
   console.log(reducedData)

    const [item, setItem] = useState({});
  const params = useParams();
  const numberOfDots:number=49
  let percentage:number =10
  const infectedDots:number = Math.round(numberOfDots*(percentage/100))
const arrayOfInfectedDots=Array.from(new Array(infectedDots),()=>"infected");
  const healthyDots= numberOfDots-infectedDots
  const arrayOfAllDots=Array.from(new Array(healthyDots),()=>"healthy");
  arrayOfAllDots.push(...arrayOfInfectedDots)
  arrayOfAllDots.sort((a, b) => 0.5 - Math.random());



    return (
      <div className="item-container">
        <div className="item">
          <h1>test</h1>
          <p>{params.countryid}</p>
        </div>
        <div className="dotGrid">
            {arrayOfAllDots.map(element=>{
                if(element=="healthy"){
                return(
                    <div className="circle healthy"/>
                )}
                if(element=="infected"){
                    return(
                        <div className="circle infected"/>
                    )
                }
            })}

        </div>
      </div>
    );
  };
  
  export default CountryCardDetail;