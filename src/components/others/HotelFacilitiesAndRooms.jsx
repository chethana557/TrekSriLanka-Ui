import React from 'react';
import { 
  Wifi, 
  Car, 
  Utensils, 
  Coffee, 
  ParkingCircle, 
  Wine,
  Waves,
  Dumbbell,
  Users,
  Home,
  Eye,
  Bed
} from 'lucide-react';

const facilities = [
  { icon: <Waves size={20} />, text: 'Private beach Area' },
  { icon: <Dumbbell size={20} />, text: 'Fitness Centre' },
  { icon: <Car size={20} />, text: 'Airport shuttle' },
  { icon: <Wifi size={20} />, text: 'Free WiFi' },
  { icon: <Home size={20} />, text: 'Family Room' },
  { icon: <Waves size={20} />, text: 'Outdoor swimming pool' },
  { icon: <Utensils size={20} />, text: '3 restaurants' },
  { icon: <Coffee size={20} />, text: 'Fabulous breakfast' },
  { icon: <ParkingCircle size={20} />, text: 'Free Parking' },
  { icon: <Wine size={20} />, text: 'Bar' }
];

const roomTypes = [
  {
    type: 'Garden View Room',
    beds: '1 extra-large bed',
    guests: 2,
    icons: ['bed', 'wifi']
  },
  {
    type: 'City View Room',
    beds: '1 extra-large bed',
    guests: 2,
    icons: ['bed', 'wifi']
  },
  {
    type: 'Sea View Room',
    beds: '1 extra-large bed and 1 double bed',
    guests: 4,
    icons: ['bed', 'wifi']
  },
  {
    type: 'Balcony Sea View Room',
    beds: '1 extra-large bed and 1 double bed',
    guests: 4,
    icons: ['bed', 'wifi']
  },
  {
    type: 'Junior Suite Sea View',
    beds: '2 extra-large beds',
    guests: 4,
    icons: ['bed', 'wifi']
  },
  {
    type: 'Junior Suite Sea View Balcony',
    beds: '1 extra-large bed and 1 large double bed',
    guests: 4,
    icons: ['bed', 'wifi']
  },
  {
    type: 'Signature Suites',
    beds: '1 extra-large double bed',
    guests: 2,
    icons: ['bed', 'wifi']
  },
  {
    type: 'Royal Suite',
    beds: '1 extra-large bed and 1 extra-large double bed',
    guests: 4,
    icons: ['bed', 'wifi']
  },
  {
    type: 'Family Room',
    beds: '1 large double bed',
    livingRoom: '1 sofa bed',
    guests: 6,
    icons: ['bed', 'wifi']
  }
];

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  facilitiesSection: {
    marginBottom: '3rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem'
  },
  facilitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  facilityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  facilityIcon: {
    color: '#6b7280',
    flexShrink: 0
  },
  facilityText: {
    fontSize: '0.9rem',
    color: '#374151'
  },
  roomsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  tableHeader: {
    backgroundColor: '#00A79D',
    color: 'white'
  },
  tableHeaderCell: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.95rem'
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb'
  },
  tableRowAlt: {
    backgroundColor: '#f8fafc'
  },
  tableCell: {
    padding: '1rem',
    verticalAlign: 'top'
  },
  roomTypeCell: {
    width: '40%'
  },
  roomType: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem',
    fontSize: '0.95rem'
  },
  roomDetails: {
    fontSize: '0.8rem',
    color: '#6b7280',
    lineHeight: '1.4'
  },
  guestsCell: {
    width: '30%',
    textAlign: 'center'
  },
  guestsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  userIcon: {
    color: '#6b7280'
  },
  guestCount: {
    fontSize: '0.9rem',
    color: '#374151'
  },
  actionCell: {
    width: '20%',
    textAlign: 'center'
  },
  viewButton: {
    backgroundColor: '#00A79D',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  viewButtonHover: {
    backgroundColor: '#008B7A',
    transform: 'translateY(-1px)'
  },
  iconsContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  roomIcon: {
    color: '#6b7280'
  },
  mobileContainer: {
    display: 'block'
  },
  mobileCard: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  mobileCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem'
  },
  mobileRoomInfo: {
    flex: 1
  },
  mobileGuestsInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem'
  },
  mobileViewButton: {
    width: '100%',
    backgroundColor: '#00A79D',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

function HotelFacilitiesAndRooms() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [hoveredButton, setHoveredButton] = React.useState(null);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleButtonHover = (index, isHovering) => {
    setHoveredButton(isHovering ? index : null);
  };

  const renderGuestIcons = (count) => {
    const icons = [];
    for (let i = 0; i < Math.min(count, 6); i++) {
      icons.push(
        <Users key={i} size={16} style={styles.userIcon} />
      );
    }
    return icons;
  };

  const renderMobileRooms = () => (
    <div style={styles.mobileContainer}>
      {roomTypes.map((room, index) => (
        <div key={index} style={styles.mobileCard}>
          <div style={styles.mobileCardHeader}>
            <div style={styles.mobileRoomInfo}>
              <div style={styles.roomType}>{room.type}</div>
              <div style={styles.roomDetails}>
                {room.beds}
                {room.livingRoom && (
                  <>
                    <br />Living room: {room.livingRoom}
                  </>
                )}
              </div>
              <div style={styles.iconsContainer}>
                <Bed size={16} style={styles.roomIcon} />
                <Wifi size={16} style={styles.roomIcon} />
              </div>
            </div>
          </div>
          <div style={styles.mobileGuestsInfo}>
            {renderGuestIcons(room.guests)}
            <span style={styles.guestCount}>{room.guests}</span>
          </div>
          <button
            style={{
              ...styles.mobileViewButton,
              ...(hoveredButton === `mobile-${index}` ? styles.viewButtonHover : {})
            }}
            onMouseEnter={() => handleButtonHover(`mobile-${index}`, true)}
            onMouseLeave={() => handleButtonHover(`mobile-${index}`, false)}
          >
            View
          </button>
        </div>
      ))}
    </div>
  );

  const renderDesktopRooms = () => (
    <table style={styles.roomsTable}>
      <thead style={styles.tableHeader}>
        <tr>
          <th style={styles.tableHeaderCell}>Room Type</th>
          <th style={styles.tableHeaderCell}>Number of Guests</th>
          <th style={styles.tableHeaderCell}></th>
        </tr>
      </thead>
      <tbody>
        {roomTypes.map((room, index) => (
          <tr 
            key={index} 
            style={{
              ...styles.tableRow,
              ...(index % 2 === 1 ? styles.tableRowAlt : {})
            }}
          >
            <td style={{...styles.tableCell, ...styles.roomTypeCell}}>
              <div style={styles.roomType}>{room.type}</div>
              <div style={styles.roomDetails}>
                {room.beds}
                {room.livingRoom && (
                  <>
                    <br />Living room: {room.livingRoom}
                  </>
                )}
              </div>
              <div style={styles.iconsContainer}>
                <Bed size={16} style={styles.roomIcon} />
                <Wifi size={16} style={styles.roomIcon} />
              </div>
            </td>
            <td style={{...styles.tableCell, ...styles.guestsCell}}>
              <div style={styles.guestsContainer}>
                {renderGuestIcons(room.guests)}
                <span style={styles.guestCount}>{room.guests}</span>
              </div>
            </td>
            <td style={{...styles.tableCell, ...styles.actionCell}}>
              <button
                style={{
                  ...styles.viewButton,
                  ...(hoveredButton === index ? styles.viewButtonHover : {})
                }}
                onMouseEnter={() => handleButtonHover(index, true)}
                onMouseLeave={() => handleButtonHover(index, false)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div style={styles.container}>
      {/* Most Popular Facilities Section */}
      <div style={styles.facilitiesSection}>
        <h2 style={styles.sectionTitle}>Most popular facilities</h2>
        <div style={styles.facilitiesGrid}>
          {facilities.map((facility, index) => (
            <div key={index} style={styles.facilityItem}>
              <div style={styles.facilityIcon}>
                {facility.icon}
              </div>
              <span style={styles.facilityText}>
                {facility.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Room Types Section */}
      <div>
        {isMobile ? renderMobileRooms() : renderDesktopRooms()}
      </div>
    </div>
  );
}

export default HotelFacilitiesAndRooms;