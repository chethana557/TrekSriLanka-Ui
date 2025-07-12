import React from 'react';

// Dashboard statistics data with suitable icons
const statsData = [
  {
    id: 1,
    value: '20',
    label: 'Seasonal Offers',
    color: '#00BCD4',
    bgColor: '#ffffff',
    icon: '🎯' // Target/offer icon
  },
  {
    id: 2,
    value: '45',
    label: 'Tour Packages',
    color: '#00A79D',
    bgColor: '#ffffff',
    icon: '🎒' // Backpack/travel icon
  },
  {
    id: 3,
    value: '205',
    label: 'Tour Bookings',
    color: '#9C27B0',
    bgColor: '#ffffff',
    icon: '📅' // Calendar/booking icon
  },
  {
    id: 4,
    value: '170',
    label: 'Hotel Bookings',
    color: '#2196F3',
    bgColor: '#ffffff',
    icon: '🏨' // Hotel icon
  },
  {
    id: 5,
    value: '33',
    label: 'Active Hotels',
    color: '#00A79D',
    bgColor: '#ffffff',
    icon: '🏢' // Building/active icon
  }
];

// CSS styles as a JavaScript object
const styles = {
  container: {
    width: '100%',
    padding: '3rem 1rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  innerContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'left',
    marginBottom: '2rem'
  },
  headerTitle: {
    color: '#333',
    fontWeight: '500',
    fontSize: '1.3rem',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '1.1rem'
    }
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  statCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '1.5rem',
    minHeight: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: 'none'
  },
  statCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
  },
  leftBorder: {
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    width: '4px'
  },
  iconContainer: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    fontSize: '1.5rem'
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '2rem',
    lineHeight: '1',
    marginBottom: '0.5rem'
  },
  label: {
    color: '#666',
    fontSize: '0.9rem',
    fontWeight: '500',
    lineHeight: '1.2'
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem'
  },
  footerText: {
    color: '#888',
    fontSize: '0.875rem'
  }
};

function DashboardStatsSection() {
  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {/* Header Section */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>
            Welcome back! Here's what's happening with your business.
          </h2>
        </div>
        
        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {statsData.map((stat) => (
            <div 
              key={stat.id}
              style={{
                ...styles.statCard,
                ...(hoveredCard === stat.id ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard(stat.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Colored left border accent */}
              <div
                style={{
                  ...styles.leftBorder,
                  background: stat.color
                }}
              />
              
              {/* Icon container */}
              <div
                style={{
                  ...styles.iconContainer,
                  background: stat.bgColor
                }}
              >
                <span>{stat.icon}</span>
              </div>
              
              {/* Value */}
              <div style={styles.value}>
                {stat.value}
              </div>
              
              {/* Label */}
              <div style={styles.label}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerText}>
            Last updated: {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatsSection;