import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './pages.css';

export const UploadResources = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user has permission
  const hasPermission = user?.role === 'contributor' || user?.role === 'admin';

  if (!hasPermission) {
    return (
      <div className="content">
        <h1 className="header1">Access Denied</h1>
        <p>You need contributor or admin privileges to upload resources.</p>
        <button onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="content">
      <h1 className="header1">Upload Resources</h1>
      <p>This feature is coming soon! Contributors and admins will be able to upload study materials here.</p>
      <div className="form-container">
        <h2>Upload Study Material</h2>
        <p style={{ color: '#fff' }}>
          Coming soon: This page will allow contributors and admins to:
        </p>
        <ul style={{ color: '#fff', textAlign: 'left' }}>
          <li>Upload PDF study guides</li>
          <li>Add video tutorials</li>
          <li>Create practice questions</li>
          <li>Organize materials by subject and level (IB, AP, High School)</li>
        </ul>
      </div>
    </div>
  );
};
