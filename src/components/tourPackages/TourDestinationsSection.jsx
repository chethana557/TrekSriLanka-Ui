import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Chip
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function TourDestinationsSection() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Removed dynamic expansion; using fixed layout for uniform cards
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  
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

  // Fetch tour packages from backend
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${base}/api/v1/tour-packages/`);
        if (!res.ok) throw new Error('Failed to load tour packages');
        const data = await res.json();
        const arr = Array.isArray(data) ? data : [];
        // Prefer Active packages; fallback to all if none active
  const active = arr.filter(p => (p.status || '').toLowerCase() === 'active');
  const normalized = active.map((p) => ({
          id: p._id || p.id,
          title: p.title,
          image: p.photo || '/vite.svg',
          locations: Array.isArray(p.locations) ? p.locations : [],
          day_count: p.day_count,
          person_count: p.person_count,
          price_per_person: p.price_per_person,
          package_price: p.package_price,
          short_description: p.short_description || '',
          status: p.status || 'Inactive',
          booking_count: typeof p.booking_count === 'number' ? p.booking_count : 0
        }));
        // Sort by booking_count desc and take top 20
        const top = normalized
          .sort((a, b) => (b.booking_count || 0) - (a.booking_count || 0))
          .slice(0, 20);
        if (isMounted) setPackages(top);
      } catch (e) {
        if (isMounted) setError(e.message || 'Failed to load tour packages');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [base]);
  
  // Auto-slide animation
  useEffect(() => {
    if (!packages.length) return;
    const autoSlideInterval = setInterval(() => {
      if (currentIndex < packages.length - itemsPerView) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        scrollToIndex(newIndex);
      } else {
        setCurrentIndex(0);
        scrollToIndex(0);
      }
    }, 5000);
    return () => clearInterval(autoSlideInterval);
  }, [currentIndex, itemsPerView, packages.length]);
  
  const handleNext = () => {
  const newIndex = Math.min(currentIndex + itemsPerView, Math.max(packages.length - itemsPerView, 0));
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
          
          {currentIndex < Math.max((packages.length - itemsPerView), 0) && (
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
            {packages.map((pkg, index) => (
              <Box
                key={`${pkg.id || pkg.title}-${index}`}
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
                    height: { xs: 480, sm: 500, md: 520, lg: 540 },
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
                  {/* Status Badge */}
                  <Chip
                    label={(pkg.status || 'Inactive')}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      bgcolor: (pkg.status || '').toLowerCase() === 'active' ? '#00A79D' : '#9e9e9e',
                      color: 'white',
                      fontWeight: 'bold',
                      zIndex: 2
                    }}
                  />

                  {/* Package Image */}
                  <CardMedia
                    component="img"
                    height="240"
                    image={pkg.image}
                    alt={pkg.title}
                    sx={{ objectFit: 'cover' }}
                  />

                  {/* Package Details */}
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    {/* Fixed Title Area (up to 2 lines) */}
                    <Box sx={{ mb: 1, minHeight: 52, maxHeight: 52, overflow: 'hidden' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '1.15rem',
                          fontFamily: `'Anek Latin', sans-serif`,
                          lineHeight: 1.2,
                          color: '#333',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {pkg.title}
                      </Typography>
                    </Box>
                    {/* Fixed Meta Chips Area */}
                    <Box sx={{ mb: 1.5, minHeight: 40, maxHeight: 40, overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip icon={<LocationOnIcon />} label={`${pkg.locations.length} locations`} size="small" sx={{ flexShrink: 0 }} />
                      {Number(pkg.day_count) > 0 && (
                        <Chip label={`${pkg.day_count} days`} size="small" sx={{ flexShrink: 0 }} />
                      )}
                      {Number(pkg.person_count) > 0 && (
                        <Chip label={`${pkg.person_count} persons`} size="small" sx={{ flexShrink: 0 }} />
                      )}
                    </Box>

                    {(() => {
                      const fullText = pkg.short_description || (pkg.locations && pkg.locations.join(', ')) || '';
                      return (
                        <Box sx={{ position: 'relative', mb: 2, flexGrow: 1 }}>
                          <Box sx={{
                            minHeight: 88, // ~4 lines
                            maxHeight: 88,
                            overflow: 'hidden',
                            position: 'relative'
                          }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#666',
                                lineHeight: 1.4,
                                display: '-webkit-box',
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {fullText}
                            </Typography>
                            {fullText.length > 220 && (
                              <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 32,
                                background: 'linear-gradient(rgba(255,255,255,0), #fff)'
                              }} />
                            )}
                          </Box>
                          {fullText.length > 220 && (
                            <Button
                              size="small"
                              onClick={(e) => { e.stopPropagation(); navigate(`/packages/${pkg.id}`); }}
                              sx={{
                                position: 'absolute',
                                bottom: -6,
                                right: 0,
                                textTransform: 'none',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                color: '#00A79D',
                                '&:hover': { background: 'transparent', color: '#008A82' },
                                padding: 0,
                                minWidth: 0
                              }}
                            >
                              View More
                            </Button>
                          )}
                        </Box>
                      );
                    })()}

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
                        onClick={()=>navigate(`/packages/${pkg.id}`)}
                      >
                        View Details
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