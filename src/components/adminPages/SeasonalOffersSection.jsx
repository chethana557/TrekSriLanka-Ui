import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Button,
  Chip
} from '@mui/material';
import { 
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

// Import your images (you'll need to add these to your assets)
import sigiriyaImg from '../../assets/common/sigiriya.png';
import ellaImg from '../../assets/common/ella.png';
import mirissaImg from '../../assets/common/mirissa.png';

const offers = [
  {
    id: 1,
    title: 'Cultural Heritage Special',
    locations: ['Anuradhapura', 'Polonnaruwa', '+2 more'],
    duration: '10 days',
    price: '$650',
    validUntil: '2024-01-31',
    discount: '15% off',
    status: 'Active',
    image: sigiriyaImg
  },
    {
    id: 2,
    title: 'Cultural Heritage Special',
    locations: ['Anuradhapura', 'Polonnaruwa', '+2 more'],
    duration: '10 days',
    price: '$650',
    validUntil: '2024-01-31',
    discount: '15% off',
    status: 'Pending',
    image: ellaImg
  },
    {
    id: 3,
    title: 'Cultural Heritage Special',
    locations: ['Anuradhapura', 'Polonnaruwa', '+2 more'],
    duration: '10 days',
    price: '$650',
    validUntil: '2024-01-31',
    discount: '15% off',
    status: 'Inactive',
    image: mirissaImg
  },
    {
    id: 4,
    title: 'Cultural Heritage Special',
    locations: ['Anuradhapura', 'Polonnaruwa', 'Ella', 'Mirissa','xssx','xsxs'],
    duration: '10 days',
    price: '$650',
    validUntil: '2024-01-31',
    discount: '15% off',
    status: 'Inactive',
    image: mirissaImg
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return '#00A79D';
    case 'Ending Soon':
      return '#FF9800';
    case 'Inactive':
      return '#F44336';
    default:
      return '#757575';
  }
};

const getStatusBgColor = (status) => {
  switch (status) {
    case 'Active':
      return '#E0F2F1';
    case 'Ending Soon':
      return '#FFF3E0';
    case 'Inactive':
      return '#FFEBEE';
    default:
      return '#F5F5F5';
  }
};

function SeasonalOffersSection() {
  const handleAddNewOffer = () => {
    console.log('Add new offer clicked');
  };

  const handleView = (offer) => {
    console.log('View offer:', offer);
  };

  const handleEdit = (offer) => {
    console.log('Edit offer:', offer);
  };

  const handleDelete = (offer) => {
    console.log('Delete offer:', offer);
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 3 }}>
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
              Seasonal Offers Management
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontSize: '1.1rem'
              }}
            >
              Manage your seasonal tour offers and promotions
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
            + Add New Offer
          </Button>
        </Box>

        {/* Offers Grid */}
        <Grid container spacing={3} justifyContent="center">
          {offers.map((offer) => (
            <Grid item xs={12} sm={6} md={3} key={offer.id}>
              <Card 
                sx={{ 
                  height: 520,
                  width: '100%',
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
                {/* Status Badge */}
                <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                  <Chip
                    label={offer.status}
                    size="small"
                    sx={{
                      bgcolor: getStatusBgColor(offer.status),
                      color: getStatusColor(offer.status),
                      fontWeight: 'bold',
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>

                {/* Discount Badge */}
                <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                  <Chip
                    label={offer.discount}
                    size="small"
                    sx={{
                      bgcolor: '#FF5722',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>

                {/* Offer Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={offer.image}
                  alt={offer.title}
                  sx={{ objectFit: 'cover', flexShrink: 0 }}
                />

                {/* Offer Details */}
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
                        color: '#333',
                        minHeight: '3.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                      title={offer.title}
                    >
                      {offer.title.length > 25 ? offer.title.substring(0, 22) + '...' : offer.title}
                    </Typography>

                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, minHeight: '1.5rem' }}>
                      <LocationOnIcon sx={{ color: '#00A79D', mr: 1, fontSize: '1.2rem' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#666',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {(() => {
                          const locations = offer.locations;
                          if (locations.length <= 2) {
                            return locations.join(', ');
                          } else {
                            const firstTwo = locations.slice(0, 2);
                            const remaining = locations.length - 2;
                            return `${firstTwo.join(', ')}, +${remaining} more`;
                          }
                        })()}
                      </Typography>
                    </Box>

                    {/* Duration */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, minHeight: '1.5rem' }}>
                      <CalendarIcon sx={{ color: '#00A79D', mr: 1, fontSize: '1.2rem' }} />
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {offer.duration}
                      </Typography>
                    </Box>

                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, minHeight: '2rem' }}>
                      <MoneyIcon sx={{ color: '#00A79D', mr: 1, fontSize: '1.2rem' }} />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#333',
                          fontWeight: 'bold'
                        }}
                      >
                        {offer.price}
                      </Typography>
                    </Box>

                    {/* Valid Until */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#999',
                        fontSize: '0.9rem',
                        mb: 3,
                        minHeight: '1.2rem'
                      }}
                    >
                      Valid until {offer.validUntil}
                    </Typography>
                  </Box>

                  {/* Action Buttons - Always at bottom */}
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleView(offer)}
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
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(offer)}
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
                      onClick={() => handleDelete(offer)}
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
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default SeasonalOffersSection;