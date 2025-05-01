import React from 'react';
import { Box, Typography } from '@mui/material';

function WelcomeSection() {
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
        Welcome to <span style={{ fontSize: '1.5em' }}>TrekSriLanka</span>
      </Typography>
      
      <Typography 
        variant="h5"
        component="h2" 
        sx={{ 
          color: '#00A79D', 
          fontWeight: 'bold',
          mb: 2 
        }}
      >
        Your Ultimate Travel Companion!
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
          Discover the hidden gems of Sri Lanka, from breathtaking mountains to serene beaches.
          <br />
          Plan your perfect adventure with curated travel guides, must-visit destinations, and insider tips.
          <br />
          Start exploring today and make unforgettable memories!
        </Typography>
      </Box>
    </Box>
  );
}

export default WelcomeSection;
