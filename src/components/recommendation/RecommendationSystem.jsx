import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Activity, Loader2, AlertCircle, Plane, Compass } from 'lucide-react';
import { BASE_URL } from '../../api/index.js';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Chip,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  IconButton,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';

const popularActivities = [
  'hiking', 'swimming', 'sightseeing', 'photography', 'beach', 'mountain',
  'cultural sites', 'museums', 'restaurants', 'nightlife', 'shopping',
  'adventure sports', 'wildlife', 'nature', 'history', 'art galleries',
  'local cuisine', 'festivals', 'architecture', 'gardens'
];

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  border: '1px solid #f0f0f0',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 24px',
  transition: 'all 0.2s ease'
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4AB9B0 0%, #FF6B35 100%)',
  borderRadius: 12,
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 32px',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(135deg, #3da89f 0%, #e55a2b 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(74, 185, 176, 0.3)'
  },
  '&:disabled': {
    background: '#e0e0e0',
    color: '#9e9e9e'
  }
}));

const ActivityChip = styled(Chip)(({ theme, selected }) => ({
  borderRadius: 8,
  fontWeight: 500,
  transition: 'all 0.2s ease',
  cursor: selected ? 'not-allowed' : 'pointer',
  backgroundColor: selected ? '#f5f5f5' : '#f8f9fa',
  color: selected ? '#9e9e9e' : '#424242',
  border: selected ? '1px solid #e0e0e0' : '1px solid #e0e0e0',
  '&:hover': selected ? {} : {
    backgroundColor: '#e3f2fd',
    borderColor: '#4AB9B0',
    color: '#4AB9B0'
  }
}));

const SelectedActivityChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  border: '1px solid #bbdefb',
  '& .MuiChip-deleteIcon': {
    color: '#1976d2',
    '&:hover': {
      color: '#1565c0'
    }
  }
}));

