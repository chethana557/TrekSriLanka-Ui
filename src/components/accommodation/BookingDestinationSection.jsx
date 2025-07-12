import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

import hotelImg from '../../assets/accommodations/luxuryHotels.png';
import resortImg from '../../assets/accommodations/beachResorts.png';
import villaImg from '../../assets/accommodations/privateVillas.png';
import guestHouseImg from '../../assets/accommodations/guestHouses.png';

const accommodations = [
  {
    name: 'Amanwella',
    image: hotelImg,
  },
  {
    name: 'Cape Weligama',
    image: resortImg,
  },
  {
    name: 'Karpaha Sands ',
    image: villaImg,
  },
  {
    name: 'Saman Villas',
    image: guestHouseImg,
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
            Premium
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
            accommodations
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
            Looking for the perfect place to stay? Discover our handpicked selection of premium accommodations across Sri Lanka, each offering exceptional comfort, stunning views, and unforgettable hospitality for your perfect getaway.
          </Typography>
        </Box>
        
        <Grid container spacing={6} justifyContent="center">
          {accommodations.map((accommodation) => (
            <Grid item xs={12} sm={6} md={3} key={accommodation.name}>
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
                    {accommodation.name}
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