import React from 'react';
import { Box, Typography } from '@mui/material';

function ContactUsWelcomeSection() {
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
      <span style={{ fontSize: '1.5em' }}>Let's Craft Your Itinerary</span>
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
          Ready to explore Sri Lanka? 
          <br />
          Use this form to send us your travel ideas, questions, or specific requests. 
          <br />
          We'll help you build a personalized journey from the ground up.
          <br />
        </Typography>
      </Box>
    </Box>
  );
}

export default ContactUsWelcomeSection;
