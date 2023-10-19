import { useEffect, useState } from "react";

function MyComponent (){

const fetchData = <T,>(url: string) => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
    const data = result as T;
    console.log(data)});
};


    return(
        <div></div>
    )
}
export default MyComponent
  


