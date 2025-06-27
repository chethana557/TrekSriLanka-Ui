import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        src="src/assets/logo_new.png" 
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
const PersonalInfoSection = ({ formData, handleInputChange, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
const ActionButtonsSection = ({ handleGoogleSignUp, onSubmit, navigate }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <button
      type="button"
      onClick={onSubmit}
      style={{
        width: '100%',
        padding: '14px',
        backgroundColor: '#00A79D',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        fontSize: '15px',
        fontWeight: '600',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginTop: '0.5rem'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#008A80';
        e.target.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#00A79D';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      Create My Account
    </button>

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

    {/* Google Sign Up Button */}
    <button
      type="button"
      onClick={handleGoogleSignUp}
      style={{
        width: '100%',
        padding: '14px',
        backgroundColor: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '25px',
        fontSize: '15px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#f8f9fa';
        e.target.style.borderColor = '#00A79D';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'white';
        e.target.style.borderColor = '#e9ecef';
      }}
    >
      <img 
        src="src/assets/loginpage/google_logo.png" 
        alt="Google"
        style={{
          width: '18px',
          height: '18px'
        }}
      />
      Sign up with Google
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
        onClick={() => navigate('/')}
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
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: '',
    travelStyle: '',
    travelGroup: '',
    agreeToTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field) => (event) => {
    const value = field === 'agreeToTerms' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sign up submitted:', formData);
    alert('Account created successfully! Check console for details.');
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up clicked');
    alert('Google Sign Up functionality would be implemented here');
  };

  return (
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
            handleGoogleSignUp={handleGoogleSignUp}
            onSubmit={handleSubmit}
            navigate={navigate}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;