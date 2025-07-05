import * as React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function BookingItem({ customerName, tourName, date, price, status }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#E8F5E8';
      case 'pending':
        return '#FFF3E0';
      case 'cancelled':
        return '#FFEBEE';
      default:
        return '#F5F5F5';
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        py: 2,
        px: 1,
        borderRadius: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#f8f9fa'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Avatar 
          sx={{ 
            width: 40, 
            height: 40, 
            backgroundColor: '#4AB9B0',
            color: 'white'
          }}
        >
          <PersonIcon />
        </Avatar>
        <Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              color: '#333',
              mb: 0.5
            }}
          >
            {customerName}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              mb: 0.5
            }}
          >
            {tourName}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#999'
            }}
          >
            {date}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          ${price}
        </Typography>
        <Chip
          label={status}
          size="small"
          sx={{
            backgroundColor: getStatusBgColor(status),
            color: getStatusColor(status),
            fontWeight: 500,
            minWidth: 80,
            textTransform: 'lowercase'
          }}
        />
      </Box>
    </Box>
  );
}

export default BookingItem;