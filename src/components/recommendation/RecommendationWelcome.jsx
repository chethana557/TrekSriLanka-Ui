import React from 'react';
import { Box, Typography } from '@mui/material';

function RecommendationWelcome() {
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
      <span style={{ fontSize: '1.5em' }}>What are you interested in?</span>
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
Tell us about your travel preferences and we'll find perfect places for you
        </Typography>
      </Box>
    </Box>
  );
}

export default RecommendationWelcome;
