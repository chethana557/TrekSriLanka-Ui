import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Globe, 
  Eye, 
  EyeOff,
  Users,
  MapPin
} from 'lucide-react';
import Logo from '../../assets/common/logo_new.png';
import { BASE_URL } from '../../api';

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark',
  'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'India',
  'Indonesia', 'Ireland', 'Italy', 'Japan', 'South Korea', 'Malaysia',
  'Netherlands', 'New Zealand', 'Norway', 'Pakistan', 'Philippines',
  'Poland', 'Portugal', 'Russia', 'Saudi Arabia', 'Singapore',
  'South Africa', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland',
  'Thailand', 'Turkey', 'Ukraine', 'United Kingdom', 'United States',
  'Vietnam'
];

const travelStyles = [
  'Luxury Travel',
  'Budget Travel', 
  'Adventure Travel',
  'Cultural Travel',
  'Eco Tourism',
  'Beach Holidays',
  'City Breaks',
  'Photography Tours'
];

const travelGroups = [
  'Solo Traveler',
  'Couple',
  'Family with Children',
  'Friends Group',
  'Business Travel',
  'Extended Family'
];

// Common input styles
const inputStyles = {
  width: '100%',
  paddingTop: '12px',
  paddingBottom: '12px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '25px',
  fontSize: '15px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box'
};

const labelStyles = {
  display: 'block',
  color: '#333',
  fontWeight: '500',
  marginBottom: '0.5rem',
  fontSize: '14px',
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const iconStyles = {
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#00A79D',
  width: '18px',
  height: '18px'
};

// Header Section Component
const HeaderSection = () => (
  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
    <div style={{ marginBottom: '0.1rem' }}>
      <img 
        src={Logo}
        alt="TrekSriLanka Logo"
        style={{
          width: '200px',
          height: 'auto',
        }}
      />
    </div>
    <h1 style={{
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#00A79D',
      marginBottom: '0.125rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      Join Wanderlust Adventures and Create Your Travel Account Today!
    </h1>
    <p style={{
      color: '#666',
      fontSize: '15px',
      marginBottom: '0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      Discover amazing destinations tailored just for you
    </p>
  </div>
);

// Text Input Component
const TextInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon: Icon,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  helpText
}) => {
  const handleFocus = (e) => {
    e.target.style.borderColor = '#00A79D';
    e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#e9ecef';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div>
      <label style={labelStyles}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Icon style={iconStyles} />
        <input
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            ...inputStyles,
            paddingLeft: '45px',
            paddingRight: showPasswordToggle ? '50px' : '16px'
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
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
        )}
      </div>
      {helpText && (
        <p style={{
          fontSize: '12px',
          color: '#666',
          marginTop: '0.25rem',
          marginLeft: '8px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {helpText}
        </p>
      )}
    </div>
  );
};

// Select Input Component
const SelectInput = ({ label, value, onChange, options, placeholder, icon: Icon }) => {
  const handleFocus = (e) => {
    e.target.style.borderColor = '#00A79D';
    e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#e9ecef';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div>
      <label style={labelStyles}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Icon style={{ ...iconStyles, zIndex: 1 }} />
        <select
          value={value}
          onChange={onChange}
          style={{
            ...inputStyles,
            paddingLeft: '45px',
            paddingRight: '16px',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'><path fill=\'%23666\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/></svg>")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '12px'
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Personal Information Section
const PersonalInfoSection = ({ formData, handleInputChange, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, isGoogleSignUp }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
    {isGoogleSignUp && (
      <div style={{
        backgroundColor: '#e8f5e8',
        border: '1px solid #00A79D',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px'
      }}>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#00A79D',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '500'
        }}>
          🌟 Continue with Google - Complete your profile to get personalized travel recommendations!
        </p>
      </div>
    )}

    <TextInput
      label="Username"
      placeholder="Choose a username"
      value={formData.username}
      onChange={handleInputChange('username')}
      icon={User}
    />

    <TextInput
      label="Full Name"
      placeholder="Enter your name"
      value={formData.fullName}
      onChange={handleInputChange('fullName')}
      icon={User}
    />

    <TextInput
      label="Email Address"
      type="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleInputChange('email')}
      icon={Mail}
    />

    {!isGoogleSignUp && (
      <>
        <TextInput
          label="Password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleInputChange('password')}
          icon={Lock}
          showPasswordToggle={true}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          helpText="Use at least 8 characters with letters, numbers, and symbols"
        />

        <TextInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          icon={Lock}
          showPasswordToggle={true}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </>
    )}

    {isGoogleSignUp && (
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        padding: '12px'
      }}>
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: '#666',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          🔐 You're signing up with Google - no password needed! You can set a password later in your account settings.
        </p>
      </div>
    )}

    <TextInput
      label="Phone Number"
      type="tel"
      placeholder="Enter your phone number"
      value={formData.phoneNumber}
      onChange={handleInputChange('phoneNumber')}
      icon={Phone}
    />
  </div>
);

// Travel Preferences Section
const TravelPreferencesSection = ({ formData, handleInputChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
    <SelectInput
      label="Country"
      value={formData.country}
      onChange={handleInputChange('country')}
      options={countries}
      placeholder="Select your country"
      icon={MapPin}
    />

    <SelectInput
      label="Preferred Travel Style"
      value={formData.travelStyle}
      onChange={handleInputChange('travelStyle')}
      options={travelStyles}
      placeholder="How do you like to travel?"
      icon={Globe}
    />

    <SelectInput
      label="Typical Travel Group"
      value={formData.travelGroup}
      onChange={handleInputChange('travelGroup')}
      options={travelGroups}
      placeholder="Who do you usually travel with?"
      icon={Users}
    />
  </div>
);

// Terms and Conditions Section
const TermsSection = ({ formData, handleInputChange }) => (
  <div style={{
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginTop: '0.5rem'
  }}>
    <input
      type="checkbox"
      id="agreeToTerms"
      checked={formData.agreeToTerms}
      onChange={handleInputChange('agreeToTerms')}
      style={{
        width: '16px',
        height: '16px',
        accentColor: '#00A79D',
        marginTop: '2px'
      }}
    />
    <label 
      htmlFor="agreeToTerms"
      style={{
        color: '#333',
        fontSize: '13px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        cursor: 'pointer',
        lineHeight: '1.4'
      }}
    >
      I agree to{' '}
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          color: '#00A79D',
          fontSize: '13px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          cursor: 'pointer',
          textDecoration: 'underline',
          padding: 0
        }}
      >
        Terms and Conditions
      </button>
      {' '}and{' '}
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          color: '#00A79D',
          fontSize: '13px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          cursor: 'pointer',
          textDecoration: 'underline',
          padding: 0
        }}
      >
        Privacy Policy
      </button>
    </label>
    
  </div>
);

