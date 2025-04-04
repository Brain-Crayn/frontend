{/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./pages.css";

export const Highschool = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="backButton" onClick={() => window.history.back()}>
                ← Back
            </div>
            <h1 className="header1">Highschool Guides</h1>

            <div className="highschoolSubjects-container">
                <div className="highschoolSubject-card">
                <h3>Mathematics</h3>
                <p>Explore resources, practice questions, and study guides for high school mathematics.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>Science</h3>
                <p>Find study materials, practice tests, and resources for high school science subjects.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>Literature</h3>
                <p>Study guides and resources for understanding literature and preparing for exams.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>History</h3>
                <p>Find study materials, notes, and guides to excel in history.</p>
                <button className="explore-button">Explore</button>
                </div>

                <div className="highschoolSubject-card">
                <h3>Biology</h3>
                <p>Explore resources and guides to help with high school biology.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>Chemistry</h3>
                <p>Study materials and resources to master chemistry topics and exams.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>Physics</h3>
                <p>Study materials, problems, and resources to help with physics subjects.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>English</h3>
                <p>Find resources and study guides for mastering English subjects and exams.</p>
                <button className="explore-button">Explore</button>
                </div>
            </div>

        </>
    );
    
}*/}


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css'; // Ensure styles are applied

export const Highschool = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const apiUrl = 'https://127.0.0.1:8000'; // Your backend URL

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                console.log("Fetching HS classes...");
                const response = await fetch(`${apiUrl}/r/classes/hs`);

                if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

                const data = await response.json();
                console.log("API Response:", data);

                if (data && Array.isArray(data.classes)) {
                    setClasses(data.classes);
                    console.log("Classes set:", data.classes);
                } else {
                    console.error("Unexpected API response:", data);
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <>
            <div className="backButton" onClick={() => navigate(-1)}>← Back</div>
            <h1 className="title">High School Classes</h1>

            <div className="resource-grid">
                {classes.length > 0 ? (
                    classes.map((hsClass) => (
                        <div 
                            key={hsClass.class_id} 
                            className="resource-card"
                            onClick={() => navigate(`/IB/${hsClass.class_id}`)} // Dynamic routing
                        >
                            <h3>{hsClass.class_name}</h3>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading classes...</p>
                )}
            </div>
        </>
    );
};