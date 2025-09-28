import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { BASE_URL } from '../../api';

// Fallback placeholder image (simple SVG data URI) if a hotel has no image
const PLACEHOLDER_IMG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%2300A79D"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="48" fill="white" font-family="Arial">No Image</text></svg>';

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
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/hotels/top/popular`);
        if (!res.ok) throw new Error(`Failed ${res.status}`);
        const data = await res.json();
        if (mounted) setAccommodations(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);
  
  // Auto-slide animation
  useEffect(() => {
    if (loading || error || accommodations.length === 0) return; // don't slide if no data
    const autoSlideInterval = setInterval(() => {
      if (currentIndex < accommodations.length - itemsPerView) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        scrollToIndex(newIndex);
      } else {
        setCurrentIndex(0);
        scrollToIndex(0);
      }
    }, 5000);
    
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
          
          {currentIndex < accommodations.length - itemsPerView && accommodations.length > 0 && (
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
            {loading && (
              <Box sx={{ width: '100%', textAlign: 'center', py: 6 }}>
                <Typography>Loading accommodations...</Typography>
              </Box>
            )}
            {error && !loading && (
              <Box sx={{ width: '100%', textAlign: 'center', py: 6 }}>
                <Typography color="error">Error: {error}</Typography>
              </Box>
            )}
            {!loading && !error && accommodations.length === 0 && (
              <Box sx={{ width: '100%', textAlign: 'center', py: 6 }}>
                <Typography>No popular accommodations yet.</Typography>
              </Box>
            )}
            {!loading && !error && accommodations.map((accommodation, index) => (
              <Box
                key={`${accommodation.hotel_id || accommodation.hotel_name || index}`}
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
                  onClick={() => accommodation.hotel_id && navigate(`/hotels/${accommodation.hotel_id}`)}
                  sx={{ 
                    position: 'relative',
                    height: { xs: 350, sm: 370, md: 400, lg: 450 },
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
                    cursor: 'pointer',
                    transform: 'translateY(0)',
                    transition: 'transform 0.55s ease, box-shadow 0.55s ease',
                    willChange: 'transform',
                    '&:hover': { 
                      boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
                      transform: 'translateY(-4px)'
                    },
                    '&:hover .zoom-img': { transform: 'scale(1.06)' },
                    mb: 2
                  }}
                >
                  <Box
                    component="img"
                    className="zoom-img"
                    src={accommodation.image || PLACEHOLDER_IMG}
                    alt={accommodation.hotel_name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                      willChange: 'transform'
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
                      {accommodation.hotel_name}
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