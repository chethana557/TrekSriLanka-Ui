import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Container,
  Avatar,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const recentBookings = [
  {
    id: 1,
    customerName: 'John Smith',
    tourName: 'Golden Isle Adventure',
    bookingDate: '2024-01-15',
    price: 799,
    status: 'confirmed',
    statusColor: '#4CAF50'
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    tourName: 'Cultural Heritage Tour',
    bookingDate: '2024-01-14',
    price: 650,
    status: 'pending',
    statusColor: '#FF9800'
  },
  {
    id: 3,
    customerName: 'Michael Chen',
    tourName: 'Adventure Trek Package',
    bookingDate: '2024-01-13',
    price: 899,
    status: 'confirmed',
    statusColor: '#4CAF50'
  },
  {
    id: 4,
    customerName: 'Emma Davis',
    tourName: 'Beach Paradise Tour',
    bookingDate: '2024-01-12',
    price: 525,
    status: 'cancelled',
    statusColor: '#F44336'
  }
];

function RecentBookingsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getStatusBgColor = (status) => {
    switch (status) {
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
    <Box sx={{ width: '100%', py: 6 }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              color: '#00A79D', 
              fontWeight: 'bold',
              mb: 1,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            Recent Bookings
          </Typography>
        </Box>

        {/* Bookings List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {recentBookings.map((booking) => (
            <Card
              key={booking.id}
              sx={{
                borderRadius: '12px',
                bgcolor: 'white',
                border: '1px solid #E0E0E0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  border: '1px solid #00A79D',
                },
                cursor: 'pointer'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                    gap: 2
                  }}
                >
                  {/* Left Side - Customer Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    {/* Avatar */}
                    <Avatar
                      sx={{
                        bgcolor: '#E3F2FD',
                        color: '#1976D2',
                        width: 48,
                        height: 48
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 24 }} />
                    </Avatar>

                    {/* Customer Details */}
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: '#333',
                          mb: 0.5,
                          fontSize: '1.1rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                      >
                        {booking.customerName}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#666',
                          fontSize: '0.9rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          mb: 0.5
                        }}
                      >
                        {booking.tourName}
                      </Typography>

                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#999',
                          fontSize: '0.8rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                      >
                        {booking.bookingDate}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Right Side - Price and Status */}
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      flexDirection: isMobile ? 'column' : 'row',
                      alignSelf: isMobile ? 'stretch' : 'center'
                    }}
                  >
                    {/* Price */}
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '1.2rem',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                    >
                      ${booking.price}
                    </Typography>

                    {/* Status Badge */}
                    <Chip
                      label={booking.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusBgColor(booking.status),
                        color: booking.statusColor,
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        minWidth: '80px',
                        border: `1px solid ${booking.statusColor}20`
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* View All Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography
            component="button"
            sx={{
              color: '#00A79D',
              bgcolor: 'transparent',
              border: '2px solid #00A79D',
              borderRadius: '25px',
              px: 4,
              py: 1.5,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                bgcolor: '#00A79D',
                color: 'white',
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              }
            }}
          >
            View All Bookings
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default RecentBookingsSection;