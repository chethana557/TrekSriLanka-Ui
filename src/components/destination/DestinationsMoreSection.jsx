import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// Mock images - replace with your actual images
const sigiriyaImg = 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=250&fit=crop';
const ellaImg = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop';
const mirissaImg = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=250&fit=crop';
const kandyImg = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop';

// Updated destinations with more detailed information matching the card style
const destinations = [
  {
    name: 'Pidurangala Rock',
    subtitle: 'A Scenic Hike',
    image: sigiriyaImg,
    description: 'Located near Sigiriya, Pidurangala Rock offers a stunning panoramic view of Sigiriya Rock and the surrounding forests. The hike is slightly challenging but rewarding, especially during sunrise or sunset. Along the way, visitors pass an ancient Buddhist temple and large reclining Buddha statue.'
  },
  {
    name: 'Dambulla Cave Temple',
    subtitle: 'A Sacred Marvel',
    image: ellaImg,
    description: 'A UNESCO World Heritage Site, Dambulla Cave Temple features five ancient caves filled with beautiful Buddha statues and intricate murals, making it one of Sri Lanka\'s most significant religious sites. The temple complex dates back over 2,000 years and is still an active place of worship.'
  },
  {
    name: 'Minneriya National Park',
    subtitle: 'A Wildlife Paradise',
    image: mirissaImg,
    description: 'Famous for its large elephant gatherings, Minneriya National Park offers exciting jeep safaris where visitors can witness elephants, deer, and diverse bird species in their natural habitat. The park\'s main attraction is "The Gathering," where hundreds of elephants congregate near the Minneriya reservoir during the dry season.'
  },
  {
    name: 'Hiriwadunna Village Tour',
    subtitle: 'A Taste of Rural Life',
    image: kandyImg,
    description: 'This immersive experience allows visitors to explore a traditional Sri Lankan village, enjoy bullock cart rides, take a scenic boat ride, and participate in authentic local cooking demonstrations. It provides a glimpse into the simple yet rich lifestyle of rural communities.'
  },
  {
    name: 'Anuradhapura',
    subtitle: 'Ancient Capital',
    image: ellaImg,
    description: 'One of the ancient capitals of Sri Lanka, Anuradhapura is home to well-preserved ruins of an ancient Sinhala civilization. The sacred city is renowned for its stupas, monasteries, and the sacred Bodhi tree, making it a significant pilgrimage site for Buddhists worldwide.'
  },
  {
    name: 'Jaffna',
    subtitle: 'Cultural Heritage',
    image: mirissaImg,
    description: 'The cultural capital of the Northern Province, Jaffna offers a unique blend of Tamil culture, colonial architecture, and pristine beaches. Visit ancient temples, taste authentic Jaffna cuisine, and explore the rich history of this resilient city.'
  },
  {
    name: 'Yala National Park',
    subtitle: 'Wildlife Adventure',
    image: kandyImg,
    description: 'Sri Lanka\'s most visited national park, Yala is famous for having the highest density of leopards in the world. The park also hosts elephants, sloth bears, crocodiles, and over 215 bird species across its diverse ecosystems of grasslands, forests, and lagoons.'
  }
];

function DestinationsMoreSection() {
  // Determine how many items to show based on screen size
  const getItemsToShow = () => {
    if (window.innerWidth < 640) return 1; // xs
    if (window.innerWidth < 768) return 2; // sm
    if (window.innerWidth < 1024) return 3; // md
    return 4; // lg and above
  };
  
  const [itemsPerView, setItemsPerView] = useState(getItemsToShow());
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  
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
      if (currentIndex < destinations.length - itemsPerView) {
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
  }, [currentIndex, itemsPerView]);
  
  const handleNext = () => {
    const newIndex = Math.min(currentIndex + itemsPerView, destinations.length - itemsPerView);
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
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
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
          
          {currentIndex < destinations.length - itemsPerView && (
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
            {destinations.map((destination, index) => (
              <div key={`${destination.name}-${index}`} style={getCardContainerStyles()}>
                <div 
                  style={cardStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  {/* Header with Title and Subtitle */}
                  <div style={cardHeaderStyles}>
                    <h3 style={cardTitleStyles}>{destination.name}</h3>
                    <p style={cardSubtitleStyles}>{destination.subtitle}</p>
                  </div>

                  {/* Image Section */}
                  <div style={imageContainerStyles}>
                    <img
                      src={destination.image}
                      alt={destination.name}
                      style={imageStyles}
                    />
                  </div>

                  {/* Description Section */}
                  <div style={contentStyles}>
                    <p style={descriptionTextStyles}>
                      {destination.description}
                    </p>

                    {/* Arrow Button */}
                    <div style={buttonContainerStyles}>
                      <button
                        style={arrowButtonStyles}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationsMoreSection;