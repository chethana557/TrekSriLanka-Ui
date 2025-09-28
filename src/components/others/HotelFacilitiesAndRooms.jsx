import React from 'react';
import { useNavigate } from 'react-router-dom';
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

// Icon map based on common facility names (normalized to lower-case tokens)
const iconMap = {
  wifi: <Wifi size={18} style={{ color: '#0d9488' }} />,
  'free wifi': <Wifi size={18} style={{ color: '#0d9488' }} />,
  restaurant: <Utensils size={18} style={{ color: '#0d9488' }} />,
  dining: <Utensils size={18} style={{ color: '#0d9488' }} />,
  breakfast: <Coffee size={18} style={{ color: '#0d9488' }} />,
  bar: <Wine size={18} style={{ color: '#0d9488' }} />,
  pool: <Waves size={18} style={{ color: '#0d9488' }} />,
  gym: <Dumbbell size={18} style={{ color: '#0d9488' }} />,
  fitness: <Dumbbell size={18} style={{ color: '#0d9488' }} />,
  parking: <ParkingCircle size={18} style={{ color: '#0d9488' }} />,
  car: <Car size={18} style={{ color: '#0d9488' }} />,
  spa: <Home size={18} style={{ color: '#0d9488' }} />,
  family: <Home size={18} style={{ color: '#0d9488' }} />,
  view: <Eye size={18} style={{ color: '#0d9488' }} />,
  room: <Bed size={18} style={{ color: '#0d9488' }} />,
  bed: <Bed size={18} style={{ color: '#0d9488' }} />
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  reserveCtaWrapper: {
    marginTop: '2rem',
    textAlign: 'right'
  },
  reserveButton: {
    backgroundColor: '#00A79D',
    color: 'white',
    border: 'none',
    padding: '0.9rem 2.5rem',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,167,157,0.25)',
    transition: 'all .25s ease'
  },
  reserveButtonHover: {
    backgroundColor: '#008B7A',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 14px rgba(0,167,157,0.35)'
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
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginBottom: '2rem'
  },
  facilityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.85rem',
    background: 'linear-gradient(135deg,#f0fdfa,#ecfeff)',
    borderRadius: '30px',
    border: '1px solid #ccfbf1',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    fontSize: '0.8rem',
    lineHeight: 1.2
  },
  facilityIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    border: '1px solid #d1fae5'
  },
  facilityText: {
    fontSize: '0.8rem',
    color: '#065f46',
    fontWeight: 500,
    whiteSpace: 'nowrap'
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

function HotelFacilitiesAndRooms({ hotelId, facilities = [], rooms = [] }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [hoveredButton, setHoveredButton] = React.useState(null);
  const [reserveHover, setReserveHover] = React.useState(false);
  const navigate = useNavigate();

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
      {rooms.map((room, index) => (
        <div key={index} style={styles.mobileCard}>
          <div style={styles.mobileCardHeader}>
            <div style={styles.mobileRoomInfo}>
              <div style={styles.roomType}>{room.room_name || room.type}</div>
              <div style={styles.roomDetails}>
                {room.bed_count ? `${room.bed_count} beds` : room.beds}
                {room.livingRoom && (
                  <>
                    <br />Living room: {room.livingRoom}
                  </>
                )}
              </div>
              <div style={styles.iconsContainer}>
                {iconMap.bed}
                {iconMap.wifi}
              </div>
            </div>
          </div>
          <div style={styles.mobileGuestsInfo}>
            {renderGuestIcons(room.guest_count || room.guests)}
            <span style={styles.guestCount}>{room.guest_count || room.guests}</span>
          </div>
          <button
            style={{
              ...styles.mobileViewButton,
              ...(hoveredButton === `mobile-${index}` ? styles.viewButtonHover : {})
            }}
            onMouseEnter={() => handleButtonHover(`mobile-${index}`, true)}
            onMouseLeave={() => handleButtonHover(`mobile-${index}`, false)}
            onClick={() => navigate(`/hotels/${hotelId}/rooms/${index}`)}
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
        {rooms.map((room, index) => (
          <tr 
            key={index} 
            style={{
              ...styles.tableRow,
              ...(index % 2 === 1 ? styles.tableRowAlt : {})
            }}
          >
            <td style={{...styles.tableCell, ...styles.roomTypeCell}}>
              <div style={styles.roomType}>{room.room_name || room.type}</div>
              <div style={styles.roomDetails}>
                {room.bed_count ? `${room.bed_count} beds` : room.beds}
                {room.livingRoom && (
                  <>
                    <br />Living room: {room.livingRoom}
                  </>
                )}
              </div>
              <div style={styles.iconsContainer}>
                {iconMap.bed}
                {iconMap.wifi}
              </div>
            </td>
            <td style={{...styles.tableCell, ...styles.guestsCell}}>
              <div style={styles.guestsContainer}>
                {renderGuestIcons(room.guest_count || room.guests)}
                <span style={styles.guestCount}>{room.guest_count || room.guests}</span>
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
                onClick={() => navigate(`/hotels/${hotelId}/rooms/${index}`)}
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
          {facilities.map((facility, index) => {
            const rawName = facility?.name || facility?.text || facility?.title || '';
            const normalized = rawName.toString().trim().toLowerCase();
            const mappedIcon = iconMap[normalized];
            // facility.icon could be an emoji string; show it if present and no mapped lucide icon
            const providedIcon = typeof facility?.icon === 'string' ? facility.icon : facility.icon; // if it's already a React node keep it
            const finalIcon = mappedIcon || providedIcon || iconMap['room'];
            return (
              <div key={index} style={styles.facilityItem} title={rawName}>
                <div style={styles.facilityIcon}>
                  {finalIcon}
                </div>
                <span style={styles.facilityText}>
                  {rawName || 'Facility'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Types Section */}
      <div>
        {isMobile ? renderMobileRooms() : renderDesktopRooms()}
        <div style={styles.reserveCtaWrapper}>
          <button
            style={{
              ...styles.reserveButton,
              ...(reserveHover ? styles.reserveButtonHover : {})
            }}
            onMouseEnter={() => setReserveHover(true)}
            onMouseLeave={() => setReserveHover(false)}
            onClick={() => navigate(`/hotels/${hotelId}/booking`, { state: { hotelId } })}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelFacilitiesAndRooms;