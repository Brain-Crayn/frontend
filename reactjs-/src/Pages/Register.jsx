import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import './pages.css';

export const Register = () => {
  const navigate = useNavigate();
  const { register, googleLogin, error, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (formData.password !== formData.passwordConfirm) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLocalError('');
    try {
      await googleLogin(credentialResponse.credential);
      navigate('/dashboard');
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handleGoogleError = () => {
    setLocalError('Google sign-up failed');
  };

  const displayError = localError || error;

  return (
    <>
      <div className="backButton" onClick={() => window.history.back()}>
        ← Back
      </div>
      <div className="auth-container">
        <div className="auth-card">
          <h1>Register</h1>

          {displayError && (
            <div className="error-message">{displayError}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="signup_with"
            />
          </div>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};
