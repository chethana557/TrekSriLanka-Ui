import * as React from 'react';
import { Box, Typography, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccommodationBackground from '../../assets/aboutus/background_3.jpg'; 

function AboutUsMainSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${AccommodationBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 12, 
      }}
    >      
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          mt: 6,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            letterSpacing: '1px',
          }}
        >
          Why Book with TrekSriLanka? - Our Story
        </Typography>
      </Box>
    </Box>
  );
}

export default AboutUsMainSection;