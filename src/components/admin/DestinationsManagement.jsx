import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Button
} from '@mui/material';
import { 
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

// Import your images (you'll need to add these to your assets)
import sigiriyaImg from '../../assets/sigiriya.png';
import ellaImg from '../../assets/ella.png';
import mirissaImg from '../../assets/mirissa.png';

const offers = [
  {
    id: 1,
    title: 'Cultural Heritage Special',
    description: 'Explore ancient kingdoms and discover Sri Lanka\'s rich cultural heritage rich cultural heritage. rich cultural heritage. rich cultural heritage. .',
    image: sigiriyaImg
  },
  {
    id: 2,
    title: 'Hill Country Adventure',
    description: 'Experience breathtaking mountain landscapes and tea plantations.',
    image: ellaImg
  },
  {
    id: 3,
    title: 'Beach Paradise Tour',
    description: 'Relax on pristine beaches with crystal clear waters and golden sands.',
    image: mirissaImg
  },
  {
    id: 4,
    title: 'Wildlife Safari Experience',
    description: 'Encounter exotic wildlife in their natural habitat during exciting safari adventures.',
    image: mirissaImg
  }
];

function DestinationsManagement() {
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
      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: 3 }}>
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
              Tour Destinations Management
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontSize: '1.1rem'
              }}
            >
              Manage your tourist destinations.
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
            + Add New Destination
          </Button>
        </Box>

        {/* Offers Grid */}
        <Grid container spacing={3} justifyContent="center">
          {offers.map((offer) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={offer.id}>
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
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  },
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0 auto'
                }}
              >
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
                        color: '#333'
                      }}
                    >
                      {offer.title}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666',
                        lineHeight: 1.5,
                        mb: 3
                      }}
                    >
                      {offer.description}
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

export default DestinationsManagement;