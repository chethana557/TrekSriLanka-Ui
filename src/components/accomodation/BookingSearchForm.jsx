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
import { Search, Clear, Refresh } from '@mui/icons-material';

function BookingSearchForm({ onSearch, onReset, isLoading = false }) {
  const [destination, setDestination] = useState('');
  const [accommodationType, setAccommodationType] = useState('All');
  const [checkInDate, setCheckInDate] = useState('2025-02-20');

  const accommodationTypes = [
    'All',
    'Hotel',
    'Resort', 
    'Villa',
    'Apartment',
    'Guesthouse',
    'Homestay',
    'Cottage'
  ];

  const handleSearch = () => {
    if (onSearch) {
      const searchParams = {
        destination: destination.trim(),
        accommodationType,
        checkInDate,
      };
      onSearch(searchParams);
    }
  };

  const handleReset = () => {
    setDestination('');
    setAccommodationType('All');
    setCheckInDate('2025-02-20');
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
    <Box sx={{ py: 3, px: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Destination Field */}
        <Grid item xs={12} sm={6} md={2.5}>
          <TextField
            fullWidth
            label="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Where are you going?"
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#00A79D',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00A79D',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f5f5f5',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666',
                fontFamily: `'Anek Latin', sans-serif`,
                fontWeight: 600,
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#00A79D',
              },
            }}
          />
        </Grid>

        {/* Accommodation Type Field - Increased width */}
        <Grid item xs={12} sm={6} md={3.5}>
          <FormControl fullWidth disabled={isLoading}>
            <InputLabel 
              sx={{ 
                color: '#666',
                fontFamily: `'Anek Latin', sans-serif`,
                fontWeight: 600,
                '&.Mui-focused': {
                  color: '#00A79D',
                },
              }}
            >
              Accommodation Type
            </InputLabel>
            <Select
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
              label="Accommodation Type"
              sx={{
                borderRadius: '25px',
                backgroundColor: 'white',
                minWidth: '200px', // Added minimum width
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
                  fontFamily: `'Anek Latin', sans-serif`,
                  padding: '16.5px 14px', // Consistent padding
                },
              }}
            >
              {accommodationTypes.map((type) => (
                <MenuItem 
                  key={type} 
                  value={type}
                  sx={{ 
                    fontFamily: `'Anek Latin', sans-serif`,
                    '&:hover': {
                      backgroundColor: '#f0f9f8',
                    },
                  }}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Check-in Date Field */}
        <Grid item xs={12} sm={6} md={2.5}>
          <TextField
            fullWidth
            label="Check-In-Date"
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            disabled={isLoading}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#00A79D',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00A79D',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f5f5f5',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666',
                fontFamily: `'Anek Latin', sans-serif`,
                fontWeight: 600,
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#00A79D',
              },
            }}
          />
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} sm={12} md={3.5}>
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
                fontFamily: `'Anek Latin', sans-serif`,
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

            {/* Reset Button - Enhanced */}
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
                fontFamily: `'Anek Latin', sans-serif`,
                textTransform: 'none',
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

export default BookingSearchForm;