import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DestinationsSection({ cities = [] }) {
  const navigate = useNavigate();
  const destinations = Array.isArray(cities) ? cities.slice(0, 4) : [];

  return (
    <Box sx={{ bgcolor: '#00A79D', py: 6, width: '100%' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              color: '#FFEB3B', 
              fontWeight: 'bold',
              mb: 1
            }}
          >
            Top
          </Typography>
          <Typography 
            variant="h4" 
            component="h3" 
            sx={{ 
              color: 'white', 
              fontWeight: 'medium',
              mb: 2
            }}
          >
            destinations
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white',
              maxWidth: '700px',
              mx: 'auto',
              mb: 5
            }}
          >
            Planning your next adventure? You don't have to worry about where to go! Here are some of the most popular and beautiful destinations in Sri Lanka, offering unforgettable experiences for every traveler.
          </Typography>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            gap: 0,
            justifyContent: 'center',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            px: 1
          }}
        >
          {destinations.map((c, idx) => (
            <Box 
              key={(c.main_city_id || c.id || c.title || 'city') + '-' + idx} 
              sx={{ 
                flex: '0 0 auto', 
                width: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' },
                px: 1.5
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 350, sm: 370, md: 400, lg: 450 },
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                  '&:hover': {
                    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                    transform: 'translateY(-5px)'
                  }
                }}
                onClick={() => {
                  navigate('/destination/city-details', {
                    state: {
                      title: c.title,
                      mini_caption: c.mini_caption,
                      long_description: c.long_description,
                      photos: Array.isArray(c.photos) ? c.photos : [],
                      image: (Array.isArray(c.photos) && c.photos[0]) ? c.photos[0] : '/placeholder-destination.jpg'
                    }
                  });
                }}
              >
                <Box
                  component="img"
                  src={(Array.isArray(c.photos) && c.photos[0]) ? c.photos[0] : '/placeholder-destination.jpg'}
                  alt={c.title || 'City'}
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
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                    padding: '30px 20px 20px',
                    color: 'white',
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.75rem'
                    }}
                  >
                    {c.title}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default DestinationsSection;