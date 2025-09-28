import * as React from 'react';
import { Box, Typography, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccommodationBackground from '../../assets/tourPackages/background_2.png'; 

function TourMainSection() {
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
          From quick escapes to grand adventures,
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            mb: { xs: 2, sm: 3, md: 34 },
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            letterSpacing: '1px',
          }}
        >
          find your perfect package!
        </Typography>
      </Box>

      {/* Scroll-down indicator */}
      <Box 
        onClick={() => {
          const el = document.getElementById('tour-content');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            try { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); } catch {}
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 2,
          cursor: 'pointer',
          userSelect: 'none',
          opacity: 0.95,
          '&:hover': { opacity: 1 },
        }}
        aria-label="Scroll to tour content"
        role="button"
      >
        <Box
          sx={{
            width: 28,
            height: 48,
            borderRadius: '20px',
            border: '2px solid rgba(255,255,255,0.8)',
            position: 'relative',
            boxShadow: '0 0 14px rgba(0,0,0,0.25)',
            background: 'rgba(0,0,0,0.08)',
            overflow: 'hidden',
            mr: 1.5,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              height: 8,
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.9)',
              animation: 'scrollDot 1.6s ease-in-out infinite'
            }
          }}
        />
        <Typography sx={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 3px rgba(0,0,0,0.45)', fontSize: { xs: 12, sm: 14 } }}>
          Scroll down
        </Typography>
      </Box>

      <style>{`
        @keyframes scrollDot {
          0% { opacity: 0; transform: translate(-50%, 0); }
          20% { opacity: 1; }
          70% { opacity: 1; transform: translate(-50%, 18px); }
          100% { opacity: 0; transform: translate(-50%, 26px); }
        }
      `}</style>
    </Box>
  );
}

export default TourMainSection;