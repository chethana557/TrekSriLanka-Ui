import React from 'react';
import { Box, Typography } from '@mui/material';

function AboutUsWelcomeSection() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}> {/* reduced from 8 to 4 */}
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          color: '#00A79D', 
          fontWeight: 'bold',
          mb: 0.5 
        }}
      >
      <span style={{ fontSize: '1.5em' }}>Your Trusted Guide to Exploring Sri Lanka!</span>
      </Typography>
            
      <Box sx={{ maxWidth: '900px', mx: 'auto', px: 2 }}>
        <Typography 
          variant="body1" 
          align="center"
          sx={{ 
            fontSize: '1rem', 
            lineHeight: 1.5, 
            color: '#333'
          }}
        >
          At TrekSriLanka, we believe that every journey should be an unforgettable experience.
          <br />
          With a passion for travel and a deep love for Sri Lanka, we curate personalized itineraries that 
          <br />
          showcase the country’s breathtaking landscapes, rich culture, and hidden gems. Whether you’re looking for luxurious beachfront stays, scenic mountain getaways, or cultural explorations, we’ve got you covered.
        </Typography>
      </Box>
    </Box>
  );
}

export default AboutUsWelcomeSection;
