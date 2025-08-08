import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import TourPackagesManagement from '../../../components/adminPages/TourPackagesManagement.jsx';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx';
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx';
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';

function TourPackagesPage() {
  return (
    <Box>
        <CssBaseline />   
        <AdminNavBar />   
        <TourPackagesManagement />
        <ChatbotWidget />
        <Footer_Combination />
      </Box>
  );
}

export default TourPackagesPage;