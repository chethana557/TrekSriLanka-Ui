import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import sigiriyaImg from '../assets/sigiriya.png';
import ellaImg from '../assets/ella.png';
import mirissaImg from '../assets/mirissa.png';
import kandyImg from '../assets/kandy.png';

// In a real project, you would import actual images
// These are placeholders for the example
const destinations = [
  {
    name: 'Jaffna',
    image: sigiriyaImg, // Replace with actual import
  },
  {
    name: 'Anuradhapura',
    image: ellaImg, // Replace with actual import
  },
  {
    name: 'Jaffna',
    image: mirissaImg, // Replace with actual import
  },
  {
    name: 'Yala',
    image: kandyImg, // Replace with actual import
  },
  {
    name: 'Anuradhapura',
    image: ellaImg, // Replace with actual import
  },
  {
    name: 'Jaffna',
    image: mirissaImg, // Replace with actual import
  },
  {
    name: 'Yala',
    image: kandyImg, // Replace with actual import
  },
  {
    name: 'Anuradhapura',
    image: ellaImg, // Replace with actual import
  },
  {
    name: 'Jaffna',
    image: mirissaImg, // Replace with actual import
  },
  {
    name: 'Yala',
    image: kandyImg, // Replace with actual import
  },
  
  {
    name: 'Anuradhapura',
    image: ellaImg, // Replace with actual import
  },
  {
    name: 'Jaffna',
    image: mirissaImg, // Replace with actual import
  },
  {
    name: 'Yala',
    image: kandyImg, // Replace with actual import
  },
  {
    name: 'Anuradhapura',
    image: ellaImg, // Replace with actual import
  },
  {
    name: 'Jaffna',
    image: mirissaImg, // Replace with actual import
  },
  {
    name: 'Yala',
    image: kandyImg, // Replace with actual import
  },
  {
    name: 'Anuradhapura',
    image: ellaImg, // Replace with actual import
  },
  {
    name: 'Jaffna',
    image: mirissaImg, // Replace with actual import
  },
  {
    name: 'Yala',
    image: kandyImg, // Replace with actual import
  },
];

function MoreDestinationsSection() {
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
            destinations
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
            Your journey should be as unique as you are. Explore Sri Lanka's breathtaking destinations and find the perfect place to create unforgettable memories.
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
          
          {currentIndex < destinations.length - itemsPerView && (
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
            {destinations.map((destination, index) => (
              <Box
                key={`${destination.name}-${index}`}
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
                    src={destination.image}
                    alt={destination.name}
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
                      {destination.name}
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

export default MoreDestinationsSection;