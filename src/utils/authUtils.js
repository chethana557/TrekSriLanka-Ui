// Authentication utility functions for automatic credential management

// Constants
const TOKEN_EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
const TOKEN_TIMESTAMP_KEY = 'token_timestamp';
const TOKEN_CHECK_INTERVAL = 60 * 1000; // Check every minute

/**
 * Store user credentials with timestamp
 * @param {string} accessToken - The access token
 * @param {string} tokenType - The token type
 * @param {string} username - The username
 * @param {string} userType - The user type (user/admin)
 */
export const storeUserCredentials = (accessToken, tokenType, username, userType) => {
  const timestamp = Date.now();
  
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('token_type', tokenType);
  localStorage.setItem('username', username);
  localStorage.setItem('user_type', userType);
  localStorage.setItem(TOKEN_TIMESTAMP_KEY, timestamp.toString());
  
  // Start the automatic cleanup timer
  startTokenExpiryTimer();
};

/**
 * Clear all user credentials
 */
export const clearUserCredentials = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_type');
  localStorage.removeItem('username');
  localStorage.removeItem('user_type');
  localStorage.removeItem(TOKEN_TIMESTAMP_KEY);
  
  // Stop the timer
  stopTokenExpiryTimer();
};

/**
 * Check if user credentials are valid and not expired
 * @returns {boolean} - True if credentials are valid and not expired
 */
export const areCredentialsValid = () => {
  const accessToken = localStorage.getItem('access_token');
  const timestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);
  
  if (!accessToken || !timestamp) {
    return false;
  }
  
  const currentTime = Date.now();
  const tokenTime = parseInt(timestamp);
  
  // Check if token has expired (30 minutes)
  if (currentTime - tokenTime > TOKEN_EXPIRY_TIME) {
    // Token expired, clear credentials
    clearUserCredentials();
    return false;
  }
  
  return true;
};

/**
 * Get remaining time until token expires
 * @returns {number} - Remaining time in milliseconds, 0 if expired
 */
export const getRemainingTokenTime = () => {
  const timestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);
  if (!timestamp) return 0;
  
  const currentTime = Date.now();
  const tokenTime = parseInt(timestamp);
  const remaining = TOKEN_EXPIRY_TIME - (currentTime - tokenTime);
  
  return Math.max(0, remaining);
};

/**
 * Refresh token timestamp (useful for extending session on user activity)
 */
export const refreshTokenTimestamp = () => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    const timestamp = Date.now();
    localStorage.setItem(TOKEN_TIMESTAMP_KEY, timestamp.toString());
  }
};

// Timer management
let expiryTimer = null;
let checkInterval = null;

/**
 * Start the automatic token expiry timer
 */
const startTokenExpiryTimer = () => {
  // Clear any existing timers
  stopTokenExpiryTimer();
  
  // Set the main expiry timer
  expiryTimer = setTimeout(() => {
    clearUserCredentials();
    // Redirect to login page if we're on a protected route
    if (window.location.pathname.startsWith('/admin') || 
        window.location.pathname === '/hotels') {
      window.location.href = '/login';
    }
  }, TOKEN_EXPIRY_TIME);
  
  // Set up periodic checks
  checkInterval = setInterval(() => {
    if (!areCredentialsValid()) {
      clearUserCredentials();
      // Redirect to login page if we're on a protected route
      if (window.location.pathname.startsWith('/admin') || 
          window.location.pathname === '/hotels') {
        window.location.href = '/login';
      }
    }
  }, TOKEN_CHECK_INTERVAL);
};

/**
 * Stop the token expiry timer
 */
const stopTokenExpiryTimer = () => {
  if (expiryTimer) {
    clearTimeout(expiryTimer);
    expiryTimer = null;
  }
  
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
  }
};

/**
 * Initialize authentication system (call this when app starts)
 */
export const initializeAuth = () => {
  // Check if there are existing credentials and validate them
  if (localStorage.getItem('access_token')) {
    if (areCredentialsValid()) {
      // Credentials are valid, start the timer
      startTokenExpiryTimer();
    } else {
      // Credentials are expired, clear them
      clearUserCredentials();
    }
  }
  
  // Set up activity listeners to refresh token on user activity
  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  
  const handleUserActivity = () => {
    if (localStorage.getItem('access_token')) {
      refreshTokenTimestamp();
    }
  };
  
  activityEvents.forEach(event => {
    document.addEventListener(event, handleUserActivity, { passive: true });
  });
  
  // Cleanup function
  return () => {
    activityEvents.forEach(event => {
      document.removeEventListener(event, handleUserActivity);
    });
    stopTokenExpiryTimer();
  };
};

/**
 * Check if user is logged in (valid credentials)
 * @returns {boolean} - True if user is logged in
 */
export const isLoggedIn = () => {
  return areCredentialsValid();
};

/**
 * Check if user is admin
 * @returns {boolean} - True if user is admin
 */
export const isAdmin = () => {
  return areCredentialsValid() && localStorage.getItem('user_type') === 'admin';
};

/**
 * Check if user is regular user
 * @returns {boolean} - True if user is regular user
 */
export const isUser = () => {
  return areCredentialsValid() && localStorage.getItem('user_type') === 'user';
};

/**
 * Get current user info
 * @returns {object|null} - User info object or null if not logged in
 */
export const getCurrentUser = () => {
  if (!areCredentialsValid()) {
    return null;
  }
  
  return {
    username: localStorage.getItem('username'),
    userType: localStorage.getItem('user_type'),
    accessToken: localStorage.getItem('access_token'),
    tokenType: localStorage.getItem('token_type')
  };
};
