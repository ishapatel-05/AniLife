import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // i made it
    const isha=()=>{
      alert("Welcome")
    }

    const divya=()=>{
      alert("Submitted!")
    }
    // end 
  return (
    

    <>
      <div>
        <a href="https://vite.dev" target="_blank">
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
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* i made it */}
      <div>
        <h1>First react project</h1>
        <button onClick={isha}>click</button>
        <button onClick={divya}>submit</button>
      </div>
      {/* end */}
    </>
  )
}

export default App
