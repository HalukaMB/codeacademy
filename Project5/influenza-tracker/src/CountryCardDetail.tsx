import { useContext, useState } from "react";
import { useParams } from "react-router";

const CountryCardDetail = () => {
    const [item, setItem] = useState({});
  const params = useParams();

  console.log("params :>> ", params);
    return (
      <div className="item-containier">
        <div className="item">
          <h1>test</h1>
          <p>{params.countryid}</p>
        </div>
      </div>
    );
  };
  
  export default CountryCardDetail;