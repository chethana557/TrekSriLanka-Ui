import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const cardStyle = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f8fbfb 100%)',
  border: '1px solid #e9ecef',
  borderRadius: '14px',
  padding: '1rem',
  boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

const iconWrap = {
  width: 42,
  height: 42,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,167,157,0.08)',
  color: '#00A79D',
  flexShrink: 0,
};

function InfoCard({ icon, title, children }) {
  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
      }}
    >
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={iconWrap}>{icon}</div>
        <div>
          <div style={{
            fontWeight: 700,
            color: '#0f172a',
            fontSize: 15,
            marginBottom: 6,
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            {title}
          </div>
          <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.5 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactDetails() {
  return (
    <div style={{ padding: '2rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 980, width: '100%' }}>
        <h2 style={{
          fontSize: '1.6rem',
          fontWeight: 700,
          color: '#00A79D',
          textAlign: 'left',
          marginBottom: '1.25rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
        </h2>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          gap: '1rem'
        }}>
          <InfoCard icon={<MapPin size={20} />} title="Address">
            No.80, Galle Road, Colombo 03, Sri Lanka
          </InfoCard>
          <InfoCard icon={<Phone size={20} />} title="Phone">
            +94 11 2436 790
          </InfoCard>
          <InfoCard icon={<Mail size={20} />} title="Email">
            treksrilankatourism@gmail.com
          </InfoCard>
          <InfoCard icon={<Clock size={20} />} title="Office Hours">
            Monday - Friday: 9:00 AM - 5:00 PM<br />
            Saturday: 9:00 AM - 1:00 PM<br />
            Sunday: Closed
          </InfoCard>
        </div>

        {/* Responsive tweak */}
        <style>
          {`
            @media (min-width: 640px) {
              .contact-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
            }
            @media (min-width: 1024px) {
              .contact-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default ContactDetails;