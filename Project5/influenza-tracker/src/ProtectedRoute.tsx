import React, { useContext } from "react";
import { AuthenticationContext } from "./context/AuthenticationContext";
import SelectMenu from "./SelectMenu";
import LoginFeature from "./LoginFeature";
import { ReducedDataContext } from "./context/reducedDataContext";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthenticationContext);
  const {countryFilter, reducedData}= useContext(ReducedDataContext)
  console.log(user)
  return <>{(user!=null) ? children :
    <div>
                <Navbar></Navbar>
  <p>You need to <Link to="/login"> log in </Link> to view this page</p>
  </div>
  }</>;
}

export default ProtectedRoute;