import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';
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

// Price formatter
const formatPrice = (val) => {
  if (typeof val !== 'number' || isNaN(val)) return '0';
  return new Intl.NumberFormat('en-LK').format(val);
};

function TourSearchResults({ searchResults = [], searchParams, loading = false, onNewSearch }) {
  const [sortBy, setSortBy] = useState('recommended');
  const [favorites, setFavorites] = useState(new Set());
  const results = searchResults;
  const { selectedCurrency, setSelectedCurrency, format, currencies } = useCurrency();
  const navigate = useNavigate();

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
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'flex-start' }}>
          {[1,2,3,4,5,6].map(i => (
            <Card key={i} sx={{ width: 320, height: 560, display:'flex', flexDirection:'column', borderRadius:'16px' }}>
              <Skeleton variant="rectangular" height={200} />
              <CardContent sx={{ flexGrow:1 }}>
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
              </CardContent>
            </Card>
          ))}
        </Box>
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
          
          <Box sx={{ display:'flex', gap:2, alignItems:'center' }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel sx={{ color: '#666' }}>Currency</InputLabel>
              <Select
                value={selectedCurrency}
                label="Currency"
                onChange={(e)=>setSelectedCurrency(e.target.value)}
                sx={{
                  borderRadius: '20px',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00A79D' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00A79D' }
                }}
              >
                {currencies.map(c => (
                  <MenuItem key={c.code} value={c.code}>{c.symbol} {c.code}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
      </Box>

      {/* Results Grid */}
      {results.length > 0 && (
        <>
          <Box sx={{ display:'flex', flexWrap:'wrap', gap:3, justifyContent:'flex-start' }}>
            {sortedResults.map((tour) => (
              <Card
                key={tour.id}
                sx={{
                  width: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  },
                  position: 'relative',
                  overflow: 'hidden'
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
                  <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
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

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#333',
                        mb: 2,
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '64px'
                      }}
                    >
                      {tour.description || 'No description provided.'}
                    </Typography>

                    {/* Tour Highlights */}
                    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}>
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
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, alignContent: 'flex-start' }}>
                      {tour.inclusions.slice(0, 3).map((inclusion) => (
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
            {tour.inclusions.length > 3 && (
                        <Typography variant="caption" sx={{ color: '#666', alignSelf: 'center' }}>
              +{tour.inclusions.length - 3} more
                        </Typography>
                      )}
                    </Box>

                    {/* Price */}
                    <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid #f2f4f5' }}>
          {tour.package_price && (
                        <Box sx={{ mb: 0.75 }}>
                          <Typography
                            variant="h6"
                            sx={{ color: '#00A79D', fontWeight: 'bold', lineHeight: 1.15 }}
                          >
            {format(tour.package_price)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#666', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Package Price
                            {typeof tour.person_count === 'number' && tour.person_count > 0 && (
                              <>
                                <span style={{ color: '#ccc' }}>|</span>
                                <Group sx={{ fontSize: 14, color: '#00A79D' }} />
                                {tour.person_count} {tour.person_count === 1 ? 'person' : 'persons'}
                              </>
                            )}
                          </Typography>
                        </Box>
                      )}
          {tour.price && (
                        <Typography
                          variant="body2"
                          sx={{ color: '#00A79D', fontWeight: 'bold', lineHeight: 1.2 }}
                        >
          {format(tour.price)}{' '}
                          <Typography component="span" variant="caption" sx={{ color: '#666', fontWeight: 'normal' }}>
                            / person
                          </Typography>
                        </Typography>
                      )}
                    </Box>
                  </CardContent>

                  {/* Action Buttons */}
                  <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
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
                      onClick={()=>navigate(`/packages/${tour.id}`)}
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
                      onClick={()=>{
                        const token = localStorage.getItem('access_token');
                        if(!token){
                          navigate('/login', { state:{ redirect: '/packages' } });
                          return;
                        }
                        navigate('/booking', { state: { packageId: tour.id } });
                      }}
                    >
                      Book Tour
                    </Button>
                  </CardActions>
        </Card>
            ))}
      </Box>

          {/* Load More removed as requested */}
        </>
      )}
    </Box>
  );
}

export default TourSearchResults;