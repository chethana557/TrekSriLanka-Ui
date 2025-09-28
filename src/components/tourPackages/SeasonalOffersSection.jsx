import React, { useEffect, useMemo, useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  Button, 
  Container,
  IconButton
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { BASE_URL } from '../../api';
function SeasonalOffersSection() {
  const [offers, setOffers] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${BASE_URL}/seasonal-offers/`);
        if (!res.ok) throw new Error('Failed to load seasonal offers');
        const list = await res.json();
        const active = Array.isArray(list) ? list.filter(o => (o.status || '').toLowerCase() === 'active') : [];
        const sorted = active.length ? active : (Array.isArray(list) ? list : []);
        setOffers(sorted);
        setIndex(0);
      } catch (e) {
        setError(e.message || 'Failed to load seasonal offers');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const destinations = useMemo(() => {
    const offer = offers[index];
    if (!offer || !Array.isArray(offer.photos) || offer.photos.length === 0) return [];
    // Build up to 4 images from offer photos
    return offer.photos.slice(0, 4).map((img, idx) => ({ name: `${offer.title || 'Offer'} ${idx + 1}`, image: img }));
  }, [offers, index]);

  const stats = useMemo(() => {
    const offer = offers[index];
    if (!offer) return null;
    const dayCount = Number(offer.day_count) || 0;
    const locCount = Array.isArray(offer.locations) ? offer.locations.length : 0;
    const oldPerPerson = Number(offer.package_price) || 0;
    const discount = Number(offer.off_percentage) || 0;
    const newPerPerson = Math.max(0, oldPerPerson * (1 - discount / 100));
    const fmt = (n) => `$${n.toFixed(2)}`;
    const rawDate = offer.valid_date;
    // Keep original YYYY-MM-DD when provided; fallback to locale date
    let validUntil = '';
    if (typeof rawDate === 'string') {
      validUntil = rawDate.slice(0, 10);
    } else if (rawDate) {
      try {
        const d = new Date(rawDate);
        validUntil = isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
      } catch {
        validUntil = '';
      }
    }
    return {
      title: offer.title || 'Seasonal Offer',
      dayCount,
      locCount,
      oldPerPersonLabel: fmt(oldPerPerson) + ' per person',
      newPerPersonLabel: fmt(newPerPerson) + ' ',
      validUntil,
    };
  }, [offers, index]);

  const hasMultiple = offers.length > 1;
  const currentOffer = offers[index] || null;
  const prev = () => setIndex((i) => (i - 1 + offers.length) % offers.length);
  const next = () => setIndex((i) => (i + 1) % offers.length);

  // Auto-slide when there are multiple offers
  useEffect(() => {
    if (!hasMultiple) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % offers.length);
    }, 5000); // 5s
    return () => clearInterval(id);
  }, [hasMultiple, offers.length]);

  return (
    <Box
      sx={{
        background: 'linear-gradient(360deg,rgb(255, 255, 255) 0%, #008B8B 100%)',
        minHeight: '80vh',
        pt: 2,
        pb: 6,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 'rem', sm: '4rem', md: '5rem' },
              fontWeight: 'bold',
              mb: 2,
              lineHeight: 1.1
            }}
          >
            <Box component="span" sx={{ color: '#FFEB3B' }}>
              Seasonal
            </Box>{' '}
            <Box component="span" sx={{ color: 'white' }}>
              offers
            </Box>
          </Typography>
        </Box>

        {/* Main Content Card (slider) */}
        <Box sx={{ position: 'relative' }}>
    {hasMultiple && (
            <>
              <IconButton
                aria-label="Previous offer"
                onClick={prev}
                sx={{
                  position: 'absolute',
      left: { xs: 8, sm: 12 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      p: 1,
                  zIndex: 2,
                  '&:hover': { bgcolor: 'white' }
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                aria-label="Next offer"
                onClick={next}
                sx={{
                  position: 'absolute',
      right: { xs: 8, sm: 12 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      p: 1,
                  zIndex: 2,
                  '&:hover': { bgcolor: 'white' }
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}
        <Card
          sx={{
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
            background: 'white'
          }}
        >
          {/* Destination Images Strip */}
          <Box
            sx={{
              display: 'flex',
              height: { xs: '180px', sm: '220px', md: '260px' }
            }}
          >
            {(destinations.length ? destinations : [
              { name: 'Sigiriya Rock', image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Temple of Tooth', image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Nine Arch Bridge', image: 'https://images.pexels.com/photos/14580513/pexels-photo-14580513.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Unawatuna Beach', image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400' }
            ]).map((destination, index) => (
              <Box
                key={destination.name}
                sx={{
                  flex: 1,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    '& .destination-image': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={destination.image}
                  alt={destination.name}
                  className="destination-image"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Package Information */}
          <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 'bold',
                color: '#00A79D',
                mb: 3
              }}
            >
              {stats?.title || 'Golden Isle Adventures'}
            </Typography>

            {/* Pricing Section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 2, sm: 4 },
                mb: 3,
                flexWrap: 'wrap'
              }}
            >
              {/* Original Package - Struck Through */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: 'line-through',
                    color: '#999',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.3rem', sm: '1.5rem' }
                  }}
                >
                  {stats ? stats.oldPerPersonLabel : '$899 per person'}
                </Typography>
              </Box>

              {/* Updated Package */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#333',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    mb: 0.5
                  }}
                >
                  {stats ? `${stats.dayCount} Days | ${stats.locCount} Locations` : '12 Days | 24 Locations'}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                >
                  {stats ? stats.newPerPersonLabel : '$799 '}
                  <Typography
                    component="span"
                    variant="h6"
                    sx={{
                      fontWeight: 'normal',
                      color: '#666',
                      fontSize: { xs: '1rem', sm: '1.2rem' }
                    }}
                  >
                    per person
                  </Typography>
                </Typography>
                {stats?.validUntil && (
                  <Typography
                    variant="body2"
                    sx={{ color: '#999', mt: 0.5 }}
                  >
                    Valid until {stats.validUntil}
                  </Typography>
                )}
              </Box>

              {/* CTA Button */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #00A79D 30%, #00BCD4 90%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  px: { xs: 4, sm: 6 },
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: '50px',
                  boxShadow: '0 8px 24px rgba(0,167,157,0.3)',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00695C 30%, #0097A7 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(0,167,157,0.4)'
                  }
                }}
              >
                {loading ? 'Loading…' : (currentOffer ? 'Get Offer' : 'No Offers')}
              </Button>
            </Box>
          </Box>
        </Card>
        {/* dots */}
        {hasMultiple && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            {offers.map((_, i) => (
              <Box
                key={i}
                onClick={() => setIndex(i)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  bgcolor: i === index ? '#00A79D' : 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(0,0,0,0.2)'
                }}
              />
            ))}
          </Box>
        )}
        </Box>
      </Container>
    </Box>
  );
}

export default SeasonalOffersSection;