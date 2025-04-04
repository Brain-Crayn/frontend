import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './pages.css'; // Import CSS file for styling

export const ClassResources = () => {
    const { class_id } = useParams();
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchResources = async () => {
            try {
                console.log(`Fetching resources for class: ${class_id}`);
                const response = await fetch(`${apiUrl}/r/class/${class_id}`);

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
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [class_id]);

    return (
        <>
            <div className="backButton" onClick={() => navigate(-1)}>← Back</div>
            <h1 className="title">Resources for {class_id.replace(/-/g, ' ').toUpperCase()}</h1>

            <div className="resource-grid">
                {loading ? (
                    <p className="loading-text">Loading resources...</p>
                ) : resources.length > 0 ? (
                    resources.map((resource) => (
                        <div key={resource.id} className="resource-card">
                            <h3>{resource.resource_name}</h3>
                            <div className="button-container">
                                <a 
                                    href={resource.resource_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="open-resource-button"
                                >
                                    Open Resource
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">No resources available.</p>
                )}
            </div>
        </>
    );
};
