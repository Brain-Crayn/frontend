

{/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

export const IB = () => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const apiUrl = 'https://127.0.0.1:8000'; // Your backend URL

    useEffect(() => {
        const fetchResources = async () => {
            let fetchedResources = [];
            let id = 1; // Start from ID 1

            while (true) {
                try {
                    const response = await fetch(`${apiUrl}/r/resource/${id}`);
                    if (!response.ok) break; // Stop when we get an error (resource doesn't exist)
                    
                    const data = await response.json();
                    fetchedResources.push(data);
                    id++; // Move to the next ID
                } catch (error) {
                    console.error("Error fetching resources:", error);
                    break; // Stop fetching if there's an error
                }
            }

            setResources(fetchedResources);
        };

        fetchResources();
    }, []);

    return (
        <>
            <div className="backButton" onClick={() => navigate(-1)}>
                ← Back
            </div>
            <h1>IB Resources</h1>

            <div className="resource-container">
                {resources.length > 0 ? (
                    resources.map((resource) => (
                        <div
                            key={resource.id}
                            className="resource-item"
                            onClick={() => window.open(resource.resource_url, "_blank")}
                            style={{
                                cursor: 'pointer',
                                width: '200px',
                                height: '200px',
                                margin: '10px',
                                border: '1px solid black',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '8px'
                            }}
                        >
                            {resource.resource_name}
                        </div>
                    ))
                ) : (
                    <p>Loading resources...</p>
                )}
            </div>
        </>
    );
}; */}


{/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

export const IB = () => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const apiUrl = 'https://127.0.0.1:8000'; // Your backend URL

    useEffect(() => {
        const fetchResources = async () => {
            let fetchedResources = [];
            let id = 1; // Start from ID 1

            while (true) {
                try {
                    const response = await fetch(`${apiUrl}/r/resource/${id}`);
                    if (!response.ok) break; // Stop when we get an error (resource doesn't exist)
                    
                    const data = await response.json();
                    fetchedResources.push(data);
                    id++; // Move to the next ID
                } catch (error) {
                    console.error("Error fetching resources:", error);
                    break; // Stop fetching if there's an error
                }
            }

            setResources(fetchedResources);
        };

        fetchResources();
    }, []);

    return (
        <>
            <div className="backButton" onClick={() => navigate(-1)}>
                ← Back
            </div>
            <h1>IB Resources</h1>

            <div className="resource-container">
                {resources.length > 0 ? (
                    resources.filter(resource => resource.resource_name.includes("AP Human")).map((resource) => (
                        <div
                            key={resource.id}
                            className="resource-item"
                            onClick={() => window.open(resource.resource_url, "_blank")}
                            style={{
                                cursor: 'pointer',
                                width: '200px',
                                height: '200px',
                                margin: '10px',
                                border: '1px solid black',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '8px'
                            }}
                        >
                            {resource.resource_name}
                        </div>
                    ))
                ) : (
                    <p>Loading resources...</p>
                )}
            </div>
        </>
    );
}; */}


{/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css'; // Ensuring styles are applied

export const IB = () => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const apiUrl = 'https://127.0.0.1:8000'; // Your backend URL

    useEffect(() => {
        const fetchResources = async () => {
            try {
                console.log("Fetching resources...");
                const response = await fetch(`${apiUrl}/r/class/ap-human-geo`);

                if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

                const data = await response.json();
                console.log("API Response:", data);

                if (data && Array.isArray(data.resources)) {
                    setResources(data.resources);
                    console.log("Resources set:", data.resources);
                } else {
                    console.error("Unexpected API response:", data);
                }
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };

        fetchResources();
    }, []);

    return (
        <>
            <div className="backButton" onClick={() => navigate(-1)}>← Back</div>
            <h1 className="title">IB Resources</h1>

            <div className="resource-grid">
                {resources.length > 0 ? (
                    resources.map((resource) => (
                        <div
                            key={resource.id}
                            className="resource-card"
                            onClick={() => window.open(resource.resource_url, "_blank")}
                        >
                            <h3>{resource.resource_name}</h3>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading resources...</p>
                )}
            </div>
        </>
    );
}; */}



{/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css'; // Ensure this file has the styles below

export const IB = () => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const apiUrl = 'https://127.0.0.1:8000'; // Your backend URL

    useEffect(() => {
        const fetchResources = async () => {
            let fetchedResources = [];
            let id = 1;

            while (true) {
                try {
                    const response = await fetch(`${apiUrl}/r/resource/${id}`);
                    if (!response.ok) break; 
                    
                    const data = await response.json();
                    fetchedResources.push(data);
                    id++; 
                } catch (error) {
                    console.error("Error fetching resources:", error);
                    break; 
                }
            }

            setResources(fetchedResources);
        };

        fetchResources();
    }, []);

    return (
        <>
            <div className="backButton" onClick={() => navigate(-1)}>
                ← Back
            </div>
            <h1 className="title">IB Resources</h1>

            <div className="resource-grid">
                {resources.length > 0 ? (
                    resources.map((resource) => (
                        <div
                            key={resource.id}
                            className="resource-card"
                            onClick={() => window.open(resource.resource_url, "_blank")}
                        >
                            <h3>{resource.resource_name}</h3>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading resources...</p>
                )}
            </div>
        </>
    );
}; */}


{/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css'; // Ensuring styles are applied

export const IB = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const apiUrl = 'https://127.0.0.1:8000'; // Your backend URL

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                console.log("Fetching IB classes...");
                const response = await fetch(`${apiUrl}/r/classes/ib`);

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
            <h1 className="title">IB Classes</h1>

            <div className="resource-grid">
                {classes.length > 0 ? (
                    classes.map((ibClass) => (
                        <div key={ibClass.class_id} className="resource-card">
                            <h3>{ibClass.class_name}</h3>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading classes...</p>
                )}
            </div>
        </>
    );
}; */}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css'; // Ensure styles are applied

export const IB = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL; // Your backend URL

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                console.log("Fetching IB classes...");
                const response = await fetch(`${apiUrl}/r/classes/ib`);

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
            <h1 className="title">IB Classes</h1>

            <div className="resource-grid">
                {classes.length > 0 ? (
                    classes.map((ibClass) => (
                        <div 
                            key={ibClass.class_id} 
                            className="resource-card"
                            onClick={() => navigate(`/IB/${ibClass.class_id}`)} // Dynamic routing
                        >
                            <h3>{ibClass.class_name}</h3>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading classes...</p>
                )}
            </div>
        </>
    );
};
