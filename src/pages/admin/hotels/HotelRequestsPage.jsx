import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Typography, Paper, Chip, Stack, Divider, Button, CircularProgress, Grid, Card, CardMedia, CardContent, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Container, Tabs, Tab } from '@mui/material';
import { ZoomIn, Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx';
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx';
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';
import { BASE_URL } from '../../../api';

function HotelRequestsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hotels, setHotels] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageList, setCurrentImageList] = useState([]);
  const [activeSection, setActiveSection] = useState('pending');
  
  // Rejection dialog state
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [hotelToReject, setHotelToReject] = useState(null);

  const sections = {
    pending: {
      label: 'Pending Requests',
      query: '?is_active=pending&is_verified=pending',
      emptyText: 'No pending hotel requests found.'
    },
    verified: {
      label: 'Approved Listings',
      query: '?is_active=pending&is_verified=true',
      emptyText: 'No approved listings found.'
    },
    active: {
      label: 'Published Listings',
      query: '?is_active=true&is_verified=true',
      emptyText: 'No published listings found.'
    },
    rejected: {
      label: 'Rejected Listings',
      query: '?is_active=false&is_verified=false',
      emptyText: 'No rejected listings found.'
    }
  };

  const fetchHotels = async (sectionKey = activeSection) => {
    setLoading(true);
    setError('');
    try {
      const url = `${BASE_URL}/hotels/${sections[sectionKey].query}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch hotel requests');
      }
      const data = await res.json();
      const list = Array.isArray(data.hotels) ? data.hotels : (Array.isArray(data) ? data : []);
      setHotels(list);
    } catch (e) {
      setError(e.message || 'Unable to load hotel requests');
    } finally {
      setLoading(false);
    }
  };

  const callAction = async (hotelId, action) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      let requestBody = {};
      let url = `${BASE_URL}/hotels/${hotelId}/${action}`;
      
      // Handle rejection with reason
      if (action === 'reject') {
        if (!rejectionReason.trim()) {
          setError('Please provide a reason for rejection');
          return;
        }
        requestBody = { reason: rejectionReason.trim() };
      }

      const res = await fetch(url, { 
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: Object.keys(requestBody).length > 0 ? JSON.stringify(requestBody) : undefined
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Action failed');
      }
      
      // Close rejection dialog if it was open
      if (action === 'reject') {
        setRejectionDialogOpen(false);
        setRejectionReason('');
        setHotelToReject(null);
      }
      
      await fetchHotels(activeSection);
    } catch (e) {
      setError(e.message || 'Action failed');
    }
  };

  useEffect(() => {
    fetchHotels(activeSection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  const openImageModal = (images, startIndex = 0) => {
    setCurrentImageList(images);
    setCurrentImageIndex(startIndex);
    setSelectedImage(images[startIndex]);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % currentImageList.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(currentImageList[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(currentImageList[prevIndex]);
  };

  const openRejectionDialog = (hotel) => {
    setHotelToReject(hotel);
    setRejectionReason('');
    setRejectionDialogOpen(true);
  };

  const closeRejectionDialog = () => {
    setRejectionDialogOpen(false);
    setRejectionReason('');
    setHotelToReject(null);
  };

  const handleReject = () => {
    if (hotelToReject) {
      callAction(hotelToReject.hotel_id, 'reject');
    }
  };

  const ImageGallery = ({ images, title, maxDisplay = 4 }) => {
    if (!images || images.length === 0) {
      return (
        <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body2">No {title.toLowerCase()} available</Typography>
        </Box>
      );
    }

    const displayImages = images.slice(0, maxDisplay);
    const remainingCount = images.length - maxDisplay;

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#00A79D' }}>
          {title} ({images.length})
        </Typography>
        <Grid container spacing={1}>
          {displayImages.map((image, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  height: 120,
                  borderRadius: 1,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': {
                    '& .image-overlay': {
                      opacity: 1,
                    },
                  },
                }}
                onClick={() => openImageModal(images, index)}
              >
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="image-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <ZoomIn sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                {index === maxDisplay - 1 && remainingCount > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    +{remainingCount} more
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const RoomTypesSection = ({ roomTypes }) => {
    if (!roomTypes || roomTypes.length === 0) {
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#00A79D' }}>
            Room Types (0)
          </Typography>
          <Typography variant="body2" color="text.secondary">No room types available</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#00A79D' }}>
          Room Types ({roomTypes.length})
        </Typography>
        <Stack spacing={2}>
          {roomTypes.map((room, index) => (
            <Card key={index} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {room.room_name}
                </Typography>
                <Chip 
                  size="small" 
                  label={`$${room.price_per_night}/night`}
                  sx={{ bgcolor: '#00A79D', color: 'white' }}
                />
              </Box>
              
              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={6} sm={3}>
                  <Chip size="small" label={`${room.bed_count} beds`} variant="outlined" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Chip size="small" label={`${room.guest_count} guests`} variant="outlined" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Chip size="small" label={`${room.room_count} rooms`} variant="outlined" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Chip size="small" label={`${room.room_size} sq ft`} variant="outlined" />
                </Grid>
              </Grid>

              {room.room_photo && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                    Room Photo:
                  </Typography>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 150,
                      width: 200,
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      '&:hover': {
                        '& .image-overlay': {
                          opacity: 1,
                        },
                      },
                    }}
                    onClick={() => openImageModal([room.room_photo], 0)}
                  >
                    <img
                      src={room.room_photo}
                      alt={`${room.room_name} photo`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      className="image-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      <ZoomIn sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                  </Box>
                </Box>
              )}

              {room.available_facilities && room.available_facilities.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                    Facilities:
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
                    {room.available_facilities.map((facility, fIndex) => (
                      <Chip 
                        key={fIndex} 
                        size="small" 
                        label={facility.name}
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Card>
          ))}
        </Stack>
      </Box>
    );
  };

  return (
    <Box>
      <CssBaseline />
      <AdminNavBar />

      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
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
                Hotel Requests
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
              >
                Review and manage hotel listings across their lifecycle
              </Typography>
            </Box>
          </Box>

          {/* Tabs styled like FeedbackManagement */}
          <Box sx={{ mb: 3 }}>
            <Tabs
              value={['pending','verified','active','rejected'].indexOf(activeSection)}
              onChange={(e, idx) => setActiveSection(['pending','verified','active','rejected'][idx])}
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
              <Tab label={sections.pending.label} />
              <Tab label={sections.verified.label} />
              <Tab label={sections.active.label} />
              <Tab label={sections.rejected.label} />
            </Tabs>
          </Box>

          {/* Count line */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              {hotels.length > 0 ? `Showing 1-${hotels.length} of ${hotels.length} entries` : 'Showing 0 entries'}
            </Typography>
          </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Paper sx={{ p: 2, mb: 2, border: '1px solid #ffe0e0', bgcolor: '#fff5f5' }}>
            <Typography color="error">{error}</Typography>
          </Paper>
        )}

        {!loading && !error && hotels.length === 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography>{sections[activeSection].emptyText}</Typography>
          </Paper>
        )}

        <Stack spacing={3}>
          {hotels.map((h) => (
            <Paper key={h.hotel_id} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{h.hotel_name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{h.hotel_address}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                    <Chip size="small" label={`City: ${h.city || 'N/A'}`} />
                    <Chip size="small" color={h.is_active ? 'success' : 'default'} label={`Active: ${String(h.is_active)}`} />
                    <Chip size="small" color={h.is_verified ? 'success' : 'default'} label={`Verified: ${String(h.is_verified)}`} />
                    <Chip size="small" label={`Rooms: ${h.total_room_types ?? 0}`} />
                    {h.accommodation_type && (
                      <Chip size="small" label={h.accommodation_type} color="primary" variant="outlined" />
                    )}
                    {h.price_range?.has_pricing && (
                      <Chip size="small" label={`Price: ${h.price_range.min_price} - ${h.price_range.max_price} ${h.price_range.currency}`} />
                    )}
                  </Stack>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {h.hotel_description?.slice(0, 300) || 'No description provided.'}
                    {h.hotel_description && h.hotel_description.length > 300 ? '…' : ''}
                  </Typography>
                </Box>
                {/* Right side kept empty to avoid top-right actions; actions moved to bottom */}
              </Box>

              {/* Hotel Photos Gallery */}
              <ImageGallery images={h.hotel_photos || []} title="Hotel Photos" />

              {/* Room Types Section */}
              <RoomTypesSection roomTypes={h.room_types || []} />

              <Divider sx={{ my: 2 }} />
              
              {/* Popular Facilities */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#00A79D' }}>
                  Popular Facilities ({h.most_popular_facilities?.length || 0})
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                  {(h.most_popular_facilities || []).map((f, idx) => (
                    <Chip key={idx} size="small" label={`${f.icon ? f.icon + ' ' : ''}${f.name}`} />
                  ))}
                </Stack>
              </Box>

              {/* Additional & Restricted Services */}
              {(h.additional_services?.length || h.restricted_services?.length) && (
                <Box sx={{ mt: 3, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {h.additional_services?.length > 0 && (
                    <Box sx={{ flex: 1, minWidth: 240 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#00A79D' }}>
                        Additional Services ({h.additional_services.length})
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                        {h.additional_services.map((s, i) => (
                          <Chip key={i} size="small" label={s} variant="outlined" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                  {h.restricted_services?.length > 0 && (
                    <Box sx={{ flex: 1, minWidth: 240 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#d32f2f' }}>
                        Restricted Services ({h.restricted_services.length})
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                        {h.restricted_services.map((s, i) => (
                          <Chip key={i} size="small" label={s} color="error" variant="outlined" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Box>
              )}
              
              {/* Rejection Information - Show only for rejected hotels */}
              {h.rejection_reason && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#e53e3e' }}>
                    Rejection Details
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                    <strong>Reason:</strong> {h.rejection_reason}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>Rejected by:</strong> {h.rejected_by || 'Unknown'} 
                    {h.rejected_at && (
                      <span> on {new Date(h.rejected_at).toLocaleDateString()}</span>
                    )}
                  </Typography>
                </Box>
              )}
{/* Actions - bottom right inline */}
{(h.is_active === 'pending' && h.is_verified === 'pending') && (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
    <Button 
      variant="contained" 
      sx={{ bgcolor: '#4AB9B0', borderRadius: '25px' }}
      onClick={() => callAction(h.hotel_id, 'verify')}
    >
      Approve
    </Button>
    <Button 
      variant="outlined" 
      color="error" 
      sx={{ borderRadius: '25px' }}
      onClick={() => openRejectionDialog(h)}
    >
      Reject
    </Button>
  </Box>
)}
{(h.is_active === 'pending' && h.is_verified === true) && (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
    <Button 
      variant="contained" 
      sx={{ bgcolor: '#4AB9B0', borderRadius: '25px' }}
      onClick={() => callAction(h.hotel_id, 'activate')}
    >
      Publish
    </Button>
  </Box>
)}
{(h.is_active === true && h.is_verified === true) && (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
    <Button 
      variant="outlined" 
      color="error"
      sx={{ borderRadius: '25px' }}
      onClick={() => callAction(h.hotel_id, 'hide')}
    >
      Unpublish
    </Button>
  </Box>
)}

            </Paper>
          ))}
        </Stack>
        </Container>
      </Box>

      {/* Image Modal */}
      <Dialog
        open={imageModalOpen}
        onClose={closeImageModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', minHeight: '70vh' }}>
          <IconButton
            onClick={closeImageModal}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              zIndex: 1,
            }}
          >
            <Close />
          </IconButton>
          
          {currentImageList.length > 1 && (
            <>
              <IconButton
                onClick={prevImage}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  zIndex: 1,
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={nextImage}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  zIndex: 1,
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}
          
          {selectedImage && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70vh',
                p: 2,
              }}
            >
              <img
                src={selectedImage}
                alt="Hotel"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          )}
          
          {currentImageList.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                px: 2,
                py: 1,
                borderRadius: 1,
              }}
            >
              {currentImageIndex + 1} / {currentImageList.length}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog
        open={rejectionDialogOpen}
        onClose={closeRejectionDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: '#00A79D', fontWeight: 'bold' }}>
          Reject Hotel Listing
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Please provide a reason for rejecting "{hotelToReject?.hotel_name}" listing.
          </Typography>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Rejection Reason"
            placeholder="Enter the reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#00A79D',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00A79D',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={closeRejectionDialog}
            variant="outlined"
            sx={{ borderRadius: '25px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleReject}
            variant="contained"
            color="error"
            disabled={!rejectionReason.trim()}
            sx={{ 
              borderRadius: '25px',
              bgcolor: '#d32f2f',
              '&:hover': {
                bgcolor: '#b71c1c',
              }
            }}
          >
            Reject Hotel
          </Button>
        </DialogActions>
      </Dialog>

      <ChatbotWidget />
      <Footer_Combination />
    </Box>
  );
}

export default HotelRequestsPage;
