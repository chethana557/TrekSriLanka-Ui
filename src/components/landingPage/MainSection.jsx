import * as React from 'react';
import { Box, Typography, Button, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Background from '../../assets/user/background_1.png'; 

function MainSection({ onLetGoClick }) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 12, 
      }}
    >
      {/* Search Bar */}
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
      
      {/* Hero Content */}
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
          Ready for an unforgettable adventure?
        </Typography>
        <Typography
          variant="h2"
          sx={{
            mb: 6,
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            letterSpacing: '0.5px',
          }}
        >
          Discover Sri Lanka with TrekSriLanka!
        </Typography>
        <Button
          variant="contained"
          onClick={onLetGoClick}
          sx={{
            bgcolor: '#4AB9B0',
            '&:hover': { bgcolor: '#3da89f' },
            borderRadius: '25px',
            px: 5,
            py: 1.5,
            fontSize: '1.2rem',
            textTransform: 'none',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
          }}
        >
          Let's go
        </Button>
      </Box>
    </Box>
  );
}

export default MainSection;