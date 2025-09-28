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
    <Box id="about-content" sx={{ py: { xs: 6, md: 8 }, px: 2, background: 'linear-gradient(180deg, #F6FFFC 0%, #FFFFFF 60%)' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', letterSpacing: '0.3px' }}
          >
            Our Commitment
          </Typography>
          <Box sx={{ width: 64, height: 4, borderRadius: 4, mx: 'auto', mt: 1.2, background: 'linear-gradient(90deg, #00A79D, #38E0D0)' }} />
        </Box>

        {/* Image strip under the heading */}
        <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center" alignItems="stretch">
          {[{src: DeliveringImage, alt: 'Delivering Unique Travel Experiences'}, {src: SustainableImage, alt: 'Sustainable & Responsible Tourism'}, {src: CustomerSatisfactionImage, alt: 'Customer Satisfaction First'}].map((img, idx) => (
            <Grid item xs={12} sm={4} key={idx} sx={{ animation: 'fadeUp .7s ease forwards', opacity: 0, animationDelay: `${idx * 120}ms` }}>
              <Box
                sx={{
                  height: { xs: 160, sm: 180, md: 200 },
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  background: 'linear-gradient(180deg, #F2FBFA, #F9FFFE)',
                  transform: 'translateY(0)',
                  transition: 'transform .3s ease, box-shadow .3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 14px 34px rgba(0,0,0,0.16)'
                  }
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
          {commitmentCards.map((card, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ animation: 'fadeUp .8s ease forwards', opacity: 0, animationDelay: `${300 + index * 140}ms` }}>
              <Card
                sx={{
                  height: 320,
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transform: 'translateY(0)',
                  transition: 'transform .3s ease, box-shadow .3s ease, filter .3s ease',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 22px 54px rgba(0,0,0,0.2), 0 0 0 2px rgba(0,167,157,0.18)',
                    filter: 'saturate(1.05)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={card.image}
                  alt={card.title}
                  sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)' }} />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
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
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}

export default OurCommitmentComponent;