import * as React from 'react';
import { Box, Typography, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccommodationBackground from '../../assets/accommodation/background_2.png'; 

function BookingMainSection() {
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
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: { xs: '90%', sm: '80%', md: '60%', lg: '40%' },
          borderRadius: 50,
          boxShadow: 3,
          mb: 12,
        }}
      >
        <SearchIcon sx={{ color: 'gray', ml: 2 }} />
        <InputBase
          sx={{ ml: 1, flex: 1, py: 1.5 }}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search trek sri lanka' }}
        />
      </Paper>
      
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
          Looking for the perfect stay in Sri Lanka?
        </Typography>
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
          Find your ideal getaway with TrekSriLanka!
        </Typography>
      </Box>
    </Box>
  );
}

export default BookingMainSection;