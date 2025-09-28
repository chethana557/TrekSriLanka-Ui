import React, { useState, useEffect } from 'react';
import { MapPin, Star, Activity, Loader2, AlertCircle, Plane, Compass, Sparkles, Map, Target } from 'lucide-react';
import SearchIcon from '@mui/icons-material/Search';
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
  InputBase,
  Paper,
  IconButton,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Grow,
  CircularProgress,
  Backdrop
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

}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 24px',
  transition: 'all 0.2s ease'
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: '#00A79D',
  borderRadius: 12,
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 32px',
  color: 'white',
  '&:hover': {
    background: '#009488',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 167, 157, 0.3)'
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

// Loading Animation Component
const LoadingAnimation = ({ loadingStage, activities }) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const icons = [
    { component: Sparkles, color: '#4AB9B0' },
    { component: Map, color: '#FF6B35' },
    { component: Target, color: '#4AB9B0' },
    { component: Compass, color: '#FF6B35' }
  ];
  
  const messages = [
    'Analyzing your interests...',
    'Searching through thousands of destinations...',
    'Finding perfect matches...',
    'Calculating compatibility scores...',
    'Preparing your personalized recommendations...'
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 1000);

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => {
      clearInterval(iconInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const IconComponent = icons[currentIcon].component;

  return (
    <Backdrop
      open={true}
      sx={{ 
        zIndex: 1200,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Card sx={{ 
        maxWidth: 500, 
        width: '90%',
        borderRadius: 4,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'visible',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <CardContent sx={{ p: 6, textAlign: 'center' }}>
          {/* Animated Icon */}
          <Box sx={{ 
            position: 'relative',
            mb: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box sx={{
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${icons[currentIcon].color}20 0%, ${icons[currentIcon].color}10 100%)`,
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            <Box sx={{
              position: 'absolute',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${icons[currentIcon].color}40 0%, ${icons[currentIcon].color}20 100%)`,
              animation: 'pulse 2s ease-in-out infinite 0.5s'
            }} />
            <Grow in={true} timeout={500} key={currentIcon}>
              <Box sx={{ zIndex: 1 }}>
                <IconComponent 
                  size={40} 
                  color={icons[currentIcon].color}
                  style={{ 
                    animation: 'float 3s ease-in-out infinite',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}
                />
              </Box>
            </Grow>
          </Box>

          {/* Loading Progress */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700, 
              color: '#2c3e50',
              mb: 2
            }}>
              Finding Your Perfect Destinations
            </Typography>
            
            <Fade in={true} timeout={1000} key={currentMessage}>
              <Typography variant="body1" sx={{ 
                color: '#7f8c8d',
                fontWeight: 500,
                minHeight: '24px',
                mb: 3
              }}>
                {messages[currentMessage]}
              </Typography>
            </Fade>

            <LinearProgress 
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: '#ecf0f1',
                mb: 3,
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(135deg, ${icons[currentIcon].color} 0%, #FF6B35 100%)`,
                  borderRadius: 3,
                  animation: 'wave 2s ease-in-out infinite'
                }
              }}
            />

            {/* Selected Activities Display */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ 
                color: '#95a5a6',
                fontWeight: 600,
                mb: 1
              }}>
                Analyzing interests:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {activities.slice(0, 6).map((activity, index) => (
                  <Grow in={true} timeout={300} key={activity} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Chip
                      label={activity}
                      size="small"
                      sx={{
                        bgcolor: '#e3f2fd',
                        color: '#1976d2',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        animation: 'glow 2s ease-in-out infinite'
                      }}
                    />
                  </Grow>
                ))}
                {activities.length > 6 && (
                  <Chip
                    label={`+${activities.length - 6} more`}
                    size="small"
                    sx={{
                      bgcolor: '#f8f9fa',
                      color: '#7f8c8d',
                      fontSize: '0.75rem'
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>

          {/* Fun Fact */}
          <Box sx={{
            p: 2,
            bgcolor: '#f8f9fa',
            borderRadius: 2,
            border: '1px dashed #bdc3c7'
          }}>
            <Typography variant="caption" sx={{ 
              color: '#7f8c8d',
              fontStyle: 'italic'
            }}>
              💡 Did you know? Our AI analyzes over 10,000 destinations to find your perfect match!
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Add CSS animations to document head */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes wave {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(74, 185, 176, 0.3); }
            50% { box-shadow: 0 0 15px rgba(74, 185, 176, 0.6); }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Backdrop>
  );
};

function RecommendationSystem() {
  const [activities, setActivities] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
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
    setLoadingStage(0);
    setError('');
    setRecommendations([]); // Clear previous results

    // Get authentication token
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username') || 'Tourist';

    if (!token) {
      setError('Please log in to get recommendations');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate loading stages for better UX
      const loadingStages = [
        { delay: 500, stage: 1 },
        { delay: 1000, stage: 2 },
        { delay: 1500, stage: 3 },
        { delay: 2000, stage: 4 }
      ];

      // Set up loading stage progression
      const stageTimeouts = loadingStages.map(({ delay, stage }) =>
        setTimeout(() => {
          if (isLoading) setLoadingStage(stage);
        }, delay)
      );

      // Make the actual API call
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

      // Clear stage timeouts
      stageTimeouts.forEach(timeout => clearTimeout(timeout));

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
      
      // Add a small delay to show the final loading stage
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRecommendations(data.recommendations);
    } catch (err) {
      setError(`Failed to fetch recommendations. Please ensure the API server is running at ${BASE_URL}`);
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsLoading(false);
      setLoadingStage(0);
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
      {/* Loading Animation Overlay - Backdrop Version */}
      {isLoading && (
        <LoadingAnimation 
          loadingStage={loadingStage} 
          activities={activities}
        />
      )}
      
      <Container maxWidth="lg">

        {/* Input Section (no outer card) */}
        <Box sx={{ mb: 4 }}>
            {/* Activity Input */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Paper
                  component="div"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: 50,
                    boxShadow: 3,
                  }}
               >
                  <SearchIcon sx={{ color: 'gray', ml: 2 }} />
                  <InputBase
                    sx={{ ml: 1, flex: 1, py: 1.5 }}
                    placeholder="Type an activity or interest..."
                    inputProps={{ 'aria-label': 'search interests' }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </Paper>
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
                  Most popular activities:
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
                    startIcon={isLoading ? <Sparkles style={{ animation: 'spin 1s linear infinite' }} /> : <Plane />}
                  >
                    {isLoading ? 'Finding Your Perfect Destinations...' : 'Find Places'}
                  </GradientButton>
                </Box>
              </Box>
            </Box>
        </Box>

        {/* Loading State Card - Alternative Version (Commented out - using backdrop version) */}
        {/* {isLoading && (
          <Fade in={isLoading} timeout={500}>
            <StyledCard sx={{ mb: 4, textAlign: 'center' }}>
              <CardContent sx={{ p: 6 }}>
                <Box sx={{ 
                  position: 'relative',
                  mb: 4,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Box sx={{
                    position: 'absolute',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4AB9B020 0%, #FF6B3520 100%)',
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                  <Sparkles 
                    size={32} 
                    color="#4AB9B0"
                    style={{ 
                      animation: 'float 3s ease-in-out infinite, spin 2s linear infinite',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                      zIndex: 1
                    }}
                  />
                </Box>
                <Typography variant="h5">🎯 Finding Your Perfect Destinations</Typography>
                <LinearProgress sx={{ mt: 2, mb: 2 }} />
              </CardContent>
            </StyledCard>
          </Fade>
        )} */}

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
                            background: '#00A79D',
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