import React from 'react';
import { 
  Bed, 
  Wifi, 
  Coffee, 
  Tv, 
  Bath, 
  Shield, 
  Users, 
  Car, 
  Waves, 
  Dumbbell,
  Utensils,
  Clock,
  Home,
  X
} from 'lucide-react';

const roomFeatures = [
  { icon: <Bed size={16} />, text: 'Comfortable Double Bed' },
  { icon: <Home size={16} />, text: 'Private Balcony with Garden View' },
  { icon: <Tv size={16} />, text: 'Air Conditioning & Heating' },
  { icon: <Tv size={16} />, text: 'Flat-screen TV with Cable' },
  { icon: <Wifi size={16} />, text: 'Free Wi-Fi' },
  { icon: <Coffee size={16} />, text: 'Tea/Coffee Maker' },
  { icon: <Bath size={16} />, text: 'Private Bathroom & Toiletries' },
  { icon: <Shield size={16} />, text: 'In-room Safe' }
];

const additionalServices = [
  { icon: <Clock size={16} />, text: '24/7 Room Service' },
  { icon: <Waves size={16} />, text: 'Pool & Fitness Center Access' },
  { icon: <Car size={16} />, text: 'Free Parking Available' },
  { icon: <Utensils size={16} />, text: 'Daily Housekeeping' }
];

const restrictionIcons = [
  { icon: <X size={16} />, text: 'Non-smoking Room', isRestriction: true },
  { icon: <X size={16} />, text: 'Pets Not Allowed', isRestriction: true }
];

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    overflow: 'hidden'
  },
  contentSection: {
    display: 'flex',
    gap: '2rem'
  },
  leftColumn: {
    flex: 1
  },
  rightColumn: {
    flex: 1
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  subSectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  featuresContainer: {
    marginBottom: '1.5rem'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    paddingLeft: '0.5rem'
  },
  featureIcon: {
    color: '#00A79D',
    marginTop: '0.125rem',
    flexShrink: 0
  },
  featureText: {
    fontSize: '0.875rem',
    color: '#374151',
    lineHeight: '1.4'
  },
  restrictionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.5rem',
    paddingLeft: '0.5rem'
  },
  restrictionIcon: {
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  restrictionText: {
    fontSize: '0.875rem',
    color: '#374151',
    lineHeight: '1.4'
  },
  priceSection: {
    padding: '1.5rem',
    textAlign: 'center'
  },
  priceContainer: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  priceUnit: {
    fontSize: '1rem',
    fontWeight: 'normal',
    color: '#6b7280'
  },
  reserveButton: {
    backgroundColor: '#00A79D',
    color: 'white',
    padding: '12px 32px',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '1.125rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
    marginTop: '1rem'
  }
};

function HotelRoomFeatures() {
  const handleButtonHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.backgroundColor = '#008B7A';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 12px rgba(0, 167, 157, 0.3)';
    } else {
      e.target.style.backgroundColor = '#00A79D';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = 'none';
    }
  };

  return (
    <div style={styles.container}>
      {/* Room Features Section */}
      <div style={styles.contentSection}>
        <div style={styles.leftColumn}>
          <h3 style={styles.sectionTitle}>
            Room Features:
          </h3>
          
          <div style={styles.featuresContainer}>
            {roomFeatures.map((feature, index) => (
              <div key={index} style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  {feature.icon}
                </div>
                <span style={styles.featureText}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Restrictions Section */}
          <div style={styles.featuresContainer}>
            {restrictionIcons.map((restriction, index) => (
              <div key={index} style={styles.restrictionItem}>
                <div style={styles.restrictionIcon}>
                  {restriction.icon}
                </div>
                <span style={styles.restrictionText}>
                  {restriction.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.rightColumn}>
          {/* Additional Services Section */}
          <h4 style={styles.sectionTitle}>
            Additional Services:
          </h4>
          
          <div style={styles.featuresContainer}>
            {additionalServices.map((service, index) => (
              <div key={index} style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  {service.icon}
                </div>
                <span style={styles.featureText}>
                  {service.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price and Booking Section */}
      <div style={styles.priceSection}>
        <div style={styles.priceContainer}>
          $300 <span style={styles.priceUnit}>per night</span>
        </div>
        
        <button 
          style={styles.reserveButton}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
}

export default HotelRoomFeatures;