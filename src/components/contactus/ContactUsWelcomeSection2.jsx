import React from 'react';
import { Box, Typography } from '@mui/material';

function ContactUsWelcomeSection2() {
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
      <span style={{ fontSize: '1.5em' }}>How to Reach Us</span>
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
          Whether you'd like to give us a call, send an email, or visit our office, here are all the details you need. 
          <br />
          We look forward to connecting with you!
        </Typography>
      </Box>
    </Box>
  );
}

export default ContactUsWelcomeSection2;
