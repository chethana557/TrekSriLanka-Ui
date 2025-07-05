import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import HotelIcon from '@mui/icons-material/Hotel';
import BusinessIcon from '@mui/icons-material/Business';

const iconMap = {
  'seasonal-offers': <TrendingUpIcon />,
  'tour-packages': <LocalOfferIcon />,
  'tour-bookings': <BookOnlineIcon />,
  'hotel-bookings': <BookOnlineIcon />,
  'active-hotels': <BusinessIcon />
};

function StatsCard({ title, value, icon, color = '#4AB9B0' }) {
  return (
    <Card 
      sx={{ 
        minHeight: 120,
        border: `2px solid ${color}`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ color: color, fontSize: '2rem' }}>
            {iconMap[icon] || <TrendingUpIcon />}
          </Box>
        </Box>
        <Typography 
          variant="h3" 
          component="div" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 1,
            color: '#333'
          }}
        >
          {value}
        </Typography>
        <Typography 
          sx={{ 
            fontSize: '0.95rem',
            color: '#666',
            fontWeight: 500
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatsCard;