import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, Clock, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

function DestinationAdditionalDetails({ 
  destinationName = "",
  titleColor = '#00A79D',
  best_time_to_visit,
  how_to_get_there,
  entrance_fees,
  opening_hours,
  things_to_do,
  uiLabels = null
}) {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: 'bestTime',
      icon: Calendar,
  title: uiLabels?.sectionTitles?.bestTime || 'Best Time to Visit',
      content: best_time_to_visit || 'Not available'
    },
    {
      id: 'howToGetThere',
      icon: MapPin,
  title: uiLabels?.sectionTitles?.howToGetThere || 'How to Get There',
      content: how_to_get_there || 'Not available'
    },
    {
      id: 'entranceFees',
      icon: DollarSign,
  title: uiLabels?.sectionTitles?.entranceFees || 'Entrance Fees',
      content: entrance_fees || ['Not available']
    },
    {
      id: 'openingHours',
      icon: Clock,
  title: uiLabels?.sectionTitles?.openingHours || 'Opening Hours',
      content: opening_hours || 'Not available'
    },
    {
      id: 'thingsToDo',
      icon: Camera,
  title: uiLabels?.sectionTitles?.thingsToDo || 'Things to Do',
      content: things_to_do || ['Not available']
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

  const renderContent = (content, sectionId) => {
    const renderListItems = (items) => (
      <ul style={listStyle}>
        {items.map((item, index) => (
          <li key={index} style={{ ...listItemStyle, display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ marginRight: '12px', lineHeight: '1.6', fontSize: '18px' }}>•</span>
            <div style={{ flex: 1 }}>{item}</div>
          </li>
        ))}
      </ul>
    );

    if (Array.isArray(content)) {
      return renderListItems(content);
    }

    if (typeof content === 'string') {
      // For the 'thingsToDo' section only, split into list items.
      if (sectionId === 'thingsToDo') {
        // Prefer explicit bullet separators
        const partsByBullet = content.split('•').map(p => p.trim()).filter(p => p.length);
        if (partsByBullet.length > 1) return renderListItems(partsByBullet);

        // Then try newlines
        const partsByNewline = content.split(/\r?\n/).map(p => p.trim()).filter(p => p.length);
        if (partsByNewline.length > 1) return renderListItems(partsByNewline);

        // Finally split by sentences using periods for Things to Do
        const sentences = content.split(/\s*\.(?:\s+|$)/).map(s => s.trim()).filter(s => s.length);
        if (sentences.length > 1) return renderListItems(sentences);

        // Single item
        return <p style={sectionContentStyle}>{content}</p>;
      }

      // For all other sections, render the full string as a paragraph (don't split on periods)
      return <p style={sectionContentStyle}>{content}</p>;
    }

    return <p style={sectionContentStyle}>{String(content)}</p>;
  };

  const headerTitle = uiLabels?.headerTitle || 'Additional Important Details';
  const exploreHeader = uiLabels?.exploreHeader || 'Explore Details';
  const subheadingText = uiLabels?.subheadingText || `Everything you need to know to make the most of your visit to ${destinationName || 'this destination'}`;

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h1 style={headingStyle}>{headerTitle}</h1>
        <p style={subheadingStyle}>{subheadingText}</p>

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
                {renderContent(sections[activeSection].content, sections[activeSection].id)}
              </div>
            </div>

            {/* Right side - Options */}
            <div id="detailsOptionsContainer" style={optionsContainerStyle}>
              <h3 style={optionsHeaderStyle}>{exploreHeader}</h3>
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