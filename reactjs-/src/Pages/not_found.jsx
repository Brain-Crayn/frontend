import { useNavigate } from 'react-router-dom';
import './pages.css';

export const NotFound = () => {

    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar">
                <ul className="navList">
                    <li className="navItem" onClick={() => navigate('/AboutUs')}>About Us</li>
                    <li className="navItem" onClick={() => navigate('/ContactUs')}>Contact Us</li>
                    <li className="navItem" onClick={() => navigate('/StudyGuides')}>Study Guides</li>
                    <li className="navItem" onClick={() => navigate('/Main')}>Main</li>
                </ul>
            </nav>   
            <div>
                <h1>404 Not Found</h1>
                <p>Were you looking at the correct place?</p>
            </div>
        </>
    );
};

