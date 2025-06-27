import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  Rating,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Avatar,
  Skeleton
} from '@mui/material';
import {
  LocationOn,
  Schedule,
  Group,
  Restaurant,
  DirectionsCar,
  CameraAlt,
  Hiking,
  Star,
  FavoriteBorder,
  Favorite,
  Share,
  FilterList
} from '@mui/icons-material';

const inclusionIcons = {
  Transport: <DirectionsCar fontSize="small" />,
  Guide: <Group fontSize="small" />,
  Meals: <Restaurant fontSize="small" />,
  Accommodation: <LocationOn fontSize="small" />,
  'Safari Jeep': <DirectionsCar fontSize="small" />,
  'Whale Watching': <CameraAlt fontSize="small" />,
  'Beach Activities': <Hiking fontSize="small" />,
  'Surfing Lessons': <Hiking fontSize="small" />,
  'Expert Guide': <Group fontSize="small" />,
  'Park Fees': <LocationOn fontSize="small" />,
  Equipment: <CameraAlt fontSize="small" />,
  'Museum Tickets': <LocationOn fontSize="small" />,
  'Local Food': <Restaurant fontSize="small" />,
  'Trekking Guide': <Group fontSize="small" />,
  Permits: <LocationOn fontSize="small" />,
  'Cooking Classes': <Restaurant fontSize="small" />,
  'Market Tours': <Group fontSize="small" />,
  'Photo Guide': <CameraAlt fontSize="small" />,
  Workshops: <Group fontSize="small" />,
  'Historian Guide': <Group fontSize="small" />,
  'Site Tickets': <LocationOn fontSize="small" />,
  'Cultural Shows': <CameraAlt fontSize="small" />,
  'Tea Factory Tours': <LocationOn fontSize="small" />
};

