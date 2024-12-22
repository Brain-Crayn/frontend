import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './pages.css';
import Instagram from "./Images/instagram.png";
import Email from "./Images/email.png";
import Questions from "./Images/questions.png";

export const ContactUs = () => {

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

            <div className="backButton" onClick={() => window.history.back()}>
                ← Back
            </div>
            <div>
                <header className="hamburgerHeader" ref={hamburgerButtonRef}>
                    <div className="hamburger-button" onClick={toggleMenu}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <nav className={`nav-menu ${menuOpen ? "open" : ""}`} ref={menuRef}>
                        <a href="/main">Home</a>
                        <a href="/AboutUS">About</a>
                        <a href="/StudyGuides">Services</a>
                        <a href="/ContactUS">Contact</a>
                    </nav>
                </header>
            </div>  
        
            <div className="studyContent">
                <h1 className="header1">Contact Us</h1>
                <p style={{ fontSize: '20px' }}>Don't hesitate to contact us for questions or to add study guides</p>
                <div className="cardContainer">
                    <div className="card">
                        <h2 className="cardTitle">Our Instagram</h2>
                        <div className="instaWrapper">
                            <img src={Instagram} className= "instaImage" alt="Instagram" />
                        </div>
                        <button 
                            className="cardButton"
                            onClick={() => window.open("https://www.instagram.com/brain_crayn/", "_blank")}
                        >
                            Explore
                        </button>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Have any questions?</h2>
                        <div className="instaWrapper">
                            <img src={Email} className= "instaImage" alt="Email" />
                        </div>
                        <button 
                            className="cardButton"
                            onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=bcstudyguides@gmail.com", "_blank")}
                        >
                            Explore
                        </button>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Want to contribute?</h2>
                        <div className="instaWrapper">
                            <img src={Questions} className= "instaImage" alt="Email" />
                        </div>
                        <button className="cardButton">Explore</button>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

