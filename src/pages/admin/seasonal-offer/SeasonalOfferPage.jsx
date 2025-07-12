import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import SeasonalOffersSection from '../../../components/adminPages/SeasonalOffersSection.jsx';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx'
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx'

function SeasonalOfferPage() {
  return (
    <Box>
        <CssBaseline />      
        <AdminNavBar />
        <SeasonalOffersSection />
        <Footer_Combination />
      </Box>
  );
}

export default SeasonalOfferPage;