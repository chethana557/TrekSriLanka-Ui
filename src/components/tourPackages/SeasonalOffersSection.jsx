import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  Button, 
  Container
} from '@mui/material';

const destinations = [
  {
    name: 'Sigiriya Rock',
    image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Temple of Tooth',
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Nine Arch Bridge',
    image: 'https://images.pexels.com/photos/14580513/pexels-photo-14580513.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Unawatuna Beach',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

function SeasonalOffersSection() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(360deg,rgb(255, 255, 255) 0%, #008B8B 100%)',
        minHeight: '80vh',
        pt: 2,
        pb: 6,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 'rem', sm: '4rem', md: '5rem' },
              fontWeight: 'bold',
              mb: 2,
              lineHeight: 1.1
            }}
          >
            <Box component="span" sx={{ color: '#FFEB3B' }}>
              Seasonal
            </Box>{' '}
            <Box component="span" sx={{ color: 'white' }}>
              offers
            </Box>
          </Typography>
        </Box>

        {/* Main Content Card */}
        <Card
          sx={{
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
            background: 'white'
          }}
        >
          {/* Destination Images Strip */}
          <Box
            sx={{
              display: 'flex',
              height: { xs: '180px', sm: '220px', md: '260px' }
            }}
          >
            {destinations.map((destination, index) => (
              <Box
                key={destination.name}
                sx={{
                  flex: 1,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    '& .destination-image': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={destination.image}
                  alt={destination.name}
                  className="destination-image"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Package Information */}
          <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 'bold',
                color: '#00A79D',
                mb: 3
              }}
            >
              Golden Isle Adventures
            </Typography>

            {/* Pricing Section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 2, sm: 4 },
                mb: 3,
                flexWrap: 'wrap'
              }}
            >
              {/* Original Package - Struck Through */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: 'line-through',
                    color: '#999',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    mb: 0.5
                  }}
                >
                  10 Days | 20 Locations
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: 'line-through',
                    color: '#999',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.3rem', sm: '1.5rem' }
                  }}
                >
                  $899 per person
                </Typography>
              </Box>

              {/* Updated Package */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#333',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    mb: 0.5
                  }}
                >
                  12 Days | 24 Locations
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                >
                  $799{' '}
                  <Typography
                    component="span"
                    variant="h6"
                    sx={{
                      fontWeight: 'normal',
                      color: '#666',
                      fontSize: { xs: '1rem', sm: '1.2rem' }
                    }}
                  >
                    per person
                  </Typography>
                </Typography>
              </Box>

              {/* CTA Button */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #00A79D 30%, #00BCD4 90%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  px: { xs: 4, sm: 6 },
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: '50px',
                  boxShadow: '0 8px 24px rgba(0,167,157,0.3)',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00695C 30%, #0097A7 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(0,167,157,0.4)'
                  }
                }}
              >
                Get Offer
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default SeasonalOffersSection;