function RecommendationSystem() {
  const [activities, setActivities] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [topN, setTopN] = useState(5);
  const [expandedActivities, setExpandedActivities] = useState({});

  const addActivity = (activity) => {
    if (activity.trim() && !activities.includes(activity.trim().toLowerCase())) {
      setActivities([...activities, activity.trim().toLowerCase()]);
      setInputValue('');
    }
  };

  const removeActivity = (activityToRemove) => {
    setActivities(activities.filter(activity => activity !== activityToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addActivity(inputValue);
    }
  };

  const getRecommendations = async () => {
    if (activities.length === 0) {
      setError('Please add at least one activity');
      return;
    }

    setIsLoading(true);
    setError('');

    // Get authentication token
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username') || 'Tourist';

    if (!token) {
      setError('Please log in to get recommendations');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          activities,
          user_name: username,
          top_n: topN
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Please log in to get recommendations');
        } else if (response.status === 403) {
          setError('Access denied. Please check your login status.');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      setError(`Failed to fetch recommendations. Please ensure the API server is running at ${BASE_URL}`);
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setActivities([]);
    setRecommendations([]);
    setError('');
    setInputValue('');
    setExpandedActivities({});
  };

  const toggleActivities = (placeIndex) => {
    setExpandedActivities(prev => ({
      ...prev,
      [placeIndex]: !prev[placeIndex]
    }));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      py: 4
    }}>
      <Container maxWidth="lg">

        {/* Input Section */}
        <StyledCard sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
                What are you interested in?
              </Typography>
              <Typography variant="h6" sx={{ color: '#7f8c8d', fontWeight: 400 }}>
                Tell us about your travel preferences and we'll find perfect places for you
              </Typography>
            </Box>

            {/* Activity Input */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type an activity or interest..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    startAdornment: <Search style={{ color: '#bdc3c7', marginRight: 8 }} />,
                    sx: { borderRadius: 2 }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#4AB9B0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4AB9B0',
                      },
                    },
                  }}
                />
                <StyledButton
                  variant="contained"
                  onClick={() => addActivity(inputValue)}
                  sx={{ 
                    bgcolor: '#4AB9B0',
                    '&:hover': { bgcolor: '#3da89f' }
                  }}
                >
                  Add
                </StyledButton>
              </Box>

              {/* Popular Activities */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                  Popular activities:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {popularActivities.slice(0, 10).map((activity) => (
                    <ActivityChip
                      key={activity}
                      label={activity}
                      onClick={() => addActivity(activity)}
                      selected={activities.includes(activity)}
                      disabled={activities.includes(activity)}
                      size="medium"
                    />
                  ))}
                </Box>
              </Box>

              {/* Selected Activities */}
              {activities.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                    Your interests:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {activities.map((activity) => (
                      <SelectedActivityChip
                        key={activity}
                        label={activity}
                        onDelete={() => removeActivity(activity)}
                        icon={<Activity style={{ fontSize: 16 }} />}
                        size="medium"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Controls */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                    Number of recommendations:
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 80 }}>
                    <Select
                      value={topN}
                      onChange={(e) => setTopN(e.target.value)}
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <StyledButton
                    variant="outlined"
                    onClick={clearAll}
                    sx={{ 
                      borderColor: '#bdc3c7',
                      color: '#7f8c8d',
                      '&:hover': { 
                        borderColor: '#95a5a6',
                        bgcolor: '#f8f9fa'
                      }
                    }}
                  >
                    Clear All
                  </StyledButton>
                  <GradientButton
                    onClick={getRecommendations}
                    disabled={isLoading || activities.length === 0}
                    startIcon={isLoading ? <Loader2 style={{ animation: 'spin 1s linear infinite' }} /> : <Plane />}
                  >
                    {isLoading ? 'Getting Recommendations...' : 'Find Places'}
                  </GradientButton>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            <AlertCircle style={{ marginRight: 8 }} />
            {error}
          </Alert>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <MapPin style={{ color: '#4AB9B0', marginRight: 8 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                Recommended Places for You
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {recommendations.map((place, index) => (
                <StyledCard key={index}>
                  <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
                        {place.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Star style={{ color: '#f39c12', fontSize: 18 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                          {place.rating}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#bdc3c7' }}>•</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#4AB9B0' }}>
                          {(place.score * 100).toFixed(0)}% match
                        </Typography>
                      </Box>
                    </Box>

                    {/* Activities */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}>
                        Activities:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {place.activities.slice(0, expandedActivities[index] ? place.activities.length : 4).map((activity, idx) => (
                          <Chip
                            key={idx}
                            label={activity}
                            size="small"
                            sx={{ 
                              bgcolor: '#f8f9fa',
                              color: '#2c3e50',
                              fontSize: '0.75rem',
                              fontWeight: 500
                            }}
                          />
                        ))}
                        {place.activities.length > 4 && !expandedActivities[index] && (
                          <Button
                            size="small"
                            onClick={() => toggleActivities(index)}
                            sx={{
                              textTransform: 'none',
                              color: '#4AB9B0',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              p: 0.5,
                              minWidth: 'auto',
                              '&:hover': {
                                bgcolor: 'transparent',
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            +{place.activities.length - 4} more
                          </Button>
                        )}
                        {place.activities.length > 4 && expandedActivities[index] && (
                          <Button
                            size="small"
                            onClick={() => toggleActivities(index)}
                            sx={{
                              textTransform: 'none',
                              color: '#7f8c8d',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              p: 0.5,
                              minWidth: 'auto',
                              '&:hover': {
                                bgcolor: 'transparent',
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            Show less
                          </Button>
                        )}
                      </Box>
                    </Box>

                    {/* Score Bar */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Compatibility
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                          {(place.score * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={place.score * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: '#ecf0f1',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(135deg, #4AB9B0 0%, #FF6B35 100%)',
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>
                  </CardContent>
                </StyledCard>
              ))}
            </Box>
          </Box>
        )}

        {/* Empty State */}
        {!isLoading && recommendations.length === 0 && activities.length > 0 && !error && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Avatar sx={{ 
              width: 96, 
              height: 96, 
              bgcolor: '#ecf0f1',
              mx: 'auto',
              mb: 2
            }}>
              <MapPin style={{ color: '#bdc3c7', fontSize: 32 }} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}>
              Ready to explore?
            </Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              Click "Find Places" to get personalized recommendations
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default RecommendationSystem; 