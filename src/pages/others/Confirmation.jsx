import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import { CheckCircle, Download, Home, Calendar, Users, Baby, Globe, User, Mail, Phone } from 'lucide-react';

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData || {};
  const payment = location.state?.payment || {};
  const pkgId = location.state?.packageId;
  // Generate a booking reference if none provided
  const bookingReference = bookingData.bookingReference || `TRK${Date.now().toString().slice(-8)}`;
  const totalAmount = bookingData.totalFormatted || bookingData.totalAmount || '';

  return (
    <>
    <Navbar />
    <div style={{
      minHeight: '100vh',
      padding: '3rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Page Title - Matching BookingForm style */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#00A79D',
        textAlign: 'center',
        marginBottom: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Booking Confirmed Successfully!
      </h1>

      {/* Main Content Card - Matching BookingForm dimensions and style */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '2.5rem'
      }}>
        {/* Success Icon and Message */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <CheckCircle style={{
            width: '80px',
            height: '80px',
            color: '#00A79D',
            margin: '0 auto 1.5rem'
          }} />
          
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Your Tour is Booked!
          </h2>
          
          <p style={{
            color: '#666',
            fontSize: '1rem',
            lineHeight: '1.5',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            marginBottom: '1.5rem'
          }}>
            Thank you for choosing our tour service. A confirmation email has been sent to your email address with all the details.
          </p>
        </div>

        {/* Booking Reference - Using BookingForm input style */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <label style={{
            display: 'block',
            color: '#333',
            fontWeight: '500',
            marginBottom: '0.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Booking Reference Number
          </label>
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#f8f9fa',
            border: '2px solid #00A79D',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#00A79D',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            {bookingReference}
          </div>
        </div>

        {/* Booking Summary - Using BookingForm field styles */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Booking Summary
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Full Name */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#f8f9fa',
              border: '2px solid #e9ecef',
              borderRadius: '12px'
            }}>
              <User style={{
                color: '#00A79D',
                width: '20px',
                height: '20px',
                marginRight: '12px'
              }} />
              <div>
                <span style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '500',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  display: 'block'
                }}>
                  Full Name
                </span>
                <span style={{
                  fontSize: '16px',
                  color: '#333',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {bookingData.fullName}
                </span>
              </div>
            </div>

            {/* Email */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#f8f9fa',
              border: '2px solid #e9ecef',
              borderRadius: '12px'
            }}>
              <Mail style={{
                color: '#00A79D',
                width: '20px',
                height: '20px',
                marginRight: '12px'
              }} />
              <div>
                <span style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '500',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  display: 'block'
                }}>
                  Email Address
                </span>
                <span style={{
                  fontSize: '16px',
                  color: '#333',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {bookingData.email}
                </span>
              </div>
            </div>

            {/* Mobile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#f8f9fa',
              border: '2px solid #e9ecef',
              borderRadius: '12px'
            }}>
              <Phone style={{
                color: '#00A79D',
                width: '20px',
                height: '20px',
                marginRight: '12px'
              }} />
              <div>
                <span style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '500',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  display: 'block'
                }}>
                  Mobile Number
                </span>
                <span style={{
                  fontSize: '16px',
                  color: '#333',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {bookingData.mobile}
                </span>
              </div>
            </div>

            {/* Travel Date */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#f8f9fa',
              border: '2px solid #e9ecef',
              borderRadius: '12px'
            }}>
              <Calendar style={{
                color: '#00A79D',
                width: '20px',
                height: '20px',
                marginRight: '12px'
              }} />
              <div>
                <span style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '500',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  display: 'block'
                }}>
                  Travel Date
                </span>
                <span style={{
                  fontSize: '16px',
                  color: '#333',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {bookingData.travelDate && new Date(bookingData.travelDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            {/* Travellers */}
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor: '#f8f9fa',
                border: '2px solid #e9ecef',
                borderRadius: '12px'
              }}>
                <Users style={{
                  color: '#00A79D',
                  width: '20px',
                  height: '20px',
                  marginRight: '12px'
                }} />
                <div>
                  <span style={{
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: '500',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    display: 'block'
                  }}>
                    Adults
                  </span>
                  <span style={{
                    fontSize: '16px',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {bookingData.adults}
                  </span>
                </div>
              </div>

              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor: '#f8f9fa',
                border: '2px solid #e9ecef',
                borderRadius: '12px'
              }}>
                <Baby style={{
                  color: '#00A79D',
                  width: '20px',
                  height: '20px',
                  marginRight: '12px'
                }} />
                <div>
                  <span style={{
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: '500',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    display: 'block'
                  }}>
                    Children
                  </span>
                  <span style={{
                    fontSize: '16px',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {bookingData.children}
                  </span>
                </div>
              </div>
            </div>

            {/* Language */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#f8f9fa',
              border: '2px solid #e9ecef',
              borderRadius: '12px'
            }}>
              <Globe style={{
                color: '#00A79D',
                width: '20px',
                height: '20px',
                marginRight: '12px'
              }} />
              <div>
                <span style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '500',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  display: 'block'
                }}>
                  Tour Guide Language
                </span>
                <span style={{
                  fontSize: '16px',
                  color: '#333',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {bookingData.language}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div style={{
          padding: '1rem',
          backgroundColor: '#fff3cd',
          borderRadius: '12px',
          border: '1px solid #ffeaa7',
          marginBottom: '2rem'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#856404',
            marginBottom: '0.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            What's Next?
          </h4>
          <div style={{
            fontSize: '0.875rem',
            color: '#856404',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: 1.5
          }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>• Check your email for detailed itinerary and meeting instructions</p>
            <p style={{ margin: '0 0 0.5rem 0' }}>• Our team will contact you 24 hours before your tour</p>
            <p style={{ margin: '0' }}>• Save your booking reference for easy check-in</p>
          </div>
        </div>

        {/* Buttons - Matching BookingForm button styles */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <button
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
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
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
            <Download style={{ width: '18px', height: '18px' }} />
            Download Receipt
          </button>
          <button
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
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
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
          onClick={()=> { 
            try { sessionStorage.removeItem('bookingFormData'); } catch {}
            try { sessionStorage.removeItem('bookingFlowExpiry'); } catch {}
            navigate('/');
          } }>
            <Home style={{ width: '18px', height: '18px' }} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
    <Footer_Combination />
    </>
  );
}

export default Confirmation;