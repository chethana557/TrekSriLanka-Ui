import React from 'react';
import { Box, Typography } from '@mui/material';

function HotelRoomMainSection({ 
  destinationName = "Garden View Room - 1 double bed",
  subtitle = " Relax in a peaceful setting with a stunning garden view! ",
  titleColor = '#00A79D'
}) {


  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          color: titleColor, 
          fontWeight: 'bold',
        }}
      >
        <span style={{ fontSize: '1.5em' }}>{destinationName}</span>
      </Typography>

      <Box sx={{ maxWidth: '1100px', mx: 'auto', px: 2 }}>
        <Typography 
          variant="body1" 
          align="center"
          sx={{ 
            fontSize: '2rem', 
            lineHeight: 2, 
            color: '#000000',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default HotelRoomMainSection;