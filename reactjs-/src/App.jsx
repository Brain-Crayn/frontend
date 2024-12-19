import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import myImage from "./Images/BC_logo.png"
import myImage2 from "./Images/Study_guide_logo.png"
import './App.css'

function Home() {
  return <h1>Welcome to the Home Page</h1>;
}

function About() {
  return <h1>About Us</h1>;
}

function Contact() {
  return <h1>Contact Us</h1>;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Router>
        <div>
          {/* Top Navigation Bar */}
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
      <div>
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
      </div>
      
    </>
  )
}
 
export default App
