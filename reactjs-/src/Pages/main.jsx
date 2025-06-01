import React, { useState, useEffect, useRef } from 'react';
import myImage from "./Images/BC_logo.png";
import myImage2 from "./Images/Study_guide_logo.png";
import { useNavigate } from 'react-router-dom';
import './pages.css'

export const Main = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Refs for the menu and the hamburger button
    const menuRef = useRef(null);
    const hamburgerButtonRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = (event) => {
        // Close the menu if the click is outside the menu and hamburger button
        if (
            menuRef.current && !menuRef.current.contains(event.target) && 
            hamburgerButtonRef.current && !hamburgerButtonRef.current.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener to detect clicks outside
        document.addEventListener('click', closeMenu);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, []);


    return (
        <>

            <div>
                <header className="hamburgerHeader" ref={hamburgerButtonRef}>
                    <div className="hamburger-button" onClick={toggleMenu}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <nav className={`nav-menu ${menuOpen ? "open" : ""}`} ref={menuRef}>
                        <a href="/main">Home</a>
                        
                        <a href="/StudyGuides">Services</a>
                        <a href="/ContactUS">Contact</a>
                    </nav>
                </header>
            </div>          
            
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
                <button onClick={() => navigate('/StudyGuides')}>
                    
                    Resources
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