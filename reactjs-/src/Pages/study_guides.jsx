import { useNavigate } from 'react-router-dom';
import './pages.css';

export const StudyGuides = () => {

    const navigate = useNavigate();
    return (

        <>
            <nav className="navbar">
                <ul className="navList">
                    <li className="navItem" onClick={() => navigate('/AboutUs')}>About Us</li>
                    <li className="navItem" onClick={() => navigate('/ContactUs')}>Contact Us</li>
                    <li className="navItem" onClick={() => navigate('/Main')}>Main</li>
                </ul>
            </nav>   
            <div className="studyContent">
                <h1 className="header">Study Guides</h1>
                <div className="cardContainer">
                    <div className="card">
                        <h2 className="cardTitle">High School Diploma</h2>
                        <p className="cardDescription">Add Subjects...</p>
                        <button className="cardButton">Explore</button>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">AP Diploma</h2>
                        <p className="cardDescription">Add Subjects...</p>
                        <button className="cardButton">Explore</button>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">IB diploma</h2>
                        <p className="cardDescription">Add Subjects...</p>
                        <button className="cardButton">Explore</button>
                    </div>
                </div>
            </div>
        </>    
    );
};

