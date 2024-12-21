import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AP = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="backButton" onClick={() => window.history.back()}>
                ← Back
            </div>
            <h1 className="header">AP Guides</h1>

            <div className="highschoolSubjects-container">
                <div className="highschoolSubject-card">
                <h3>AP Calculus AB</h3>
                <p>Explore resources, practice questions, and study guides for high school mathematics.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>AP Chemistry</h3>
                <p>Find study materials, practice tests, and resources for high school science subjects.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>AP Seminar</h3>
                <p>Study guides and resources for understanding literature and preparing for exams.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>AP Computer Science Principles</h3>
                <p>Find study materials, notes, and guides to excel in history.</p>
                <button className="explore-button">Explore</button>
                </div>

                <div className="highschoolSubject-card">
                <h3>AP Physics</h3>
                <p>Explore amazing resources and guides to help with high school biology.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>AP Lang Lit</h3>
                <p>Study materials and resources to master chemistry topics and exams.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>AP World History</h3>
                <p>Study materials, problems, and resources to help with physics subjects.</p>
                <button className="explore-button">Explore</button>
                </div>
                <div className="highschoolSubject-card">
                <h3>AP Psychology</h3>
                <p>Find resources and study guides for mastering English subjects and exams.</p>
                <button className="explore-button">Explore</button>
                </div>
            </div>

        </>
    );

}