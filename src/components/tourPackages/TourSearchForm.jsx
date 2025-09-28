import React, { useState, useEffect } from 'react';
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

function TourSearchForm({ onSearch, onReset, isLoading = false, durationOptions = ['None'], budgetOptions = ['None'], tourTypeOptions = ['None'] }) {
  const [duration, setDuration] = useState('None'); // numeric day_count as string
  const [budget, setBudget] = useState('None'); // numeric package_price as string
  const [tourType, setTourType] = useState('None'); // tour_type exact

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
        <Grid item>
          <FormControl disabled={isLoading} sx={{ width: 160 }}>
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
        <Grid item>
          <FormControl disabled={isLoading} sx={{ width: 160 }}>
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
        <Grid item>
          <FormControl disabled={isLoading} sx={{ width: 200 }}>
            <InputLabel 
              sx={{ 
                color: '#666',
                fontWeight: 600,
                '&.Mui-focused': {
                  color: '#00A79D',
                },
              }}
            >
              Tour Type
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
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1.5, height: '56px', justifyContent: 'center', mt: 1 }}>
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