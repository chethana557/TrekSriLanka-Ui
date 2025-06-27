import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

import sigiriyaImg from '../assets/sigiriya.png';
import ellaImg from '../assets/ella.png';
import mirissaImg from '../assets/mirissa.png';
import kandyImg from '../assets/kandy.png';

const destinations = [
  {
    name: 'Sigiriya',
    image: sigiriyaImg,
  },
  {
    name: 'Ella',
    image: ellaImg,
  },
  {
    name: 'Mirissa',
    image: mirissaImg,
  },
  {
    name: 'Kandy',
    image: kandyImg,
  },
  
];

function DestinationsSection() {
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
        
        <Grid container spacing={4} justifyContent="center">
          {destinations.map((destination) => (
            <Grid item xs={10} sm={6} md={3} key={destination.name}>
              <Box 
                sx={{ 
                  position: 'relative',
                  height: 400,
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
                    {destination.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default DestinationsSection;