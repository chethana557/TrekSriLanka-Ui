import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const accommodations = [
  {
    name: 'Grand Beach Resort',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Mountain View Lodge',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'City Center Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Heritage Manor',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Eco Tree House',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Luxury Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Safari Camp',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Boutique Inn',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Hilltop Resort',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Riverside Retreat',
    image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Wellness Spa Resort',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Garden Pavilion',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Penthouse Suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Jungle Hideaway',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Coastal Cottage',
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Royal Palace Hotel',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
];

function BookingMoreDestinationsSection() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  
  // Determine how many items to show based on screen size
  const getItemsToShow = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 5; // Changed from 4 to 5 for larger screens
  };
  
  const itemsPerView = getItemsToShow();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  
  // Auto-slide animation
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      if (currentIndex < accommodations.length - itemsPerView) {
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
    const newIndex = Math.min(currentIndex + itemsPerView, accommodations.length - itemsPerView);
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

  return (
    <Box sx={{ width: '100%', py: 6, bgcolor: 'white' }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              color: '#00A79D', 
              fontWeight: 'bold',
              mt: 6
            }}
          >
            More
          </Typography>
          <Typography 
            variant="h4" 
            component="h3" 
            sx={{ 
              color: 'black', 
              fontWeight: 'medium',
              mb: 3
            }}
          >
            accommodations
          </Typography>
          
          <Box 
            component="div" 
            sx={{
              width: '50px',
              height: '8px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              mx: 'auto',
              mb: 3
            }}
          />
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555',
              maxWidth: '800px',
              mx: 'auto',
              mb: 7 // Increased from 3 to 6 to add more space after text
            }}
          >
            Experience comfort and luxury at its finest. Discover our extensive collection of premium accommodations across Sri Lanka, each offering unique amenities and exceptional service.
          </Typography>
        </Box>
        
        <Box sx={{ position: 'relative' }}>
          {currentIndex > 0 && (
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: { xs: '-15px', md: '-25px' },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                zIndex: 10,
                '&:hover': {
                  bgcolor: 'white',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          
          {currentIndex < accommodations.length - itemsPerView && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: { xs: '-15px', md: '-25px' },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                zIndex: 10,
                '&:hover': {
                  bgcolor: 'white',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          )}
          
          <Box
            ref={sliderRef}
            sx={{
              display: 'flex',
              overflow: 'hidden',
              scrollBehavior: 'smooth',
              mx: 'auto',
              width: '100%',
              borderRadius: '8px',
              position: 'relative',
            }}
          >
            {accommodations.map((accommodation, index) => (
              <Box
                key={`${accommodation.name}-${index}`}
                sx={{
                  flex: {
                    xs: '0 0 100%',
                    sm: '0 0 50%',
                    md: '0 0 33.333%',
                    lg: `0 0 ${100 / itemsPerView}%`
                  },
                  px: 1.5, // Increased padding for more space between cards
                  transition: 'all 0.3s ease'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'relative',
                    height: { xs: 350, sm: 370, md: 400, lg: 450 }, // Maintained card heights
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                    '&:hover': {
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      transform: 'translateY(-5px)'
                    },
                    mb: 2
                  }}
                >
                  <Box
                    component="img"
                    src={accommodation.image}
                    alt={accommodation.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                      padding: '30px 20px 15px',
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } // Maintained font size
                      }}
                    >
                      {accommodation.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BookingMoreDestinationsSection;