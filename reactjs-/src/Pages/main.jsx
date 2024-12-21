import React, { useState } from 'react';
import myImage from "./Images/BC_logo.png";
import myImage2 from "./Images/Study_guide_logo.png";
import { useNavigate } from 'react-router-dom';
import './pages.css'

export const Main = () => {
    const navigate = useNavigate();

    return (
        <>

            <nav className="navbar">
                <ul className="navList">
                    <li className="navItem"  onClick={() => navigate('/AboutUs')}>About Us</li>
                    <li className="navItem"  onClick={() => navigate('/ContactUs')}>Contact Us</li>
                    <li className="navItem"  onClick={() => navigate('/StudyGuides')}>Study Guides</li>
                </ul>
            </nav>            
            
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
            <div className="intialCard">
                <button onClick={() => navigate('/AboutUs')}>
                    
                    About Us
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
    );
};


