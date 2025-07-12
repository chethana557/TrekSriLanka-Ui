import React from 'react';
import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';
import DeliveringImage from '../../assets/aboutus/image1.png';
import SustainableImage from '../../assets/aboutus/image2.png';
import CustomerSatisfactionImage from '../../assets/aboutus/image3.png';

function OurCommitmentComponent() {
  const commitmentCards = [
    {
      title: 'Delivering Unique Travel Experiences',
      image: DeliveringImage,
    },
    {
      title: 'Sustainable & Responsible Tourism',
      image: SustainableImage,
    },
    {
      title: 'Customer Satisfaction First',
      image: CustomerSatisfactionImage,
    }
  ];

  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 2,
            color: '#333'
          }}
        >
          Our Commitment
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
          {commitmentCards.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: 300,
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={card.image}
                  alt={card.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
        
                  }}
                  onError={(e) => {
                    console.error('Image failed to load:', card.image);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', card.image);
                  }}
                />
                
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    p: 3
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                    }}
                  >
                    {card.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#00A79D'
            }}
          >
            Join us on a Journey Like No Other!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              color: '#666',
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            Let us be your guide to discovering the wonders of Sri Lanka. Every trip is crafted 
            with passion, expertise, and a touch of adventure. Let us help you create memories 
            that last a lifetime!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OurCommitmentComponent;