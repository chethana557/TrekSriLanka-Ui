import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Container,
  Avatar,
  useMediaQuery,
  useTheme,
  Pagination,
  Stack
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Sample contact messages data - all messages combined
const allMessages = [
  {
    id: 1,
    senderName: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1-555-0123',
    subject: 'Tour Package Information',
    message: 'Hi, I am interested in your Golden Isle Adventure tour. Could you please provide more details about the itinerary and what is included in the package? Also, are there any group discounts available for families?',
    receivedDate: '2024-01-22',
    isRead: false,
    isReplied: false
  },
  {
    id: 2,
    senderName: 'Mark Williams',
    email: 'mark.williams@email.com',
    phone: '+1-555-0124',
    subject: 'Seasonal Offer Availability',
    message: 'I saw your winter mountain retreat offer on your website. Is this still available for February dates? What are the cancellation policies?',
    receivedDate: '2024-01-21',
    isRead: true,
    isReplied: true
  },
  {
    id: 3,
    senderName: 'Rachel Green',
    email: 'rachel.green@email.com',
    phone: '+1-555-0125',
    subject: 'Hotel Booking Questions',
    message: 'I need to book accommodation for a business conference. Do you have any hotels near the convention center with meeting room facilities?',
    receivedDate: '2024-01-20',
    isRead: false,
    isReplied: false
  },
  {
    id: 4,
    senderName: 'John Davis',
    email: 'john.davis@email.com',
    phone: '+1-555-0126',
    subject: 'Poor Service Experience',
    message: 'I recently completed your Cultural Heritage Tour and was disappointed with the guide service. The guide seemed unprepared and the tour was rushed. I expected better quality for the price paid.',
    receivedDate: '2024-01-19',
    isRead: true,
    isReplied: false
  },
  {
    id: 5,
    senderName: 'Susan Miller',
    email: 'susan.miller@email.com',
    phone: '+1-555-0127',
    subject: 'Hotel Room Issues',
    message: 'During my stay at Ocean View Resort, the room had several maintenance issues including broken air conditioning and poor WiFi. The front desk was slow to respond to our complaints.',
    receivedDate: '2024-01-18',
    isRead: false,
    isReplied: false
  },
  {
    id: 6,
    senderName: 'Tom Brown',
    email: 'tom.brown@email.com',
    phone: '+1-555-0128',
    subject: 'Billing Discrepancy',
    message: 'I was charged extra fees that were not mentioned during booking. The final amount was significantly higher than quoted. Please review my booking #TR123 and explain these charges.',
    receivedDate: '2024-01-17',
    isRead: true,
    isReplied: true
  },
  {
    id: 7,
    senderName: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1-555-0129',
    subject: 'Booking Modification Request',
    message: 'I need to change my travel dates for booking #TR456. Originally booked for March 15-20, but need to move to March 22-27. Is this possible and are there any fees?',
    receivedDate: '2024-01-16',
    isRead: false,
    isReplied: false
  },
  {
    id: 8,
    senderName: 'David Lee',
    email: 'david.lee@email.com',
    phone: '+1-555-0130',
    subject: 'Payment Processing Help',
    message: 'I am having trouble completing my payment for the Adventure Trek Package. The payment gateway keeps showing an error. Can you help me with this?',
    receivedDate: '2024-01-15',
    isRead: true,
    isReplied: true
  },
  {
    id: 9,
    senderName: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    phone: '+1-555-0131',
    subject: 'Account Access Issues',
    message: 'I cannot log into my account to view my booking details. I have tried resetting my password but did not receive the email. Please assist.',
    receivedDate: '2024-01-14',
    isRead: true,
    isReplied: false
  }
];

function ContactMessagesManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [readStatus, setReadStatus] = useState({});
  const [expandedMessages, setExpandedMessages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(allMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const displayedMessages = allMessages.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markAsRead = (messageId) => {
    setReadStatus(prev => ({
      ...prev,
      [messageId]: true
    }));
  };

  const toggleExpanded = (messageId) => {
    setExpandedMessages(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const isRead = (message) => {
    return readStatus[message.id] !== undefined ? readStatus[message.id] : message.isRead;
  };

  const isExpanded = (messageId) => {
    return expandedMessages[messageId] || false;
  };

  const truncateMessage = (message, length = 120) => {
    return message.length > length ? message.substring(0, length) + '...' : message;
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
            Contact Messages
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            Manage all customer messages and inquiries
          </Typography>
        </Box>

        {/* Message Count */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            Showing {startIndex + 1}-{Math.min(endIndex, allMessages.length)} of {allMessages.length} messages
          </Typography>
        </Box>

        {/* Messages List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          {displayedMessages.map((message) => (
            <Card
              key={message.id}
              sx={{
                borderRadius: '12px',
                bgcolor: 'white',
                border: isRead(message) ? '0.5px solid #00A79D' : '1px solid #E0E0E0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isRead(message) ? 0.9 : 1,
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                },
              }}
            >
              {/* Status Badge */}
              <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1, zIndex: 2 }}>
                {isRead(message) && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      bgcolor: '#00A79D',
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 12 }} />
                    Read
                  </Box>
                )}
              </Box>

              <CardContent sx={{ p: 3, pt: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Top Row - Customer Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                        {message.senderName}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <EmailIcon sx={{ fontSize: 14, color: '#666' }} />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#666',
                              fontSize: '0.85rem',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {message.email}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PhoneIcon sx={{ fontSize: 14, color: '#666' }} />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#666',
                              fontSize: '0.85rem',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {message.phone}
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
                            {message.receivedDate}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Subject */}
                  <Box sx={{ ml: 7 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <MessageIcon sx={{ fontSize: 20 }} />
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: '#333',
                          fontSize: '1rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                      >
                        {message.subject}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Message Content */}
                  <Box sx={{ ml: 7 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#444',
                        lineHeight: 1.6,
                        fontSize: '0.9rem',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        bgcolor: '#f9f9f9',
                        p: 2,
                        borderRadius: '8px',
                        borderLeft: `4px solid #00A79D`
                      }}
                    >
                      {isExpanded(message.id) ? message.message : truncateMessage(message.message)}
                      
                      {message.message.length > 120 && (
                        <Typography
                          component="span"
                          onClick={() => toggleExpanded(message.id)}
                          sx={{
                            color: '#00A79D',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            ml: 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          {isExpanded(message.id) ? (
                            <>Show Less <ExpandLessIcon sx={{ fontSize: 16 }} /></>
                          ) : (
                            <>Show More <ExpandMoreIcon sx={{ fontSize: 16 }} /></>
                          )}
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  {/* Action Button */}
                  <Box sx={{ ml: 7, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {!isRead(message) && (
                      <Typography
                        component="button"
                        onClick={() => markAsRead(message.id)}
                        sx={{
                          color: '#00A79D',
                          bgcolor: 'transparent',
                          border: '2px solid #00A79D',
                          borderRadius: '25px',
                          px: 3,
                          py: 1,
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '0.85rem',
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
                    )}
                  </Box>
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
            Export All Messages
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactMessagesManagement;