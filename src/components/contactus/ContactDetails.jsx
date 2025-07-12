import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

function ContactDetails() {
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
          Contact Information
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Address */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <MapPin 
              size={20} 
              style={{ 
                color: '#00A79D', 
                marginTop: '2px',
                flexShrink: 0
              }} 
            />
            <div>
              <div style={{
                fontWeight: '600',
                color: '#333',
                fontSize: '14px',
                marginBottom: '4px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Address:
              </div>
              <div style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.4',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                No.80, Galle Road, Colombo 03, Sri Lanka
              </div>
            </div>
          </div>

          {/* Phone */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Phone 
              size={20} 
              style={{ 
                color: '#00A79D', 
                marginTop: '2px',
                flexShrink: 0
              }} 
            />
            <div>
              <div style={{
                fontWeight: '600',
                color: '#333',
                fontSize: '14px',
                marginBottom: '4px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Phone:
              </div>
              <div style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.4',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                +94 11 2436 790
              </div>
            </div>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Mail 
              size={20} 
              style={{ 
                color: '#00A79D', 
                marginTop: '2px',
                flexShrink: 0
              }} 
            />
            <div>
              <div style={{
                fontWeight: '600',
                color: '#333',
                fontSize: '14px',
                marginBottom: '4px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Email:
              </div>
              <div style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.4',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                treksrilankatourism@gmail.com
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Clock 
              size={20} 
              style={{ 
                color: '#00A79D', 
                marginTop: '2px',
                flexShrink: 0
              }} 
            />
            <div>
              <div style={{
                fontWeight: '600',
                color: '#333',
                fontSize: '14px',
                marginBottom: '4px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Office Hours:
              </div>
              <div style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.4',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Monday - Friday: 9:00 AM - 5:00 PM<br />
                Saturday: 9:00 AM - 1:00 PM<br />
                Sunday: Closed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;