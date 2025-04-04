import { useState } from 'react'
import './App.css'
import AppRoutes from './Routes';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <main>
        <AppRoutes />
      </main>
          
      {/*<div>
        <a href="https://sites.google.com/gemsdaa.net/daa-clubs-and-activities?authuser=0" target="_blank">
          <img src={myImage} className="logo" alt="BC Logo" />
        </a>
        <a href="https://docs.google.com/document/d/1X0DmKfjlUgcrLMiPHlLIjU5_HIzp_yEC7yPpqCB2ywo/edit?usp=sharing" target="_blank">
          <img src={myImage2} className="logo book" alt="Book image" />
        </a>
      </div>
      <h1>
        BC Study Guide
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} <br />
          Click Here For A Redirect
        </button>
        <p>
          *Our new math study guide for mocks is now available*
        </p>
      </div>
      <p className="read-the-docs">
        Aimed at providing you with the best education possible <br />
      </p>
      
      <div style={{ textAlign: "center" }}>
        <ul style={{ color: "white", listStyleType: "square", display: "inline-block", textAlign: "left" }}>
          <li>Subjects:</li>
          <li>Study Guides:</li>
          <li>Videos:</li>
        </ul>
      </div> */}
      
    </>
  )
}
 
export default App
