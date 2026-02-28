import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Pages/pages.css';

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, loading, refreshUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  // Refresh user data on mount to ensure we have latest role
  useEffect(() => {
    if (isAuthenticated && refreshUser) {
      refreshUser().catch(err => console.error('Failed to refresh user data:', err));
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = (event) => {
    if (
      menuRef.current && !menuRef.current.contains(event.target) && 
      hamburgerButtonRef.current && !hamburgerButtonRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Check if user is contributor or admin
  const canUploadResources = user?.role === 'contributor' || user?.role === 'admin';

  // Don't show navigation on login/register pages
  const hideNav = ['/login', '/register'].includes(location.pathname);

  if (hideNav) {
    return null;
  }

  return (
    <header className="hamburgerHeader" ref={hamburgerButtonRef}>
      <div className="hamburger-button" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className={`nav-menu ${menuOpen ? "open" : ""}`} ref={menuRef}>
        <a onClick={() => handleNavigation('/main')}>Home</a>
        <a onClick={() => handleNavigation('/StudyGuides')}>Services</a>
        <a onClick={() => handleNavigation('/ContactUs')}>Contact</a>
        
        {!loading && (
          <>
            {isAuthenticated ? (
              <>
                <a onClick={() => handleNavigation('/dashboard')} className="auth-link">
                  Dashboard
                </a>
                {canUploadResources && (
                  <a onClick={() => handleNavigation('/upload')} className="auth-link upload-link">
                    Upload Resources
                  </a>
                )}
              </>
            ) : (
              <a onClick={() => handleNavigation('/login')} className="auth-link login-link">
                Login
              </a>
            )}
          </>
        )}
      </nav>
    </header>
  );
};
