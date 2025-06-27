import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

import sigiriyaImg from '../../assets/sigiriya.png';
import ellaImg from '../../assets/ella.png';
import mirissaImg from '../../assets/mirissa.png';
import kandyImg from '../../assets/kandy.png';

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

function BookingDestinationSection() {
  return (
    <Box sx={{ bgcolor: '#00A79D', py: 8, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: 4, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              color: '#FFEB3B', 
              fontWeight: 'bold',
              mb: 1,
              fontSize: '4rem'
            }}
          >
            Top
          </Typography>
          <Typography 
            variant="h3" 
            component="h3" 
            sx={{ 
              color: 'white', 
              fontWeight: 'medium',
              mb: 3,
              fontSize: '3rem'
            }}
          >
            destinations
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white',
              maxWidth: '900px',
              mx: 'auto',
              mb: 6,
              fontSize: '1.2rem',
              lineHeight: 1.6
            }}
          >
            Planning your next adventure? You don't have to worry about where to go! Here are some of the most popular and beautiful destinations in Sri Lanka, offering unforgettable experiences for every traveler.
          </Typography>
        </Box>
        
        <Grid container spacing={6} justifyContent="center">
          {destinations.map((destination) => (
            <Grid item xs={12} sm={6} md={3} key={destination.name}>
              <Box 
                sx={{ 
                  position: 'relative',
                  height: 450,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.3), 0 8px 15px rgba(0,0,0,0.22)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(.25,.8,.25,1)',
                  '&:hover': {
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 12px 20px rgba(0,0,0,0.3)',
                    transform: 'translateY(-8px) scale(1.02)'
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
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)',
                    padding: '40px 25px 25px',
                    color: 'white',
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '2rem',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
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

export default BookingDestinationSection;