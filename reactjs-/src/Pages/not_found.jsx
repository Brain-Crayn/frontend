import { useNavigate } from 'react-router-dom';
import React from 'react';
import './pages.css';

export const NotFound = () => {

    const navigate = useNavigate();

    return (
        <>

            <div className="backButton" onClick={() => window.history.back()}>
                ← Back
            </div>   
            <div>
                <h1>404 Not Found</h1>
                <p>Were you looking at the correct place?</p>
            </div>
        </>
    );
};

