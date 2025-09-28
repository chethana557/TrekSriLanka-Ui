import React from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';

function DestinationWelcomeSection({ 
  destinationName = "",
  subtitle = "",
  description = [],
  titleColor = '#00A79D',
  // translation control props (optional)
  onLanguageChange = null,
  onReset = null,
  language = 'en',
  translating = false,
  LANGUAGES = null
}) {
  // If no description is passed, show a minimal placeholder instead of a Sigiriya article
  const paragraphs = description && description.length > 0 ? description : ['No description available for this destination.'];

  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Box sx={{ position: 'relative', width: '100%', px: 2 }}>
        {/* Centered title */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: titleColor,
              fontWeight: 'bold',
            }}
          >
            <span style={{ fontSize: '1.5em' }}>{destinationName}</span>
          </Typography>
        </Box>

        {/* Right-aligned controls (absolute) - collapse below on small screens */}
        {LANGUAGES && onLanguageChange && (
          <Box
            sx={{
              position: 'absolute',
              right: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1
            }}
          >
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel sx={{ color: '#666' }}>Language</InputLabel>
              <Select value={language} onChange={onLanguageChange} label="Language" disabled={translating} sx={{ borderRadius: '20px' }}>
                {Object.entries(LANGUAGES).map(([code, label]) => (
                  <MenuItem key={code} value={code}>{label} ({code})</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="text" onClick={onReset} disabled={language === 'en' || translating} sx={{ color: '#00A79D', textTransform: 'none' }}>
              Reset
            </Button>

            {translating && <CircularProgress size={18} />}
          </Box>
        )}

        {/* On small screens show controls below the title */}
        {LANGUAGES && onLanguageChange && (
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center', gap: 1, mt: 2 }}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel sx={{ color: '#666' }}>Language</InputLabel>
              <Select value={language} onChange={onLanguageChange} label="Language" disabled={translating} sx={{ borderRadius: '20px' }}>
                {Object.entries(LANGUAGES).map(([code, label]) => (
                  <MenuItem key={code} value={code}>{label} ({code})</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="text" onClick={onReset} disabled={language === 'en' || translating} sx={{ color: '#00A79D', textTransform: 'none' }}>
              Reset
            </Button>

            {translating && <CircularProgress size={18} />}
          </Box>
        )}
      </Box>

      <Box sx={{ maxWidth: '1100px', mx: 'auto', px: 2 }}>
        <Typography 
          variant="body1" 
          align="center"
          sx={{ 
            fontSize: '2rem', 
            lineHeight: 2, 
            color: '#000000',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          {subtitle}
        </Typography>
        
        {paragraphs.map((paragraph, index) => (
          <Typography 
            key={index}
            variant="body1" 
            align="justify"
            sx={{ 
              fontSize: '1rem', 
              lineHeight: 1.6, 
              color: '#333333',
              mb: index === paragraphs.length - 1 ? 0 : 2
            }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default DestinationWelcomeSection;