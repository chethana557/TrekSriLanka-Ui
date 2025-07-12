import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiryType: '',
    message: ''
  });

  const inquiryTypes = [
    'General Inquiry',
    'Tour Booking',
    'Support',
    'Feedback',
    'Other'
  ];

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! We will get back to you soon.');
  };

  return (
    <div style={{
      
      padding: '2rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '900px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        padding: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#00A79D',
          textAlign: 'left',
          marginBottom: '1.5rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          Send Us a Message
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Full Name */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontSize: '14px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleInputChange('fullName')}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00A79D';
                e.target.style.boxShadow = '0 0 0 2px rgba(0, 167, 157, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Email Address */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontSize: '14px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Email Address
            </label>
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
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00A79D';
                e.target.style.boxShadow = '0 0 0 2px rgba(0, 167, 157, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Type of Inquiry */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontSize: '14px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Type of Inquiry
            </label>
            <select
              value={formData.inquiryType}
              onChange={handleInputChange('inquiryType')}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '14px',
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
                e.target.style.boxShadow = '0 0 0 2px rgba(0, 167, 157, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="" disabled>
                Select your inquiry type
              </option>
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Your Message */}
          <div>
            <label style={{
              display: 'block',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontSize: '14px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Your Message
            </label>
            <textarea
              placeholder="Please describe your inquiry in detail"
              value={formData.message}
              onChange={handleInputChange('message')}
              rows="4"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                outline: 'none',
                transition: 'all 0.2s ease',
                resize: 'vertical',
                minHeight: '100px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00A79D';
                e.target.style.boxShadow = '0 0 0 2px rgba(0, 167, 157, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Send Button */}
          <div style={{ marginTop: '1rem' }}>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                backgroundColor: '#00A79D',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 167, 157, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#008A80';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 167, 157, 0.4)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#00A79D';
                e.target.style.boxShadow = '0 2px 8px rgba(0, 167, 157, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;