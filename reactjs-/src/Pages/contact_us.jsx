import { useNavigate } from 'react-router-dom';
import './pages.css';

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
                <p>We would love you feedback so don't hesitate to contact us</p>
                <div className="cardContainer">
                    <div className="card">
                        <h2 className="cardTitle">Our Instagram</h2>
                        <p className="cardDescription">Add photo</p>
                        <button className="cardButton">Explore</button>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Our email</h2>
                        <p className="cardDescription">Add photo</p>
                        <button className="cardButton">Explore</button>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Do you have any Questions?</h2>
                        <p className="cardDescription">Add photo</p>
                        <button className="cardButton">Explore</button>
                    </div>
                </div>
            </div>
        </>
    );
};

