import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Container,
  Avatar,
  Chip,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Sample data matching the image
const allBookings = [
  {
    id: 1,
    customerName: 'John Smith',
    email: 'johnsmith@email.com',
    phone: '+1 555-1234',
    tourName: 'Golden Isle Adventure',
    bookingDate: '2024-01-15',
    travelDate: 'Travel 2024-04-15',
    price: 1598,
    guests: 2,
    status: 'confirmed',
    statusColor: '#4CAF50'
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    email: 'sarah@johnson.com',
    phone: '+1 555-2345',
    tourName: 'Mountain Explorer',
    bookingDate: '2024-01-14',
    travelDate: 'Travel 2024-04-20',
    price: 2200,
    guests: 4,
    status: 'pending',
    statusColor: '#FF9800'
  },
  {
    id: 3,
    customerName: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 555-3456',
    tourName: 'Cultural Heritage Special',
    bookingDate: '2024-01-13',
    travelDate: 'Travel 2024-05-01',
    price: 1950,
    guests: 3,
    status: 'confirmed',
    statusColor: '#4CAF50'
  },
  {
    id: 4,
    customerName: 'John Smith',
    email: 'johnsmith@email.com',
    phone: '+1 555-1234',
    tourName: 'Golden Isle Adventure',
    bookingDate: '2024-01-12',
    travelDate: 'Travel 2024-04-15',
    price: 1598,
    guests: 2,
    status: 'confirmed',
    statusColor: '#4CAF50'
  },
  {
    id: 5,
    customerName: 'Sarah Johnson',
    email: 'sarah@johnson.com',
    phone: '+1 555-2345',
    tourName: 'Mountain Explorer',
    bookingDate: '2024-01-11',
    travelDate: 'Travel 2024-04-20',
    price: 2200,
    guests: 4,
    status: 'pending',
    statusColor: '#FF9800'
  },
  {
    id: 6,
    customerName: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 555-3456',
    tourName: 'Cultural Heritage Special',
    bookingDate: '2024-01-10',
    travelDate: 'Travel 2024-05-01',
    price: 1950,
    guests: 3,
    status: 'confirmed',
    statusColor: '#4CAF50'
  },
    {
    id: 7,
    customerName: 'John Smith',
    email: 'johnsmith@email.com',
    phone: '+1 555-1234',
    tourName: 'Golden Isle Adventure',
    bookingDate: '2024-01-12',
    travelDate: 'Travel 2024-04-15',
    price: 1598,
    guests: 2,
    status: 'confirmed',
    statusColor: '#4CAF50'
  },
  {
    id: 8,
    customerName: 'Sarah Johnson',
    email: 'sarah@johnson.com',
    phone: '+1 555-2345',
    tourName: 'Mountain Explorer',
    bookingDate: '2024-01-11',
    travelDate: 'Travel 2024-04-20',
    price: 2200,
    guests: 4,
    status: 'pending',
    statusColor: '#FF9800'
  },
  {
    id: 9,
    customerName: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 555-3456',
    tourName: 'Cultural Heritage Special',
    bookingDate: '2024-01-10',
    travelDate: 'Travel 2024-05-01',
    price: 1950,
    guests: 3,
    status: 'confirmed',
    statusColor: '#4CAF50'
  },
    {
    id: 10,
    customerName: 'Sarah Johnson',
    email: 'sarah@johnson.com',
    phone: '+1 555-2345',
    tourName: 'Mountain Explorer',
    bookingDate: '2024-01-11',
    travelDate: 'Travel 2024-04-20',
    price: 2200,
    guests: 4,
    status: 'pending',
    statusColor: '#FF9800'
  },
  {
    id: 11,
    customerName: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 555-3456',
    tourName: 'Cultural Heritage Special',
    bookingDate: '2024-01-10',
    travelDate: 'Travel 2024-05-01',
    price: 1950,
    guests: 3,
    status: 'confirmed',
    statusColor: '#4CAF50'
  }
];

function BookingsManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

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
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: '#00A79D', 
              fontWeight: 'bold',
              mb: 1,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            Bookings Management
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            View and manage all customer bookings
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'bold',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                minHeight: '48px',
                px: 3,
                py: 1.5,
                mx: 0.5,
                borderRadius: '25px',
                color: '#666',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: '#00A79D',
                },
                '&:not(.Mui-selected):hover': {
                  backgroundColor: '#E0F2F1',
                  color: '#00A79D',
                }
              },
              '& .MuiTabs-indicator': {
                display: 'none'
              }
            }}
          >
            <Tab label="Seasonal Offers" />
            <Tab label="Tour Packages" />
            <Tab label=" Hotel Booking" />
          </Tabs>
        </Box>

        {/* Bookings List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {allBookings.map((booking) => (
            <Card
              key={booking.id}
              sx={{
                borderRadius: '12px',
                bgcolor: 'white',
                border: '1px solid #E0E0E0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                },
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
                        width: 40,
                        height: 40
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 20 }} />
                    </Avatar>

                    {/* Customer Details */}
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: '#333',
                          mb: 0.5,
                          fontSize: '1rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                      >
                        {booking.customerName}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#666',
                            fontSize: '0.85rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          {booking.email}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PhoneIcon sx={{ fontSize: 14, color: '#999' }} />
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: '#999',
                            fontSize: '0.8rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          {booking.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Center - Tour Info */}
                  <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#333',
                        mb: 0.5,
                        fontSize: '0.95rem',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                    >
                      {booking.tourName}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                      <CalendarTodayIcon sx={{ fontSize: 14, color: '#999' }} />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#666',
                          fontSize: '0.8rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                      >
                        {booking.travelDate}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      <PeopleIcon sx={{ fontSize: 14, color: '#999' }} />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#666',
                          fontSize: '0.8rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                      >
                        {booking.guests} guests
                      </Typography>
                    </Box>
                  </Box>

                  {/* Right Side - Price and Status */}
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      flexDirection: isMobile ? 'column' : 'row',
                    }}
                  >
                    {/* Price */}
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '1.1rem',
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

                    {/* More Options */}
                    <IconButton 
                      size="small"
                      sx={{ 
                        color: '#999',
                        '&:hover': {
                          bgcolor: '#f5f5f5'
                        }
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default BookingsManagement;