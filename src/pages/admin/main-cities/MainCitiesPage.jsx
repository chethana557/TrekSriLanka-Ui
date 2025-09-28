import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Snackbar } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx';
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx';
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';
import { BASE_URL } from '../../../api';

function MainCitiesPage() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [form, setForm] = useState({ title: '', mini_caption: '', long_description: '' });

  const fetchCities = async () => {
    try {
      setLoading(true);
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const res = await fetch(`${base}/main-cities/`);
      if (!res.ok) throw new Error('Failed to fetch main cities');
      const data = await res.json();
      setCities(data);
    } catch (err) {
      setError(err.message || 'Failed to load main cities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAdd = () => navigate('/admin/main-cities/add');

  const handleEdit = async (city) => {
    try {
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const res = await fetch(`${base}/main-cities/${city.main_city_id}`);
      if (!res.ok) throw new Error('Failed to fetch main city');
      const data = await res.json();
      setEditingCity(data);
      setForm({ title: data.title || '', mini_caption: data.mini_caption || '', long_description: data.long_description || '' });
      setEditOpen(true);
    } catch (err) {
      setError(err.message || 'Failed to load main city');
    }
  };

  const handleDelete = async (city) => {
    if (!window.confirm(`Delete "${city.title}"?`)) return;
    try {
      const token = localStorage.getItem('access_token');
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const res = await fetch(`${base}/main-cities/${city.main_city_id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }});
      if (!res.ok) throw new Error('Failed to delete');
      fetchCities();
    } catch (err) {
      setError(err.message || 'Failed to delete main city');
    }
  };

  const canSubmit = () => form.title.trim() && form.mini_caption.trim() && form.long_description.trim();

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
      const fd = new FormData();
      if (form.title) fd.append('title', form.title);
      if (form.mini_caption) fd.append('mini_caption', form.mini_caption);
      if (form.long_description) fd.append('long_description', form.long_description);
      const res = await fetch(`${base}/main-cities/${editingCity.main_city_id}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${token}` }, body: fd });
      if (!res.ok) throw new Error('Failed to update');
      setEditOpen(false);
      setEditingCity(null);
      fetchCities();
    } catch (err) {
      setError(err.message || 'Failed to update main city');
    }
  };

  return (
    <Box>
      <AdminNavBar />
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
        <Box sx={{ maxWidth: '1600px', mx: 'auto', px: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
            <Box>
              <Typography variant="h4" sx={{ color: '#00A79D', fontWeight: 'bold', mb: 1, fontSize: '2.5rem' }}>Main Cities Management</Typography>
              <Typography variant="body1" sx={{ color: '#666', fontSize: '1.1rem' }}>Manage your main cities.</Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{
                bgcolor: '#00A79D',
                color: 'white',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': { bgcolor: '#008A82' }
              }}
            >
              + Add New City
            </Button>
          </Box>

          {loading && (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}><CircularProgress sx={{ color: '#00A79D' }} /></Box>)}
          {error && (<Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>)}

          {!loading && !error && (
            <Grid container spacing={3} justifyContent="flex-start">
              {cities.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', width: '100%' }}>
                  <Typography variant="h6" sx={{ color: '#666' }}>No main cities found. Create your first city!</Typography>
                </Box>
              ) : (
                cities.map((city) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={city.main_city_id}>
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
                          boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        },
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="280"
                        image={city.photos && city.photos.length > 0 ? city.photos[0] : '/placeholder-destination.jpg'}
                        alt={city.title}
                        sx={{ objectFit: 'cover', flexShrink: 0 }}
                      />
                      <CardContent 
                        sx={{ 
                          p: 3, 
                          flexGrow: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
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
                            {city.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#666',
                              lineHeight: 1.5,
                              mb: 3
                            }}
                          >
                            {city.mini_caption}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(city)}
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
                            onClick={() => handleDelete(city)}
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
      </Box>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: '#00A79D', fontWeight: 'bold' }}>Edit City</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField name="title" label="City Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth required />
            <TextField name="mini_caption" label="City Mini Caption" value={form.mini_caption} onChange={(e) => setForm({ ...form, mini_caption: e.target.value })} fullWidth required />
            <TextField name="long_description" label="City Long Description" value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} fullWidth multiline rows={4} required />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#00A79D' }} disabled={!canSubmit()} onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>

      <ChatbotWidget />
      <Footer_Combination />
    </Box>
  );
}

export default MainCitiesPage;
