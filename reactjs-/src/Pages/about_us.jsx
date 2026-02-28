import { useNavigate } from 'react-router-dom';
import React from 'react';
import GroupOfStudents from "./Images/students.jpg";
import './pages.css';

export const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="backButton" onClick={() => window.history.back()}>
                ← Back
            </div> 

            <div className="content">
                <h1 className="header1">About Us</h1>
            </div>
            <div className= "studentContainer" target="_blank">

                <div className="textBox">
                    <h2>Our Mission</h2>
                    <p>
                        Welcome to the BC Study Guide Club! We are a dedicated team of 20 students committed to helping learners excel in their academic journey. Our mission is to provide high-quality resources for students pursuing the High School Diploma, IB, and AP programs. Through our platform, we offer comprehensive study materials, including in-depth study guides, practice questions, and instructional videos designed to make learning more accessible and engaging. Our team works tirelessly to create resources that cater to the unique needs of each program, ensuring that students have everything they need to succeed. Whether you’re preparing for a challenging exam or looking to strengthen your understanding of key concepts, the BC Study Guide Club is here to support you every step of the way. Join us and discover how we can help you reach your academic goals!.
                    </p>
                </div>
                <img src={GroupOfStudents} className="students" alt="Group of students" />
                
            </div>

        </>  
    );
};





















{/*const styles = {
    navbar: {
        backgroundColor: '#000000',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between', // Evenly distribute the items
        alignItems: 'center', // Vertically center the items
        borderRadius: '30px', // Uniform rounded edges for all corners
        position: 'fixed',
        top: 0,
        left: 0, // Make sure it starts from the left edge
        right: 0, // Make sure it stretches to the right edge
        width: '100%', // Full width of the viewport
        zIndex: 1000,
        boxSizing: 'border-box', // Ensures padding doesn't affect width
    },
    navList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'space-around', // Distribute the items evenly within the list
        width: '100%', // Ensure the list takes the full width of the navbar
    },
    navItem: {
        color: '#fff',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    navItemHover: {
        color: '#61dafb',
    },
};    */}