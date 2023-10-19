import { useEffect, useState } from "react";


  
const fetchData = <T,>(url: string) => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
    const data = result as T;
    console.log(data)});
};

export default fetchData
