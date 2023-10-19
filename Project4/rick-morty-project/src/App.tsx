import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Characters from "./Characters";

interface CatData {
  fact: string;
  length: number;
}
function App() {
  const [count, setCount] = useState(0);
  const catUrl = "https://catfact.ninja/fact";
  const fetchData = <T,>(url: string) => {
    console.log("fetchData is running")
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
      const data = result as T;
      console.log(data)});
  };
  useEffect(() => {
    fetchData<CatData>(catUrl)
   
  }, [count])
  
  const someData = {
    name:"asdasd",
    age:34
  }
  return (
    <>
      <div>
        <Characters favNumber={5}someInfo={someData}/>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is by one {count}
        </button>
        <button onClick={() => setCount(count + 2)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
