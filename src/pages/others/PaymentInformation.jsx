import React, { useState } from 'react';
import { 
  CreditCard,
  Calendar,
  Lock,
  MapPin,
  Building,
  Mail
} from 'lucide-react';

function PaymentInformation() {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    agreeToTerms: false
  });

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Payment form submitted:', formData);
    alert('Payment information submitted! Check console for details.');
  };

  const inputStyle = {
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
  };

  const labelStyle = {
    display: 'block',
    color: '#333',
    fontWeight: '500',
    marginBottom: '0.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const iconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#00A79D',
    width: '20px',
    height: '20px'
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#00A79D';
    e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#e9ecef';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '3rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Page Title - Outside the card */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#00A79D',
        textAlign: 'center',
        marginBottom: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Your Payment is Safe with Us !
      </h1>

      {/* Progress Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '2rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#00A79D',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            1
          </div>
          <span style={{
            fontSize: '14px',
            color: '#00A79D',
            fontWeight: '500',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Reservation Summary
          </span>
        </div>
        
        <div style={{
          width: '60px',
          height: '2px',
          backgroundColor: '#00A79D'
        }}></div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#00A79D',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            2
          </div>
          <span style={{
            fontSize: '14px',
            color: '#00A79D',
            fontWeight: '500',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Payment Details
          </span>
        </div>
        
        <div style={{
          width: '60px',
          height: '2px',
          backgroundColor: '#e0e0e0'
        }}></div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#e0e0e0',
            color: '#999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            3
          </div>
          <span style={{
            fontSize: '14px',
            color: '#999',
            fontWeight: '500',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Confirmation
          </span>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '2.5rem'
      }}>
        {/* Form Content */}
        <div 
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          
          {/* Card Information Section */}
          <div>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Card Information
            </h2>
          </div>

          {/* Cardholder Name */}
          <div>
            <label style={labelStyle}>
              Cardholder Name
            </label>
            <div style={{ position: 'relative' }}>
              <CreditCard style={iconStyle} />
              <input
                type="text"
                placeholder="Enter cardholder name"
                value={formData.cardholderName}
                onChange={handleInputChange('cardholderName')}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          {/* Card Number */}
          <div>
            <label style={labelStyle}>
              Card Number
            </label>
            <div style={{ position: 'relative' }}>
              <CreditCard style={iconStyle} />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange('cardNumber')}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          {/* Expiry Date and CVC */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            <div>
              <label style={labelStyle}>
                Expiry Date
              </label>
              <div style={{ position: 'relative' }}>
                <Calendar style={iconStyle} />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange('expiryDate')}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                CVC
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={iconStyle} />
                <input
                  type="text"
                  placeholder="123"
                  value={formData.cvc}
                  onChange={handleInputChange('cvc')}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>

          {/* Billing Address Section */}
          <div style={{
            borderTop: '2px solid #e9ecef',
            paddingTop: '2rem',
            marginTop: '1rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Billing Address
            </h3>
            
            {/* Street Address */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>
                Street Address
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin style={iconStyle} />
                <input
                  type="text"
                  placeholder="Enter your street address"
                  value={formData.billingAddress}
                  onChange={handleInputChange('billingAddress')}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* City and Postal Code */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              <div>
                <label style={labelStyle}>
                  City
                </label>
                <div style={{ position: 'relative' }}>
                  <Building style={iconStyle} />
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleInputChange('city')}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  Postal/Zip Code
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail style={iconStyle} />
                  <input
                    type="text"
                    placeholder="Enter postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange('postalCode')}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#fff3cd',
            borderRadius: '12px',
            border: '1px solid #ffeaa7'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.75rem'
            }}>
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange('agreeToTerms')}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#00A79D',
                  marginTop: '2px'
                }}
              />
              <label 
                htmlFor="agreeToTerms"
                style={{
                  fontSize: '0.875rem',
                  color: '#856404',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: 1.5,
                  margin: 0
                }}
              >
                I agree to the terms and conditions, privacy policy, and cancellation policy. 
                I understand that my payment will be processed securely.
              </label>
            </div>
          </div>

          {/* Accepted Payment Methods */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e9ecef',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#666',
              marginBottom: '1rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              We accept the following payment methods:
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '60px',
                height: '40px',
                backgroundColor: '#FF5F00',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '10px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                MASTER
                <br />
                CARD
              </div>
              <div style={{
                width: '60px',
                height: '40px',
                backgroundColor: '#1A1F71',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                VISA
              </div>
              <div style={{
                width: '60px',
                height: '40px',
                backgroundColor: '#016FD0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '11px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                maestro
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
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
              type="submit"
              onClick={handleSubmit}
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
        </div>
      </div>
    </div>
  );
}

export default PaymentInformation;