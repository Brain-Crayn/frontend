import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import './pages.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, requestRoleElevation, loading } = useAuth();
  const [elevationData, setElevationData] = useState({
    requestedRole: 'contributor',
    justification: '',
  });
  const [contributionData, setContributionData] = useState({
    diploma: '',
    school: '',
    gpa: '',
    subject: '',
    file: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [contributionMessage, setContributionMessage] = useState('');
  
  // Admin section state
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestsError, setRequestsError] = useState('');
  const [reviewingId, setReviewingId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch pending requests if user is admin
  useEffect(() => {
    if (user && (user.role === 'admin' || user.groups?.includes('admin'))) {
      loadPendingRequests();
    }
  }, [user]);

  const loadPendingRequests = async () => {
    setLoadingRequests(true);
    setRequestsError('');
    try {
      const data = await authService.getPendingRoleElevationRequests();
      setPendingRequests(data.requests || []);
    } catch (err) {
      setRequestsError(err.message);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleReviewRequest = async (requestId, action) => {
    setReviewingId(requestId);
    try {
      await authService.reviewRoleElevation(requestId, action, '');
      // Reload the requests
      await loadPendingRequests();
    } catch (err) {
      setRequestsError(err.message);
    } finally {
      setReviewingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleRoleElevationChange = (e) => {
    const { name, value } = e.target;
    setElevationData(prev => ({ ...prev, [name]: value }));
  };

  const handleRequestElevation = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      await requestRoleElevation(elevationData.requestedRole, elevationData.justification);
      setMessage('Role elevation request submitted! Administrators will review your request.');
      setElevationData({ requestedRole: 'contributor', justification: '' });
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleContributionChange = (e) => {
    const { name, value, files } = e.target;
    setContributionData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleContributionSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setContributionMessage('');

    try {
      // Get CSRF token
      const csrfResponse = await fetch(`${import.meta.env.VITE_API_URL}/getCSRFToken/`, {
        method: 'GET',
        credentials: 'include',
      });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;

      // Prepare form data
      const formData = new FormData();
      formData.append('fullName', user.username);
      formData.append('email', user.email);
      formData.append('school', contributionData.school);
      formData.append('diploma', contributionData.diploma);
      formData.append('gpa', contributionData.gpa);
      formData.append('subject', contributionData.subject);
      formData.append('message', '');
      formData.append('file', contributionData.file);
      formData.append('action', 'contribute');

      // Submit
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contributeRequest/requestform/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to submit contribution');
      }

      setContributionMessage('Your study guide has been successfully submitted! Thank you for contributing.');
      setContributionData({
        diploma: '',
        school: '',
        gpa: '',
        subject: '',
        file: null,
      });

      // Clear message after 3 seconds
      setTimeout(() => {
        setContributionMessage('');
      }, 3000);
    } catch (err) {
      setContributionMessage(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="backButton" onClick={() => window.history.back()}>
        ← Back
      </div>
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>

          <section className="user-info-section">
            <h2>User Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Username:</label>
                <span>{user.username}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="info-item">
                <label>Current Role:</label>
                <span className="role-badge">{user.role || 'student'}</span>
              </div>
              {user.groups && user.groups.length > 0 && (
                <div className="info-item">
                  <label>Groups:</label>
                  <span>{user.groups.join(', ')}</span>
                </div>
              )}
            </div>
          </section>

          {(user.role === 'admin' || user.groups?.includes('admin')) && (
            <section className="admin-section">
              <h2>Admin Panel: Manage Role Elevation Requests</h2>
              
              {requestsError && (
                <div className="error-message">{requestsError}</div>
              )}
              
              {loadingRequests ? (
                <p>Loading requests...</p>
              ) : pendingRequests.length === 0 ? (
                <p className="info-text">No pending role elevation requests.</p>
              ) : (
                <div className="requests-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Current Role</th>
                        <th>Requested Role</th>
                        <th>Justification</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingRequests.map((req) => (
                        <tr key={req.id}>
                          <td>{req.username}</td>
                          <td>{req.email}</td>
                          <td>{req.current_role}</td>
                          <td><strong>{req.requested_role}</strong></td>
                          <td className="justification-cell">{req.justification}</td>
                          <td>{new Date(req.created_at).toLocaleDateString()}</td>
                          <td className="actions-cell">
                            <button
                              onClick={() => handleReviewRequest(req.id, 'approve')}
                              disabled={reviewingId === req.id}
                              className="approve-btn"
                            >
                              {reviewingId === req.id ? 'Processing...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleReviewRequest(req.id, 'reject')}
                              disabled={reviewingId === req.id}
                              className="deny-btn"
                            >
                              {reviewingId === req.id ? 'Processing...' : 'Deny'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {user.role === 'student' && (
            <section className="elevation-section">
              <h2>Request Role Elevation</h2>
              <p className="info-text">
                Want to contribute resources or help manage the platform? Submit a request to become a <strong>contributor</strong> or <strong>admin</strong>.
              </p>

              {message && (
                <div className={`message ${message.includes('Error') ? 'error-message' : 'success-message'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleRequestElevation}>
                <div className="form-group">
                  <label htmlFor="requestedRole">Requested Role</label>
                  <select
                    id="requestedRole"
                    name="requestedRole"
                    value={elevationData.requestedRole}
                    onChange={handleRoleElevationChange}
                    disabled={submitting}
                  >
                    <option value="contributor">Contributor (Upload Resources)</option>
                    <option value="admin">Admin (Full Platform Management)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="justification">Justification (Why do you want this role?)</label>
                  <textarea
                    id="justification"
                    name="justification"
                    value={elevationData.justification}
                    onChange={handleRoleElevationChange}
                    placeholder="Explain why you should be granted this role..."
                    disabled={submitting}
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !elevationData.justification.trim()}
                  className="submit-btn"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </section>
          )}


        </div>
      </div>
    </>
  );
};
