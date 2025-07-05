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
  IconButton,
  Rating,
  Pagination,
  Stack,
  Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import TourIcon from '@mui/icons-material/Tour';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Sample feedback data
const allFeedback = {
  seasonal: [
    {
      id: 1,
      customerName: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      offerName: 'Summer Beach Paradise Special',
      feedbackDate: '2024-01-20',
      rating: 5,
      comment: 'Absolutely amazing experience! The summer offer was perfect and the beaches were pristine. Highly recommend this package.',
      category: 'seasonal',
      isRead: false
    },
    {
      id: 2,
      customerName: 'David Thompson',
      email: 'david.t@email.com',
      offerName: 'Winter Mountain Retreat',
      feedbackDate: '2024-01-19',
      rating: 4,
      comment: 'Great winter getaway with excellent skiing facilities. Only minor issue was the check-in process.',
      category: 'seasonal',
      isRead: true
    },
    {
      id: 3,
      customerName: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      offerName: 'Spring Blossom Festival',
      feedbackDate: '2024-01-18',
      rating: 3,
      comment: 'The festival was nice but overcrowded. Expected better crowd management for the price paid.',
      category: 'seasonal',
      isRead: false
    }
  ],
  tours: [
    {
      id: 4,
      customerName: 'Michael Foster',
      email: 'michael.foster@email.com',
      tourName: 'Golden Isle Adventure',
      feedbackDate: '2024-01-17',
      rating: 5,
      comment: 'Incredible tour with knowledgeable guides. The golden isle views were breathtaking and the itinerary was perfect.',
      category: 'tours',
      isRead: true
    },
    {
      id: 5,
      customerName: 'Sarah Mitchell',
      email: 'sarah.mitchell@email.com',
      tourName: 'Cultural Heritage Tour',
      feedbackDate: '2024-01-16',
      rating: 4,
      comment: 'Loved learning about the local culture and history. The guide was fantastic, but lunch options could be improved.',
      category: 'tours',
      isRead: false
    },
    {
      id: 6,
      customerName: 'James Wilson',
      email: 'james.wilson@email.com',
      tourName: 'Adventure Trek Package',
      feedbackDate: '2024-01-15',
      rating: 2,
      comment: 'The trek was too challenging for beginners. Better difficulty level descriptions needed in the booking process.',
      category: 'tours',
      isRead: true
    }
  ],
  hotels: [
    {
      id: 7,
      customerName: 'Anna Johnson',
      email: 'anna.johnson@email.com',
      hotelName: 'Ocean View Resort & Spa',
      feedbackDate: '2024-01-14',
      rating: 5,
      comment: 'Exceptional service and stunning ocean views from our suite. The spa treatments were world-class.',
      category: 'hotels',
      isRead: false
    },
    {
      id: 8,
      customerName: 'Robert Chen',
      email: 'robert.chen@email.com',
      hotelName: 'Mountain Lodge Retreat',
      feedbackDate: '2024-01-13',
      rating: 3,
      comment: 'Beautiful location but room amenities were basic. WiFi connection was poor throughout our stay.',
      category: 'hotels',
      isRead: true
    },
    {
      id: 9,
      customerName: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      hotelName: 'City Center Business Hotel',
      feedbackDate: '2024-01-12',
      rating: 4,
      comment: 'Perfect for business travelers. Great location and efficient service. Room was clean and comfortable.',
      category: 'hotels',
      isRead: false
    }
  ]
};

function FeedbackManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState(0);
  const [readStatus, setReadStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 6;

  const tabs = ['Seasonal Offers', 'Tour Packages', 'Hotel Booking'];
  const tabKeys = ['seasonal', 'tours', 'hotels'];
  const currentFeedback = allFeedback[tabKeys[currentTab]];

  // Calculate pagination
  const totalPages = Math.ceil(currentFeedback.length / feedbackPerPage);
  const startIndex = (currentPage - 1) * feedbackPerPage;
  const endIndex = startIndex + feedbackPerPage;
  const displayedFeedback = currentFeedback.slice(startIndex, endIndex);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markAsRead = (feedbackId) => {
    setReadStatus(prev => ({
      ...prev,
      [feedbackId]: true
    }));
  };

  const isRead = (feedback) => {
    return readStatus[feedback.id] !== undefined ? readStatus[feedback.id] : feedback.isRead;
  };

  const getCategoryIcon = () => {
    switch (currentTab) {
      case 0:
        return <LocalOfferIcon sx={{ fontSize: 20 }} />;
      case 1:
        return <TourIcon sx={{ fontSize: 20 }} />;
      case 2:
        return <HotelIcon sx={{ fontSize: 20 }} />;
      default:
        return <PersonIcon sx={{ fontSize: 20 }} />;
    }
  };

  const getServiceName = (feedback) => {
    switch (feedback.category) {
      case 'seasonal':
        return feedback.offerName;
      case 'tours':
        return feedback.tourName;
      case 'hotels':
        return feedback.hotelName;
      default:
        return 'Service';
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
            Feedback Management
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            Monitor and manage customer feedback across all services
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
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} />
            ))}
          </Tabs>
        </Box>

        {/* Feedback Count */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            Showing {startIndex + 1}-{Math.min(endIndex, currentFeedback.length)} of {currentFeedback.length} feedback entries
          </Typography>
        </Box>

        {/* Feedback List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          {displayedFeedback.map((feedback) => (
            <Card
              key={feedback.id}
              sx={{
                borderRadius: '12px',
                bgcolor: 'white',
                border: isRead(feedback) ? '2px solid #4CAF50' : '1px solid #E0E0E0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isRead(feedback) ? 0.8 : 1,
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                },
              }}
            >
              {/* Done Badge */}
              {isRead(feedback) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: '#00A79D',
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    zIndex: 2
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 16 }} />
                  Read
                </Box>
              )}

              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  {/* Top Row - Customer Info and Rating */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 2
                    }}
                  >
                    {/* Customer Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
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
                          {feedback.customerName}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#666',
                            fontSize: '0.85rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          {feedback.email}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Rating - positioned to avoid overlap with Done badge */}
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        mt: isRead(feedback) ? 5 : 0, // Push down if Done badge is present
                        mr: isRead(feedback) ? 0 : 2
                      }}
                    >
                      <Rating 
                        value={feedback.rating} 
                        readOnly 
                        size="small"
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: '#FFB400',
                          }
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Service Info Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 6 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      bgcolor: '#f5f5f5',
                      px: 2,
                      py: 1,
                      borderRadius: '20px'
                    }}>
                      {getCategoryIcon()}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 'medium',
                          color: '#333',
                          fontSize: '0.9rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                      >
                        {getServiceName(feedback)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarTodayIcon sx={{ fontSize: 14, color: '#999' }} />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#666',
                          fontSize: '0.8rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                      >
                        {feedback.feedbackDate}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Feedback Comment */}
                  <Box sx={{ ml: 6 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#444',
                        lineHeight: 1.6,
                        fontSize: '0.9rem',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontStyle: 'italic',
                        bgcolor: '#f9f9f9',
                        p: 2,
                        borderRadius: '8px',
                        borderLeft: `4px solid #00A79D`
                      }}
                    >
                      "{feedback.comment}"
                    </Typography>
                  </Box>

                  {/* Action Button */}
                  {!isRead(feedback) && (
                    <Box sx={{ ml: 6, mt: 1 }}>
                      <Typography
                        component="button"
                        onClick={() => markAsRead(feedback.id)}
                        sx={{
                          color: '#00A79D',
                          bgcolor: 'transparent',
                          border: '2px solid #00A79D',
                          borderRadius: '25px',
                          px: 3,
                          py: 1,
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          transition: 'all 0.3s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          '&:hover': {
                            bgcolor: '#00A79D',
                            color: 'white',
                            transform: 'translateY(-1px)',
                          }
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: 16 }} />
                        Mark as Read
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#666',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    '&.Mui-selected': {
                      backgroundColor: '#00A79D',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#008B82',
                      },
                    },
                    '&:hover': {
                      backgroundColor: '#E0F2F1',
                    },
                  },
                }}
              />
            </Stack>
          </Box>
        )}

        {/* Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#00A79D',
                color: 'white',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Export All Feedback
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default FeedbackManagement;