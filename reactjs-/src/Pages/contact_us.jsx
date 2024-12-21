import { useNavigate } from 'react-router-dom';
import './pages.css';
import Instagram from "./Images/instagram.png";
import Email from "./Images/email.png";
import Questions from "./Images/questions.png";

export const ContactUs = () => {

    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar">
                <ul className="navList">
                    <li className="navItem" onClick={() => navigate('/AboutUs')}>About Us</li>
                    <li className="navItem" onClick={() => navigate('/Main')}>Main</li>
                    <li className="navItem" onClick={() => navigate('/StudyGuides')}>Study Guides</li>
                </ul>
            </nav>   
        
            <div className="studyContent">
                <h1 className="header">Contact Us</h1>
                <p>We would love your feedback so don't hesitate to contact us</p>
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
                        <h2 className="cardTitle">Our email</h2>
                        <div className="instaWrapper">
                            <img src={Email} className= "instaImage" alt="Email" />
                        </div>
                        <button 
                            className="cardButton"
                            onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=ruhaan.s_daa@gemsdaa.net", "_blank")}
                        >
                            Explore
                        </button>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Any Questions?</h2>
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

