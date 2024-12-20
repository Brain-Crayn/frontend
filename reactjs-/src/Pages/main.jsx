import React, { useState } from 'react';
import myImage from "./Images/BC_logo.png";
import myImage2 from "./Images/Study_guide_logo.png";
import { useNavigate } from 'react-router-dom';
import './navbar.css'

export const Main = () => {
    const navigate = useNavigate();

    return (
        <>

            <nav style={styles.navbar}>
                <ul style={styles.navList}>
                    <li style={styles.navItem} className="navItem" onClick={() => navigate('/AboutUs')}>About Us</li>
                    <li style={styles.navItem} className="navItem" onClick={() => navigate('/ContactUs')}>Contact Us</li>
                    <li style={styles.navItem} className="navItem" onClick={() => navigate('/StudyGuides')}>Study Guides</li>
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
            <div className="card">
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


const styles = {
    navbar: {
        backgroundColor: '#000000',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between', // Evenly distribute the items
        alignItems: 'center', // Vertically center the items
        borderRadius: '30px', // Uniform rounded edges for all corners
        position: 'fixed',
        top: 0,
        left: 0, // Make sure it starts from the left edge
        right: 0, // Make sure it stretches to the right edge
        width: '100%', // Full width of the viewport
        zIndex: 1000,
        boxSizing: 'border-box', // Ensures padding doesn't affect width
    },
    navList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'space-around', // Distribute the items evenly within the list
        width: '100%', // Ensure the list takes the full width of the navbar
    },
    navItem: {
        color: '#fff',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    
};