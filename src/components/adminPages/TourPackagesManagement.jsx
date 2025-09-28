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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from '@mui/material';
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

// Import your images (you'll need to add these to your assets)
import sigiriyaImg from '../../assets/common/sigiriya.png';
import ellaImg from '../../assets/common/ella.png';
import mirissaImg from '../../assets/common//mirissa.png';

const getTourTypeColor = (tourType) => {
  switch (tourType) {
    case 'Cultural':
      return '#8E24AA';
    case 'Adventure':
      return '#FF6F00';
    case 'Beach & Relaxation':
      return '#0277BD';
    case 'Wildlife Safari':
      return '#388E3C';
    case 'City Tours':
      return '#00A79D';
    case 'Mountain Trekking':
      return '#795548';
    case 'Food & Wine':
      return '#E91E63';
    case 'Photography':
      return '#9C27B0';
    case 'Historical':
      return '#607D8B';
    case 'Eco Tours':
      return '#4CAF50';
    default:
      return '#00A79D';
  }
};

const getStatusBgColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return '#E8F5E8';
    case 'inactive':
      return '#FFEBEE';
    case 'pending':
      return '#FFF3E0';
    default:
      return '#F5F5F5';
  }
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return '#2E7D32';
    case 'inactive':
      return '#C62828';
    case 'pending':
      return '#EF6C00';
    default:
      return '#666';
  }
};

