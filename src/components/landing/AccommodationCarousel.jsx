import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Map, Hotel, Home, Palmtree, Utensils } from 'lucide-react';
import Restaurants from '../assets/kandy.png';
import Resorts from '../assets/kandy.png';
import Apartments from '../assets/kandy.png';
import Hotels from '../assets/kandy.png';

const AccommodationOptions = () => {
  const [activeOption, setActiveOption] = useState(0);
  
  const options = [
    {
      title: "Hotels",
      description: "Discover luxurious hotels with world-class amenities and service across Sri Lanka.",
      image: Hotels,
      icon: <Hotel style={{ width: '24px', height: '24px' }} />
    },
    {
      title: "Apartments",
      description: "Feel at home with spacious apartments perfect for extended stays and families.",
      image: Apartments,
      icon: <Home style={{ width: '24px', height: '24px' }} />
    },
    {
      title: "Resorts",
      description: "Unwind at breathtaking beachfront and hillside resorts with panoramic views.",
      image: Resorts,
      icon: <Palmtree style={{ width: '24px', height: '24px' }} />
    },
    {
      title: "Restaurants",
      description: "Savor authentic Sri Lankan cuisine and international delights at top-rated restaurants.",
      image: Restaurants,
      icon: <Utensils style={{ width: '24px', height: '24px' }} />
    }
  ];

  // Auto-rotate through options
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOption((prev) => (prev + 1) % options.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [options.length]);

  const nextOption = () => {
    setActiveOption((prev) => (prev + 1) % options.length);
  };

  const prevOption = () => {
    setActiveOption((prev) => (prev - 1 + options.length) % options.length);
  };

  const goToOption = (index) => {
    setActiveOption(index);
  };

  const containerStyle = {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '64px 0'
  };

  const innerContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px'
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00A79D',
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

  const imageContainerStyle = {
    width: '100%',
    position: 'relative',
    height: '384px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  };

  const gradientOverlayStyle = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
    zIndex: 10
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const contentOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    zIndex: 20,
    color: 'white'
  };

  const titleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
  };

  const iconContainerStyle = {
    backgroundColor: '#00A79D',
    padding: '8px',
    borderRadius: '50%',
    marginRight: '12px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold'
  };

  const descriptionStyle = {
    fontSize: '18px'
  };

  const buttonStyle = {
    marginTop: '16px',
    backgroundColor: '#00A79D',
    color: 'white',
    padding: '8px 24px',
    borderRadius: '50px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontWeight: '500'
  };

  const buttonHoverStyle = {
    backgroundColor: '#008C82'
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
    backgroundColor: isActive ? '#00A79D' : '#ffffff',
    color: isActive ? 'white' : '#333333',
    boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
    border: 'none',
    cursor: 'pointer'
  });

  const getOptionIconStyle = (isActive) => ({
    padding: '8px',
    borderRadius: '50%',
    marginRight: '12px',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 167, 157, 0.1)'
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
    backgroundColor: isActive ? '#00A79D' : '#e2e2e2',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  });

  // Media query styles handled in useEffect
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop styles
        document.getElementById('mainContent').style.flexDirection = 'row';
        document.getElementById('imageContainer').style.width = '60%';
        document.getElementById('optionsContainer').style.width = '40%';
      } else {
        // Mobile styles
        document.getElementById('mainContent').style.flexDirection = 'column';
        document.getElementById('imageContainer').style.width = '100%';
        document.getElementById('optionsContainer').style.width = '100%';
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

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h1 style={headingStyle}>Find Your Perfect Stay in Sri Lanka</h1>
        <p style={subheadingStyle}>
          Explore our handpicked collection of accommodations and dining options to enhance your Sri Lankan experience.
        </p>

        <div style={{ position: 'relative' }}>
          {/* Main content area */}
          <div id="mainContent" style={mainContentStyle}>
            {/* Left side - Large image */}
            <div id="imageContainer" style={imageContainerStyle}>
              <div style={gradientOverlayStyle}></div>
              <img 
                src={options[activeOption].image} 
                alt={options[activeOption].title}
                style={imageStyle}
              />
              <div style={contentOverlayStyle}>
                <div style={titleContainerStyle}>
                  <div style={iconContainerStyle}>
                    {options[activeOption].icon}
                  </div>
                  <h2 style={titleStyle}>{options[activeOption].title}</h2>
                </div>
                <p style={descriptionStyle}>{options[activeOption].description}</p>
                <button 
                  style={buttonStyle}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                  }}
                >
                  Explore {options[activeOption].title}
                  <Map style={{ marginLeft: '8px', width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>

            {/* Right side - Options */}
            <div id="optionsContainer" style={optionsContainerStyle}>
              <h3 style={optionsHeaderStyle}>Explore Options</h3>
              <div style={optionsListStyle}>
                {options.map((option, idx) => (
                  <button
                    key={option.title}
                    onClick={() => goToOption(idx)}
                    style={getOptionButtonStyle(idx === activeOption)}
                  >
                    <div style={getOptionIconStyle(idx === activeOption)}>
                      {option.icon}
                    </div>
                    <span style={{ fontWeight: '500' }}>{option.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button 
            onClick={prevOption}
            style={prevButtonStyle}
            aria-label="Previous option"
          >
            <ChevronLeft style={{ width: '24px', height: '24px', color: '#00A79D' }} />
          </button>
          <button 
            onClick={nextOption}
            style={nextButtonStyle}
            aria-label="Next option"
          >
            <ChevronRight style={{ width: '24px', height: '24px', color: '#00A79D' }} />
          </button>
        </div>

        {/* Indicator dots */}
        <div style={indicatorsContainerStyle}>
          {options.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToOption(idx)}
              style={getIndicatorStyle(idx === activeOption)}
              aria-label={`Go to ${options[idx].title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccommodationOptions;