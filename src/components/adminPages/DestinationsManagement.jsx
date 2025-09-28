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
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Snackbar
} from '@mui/material';
import { 
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { BASE_URL } from '../../api';

function DestinationsManagement() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${base}/api/v1/destinations/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }
      
      const data = await response.json();
      setDestinations(data);
    } catch (err) {
      setError(err.message || 'Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddNewOffer = () => {
    navigate('/admin/destinations/add');
  };

  // ...existing code...

  const handleEdit = (destination) => {
    // Fetch destination details and open edit dialog
    (async () => {
      try {
        const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
        const res = await fetch(`${base}/destinations/${destination.destination_id}`);
        if (!res.ok) throw new Error('Failed to fetch destination details');
        const data = await res.json();
        setEditingDestination(data);
        setForm({
          title: data.title || '',
          mini_caption: data.mini_caption || '',
          long_description: data.long_description || '',
          best_time_to_visit: data.best_time_to_visit || '',
          how_to_get_there: data.how_to_get_there || '',
          entrance_fees: data.entrance_fees || '',
          opening_hours: data.opening_hours || '',
          things_to_do: data.things_to_do || '',
          nearest_town: data.nearest_town || ''
        });
        setEditOpen(true);
      } catch (err) {
        setError(err.message || 'Failed to load destination details');
      }
    })();
  };

  const [editOpen, setEditOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [form, setForm] = useState({
    title: '',
    mini_caption: '',
    long_description: '',
    best_time_to_visit: '',
    how_to_get_there: '',
    entrance_fees: '',
    opening_hours: '',
  things_to_do: '',
  nearest_town: ''
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const canSubmit = () => {
    return (
      form.title && form.title.trim() &&
      form.mini_caption && form.mini_caption.trim() &&
      form.long_description && form.long_description.trim()
    );
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingDestination(null);
  setForm({ title: '', mini_caption: '', long_description: '', best_time_to_visit: '', how_to_get_there: '', entrance_fees: '', opening_hours: '', things_to_do: '', nearest_town: '' });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return setError('Please login');
    try {
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const payload = {
        title: form.title,
        mini_caption: form.mini_caption,
        long_description: form.long_description,
        best_time_to_visit: form.best_time_to_visit,
        how_to_get_there: form.how_to_get_there,
        entrance_fees: form.entrance_fees,
        opening_hours: form.opening_hours,
  things_to_do: form.things_to_do,
  nearest_town: form.nearest_town
      };

      const res = await fetch(`${base}/destinations/${editingDestination.destination_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to update destination');
      }

      const updated = await res.json();

      setDestinations(prev => prev.map(d => d.destination_id === editingDestination.destination_id ? { ...d, ...payload } : d));
      handleEditClose();
    } catch (err) {
      setError(err.message || 'Failed to update destination');
    }
  };

  const handleDelete = async (destination) => {
    if (window.confirm(`Are you sure you want to delete "${destination.title}"?`)) {
      try {
        const token = localStorage.getItem('access_token');
        const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${base}/api/v1/destinations/${destination.destination_id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          // Refresh the destinations list
          fetchDestinations();
        } else {
          throw new Error('Failed to delete destination');
        }
      } catch (err) {
        setError(err.message || 'Failed to delete destination');
      }
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: 3 }}>
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
              Tour Destinations Management
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontSize: '1.1rem'
              }}
            >
              Manage your tourist destinations.
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
            + Add New Destination
          </Button>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress sx={{ color: '#00A79D' }} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Destinations Grid */}
        {!loading && !error && (
          <Grid container spacing={3} justifyContent="flex-start">
            {destinations.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '400px',
                width: '100%'
              }}>
                <Typography variant="h6" sx={{ color: '#666' }}>
                  No destinations found. Create your first destination!
                </Typography>
              </Box>
            ) : (
              destinations.map((destination) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={destination.destination_id}>
                  <Card 
                    sx={{ 
                      minHeight: 480,
                      width: 300,
                      maxWidth: 330,
                      minWidth: 330,
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
                    {/* Destination Image */}
                    <CardMedia
                      component="img"
                      height="280"
                      image={destination.photos && destination.photos.length > 0 ? destination.photos[0] : '/placeholder-destination.jpg'}
                      alt={destination.title}
                      sx={{ objectFit: 'cover', flexShrink: 0 }}
                    />

                    {/* Destination Details */}
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
                             mb: 2,
                             color: '#333'
                           }}
                         >
                           {destination.title}
                         </Typography>

                         <Typography 
                           variant="body2" 
                           sx={{ 
                             color: '#666',
                             lineHeight: 1.5,
                             mb: 3
                           }}
                         >
                           {destination.mini_caption}
                         </Typography>
                       </Box>

                      {/* Action Buttons - Always at bottom */}
                      <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEdit(destination)}
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
                          onClick={() => handleDelete(destination)}
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
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>

        {/* Edit Destination Dialog */}
        <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="md">
          <DialogTitle sx={{ color: '#00A79D', fontWeight: 'bold' }}>Edit Destination</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField name="title" label="Title" value={form.title} onChange={onChange} fullWidth required />
              <TextField name="mini_caption" label="Mini Caption" value={form.mini_caption} onChange={onChange} fullWidth required />
              <TextField name="long_description" label="Long Description" value={form.long_description} onChange={onChange} fullWidth multiline rows={4} required />
              <TextField name="best_time_to_visit" label="Best Time To Visit" value={form.best_time_to_visit} onChange={onChange} fullWidth />
              <TextField name="nearest_town" label="Nearest Town / City" value={form.nearest_town} onChange={onChange} fullWidth />
              <TextField name="how_to_get_there" label="How To Get There" value={form.how_to_get_there} onChange={onChange} fullWidth />
              <TextField name="entrance_fees" label="Entrance Fees" value={form.entrance_fees} onChange={onChange} fullWidth />
              <TextField name="opening_hours" label="Opening Hours" value={form.opening_hours} onChange={onChange} fullWidth />
              <TextField name="things_to_do" label="Things To Do" value={form.things_to_do} onChange={onChange} fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button variant="contained" sx={{ bgcolor: '#00A79D' }} disabled={!canSubmit()} onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
    </Box>
  );
}

export default DestinationsManagement;