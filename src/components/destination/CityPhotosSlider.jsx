import React, { useMemo, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function CityPhotosSlider({ photos = [] }) {
  const slides = useMemo(() => (Array.isArray(photos) ? photos.filter(Boolean) : []), [photos]);
  const [index, setIndex] = useState(0);

  if (!slides || slides.length <= 1) return null; // Need at least 2 photos (since first is already shown elsewhere)

  const showSlides = slides.slice(1); // skip the first photo (used as hero)
  const total = showSlides.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, my: 4 }}>
      <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }}>
        <Box
          component="img"
          src={showSlides[index]}
          alt={`City photo ${index + 2}`}
          sx={{ width: '100%', height: { xs: 260, sm: 360, md: 420, lg: 480 }, objectFit: 'cover', display: 'block' }}
        />
        {total > 1 && (
          <>
            <IconButton
              aria-label="Previous"
              onClick={prev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 12,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.9)',
                '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              aria-label="Next"
              onClick={next}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 12,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.9)',
                '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
        <Box sx={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', gap: 1, justifyContent: 'center' }}>
          {showSlides.map((_, i) => (
            <Box key={i} onClick={() => setIndex(i)} sx={{ width: 8, height: 8, borderRadius: '50%', cursor: 'pointer', bgcolor: i === index ? '#00A79D' : 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.1)' }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CityPhotosSlider;
