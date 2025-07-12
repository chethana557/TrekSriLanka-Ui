import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import anuradhapura from '../../assets/common/anuradhapura.png';
import arugamBay from '../../assets/common/arugamBay.png';
import dambulla from '../../assets/common/dambulla.png';
import haputale from '../../assets/common/haputale.png';
import hortonPlains from '../../assets/common/hortonPlains.png';
import kalpitiya from '../../assets/common/kalpitiya.png';
import kitulgala from '../../assets/common/kitulgala.png';
import knuckles from '../../assets/common/knuckles.png';
import nuwaraEliya from '../../assets/common/nuwaraEliya.png';
import pinnawala from '../../assets/common/pinnawala.png';
import polonnaruwa from '../../assets/common/polonnaruwa.png';
import ritigala from '../../assets/common/ritigala.png';
import sinharaja from '../../assets/common/sinharaja.png';
import tangalle from '../../assets/common/tangalle.png';
import trincomalee from '../../assets/common/trincomalee.png';
import udawalawe from '../../assets/common/udawalawe.png';
import unawatuna from '../../assets/common/unawatuna.png';
import wilpattu from '../../assets/common/wilpattu.png';
import yala from '../../assets/common/yala.png';


const destinations = [
  {
    name: 'Anuradhapura',
    image: anuradhapura,
  },
  {
    name: 'Arugam Bay',
    image: arugamBay,
  },
  {
    name: 'Dambulla',
    image: dambulla,
  },
  {
    name: 'Haputale',
    image: haputale,
  },
  {
    name: 'Horton Plains',
    image: hortonPlains,
  },
  {
    name: 'Kalpitiya',
    image: kalpitiya,
  },
  {
    name: 'Kitulgala',
    image: kitulgala,
  },
  {
    name: 'Knuckles Range',
    image: knuckles,
  },
  {
    name: 'Nuwara Eliya',
    image: nuwaraEliya,
  },
  {
    name: 'Pinnawala',
    image: pinnawala,
  },
  {
    name: 'Polonnaruwa',
    image: polonnaruwa,
  },
  {
    name: 'Ritigala',
    image: ritigala,
  },
  {
    name: 'Sinharaja Forest',
    image: sinharaja,
  },
  {
    name: 'Tangalle',
    image: tangalle,
  },
  {
    name: 'Trincomalee',
    image: trincomalee,
  },
  {
    name: 'Udawalawe',
    image: udawalawe,
  },
  {
    name: 'Unawatuna',
    image: unawatuna,
  },
  {
    name: 'Wilpattu',
    image: wilpattu,
  },
  {
    name: 'Yala',
    image: yala,
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