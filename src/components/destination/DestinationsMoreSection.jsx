import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// Fallback placeholder image when a destination has no photo
const placeholderImg = 'https://via.placeholder.com/800x450?text=Destination';

function DestinationsMoreSection({ nearestTown }) {
  // Determine how many items to show based on screen size
  const getItemsToShow = () => {
    if (window.innerWidth < 640) return 1; // xs
    if (window.innerWidth < 768) return 2; // sm
    if (window.innerWidth < 1024) return 3; // md
    return 4; // lg and above
  };
  
  const [itemsPerView, setItemsPerView] = useState(getItemsToShow());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remoteDestinations, setRemoteDestinations] = useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Normalize remote destination objects to a unified shape used by the cards
  const normalizedRemote = remoteDestinations.map((d) => ({
    id: d.destination_id || d._id || d.id || d.title,
    title: d.title || 'Unknown',
    mini_caption: d.mini_caption || d.nearest_town || '',
    image: (Array.isArray(d.photos) && d.photos[0]) || d.photo || d.image || placeholderImg,
    long_description: d.long_description || d.description || d.summary || d.overview || '',
    best_time_to_visit: d.best_time_to_visit || '',
    how_to_get_there: d.how_to_get_there || '',
    entrance_fees: d.entrance_fees || '',
    opening_hours: d.opening_hours || '',
    things_to_do: d.things_to_do || [],
  }));

  // The active source used for rendering and navigation (backend only)
  const source = normalizedRemote;

  // Helper: return first half of long_description with ellipsis
  const truncateHalf = (text) => {
    if (!text) return '';
    const halfIndex = Math.ceil(text.length / 2);
    const trimmed = text.slice(0, halfIndex).trim();
    return trimmed + ' ......';
  };
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsToShow());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Auto-slide animation
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      if (currentIndex < source.length - itemsPerView) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        scrollToIndex(newIndex);
      } else {
        // Reset to beginning when reaching the end
        setCurrentIndex(0);
        scrollToIndex(0);
      }
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(autoSlideInterval);
  }, [currentIndex, itemsPerView, remoteDestinations.length]);

  // Fetch destinations from backend (nearest town if provided, otherwise all)
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const endpoint = nearestTown && nearestTown.trim() !== ''
          ? `${BASE_URL}/destinations/nearest/${encodeURIComponent(nearestTown)}`
          : `${BASE_URL}/destinations`;
        const res = await fetch(endpoint);
        if (!res.ok) {
          setRemoteDestinations([]);
          return;
        }
        const data = await res.json();
        setRemoteDestinations(Array.isArray(data) ? data : []);
      } catch (e) {
        setRemoteDestinations([]);
      }
    };
    fetchDestinations();
  }, [nearestTown]);
  
  const handleNext = () => {
  const total = source.length;
  const newIndex = Math.min(currentIndex + itemsPerView, Math.max(0, total - itemsPerView));
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };
  
  const handlePrev = () => {
  const newIndex = Math.max(currentIndex - itemsPerView, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };
  
  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const scrollAmount = index * (sliderRef.current.offsetWidth / itemsPerView);
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Reset carousel when remote results arrive or layout changes
  useEffect(() => {
    if (normalizedRemote.length > 0) {
      setCurrentIndex(0);
      if (sliderRef.current) {
        try {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } catch (e) {
          // ignore scroll errors in some browsers during server-side rendering
          sliderRef.current.scrollLeft = 0;
        }
      }
    }
  }, [remoteDestinations.length, itemsPerView]);

  const containerStyles = {
    width: '100%',
    minHeight: '100vh',
    marginTop: '80px'
  };

  const innerContainerStyles = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 24px'
  };

  const headerStyles = {
    textAlign: 'center',
    marginBottom: '40px'
  };

  const titleStyles = {
    color: '#00A79D',
    fontWeight: 'bold',
    fontSize: '48px',
    margin: '48px 0 0 0'
  };

  const subtitleStyles = {
    color: 'black',
    fontWeight: '500',
    fontSize: '32px',
    margin: '0 0 24px 0'
  };

  const dividerStyles = {
    width: '50px',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    margin: '0 auto 24px auto'
  };

  const descriptionStyles = {
    color: '#555',
    maxWidth: '800px',
    margin: '0 auto 56px auto',
    fontSize: '16px',
    lineHeight: '1.6'
  };

  const sliderContainerStyles = {
    position: 'relative'
  };

  const navigationButtonStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.3s ease'
  };

  const prevButtonStyles = {
    ...navigationButtonStyles,
    left: '-25px'
  };

  const nextButtonStyles = {
    ...navigationButtonStyles,
    right: '-25px'
  };

  const sliderStyles = {
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    borderRadius: '8px'
  };

  const getCardContainerStyles = () => ({
    flex: `0 0 ${100 / itemsPerView}%`,
    padding: '0 12px',
    transition: 'all 0.3s ease'
  });

  const cardStyles = {
    position: 'relative',
    height: '600px', // Fixed height for all cards
    borderRadius: '20px',
    overflow: 'hidden',
  boxShadow: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px'
  };

  const cardHeaderStyles = {
    padding: '25px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #008B8B 0%, #20B2AA 100%)',
    minHeight: '120px', // Fixed header height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const cardTitleStyles = {
    fontWeight: 'bold',
    fontSize: '24px',
    color: 'white',
    margin: '0 0 8px 0'
  };

  const cardSubtitleStyles = {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    margin: '0'
  };

  const imageContainerStyles = {
    height: '200px', // Fixed image height
    overflow: 'hidden',
    position: 'relative'
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  };

  const contentStyles = {
    padding: '25px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '280px' // Fixed content area height
  };

  // Very light ash background for the text/content area
  const cardContentBgStyles = {
    backgroundColor: '#f6f8f8', // very light ash
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    padding: '0'
  };

  const descriptionTextStyles = {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '24px',
    textAlign: 'justify',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 6, // Limit to 6 lines
    WebkitBoxOrient: 'vertical'
  };

  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 'auto'
  };

  const arrowButtonStyles = {
    width: '50px',
    height: '50px',
    backgroundColor: '#f5f5f5',
    border: '2px solid #e0e0e0',
    borderRadius: '50%',
    color: '#666',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyles}>
      <div style={innerContainerStyles}>
        <div style={headerStyles}>
          <h2 style={titleStyles}>More</h2>
          <h3 style={subtitleStyles}>destinations</h3>
          
          <div style={dividerStyles} />
          
          <p style={descriptionStyles}>
            Your journey should be as unique as you are. Explore Sri Lanka's breathtaking destinations and find the perfect place to create unforgettable memories.
          </p>
        </div>
        
        <div style={sliderContainerStyles}>
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              style={prevButtonStyles}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
              }}
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          {currentIndex < (source.length - itemsPerView) && (
            <button
              onClick={handleNext}
              style={nextButtonStyles}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
              }}
            >
              <ChevronRight size={24} />
            </button>
          )}
          
          <div ref={sliderRef} style={sliderStyles}>
            {source.map((destination, index) => (
              <div key={`${destination.id || destination.title}-${index}`} style={getCardContainerStyles()}>
          <div 
            style={cardStyles}
            onClick={() => navigate('/destination/details', { state: destination })}
                  onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  {/* Header with Title and Subtitle */}
                  <div style={cardHeaderStyles}>
                    <h3 style={cardTitleStyles}>{destination.title}</h3>
                    <p style={cardSubtitleStyles}>{destination.mini_caption}</p>
                  </div>

                  {/* Image Section */}
                  <div style={imageContainerStyles}>
                    <img
                      src={destination.image}
                      alt={destination.title}
                      style={imageStyles}
                    />
                  </div>

                  {/* Description Section with subtle ash background */}
                  <div style={{ ...cardContentBgStyles }}>
                    <div style={{ ...contentStyles, padding: '20px' }}>
                      <p style={descriptionTextStyles}>
                        {truncateHalf(destination.long_description)}
                      </p>

                      {/* Arrow Button */}
                      <div style={buttonContainerStyles}>
                        <button
                          style={arrowButtonStyles}
                          onClick={() => navigate('/destination/details', { state: destination })}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#008B8B';
                            e.target.style.borderColor = '#008B8B';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#f5f5f5';
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.color = '#666';
                            e.target.style.transform = 'translateX(0)';
                          }}
                        >
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationsMoreSection;