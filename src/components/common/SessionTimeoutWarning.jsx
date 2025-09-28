import React, { useState, useEffect } from 'react';
import { Box, Alert, Button, Typography } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { getRemainingTokenTime, refreshTokenTimestamp } from '../../utils/authUtils';

const SessionTimeoutWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkSessionTimeout = () => {
      const remaining = getRemainingTokenTime();
      
      if (remaining > 0 && remaining <= 5 * 60 * 1000) { // Show warning 5 minutes before expiry
        setTimeRemaining(remaining);
        setShowWarning(true);
        setIsVisible(true);
      } else if (remaining <= 0) {
        setShowWarning(false);
        setIsVisible(false);
      }
    };

    // Check immediately
    checkSessionTimeout();

    // Check every 30 seconds
    const interval = setInterval(checkSessionTimeout, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showWarning && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1000;
          if (newTime <= 0) {
            setShowWarning(false);
            setIsVisible(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showWarning, timeRemaining]);

  const handleExtendSession = () => {
    refreshTokenTimestamp();
    setShowWarning(false);
    setIsVisible(false);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      <Alert
        severity="warning"
        icon={<Warning />}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={handleExtendSession}
            sx={{ fontWeight: 'bold' }}
          >
            Extend Session
          </Button>
        }
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            Your session will expire in {formatTime(timeRemaining)}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Click "Extend Session" to stay logged in, or your session will automatically expire.
          </Typography>
        </Box>
      </Alert>
      
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default SessionTimeoutWarning;
