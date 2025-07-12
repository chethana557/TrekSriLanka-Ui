import * as React from 'react';
import { Box, Typography, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccommodationBackground from '../../assets/tourPackages/background_2.png'; 

function DestinationMainSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '40vh',
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
      </Box>
    </Box>
  );
}

export default DestinationMainSection;