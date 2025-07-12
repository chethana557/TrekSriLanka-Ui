import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button,
  Grid,
  CircularProgress
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';

function TourSearchForm({ onSearch, onReset, isLoading = false }) {
  const [duration, setDuration] = useState('None');
  const [budget, setBudget] = useState('None');
  const [tourType, setTourType] = useState('None');

  const durationOptions = [
    'None',
    '1-3 Days',
    '4-7 Days', 
    '1-2 Weeks',
    '2-4 Weeks',
    '1+ Month'
  ];

  const budgetOptions = [
    'None',
    'Under $500',
    '$500-$1000',
    '$1000-$2500',
    '$2500-$5000',
    '$5000+'
  ];

  const tourTypeOptions = [
    'None',
    'Adventure',
    'Cultural',
    'Beach & Relaxation',
    'Wildlife Safari',
    'City Tours',
    'Mountain Trekking',
    'Food & Wine',
    'Photography',
    'Historical',
    'Eco Tours'
  ];

  const handleSearch = () => {
    if (onSearch) {
      const searchParams = {
        duration,
        budget,
        tourType,
      };
      onSearch(searchParams);
    }
  };

  const handleReset = () => {
    setDuration('None');
    setBudget('None');
    setTourType('None');
    if (onReset) {
      onReset();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ py: 2, px: 2, maxWidth: '1400px', mx: 'auto' }}>
      {/* Heading */}
      <Box sx={{ textAlign: 'left', mb: 3 }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333',
          margin: 0,
          marginBottom: '8px'
        }}>
          Find Your Perfect Tour Package
        </h1>
      </Box>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Duration Field */}
        <Grid item xs={12} sm={6} md={8}>
          <FormControl fullWidth disabled={isLoading}>
            <InputLabel 
              sx={{ 
                color: '#666',
                fontWeight: 600,
                '&.Mui-focused': {
                  color: '#00A79D',
                },
              }}
            >
              Duration
            </InputLabel>
            <Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              label="Duration"
              sx={{
                borderRadius: '25px',
                backgroundColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                  borderWidth: '2px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00A79D',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00A79D',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              {durationOptions.map((option) => (
                <MenuItem 
                  key={option} 
                  value={option}
                  sx={{ 
                    '&:hover': {
                      backgroundColor: '#f0f9f8',
                    },
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Budget Field */}
        <Grid item xs={12} sm={6} md={8}>
          <FormControl fullWidth disabled={isLoading}>
            <InputLabel 
              sx={{ 
                color: '#666',
                fontWeight: 600,
                '&.Mui-focused': {
                  color: '#00A79D',
                },
              }}
            >
              Budget
            </InputLabel>
            <Select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              label="Budget"
              sx={{
                borderRadius: '25px',
                backgroundColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                  borderWidth: '2px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00A79D',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00A79D',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              {budgetOptions.map((option) => (
                <MenuItem 
                  key={option} 
                  value={option}
                  sx={{ 
                    '&:hover': {
                      backgroundColor: '#f0f9f8',
                    },
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Tour Type Field */}
        <Grid item xs={12} sm={6} md={8}>
          <FormControl fullWidth disabled={isLoading}>
            <InputLabel 
              sx={{ 
                color: '#666',
                fontWeight: 600,
                '&.Mui-focused': {
                  color: '#00A79D',
                },
              }}
            >
              Tour type
            </InputLabel>
            <Select
              value={tourType}
              onChange={(e) => setTourType(e.target.value)}
              label="Tour type"
              sx={{
                borderRadius: '25px',
                backgroundColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                  borderWidth: '2px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00A79D',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00A79D',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              {tourTypeOptions.map((option) => (
                <MenuItem 
                  key={option} 
                  value={option}
                  sx={{ 
                    '&:hover': {
                      backgroundColor: '#f0f9f8',
                    },
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} sm={12} md={8}>
          <Box sx={{ display: 'flex', gap: 1.5, height: '56px', justifyContent: 'center' }}>
            {/* Search Button */}
            <Button
              variant="contained"
              size="large"
              onClick={handleSearch}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Search />}
              sx={{
                backgroundColor: '#00A79D',
                color: 'white',
                borderRadius: '25px',
                minWidth: '140px',
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0, 167, 157, 0.3)',
                '&:hover': {
                  backgroundColor: '#008A82',
                  boxShadow: '0 6px 16px rgba(0, 167, 157, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  backgroundColor: '#cccccc',
                  transform: 'none',
                  boxShadow: 'none',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>

            {/* Reset Button */}
            <Button
              variant="outlined"
              size="large"
              onClick={handleReset}
              disabled={isLoading}
              startIcon={<Refresh />}
              sx={{
                borderColor: '#00A79D',
                color: '#00A79D',
                borderRadius: '25px',
                minWidth: '120px',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderWidth: '2px',
                '&:hover': {
                  borderColor: '#008A82',
                  color: '#008A82',
                  backgroundColor: 'rgba(0, 167, 157, 0.08)',
                  borderWidth: '2px',
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  borderColor: '#cccccc',
                  color: '#cccccc',
                  transform: 'none',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Reset
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TourSearchForm;