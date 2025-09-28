import React, { useState, useEffect } from 'react';

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

  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: '', message: '' });
  const API_BASE_URL = 'http://localhost:8000/api/v1';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.fullName || !formData.email || !formData.inquiryType || !formData.message) {
      setNotice({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/contact/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          inquiry_type: formData.inquiryType,
          message: formData.message
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Failed to send message');
      }
      // Success
      setFormData({ fullName: '', email: '', inquiryType: '', message: '' });
      setNotice({ type: 'success', message: 'Message sent! We will get back to you soon.' });
    } catch (e) {
      setNotice({ type: 'error', message: `Could not send message: ${e.message}` });
    } finally {
      setSubmitting(false);
    }
  };

  // Auto-hide notification after 4 seconds
  useEffect(() => {
    if (!notice.message) return;
    const t = setTimeout(() => setNotice({ type: '', message: '' }), 4000);
    return () => clearTimeout(t);
  }, [notice.message]);

  return (
    <div id="contact-form" style={{
      
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
          fontWeight: 'bold',
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
              onClick={submitting ? undefined : handleSubmit}
              style={{
                backgroundColor: '#00A79D',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 167, 157, 0.3)',
                opacity: submitting ? 0.85 : 1
              }}
              onMouseEnter={(e) => {
                if (submitting) return;
                e.target.style.backgroundColor = '#008A80';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 167, 157, 0.4)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#00A79D';
                e.target.style.boxShadow = '0 2px 8px rgba(0, 167, 157, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
              disabled={submitting}
            >
              {submitting ? 'Sending…' : 'Send'}
            </button>
          </div>

          {/* Inline Alert under the Send button */}
          {notice.message && (
            <div
              role="alert"
              aria-live="polite"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: 10,
                border: `1px solid ${notice.type === 'success' ? '#C6F6D5' : '#FED7D7'}`,
                background: notice.type === 'success' ? 'linear-gradient(180deg, #F0FFF4, #F6FFFA)' : 'linear-gradient(180deg, #FFF5F5, #FFF8F8)',
                color: notice.type === 'success' ? '#22543D' : '#742A2A',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>{notice.message}</span>
              <button
                type="button"
                onClick={() => setNotice({ type: '', message: '' })}
                aria-label="Dismiss notification"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 700
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactForm;