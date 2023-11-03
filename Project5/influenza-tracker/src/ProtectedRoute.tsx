import React, { useContext } from "react";
import { AuthenticationContext } from "./context/AuthenticationContext";
import SelectMenu from "./SelectMenu";
import LoginFeature from "./LoginFeature";
import { ReducedDataContext } from "./context/reducedDataContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthenticationContext);
  const {countryFilter, reducedData}= useContext(ReducedDataContext)

  return <>{user ? children :
    <div>
      <SelectMenu countryFilter={countryFilter}></SelectMenu>
    <LoginFeature></LoginFeature>
  <p>You need to log in to view this page</p>
  </div>
  }</>;
}

export default ProtectedRoute;