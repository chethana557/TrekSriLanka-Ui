import React from 'react';
import { Box, Typography } from '@mui/material';

function BookingWelcomeSection() {
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
      <span style={{ fontSize: '1.5em' }}>Stay Your Way in Sri Lanka!</span>
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
          Discover a handpicked selection of hotels, resorts, villas, cottages,apartments, and homestays at the best prices.
          <br />
          Whether you seek luxury, comfort, or budget-friendly options, TrekSriLanka ensures top-quality stays through expert 
          <br />
          reviews and guest feedback. With our guaranteed best prices and dedicated support, 
          <br />
          you can book with confidence and enjoy Sri Lanka without compromise!
        </Typography>
      </Box>
    </Box>
  );
}

export default BookingWelcomeSection;
