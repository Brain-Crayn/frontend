import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './pages.css';

export const StudyGuides = () => {

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
                        
                        <a href="/StudyGuides">Services</a>
                        <a href="/ContactUS">Contact</a>
                    </nav>
                </header>
            </div>  


            <div className="studyContent">
                <h1 className="header1">Study Guides</h1>
                <div className="cardContainer">
                    <div className="card">
                        <h2 className="cardTitle">High School</h2>
                        <p className="cardDescription">
                            Our club offers tailored study guides and resources for core subjects in the High School Diploma program, including Math, Science, and English. With detailed notes and practice questions, we’re here to help you excel in your coursework and prepare for success.
                        </p>
                        <button className="cardButton" onClick={() => navigate('/Highschool')}>Explore</button>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">AP Diploma</h2>
                        <p className="cardDescription">
                            For AP students, our club provides in-depth guides for challenging courses like AP Calculus, AP Biology, and AP Literature. From exam prep to concept breakdowns, we’re committed to supporting your academic goals and helping you earn college credits.
                        </p>
                        <button className="cardButton" onClick={() => navigate('/AP')}>Explore</button>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">IB diploma</h2>
                        <p className="cardDescription">
                            Our club is here to support IB students with detailed study materials for all six subject groups, as well as guidance on Extended Essays and TOK. We aim to simplify the IB journey and provide you with the absolute best tools to achieve your best.                     
                        </p>
                        <button className="cardButton" onClick={() => navigate('/IB')}>Explore</button>
                    </div>
                </div>
            </div>
        </>    
    );
};

