import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { readRemoteFile } from 'react-papaparse';

async function getData() {
  const fluNetUrl="https://frontdoor-l4uikgap6gz3m.azurefd.net/FLUMART/VIW_FNT?$format=csv_inline"
  const response = await fetch("src/data/VIW_FNT.csv")
  const reader = response.body.getReader()
  const result = await reader.read() // raw array
  const decoder = new TextDecoder('utf-8')
  const csv = decoder.decode(result.value)
  console.log(csv)
  const remoteFile=readRemoteFile(fluNetUrl, {
    header: true,
    worker: true,
    download: true,
    complete: (results: Idata) => {
      const value: string[][] = [];
      const column: string[][] = [];

      results.data.map((d) => {
        value.push(Object.values(d));
        column.push(Object.keys(d));
      });
      console.log(results.data);

}
})};
function App() {


  const [count, setCount] = useState(0)
  getData()

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
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
  )
}

export default App
