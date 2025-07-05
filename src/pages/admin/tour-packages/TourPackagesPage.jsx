import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import TourPackagesManagement from '../../../components/admin/TourPackagesManagement.jsx';
import Footer_Combination from '../../../components/common/Footer_Combination.jsx'

function TourPackagesPage() {
  return (
    <Box>
        <CssBaseline />      
        <TourPackagesManagement />
      </Box>
  );
}

export default TourPackagesPage;