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

// Static fallbacks; will be replaced by dynamic if room prop provided
const fallbackRoomFeatures = [
  { icon: <Bed size={16} />, text: 'Comfortable Double Bed' },
  { icon: <Home size={16} />, text: 'Private Balcony with Garden View' },
  { icon: <Tv size={16} />, text: 'Air Conditioning & Heating' },
  { icon: <Tv size={16} />, text: 'Flat-screen TV with Cable' },
  { icon: <Wifi size={16} />, text: 'Free Wi-Fi' },
  { icon: <Coffee size={16} />, text: 'Tea/Coffee Maker' },
  { icon: <Bath size={16} />, text: 'Private Bathroom & Toiletries' },
  { icon: <Shield size={16} />, text: 'In-room Safe' }
];

const fallbackAdditional = [
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
    padding: '1.5rem 0 0',
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
  // Removed reserve button styles
};

function HotelRoomFeatures({ room, additionalServices = [], restrictedServices = [] }) {
  const dynamicFeatures = React.useMemo(() => {
    if (!room) return fallbackRoomFeatures;
    const list = [];
    if (room.bed_count) list.push({ icon: <Bed size={16} />, text: `${room.bed_count} beds` });
  if (room.room_count) list.push({ icon: <Home size={16} />, text: `${room.room_count} room${room.room_count > 1 ? 's' : ''}` });
    if (room.livingRoom) list.push({ icon: <Home size={16} />, text: `Living room: ${room.livingRoom}` });
    if (room.available_facilities && Array.isArray(room.available_facilities)) {
      room.available_facilities.slice(0,6).forEach(f => {
        const name = f?.name || f?.text || 'Facility';
        list.push({ icon: <Wifi size={16} />, text: name });
      });
    }
    if (room.guests || room.guest_count) list.push({ icon: <Users size={16} />, text: `${room.guest_count || room.guests} guests` });
    return list.length ? list : fallbackRoomFeatures;
  }, [room]);

  const dynamicAdditional = React.useMemo(() => {
    // Prefer backend-provided additionalServices, fallback to generated
    if (additionalServices && additionalServices.length) {
      return additionalServices.slice(0,8).map(s => ({ icon: <Clock size={16} />, text: s }));
    }
    if (!room) return fallbackAdditional;
    const arr = [];
    if (room.price_per_night) arr.push({ icon: <Clock size={16} />, text: 'Flexible booking times' });
    arr.push({ icon: <Waves size={16} />, text: 'Pool / Fitness Access' });
    arr.push({ icon: <Utensils size={16} />, text: 'Daily Housekeeping' });
    return arr;
  }, [room, additionalServices]);

  const dynamicRestrictions = React.useMemo(() => {
    if (restrictedServices && restrictedServices.length) {
      return restrictedServices.slice(0,10).map(s => ({ icon: <X size={16} />, text: s }));
    }
    return restrictionIcons; // fallback static restrictions
  }, [restrictedServices]);
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
      <div style={{ marginBottom: '1rem' }}>
        {/* Centered Room Features */}
        <h3 style={{ ...styles.sectionTitle, textAlign: 'center' }}>Room Features</h3>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,170px))', gap: '0.75rem', justifyContent: 'center', justifyItems: 'center' }}>
          {dynamicFeatures.map((feature, idx) => (
            <div key={idx} style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.55rem 0.6rem', display: 'flex', gap: '0.45rem', alignItems: 'center', justifyContent: 'center', minHeight: '48px', textAlign: 'center' }}>
              <span style={{ color: '#00A79D', lineHeight: 1, display: 'flex', alignItems: 'center' }}>{feature.icon}</span>
              <span style={{ fontSize: '.72rem', color: '#374151', lineHeight: '1.15', fontWeight: 500 }}>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Inline Additional + Restricted Row */}
        <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center' }}>
          <div style={{ minWidth: '300px', flex: '1 1 340px' }}>
            <h4 style={{ ...styles.sectionTitle, fontSize: '1rem', marginBottom: '.9rem' }}>Additional Services</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem' }}>
              {dynamicAdditional.map((service, idx) => (
                <div key={idx} style={{ background: 'linear-gradient(135deg,#ecfeff,#f0fdfa)', border: '1px solid #cffafe', borderRadius: '12px', padding: '.5rem .75rem', display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                  <span style={{ color: '#0d9488', lineHeight: 1 }}>{service.icon}</span>
                  <span style={{ fontSize: '.7rem', color: '#065f46', fontWeight: 500 }}>{service.text}</span>
                </div>
              ))}
              {!dynamicAdditional.length && <span style={{ fontSize: '.7rem', color: '#64748b' }}>No additional services</span>}
            </div>
          </div>
          <div style={{ minWidth: '300px', flex: '1 1 340px' }}>
            <h4 style={{ ...styles.sectionTitle, fontSize: '1rem', marginBottom: '.9rem' }}>Restricted Things</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem' }}>
              {dynamicRestrictions.map((r, i) => (
                <div key={i} style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '.5rem .75rem', display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                  <span style={{ color: '#dc2626', lineHeight: 1 }}>{r.icon}</span>
                  <span style={{ fontSize: '.7rem', color: '#7f1d1d', fontWeight: 500 }}>{r.text}</span>
                </div>
              ))}
              {!dynamicRestrictions.length && <span style={{ fontSize: '.7rem', color: '#64748b' }}>No restrictions</span>}
            </div>
          </div>
        </div>

        {/* Price */}
        <div style={styles.priceSection}>
          <div style={styles.priceContainer}>
            {room?.price_per_night ? `$${room.price_per_night}` : '$300'} <span style={styles.priceUnit}>per night</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelRoomFeatures;