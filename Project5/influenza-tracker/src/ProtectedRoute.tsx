import React, { useContext } from "react";
import { AuthenticationContext } from "./context/AuthenticationContext";

import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function ProtectedRoute({ children }:any) {
  const { user } = useContext(AuthenticationContext);
  
  console.log(user)
  return <>{(user!=null) ? children :
    <div>
                <Navbar></Navbar>
  <p>You need to <Link to="/login"> log in </Link> to view this page</p>
  </div>
  }</>;
}

export default ProtectedRoute;