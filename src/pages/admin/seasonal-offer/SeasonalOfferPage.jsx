import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import SeasonalOffersSection from '../../../components/admin/SeasonalOffersSection.jsx';
import Footer_Combination from '../../../components/common/Footer_Combination.jsx'

function SeasonalOfferPage() {
  return (
    <Box>
        <CssBaseline />      
        <SeasonalOffersSection />
      </Box>
  );
}

export default SeasonalOfferPage;