import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Logo from '../../assets/common/logo_new.png';
import Google from '../../assets/common/google_logo.png';
import { BASE_URL } from '../../api';
import { storeUserCredentials } from '../../utils/authUtils';

// Google OAuth Configuration
// For development, you can use a test client ID or get one from Google Cloud Console
const GOOGLE_CLIENT_ID = "34488702447-rvivqsf3hh0qfr54a65letm77ffr9irp.apps.googleusercontent.com"; // Replace with your actual Client ID from Google Cloud Console

// Development mode configuration
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize Google Sign-In when component mounts
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      // Check if we have a valid Google Client ID
      if (GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE") {
        console.log('Google Client ID not configured. Please set up Google OAuth credentials.');
        setIsGoogleLoaded(false);
        return;
      }

      if (window.google && window.google.accounts) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: false, // Disable FedCM for localhost
            ux_mode: 'popup', // Use popup mode instead of redirect
          });
          setIsGoogleLoaded(true);
          console.log('Google Sign-In initialized successfully');
        } catch (error) {
          console.error('Google Sign-In initialization failed:', error);
          setIsGoogleLoaded(false);
        }
      } else {
        console.log('Google Sign-In library not loaded yet, retrying...');
        setTimeout(initializeGoogleSignIn, 1000);
      }
    };

    initializeGoogleSignIn();
  }, []);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
    
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Don't submit if already loading
    if (isLoading) return;
    
    // Clear previous error message
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          errorData = { detail: 'Unable to process server response' };
        }
        
        // Handle specific error cases based on status code and message
        if (response.status === 401) {
          // Unauthorized - Invalid credentials (email or password)
          setErrorMessage('Please check your email and password again.');
        } else if (response.status === 400) {
          // Bad Request - Usually validation errors
          const detail = errorData.detail?.toLowerCase() || '';
          
          if (detail.includes('email') && detail.includes('invalid')) {
            setErrorMessage('Please enter a valid email address.');
          } else if (detail.includes('password') && detail.includes('required')) {
            setErrorMessage('Please enter your password.');
          } else if (detail.includes('field') || detail.includes('required')) {
            setErrorMessage('Please fill in all required fields.');
          } else {
            setErrorMessage('Please enter a valid email address and password.');
          }
        } else if (response.status === 422) {
          // Unprocessable Entity - Validation errors
          if (errorData.detail && Array.isArray(errorData.detail)) {
            // Handle FastAPI validation errors
            const errors = errorData.detail.map(err => err.msg || err.message).join('. ');
            setErrorMessage(`Validation error: ${errors}`);
          } else {
            setErrorMessage('Please check your input and try again.');
          }
        } else if (response.status === 429) {
          // Too Many Requests
          setErrorMessage('Too many login attempts. Please wait a few minutes before trying again.');
        } else if (response.status === 403) {
          // Forbidden
          setErrorMessage('Account access is restricted. Please contact support.');
        } else if (response.status >= 500) {
          // Server Error
          setErrorMessage('Server is temporarily unavailable. Please try again in a few moments.');
        } else {
          // Any other error
          const message = errorData.detail || errorData.message || 'Login failed';
          setErrorMessage(`${message}. Please try again.`);
        }
        return;
      }

      const data = await response.json();
      
      // Fetch user info
      const userResponse = await fetch(`${BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });
      
      if (!userResponse.ok) {
        alert('Failed to fetch user info.');
        return;
      }
      
      const user = await userResponse.json();
      
      // Store credentials using the new utility function
      storeUserCredentials(
        data.access_token,
        data.token_type,
        user.username,
        user.is_verified ? 'admin' : 'user'
      );

      // Navigate based on user type
      if (user.is_verified) {
        navigate('/admin/dashboard');
      } else {
        navigate('/destination');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setErrorMessage('Unable to connect to server. Please check your internet connection and try again.');
      } else if (error.name === 'AbortError') {
        setErrorMessage('Request timed out. Please try again.');
      } else if (error.message.includes('CORS')) {
        setErrorMessage('Connection blocked. Please try again or contact support.');
      } else if (error.message.includes('NetworkError') || error.message.includes('ERR_NETWORK')) {
        setErrorMessage('Network error. Please check your internet connection.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };



    // Handle Google OAuth response
  const handleGoogleResponse = async (response) => {
    try {
      console.log('Google Sign-In response received');
      
      // Verify the Google token and get user info
      const verifyResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${response.credential}`);
      
      if (!verifyResponse.ok) {
        alert('Failed to verify Google token. Please try again.');
        return;
      }

      const googleUser = await verifyResponse.json();
      console.log('🔍 Google user info:', googleUser);
      
      // Check if user already exists in our system
      try {
        const checkUserResponse = await fetch(`${BASE_URL}/auth/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: response.credential
          }),
        });

        if (checkUserResponse.ok) {
          // User exists, log them in
          const data = await checkUserResponse.json();
          
          // Store credentials using the new utility function
          storeUserCredentials(
            data.access_token,
            data.token_type,
            data.user.username || data.user.email,
            data.user.is_verified ? 'admin' : 'user'
          );
          
          console.log('Existing Google user logged in');
          
          // Navigate based on user type
          if (data.user.is_verified) {
            navigate('/admin/dashboard');
          } else {
            navigate('/destination');
          }
        } else {
          // User doesn't exist, redirect to signup with Google data
          console.log('New Google user, redirecting to signup');
          navigate('/signup', {
            state: {
              googleUser: {
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
                google_id: googleUser.sub
              }
            }
          });
        }
      } catch (backendError) {
        // If backend call fails, assume new user and redirect to signup
        console.log('Backend check failed, redirecting to signup for new user');
        navigate('/signup', {
          state: {
            googleUser: {
              email: googleUser.email,
              name: googleUser.name,
              picture: googleUser.picture,
              google_id: googleUser.sub
            }
          }
        });
      }

    } catch (error) {
      console.error('Google Sign-In error:', error);
      alert('An error occurred during Google Sign-In.');
    }
  };

  // Handle Google Sign-In button click
  const handleGoogleSignIn = () => {
    // Check if Google Client ID is configured
    if (GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE") {
      alert('Google Sign-In is not configured. Please set up Google OAuth credentials first.\n\n' +
            'Steps:\n' +
            '1. Go to Google Cloud Console\n' +
            '2. Create OAuth 2.0 credentials\n' +
            '3. Add http://localhost:5173 to authorized origins\n' +
            '4. Update GOOGLE_CLIENT_ID in the code');
      return;
    }

    if (!isGoogleLoaded) {
      alert('Google Sign-In is still loading. Please try again in a moment.');
      return;
    }
    
    if (!window.google || !window.google.accounts) {
      alert('Google Sign-In library not loaded. Please refresh the page.');
      return;
    }

    console.log('Triggering Google Sign-In...');
    
    try {
      // Use a simpler approach for localhost development
      if (isDevelopment) {
        // For development, use popup method directly
        console.log('Development mode: Using popup method');
        
        // Use Google One Tap instead of redirect flow for development
        console.log('Development mode: Using Google One Tap');
        
        try {
          // Try Google One Tap first
          window.google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed()) {
              console.log('One Tap not displayed, trying popup method');
              
              // Fallback to popup OAuth flow
              if (window.google.accounts.oauth2) {
                const client = window.google.accounts.oauth2.initTokenClient({
                  client_id: GOOGLE_CLIENT_ID,
                  scope: 'email profile openid',
                  callback: (response) => {
                    if (response.access_token) {
                      console.log('Access token received via popup');
                      handleGooglePopupResponse(response.access_token);
                    } else {
                      console.error('No access token received');
                      alert('Google Sign-In failed. Please try again.');
                    }
                  },
                });
                client.requestAccessToken();
              } else {
                alert('Google OAuth2 library not available. Please refresh the page.');
              }
            }
          });
        } catch (error) {
          console.error('Google Sign-In error:', error);
          alert('Google Sign-In failed: ' + error.message);
        }
        
      } else {
        // Production mode - use Google One Tap
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.log('One Tap not displayed, falling back to popup');
            // Fallback to OAuth2 popup
            window.google.accounts.oauth2.initTokenClient({
              client_id: GOOGLE_CLIENT_ID,
              scope: 'email profile',
              callback: (response) => {
                if (response.access_token) {
                  console.log('Access token received via popup');
                  handleGooglePopupResponse(response.access_token);
                }
              },
            }).requestAccessToken();
          }
        });
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      alert('Google Sign-In failed. Please check the console for details.');
    }
  };

    // Handle Google popup response (when One Tap is not available)
  const handleGooglePopupResponse = async (accessToken) => {
    try {
      // Get user info using the access token
      const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
      const userInfo = await userInfoResponse.json();
      
      console.log('🔍 Google popup user info:', userInfo);
      
      // Check if user already exists in our system
      try {
        const checkUserResponse = await fetch(`${BASE_URL}/auth/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userInfo.email,
            name: userInfo.name,
            google_id: userInfo.id,
            picture: userInfo.picture
          }),
        });

        if (checkUserResponse.ok) {
          // User exists, log them in
          const data = await checkUserResponse.json();
          
          // Store credentials using the new utility function
          storeUserCredentials(
            data.access_token,
            data.token_type,
            data.user.username || data.user.email,
            data.user.is_verified ? 'admin' : 'user'
          );
          
          console.log('Existing Google user logged in via popup');
          
          // Navigate based on user type
          if (data.user.is_verified) {
            navigate('/admin/dashboard');
          } else {
            navigate('/destination');
          }
        } else {
          // User doesn't exist, redirect to signup with Google data
          console.log('New Google user via popup, redirecting to signup');
          navigate('/signup', {
            state: {
              googleUser: {
                email: userInfo.email,
                name: userInfo.name,
                picture: userInfo.picture,
                google_id: userInfo.id
              }
            }
          });
        }
      } catch (backendError) {
        // If backend call fails, assume new user and redirect to signup
        console.log('Backend check failed, redirecting to signup for new user');
        navigate('/signup', {
          state: {
            googleUser: {
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              google_id: userInfo.id
            }
          }
        });
      }

    } catch (error) {
      console.error('Google popup Sign-In error:', error);
      alert('An error occurred during Google Sign-In.');
    }
  };

  return (
    <>
      {/* CSS for animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes slideDown {
            0% {
              opacity: 0;
              transform: translateY(-10px);
              max-height: 0;
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              max-height: 100px;
            }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
          }
        `}
      </style>
      
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        padding: '2rem',
        textAlign: 'center'
      }}>
        
        {/* Logo */}
        <div style={{
          marginBottom: '0.1rem'
        }}>
          <img 
            src={Logo}
            alt="TrekSriLanka Logo"
            style={{
              width: '200px',
              height: 'auto',
            }}
          />
        </div>

        {/* Welcome Text */}
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: '#00A79D',
          marginBottom: '0.125rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
           Welcome Back, Explorer!
        </h1>
        
        <p style={{
          color: '#666',
          fontSize: '15px',
          marginBottom: '2.5rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          Unlock your journey by entering your credentials.
        </p>

        {/* Login Form */}
        <form 
          onSubmit={handleSubmit}
          action="/login"
          method="POST"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            textAlign: 'left'
          }}
        >
          
          {/* Email Address */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.375rem',
              fontSize: '14px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Email address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                name="username"
                id="username"
                autocomplete="username"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '25px',
                  fontSize: '15px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.375rem'
            }}>
              <label style={{
                color: '#333',
                fontWeight: '500',
                fontSize: '14px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Password
              </label>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#00A79D',
                  fontSize: '13px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                }}
              >
                forgot password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autocomplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '50px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '25px',
                  fontSize: '15px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '12px 16px',
              marginTop: '1rem',
              color: '#dc2626',
              fontSize: '14px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 1px 3px rgba(220, 38, 38, 0.1)',
              animation: 'slideDown 0.3s ease-out forwards, shake 0.5s ease-in-out 0.2s',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'white',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                !
              </div>
              <span style={{ fontWeight: '500' }}>{errorMessage}</span>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isLoading ? '#bdc3c7' : '#00A79D',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#008A80';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#00A79D';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isLoading && (
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}
              />
            )}
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
          

        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
            margin: '0.75rem 0'
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            backgroundColor: '#e9ecef'
          }}></div>
          <span style={{
            color: '#666',
            fontSize: '13px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            OR
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            backgroundColor: '#e9ecef'
          }}></div>
        </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={!isGoogleLoaded && GOOGLE_CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID_HERE"}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isGoogleLoaded ? 'white' : '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: '25px',
              fontSize: '15px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              cursor: isGoogleLoaded ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isGoogleLoaded ? 1 : 0.7
            }}
            onMouseEnter={(e) => {
              if (isGoogleLoaded) {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.borderColor = '#00A79D';
              }
            }}
            onMouseLeave={(e) => {
              if (isGoogleLoaded) {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#e9ecef';
              }
            }}
          >
            <img 
              src={Google}
              alt="Google"
              style={{
                width: '18px',
                height: '18px'
              }}
            />
            {GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE" 
              ? 'Google Sign-In (Not Configured)' 
              : isGoogleLoaded 
                ? 'Sign in with Google' 
                : 'Loading Google Sign-In...'}
          </button>

    

        {/* Sign Up Link */}
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '13px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          marginTop: '0.75rem'
        }}>
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            style={{
              background: 'none',
              border: 'none',
              color: '#00A79D',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = 'none';
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
      </div>
    </>
  );
}

export default LoginPage;