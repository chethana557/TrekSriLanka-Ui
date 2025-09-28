import * as React from 'react';
import { Box, Typography } from '@mui/material';
import AccommodationBackground from '../../assets/tourPackages/background_2.png'; 

function DestinationMainSection({ image }) {
  const bg = image || AccommodationBackground;
  const handleScrollDown = () => {
    const el = document.getElementById('destination-content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      try {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      } catch {}
    }
  };
  return (
    <Box
      sx={{
        position: 'relative',
        height: '40vh',
        width: '100%',
        backgroundImage: `url(${bg})`,
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
        {/* Scroll-down indicator */}
        <Box
          onClick={handleScrollDown}
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
          aria-label="Scroll to destination content"
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

export default DestinationMainSection;