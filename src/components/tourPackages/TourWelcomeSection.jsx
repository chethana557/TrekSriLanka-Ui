import React from 'react';
import { Box, Typography } from '@mui/material';

function TourWelcomeSection() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}> {/* reduced from 8 to 4 */}
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          color: '#00A79D', 
          fontWeight: 'bold',

        }}
      >
      <span style={{ fontSize: '1.5em' }}>Your perfect trip personalized to you!</span>
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
          Explore Sri Lanka with expertly curated tours, from cultural expeditions to wildlife safaris,beach escapes
          <br />
           to mountain adventures. With our best prices and expert guidance, embark on a journey
          <br />
           filled with unforgettable experiences!
          <br />
        </Typography>
      </Box>
    </Box>
  );
}

export default TourWelcomeSection;
