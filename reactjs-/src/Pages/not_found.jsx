import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './pages.css';

export const NotFound = () => {

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
            <div>
                <h1>404 Not Found</h1>
                <p>Were you looking at the correct place?</p>
            </div>
        </>
    );
};

