import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  useMediaQuery, 
  useTheme,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Rating
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import JaffnaImg from '../../assets/common/jaffna2.jpg';
import AnuradhapuraImg from '../../assets/common/anuradhapura2.png';
import YalaImg from '../../assets/common/yala2.jpg';
import sigiriyaImg from '../../assets/common/sigiriya.png';
import ellaImg from '../../assets/common/ella.png';
import mirissaImg from '../../assets/common/mirissa.png';
import kandyImg from '../../assets/common/kandy.png';

// Enhanced destinations data with more details
const destinations = [
  {
    id: 1,
    name: 'Jaffna',
    image: JaffnaImg,
    rating: 4.8,
    reviews: 245,
    description: 'Explore the cultural heart of Northern Sri Lanka with ancient temples and vibrant traditions.',
    featured: true
  },
  {
    id: 2,
    name: 'Anuradhapura',
    image: AnuradhapuraImg,
    rating: 4.9,
    reviews: 189,
    description: 'Discover ancient Buddhist civilization in this UNESCO World Heritage sacred city.',
    featured: false
  },
  {
    id: 3,
    name: 'Yala',
    image: YalaImg,
    rating: 4.7,
    reviews: 324,
    description: 'Wildlife safari paradise with leopards, elephants and diverse bird species.',
    featured: true
  },
  {
    id: 4,
    name: 'Mirissa',
    image: mirissaImg,
    rating: 4.6,
    reviews: 412,
    description: 'Pristine beaches perfect for whale watching and relaxation by the ocean.',
    featured: false
  },
  {
    id: 5,
    name: 'Anuradhapura',
    image: ellaImg,
    rating: 4.9,
    reviews: 189,
    description: 'Discover ancient Buddhist civilization in this UNESCO World Heritage sacred city.',
    featured: false
  },
  {
    id: 6,
    name: 'Jaffna',
    image: mirissaImg,
    rating: 4.8,
    reviews: 245,
    description: 'Explore the cultural heart of Northern Sri Lanka with ancient temples and vibrant traditions.',
    featured: false
  },
  {
    id: 7,
    name: 'Yala',
    image: kandyImg,
    rating: 4.7,
    reviews: 324,
    description: 'Wildlife safari paradise with leopards, elephants and diverse bird species.',
    featured: true
  },
  {
    id: 8,
    name: 'Anuradhapura',
    image: ellaImg,
    rating: 4.9,
    reviews: 189,
    description: 'Discover ancient Buddhist civilization in this UNESCO World Heritage sacred city.',
    featured: false
  }
].filter(Boolean); // Remove any undefined entries

function TourDestinationsSection() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  
  // Determine how many items to show based on screen size
  const getItemsToShow = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 4; // Changed back to 4 for better spacing
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
    <Box sx={{ width: '100%', bgcolor: 'white' }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              color: '#FFD600', 
              fontWeight: 'bold',
              mt: 6,
              fontFamily: `'Anek Latin', sans-serif`
            }}
          >
            Top
          </Typography>
          <Typography 
            variant="h4" 
            component="h3" 
            sx={{ 
              color: 'black', 
              fontWeight: 'medium',
              mb: 3,
              fontFamily: `'Anek Latin', sans-serif`
            }}
          >
            Tour Packages
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
              mb: 7
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
                  px: 1.5,
                  transition: 'all 0.3s ease'
                }}
              >
                <Card 
                  sx={{ 
                    height: { xs: 420, sm: 440, md: 460, lg: 480 },
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    mb: 2
                  }}
                >
                  {/* Featured Badge */}
                  {destination.featured && (
                    <Chip
                      label="Featured"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: '#00A79D',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 2
                      }}
                    />
                  )}

                  {/* Destination Image */}
                  <CardMedia
                    component="img"
                    height="240"
                    image={destination.image}
                    alt={destination.name}
                    sx={{ objectFit: 'cover' }}
                  />

                  {/* Destination Details */}
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: '1.3rem',
                          fontFamily: `'Anek Latin', sans-serif`,
                          lineHeight: 1.2,
                          color: '#333'
                        }}
                      >
                        {destination.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating 
                        value={destination.rating} 
                        precision={0.1} 
                        size="small" 
                        readOnly 
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {destination.rating} ({destination.reviews} reviews)
                      </Typography>
                    </Box>

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666', 
                        mb: 3, 
                        lineHeight: 1.4,
                        flexGrow: 1
                      }}
                    >
                      {destination.description}
                    </Typography>

                    {/* Action Button */}
                    <Box sx={{ mt: 'auto' }}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: '#00A79D',
                          borderRadius: '20px',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          py: 1,
                          '&:hover': {
                            bgcolor: '#008A82'
                          }
                        }}
                      >
                        Explore {destination.name}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TourDestinationsSection;