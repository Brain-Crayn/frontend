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

