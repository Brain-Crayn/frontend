import { useNavigate } from 'react-router-dom';
import React from 'react';
import './pages.css';
import Instagram from "./Images/instagram.png";
import Email from "./Images/email.png";
import Questions from "./Images/questions.png";

export const ContactUs = () => {

    const navigate = useNavigate();

    return (
        <>

            <div className="backButton" onClick={() => window.history.back()}>
                ← Back
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
                        <h2 className="cardTitle">Any questions?</h2>
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
                        <button 
                            className="cardButton" 
                            onClick={() => navigate('/Form')}
                        >
                            Explore
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

