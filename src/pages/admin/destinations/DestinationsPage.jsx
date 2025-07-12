import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import DestinationsManagement from '../../../components/adminPages/DestinationsManagement.jsx';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx'
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx'


function DestinationsPage() {
  return (
    <Box>
        <CssBaseline />   
        <AdminNavBar />      
        <DestinationsManagement />
        <Footer_Combination />
      </Box>
  );
}

export default DestinationsPage;