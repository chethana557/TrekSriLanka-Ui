import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import FeedbackManagement from '../../../components/adminPages/FeedbackManagement.jsx';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx'
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx'

function FeedbacksPage() {
  return (
    <Box>
        <CssBaseline />    
        <AdminNavBar />
        <FeedbackManagement />
        <Footer_Combination />
      </Box>
  );
}

export default FeedbacksPage;