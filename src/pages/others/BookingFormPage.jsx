import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  Baby,
  Globe
} from 'lucide-react';

const languages = [
  'English',
  'Sinhala', 
  'Tamil',
  'German',
  'French',
  'Spanish',
  'Japanese',
  'Chinese'
];

function BookingFormPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    travelDate: '',
    adults: '',
    children: '',
    language: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for details.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      // backgroundColor: '#f5f5f5',
      padding: '3rem 1rem',
      display: 'flex',
      flexDirection: 'column', // Added to stack title and form vertically
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* --- CHANGE 1: "Book The Tour" is now outside the form card --- */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#00A79D',
        textAlign: 'center',
        marginBottom: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Ready to Explore? Book Your Tour Now
      </h1>
      
      <div style={{
        // --- CHANGE 2: Increased the width of the form ---
        maxWidth: '800px', 
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '2.5rem' // Adjusted padding for the new size
      }}>
        
        {/* Changed the wrapping div to a form tag for better semantics */}
        <form 
          onSubmit={handleSubmit} 
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Full Name */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease'
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

          {/* Email */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange('email')}
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease'
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

          {/* Mobile */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Mobile Number
            </label>
            <div style={{ position: 'relative' }}>
              <Phone style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleInputChange('mobile')}
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease'
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

          {/* Travel Date */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Travel Date
            </label>
            <div style={{ position: 'relative' }}>
              <Calendar style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="date"
                value={formData.travelDate}
                onChange={handleInputChange('travelDate')}
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease'
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

          {/* Adults */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Number of adult travellers
            </label>
            <div style={{ position: 'relative' }}>
              <Users style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="number"
                min="0"
                placeholder="Enter the adults count"
                value={formData.adults}
                onChange={handleInputChange('adults')}
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease'
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

          {/* Children */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Number of child travellers (Under 13 years)
            </label>
            <div style={{ position: 'relative' }}>
              <Baby style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="number"
                min="0"
                placeholder="Enter the child count"
                value={formData.children}
                onChange={handleInputChange('children')}
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease'
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

          {/* Language */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Tour Guide Language
            </label>
            <div style={{ position: 'relative' }}>
              <Globe style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px',
                zIndex: 1
              }} />
              <select
                value={formData.language}
                onChange={handleInputChange('language')}
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'><path fill=\'%23666\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/></svg>")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '12px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="" disabled>
                  Select the Guide Language
                </option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button
              type="button"
              style={{
                flex: 1,
                padding: '12px 24px',
                border: '2px solid #ccc',
                color: '#666',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#999';
                e.target.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#ccc';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Previous
            </button>
            <button
              type="submit" // Changed to submit
              // onClick={handleSubmit} - Removed as form onSubmit handles it now
              style={{
                flex: 1,
                padding: '12px 24px',
                backgroundColor: '#00A79D',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 167, 157, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#008A80';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 167, 157, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#00A79D';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 167, 157, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingFormPage;

