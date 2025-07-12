import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Logo from '../../assets/common/logo_new.png';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberPassword: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field) => (event) => {
    const value = field === 'rememberPassword' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login submitted:', formData);
    alert('Login submitted! Check console for details.');
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In clicked');
    alert('Google Sign In functionality would be implemented here');
  };

  return (
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
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          textAlign: 'left'
        }}>
          
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
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
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

          {/* Remember Password Checkbox */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <input
              type="checkbox"
              id="rememberPassword"
              checked={formData.rememberPassword}
              onChange={handleInputChange('rememberPassword')}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#00A79D'
              }}
            />
            <label 
              htmlFor="rememberPassword"
              style={{
                color: '#333',
                fontSize: '13px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: 'pointer'
              }}
            >
              Remember Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleSubmit}
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
              marginTop: '0.25rem'
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
            Log in
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

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
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
            Sign in with Google
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
    </div>
  );
}

export default LoginPage;