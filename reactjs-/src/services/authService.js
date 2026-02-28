const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:8000/';

const TOKEN_STORAGE_KEY = 'auth_tokens';
const USER_STORAGE_KEY = 'auth_user';

/**
 * Auth Service - handles all authentication API calls and local token management
 */

export const authService = {
  /**
   * Fetch CSRF token from backend
   * Always fetches a fresh token to ensure validity
   */
  async getCsrfToken() {
    try {
      const response = await fetch(`${API_URL}getCSRFToken/`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const data = await response.json();
      const csrfToken = data.csrfToken;
      return csrfToken;
    } catch (err) {
      console.error('Error fetching CSRF token:', err);
      throw err;
    }
  },

  /**
   * Store tokens locally
   */
  setTokens(tokens) {
    if (tokens?.access && tokens?.refresh) {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
    }
  },

  /**
   * Retrieve stored tokens
   */
  getTokens() {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  /**
   * Clear all auth data
   */
  clearTokens() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  /**
   * Store user info locally
   */
  setUser(user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  /**
   * Retrieve stored user info
   */
  getUser() {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  /**
   * Local login: send username/password
   */
  async login(username, password) {
    const csrfToken = await this.getCsrfToken();
    const response = await fetch(`${API_URL}auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    this.setTokens(data.tokens);
    this.setUser(data.user);
    return data.user;
  },

  /**
   * Google OAuth login/signup: send ID token from Google
   * Handles both login for existing users and signup for new users
   */
  async googleLogin(idToken) {
    const csrfToken = await this.getCsrfToken();
    
    try {
      const response = await fetch(`${API_URL}auth/google/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ id_token: idToken }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Google login error:', error);
        throw new Error(error.detail || 'Google authentication failed');
      }

      const data = await response.json();
      this.setTokens(data.tokens);
      this.setUser(data.user);
      return data.user;
    } catch (err) {
      console.error('Google login error:', err);
      throw err;
    }
  },

  /**
   * Register new user
   */
  async register(username, email, password) {
    const csrfToken = await this.getCsrfToken();
    const response = await fetch(`${API_URL}auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    const data = await response.json();
    this.setTokens(data.tokens);
    this.setUser(data.user);
    return data.user;
  },

  /**
   * Get current user info
   */
  async getCurrentUser() {
    const response = await fetch(`${API_URL}auth/user/`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      this.clearTokens();
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    this.setUser(data.user);
    return data.user;
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshToken() {
    const tokens = this.getTokens();
    if (!tokens?.refresh) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_URL}auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: tokens.refresh }),
    });

    if (!response.ok) {
      this.clearTokens();
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    this.setTokens(data);
    return data;
  },

  /**
   * Revoke refresh token and logout
   */
  async logout() {
    const csrfToken = await this.getCsrfToken();
    const tokens = this.getTokens();
    if (tokens?.refresh) {
      try {
        await fetch(`${API_URL}auth/token/revoke/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify({ refresh: tokens.refresh }),
        });
      } catch (err) {
        console.error('Token revoke failed:', err);
      }
    }

    // Also call server logout endpoint
    try {
      await fetch(`${API_URL}auth/logout/`, {
        method: 'POST',
        headers: { 'X-CSRFToken': csrfToken },
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }

    this.clearTokens();
  },

  /**
   * Request role elevation
   */
  async requestRoleElevation(requestedRole, justification) {
    const csrfToken = await this.getCsrfToken();
    const tokens = this.getTokens();
    const response = await fetch(`${API_URL}auth/role-elevation/request/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        'Authorization': `Bearer ${tokens?.access}`,
      },
      credentials: 'include',
      body: JSON.stringify({ requested_role: requestedRole, justification }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to submit role elevation request');
    }

    return await response.json();
  },

  /**
   * Get access token with optional auto-refresh
   */
  getAccessToken(autoRefresh = true) {
    const tokens = this.getTokens();
    return tokens?.access || null;
  },

  /**
   * Get all pending role elevation requests (admin only)
   */
  async getPendingRoleElevationRequests() {
    const response = await fetch(`${API_URL}auth/role-elevation/list/`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch role elevation requests');
    }

    return await response.json();
  },

  /**
   * Review a role elevation request (approve or reject)
   */
  async reviewRoleElevation(requestId, action, reason = '') {
    const csrfToken = await this.getCsrfToken();
    const tokens = this.getTokens();

    const response = await fetch(`${API_URL}auth/role-elevation/${requestId}/${action}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        'Authorization': `Bearer ${tokens?.access}`,
      },
      credentials: 'include',
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Failed to ${action} role elevation request`);
    }

    return await response.json();
  },
};
