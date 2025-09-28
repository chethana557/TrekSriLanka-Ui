import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

import { BASE_URL } from '../../api';

function BookingDestinationSection() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/hotels/top/premium`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        if (isMounted) setAccommodations(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        if (isMounted) setError(e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <Box sx={{ bgcolor: '#00A79D', py: 8, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: 4, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              color: '#FFEB3B', 
              fontWeight: 'bold',
              mb: 1,
              fontSize: '4rem'
            }}
          >
            Premium
          </Typography>
          <Typography 
            variant="h3" 
            component="h3" 
            sx={{ 
              color: 'white', 
              fontWeight: 'medium',
              mb: 3,
              fontSize: '3rem'
            }}
          >
            accommodations
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white',
              maxWidth: '900px',
              mx: 'auto',
              mb: 6,
              fontSize: '1.2rem',
              lineHeight: 1.6
            }}
          >
            Looking for the perfect place to stay? Discover our handpicked selection of premium accommodations across Sri Lanka, each offering exceptional comfort, stunning views, and unforgettable hospitality for your perfect getaway.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'nowrap', overflowX: 'auto', px: 1 }}>
          {loading && <Typography sx={{ color: 'white' }}>Loading...</Typography>}
          {!loading && !error && accommodations.length === 0 && (
            <Typography sx={{ color: 'white' }}>No premium accommodations yet.</Typography>
          )}
          {error && <Typography sx={{ color: 'white' }}>Error: {error}</Typography>}
          {!loading && accommodations.slice(0,4).map((accommodation) => (
            <Box key={accommodation.hotel_id || accommodation.hotel_name} sx={{ width: 300, minWidth: 300 }} onClick={() => accommodation.hotel_id && navigate(`/hotels/${accommodation.hotel_id}`)}>
              <Box
                sx={{
                  position: 'relative',
                  height: 420,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  transform: 'translateY(0)',
                  transition: 'transform 0.55s ease, box-shadow 0.55s ease',
                  willChange: 'transform',
                  '&:hover': {
                    boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
                    transform: 'translateY(-4px)'
                  },
                  '&:hover .zoom-img': {
                    transform: 'scale(1.06)'
                  }
                }}
              >
                <Box
                  component="img"
                  className="zoom-img"
                  src={accommodation.image || ''}
                  alt={accommodation.hotel_name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    willChange: 'transform'
                  }}
                />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)', p: '32px 20px 22px', color: 'white' }}>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', fontSize: '1.8rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    {accommodation.hotel_name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default BookingDestinationSection;