// Action Buttons Section
const ActionButtonsSection = ({ onSubmit, navigate, isGoogleSignUp, isTermsAccepted, isLoading, errorMessage }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {/* Error Message */}
    {errorMessage && (
      <div style={{
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '12px',
        padding: '12px 16px',
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

    <button
      type="button"
      onClick={onSubmit}
      disabled={!isTermsAccepted || isLoading}
      style={{
        width: '100%',
        padding: '14px',
        backgroundColor: isLoading ? '#bdc3c7' : (isTermsAccepted ? '#00A79D' : '#cccccc'),
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        fontSize: '15px',
        fontWeight: '600',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        cursor: (isLoading || !isTermsAccepted) ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        marginTop: '0.5rem',
        opacity: (isTermsAccepted && !isLoading) ? 1 : 0.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        if (isTermsAccepted && !isLoading) {
          e.target.style.backgroundColor = '#008A80';
          e.target.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (isTermsAccepted && !isLoading) {
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
      {isLoading ? (isGoogleSignUp ? 'Setting up account...' : 'Creating account...') : (isGoogleSignUp ? 'Complete Google Sign-Up' : 'Create My Account')}
    </button>

    {/* Login Link */}
    <p style={{
      textAlign: 'center',
      color: '#666',
      fontSize: '14px',
      marginTop: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      Already have an account?{' '}
      <button
        type="button"
        onClick={() => navigate('/login')}
        style={{ 
          background: 'none',
          border: 'none',
          color: '#00A79D', 
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: '14px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.target.style.textDecoration = 'underline';
        }}
        onMouseLeave={(e) => {
          e.target.style.textDecoration = 'none';
        }}
      >
        Log in
      </button>
    </p>
  </div>
);

// Main SignUp Component
function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: '',
    travelStyle: '',
    travelGroup: '',
    agreeToTerms: false
  });
  
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);

  // Check if coming from Google Sign-In and pre-fill data
  useEffect(() => {
    if (location.state && location.state.googleUser) {
      const { email, name, picture, google_id } = location.state.googleUser;
      setFormData(prev => ({
        ...prev,
        email: email || '',
        fullName: name || '',
        username: (email ? email.split('@')[0] : '') // Suggest username from email
      }));
      setIsGoogleSignUp(true);
      console.log('📝 Pre-filled form with Google data:', { email, name });
    }
  }, [location.state]);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (field) => (event) => {
    const value = field === 'agreeToTerms' ? event.target.checked : event.target.value;
    
    // Clear error message when user starts typing
    if (errorMessage && field !== 'agreeToTerms') {
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
    
    // Client-side validation
    if (!formData.username.trim()) {
      setErrorMessage('Please enter a username.');
      return;
    }
    
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    
    // Email format validation
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please include an "@" in the email address. "' + formData.email + '" is missing an "@".');
      return;
    }
    
    // Check for incomplete email (missing domain)
    if (formData.email.includes('@') && !formData.email.split('@')[1].includes('.')) {
      setErrorMessage('Please enter a part following "@". "' + formData.email + '" is incomplete.');
      return;
    }
    
    // For Google sign-up, password is optional (can be set later)
    if (!isGoogleSignUp) {
      if (!formData.password.trim()) {
        setErrorMessage('Please enter a password.');
        return;
      }
      
      if (formData.password.length < 8) {
        setErrorMessage('Password must be at least 8 characters long.');
        return;
      }
      
      if (!formData.confirmPassword.trim()) {
        setErrorMessage('Please confirm your password.');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match. Please check both password fields.');
        return;
      }
    }
    
    if (!formData.phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    
    if (!formData.country) {
      setErrorMessage('Please select your country.');
      return;
    }
    
    // Terms validation
    if (!formData.agreeToTerms) {
      setErrorMessage('You must agree to the terms and conditions to continue.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      let response;
      
      if (isGoogleSignUp && location.state && location.state.googleUser) {
        // Handle Google Sign-Up completion
        const { google_id, picture } = location.state.googleUser;
        
        response = await fetch(`${BASE_URL}/auth/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.fullName,
            google_id: google_id,
            picture: picture,
            // Additional fields from form
            username: formData.username,
            phone_number: formData.phoneNumber,
            country: formData.country,
            travel_style: formData.travelStyle,
            travel_group: formData.travelGroup
          }),
        });
      } else {
        // Handle regular registration
        response = await fetch(`${BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: formData.password,
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            country: formData.country,
            travel_style: formData.travelStyle,
            travel_group: formData.travelGroup
          }),
        });
      }
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          errorData = { detail: 'Unable to process server response' };
        }
        
        // Handle specific error cases based on status code and message
        if (response.status === 400) {
          const detail = errorData.detail?.toLowerCase() || '';
          
          if (detail.includes('username') && detail.includes('already')) {
            setErrorMessage('This username is already taken. Please choose another one.');
          } else if (detail.includes('email') && detail.includes('already')) {
            setErrorMessage('This email address is already registered. Please use a different email or try logging in.');
          } else if (detail.includes('email') && detail.includes('invalid')) {
            setErrorMessage('Please enter a valid email address.');
          } else if (detail.includes('password') && detail.includes('weak')) {
            setErrorMessage('Password is too weak. Use at least 8 characters with letters, numbers, and symbols.');
          } else if (detail.includes('phone') && detail.includes('invalid')) {
            setErrorMessage('Please enter a valid phone number.');
          } else {
            setErrorMessage('Please check your information and try again.');
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
        } else if (response.status === 409) {
          // Conflict - Duplicate entries
          setErrorMessage('Account already exists with this information. Please try logging in instead.');
        } else if (response.status === 429) {
          setErrorMessage('Too many registration attempts. Please wait a few minutes before trying again.');
        } else if (response.status >= 500) {
          setErrorMessage('Server is temporarily unavailable. Please try again in a few moments.');
        } else {
          const message = errorData.detail || errorData.message || 'Registration failed';
          setErrorMessage(`${message}. Please try again.`);
        }
        return;
      }
      
      if (isGoogleSignUp) {
        // For Google sign-up, we get a token response, so log them in
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('token_type', data.token_type);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('user_type', data.user.is_verified ? 'admin' : 'user');
        
        // Navigate based on user type
        if (data.user.is_verified) {
          navigate('/admin/dashboard');
        } else {
          navigate('/destination');
        }
      } else {
        // For regular registration, redirect to login
        navigate('/login');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        overflow: 'auto'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%'
        }}>
          <HeaderSection />
        
        <div onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem',
          textAlign: 'left'
        }}>
          <PersonalInfoSection 
            formData={formData}
            handleInputChange={handleInputChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            isGoogleSignUp={isGoogleSignUp}
          />

          <TravelPreferencesSection 
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <TermsSection 
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <ActionButtonsSection 
            onSubmit={handleSubmit}
            navigate={navigate}
            isGoogleSignUp={isGoogleSignUp}
            isTermsAccepted={formData.agreeToTerms}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;