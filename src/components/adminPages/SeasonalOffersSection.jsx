import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Button,
  Chip,
  Tabs,
  Tab,
  Snackbar,
  Alert
} from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack } from '@mui/material';
import { 
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as PublishIcon,
  CloudOff as UnpublishIcon
} from '@mui/icons-material';
import { BASE_URL } from '../../api';

// Data will be fetched from backend

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return '#00A79D';
    case 'Ending Soon':
      return '#FF9800';
    case 'Inactive':
      return '#F44336';
    default:
      return '#F44336';
  }
};

const getStatusBgColor = (status) => {
  switch (status) {
    case 'Active':
      return '#E0F2F1';
    case 'Ending Soon':
      return '#FFF3E0';
    case 'Inactive':
      return '#FFEBEE';
    default:
      return '#FFEBEE';
  }
};

function SeasonalOffersSection() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
        const res = await fetch(`${base}/seasonal-offers/`);
        if (!res.ok) throw new Error('Failed to load offers');
        const data = await res.json();
        setOffers(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || 'Failed to load offers');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [form, setForm] = useState({
    title: '',
    locations: '',
    day_count: '',
    package_price: '',
    valid_date: '',
    off_percentage: ''
  });

  const handleAddNewOffer = () => navigate('/admin/seasonal-offers/add');
  const handleClose = () => setOpen(false);
  const handleEditClose = () => {
    setEditOpen(false);
    setEditingOffer(null);
    setForm({
      title: '',
      locations: '',
      day_count: '',
      package_price: '',
      valid_date: '',
      off_percentage: ''
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };



  const canSubmit = () => {
    return (
      form.title.trim() &&
      form.locations.trim() &&
      Number(form.day_count) > 0 &&
      Number(form.package_price) >= 0 &&
      form.valid_date &&
      Number(form.off_percentage) >= 0 && Number(form.off_percentage) <= 100
    );
  };

  const submitOffer = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return alert('Please login');
    try {
      const payload = {
        title: form.title.trim(),
        locations: form.locations.split(',').map(s => s.trim()).filter(Boolean),
        day_count: Number(form.day_count),
        package_price: Number(form.package_price),
        valid_date: form.valid_date,
        off_percentage: Number(form.off_percentage),
        status: 'pending'
      };
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/v1/seasonal-offers/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to create offer');
      setOpen(false);
      setForm({ title: '', locations: '', day_count: '', package_price: '', valid_date: '', off_percentage: '', newPhotos: [] });
      // Optionally refresh list later when wired to backend list
    } catch (e) {
      alert(e.message);
    }
  };

  const handleView = (offer) => {
    console.log('View offer:', offer);
  };

  const handleEdit = async (offer) => {
    try {
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const res = await fetch(`${base}/seasonal-offers/${offer._id}`);
      if (!res.ok) throw new Error('Failed to fetch offer details');
      const offerData = await res.json();
      
      setEditingOffer(offerData);
      setForm({
        title: offerData.title || '',
        locations: Array.isArray(offerData.locations) ? offerData.locations.join(', ') : '',
        day_count: offerData.day_count || '',
        package_price: offerData.package_price || '',
        valid_date: offerData.valid_date ? offerData.valid_date.slice(0, 10) : '',
        off_percentage: offerData.off_percentage || ''
      });
      setEditOpen(true);
    } catch (e) {
      setSnackbar({ 
        open: true, 
        message: e.message || 'Failed to fetch offer details', 
        severity: 'error' 
      });
    }
  };

  const handleUpdateOffer = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setSnackbar({ open: true, message: 'Please login to perform this action', severity: 'error' });
      return;
    }

    try {
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      
      // Create JSON payload for the update
      const payload = {
        title: form.title.trim(),
        locations: form.locations.trim(),
        day_count: Number(form.day_count),
        package_price: Number(form.package_price),
        valid_date: form.valid_date,
        off_percentage: Number(form.off_percentage)
      };

      const res = await fetch(`${base}/seasonal-offers/${editingOffer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to update offer');
      }

      const result = await res.json();
      
      // Update the local state
      setOffers(prevOffers => 
        prevOffers.map(o => 
          o._id === editingOffer._id 
            ? { 
                ...o, 
                title: form.title.trim(),
                locations: form.locations.split(',').map(s => s.trim()).filter(Boolean),
                day_count: Number(form.day_count),
                package_price: Number(form.package_price),
                valid_date: form.valid_date,
                off_percentage: Number(form.off_percentage)
              }
            : o
        )
      );

      setSnackbar({ 
        open: true, 
        message: result.message || 'Offer updated successfully', 
        severity: 'success' 
      });
      
      handleEditClose();
    } catch (e) {
      setSnackbar({ 
        open: true, 
        message: e.message || 'Failed to update offer', 
        severity: 'error' 
      });
    }
  };

  const handleDelete = (offer) => {
    (async () => {
      if (!window.confirm(`Are you sure you want to delete "${offer.title}"?`)) return;
      const token = localStorage.getItem('access_token');
      if (!token) {
        setSnackbar({ open: true, message: 'Please login to perform this action', severity: 'error' });
        return;
      }

      try {
        const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
        const res = await fetch(`${base}/seasonal-offers/${offer._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.detail || 'Failed to delete offer');
        }

        // remove from local state
        setOffers(prev => prev.filter(o => (o._id || o.seasonal_id) !== (offer._id || offer.seasonal_id)));
        setSnackbar({ open: true, message: 'Offer deleted successfully', severity: 'success' });
      } catch (e) {
        setSnackbar({ open: true, message: e.message || 'Failed to delete offer', severity: 'error' });
      }
    })();
  };

  const handlePublishOffer = async (offer) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setSnackbar({ open: true, message: 'Please login to perform this action', severity: 'error' });
      return;
    }

    try {
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const endpoint = offer.status === 'Active' ? 'unpublish' : 'publish';
      const res = await fetch(`${base}/seasonal-offers/${offer._id}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || `Failed to ${endpoint} offer`);
      }

      const result = await res.json();
      
      // Update the local state
      setOffers(prevOffers => 
        prevOffers.map(o => 
          o._id === offer._id 
            ? { ...o, status: result.status }
            : o
        )
      );

      setSnackbar({ 
        open: true, 
        message: result.message || `Offer ${endpoint}ed successfully`, 
        severity: 'success' 
      });
    } catch (e) {
      setSnackbar({ 
        open: true, 
        message: e.message || `Failed to ${offer.status === 'Active' ? 'unpublish' : 'publish'} offer`, 
        severity: 'error' 
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getFilteredOffers = () => {
    const statusOf = (s) => (s || '').toString().toLowerCase();
    switch (activeTab) {
      case 0: { // Inactive
        // Include 'inactive' and 'pending' (fallbacks show here too)
        return offers.filter(offer => {
          const st = statusOf(offer.status);
          return st === 'inactive' || st === 'pending' || st === '';
        });
      }
      case 1: // Published
        return offers.filter(offer => statusOf(offer.status) === 'active');
      default:
        return offers;
    }
  };

  const getTabLabel = (index) => {
    switch (index) {
      case 0:
        return 'Inactive Listings';
      case 1:
        return 'Published Listings';
      default:
        return '';
    }
  };

  const filteredOffers = getFilteredOffers();

  const getPublishButton = (offer) => {
    const isActive = offer.status === 'Active';
    const buttonText = isActive ? 'Unpublish' : 'Publish';
    const buttonIcon = isActive ? <UnpublishIcon /> : <PublishIcon />;
    const buttonColor = isActive ? '#F44336' : '#00A79D';
    const buttonBorderColor = isActive ? '#F44336' : '#00A79D';

    return (
      <Button
        variant="outlined"
        size="small"
        startIcon={buttonIcon}
        onClick={() => handlePublishOffer(offer)}
        sx={{
          borderColor: buttonBorderColor,
          color: buttonColor,
          textTransform: 'none',
          borderRadius: '20px',
          flex: 1,
          '&:hover': {
            borderColor: isActive ? '#D32F2F' : '#008A82',
            bgcolor: isActive ? 'rgba(244, 67, 54, 0.04)' : 'rgba(0, 167, 157, 0.04)'
          }
        }}
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: '#00A79D',
                fontWeight: 'bold',
                mb: 1,
                fontSize: '2.5rem'
              }}
            >
              Seasonal Offers Management
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontSize: '1.1rem'
              }}
            >
              Review and manage seasonal offers across their lifecycle
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            onClick={handleAddNewOffer}
            sx={{
              bgcolor: '#00A79D',
              color: 'white',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              '&:hover': {
                bgcolor: '#008A82'
              }
            }}
          >
            + Add New Offer
          </Button>
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
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
            <Tab label="Inactive Listings" />
            <Tab label="Published Listings" />
          </Tabs>
        </Box>

        {loading && (
          <Box sx={{ textAlign: 'center', color: '#666', py: 4 }}>Loading offers...</Box>
        )}
        {error && (
          <Box sx={{ textAlign: 'center', color: 'error.main', py: 2 }}>{error}</Box>
        )}
        {!loading && !error && filteredOffers.length === 0 && (
          <Box sx={{ textAlign: 'center', color: '#666', py: 4 }}>
            No {getTabLabel(activeTab).toLowerCase()} found.
          </Box>
        )}

        {/* Entries Count */}
        {!loading && !error && (
          <Box sx={{ mb: 3, color: '#666', fontSize: '0.9rem' }}>
            Showing {filteredOffers.length} entries
          </Box>
        )}

        {/* Offers Grid */}
        <Grid container spacing={3} flex-start>
          {filteredOffers.map((offer) => {
            const firstImage = Array.isArray(offer.photos) && offer.photos.length > 0 ? offer.photos[0] : '';
            const statusLabel = (offer.status || '').toString();
            const priceLabel = `$${offer.package_price}`;
            const durationLabel = `${offer.day_count} days`;
            const validUntil = (offer.valid_date || '').toString().slice(0, 10);
            const discountLabel = `${offer.off_percentage}% off`;
            const locs = Array.isArray(offer.locations) ? offer.locations : [];
            return (
            <Grid item key={offer._id || offer.seasonal_id} sx={{ width: 320, flexGrow: 0 }}>
              <Card 
                sx={{ 
                  height: 520,
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  },
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Status Badge */}
                <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                  <Chip
                    label={offer.status}
                    size="small"
                    sx={{
                      bgcolor: getStatusBgColor(offer.status),
                      color: getStatusColor(offer.status),
                      fontWeight: 'bold',
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>

                {/* Discount Badge */}
                <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                  <Chip
                    label={discountLabel}
                    size="small"
                    sx={{
                      bgcolor: '#FF5722',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>

                {/* Offer Image */}
                <CardMedia
                  component="img"
                  height="250"
                  image={firstImage}
                  alt={offer.title || ''}
                  sx={{ objectFit: 'cover', flexShrink: 0 }}
                />

                {/* Offer Details */}
                <CardContent sx={{ 
                  p: 3, 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1.4rem',
                        mb: 0.1,
                     
                        color: '#333',
                        minHeight: '3.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                      title={offer.title || ''}
                    >
                      {(offer.title || '').length > 25 ? offer.title.substring(0, 22) + '...' : (offer.title || '')}
                    </Typography>

                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.1, minHeight: '1.5rem' }}>
                      <LocationOnIcon sx={{ color: '#00A79D', mr: 1, fontSize: '1.2rem' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#666',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {(() => {
                          if (!locs || locs.length === 0) {
                            return 'N/A';
                          }
                          if (locs.length <= 2) {
                            return locs.join(', ');
                          } else {
                            const firstTwo = locs.slice(0, 2);
                            const remaining = locs.length - 2;
                            return `${firstTwo.join(', ')}, +${remaining} more`;
                          }
                        })()}
                      </Typography>
                    </Box>

                    {/* Duration */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.1, minHeight: '1.5rem' }}>
                      <CalendarIcon sx={{ color: '#00A79D', mr: 1, fontSize: '1.2rem' }} />
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {durationLabel}
                      </Typography>
                    </Box>

                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.1, minHeight: '2rem' }}>
                      <MoneyIcon sx={{ color: '#00A79D', mr: 1, fontSize: '1.2rem' }} />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#333',
                          fontWeight: 'bold'
                        }}
                      >
                        {priceLabel}
                      </Typography>
                    </Box>

                    {/* Valid Until */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#999',
                        fontSize: '0.9rem',
                        mb: 3,
                        minHeight: '1.2rem'
                      }}
                    >
                      Valid until {validUntil}
                    </Typography>
                  </Box>

                  {/* Action Buttons - Always at bottom */}
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    {getPublishButton(offer)}
                    {offer.status !== 'Active' && (
                      <>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEdit(offer)}
                          sx={{
                            borderColor: '#00A79D',
                            color: '#00A79D',
                            textTransform: 'none',
                            borderRadius: '20px',
                            flex: 1,
                            '&:hover': {
                              borderColor: '#008A82',
                              bgcolor: 'rgba(0, 167, 157, 0.04)'
                            }
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDelete(offer)}
                          sx={{
                            borderColor: '#F44336',
                            color: '#F44336',
                            textTransform: 'none',
                            borderRadius: '20px',
                            minWidth: '40px',
                            width: '40px',
                            height: '32px',
                            padding: 0,
                            '&:hover': {
                              borderColor: '#D32F2F',
                              bgcolor: 'rgba(244, 67, 54, 0.04)'
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            );
          })}
        </Grid>
        
        {/* Add Offer Dialog */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ color: '#00A79D', fontWeight: 'bold' }}>Add New Seasonal Offer</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField name="title" label="Offer Title" value={form.title} onChange={onChange} required />
              <TextField name="locations" label="Locations (comma separated)" value={form.locations} onChange={onChange} required />
              <TextField name="day_count" type="number" label="Day Count" value={form.day_count} onChange={onChange} required />
              <TextField name="package_price" type="number" label="Package Price" value={form.package_price} onChange={onChange} required />
              <TextField name="valid_date" type="date" label="Valid Date" value={form.valid_date} onChange={onChange} InputLabelProps={{ shrink: true }} required />
              <TextField name="off_percentage" type="number" label="Off Percentage" value={form.off_percentage} onChange={onChange} required />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" sx={{ bgcolor: '#00A79D' }} disabled={!canSubmit()} onClick={submitOffer}>Create Offer</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Offer Dialog */}
        <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="md">
          <DialogTitle sx={{ color: '#00A79D', fontWeight: 'bold' }}>Edit Seasonal Offer</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              {/* Basic Fields */}
              <TextField name="title" label="Offer Title" value={form.title} onChange={onChange} required />
              <TextField name="locations" label="Locations (comma separated)" value={form.locations} onChange={onChange} required />
              <TextField name="day_count" type="number" label="Day Count" value={form.day_count} onChange={onChange} required />
              <TextField name="package_price" type="number" label="Package Price" value={form.package_price} onChange={onChange} required />
              <TextField name="valid_date" type="date" label="Valid Date" value={form.valid_date} onChange={onChange} InputLabelProps={{ shrink: true }} required />
              <TextField name="off_percentage" type="number" label="Off Percentage" value={form.off_percentage} onChange={onChange} required />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button variant="contained" sx={{ bgcolor: '#00A79D' }} disabled={!canSubmit()} onClick={handleUpdateOffer}>Update Offer</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default SeasonalOffersSection;