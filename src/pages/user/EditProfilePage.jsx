import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar
} from '@mui/material';
import {
  Save as SaveIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Public as PublicIcon,
  TravelExplore as TravelIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/authUtils';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Include legacy / variant values found in existing DB records so they render (e.g. "Cultural Travel", "Solo Traveler")
const TRAVEL_STYLES = [
  'Adventure',
  'Leisure', 
  'Cultural',
  'Cultural Travel', // legacy variant
  'Business',
  'Family',
  'Solo',
  'Luxury',
  'Budget'
];

const TRAVEL_GROUPS = [
  'Solo',
  'Solo Traveler', // legacy variant
  'Couple',
  'Family',
  'Friends',
  'Group', // UI short label
  'Group Tour', // canonical backend value
  'Business'
];

// Mapping of variant -> canonical values accepted by backend validators
const CANONICAL_TRAVEL_STYLE = {
  'Cultural Travel': 'Cultural'
};
const CANONICAL_TRAVEL_GROUP = {
  'Solo Traveler': 'Solo',
  'Group': 'Group Tour'
};

function EditProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
  username: '',
    full_name: '',
    phone_number: '',
    country: '',
    travel_style: '',
    travel_group: ''
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      const userData = await response.json();
      setUser(userData);
      
      // Populate form with current data
      // Prefer displaying the exact stored value; if stored canonical value has a friendlier variant keep canonical
      setProfileForm({
	  username: userData.username || '',
        full_name: userData.full_name || '',
        phone_number: userData.phone_number || '',
        country: userData.country || '',
        travel_style: userData.travel_style || '',
        travel_group: userData.travel_group || ''
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
    setPasswordError('');
  };

  // Inline style objects mimicking ContactForm aesthetics
  const baseField = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    outline: 'none',
    transition: 'all 0.2s ease'
  };
  const inputStyle = { ...baseField };
  const selectStyle = { ...baseField, appearance: 'none' };
  const labelStyle = {
    display: 'block',
    color: '#333',
    fontWeight: 500,
    marginBottom: '0.5rem',
    fontSize: '14px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };
  const primaryButtonStyle = {
    backgroundColor: '#00A79D',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 167, 157, 0.3)'
  };
  const outlineButtonStyle = {
    backgroundColor: 'white',
    color: '#00A79D',
    border: '1px solid #00A79D',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };
  const handleFocus = (e) => {
    e.target.style.borderColor = '#00A79D';
    e.target.style.boxShadow = '0 0 0 2px rgba(0, 167, 157, 0.1)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = '#e9ecef';
    e.target.style.boxShadow = 'none';
  };
  const hoverPrimaryBtn = (e, enter) => {
    e.target.style.backgroundColor = enter ? '#008A80' : '#00A79D';
    e.target.style.boxShadow = enter ? '0 4px 12px rgba(0, 167, 157, 0.4)' : '0 2px 8px rgba(0, 167, 157, 0.3)';
    e.target.style.transform = enter ? 'translateY(-1px)' : 'translateY(0)';
  };
  const hoverOutlineBtn = (e, enter) => {
    e.target.style.backgroundColor = enter ? '#00A79D' : 'white';
    e.target.style.color = enter ? 'white' : '#00A79D';
    e.target.style.boxShadow = enter ? '0 4px 12px rgba(0, 167, 157, 0.25)' : 'none';
    e.target.style.transform = enter ? 'translateY(-1px)' : 'translateY(0)';
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');

      // Only send changed fields (with canonicalized enum values)
      const changedFields = {};
      Object.keys(profileForm).forEach(key => {
        let currentVal = profileForm[key];
        // Canonicalize before comparing / sending
        if (key === 'travel_style' && CANONICAL_TRAVEL_STYLE[currentVal]) {
          currentVal = CANONICAL_TRAVEL_STYLE[currentVal];
        }
        if (key === 'travel_group' && CANONICAL_TRAVEL_GROUP[currentVal]) {
          currentVal = CANONICAL_TRAVEL_GROUP[currentVal];
        }
        const serverVal = user[key] || '';
        let comparableServerVal = serverVal;
        if (key === 'travel_style' && CANONICAL_TRAVEL_STYLE[serverVal]) {
          comparableServerVal = CANONICAL_TRAVEL_STYLE[serverVal];
        }
        if (key === 'travel_group' && CANONICAL_TRAVEL_GROUP[serverVal]) {
          comparableServerVal = CANONICAL_TRAVEL_GROUP[serverVal];
        }
        if (currentVal !== comparableServerVal) {
          changedFields[key] = currentVal || null;
        }
      });

      if (Object.keys(changedFields).length === 0) {
        setError('No changes to save');
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(changedFields)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const result = await response.json();
      
  setSuccess(`Profile updated successfully! Updated: ${result.updated_fields.join(', ')}`);
      setSnackbarOpen(true);
      
      // Update user state
      setUser(result.user);
      
  // Stay on page; optional future redirect could be added

    } catch (error) {
      console.error('Profile update failed:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      setPasswordLoading(true);
      setPasswordError('');

      // Validate password confirmation
      if (passwordForm.new_password !== passwordForm.confirm_password) {
        setPasswordError('New passwords do not match');
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to change password');
      }

      const result = await response.json();

      if (result.success) {
        setSuccess('Password changed successfully!');
        setSnackbarOpen(true);
        setPasswordDialogOpen(false);
        setPasswordForm({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
      } else {
        setPasswordError('Failed to change password');
      }

    } catch (error) {
      console.error('Password change failed:', error);
      setPasswordError(error.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          sx={{ 
            minHeight: '60vh',
            backgroundColor: '#f9fafb',
            padding: '2rem 1rem'
          }}
        >
          <CircularProgress sx={{ color: '#4AB9B0' }} />
        </Box>
        <Footer_Combination />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        padding: '2rem 1rem',
        paddingTop: '1rem'
      }}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Box sx={{
            maxWidth: '900px',
            mx: 'auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            p: { xs: 3, md: 4 }
          }}>
            <Typography component="h2" sx={{
              fontSize: '1.8rem',
              fontWeight: 600,
              color: '#00A79D',
              mb: 1,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Edit Profile
            </Typography>
            <Typography sx={{
              fontSize: '0.95rem',
              color: '#555',
              mb: 3,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Update your personal information and travel preferences
            </Typography>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Profile Form */}
            <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Full Name */}
              <div>
                <label style={labelStyle}>Username</label>
                <input
                  type="text"
                  value={profileForm.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter a unique username"
                  style={inputStyle}
                  onFocus={(e)=>handleFocus(e)}
                  onBlur={(e)=>handleBlur(e)}
                />
              </div>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={profileForm.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  placeholder="Enter your full name"
                  style={inputStyle}
                  onFocus={(e)=>handleFocus(e)}
                  onBlur={(e)=>handleBlur(e)}
                />
              </div>
              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  style={{ ...inputStyle, backgroundColor:'#f0f0f0', cursor:'not-allowed' }}
                />
                <small style={{ color:'#666', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Email cannot be changed</small>
              </div>
              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="text"
                  value={profileForm.phone_number}
                  onChange={(e) => handleInputChange('phone_number', e.target.value)}
                  placeholder="Enter your phone number"
                  style={inputStyle}
                  onFocus={(e)=>handleFocus(e)}
                  onBlur={(e)=>handleBlur(e)}
                />
              </div>
              {/* Country */}
              <div>
                <label style={labelStyle}>Country</label>
                <input
                  type="text"
                  value={profileForm.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="Enter your country"
                  style={inputStyle}
                  onFocus={(e)=>handleFocus(e)}
                  onBlur={(e)=>handleBlur(e)}
                />
              </div>
              {/* Travel Style */}
              <div>
                <label style={labelStyle}>Travel Style</label>
                <select
                  value={profileForm.travel_style}
                  onChange={(e) => handleInputChange('travel_style', e.target.value)}
                  style={selectStyle}
                  onFocus={(e)=>handleFocus(e)}
                  onBlur={(e)=>handleBlur(e)}
                >
                  <option value="" disabled>Select your travel style</option>
                  {TRAVEL_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {/* Travel Group */}
              <div>
                <label style={labelStyle}>Travel Group</label>
                <select
                  value={profileForm.travel_group}
                  onChange={(e) => handleInputChange('travel_group', e.target.value)}
                  style={selectStyle}
                  onFocus={(e)=>handleFocus(e)}
                  onBlur={(e)=>handleBlur(e)}
                >
                  <option value="" disabled>Select your travel group</option>
                  {TRAVEL_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              {/* Actions */}
              <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'0.5rem' }}>
                <button
                  type="button"
                  onClick={()=>setPasswordDialogOpen(true)}
                  style={outlineButtonStyle}
                  onMouseEnter={(e)=>hoverOutlineBtn(e,true)}
                  onMouseLeave={(e)=>hoverOutlineBtn(e,false)}
                >
                  Change Password
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ ...primaryButtonStyle, opacity: saving?0.8:1 }}
                  onMouseEnter={(e)=>hoverPrimaryBtn(e,true)}
                  onMouseLeave={(e)=>hoverPrimaryBtn(e,false)}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </Box>

          {/* Password Change Dialog */}
          <Dialog
            open={passwordDialogOpen}
            onClose={() => setPasswordDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              <Box display="flex" alignItems="center">
                <LockIcon sx={{ mr: 1, color: '#4AB9B0' }} />
                Change Password
              </Box>
            </DialogTitle>
            <form onSubmit={handlePasswordSubmit}>
              <DialogContent>
                {passwordError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {passwordError}
                  </Alert>
                )}
                
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  value={passwordForm.current_password}
                  onChange={(e) => handlePasswordChange('current_password', e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  value={passwordForm.new_password}
                  onChange={(e) => handlePasswordChange('new_password', e.target.value)}
                  required
                  helperText="Must be at least 8 characters"
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  value={passwordForm.confirm_password}
                  onChange={(e) => handlePasswordChange('confirm_password', e.target.value)}
                  required
                />
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button onClick={() => setPasswordDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={passwordLoading}
                  startIcon={passwordLoading ? <CircularProgress size={20} /> : <LockIcon />}
                  sx={{
                    bgcolor: '#4AB9B0',
                    '&:hover': { bgcolor: '#3da89f' }
                  }}
                >
                  {passwordLoading ? 'Changing...' : 'Change Password'}
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          {/* Success Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
              {success}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
      <Footer_Combination />
    </>
  );
}

export default EditProfilePage;
