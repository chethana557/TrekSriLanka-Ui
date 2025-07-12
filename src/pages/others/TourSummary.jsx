import React from 'react';
import { 
  Calendar, 
  Users, 
  Baby,
  Globe,
  MapPin,
  Clock,
  DollarSign,
  AlertCircle
} from 'lucide-react';

function TourSummary() {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '3rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Page Title - Outside the card, matching BookingForm */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#00A79D',
        textAlign: 'center',
        marginBottom: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Review Your Tour Details
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
            Booking Details
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
            Review & Confirm
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
            Payment
          </span>
        </div>
      </div>

      {/* Main Content Card - Matching BookingForm dimensions and styling */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '2.5rem'
      }}>
        {/* Tour Image */}
        <div style={{
          width: '100%',
          height: '250px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #00A79D 0%, #008A80 50%, #006B5D 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              textAlign: 'center',
              color: 'white'
            }}>
              <MapPin size={48} style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: 0,
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Cultural Heritage Tour
              </h3>
              <p style={{
                fontSize: '1rem',
                margin: '0.5rem 0 0 0',
                opacity: 0.9,
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Explore Ancient Temples & Historic Sites
              </p>
            </div>
          </div>
        </div>

        {/* Booking Summary - Using BookingForm input styling */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Customer Information */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Booking Information
            </h3>
            
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              marginBottom: '1rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <strong style={{
                    color: '#00A79D',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Guest Name:
                  </strong>
                  <span style={{
                    marginLeft: '0.5rem',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    John Smith
                  </span>
                </div>
                <div>
                  <strong style={{
                    color: '#00A79D',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Email:
                  </strong>
                  <span style={{
                    marginLeft: '0.5rem',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    john.smith@email.com
                  </span>
                </div>
                <div>
                  <strong style={{
                    color: '#00A79D',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Mobile:
                  </strong>
                  <span style={{
                    marginLeft: '0.5rem',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    +1 (555) 123-4567
                  </span>
                </div>
                <div>
                  <strong style={{
                    color: '#00A79D',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Guide Language:
                  </strong>
                  <span style={{
                    marginLeft: '0.5rem',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    English
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tour Details - Using input-like styling */}
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {/* Travel Date */}
              <div style={{
                backgroundColor: '#f8f9fa',
                border: '2px solid #e9ecef',
                borderRadius: '12px',
                padding: '12px 16px',
                position: 'relative'
              }}>
                <Calendar style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00A79D',
                  width: '20px',
                  height: '20px'
                }} />
                <div style={{ paddingLeft: '32px' }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: '500',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Travel Date
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    March 15, 2025
                  </div>
                </div>
              </div>

              {/* Adults */}
              <div style={{
                backgroundColor: '#f8f9fa',
                border: '2px solid #e9ecef',
                borderRadius: '12px',
                padding: '12px 16px',
                position: 'relative'
              }}>
                <Users style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00A79D',
                  width: '20px',
                  height: '20px'
                }} />
                <div style={{ paddingLeft: '32px' }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: '500',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Adults
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    3 Travelers
                  </div>
                </div>
              </div>

              {/* Children */}
              <div style={{
                backgroundColor: '#f8f9fa',
                border: '2px solid #e9ecef',
                borderRadius: '12px',
                padding: '12px 16px',
                position: 'relative'
              }}>
                <Baby style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00A79D',
                  width: '20px',
                  height: '20px'
                }} />
                <div style={{ paddingLeft: '32px' }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: '500',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Children
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    2 Children
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div style={{
                backgroundColor: '#f8f9fa',
                border: '2px solid #e9ecef',
                borderRadius: '12px',
                padding: '12px 16px',
                position: 'relative'
              }}>
                <Clock style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00A79D',
                  width: '20px',
                  height: '20px'
                }} />
                <div style={{ paddingLeft: '32px' }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: '500',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Duration
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Full Day (8 hours)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section - Using input-like styling */}
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '2px solid #e9ecef',
            borderRadius: '12px',
            padding: '1.5rem',
            position: 'relative'
          }}>
            <DollarSign style={{
              position: 'absolute',
              left: '12px',
              top: '20px',
              color: '#00A79D',
              width: '20px',
              height: '20px'
            }} />
            <div style={{ paddingLeft: '32px' }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '1rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Price Breakdown
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '16px'
                  }}>
                    Tour Package (5 people)
                  </span>
                  <span style={{
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    $750.00
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '16px'
                  }}>
                    Service Fee
                  </span>
                  <span style={{
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    $25.00
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '16px'
                  }}>
                    Taxes (12%)
                  </span>
                  <span style={{
                    color: '#333',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    $93.00
                  </span>
                </div>
                
                <div style={{
                  borderTop: '2px solid #00A79D',
                  paddingTop: '0.75rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#00A79D',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    Total Amount
                  </span>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#00A79D',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    $868.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy - Using input-like styling */}
          <div style={{
            backgroundColor: '#fffbf0',
            border: '2px solid #fed7aa',
            borderRadius: '12px',
            padding: '1rem',
            position: 'relative'
          }}>
            <AlertCircle style={{
              position: 'absolute',
              left: '12px',
              top: '16px',
              color: '#ea580c',
              width: '20px',
              height: '20px'
            }} />
            <div style={{ paddingLeft: '32px' }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#ea580c',
                marginBottom: '0.5rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Cancellation Policy
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#9a3412',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                margin: 0,
                lineHeight: 1.5
              }}>
                Free cancellation until March 13, 2025 (48 hours before tour date). 
                Cancellations after this date will incur a 50% charge of the total amount.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Matching BookingForm exactly */}
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
            type="button"
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
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourSummary;