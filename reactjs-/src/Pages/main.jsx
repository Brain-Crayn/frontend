import React from 'react';
import myImage from "./Images/BC_logo.png";
import myImage2 from "./Images/Study_guide_logo.png";
import { useNavigate } from 'react-router-dom';
import './pages.css'

export const Main = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <a href="https://sites.google.com/gemsdaa.net/daa-clubs-and-activities?authuser=0" target="_blank">
                    <img src={myImage} className="logo" alt="BC Logo" />
                </a>
                
                <img src={myImage2} className="logo book" alt="Book image" />
                
            </div>
            <h1>
                BC Study Guide
            </h1>
            <div className="intialCard">
                <button onClick={() => navigate('/StudyGuides')}>
                    Resources
                </button>
            </div>
            <div className="intialCard" >
                <button onClick={() => navigate('/ContactUs')}>
                    Contact Us
                </button>
                
            </div>
            <div className="intialCard" >
                <button onClick={() => window.open('https://sites.google.com/gemsdaa.net/students-for-students', '_blank')}>
                    SOS Tutoring
                </button>
            </div>

            <p className="read-the-docs">
                Aimed at providing you with the best education possible <br />
            </p>
            
            
        </>
    );
};