function TourSearchResults({ searchResults = [], searchParams, loading = false, onNewSearch }) {
  const [sortBy, setSortBy] = useState('recommended');
  const [favorites, setFavorites] = useState(new Set());
  const results = searchResults;

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'duration':
        const durationOrder = { '1-3 Days': 1, '4-7 Days': 2, '1-2 Weeks': 3, '2-4 Weeks': 4, '1+ Month': 5 };
        return durationOrder[a.duration] - durationOrder[b.duration];
      default:
        return b.featured ? 1 : -1;
    }
  });

  if (loading) {
    return (
      <Box sx={{ py: 4, px: 2, maxWidth: '1400px', mx: 'auto' }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item}>
              <Card sx={{ height: '100%' }}>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={30} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: 2, maxWidth: '1400px', mx: 'auto' }}>
      {/* Results Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#00A79D', 
            fontWeight: 'bold',
            mb: 1
          }}
        >
          Tour Package Results
        </Typography>
        
        {searchParams && (
          <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
            {searchParams.duration !== 'None' && `Duration: ${searchParams.duration} • `}
            {searchParams.budget !== 'None' && `Budget: ${searchParams.budget} • `}
            {searchParams.tourType !== 'None' && `Type: ${searchParams.tourType}`}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="body1" sx={{ color: '#333' }}>
              {results.length} tour packages found
              {results.length === 0 && !loading && (
                <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                  No tour packages match your search criteria. Try adjusting your filters.
                </Typography>
              )}
            </Typography>
            {onNewSearch && results.length === 0 && !loading && (
              <Button
                variant="text"
                onClick={onNewSearch}
                sx={{
                  color: '#00A79D',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  mt: 1,
                  p: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline'
                  }
                }}
              >
                Try a new search
              </Button>
            )}
          </Box>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ color: '#666' }}>Sort by</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
              sx={{
                borderRadius: '20px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00A79D',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00A79D',
                },
              }}
            >
              <MenuItem value="recommended">Recommended</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Highest Rated</MenuItem>
              <MenuItem value="reviews">Most Reviewed</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Results Grid */}
      {results.length > 0 && (
        <>
          <Grid container spacing={3}>
            {sortedResults.map((tour) => (
              <Grid item xs={12} sm={6} lg={4} key={tour.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    maxWidth: '400px',
                    mx: 'auto'
                  }}
                >
                  {/* Featured Badge */}
                  {tour.featured && (
                    <Chip
                      label="Featured"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: '#00A79D',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 2
                      }}
                    />
                  )}

                  {/* Discount Badge */}
                  {tour.discount && (
                    <Chip
                      label={`${tour.discount}% OFF`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: '#FF4444',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 2
                      }}
                    />
                  )}

                  {/* Tour Image */}
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={tour.image}
                      alt={tour.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    
                    {/* Action Buttons Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        display: 'flex',
                        gap: 1
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => toggleFavorite(tour.id)}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.9)',
                          '&:hover': { bgcolor: 'white' }
                        }}
                      >
                        {favorites.has(tour.id) ? 
                          <Favorite sx={{ color: '#FF4444' }} fontSize="small" /> : 
                          <FavoriteBorder fontSize="small" />
                        }
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.9)',
                          '&:hover': { bgcolor: 'white' }
                        }}
                      >
                        <Share fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Tour Details */}
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          lineHeight: 1.2
                        }}
                      >
                        {tour.name}
                      </Typography>
                      <Chip
                        label={tour.type}
                        size="small"
                        sx={{
                          bgcolor: '#f0f9f8',
                          color: '#00A79D',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ color: '#00A79D', fontSize: '16px', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {tour.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Schedule sx={{ color: '#00A79D', fontSize: '16px', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: '#666', fontWeight: 'bold' }}>
                        {tour.duration}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={tour.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>
                        {tour.rating} ({tour.reviews} reviews)
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ color: '#333', mb: 2, lineHeight: 1.4 }}>
                      {tour.description}
                    </Typography>

                    {/* Tour Highlights */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                        Highlights:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {tour.highlights.slice(0, 3).map((highlight, index) => (
                          <Chip
                            key={index}
                            label={highlight}
                            size="small"
                            sx={{
                              bgcolor: '#e8f5f4',
                              color: '#00A79D',
                              fontSize: '0.7rem',
                              height: '24px'
                            }}
                          />
                        ))}
                        {tour.highlights.length > 3 && (
                          <Typography variant="caption" sx={{ color: '#666', alignSelf: 'center' }}>
                            +{tour.highlights.length - 3} more
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {/* Inclusions */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {tour.inclusions.slice(0, 4).map((inclusion) => (
                        <Box
                          key={inclusion}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            bgcolor: '#f8f9fa',
                            px: 1,
                            py: 0.5,
                            borderRadius: '12px',
                            fontSize: '0.75rem'
                          }}
                        >
                          {inclusionIcons[inclusion] || <Group fontSize="small" />}
                          <Typography variant="caption">{inclusion}</Typography>
                        </Box>
                      ))}
                      {tour.inclusions.length > 4 && (
                        <Typography variant="caption" sx={{ color: '#666', alignSelf: 'center' }}>
                          +{tour.inclusions.length - 4} more
                        </Typography>
                      )}
                    </Box>

                    {/* Price */}
                    <Box sx={{ mt: 'auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: '#00A79D', 
                            fontWeight: 'bold',
  
                          }}
                        >
                          LKR {tour.price.toLocaleString()}
                        </Typography>
                        {tour.originalPrice && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              textDecoration: 'line-through', 
                              color: '#999' 
                            }}
                          >
                            LKR {tour.originalPrice.toLocaleString()}
                          </Typography>
                        )}
                      </Box>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        per person
                      </Typography>
                    </Box>
                  </CardContent>

                  {/* Action Buttons */}
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: '#00A79D',
                        color: '#00A79D',
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        mr: 1,
                        flex: 1,
                        '&:hover': {
                          borderColor: '#008A82',
                          color: '#008A82'
                        }
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: '#00A79D',
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        flex: 1,
                        '&:hover': {
                          bgcolor: '#008A82'
                        }
                      }}
                    >
                      Book Tour
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Load More Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#00A79D',
                color: '#00A79D',
                borderRadius: '25px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                '&:hover': {
                  borderColor: '#008A82',
                  color: '#008A82',
                  bgcolor: 'rgba(0, 167, 157, 0.05)'
                }
              }}
            >
              Load More Tour Packages
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default TourSearchResults;