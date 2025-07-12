import React from 'react';
import { Box, Typography } from '@mui/material';

function HotelWelcomeSection({ 
  destinationName = "Galle Face Hotel,Colombo",
  subtitle = "2, Galle Road, Kollupitiya, 00100 Colombo, Sri Lanka",
  description = [],
  titleColor = '#00A79D'
}) {
  const defaultDescription = [
    "Galle Face Hotel in Colombo, established in 1864, is one of Asia oldest and most iconic luxury hotels. Overlooking the Indian Ocean, it offers a blend of colonial elegance and modern comfort. The hotel features world-class dining, a serene spa, and an infinity pool with breathtaking sunset views. With its rich heritage and timeless charm, it remains a favorite among travelers seeking a luxurious stay in Sri Lanka."
  ];

  const paragraphs = description.length > 0 ? description : defaultDescription;

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
        
        {paragraphs.map((paragraph, index) => (
          <Typography 
            key={index}
            variant="body1" 
            align="center"
            sx={{ 
              fontSize: '1rem', 
              lineHeight: 1.6, 
              color: '#333333',
              mb: index === paragraphs.length - 1 ? 0 : 2
            }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default HotelWelcomeSection;