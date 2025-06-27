import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, Clock, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

function DestinationAdditionalDetails({ 
  destinationName = "Sigiriya",
  titleColor = '#00A79D'
}) {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: 'bestTime',
      icon: Calendar,
      title: 'Best Time to Visit',
      content: 'The ideal time to visit Sigiriya is during the dry season, from December to April, when the weather is pleasant for climbing. Early morning or late afternoon visits are recommended to avoid the heat and witness breathtaking sunrise or sunset views.'
    },
    {
      id: 'howToGetThere',
      icon: MapPin,
      title: 'How to Get There',
      content: 'Sigiriya is located about 175 km from Colombo and is accessible via road or train. The nearest town is Dambulla, which has regular bus services. Travelers can hire a private taxi, take a bus, or join guided tours from major cities like Colombo, Kandy, or Anuradhapura.'
    },
    {
      id: 'entranceFees',
      icon: DollarSign,
      title: 'Entrance Fees',
      content: [
        'Foreign Visitors: Around $30 per person',
        'SAARC Visitors: Approximately $15 per person',
        'Sri Lankan Citizens: Lower, with discounts for students and children'
      ]
    },
    {
      id: 'openingHours',
      icon: Clock,
      title: 'Opening Hours',
      content: 'Sigiriya is open daily from 6:30 AM to 5:30 PM. The last ticket is issued around 4:30 PM.'
    },
    {
      id: 'thingsToDo',
      icon: Camera,
      title: 'Things to Do',
      content: [
        'Explore the Sigiriya Frescoes – Stunning ancient paintings of celestial maidens.',
        'Walk Along the Mirror Wall – Features centuries-old inscriptions and poetry.',
        'Visit the Water Gardens and Fountains – Well-planned gardens and fountains still functioning today.',
        'Climb to the Summit – Experience the royal palace ruins and breathtaking 360° views.',
        'Photography & Sightseeing – Capture stunning landscapes, sunrise, and sunset views.'
      ]
    }
  ];

  // Auto-rotate through sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [sections.length]);

  const nextSection = () => {
    setActiveSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setActiveSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const goToSection = (index) => {
    setActiveSection(index);
  };

  // Styles matching AccommodationOptions patterns
  const containerStyle = {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '6px 0'
  };

  const innerContainerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 16px'
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: titleColor,
    marginBottom: '16px'
  };

  const subheadingStyle = {
    textAlign: 'center',
    color: '#666666',
    marginBottom: '48px',
    maxWidth: '700px',
    margin: '0 auto 48px'
  };

  const mainContentStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  const detailsContainerStyle = {
    width: '100%',
    position: 'relative',
    minHeight: '400px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa'
  };

  const contentAreaStyle = {
    padding: '48px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
    alignItems: 'flex-start' // Added to align content to the left
  };

  const sectionTitleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    width: '100%' // Ensure full width
  };

  const iconContainerStyle = {
    backgroundColor: titleColor,
    padding: '12px',
    borderRadius: '50%',
    marginRight: '16px',
    flexShrink: 0 // Prevent icon from shrinking
  };

  const sectionTitleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333333'
  };

  const sectionContentStyle = {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#666666',
    textAlign: 'left', // Ensure left alignment
    width: '100%' // Take full width
  };

  const listStyle = {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#666666',
    paddingLeft: '0',
    listStyle: 'none',
    width: '100%' // Take full width
  };

  const listItemStyle = {
    marginBottom: '12px',
    paddingLeft: '24px',
    position: 'relative',
    textAlign: 'left' // Ensure left alignment
  };

  const listItemBulletStyle = {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '8px',
    height: '8px',
    backgroundColor: titleColor,
    borderRadius: '50%',
    marginTop: '8px'
  };

  const optionsContainerStyle = {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const optionsHeaderStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#333333'
  };

  const optionsListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const getOptionButtonStyle = (isActive) => ({
    width: '100%',
    textAlign: 'left',
    padding: '16px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s',
    backgroundColor: isActive ? titleColor : '#ffffff',
    color: isActive ? 'white' : '#333333',
    boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
    border: 'none',
    cursor: 'pointer'
  });

  const getOptionIconStyle = (isActive) => ({
    padding: '8px',
    borderRadius: '50%',
    marginRight: '12px',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : `rgba(${parseInt(titleColor.slice(1, 3), 16)}, ${parseInt(titleColor.slice(3, 5), 16)}, ${parseInt(titleColor.slice(5, 7), 16)}, 0.1)`
  });

  const navButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    padding: '8px',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 30,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const prevButtonStyle = {
    ...navButtonStyle,
    left: '-16px'
  };
  
  const nextButtonStyle = {
    ...navButtonStyle,
    right: '-16px'
  };

  const indicatorsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px'
  };

  const getIndicatorStyle = (isActive) => ({
    margin: '0 4px',
    width: '48px',
    height: '12px',
    borderRadius: '6px',
    backgroundColor: isActive ? titleColor : '#e2e2e2',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  });

  // Media query styles handled in useEffect
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop styles
        const mainContent = document.getElementById('detailsMainContent');
        const detailsContainer = document.getElementById('detailsContainer');
        const optionsContainer = document.getElementById('detailsOptionsContainer');
        
        if (mainContent && detailsContainer && optionsContainer) {
          mainContent.style.flexDirection = 'row';
          detailsContainer.style.width = '60%';
          optionsContainer.style.width = '40%';
        }
      } else {
        // Mobile styles
        const mainContent = document.getElementById('detailsMainContent');
        const detailsContainer = document.getElementById('detailsContainer');
        const optionsContainer = document.getElementById('detailsOptionsContainer');
        
        if (mainContent && detailsContainer && optionsContainer) {
          mainContent.style.flexDirection = 'column';
          detailsContainer.style.width = '100%';
          optionsContainer.style.width = '100%';
        }
      }
    };

    // Initial call
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return (
        <ul style={listStyle}>
          {content.map((item, index) => (
            <li key={index} style={listItemStyle}>
              <div style={listItemBulletStyle}></div>
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return <p style={sectionContentStyle}>{content}</p>;
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h1 style={headingStyle}>
          Additional Important Details
        </h1>
        <p style={subheadingStyle}>
          Everything you need to know to make the most of your visit to {destinationName}
        </p>

        <div style={{ position: 'relative' }}>
          {/* Main content area */}
          <div id="detailsMainContent" style={mainContentStyle}>
            {/* Left side - Details display */}
            <div id="detailsContainer" style={detailsContainerStyle}>
              <div style={contentAreaStyle}>
                <div style={sectionTitleContainerStyle}>
                  <div style={iconContainerStyle}>
                    {React.createElement(sections[activeSection].icon, {
                      style: { width: '24px', height: '24px', color: 'white' }
                    })}
                  </div>
                  <h2 style={sectionTitleStyle}>{sections[activeSection].title}</h2>
                </div>
                {renderContent(sections[activeSection].content)}
              </div>
            </div>

            {/* Right side - Options */}
            <div id="detailsOptionsContainer" style={optionsContainerStyle}>
              <h3 style={optionsHeaderStyle}>Explore Details</h3>
              <div style={optionsListStyle}>
                {sections.map((section, idx) => (
                  <button
                    key={section.id}
                    onClick={() => goToSection(idx)}
                    style={getOptionButtonStyle(idx === activeSection)}
                  >
                    <div style={getOptionIconStyle(idx === activeSection)}>
                      {React.createElement(section.icon, {
                        style: { width: '24px', height: '24px' }
                      })}
                    </div>
                    <span style={{ fontWeight: '500' }}>{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button 
            onClick={prevSection}
            style={prevButtonStyle}
            aria-label="Previous section"
          >
            <ChevronLeft style={{ width: '24px', height: '24px', color: titleColor }} />
          </button>
          <button 
            onClick={nextSection}
            style={nextButtonStyle}
            aria-label="Next section"
          >
            <ChevronRight style={{ width: '24px', height: '24px', color: titleColor }} />
          </button>
        </div>

        {/* Indicator dots */}
        <div style={indicatorsContainerStyle}>
          {sections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSection(idx)}
              style={getIndicatorStyle(idx === activeSection)}
              aria-label={`Go to ${sections[idx].title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DestinationAdditionalDetails;