function TourPackagesManagement() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editOpen, setEditOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [form, setForm] = useState({
    title: '',
    tour_type: '',
    locations: '',
    day_count: '',
    price_per_person: '',
    package_price: ''
  });

  const canSubmit = () => {
    return (
      form.title && form.title.trim() &&
      form.locations && form.locations.trim() &&
      Number(form.day_count) > 0 &&
      Number(form.package_price) >= 0
    );
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
        const res = await fetch(`${base}/tour-packages/`);
        if (!res.ok) throw new Error('Failed to load packages');
        const data = await res.json();
        setPackages(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || 'Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddNewPackage = () => navigate('/admin/tour-packages/add');

  const handleView = (pkg) => {
    console.log('View package:', pkg);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleEdit = async (pkg) => {
    try {
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const res = await fetch(`${base}/tour-packages/${pkg._id}`);
      if (!res.ok) throw new Error('Failed to fetch package details');
      const data = await res.json();
      setEditingPackage(data);
      setForm({
        title: data.title || '',
        tour_type: data.tour_type || '',
        locations: Array.isArray(data.locations) ? data.locations.join(', ') : (data.locations || ''),
        day_count: data.day_count || '',
        price_per_person: data.price_per_person || '',
        package_price: data.package_price || ''
      });
      setEditOpen(true);
    } catch (e) {
      setSnackbar({ open: true, message: e.message || 'Failed to fetch package details', severity: 'error' });
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingPackage(null);
    setForm({ title: '', tour_type: '', locations: '', day_count: '', price_per_person: '', package_price: '' });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setSnackbar({ open: true, message: 'Please login to perform this action', severity: 'error' });
      return;
    }

    try {
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const payload = {
        title: form.title,
        tour_type: form.tour_type,
        locations: form.locations,
        day_count: Number(form.day_count),
        price_per_person: Number(form.price_per_person),
        package_price: Number(form.package_price)
      };

      const res = await fetch(`${base}/tour-packages/${editingPackage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to update package');
      }

      // update local state
      setPackages(prev => prev.map(p => p._id === editingPackage._id ? { ...p, ...{
        title: payload.title,
        tour_type: payload.tour_type,
        locations: payload.locations.split(',').map(s => s.trim()).filter(Boolean),
        day_count: payload.day_count,
        price_per_person: payload.price_per_person,
        package_price: payload.package_price
      } } : p));

      setSnackbar({ open: true, message: 'Package updated successfully', severity: 'success' });
      handleEditClose();
    } catch (e) {
      setSnackbar({ open: true, message: e.message || 'Failed to update package', severity: 'error' });
    }
  };

  const handleDelete = (pkg) => {
    (async () => {
      if (!window.confirm(`Are you sure you want to delete "${pkg.title}"?`)) return;
      const token = localStorage.getItem('access_token');
      if (!token) {
        setSnackbar({ open: true, message: 'Please login to perform this action', severity: 'error' });
        return;
      }

      try {
        const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
        const res = await fetch(`${base}/tour-packages/${pkg._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.detail || 'Failed to delete package');
        }

        setPackages(prev => prev.filter(p => p._id !== pkg._id));
        setSnackbar({ open: true, message: 'Package deleted successfully', severity: 'success' });
      } catch (e) {
        setSnackbar({ open: true, message: e.message || 'Failed to delete package', severity: 'error' });
      }
    })();
  };

  const handlePublishPackage = async (pkg) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setSnackbar({ open: true, message: 'Please login to perform this action', severity: 'error' });
      return;
    }

    try {
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const endpoint = pkg.status === 'Active' ? 'unpublish' : 'publish';
      const res = await fetch(`${base}/tour-packages/${pkg._id}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || `Failed to ${endpoint} package`);
      }

      const result = await res.json();
      
      // Update the local state
      setPackages(prevPackages => 
        prevPackages.map(p => 
          p._id === pkg._id 
            ? { ...p, status: result.status }
            : p
        )
      );

      setSnackbar({ 
        open: true, 
        message: result.message || `Package ${endpoint}ed successfully`, 
        severity: 'success' 
      });
    } catch (e) {
      setSnackbar({ 
        open: true, 
        message: e.message || `Failed to ${pkg.status === 'Active' ? 'unpublish' : 'publish'} package`, 
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

  const getFilteredPackages = () => {
    switch (activeTab) {
      case 0: // Inactive
        return packages.filter(pkg => pkg.status?.toLowerCase() === 'inactive');
      case 1: // Published
        return packages.filter(pkg => pkg.status?.toLowerCase() === 'active');
      default:
        return packages;
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

  const filteredPackages = getFilteredPackages();

  const getPublishButton = (pkg) => {
    const isActive = pkg.status === 'Active';
    const buttonText = isActive ? 'Unpublish' : 'Publish';
    const buttonIcon = isActive ? <UnpublishIcon /> : <PublishIcon />;
    const buttonColor = isActive ? '#F44336' : '#00A79D';
    const buttonBorderColor = isActive ? '#F44336' : '#00A79D';

    return (
      <Button
        variant="outlined"
        size="small"
        startIcon={buttonIcon}
        onClick={() => handlePublishPackage(pkg)}
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
              Tour Packages Management
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontSize: '1.1rem'
              }}
            >
              Review and manage tour packages across their lifecycle
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            onClick={handleAddNewPackage}
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
            + Add New Package
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
          <Box sx={{ textAlign: 'center', color: '#666', py: 4 }}>Loading packages...</Box>
        )}
        {error && (
          <Box sx={{ textAlign: 'center', color: 'error.main', py: 2 }}>{error}</Box>
        )}
        {!loading && !error && filteredPackages.length === 0 && (
          <Box sx={{ textAlign: 'center', color: '#666', py: 4 }}>
            No {getTabLabel(activeTab).toLowerCase()} found.
          </Box>
        )}

        {/* Entries Count */}
        {!loading && !error && (
          <Box sx={{ mb: 3, color: '#666', fontSize: '0.9rem' }}>
            Showing {filteredPackages.length} entries
          </Box>
        )}

        {/* Packages Grid */}
        <Grid container spacing={3} flex-start>
          {filteredPackages.map((pkg) => {
            const priceLabel = `$${pkg.package_price}`; // stored in USD already
            const durationLabel = `${pkg.day_count} days`;
            const pricePerPersonLabel = `$${pkg.price_per_person} per person`;
            const locs = Array.isArray(pkg.locations) ? pkg.locations : [];
            return (
              <Grid item key={pkg._id} sx={{ width: 320, flexGrow: 0 }}>
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
                      label={pkg.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusBgColor(pkg.status),
                        color: getStatusColor(pkg.status),
                        fontWeight: 'bold',
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>

                  {/* Tour Type Badge */}
                  <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                    <Chip
                      label={pkg.tour_type}
                      size="small"
                      sx={{
                        bgcolor: getTourTypeColor(pkg.tour_type),
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>

                  {/* Package Image */}
                  <CardMedia
                    component="img"
                    height="250"
                    image={pkg.photo || sigiriyaImg}
                    alt={pkg.title || ''}
                    sx={{ objectFit: 'cover', flexShrink: 0 }}
                  />

                  {/* Package Details */}
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
                        title={pkg.title || ''}
                      >
                        {(pkg.title || '').length > 25 ? pkg.title.substring(0, 22) + '...' : (pkg.title || '')}
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

                      {/* Price Per Person */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.1, minHeight: '1.5rem' }}>
                        <MoneyIcon sx={{ color: '#00A79D', mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {pricePerPersonLabel}
                        </Typography>
                      </Box>

                      {/* Package Price */}
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
                    </Box>

                    {/* Action Buttons - Always at bottom */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                      {getPublishButton(pkg)}
                      {pkg.status !== 'Active' && (
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(pkg)}
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
                            onClick={() => handleDelete(pkg)}
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
        {/* Edit Package Dialog */}
    <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="md">
          <DialogTitle sx={{ color: '#00A79D', fontWeight: 'bold' }}>Edit Tour Package</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField name="title" label="Title" value={form.title} onChange={onChange} fullWidth />
              <TextField name="tour_type" label="Tour Type" value={form.tour_type} onChange={onChange} fullWidth />
              <TextField name="locations" label="Locations (comma separated)" value={form.locations} onChange={onChange} fullWidth />
              <TextField name="day_count" label="Day Count" type="number" value={form.day_count} onChange={onChange} fullWidth />
              <TextField name="price_per_person" label="Price per person" type="number" value={form.price_per_person} onChange={onChange} fullWidth />
              <TextField name="package_price" label="Package price" type="number" value={form.package_price} onChange={onChange} fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
      <Button variant="contained" sx={{ bgcolor: '#00A79D' }} disabled={!canSubmit()} onClick={handleUpdate}>Update</Button>
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

export default TourPackagesManagement;